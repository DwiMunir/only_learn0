import { readFileSync } from "node:fs";
import { join } from "node:path";
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
  // Monogram dibaca dari disk dan disematkan sebagai data URL
  const mark = `data:image/png;base64,${readFileSync(join(process.cwd(), "public/brand/ol-mark.png")).toString("base64")}`;
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
          backgroundImage: "linear-gradient(135deg, #FDE8D7 0%, #EEE6FB 50%, #DCEAFE 100%)",
          color: "#131B3A",
          padding: "64px 72px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -100,
            width: 360,
            height: 360,
            borderRadius: 9999,
            background: "#F9E0EC",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 32, fontWeight: 800 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mark} height={40} width={68} alt="" />
          <span style={{ display: "flex", gap: 10 }}>
            <span style={{ color: "#131B3A" }}>Only</span>
            <span style={{ color: "#2563EB" }}>Learn</span>
          </span>
        </div>
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
        <div style={{ display: "flex", gap: 32, fontSize: 28, color: "#5E6582" }}>
          {topic && <span>{topic}</span>}
          <span>{count} sumber</span>
          <span style={{ color: "#2563EB" }}>@{site.instagram.handle}</span>
        </div>
      </div>
    ),
    size,
  );
}
