import type { Metadata } from "next";
import { PitaHalaman } from "@/components/hero";
import { TopBar } from "@/components/top-bar";
import { Container } from "@/components/ui";
import { getAllRingkas } from "@/lib/content";
import { DaftarTersimpan } from "./daftar-tersimpan";

// Isinya beda per pembaca (localStorage), jadi tidak masuk sitemap dan tidak diindeks
export const metadata: Metadata = {
  title: "Tersimpan",
  description: "Artikel yang kamu simpan di perangkat ini.",
  robots: { index: false },
};

export default function TersimpanPage() {
  return (
    <>
      <TopBar back={{ href: "/", label: "Beranda" }} />
      <main>
        <PitaHalaman>
          <h1 className="text-headline font-headline text-navy">Tersimpan</h1>
          <p className="mt-2 text-body text-ink">Artikel yang kamu simpan di perangkat ini.</p>
        </PitaHalaman>
        <Container>
          <div className="max-w-[800px] pt-4">
            <DaftarTersimpan daftar={getAllRingkas()} />
          </div>
        </Container>
      </main>
    </>
  );
}
