import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { evidenceLevels, type EvidenceLevel } from "./evidence";
import { frontmatterSchema, formatZodError, slugSchema, type Frontmatter, type Source } from "./schema";

export const CONTENT_DIR = path.join(process.cwd(), "content", "catatan");
export const PUBLIC_DIR = path.join(process.cwd(), "public");

export type NumberedSource = Source & {
  n: number;
  levelLabel: string;
  levelScore: number | null;
  checkedAt: string;
};

export type Article = {
  slug: string;
  file: string;
  frontmatter: Frontmatter;
  body: string;
  sources: NumberedSource[];
  readingMinutes: number;
};

export class ContentError extends Error {}

/** Draft tampil saat `npm run dev`, atau kalau SHOW_DRAFTS=true (misalnya di Preview Vercel). */
export function showDrafts(): boolean {
  return process.env.NODE_ENV === "development" || process.env.SHOW_DRAFTS === "true";
}

function numberSources(fm: Frontmatter): NumberedSource[] {
  return fm.sources.map((s, i) => {
    const level = evidenceLevels[s.level as EvidenceLevel];
    return {
      ...s,
      n: i + 1,
      levelLabel: level.label,
      levelScore: level.score,
      checkedAt: s.checkedAt ?? fm.checkedAt,
    };
  });
}

function readingMinutes(body: string): number {
  const words = body
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_>`-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function parseArticleFile(file: string): Article {
  const slug = path.basename(file, ".mdx");
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const parsed = frontmatterSchema.safeParse(data);
  if (!parsed.success) {
    throw new ContentError(
      `Frontmatter tidak valid di ${path.relative(process.cwd(), file)}:\n  - ${formatZodError(parsed.error).join("\n  - ")}`,
    );
  }
  return {
    slug,
    file,
    frontmatter: parsed.data,
    body: content.trim(),
    sources: numberSources(parsed.data),
    readingMinutes: readingMinutes(content),
  };
}

function listArticleFiles(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))
    .map((f) => path.join(CONTENT_DIR, f));
}

let cache: Article[] | null = null;

/** Semua artikel, terbaru dulu. Draft hanya ikut kalau showDrafts() = true. */
export function getAllArticles(opts: { includeDrafts?: boolean } = {}): Article[] {
  const includeDrafts = opts.includeDrafts ?? showDrafts();
  if (!cache || process.env.NODE_ENV === "development") {
    cache = listArticleFiles()
      .map(parseArticleFile)
      .sort((a, b) => b.frontmatter.publishedAt.localeCompare(a.frontmatter.publishedAt));
  }
  return cache.filter((a) => includeDrafts || !a.frontmatter.draft);
}

export function getArticle(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

export function getArticlesByTopic(topic: string): Article[] {
  return getAllArticles().filter((a) => a.frontmatter.topic === topic);
}

export function getAllCorrections() {
  return getAllArticles()
    .flatMap((a) =>
      a.frontmatter.corrections.map((c) => ({
        ...c,
        article: { slug: a.slug, title: a.frontmatter.title },
      })),
    )
    .sort((a, b) => b.date.localeCompare(a.date));
}

/* ------------------------------------------------------------------ */
/* Validasi silang (dipakai `npm run cek` dan `npm run impor`)         */
/* ------------------------------------------------------------------ */

export type Finding = { level: "error" | "warning"; message: string };

const KLAIM_RE = /<Klaim\b[^>]*\bsumber\s*=\s*["']([^"']+)["']/g;

export function citedIdsInBody(body: string): string[] {
  const ids: string[] = [];
  for (const m of body.matchAll(KLAIM_RE)) {
    ids.push(...m[1].split(",").map((s) => s.trim()).filter(Boolean));
  }
  return ids;
}

export function validateArticle(article: Article): Finding[] {
  const findings: Finding[] = [];
  const { frontmatter: fm, body, slug } = article;
  const err = (message: string) => findings.push({ level: "error", message });
  const warn = (message: string) => findings.push({ level: "warning", message });

  if (!slugSchema.safeParse(slug).success) {
    err(`Nama file "${slug}.mdx" harus huruf kecil, angka, dan tanda hubung.`);
  }

  const ids = fm.sources.map((s) => s.id);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  for (const id of new Set(dupes)) err(`ID sumber "${id}" dipakai lebih dari sekali.`);

  const known = new Set(ids);
  const bodyIds = citedIdsInBody(body);
  for (const id of bodyIds) {
    if (!known.has(id)) err(`<Klaim sumber="${id}"> menunjuk sumber yang tidak ada di frontmatter.`);
  }
  for (const claim of fm.claims) {
    for (const id of claim.sources) {
      if (!known.has(id)) err(`Klaim "${claim.text}" menunjuk sumber "${id}" yang tidak ada.`);
    }
  }

  const cited = new Set([...bodyIds, ...fm.claims.flatMap((c) => c.sources)]);
  for (const id of ids) {
    if (!cited.has(id)) warn(`Sumber "${id}" tidak pernah dikutip di teks maupun di claims.`);
  }

  if (bodyIds.length === 0) {
    warn("Belum ada <Klaim> di teks. Tandai minimal satu kalimat yang didukung riset.");
  }
  if (fm.claims.length > 0 && !/<ApaKataRiset\s*\/>/.test(body)) {
    warn("Ada claims di frontmatter, tapi <ApaKataRiset /> belum dipasang di teks.");
  }

  if (fm.checkedAt < fm.publishedAt) {
    warn("checkedAt lebih lama dari publishedAt. Biasanya tanggal cek sama atau setelah tanggal terbit.");
  }

  const placeholder = /GANTI_INI/;
  const hasPlaceholder =
    placeholder.test(JSON.stringify(fm)) || placeholder.test(body);
  if (hasPlaceholder) {
    (fm.draft ? warn : err)("Masih ada teks GANTI_INI dari template.");
  }

  if (!fm.reel?.url) {
    (fm.draft ? warn : err)("reel.url belum diisi. Isi dengan `npm run reel -- <slug> <link-reel>`.");
  }
  if (fm.reel?.poster) {
    const p = fm.reel.poster;
    if (p.startsWith("/") && !fs.existsSync(path.join(PUBLIC_DIR, p))) {
      warn(`Poster ${p} belum ada di folder public. Thumbnail akan pakai placeholder.`);
    }
  }

  return findings;
}

export type FileReport = { file: string; findings: Finding[] };

/** Validasi semua file, termasuk draft. Error parsing frontmatter ikut dilaporkan. */
export function validateAll(): FileReport[] {
  return listArticleFiles().map((file) => {
    try {
      return { file, findings: validateArticle(parseArticleFile(file)) };
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      return { file, findings: [{ level: "error" as const, message }] };
    }
  });
}
