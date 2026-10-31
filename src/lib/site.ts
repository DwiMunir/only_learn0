/**
 * Konfigurasi situs. Ubah teks, handle Instagram, dan topik di sini.
 */
export const site = {
  name: "Only Learn",
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
} as const;

export const topics = [
  {
    slug: "uang",
    name: "Uang",
    emoji: "🪙",
    description: "Catatan riset soal kebiasaan dan psikologi uang anak muda.",
  },
  {
    slug: "karier",
    name: "Karier",
    emoji: "💼",
    description: "Catatan riset soal cari kerja, interview, dan dunia kantor.",
  },
  {
    slug: "psikologi-sehari-hari",
    name: "Psikologi sehari-hari",
    emoji: "💜",
    description: "Catatan riset soal kebiasaan, emosi, dan relasi sehari-hari.",
  },
] as const;

export type Topic = (typeof topics)[number];
export type TopicSlug = Topic["slug"];
export const topicSlugs = topics.map((t) => t.slug) as [TopicSlug, ...TopicSlug[]];

export function getTopic(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}
