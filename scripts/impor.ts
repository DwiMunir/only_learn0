/**
 * npm run impor -- path/ke/artikel.json [--cek] [--terbit] [--timpa] [--koreksi "<teks>"]
 * Mengubah artikel.json dari Morena menjadi content/catatan/<slug>.mdx.
 *   --cek      hanya validasi (tulis ke folder sementara), exit 1 kalau ada error
 *   --terbit   draft: false (tanpa ini hasilnya draft)
 *   --timpa    timpa file yang sudah ada, publishedAt dan koreksi lama dipertahankan
 *   --koreksi  catat koreksi baru (hanya bersama --timpa)
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { parseArgs } from "node:util";
import { CONTENT_DIR, parseArticleFile, validateArticle } from "../src/lib/content";
import { today } from "../src/lib/format";
import { formatZodError, researchNoteSchema } from "../src/lib/schema";
import { catatanDariNote } from "./_catatan";
import { color, fail, printReports, toMdx } from "./_util";

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    cek: { type: "boolean", default: false },
    terbit: { type: "boolean", default: false },
    timpa: { type: "boolean", default: false },
    koreksi: { type: "string" },
  },
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
const sudahAda = fs.existsSync(target);
if (values.koreksi && !sudahAda) fail("--koreksi hanya untuk artikel yang sudah ada (pakai --timpa).");
if (!values.cek && sudahAda && !values.timpa) {
  fail(`${path.relative(process.cwd(), target)} sudah ada. Tambahkan --timpa kalau memang mau menimpa.`);
}

// Riwayat (tanggal terbit, koreksi) diambil dari file lama hanya kalau memang ditimpa.
let lama;
if (sudahAda && values.timpa) {
  try {
    const { publishedAt, corrections } = parseArticleFile(target).frontmatter;
    lama = { publishedAt, corrections };
  } catch (e) {
    fail((e as Error).message);
  }
}

const hasil = catatanDariNote(note, {
  hariIni: today(),
  terbit: values.terbit,
  lama,
  koreksi: values.koreksi,
});
if (hasil.apaKataRisetDitambah) {
  console.log(color.yellow("! <ApaKataRiset /> tidak ada di body, ditambahkan di akhir. Pindahkan kalau perlu."));
}
const mdx = toMdx(hasil.frontmatter, hasil.body);

if (values.cek) {
  // Hanya validasi: tulis ke folder sementara, CONTENT_DIR tidak disentuh.
  const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "impor-cek-")), `${note.slug}.mdx`);
  fs.writeFileSync(file, mdx);
  let findings;
  try {
    findings = validateArticle(parseArticleFile(file));
  } catch (e) {
    fail((e as Error).message);
  }
  const errors = printReports([{ file, findings }]);
  process.exit(errors > 0 ? 1 : 0);
}

fs.mkdirSync(CONTENT_DIR, { recursive: true });
fs.writeFileSync(target, mdx);
const rel = path.relative(process.cwd(), target);
if (values.terbit) {
  console.log(`${color.green("✓")} Diterbitkan: ${rel}\n`);
  printReports([{ file: target, findings: validateArticle(parseArticleFile(target)) }]);
} else {
  console.log(`${color.green("✓")} Diimpor: ${rel} ${color.dim("(draft)")}\n`);
  printReports([{ file: target, findings: validateArticle(parseArticleFile(target)) }]);
  console.log(`
Sebelum terbit:
  1. Buka setiap link sumber, pastikan isinya benar-benar mendukung kalimat yang distabilo
  2. npm run dev  → cek tampilan di http://localhost:3000/catatan/${note.slug}
  3. Ubah draft: false (atau impor ulang dengan --terbit --timpa), commit, push`);
}
