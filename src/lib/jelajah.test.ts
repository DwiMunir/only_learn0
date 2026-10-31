import test from "node:test";
import assert from "node:assert/strict";
import type { Article } from "./content";
import { keRingkas, normalisasi, saring, type Ringkas } from "./jelajah";

function r(slug: string, terbit: string, isi: Partial<Ringkas> = {}): Ringkas {
  return {
    slug,
    judul: `Judul ${slug}`,
    deskripsi: "",
    ringkasan: [],
    topik: "uang",
    namaTopik: "Uang",
    terbit,
    menit: 3,
    sumber: 2,
    draft: false,
    ...isi,
  };
}

const daftar: Ringkas[] = [
  r("lama", "2026-10-25"),
  r("baru", "2026-10-28T08:39", { topik: "karier", namaTopik: "Karier" }),
  r("tengah", "2026-10-26T05:35", {
    topik: "psikologi-sehari-hari",
    namaTopik: "Psikologi sehari-hari",
    judul: "Ngopi di café",
    ringkasan: ["Mood bisa menular lewat obrolan"],
  }),
  r("pagi", "2026-10-26"),
];

const slugs = (xs: Ringkas[]) => xs.map((x) => x.slug);

test("urutan bawaan terbaru dulu, jam ikut dihitung", () => {
  assert.deepEqual(slugs(saring(daftar, {})), ["baru", "tengah", "pagi", "lama"]);
  assert.deepEqual(slugs(saring(daftar, { urut: "terbaru" })), ["baru", "tengah", "pagi", "lama"]);
});

test("terlama membalik urutan", () => {
  assert.deepEqual(slugs(saring(daftar, { urut: "terlama" })), ["lama", "pagi", "tengah", "baru"]);
});

test("saring tidak mengubah daftar asli", () => {
  const salinan = slugs(daftar);
  saring(daftar, { urut: "terlama" });
  assert.deepEqual(slugs(daftar), salinan);
});

test("filter topik", () => {
  assert.deepEqual(slugs(saring(daftar, { topik: "uang" })), ["pagi", "lama"]);
  assert.deepEqual(slugs(saring(daftar, { topik: "karier" })), ["baru"]);
  assert.deepEqual(slugs(saring(daftar, { topik: "" })), ["baru", "tengah", "pagi", "lama"]);
});

test("cari tidak peka huruf besar dan aksen", () => {
  assert.deepEqual(slugs(saring(daftar, { q: "PSIKOLOGI" })), ["tengah"]);
  assert.deepEqual(slugs(saring(daftar, { q: "cafe" })), ["tengah"]);
  assert.deepEqual(slugs(saring(daftar, { q: "CAFÉ" })), ["tengah"]);
});

test("cari mencakup judul, deskripsi, ringkasan, dan nama topik", () => {
  const d = [
    r("j", "2026-10-01", { judul: "Gaji pertama" }),
    r("d", "2026-10-02", { deskripsi: "Soal gaji dan tabungan" }),
    r("s", "2026-10-03", { ringkasan: ["Bukan soal gaji"] }),
    r("t", "2026-10-04", { namaTopik: "Gaji" }),
    r("x", "2026-10-05"),
  ];
  assert.deepEqual(slugs(saring(d, { q: "gaji" })), ["t", "s", "d", "j"]);
});

test("query banyak kata: semua kata harus ada", () => {
  assert.deepEqual(slugs(saring(daftar, { q: "mood obrolan" })), ["tengah"]);
  assert.deepEqual(slugs(saring(daftar, { q: "  menular   café " })), ["tengah"]);
  assert.deepEqual(slugs(saring(daftar, { q: "mood karier" })), []);
});

test("q kosong atau spasi saja mengembalikan semua", () => {
  assert.equal(saring(daftar, { q: "" }).length, 4);
  assert.equal(saring(daftar, { q: "   " }).length, 4);
  assert.equal(saring(daftar, {}).length, 4);
});

test("cari dan topik bisa digabung", () => {
  assert.deepEqual(slugs(saring(daftar, { q: "judul", topik: "uang", urut: "terlama" })), ["lama", "pagi"]);
});

test("normalisasi: huruf kecil, tanpa aksen, spasi dirapikan", () => {
  assert.equal(normalisasi("  Café   AU\tLait\n"), "cafe au lait");
  assert.equal(normalisasi("Psikologi Sehari-hari"), "psikologi sehari-hari");
});

function artikel(fm: Partial<Article["frontmatter"]> = {}): Article {
  return {
    slug: "uji",
    file: "/x/uji.mdx",
    body: "",
    readingMinutes: 4,
    sources: [{}, {}, {}] as Article["sources"],
    frontmatter: {
      title: "Judul",
      description: "Deskripsi",
      topic: "karier",
      publishedAt: "2026-10-26T05:35",
      checkedAt: "2026-10-26",
      draft: false,
      summary: ["Satu", "Dua"],
      sources: [],
      claims: [],
      corrections: [],
      ...fm,
    },
  };
}

test("keRingkas memetakan artikel ke data ringkas", () => {
  assert.deepEqual(keRingkas(artikel({ reel: { poster: "/reels/uji.jpg" } })), {
    slug: "uji",
    judul: "Judul",
    deskripsi: "Deskripsi",
    ringkasan: ["Satu", "Dua"],
    topik: "karier",
    namaTopik: "Karier",
    terbit: "2026-10-26T05:35",
    menit: 4,
    sumber: 3,
    gambar: "/reels/uji.jpg",
    draft: false,
  });
});

test("gambar: thumbnail dulu, lalu poster reel, lalu tidak ada", () => {
  assert.equal(keRingkas(artikel({ thumbnail: "/thumbs/uji.jpg", reel: { poster: "/reels/uji.jpg" } })).gambar, "/thumbs/uji.jpg");
  assert.equal(keRingkas(artikel({ reel: { poster: "/reels/uji.jpg" } })).gambar, "/reels/uji.jpg");
  assert.equal(keRingkas(artikel()).gambar, undefined);
});

test("gambar yang filenya tidak ada dilewati", () => {
  const a = artikel({ thumbnail: "/thumbs/uji.jpg", reel: { poster: "/reels/uji.jpg" } });
  assert.equal(keRingkas(a, (p) => p !== "/thumbs/uji.jpg").gambar, "/reels/uji.jpg");
  assert.equal(keRingkas(a, () => false).gambar, undefined);
});
