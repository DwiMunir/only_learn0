import { TopBar } from "@/components/top-bar";
import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <TopBar />
      <main>
        <Container>
          <div className="max-w-[680px] pt-10">
            <h1 className="text-headline font-headline">Catatan ini tidak ditemukan</h1>
            <p className="mt-3 text-body text-ink-muted">
              Mungkin link-nya salah ketik, atau catatannya sedang diperbarui. Cari dari daftar catatan.
            </p>
            <ButtonLink href="/catatan" className="mt-6">
              Lihat semua catatan
            </ButtonLink>
          </div>
        </Container>
      </main>
    </>
  );
}
