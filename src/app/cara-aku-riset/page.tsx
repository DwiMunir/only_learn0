import type { Metadata } from "next";
import Link from "next/link";
import { EvidenceMeter } from "@/components/evidence-meter";
import { CorrectionNote } from "@/components/research";
import { GlassHero } from "@/components/hero";
import { TopBar } from "@/components/top-bar";
import { ButtonLink, Container, SectionTitle } from "@/components/ui";
import { getAllCorrections } from "@/lib/content";
import { evidenceLevelKeys, evidenceLevels } from "@/lib/evidence";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cara aku riset",
  description: "Dari mana sumber catatan Only Learn berasal, arti label bukti, dan catatan koreksi.",
  alternates: { canonical: "/cara-aku-riset" },
};

const steps = [
  { title: "Mulai dari pertanyaan", body: "Biasanya dari komentar dan DM yang paling sering muncul." },
  { title: "Cari sumber primer", body: "Jurnal, laporan survei, dan aturan resmi. Bukan artikel yang mengutip ulang." },
  { title: "Beri label bukti", body: "Setiap klaim dapat label seberapa kuat buktinya." },
  { title: "Cek ulang dan catat tanggalnya", body: "Kalau ada yang keliru, aku perbaiki dan catat di halaman ini." },
];

export default function MethodPage() {
  const corrections = getAllCorrections();

  return (
    <>
      <TopBar back={{ href: "/", label: "Beranda" }} />
      <main>
        <GlassHero>
          <h1 className="text-headline font-headline text-primary">Cara aku riset</h1>
          <p className="mt-2 text-body text-ink">
            Setiap reel di @{site.instagram.handle} berangkat dari pertanyaan sehari-hari. Halaman ini menjelaskan
            dari mana jawabannya datang, dan seberapa kuat buktinya.
          </p>
        </GlassHero>
        <Container>
          <div className="max-w-[680px] pt-6">
            <section aria-labelledby="langkah">
              <SectionTitle id="langkah">Empat langkah</SectionTitle>
              <ol className="space-y-4">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex gap-4 rounded-2xl bg-surface p-4">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-label font-label text-on-primary">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-item-title font-item-title">{s.title}</p>
                      <p className="mt-0.5 text-body text-ink-muted">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="label-bukti" className="mt-12">
              <SectionTitle id="label-bukti">Arti label bukti</SectionTitle>
              <ul className="space-y-3">
                {evidenceLevelKeys.map((key) => (
                  <li key={key} className="rounded-2xl bg-surface p-4">
                    <EvidenceMeter level={key} />
                    <p className="mt-1.5 text-body text-ink-muted">{evidenceLevels[key].explain}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="koreksi" className="mt-12 scroll-mt-20">
              <SectionTitle id="koreksi">Catatan koreksi</SectionTitle>
              {corrections.length > 0 ? (
                <div className="space-y-3">
                  {corrections.map((c) => (
                    <CorrectionNote key={c.article.slug + c.date + c.text} date={c.date}>
                      {c.text}{" "}
                      <Link href={`/catatan/${c.article.slug}`} className="underline underline-offset-2">
                        Lihat catatannya
                      </Link>
                    </CorrectionNote>
                  ))}
                </div>
              ) : (
                <p className="text-body text-ink-muted">Belum ada koreksi.</p>
              )}
              <p className="mt-6 text-body">Nemu yang keliru?</p>
              <ButtonLink href={site.instagram.dm} external variant="secondary" className="mt-3">
                Kirim koreksi lewat DM
              </ButtonLink>
            </section>
          </div>
        </Container>
      </main>
    </>
  );
}
