/**
 * Cari, urut, dan filter topik untuk daftar artikel. Murni, tanpa akses file, jadi aman dipakai di browser.
 * Data ringkas disiapkan di server saat build, lalu disaring di browser.
 */
import type { Article } from "./content";
import { getTopic, topics, type TopicSlug } from "./site";

export type Ringkas = {
  slug: string;
  judul: string;
  deskripsi: string;
  ringkasan: string[];
  topik: string;
  namaTopik: string;
  terbit: string;
  menit: number;
  sumber: number;
  gambar?: string;
  draft: boolean;
};

/**
 * Artikel → data ringkas untuk kartu dan pencarian.
 * Gambar: thumbnail dulu, lalu poster reel. `ada` dipakai server untuk melewati file lokal yang belum ada,
 * supaya kartu jatuh ke gambar berikutnya atau ke kotak pengganti, bukan gambar rusak.
 */
export function keRingkas(a: Article, ada: (path: string) => boolean = () => true): Ringkas {
  const fm = a.frontmatter;
  const gambar = [fm.thumbnail, fm.reel?.poster].find((g): g is string => !!g && ada(g));
  return {
    slug: a.slug,
    judul: fm.title,
    deskripsi: fm.description,
    ringkasan: fm.summary,
    topik: fm.topic,
    namaTopik: getTopic(fm.topic)?.name ?? fm.topic,
    terbit: fm.publishedAt,
    menit: a.readingMinutes,
    sumber: a.sources.length,
    gambar,
    draft: fm.draft,
  };
}

/** Huruf kecil, aksen dibuang (café → cafe), spasi beruntun jadi satu. */
export function normalisasi(s: string): string {
  return s.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase().replace(/\s+/g, " ").trim();
}

// Teks yang dicari per artikel, dihitung sekali per objek (daftar tidak berubah selama halaman terbuka)
const cacheTeks = new WeakMap<Ringkas, string>();
function teksCari(r: Ringkas): string {
  let t = cacheTeks.get(r);
  if (t === undefined) {
    t = normalisasi([r.judul, r.deskripsi, ...r.ringkasan, r.namaTopik].join(" "));
    cacheTeks.set(r, t);
  }
  return t;
}

export type Urutan = "terbaru" | "terlama";

/**
 * Saring daftar: semua kata di `q` harus muncul, `topik` membatasi ke satu topik, lalu diurutkan menurut `terbit`.
 * Bandingkan teks biasa ("2026-10-26T06:13" > "2026-10-26"), sama seperti urutan di content.ts. Daftar asli tidak diubah.
 */
export function saring(daftar: Ringkas[], o: { q?: string; topik?: string; urut?: Urutan }): Ringkas[] {
  const kata = normalisasi(o.q ?? "").split(" ").filter(Boolean);
  const hasil = daftar
    .filter((r) => !o.topik || r.topik === o.topik)
    .filter((r) => kata.every((k) => teksCari(r).includes(k)))
    .sort((a, b) => (a.terbit < b.terbit ? 1 : a.terbit > b.terbit ? -1 : 0));
  return o.urut === "terlama" ? hasil.reverse() : hasil;
}

/**
 * Batas kartu awal (beranda): hanya berlaku saat pencarian kosong dan topik "Semua".
 * Begitu ada kata dicari atau topik dipilih, seluruh hasil tampil tanpa batas.
 */
export function batasi(hasil: Ringkas[], o: { q: string; topik: string; batas?: number }): Ringkas[] {
  if (!o.batas || o.topik || normalisasi(o.q)) return hasil;
  return hasil.slice(0, o.batas);
}

/** Jumlah artikel per topik untuk Kategori Populer. Topik tanpa artikel tetap muncul dengan 0. */
export function hitungPerTopik(daftar: Ringkas[]): Record<TopicSlug, number> {
  const hitung = Object.fromEntries(topics.map((t) => [t.slug, 0])) as Record<TopicSlug, number>;
  for (const r of daftar) {
    if (Object.hasOwn(hitung, r.topik)) hitung[r.topik as TopicSlug] += 1;
  }
  return hitung;
}
