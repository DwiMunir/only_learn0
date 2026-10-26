import Link from "next/link";
import { site } from "@/lib/site";
import { Container, Wordmark } from "./ui";

export function Footer() {
  const linkCls = "font-label text-label text-paper hover:underline focus-visible:outline-paper";
  return (
    <footer className="mt-16 bg-primary text-on-dark">
      <Container className="py-8">
        <div className="inline-flex rounded-xl bg-paper px-3 py-1.5">
          <Link href="/" className="focus-visible:outline-paper">
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
          <a href={site.instagram.url} target="_blank" rel="noopener" className={linkCls}>
            Instagram
          </a>
        </div>
        <p className="mt-4 text-caption font-caption opacity-70">
          © {new Date().getFullYear()} {site.name}
        </p>
      </Container>
    </footer>
  );
}
