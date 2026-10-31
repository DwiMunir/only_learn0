import { HeroBeranda } from "@/components/hero";
import { DaftarJelajah, Jelajah, KotakCari } from "@/components/jelajah";
import { KategoriPopuler } from "@/components/kategori-populer";
import { Langganan } from "@/components/langganan";
import { TopBar } from "@/components/top-bar";
import { ButtonLink } from "@/components/ui";
import { getAllRingkas } from "@/lib/content";
import { hitungPerTopik } from "@/lib/jelajah";
import { site } from "@/lib/site";

export default function HomePage() {
  const daftar = getAllRingkas();

  if (daftar.length === 0) {
    return (
      <>
        <TopBar />
        <main>
          <HeroBeranda />
          <div className="mx-auto max-w-[1200px] px-4 lg:px-6">
            <div className="max-w-[680px] rounded-2xl border border-line bg-paper p-6">
              <p className="text-body">Catatan pertama sedang ditulis. Sementara itu, tonton reelnya di Instagram.</p>
              <ButtonLink href={site.instagram.url} external className="mt-4">
                Buka @{site.instagram.handle}
              </ButtonLink>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <TopBar />
      <main>
        <Jelajah daftar={daftar}>
          <HeroBeranda>
            <KotakCari />
          </HeroBeranda>
          <div className="mx-auto grid max-w-[1200px] gap-8 px-4 lg:grid-cols-12 lg:px-6">
            <div className="min-w-0 lg:col-span-8">
              <DaftarJelajah />
            </div>
            {/* Sidebar: di HP turun ke bawah daftar */}
            <aside className="flex flex-col gap-6 lg:col-span-4">
              <Langganan />
              <KategoriPopuler hitung={hitungPerTopik(daftar)} />
            </aside>
          </div>
        </Jelajah>
      </main>
    </>
  );
}
