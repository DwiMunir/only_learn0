import { z } from "zod";
import { evidenceLevelKeys } from "./evidence";
import { topicSlugs } from "./site";

/**
 * Dua schema di file ini:
 * 1. frontmatterSchema  — header YAML di setiap file content/catatan/*.mdx
 * 2. researchNoteSchema — kontrak JSON dari pipeline Morena (lihat docs/03-integrasi-morena-redipost.md)
 */

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal harus YYYY-MM-DD, misalnya 2026-10-25");

/** YAML mengubah 2026-10-25 (tanpa kutip) jadi Date. Kita normalkan lagi ke string. */
const fmDate = z.preprocess(
  (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v),
  isoDate,
);

/**
 * Waktu terbit: tanggal saja, atau tanggal + jam UTC (YYYY-MM-DDTHH:mm). Jam dipakai untuk mengurutkan artikel yang
 * terbit di hari yang sama. Yang tampil di situs tetap tanggalnya saja.
 */
const isoWaktu = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2})?$/, "Format harus YYYY-MM-DD atau YYYY-MM-DDTHH:mm (UTC), misalnya 2026-10-25T05:35");
const fmWaktu = z.preprocess((v) => {
  if (!(v instanceof Date)) return v;
  const iso = v.toISOString();
  return iso.slice(11, 16) === "00:00" ? iso.slice(0, 10) : iso.slice(0, 16);
}, isoWaktu);

export const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Slug hanya huruf kecil, angka, dan tanda hubung");

const instagramUrl = z
  .url()
  .regex(/^https:\/\/(www\.)?instagram\.com\/(reel|p)\/[A-Za-z0-9_-]+\/?/, "Harus link reel Instagram");

function makeSourceSchema<D extends z.ZodType<string>>(date: D) {
  return z.object({
    id: slugSchema.describe("ID unik, dipakai di <Klaim sumber=\"...\">. Contoh: stone-2012"),
    title: z.string().min(1).describe("Judul sumber asli"),
    authors: z.string().min(1).describe("Penulis atau lembaga. Contoh: Stone, Schneider & Harter"),
    year: z.number().int().min(1800).max(2100),
    publisher: z.string().optional().describe("Jurnal, penerbit, atau lembaga"),
    url: z.url().describe("Link ke sumber asli (DOI, jurnal, laporan resmi)"),
    level: z.enum(evidenceLevelKeys).describe("Level bukti"),
    supports: z.string().min(1).describe("Satu kalimat: apa yang didukung sumber ini"),
    note: z.string().optional().describe("Catatan kecil di bawah meteran bukti"),
    checkedAt: date.optional().describe("Tanggal sumber dicek. Default: checkedAt artikel"),
  });
}

const claimSchema = z.object({
  text: z.string().min(1).describe("Klaim singkat untuk bagian Apa kata riset"),
  sources: z.array(slugSchema).min(1).describe("ID sumber pendukung"),
});

export const frontmatterSchema = z.object({
  title: z.string().min(1).describe("Sama dengan hook reel"),
  description: z.string().min(1).max(200).describe("Untuk Google dan preview link"),
  topic: z.enum(topicSlugs),
  publishedAt: fmWaktu,
  checkedAt: fmDate,
  draft: z.boolean().default(false),
  reel: z
    .object({
      url: instagramUrl.optional(),
      poster: z.string().optional(),
    })
    .optional(),
  summary: z.array(z.string().min(1)).min(1).max(5),
  sources: z.array(makeSourceSchema(fmDate)).min(1),
  claims: z.array(claimSchema).default([]),
  corrections: z.array(z.object({ date: fmDate, text: z.string().min(1) })).default([]),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;
export type Source = Frontmatter["sources"][number];
export type Claim = Frontmatter["claims"][number];

/** Kontrak data dari Morena → blog. Diekspor ke schemas/research-note.schema.json lewat `npm run schema`. */
export const researchNoteSchema = z.object({
  slug: slugSchema,
  topic: z.enum(topicSlugs),
  hook: z.string().min(1).describe("Hook reel, jadi judul artikel"),
  description: z.string().min(1).max(200),
  summary: z.array(z.string().min(1)).min(1).max(5),
  body: z
    .string()
    .min(1)
    .describe("Isi artikel dalam MDX. Tandai klaim dengan <Klaim sumber=\"id\">...</Klaim>"),
  sources: z.array(makeSourceSchema(isoDate)).min(1),
  claims: z.array(claimSchema).default([]),
  reel: z
    .object({
      url: instagramUrl.optional(),
      poster: z.string().optional(),
    })
    .optional(),
  checkedAt: isoDate.optional(),
});

export type ResearchNote = z.infer<typeof researchNoteSchema>;

/** Ringkas error zod jadi daftar baris yang mudah dibaca. */
export function formatZodError(error: z.ZodError): string[] {
  return error.issues.map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`);
}
