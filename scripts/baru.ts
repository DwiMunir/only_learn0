/**
 * npm run baru -- "Hook reel kamu" --topik uang [--slug slug-pendek]
 * Membuat content/catatan/<slug>.mdx dari templates/catatan.mdx (status draft).
 */
import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import { CONTENT_DIR } from "../src/lib/content";
import { today } from "../src/lib/format";
import { topicSlugs } from "../src/lib/site";
import { color, fail } from "./_util";

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    topik: { type: "string" },
    slug: { type: "string" },
  },
});

const title = positionals.join(" ").trim();
if (!title) fail('Tulis judul (hook reel). Contoh: npm run baru -- "Kenapa gaji naik tapi tabungan nggak?" --topik uang');

const topic = values.topik;
if (!topic || !(topicSlugs as readonly string[]).includes(topic)) {
  fail(`Pilih --topik salah satu dari: ${topicSlugs.join(", ")}`);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 6)
    .join("-")
    .replace(/-+/g, "-");
}

const slug = values.slug ?? slugify(title);
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) fail(`Slug "${slug}" tidak valid. Pakai --slug huruf-kecil-pakai-strip.`);

const target = path.join(CONTENT_DIR, `${slug}.mdx`);
if (fs.existsSync(target)) fail(`File ${path.relative(process.cwd(), target)} sudah ada.`);

const template = fs.readFileSync(path.join(process.cwd(), "templates", "catatan.mdx"), "utf8");
const output = template
  .replaceAll("{{title}}", title.replace(/"/g, '\\"'))
  .replaceAll("{{topic}}", topic)
  .replaceAll("{{date}}", today())
  .replaceAll("{{slug}}", slug);

fs.mkdirSync(CONTENT_DIR, { recursive: true });
fs.writeFileSync(target, output);

console.log(`${color.green("✓")} Dibuat: ${path.relative(process.cwd(), target)} ${color.dim("(draft)")}`);
console.log(`
Langkah berikutnya:
  1. Isi semua bagian yang bertanda GANTI_INI
  2. npm run dev  → buka http://localhost:3000/catatan/${slug}
  3. npm run cek  → pastikan 0 error
  4. Ubah draft: false, lalu commit dan push
  Link pendek untuk caption: /c/${slug}`);
