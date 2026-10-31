import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PitaHalaman } from "@/components/hero";
import { DaftarJelajah, Jelajah, KotakCari } from "@/components/jelajah";
import { TopBar } from "@/components/top-bar";
import { ButtonLink, Container } from "@/components/ui";
import { getAllRingkas } from "@/lib/content";
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
  // Semua artikel ikut dikirim supaya chip topik lain tetap bisa menyaring di tempat
  const daftar = getAllRingkas();
  const adaArtikel = daftar.some((a) => a.topik === topic.slug);

  const pita = (cari: boolean) => (
    <PitaHalaman>
      <h1 className="text-headline font-headline text-navy">{topic.name}</h1>
      <p className="mt-2 text-body text-ink">{topic.description}</p>
      {cari && (
        <div className="mt-5 max-w-[520px]">
          <KotakCari />
        </div>
      )}
    </PitaHalaman>
  );

  return (
    <>
      <TopBar back={{ href: "/", label: "Beranda" }} aktif={topic.slug} />
      <main>
        {adaArtikel ? (
          <Jelajah daftar={daftar} topikAwal={topic.slug}>
            {pita(true)}
            <Container>
              <div className="max-w-[800px] pt-4">
                <DaftarJelajah />
              </div>
            </Container>
          </Jelajah>
        ) : (
          <>
            {pita(false)}
            <Container>
              <div className="mt-4 max-w-[800px] rounded-2xl border border-line bg-paper p-6">
                <p className="text-body">
                  Belum ada catatan di topik {topic.name}. Ada pertanyaan yang ingin dibahas? Kirim lewat DM.
                </p>
                <ButtonLink href={site.instagram.dm} external variant="secondary" className="mt-4">
                  Kirim pertanyaan lewat DM
                </ButtonLink>
              </div>
            </Container>
          </>
        )}
      </main>
    </>
  );
}
