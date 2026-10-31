import Link from "next/link";
import { site, topics, type TopicSlug } from "@/lib/site";
import { BookmarkIcon, ChevronLeftIcon, SearchIcon } from "./icons";
import { Wordmark } from "./ui";

type Props = { back?: { href: string; label: string }; aktif?: TopicSlug | "riset" };

const pill = "rounded-full px-3.5 py-1.5 text-label font-label whitespace-nowrap";

export function TopBar({ back, aktif }: Props) {
  const tautan = [
    ...topics.map((t) => ({ key: t.slug as TopicSlug | "riset", href: `/topik/${t.slug}`, name: t.name })),
    { key: "riset" as const, href: "/cara-aku-riset", name: "Cara aku riset" },
  ];
  const cls = (k: string) => `${pill} ${aktif === k ? "bg-primary text-white" : "text-ink hover:bg-primary-soft"}`;

  const ikon = "grid size-9 place-items-center rounded-full border border-line bg-paper text-ink hover:bg-primary-soft";

  // Hanya bilah utama yang menempel di atas; baris pil topik di HP ikut tergulir supaya header tetap pendek
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between gap-4 px-4 lg:h-16 lg:px-6">
          {/* Kiri: di mobile dengan `back` tampil tautan kembali, selainnya wordmark */}
          {back && (
            <Link href={back.href} className="flex items-center gap-1 text-label font-label text-primary lg:hidden">
              <ChevronLeftIcon />
              {back.label}
            </Link>
          )}
          <Link href="/" className={`shrink-0 ${back ? "hidden lg:block" : ""}`}>
            <Wordmark />
          </Link>

          <nav aria-label="Topik" className="hidden items-center gap-1 lg:flex">
            {tautan.map((t) => (
              <Link key={t.key} href={t.href} aria-current={aktif === t.key ? "page" : undefined} className={cls(t.key)}>
                {t.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/#cari" aria-label="Cari artikel" className={ikon}>
              <SearchIcon />
            </Link>
            <Link href="/tersimpan" aria-label="Artikel tersimpan" className={ikon}>
              <BookmarkIcon />
            </Link>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener"
              className="rounded-full bg-primary px-4 py-2 text-label font-label text-white hover:bg-primary-strong"
            >
              Follow
            </a>
          </div>
        </div>
      </header>

      {/* Mobile: baris pil topik yang bisa digeser, tidak menempel */}
      <nav aria-label="Topik" className="flex gap-2 overflow-x-auto border-b border-line bg-paper px-4 py-2 lg:hidden">
        {tautan.map((t) => (
          <Link key={t.key} href={t.href} aria-current={aktif === t.key ? "page" : undefined} className={cls(t.key)}>
            {t.name}
          </Link>
        ))}
      </nav>
    </>
  );
}
