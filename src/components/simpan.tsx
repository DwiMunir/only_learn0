"use client";

import { useSyncExternalStore } from "react";
import { bacaSimpan, KUNCI, ubahSimpan } from "@/lib/simpan";
import { BookmarkIcon } from "./icons";

/*
 * Satu sumber data untuk semua tombol Simpan dan halaman Tersimpan di tab ini.
 * localStorage selalu diakses di dalam try/catch: kalau diblokir (mis. mode privat), `siap` tetap false
 * dan tombol Simpan tidak tampil, tanpa error.
 */
type Keadaan = { siap: boolean; tersimpan: string[] };
const BELUM: Keadaan = { siap: false, tersimpan: [] };

const pendengar = new Set<() => void>();
let tersedia: boolean | null = null; // null = belum dicek
let mentahTerakhir: string | null = null;
let keadaanTerakhir: Keadaan = BELUM;

function cekTersedia(): boolean {
  if (tersedia === null) {
    try {
      const uji = `${KUNCI}:uji`;
      window.localStorage.setItem(uji, "1");
      window.localStorage.removeItem(uji);
      tersedia = true;
    } catch {
      tersedia = false;
    }
  }
  return tersedia;
}

// Objek hasil hanya dibuat ulang kalau isi localStorage berubah (syarat useSyncExternalStore)
function ambil(): Keadaan {
  if (!cekTersedia()) return BELUM;
  let mentah: string | null;
  try {
    mentah = window.localStorage.getItem(KUNCI);
  } catch {
    tersedia = false;
    return BELUM;
  }
  if (keadaanTerakhir === BELUM || mentah !== mentahTerakhir) {
    mentahTerakhir = mentah;
    keadaanTerakhir = { siap: true, tersimpan: bacaSimpan(mentah) };
  }
  return keadaanTerakhir;
}

function langgan(ubahan: () => void) {
  pendengar.add(ubahan);
  // Perubahan dari tab lain
  window.addEventListener("storage", ubahan);
  return () => {
    pendengar.delete(ubahan);
    window.removeEventListener("storage", ubahan);
  };
}

function ubah(slug: string) {
  try {
    const baru = ubahSimpan(bacaSimpan(window.localStorage.getItem(KUNCI)), slug);
    window.localStorage.setItem(KUNCI, JSON.stringify(baru));
  } catch {
    tersedia = false;
  }
  pendengar.forEach((f) => f());
}

// Saat render server dan hidrasi: belum siap
const diServer = () => BELUM;

export function useSimpan(): { siap: boolean; tersimpan: string[]; ubah: (slug: string) => void } {
  const { siap, tersimpan } = useSyncExternalStore(langgan, ambil, diServer);
  return { siap, tersimpan, ubah };
}

const tanpaLangganan = () => () => {};
/** true setelah komponen terpasang di browser (false saat render server dan hidrasi). */
export function useTerpasang(): boolean {
  return useSyncExternalStore(
    tanpaLangganan,
    () => true,
    () => false,
  );
}

/** Tombol Simpan/Tersimpan. Tidak tampil sebelum terpasang atau kalau localStorage tidak bisa dipakai. */
export function TombolSimpan({ slug, judul }: { slug: string; judul?: string }) {
  const { siap, tersimpan, ubah } = useSimpan();
  if (!siap) return null;
  const aktif = tersimpan.includes(slug);
  return (
    <button
      type="button"
      aria-pressed={aktif}
      onClick={() => ubah(slug)}
      className={`relative z-10 -mx-1.5 inline-flex min-h-6 items-center gap-1 rounded-full px-1.5 hover:bg-primary-soft hover:text-primary ${aktif ? "text-primary" : ""}`}
    >
      <BookmarkIcon terisi={aktif} className="size-3.5" />
      {aktif ? "Tersimpan" : "Simpan"}
      {judul && <span className="sr-only">: {judul}</span>}
    </button>
  );
}
