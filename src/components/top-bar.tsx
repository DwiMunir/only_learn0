"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site, topics } from "@/lib/site";
import { ChevronLeftIcon } from "./icons";

type Props = { back?: { href: string; label: string } };

export function TopBar({ back }: Props) {
  const sentinel = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="h-px" />
      <header
        className={`sticky top-0 z-20 bg-paper ${scrolled ? "border-b border-line" : "border-b border-transparent"}`}
      >
        <div className="mx-auto flex h-14 max-w-[1080px] items-center justify-between gap-4 px-4">
          {back ? (
            <Link href={back.href} className="-ml-1 flex items-center gap-1 text-label font-label">
              <ChevronLeftIcon />
              {back.label}
            </Link>
          ) : (
            <Link href="/" className="text-[1.25rem] font-extrabold tracking-[-0.02em]">
              {site.wordmark}
            </Link>
          )}

          <nav aria-label="Topik" className="hidden items-center gap-6 text-label font-label lg:flex">
            {topics.map((t) => (
              <Link key={t.slug} href={`/topik/${t.slug}`} className="hover:text-primary">
                {t.name}
              </Link>
            ))}
            <Link href="/cara-aku-riset" className="hover:text-primary">
              Cara aku riset
            </Link>
          </nav>

          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener"
            className="text-label font-label text-primary lg:rounded-md lg:bg-primary lg:px-4 lg:py-2.5 lg:text-on-primary lg:hover:bg-primary-strong"
          >
            Follow
          </a>
        </div>
      </header>
    </>
  );
}
