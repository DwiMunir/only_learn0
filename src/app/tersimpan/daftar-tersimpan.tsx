"use client";

import Link from "next/link";
import { KartuArtikel } from "@/components/kartu-artikel";
import { useSimpan, useTerpasang } from "@/components/simpan";
import type { Ringkas } from "@/lib/jelajah";

/** Kartu artikel yang slugnya ada di localStorage, urut dari yang terakhir disimpan. */
export function DaftarTersimpan({ daftar }: { daftar: Ringkas[] }) {
  const terpasang = useTerpasang();
  const { tersimpan } = useSimpan();

  // Saat render server dan hidrasi isi localStorage belum terbaca: jangan tampilkan pesan kosong yang menipu
  if (!terpasang) return <div className="min-h-40" />;

  const menurutSlug = new Map(daftar.map((a) => [a.slug, a]));
  // Slug yang artikelnya sudah tidak ada (dihapus atau masih draft) dilewati
  const kartu = tersimpan.map((s) => menurutSlug.get(s)).filter((a): a is Ringkas => a !== undefined);

  if (kartu.length === 0) {
    return (
      <div className="rounded-2xl border border-line bg-paper p-6 text-center">
        <p className="text-body text-ink">Belum ada artikel tersimpan.</p>
        <Link
          href="/"
          className="mt-3 inline-flex h-10 items-center rounded-full bg-primary px-5 text-label font-label text-white hover:bg-primary-strong"
        >
          Jelajahi artikel
        </Link>
      </div>
    );
  }

  return (
    <>
      <h2 className="sr-only">Daftar artikel tersimpan</h2>
      <ul className="flex flex-col gap-3">
        {kartu.map((a) => (
          <li key={a.slug}>
            <KartuArtikel a={a} />
          </li>
        ))}
      </ul>
    </>
  );
}
