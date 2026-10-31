import Link from "next/link";
import { topics, type TopicSlug } from "@/lib/site";
import { ArrowRightIcon } from "./icons";

const baris =
  "flex items-center gap-3 rounded-2xl px-2 py-2 transition-colors hover:bg-primary-soft focus-visible:outline-offset-0";

/** Ikon grafik batang kecil di samping judul. */
function IkonGrafik({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <rect x="3" y="12" width="5" height="9" rx="1.5" />
      <rect x="9.5" y="7" width="5" height="14" rx="1.5" />
      <rect x="16" y="3" width="5" height="18" rx="1.5" />
    </svg>
  );
}

/** Kartu Kategori Populer: jumlah artikel asli per topik, lalu tautan ke "Cara aku riset" tanpa angka. */
export function KategoriPopuler({ hitung }: { hitung: Record<TopicSlug, number> }) {
  return (
    <section
      aria-labelledby="judul-kategori"
      className="rounded-3xl border border-line bg-paper p-5 shadow-[0_2px_12px_rgba(19,27,58,0.06)]"
    >
      <h2 id="judul-kategori" className="flex items-center gap-2.5 px-2 text-title font-title text-navy">
        <IkonGrafik className="size-6 text-primary" />
        Kategori Populer
      </h2>

      <ul className="mt-3 flex flex-col gap-1">
        {topics.map((t) => (
          <li key={t.slug}>
            <Link href={`/topik/${t.slug}`} className={baris}>
              {/* Lingkaran emoji memakai latar label topik, sama dengan tag di kartu artikel */}
              <span aria-hidden="true" className={`grid size-10 shrink-0 place-items-center rounded-full text-lg ${t.warna.bg}`}>
                {t.emoji}
              </span>
              <span className="min-w-0 flex-1 text-body font-label text-ink">{t.name}</span>
              <span className="shrink-0 rounded-full bg-surface px-2.5 py-1 text-caption font-caption text-ink-muted">
                {hitung[t.slug]} artikel
              </span>
            </Link>
          </li>
        ))}
        <li>
          <Link href="/cara-aku-riset" className={baris}>
            <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full bg-surface text-lg">
              💡
            </span>
            <span className="min-w-0 flex-1 text-body font-label text-ink">Cara aku riset</span>
            <ArrowRightIcon className="mr-2 size-4 shrink-0 text-ink-muted" />
          </Link>
        </li>
      </ul>
    </section>
  );
}
