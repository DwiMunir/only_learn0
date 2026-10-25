/**
 * npm run reel -- <slug> <link-reel> [--poster /reels/slug.jpg]
 * Mengisi reel.url (dan poster) setelah reel terbit di Instagram lewat Redipost.
 */
import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import matter from "gray-matter";
import { CONTENT_DIR, parseArticleFile, validateArticle } from "../src/lib/content";
import { color, fail, printReports, toMdx } from "./_util";

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: { poster: { type: "string" } },
});

const [slug, url] = positionals;
if (!slug || !url) fail("Contoh: npm run reel -- sunday-scaries https://www.instagram.com/reel/De5eo3WFZqJ/");
if (!/^https:\/\/(www\.)?instagram\.com\/(reel|p)\/[A-Za-z0-9_-]+\/?/.test(url)) {
  fail("Link harus berupa link reel Instagram, misalnya https://www.instagram.com/reel/ABC123/");
}

const file = path.join(CONTENT_DIR, `${slug}.mdx`);
if (!fs.existsSync(file)) fail(`Catatan ${slug} tidak ditemukan di content/catatan.`);

const { data, content } = matter(fs.readFileSync(file, "utf8"));
const reel = { ...(data.reel ?? {}), url: url.split("?")[0] };
if (values.poster) reel.poster = values.poster;
if (typeof reel.poster === "string" && reel.poster.includes("GANTI_INI")) delete reel.poster;

fs.writeFileSync(file, toMdx({ ...data, reel }, content));
console.log(`${color.green("✓")} reel.url diperbarui di ${path.relative(process.cwd(), file)}\n`);
printReports([{ file, findings: validateArticle(parseArticleFile(file)) }]);
