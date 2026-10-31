import Link from "next/link";
import { HeroBeranda } from "@/components/hero";
import { ReelList } from "@/components/reel-row";
import { TopBar } from "@/components/top-bar";
import { TopicChips } from "@/components/topic-chips";
import { ButtonLink, Container } from "@/components/ui";
import { getAllArticles } from "@/lib/content";
import { site } from "@/lib/site";

const HOME_LIMIT = 6;

export default function HomePage() {
  const articles = getAllArticles();
  const latest = articles.slice(0, HOME_LIMIT);

  return (
    <>
      <TopBar />
      <main>
        <HeroBeranda />
        <Container>
          <section aria-labelledby="catatan-terbaru" className="max-w-[680px] pt-6">
            <h2 id="catatan-terbaru" className="text-title font-title text-primary">
              Catatan terbaru
            </h2>
            <div className="mt-3 mb-2">
              <TopicChips active="semua" ariaCurrent={false} />
            </div>
            {latest.length > 0 ? (
              <>
                <ReelList articles={latest} />
                {articles.length > HOME_LIMIT && (
                  <Link href="/catatan" className="mt-3 inline-block text-label font-label text-primary hover:underline">
                    Lihat semua catatan
                  </Link>
                )}
              </>
            ) : (
              <div className="mt-4 rounded-2xl bg-surface p-6">
                <p className="text-body">Catatan pertama sedang ditulis. Sementara itu, tonton reelnya di Instagram.</p>
                <ButtonLink href={site.instagram.url} external className="mt-4">
                  Buka @{site.instagram.handle}
                </ButtonLink>
              </div>
            )}
          </section>
        </Container>
      </main>
    </>
  );
}
