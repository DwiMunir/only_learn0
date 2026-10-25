import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReelEmbed } from "@/components/reel-embed";
import { ApaKataRiset, CorrectionNote, Klaim, SourceList } from "@/components/research";
import { SourceDialogProvider, type SheetSource } from "@/components/source-dialog";
import { TopBar } from "@/components/top-bar";
import { ButtonLink, Container } from "@/components/ui";
import { getAllArticles, getArticle } from "@/lib/content";
import type { EvidenceLevel } from "@/lib/evidence";
import { formatDate } from "@/lib/format";
import { renderMdx } from "@/lib/mdx";
import { getTopic, site } from "@/lib/site";
import type { ReactNode } from "react";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const fm = article.frontmatter;
  return {
    title: fm.title,
    description: fm.description,
    alternates: { canonical: `/catatan/${slug}` },
    openGraph: {
      type: "article",
      title: fm.title,
      description: fm.description,
      publishedTime: fm.publishedAt,
      modifiedTime: fm.checkedAt,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const fm = article.frontmatter;
  const topic = getTopic(fm.topic);
  const sources = article.sources;

  const seen = new Set<string>();
  const content = await renderMdx(article.body, {
    Klaim: (props: { sumber: string; children: ReactNode }) => <Klaim {...props} sources={sources} seen={seen} />,
    ApaKataRiset: () => <ApaKataRiset claims={fm.claims} sources={sources} />,
  });

  const sheetSources: SheetSource[] = sources.map((s) => ({
    id: s.id,
    n: s.n,
    title: s.title,
    authors: s.authors,
    year: s.year,
    publisher: s.publisher,
    url: s.url,
    level: s.level as EvidenceLevel,
    supports: s.supports,
    note: s.note,
    checkedLabel: formatDate(s.checkedAt),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: fm.title,
    description: fm.description,
    datePublished: fm.publishedAt,
    dateModified: fm.checkedAt,
    inLanguage: "id",
    author: { "@type": "Organization", name: site.author, url: site.instagram.url },
    mainEntityOfPage: `${site.url}/catatan/${slug}`,
    citation: sources.map((s) => ({
      "@type": "CreativeWork",
      name: s.title,
      author: s.authors,
      datePublished: String(s.year),
      url: s.url,
    })),
  };

  return (
    <>
      <TopBar back={{ href: "/catatan", label: "Semua catatan" }} />
      <main>
        <Container>
          <article className="max-w-[680px] pt-6">
            {/* "<" di-escape: teks frontmatter tidak boleh bisa menutup tag <script> ini */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
            />

            <header>
              <div className="flex flex-wrap items-center gap-2">
                {topic && (
                  <Link
                    href={`/topik/${topic.slug}`}
                    className="inline-flex h-8 items-center rounded-full bg-surface px-3 text-label font-label"
                  >
                    {topic.name}
                  </Link>
                )}
                {fm.draft && (
                  <span className="inline-flex h-8 items-center rounded-full border border-ink-muted px-3 text-label font-label">
                    Draft
                  </span>
                )}
              </div>
              <h1 className="mt-3 text-headline font-headline lg:text-[2.25rem] lg:leading-[1.15]">{fm.title}</h1>
              <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-caption font-caption text-ink-muted">
                <span>Dicek {formatDate(fm.checkedAt)}</span>
                <span>{sources.length} sumber</span>
                <span>{article.readingMinutes} menit baca</span>
              </p>
              <ReelEmbed url={fm.reel?.url} poster={fm.reel?.poster} title={fm.title} />
            </header>

            <section aria-labelledby="ringkasan" className="mt-8">
              <h2 id="ringkasan" className="mb-3 text-title font-title">
                Ringkasan
              </h2>
              <ul className="list-disc space-y-2 pl-5 text-body marker:text-ink-muted">
                {fm.summary.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </section>

            <SourceDialogProvider sources={sheetSources}>
              <div className="prose-artikel mt-2">{content}</div>
            </SourceDialogProvider>

            <SourceList sources={sources} />

            {fm.corrections.length > 0 && (
              <section aria-labelledby="koreksi" className="mt-10 space-y-3">
                <h2 id="koreksi" className="text-title font-title">
                  Koreksi
                </h2>
                {fm.corrections.map((c) => (
                  <CorrectionNote key={c.date + c.text} date={c.date}>
                    {c.text}
                  </CorrectionNote>
                ))}
              </section>
            )}

            <p className="mt-8 text-caption font-caption text-ink-muted">
              Nemu yang keliru? Kirim lewat DM @{site.instagram.handle}, aku perbaiki dan catat di{" "}
              <Link href="/cara-aku-riset#koreksi" className="text-primary underline underline-offset-2">
                halaman koreksi
              </Link>
              .
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 lg:flex-row">
              <ButtonLink href={site.instagram.url} external>
                Follow @{site.instagram.handle}
              </ButtonLink>
              <Link href="/catatan" className="text-label font-label text-primary">
                Baca catatan lain
              </Link>
            </div>
          </article>
        </Container>
      </main>
    </>
  );
}
