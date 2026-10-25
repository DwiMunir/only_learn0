import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { researchNoteSchema } from "../src/lib/schema";
import { catatanDariNote } from "./_catatan";

const note = researchNoteSchema.parse(
  JSON.parse(fs.readFileSync(new URL("../examples/research-note.example.json", import.meta.url), "utf8")),
);

test("baru: draft kecuali terbit, publishedAt hari ini", () => {
  const a = catatanDariNote(note, { hariIni: "2026-11-01", terbit: false });
  assert.equal(a.frontmatter.draft, true);
  assert.equal(a.frontmatter.publishedAt, "2026-11-01");
  assert.equal(catatanDariNote(note, { hariIni: "2026-11-01", terbit: true }).frontmatter.draft, false);
});
test("timpa mempertahankan publishedAt dan koreksi lama, menambah koreksi baru", () => {
  const lama = { publishedAt: "2026-10-25", corrections: [{ date: "2026-10-26", text: "Lama" }] };
  const a = catatanDariNote(note, { hariIni: "2026-11-01", terbit: true, lama, koreksi: "Angka diperbaiki" });
  assert.equal(a.frontmatter.publishedAt, "2026-10-25");
  assert.deepEqual(a.frontmatter.corrections, [{ date: "2026-10-26", text: "Lama" }, { date: "2026-11-01", text: "Angka diperbaiki" }]);
});
test("timpa tanpa koreksi tidak menambah koreksi", () => {
  const lama = { publishedAt: "2026-10-25", corrections: [] };
  assert.deepEqual(catatanDariNote(note, { hariIni: "2026-11-01", terbit: true, lama }).frontmatter.corrections ?? [], []);
});
test("ApaKataRiset ditambahkan kalau ada claims", () => {
  const a = catatanDariNote({ ...note, body: "Teks" }, { hariIni: "2026-11-01", terbit: false });
  assert.match(a.body, /<ApaKataRiset \/>$/);
  assert.equal(a.apaKataRisetDitambah, true);
});
