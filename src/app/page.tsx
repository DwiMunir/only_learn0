import { LeadMagnet } from "@/components/lead-magnet";
import { ReelList } from "@/components/reel-row";
import { TopBar } from "@/components/top-bar";
import { TopicChips } from "@/components/topic-chips";
import { ButtonLink, Container, SectionTitle } from "@/components/ui";
import { getAllArticles } from "@/lib/content";
import { site } from "@/lib/site";

const HOME_LIMIT = 4;

export default function HomePage() {
  const articles = getAllArticles();
  const latest = articles.slice(0, HOME_LIMIT);

  return (
    <>
      <TopBar />
      <main>
        <Container className="max-w-[680px] lg:max-w-[1080px]">
          <div className="max-w-[680px]">
            <section className="pt-8 pb-10">
              <h1 className="text-display font-display">{site.tagline}</h1>
              <p className="mt-3 text-body text-ink-muted">{site.intro}</p>
            </section>

            <section aria-labelledby="reel-terbaru">
              <SectionTitle id="reel-terbaru">Kamu dari reel yang mana?</SectionTitle>
              {latest.length > 0 ? (
                <>
                  <ReelList articles={latest} />
                  <ButtonLink href="/catatan" variant="secondary" className="mt-4">
                    Lihat semua catatan
                  </ButtonLink>
                </>
              ) : (
                <div className="rounded-lg bg-surface p-6">
                  <p className="text-body">Catatan pertama sedang ditulis. Sementara itu, tonton reelnya di Instagram.</p>
                  <ButtonLink href={site.instagram.url} external className="mt-4">
                    Buka @{site.instagram.handle}
                  </ButtonLink>
                </div>
              )}
            </section>

            <section aria-labelledby="topik" className="mt-10">
              <SectionTitle id="topik">Topik</SectionTitle>
              <TopicChips />
            </section>

            <div className="mt-10">
              <LeadMagnet />
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
