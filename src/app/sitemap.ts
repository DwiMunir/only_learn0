import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/content";
import { site, topics } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles({ includeDrafts: false });
  return [
    { url: `${site.url}/`, changeFrequency: "daily", priority: 1 },
    { url: `${site.url}/catatan`, changeFrequency: "daily", priority: 0.8 },
    { url: `${site.url}/cara-aku-riset`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/tentang`, changeFrequency: "yearly", priority: 0.3 },
    ...topics.map((t) => ({ url: `${site.url}/topik/${t.slug}`, changeFrequency: "weekly" as const, priority: 0.6 })),
    ...articles.map((a) => ({
      url: `${site.url}/catatan/${a.slug}`,
      lastModified: a.frontmatter.checkedAt,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
