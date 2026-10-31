"use client";

import { createContext, use, useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import { saring, type Ringkas, type Urutan } from "@/lib/jelajah";
import { topics } from "@/lib/site";
import { ArrowRightIcon, ChevronDownIcon, GridIcon, SearchIcon } from "./icons";
import { KartuArtikel } from "./kartu-artikel";

/*
 * Jelajah artikel di browser: cari, filter topik, dan urutan.
 * <Jelajah> menyimpan keadaan; <KotakCari> (di hero atau pita) dan <DaftarJelajah> (di bawahnya) membacanya.
 * Dipisah begini supaya kotak cari bisa duduk di dalam hero server, sementara daftar ada di kolom kiri.
 * Keadaan awal selalu sama (tanpa query string), jadi halaman tetap dirender statis saat build.
 */
type Nilai = {
  q: string;
  ubahQ: (q: string) => void;
  topik: string;
  ubahTopik: (topik: string) => void;
  urut: Urutan;
  ubahUrut: (urut: Urutan) => void;
  hasil: Ringkas[];
  reset: () => void;
  inputRef: RefObject<HTMLInputElement | null>;
};

const KonteksJelajah = createContext<Nilai | null>(null);

function useJelajah(): Nilai {
  const nilai = use(KonteksJelajah);
  if (!nilai) throw new Error("KotakCari dan DaftarJelajah harus berada di dalam <Jelajah>.");
  return nilai;
}

export function Jelajah({ daftar, topikAwal = "", children }: { daftar: Ringkas[]; topikAwal?: string; children: ReactNode }) {
  const [q, ubahQ] = useState("");
  const [topik, ubahTopik] = useState(topikAwal);
  const [urut, ubahUrut] = useState<Urutan>("terbaru");
  const inputRef = useRef<HTMLInputElement>(null);
  const hasil = useMemo(() => saring(daftar, { q, topik, urut }), [daftar, q, topik, urut]);

  const nilai: Nilai = {
    q,
    ubahQ,
    topik,
    ubahTopik,
    urut,
    ubahUrut,
    hasil,
    reset: () => {
      ubahQ("");
      ubahTopik(topikAwal);
    },
    inputRef,
  };
  return <KonteksJelajah value={nilai}>{children}</KonteksJelajah>;
}

/** Kotak cari berbentuk pil. Menyaring daftar langsung saat mengetik. */
export function KotakCari() {
  const { q, ubahQ, inputRef } = useJelajah();

  // Ikon cari di header menuju /#cari: kotak cari ikut difokuskan.
  // Next menggulir ke #cari sendiri, jadi fokus tanpa menggulir lagi.
  useEffect(() => {
    const fokus = () => inputRef.current?.focus({ preventScroll: true });
    if (window.location.hash === "#cari") fokus();
    const saatHash = () => {
      if (window.location.hash === "#cari") fokus();
    };
    // Navigasi hash oleh Next di halaman yang sama tidak memicu hashchange, jadi klik tautannya ikut didengar
    const saatKlik = (e: MouseEvent) => {
      const a = e.target instanceof Element ? e.target.closest<HTMLAnchorElement>('a[href$="#cari"]') : null;
      // Hanya tautan ke halaman ini; tautan ke halaman lain ditangani saat halaman tujuan terpasang
      if (a && new URL(a.href).pathname === window.location.pathname) setTimeout(fokus, 0);
    };
    window.addEventListener("hashchange", saatHash);
    document.addEventListener("click", saatKlik);
    return () => {
      window.removeEventListener("hashchange", saatHash);
      document.removeEventListener("click", saatKlik);
    };
  }, [inputRef]);

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        inputRef.current?.blur();
        // Hasil sudah tersaring; kalau daftarnya di bawah layar (mis. di HP), gulir ke sana
        const daftar = document.getElementById("daftar-artikel");
        if (daftar && daftar.getBoundingClientRect().top > window.innerHeight - 120) {
          const halus = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          daftar.scrollIntoView({ behavior: halus ? "smooth" : "auto", block: "start" });
        }
      }}
      className="flex h-12 items-center rounded-full border border-line bg-paper pl-4 pr-1.5 shadow-[0_2px_12px_rgba(19,27,58,0.06)] focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30"
    >
      <label htmlFor="cari" className="sr-only">
        Cari artikel
      </label>
      <SearchIcon className="size-5 shrink-0 text-ink-muted" />
      <input
        ref={inputRef}
        id="cari"
        type="search"
        value={q}
        onChange={(e) => ubahQ(e.target.value)}
        placeholder="Cari artikel…"
        autoComplete="off"
        enterKeyHint="search"
        className="h-full min-w-0 flex-1 scroll-mt-40 bg-transparent px-3 text-body text-ink outline-none placeholder:text-ink-muted focus-visible:outline-none"
      />
      <button
        type="submit"
        aria-label="Cari"
        className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-white hover:bg-primary-strong"
      >
        <ArrowRightIcon className="size-4" />
      </button>
    </form>
  );
}

const pilihanTopik = [{ slug: "", name: "Semua", emoji: "" }, ...topics];

/** Chip topik, pilihan urutan, lalu daftar kartu (atau pesan kosong). */
export function DaftarJelajah() {
  const { topik, ubahTopik, urut, ubahUrut, hasil, reset } = useJelajah();
  const judulRef = useRef<HTMLHeadingElement>(null);

  return (
    <section id="daftar-artikel" aria-labelledby="judul-daftar" className="scroll-mt-32">
      <h2 id="judul-daftar" ref={judulRef} tabIndex={-1} className="sr-only">
        Daftar artikel
      </h2>

      {/* Chip dan pilihan urutan dalam satu baris yang boleh melipat; urutan selalu di kanan */}
      <div role="group" aria-label="Filter topik dan urutan" className="flex flex-wrap items-center gap-2">
        {pilihanTopik.map((t) => {
          const aktif = topik === t.slug;
          return (
            <button
              key={t.slug || "semua"}
              type="button"
              aria-pressed={aktif}
              onClick={() => ubahTopik(t.slug)}
              className={`inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-label font-label sm:h-10 sm:px-4 ${
                aktif ? "border-navy bg-navy text-white" : "border-line bg-paper text-ink hover:bg-primary-soft"
              }`}
            >
              {t.emoji ? <span aria-hidden="true">{t.emoji}</span> : <GridIcon className="size-4" />}
              {t.name}
            </button>
          );
        })}

        <label className="relative ml-auto shrink-0">
          <span className="sr-only">Urutkan</span>
          <select
            value={urut}
            onChange={(e) => ubahUrut(e.target.value as Urutan)}
            className="h-9 cursor-pointer appearance-none rounded-full border border-line bg-paper pl-4 pr-10 text-label font-label text-ink hover:bg-primary-soft sm:h-10"
          >
            <option value="terbaru">Terbaru</option>
            <option value="terlama">Terlama</option>
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-muted" />
        </label>
      </div>

      {/* Jumlah hasil untuk pembaca layar */}
      <p aria-live="polite" className="sr-only">
        {hasil.length} artikel
      </p>

      {hasil.length > 0 ? (
        <ul className="mt-4 flex flex-col gap-3">
          {hasil.map((a) => (
            <li key={a.slug}>
              <KartuArtikel a={a} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 rounded-2xl border border-line bg-paper p-6 text-center">
          <p className="text-body text-ink">Tidak ada artikel yang cocok.</p>
          <button
            type="button"
            onClick={() => {
              reset();
              judulRef.current?.focus();
            }}
            className="mt-3 inline-flex h-10 items-center rounded-full bg-primary px-5 text-label font-label text-white hover:bg-primary-strong"
          >
            Reset pencarian
          </button>
        </div>
      )}
    </section>
  );
}
