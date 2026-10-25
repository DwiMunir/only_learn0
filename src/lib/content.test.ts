import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { cekIsiMdx, parseArticleFile, validateArticle } from "./content";

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
test("artikel terbit tanpa link reel hanya warning", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "cek-"));
  const file = path.join(dir, "uji.mdx");
  fs.writeFileSync(file, MDX_TANPA_REEL);
  const f = validateArticle(parseArticleFile(file));
  assert.ok(f.some((x) => x.level === "warning" && /reel\.url/.test(x.message)));
  assert.ok(!f.some((x) => x.level === "error"));
});
