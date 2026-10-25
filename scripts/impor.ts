/**
 * npm run impor -- path/ke/research-note.json [--timpa]
 * Mengubah research-note.json dari Morena menjadi content/catatan/<slug>.mdx.
 * Hasil impor SELALU draft: sumber wajib dicek manusia sebelum terbit.
 */
import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import { CONTENT_DIR, parseArticleFile, validateArticle } from "../src/lib/content";
import { today } from "../src/lib/format";
import { formatZodError, researchNoteSchema } from "../src/lib/schema";
import { color, fail, printReports, toMdx } from "./_util";

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: { timpa: { type: "boolean", default: false } },
});

const input = positionals[0];
if (!input) fail("Tulis path file JSON. Contoh: npm run impor -- examples/research-note.example.json");
if (!fs.existsSync(input)) fail(`File ${input} tidak ditemukan.`);

let json: unknown;
try {
  json = JSON.parse(fs.readFileSync(input, "utf8"));
} catch (e) {
  fail(`JSON tidak valid: ${(e as Error).message}`);
}

const parsed = researchNoteSchema.safeParse(json);
if (!parsed.success) {
  fail(`research-note tidak sesuai schema:\n  - ${formatZodError(parsed.error).join("\n  - ")}`);
}
const note = parsed.data;

const target = path.join(CONTENT_DIR, `${note.slug}.mdx`);
if (fs.existsSync(target) && !values.timpa) {
  fail(`${path.relative(process.cwd(), target)} sudah ada. Tambahkan --timpa kalau memang mau menimpa.`);
}

let body = note.body.trim();
if (note.claims.length > 0 && !/<ApaKataRiset\s*\/>/.test(body)) {
  body += "\n\n<ApaKataRiset />";
  console.log(color.yellow("! <ApaKataRiset /> tidak ada di body, ditambahkan di akhir. Pindahkan kalau perlu."));
}

const date = today();
const frontmatter = {
  title: note.hook,
  description: note.description,
  topic: note.topic,
  publishedAt: date,
  checkedAt: note.checkedAt ?? date,
  draft: true,
  ...(note.reel ? { reel: note.reel } : {}),
  summary: note.summary,
  sources: note.sources,
  claims: note.claims,
};

fs.mkdirSync(CONTENT_DIR, { recursive: true });
fs.writeFileSync(target, toMdx(frontmatter, body));
console.log(`${color.green("✓")} Diimpor: ${path.relative(process.cwd(), target)} ${color.dim("(draft)")}\n`);

printReports([{ file: target, findings: validateArticle(parseArticleFile(target)) }]);
console.log(`
Sebelum terbit:
  1. Buka setiap link sumber, pastikan isinya benar-benar mendukung kalimat yang distabilo
  2. npm run dev  → cek tampilan di http://localhost:3000/catatan/${note.slug}
  3. Ubah draft: false, commit, push`);
