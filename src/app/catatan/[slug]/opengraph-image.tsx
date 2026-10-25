import { ImageResponse } from "next/og";
import { getAllArticles, getArticle } from "@/lib/content";
import { getTopic, site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Catatan riset Only Learn";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

/** Gambar preview saat link dibagikan di WhatsApp, DM, atau X. */
export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  const title = article?.frontmatter.title ?? site.name;
  const topic = article ? getTopic(article.frontmatter.topic)?.name : undefined;
  const count = article?.sources.length ?? 0;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFFFFF",
          color: "#1B2430",
          padding: "64px 72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 32, fontWeight: 800 }}>{site.wordmark}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 60,
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              backgroundImage: "linear-gradient(transparent 62%, #FFE066 62%)",
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ display: "flex", gap: 32, fontSize: 28, color: "#5A6472" }}>
          {topic && <span>{topic}</span>}
          <span>{count} sumber</span>
          <span style={{ color: "#1F3FAF" }}>@{site.instagram.handle}</span>
        </div>
      </div>
    ),
    size,
  );
}
