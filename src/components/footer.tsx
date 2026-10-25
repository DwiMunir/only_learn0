import Link from "next/link";
import { site } from "@/lib/site";
import { Container } from "./ui";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line py-8">
      <Container className="flex flex-wrap items-center gap-x-6 gap-y-2 text-caption font-caption text-ink-muted">
        <Link href="/cara-aku-riset" className="hover:text-primary">
          Cara aku riset
        </Link>
        <Link href="/tentang" className="hover:text-primary">
          Tentang
        </Link>
        <a href={site.instagram.url} target="_blank" rel="noopener" className="hover:text-primary">
          Instagram
        </a>
        <span>© {new Date().getFullYear()} {site.name}</span>
      </Container>
    </footer>
  );
}
