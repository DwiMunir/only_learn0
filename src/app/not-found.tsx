import { GlassHero } from "@/components/hero";
import { TopBar } from "@/components/top-bar";
import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <TopBar />
      <main>
        <GlassHero>
          <h1 className="text-headline font-headline text-primary">Catatan ini tidak ditemukan</h1>
          <p className="mt-2 text-body text-ink">
            Mungkin link-nya salah ketik, atau catatannya sedang diperbarui. Cari dari daftar catatan.
          </p>
        </GlassHero>
        <Container>
          <div className="max-w-[680px] pt-6">
            <ButtonLink href="/catatan" >
              Lihat semua catatan
            </ButtonLink>
          </div>
        </Container>
      </main>
    </>
  );
}
