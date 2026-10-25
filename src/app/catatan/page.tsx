import type { Metadata } from "next";
import { ReelList } from "@/components/reel-row";
import { TopBar } from "@/components/top-bar";
import { TopicChips } from "@/components/topic-chips";
import { Container } from "@/components/ui";
import { getAllArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Semua catatan",
  description: "Semua catatan riset di balik reel @only_learn0.",
  alternates: { canonical: "/catatan" },
};

export default function AllNotesPage() {
  const articles = getAllArticles();
  return (
    <>
      <TopBar back={{ href: "/", label: "Beranda" }} />
      <main>
        <Container>
          <div className="max-w-[680px] pt-6">
            <h1 className="text-headline font-headline">Semua catatan</h1>
            <p className="mt-2 text-body text-ink-muted">{articles.length} catatan, terbaru dulu.</p>
            <div className="mt-5 mb-4">
              <TopicChips />
            </div>
            <ReelList articles={articles} showDate />
          </div>
        </Container>
      </main>
    </>
  );
}
