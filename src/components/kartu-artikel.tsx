import Link from "next/link";
import { formatTanggalPanjang } from "@/lib/format";
import type { Ringkas } from "@/lib/jelajah";
import { ArrowRightIcon, CalendarIcon, ClockIcon, DocIcon } from "./icons";
import { ReelThumb } from "./reel-row";
import { TombolSimpan } from "./simpan";

export const warnaTag: Record<string, string> = {
  uang: "bg-tag-uang-bg text-tag-uang-fg",
  karier: "bg-tag-karier-bg text-tag-karier-fg",
  "psikologi-sehari-hari": "bg-tag-psikologi-bg text-tag-psikologi-fg",
};

/**
 * Kartu artikel. Aman dirender di server maupun di dalam komponen klien; tombol Simpan adalah pulau klien.
 * Seluruh kartu bisa diklik lewat tautan judul yang membentang (after:inset-0); tombol Simpan berada di atasnya.
 */
export function KartuArtikel({ a }: { a: Ringkas }) {
  return (
    <article className="group relative flex flex-col gap-3 rounded-2xl border border-line bg-paper p-3 shadow-[0_2px_12px_rgba(19,27,58,0.06)] transition-shadow hover:shadow-[0_8px_24px_rgba(19,27,58,0.1)] sm:flex-row sm:items-center sm:gap-5">
      <ReelThumb src={a.gambar} className="aspect-video w-full sm:w-[200px]" />

      <div className="min-w-0 flex-1 px-1 pb-1 sm:p-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-caption font-caption ${warnaTag[a.topik] ?? "bg-surface text-ink"}`}>
            {a.namaTopik}
          </span>
          {a.draft && <span className="rounded-full bg-surface px-2.5 py-0.5 text-caption font-caption text-ink">Draft</span>}
        </div>

        <h3 className="mt-2 line-clamp-2 text-item-title font-item-title text-ink group-hover:text-primary">
          {/* Cincin fokus digambar di ::after (seukuran kartu), bukan di tautan: h3 ber-line-clamp memotong outline tautan */}
          <Link
            href={`/catatan/${a.slug}`}
            className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-primary"
          >
            {a.judul}
          </Link>
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-caption font-caption text-ink-muted">
          <span className="inline-flex items-center gap-1.5">
            <CalendarIcon className="size-3.5" />
            <time dateTime={a.terbit.slice(0, 10)}>{formatTanggalPanjang(a.terbit)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon className="size-3.5" />
            {a.menit} menit baca
          </span>
          <span className="inline-flex items-center gap-1.5">
            <DocIcon className="size-3.5" />
            {a.sumber} sumber
          </span>
          <TombolSimpan slug={a.slug} judul={a.judul} />
        </div>
      </div>

      {/* Panah bulat (desktop). Dekoratif: kliknya ditangani tautan judul yang membentang */}
      <span
        aria-hidden="true"
        className="mr-2 hidden size-10 shrink-0 place-items-center rounded-full border border-line bg-paper text-navy transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-white sm:grid"
      >
        <ArrowRightIcon className="size-4" />
      </span>
    </article>
  );
}
