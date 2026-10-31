import type { Metadata } from "next";
import { PitaHalaman } from "@/components/hero";
import { DaftarJelajah, Jelajah, KotakCari } from "@/components/jelajah";
import { TopBar } from "@/components/top-bar";
import { Container } from "@/components/ui";
import { getAllRingkas } from "@/lib/content";

export const metadata: Metadata = {
  title: "Semua catatan",
  description: "Semua catatan riset di balik reel @only_learn0.",
  alternates: { canonical: "/catatan" },
};

export default function AllNotesPage() {
  const daftar = getAllRingkas();
  return (
    <>
      <TopBar back={{ href: "/", label: "Beranda" }} />
      <main>
        <Jelajah daftar={daftar}>
          <PitaHalaman>
            <h1 className="text-headline font-headline text-primary">Semua catatan</h1>
            <p className="mt-2 text-body text-ink">{daftar.length} catatan, lengkap dengan sumbernya.</p>
            <div className="mt-5 max-w-[520px]">
              <KotakCari />
            </div>
          </PitaHalaman>
          <Container>
            <div className="max-w-[800px] pt-4">
              <DaftarJelajah />
            </div>
          </Container>
        </Jelajah>
      </main>
    </>
  );
}
