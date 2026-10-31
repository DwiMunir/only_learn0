import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { cekIsiMdx, parseArticleFile, terbaruDulu, validateArticle } from "./content";
import { formatDate } from "./format";
import { frontmatterSchema } from "./schema";

const MDX_TANPA_REEL = `---
title: Uji
description: Uji
topic: uang
publishedAt: 2026-10-25
checkedAt: 2026-10-25
draft: false
summary: [Satu]
sources:
  - { id: a, title: T, authors: A, year: 2020, url: "https://doi.org/10.1/x", level: moderate, supports: S }
---

Teks <Klaim sumber="a">benar</Klaim>.
`;

test("isi yang diizinkan lolos", () => {
  assert.deepEqual(cekIsiMdx('## Judul\n\nTeks <Klaim sumber="a, b">benar **sekali**</Klaim>.\n\n<ApaKataRiset />\n\n1. Langkah'), []);
});
test("import/export ditolak", () => assert.match(cekIsiMdx("export const x = 1\n\nTeks").join("\n"), /import\/export/));
test("ekspresi ditolak", () => assert.match(cekIsiMdx("Halo {process.exit(1)}").join("\n"), /ekspresi/));
test("tag lain ditolak", () => {
  assert.match(cekIsiMdx("<script>alert(1)</script>").join("\n"), /Tag <script>/);
  assert.match(cekIsiMdx("Halo <b>x</b> ya").join("\n"), /Tag <b>/);
});
test("atribut Klaim selain sumber teks ditolak", () => {
  assert.match(cekIsiMdx("<Klaim sumber={x}>y</Klaim>").join("\n"), /atribut sumber/);
  assert.match(cekIsiMdx('<Klaim sumber="a" onClick="x">y</Klaim>').join("\n"), /atribut sumber/);
});
test("ApaKataRiset dengan isi ditolak", () => assert.match(cekIsiMdx("<ApaKataRiset>x</ApaKataRiset>").join("\n"), /ApaKataRiset/));
test("MDX rusak dilaporkan", () => assert.match(cekIsiMdx('<Klaim sumber="a">tidak ditutup').join("\n"), /^MDX tidak bisa dibaca/));
const cekMdx = (mdx: string) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "cek-"));
  const file = path.join(dir, "uji.mdx");
  fs.writeFileSync(file, mdx);
  return validateArticle(parseArticleFile(file));
};

test("artikel terbit tanpa link reel hanya warning", () => {
  const f = cekMdx(MDX_TANPA_REEL);
  assert.ok(f.some((x) => x.level === "warning" && /reel\.url/.test(x.message)));
  assert.ok(!f.some((x) => x.level === "error"));
});
test('frontmatter berisi "</" ditolak, dengan jalur fieldnya', () => {
  const mdx = MDX_TANPA_REEL.replace("description: Uji", 'description: "x</script><script>alert(1)</script>"').replace(
    "title: T,",
    'title: "T </b>",',
  );
  const errors = cekMdx(mdx)
    .filter((x) => x.level === "error")
    .map((x) => x.message);
  assert.deepEqual(errors, [
    'Frontmatter tidak boleh berisi "</" (description).',
    'Frontmatter tidak boleh berisi "</" (sources.0.title).',
  ]);
});
test('"<" tanpa "/" di frontmatter tetap boleh', () => {
  const f = cekMdx(MDX_TANPA_REEL.replace("description: Uji", 'description: "kurang dari <5 menit"'));
  assert.ok(!f.some((x) => x.level === "error"));
});

test("urutan: terbaru dulu, jam ikut dihitung, tanggal tanpa jam dianggap paling awal di harinya", () => {
  const terbit = ["2026-10-26T05:35", "2026-10-25", "2026-10-26T06:13", "2026-10-26", "2026-10-26T05:46"];
  assert.deepEqual([...terbit].sort(terbaruDulu), ["2026-10-26T06:13", "2026-10-26T05:46", "2026-10-26T05:35", "2026-10-26", "2026-10-25"]);
});

test("publishedAt boleh berisi jam, tanggal tampil tetap tanpa jam", () => {
  const dasar = { title: "T", description: "D", topic: "uang", checkedAt: "2026-10-26", summary: ["S"], sources: [{ id: "a", title: "T", authors: "A", year: 2020, url: "https://doi.org/10.1/x", level: "moderate", supports: "S" }] };
  assert.equal(frontmatterSchema.parse({ ...dasar, publishedAt: "2026-10-26T05:35" }).publishedAt, "2026-10-26T05:35");
  assert.equal(frontmatterSchema.parse({ ...dasar, publishedAt: new Date("2026-10-26T00:00:00Z") }).publishedAt, "2026-10-26");
  assert.equal(frontmatterSchema.parse({ ...dasar, publishedAt: new Date("2026-10-26T05:35:00Z") }).publishedAt, "2026-10-26T05:35");
  assert.ok(!frontmatterSchema.safeParse({ ...dasar, publishedAt: "26-10-2026" }).success);
  assert.equal(formatDate("2026-10-26T05:35"), formatDate("2026-10-26"));
});

test("terbit dan dicek di hari yang sama tidak memicu warning walau publishedAt berjam", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "cek-jam-"));
  const file = path.join(dir, "uji.mdx");
  fs.writeFileSync(file, MDX_TANPA_REEL.replace("publishedAt: 2026-10-25", "publishedAt: 2026-10-25T05:35"));
  const f = validateArticle(parseArticleFile(file));
  assert.ok(!f.some((x) => /checkedAt lebih lama/.test(x.message)));
  fs.rmSync(dir, { recursive: true, force: true });
});

test("thumbnail yang filenya belum ada hanya warning", () => {
  const f = cekMdx(MDX_TANPA_REEL.replace("draft: false", "draft: false\nthumbnail: /thumbs/tidak-ada-uji.jpg"));
  assert.ok(f.some((x) => x.level === "warning" && x.message === "Thumbnail /thumbs/tidak-ada-uji.jpg belum ada di folder public. Kartu memakai poster atau gambar pengganti."));
  assert.ok(!f.some((x) => x.level === "error"));
});

test("thumbnail hanya path lokal /thumbs/ yang aman", () => {
  const dasar = { title: "T", description: "D", topic: "uang", publishedAt: "2026-10-26", checkedAt: "2026-10-26", summary: ["S"], sources: [{ id: "a", title: "T", authors: "A", year: 2020, url: "https://doi.org/10.1/x", level: "moderate", supports: "S" }] };
  assert.ok(frontmatterSchema.safeParse({ ...dasar, thumbnail: "/thumbs/x.jpg" }).success);
  assert.ok(!frontmatterSchema.safeParse({ ...dasar, thumbnail: "https://evil/x.jpg" }).success);
  assert.ok(!frontmatterSchema.safeParse({ ...dasar, thumbnail: "/thumbs/../x.jpg" }).success);
});
