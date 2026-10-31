import Link from "next/link";
import { site } from "@/lib/site";
import { Container, Wordmark } from "./ui";

export function Footer() {
  const linkCls = "font-label text-label text-white hover:underline focus-visible:outline-white";
  return (
    <footer className="mt-16 bg-navy text-white/80">
      <Container className="py-8">
        <div className="inline-flex rounded-xl bg-paper px-3 py-1.5">
          <Link href="/">
            <Wordmark />
          </Link>
        </div>
        <p className="mt-3 text-caption font-caption">Riset di balik setiap reel @{site.instagram.handle}.</p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/cara-aku-riset" className={linkCls}>
            Cara aku riset
          </Link>
          <Link href="/tentang" className={linkCls}>
            Tentang
          </Link>
          <Link href="/tersimpan" className={linkCls}>
            Tersimpan
          </Link>
          <a href={site.instagram.url} target="_blank" rel="noopener" className={linkCls}>
            Instagram
          </a>
        </div>
        <p className="mt-4 text-caption font-caption text-white/60">
          © {new Date().getFullYear()} {site.name}
        </p>
      </Container>
    </footer>
  );
}
