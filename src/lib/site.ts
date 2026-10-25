/**
 * Konfigurasi situs. Ubah teks, handle Instagram, topik, dan lead magnet di sini.
 */
export const site = {
  name: "Only Learn",
  wordmark: "only learn",
  tagline: "Riset di balik setiap reel.",
  intro: "Tiap konten @only_learn0 ada sumbernya. Ini catatan lengkapnya.",
  description:
    "Catatan riset di balik setiap reel @only_learn0: uang, karier, dan psikologi sehari-hari, lengkap dengan sumber dan level buktinya.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  author: "Only Learn",
  instagram: {
    handle: "only_learn0",
    url: "https://www.instagram.com/only_learn0/",
    dm: "https://ig.me/m/only_learn0",
  },
  leadMagnet: {
    enabled: true,
    title: "Kit jawaban interview HRD",
    body: "Contoh jawaban untuk pertanyaan HRD yang paling sering muncul, plus cara menyesuaikannya dengan pengalamanmu.",
    cta: "Ambil kit gratis",
    // Sementara diarahkan ke DM Instagram. Ganti ke halaman kit kalau sudah ada.
    href: "https://ig.me/m/only_learn0",
  },
} as const;

export const topics = [
  {
    slug: "uang",
    name: "Uang",
    description: "Catatan riset soal kebiasaan dan psikologi uang anak muda.",
  },
  {
    slug: "karier",
    name: "Karier",
    description: "Catatan riset soal cari kerja, interview, dan dunia kantor.",
  },
  {
    slug: "psikologi-sehari-hari",
    name: "Psikologi sehari-hari",
    description: "Catatan riset soal kebiasaan, emosi, dan relasi sehari-hari.",
  },
] as const;

export type Topic = (typeof topics)[number];
export type TopicSlug = Topic["slug"];
export const topicSlugs = topics.map((t) => t.slug) as [TopicSlug, ...TopicSlug[]];

export function getTopic(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}
