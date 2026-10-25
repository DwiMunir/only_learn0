import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReelList } from "@/components/reel-row";
import { TopBar } from "@/components/top-bar";
import { TopicChips } from "@/components/topic-chips";
import { ButtonLink, Container } from "@/components/ui";
import { getArticlesByTopic } from "@/lib/content";
import { getTopic, site, topics } from "@/lib/site";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return topics.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) return {};
  return { title: topic.name, description: topic.description, alternates: { canonical: `/topik/${slug}` } };
}

export default async function TopicPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();
  const articles = getArticlesByTopic(slug);

  return (
    <>
      <TopBar back={{ href: "/", label: "Beranda" }} />
      <main>
        <Container>
          <div className="max-w-[680px] pt-6">
            <h1 className="text-headline font-headline">{topic.name}</h1>
            <p className="mt-2 text-body text-ink-muted">{topic.description}</p>
            <div className="mt-5 mb-4">
              <TopicChips active={topic.slug} />
            </div>
            {articles.length > 0 ? (
              <ReelList articles={articles} showDate />
            ) : (
              <div className="rounded-lg bg-surface p-6">
                <p className="text-body">
                  Belum ada catatan di topik {topic.name}. Ada pertanyaan yang ingin dibahas? Kirim lewat DM.
                </p>
                <ButtonLink href={site.instagram.dm} external variant="secondary" className="mt-4">
                  Kirim pertanyaan lewat DM
                </ButtonLink>
              </div>
            )}
          </div>
        </Container>
      </main>
    </>
  );
}
