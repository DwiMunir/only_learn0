import Link from "next/link";
import { site, topics } from "@/lib/site";
import { ChevronLeftIcon } from "./icons";
import { Wordmark } from "./ui";

type Props = { back?: { href: string; label: string } };

export function TopBar({ back }: Props) {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper">
      <div className="mx-auto flex h-14 max-w-[1080px] items-center justify-between gap-4 px-4">
        <Link href="/" className="shrink-0">
          <Wordmark />
        </Link>

        <nav aria-label="Topik" className="hidden items-center gap-6 text-label font-label text-ink lg:flex">
          {topics.map((t) => (
            <Link key={t.slug} href={`/topik/${t.slug}`} className="hover:text-accent">
              {t.name}
            </Link>
          ))}
          <Link href="/cara-aku-riset" className="hover:text-accent">
            Cara aku riset
          </Link>
        </nav>

        {back ? (
          <Link href={back.href} className="flex items-center gap-1 text-label font-label text-accent">
            <ChevronLeftIcon />
            {back.label}
          </Link>
        ) : (
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener"
            className="rounded-full border border-line px-3.5 py-1.5 text-label font-label text-primary hover:bg-primary-soft"
          >
            Follow
          </a>
        )}
      </div>
    </header>
  );
}
