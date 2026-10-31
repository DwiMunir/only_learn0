"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRightIcon } from "./icons";

// Cadangan kalau server tidak membalas JSON (mis. jaringan putus). Sama dengan pesan gagal di lib/langganan.ts;
// tidak diimpor dari sana supaya zod tidak ikut terkirim ke browser.
const PESAN_GAGAL = "Gagal mendaftar. Coba lagi sebentar lagi.";

type Keadaan =
  | { tahap: "siap" }
  | { tahap: "mengirim" }
  | { tahap: "berhasil"; pesan: string }
  // emailSalah: server membalas 400 (isian bermasalah), bukan 503/502 (masalah di sisi kita)
  | { tahap: "gagal"; pesan: string; emailSalah: boolean };

/**
 * Kartu langganan email (navy, ilustrasi gunung). Form mengirim ke POST /api/langganan;
 * kunci Resend hanya ada di server. Pesan hasil muncul di satu wadah role="status" yang selalu ada,
 * supaya pembaca layar mengumumkannya.
 */
export function Langganan() {
  const [k, setK] = useState<Keadaan>({ tahap: "siap" });
  const inputRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);

  // Form hilang setelah berhasil: fokus pindah ke pesannya, bukan jatuh ke <body>.
  // Setelah gagal: fokus kembali ke kolom email supaya bisa langsung diperbaiki.
  useEffect(() => {
    if (k.tahap === "berhasil") statusRef.current?.focus();
    if (k.tahap === "gagal") inputRef.current?.focus();
  }, [k.tahap]);

  async function kirim(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (k.tahap === "mengirim") return;
    const data = new FormData(e.currentTarget);
    setK({ tahap: "mengirim" });
    try {
      const res = await fetch("/api/langganan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: String(data.get("email") ?? ""), situs: String(data.get("situs") ?? "") }),
        // iOS 15 ke bawah belum punya AbortSignal.timeout: kirim tanpa batas waktu daripada error
        signal: typeof AbortSignal.timeout === "function" ? AbortSignal.timeout(15_000) : undefined,
      });
      const json: unknown = await res.json().catch(() => null);
      const pesan =
        json && typeof json === "object" && "pesan" in json && typeof json.pesan === "string" ? json.pesan : PESAN_GAGAL;
      setK(res.ok ? { tahap: "berhasil", pesan } : { tahap: "gagal", pesan, emailSalah: res.status === 400 });
    } catch {
      setK({ tahap: "gagal", pesan: PESAN_GAGAL, emailSalah: false });
    }
  }

  const mengirim = k.tahap === "mengirim";
  const gagal = k.tahap === "gagal";
  const emailSalah = k.tahap === "gagal" && k.emailSalah;

  return (
    <section
      aria-labelledby="judul-langganan"
      className="relative overflow-hidden rounded-3xl bg-navy p-6 text-white shadow-[0_8px_24px_rgba(19,27,58,0.18)]"
    >
      {/* Latar: ilustrasi gunung di bagian bawah kartu, tepi atasnya dilebur ke navy. Cahaya terangnya jatuh di
          belakang kolom email (putih), jadi judul dan teks tetap di atas langit gelap. Gradasi navy di kiri
          menjaga kontras teks ≥ 4,5:1 (diukur dari piksel hasil render: terburuk ±6:1). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/ilustrasi/langganan.jpg"
        alt=""
        width={1024}
        height={640}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] w-full object-cover object-[center_55%]"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, #000 45%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 45%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-r from-navy/70 via-navy/25 to-navy/0"
      />
      {/* Coretan kecil di pojok kanan atas, seperti di gambar referensi */}
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="pointer-events-none absolute right-5 top-5 size-7 text-on-navy"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      >
        <path d="M6 13 3 6M14 10l1-8M21 15l7-5" />
      </svg>

      <div className="relative">
        <h2 id="judul-langganan" className="pr-8 text-[1.375rem] font-extrabold leading-tight tracking-headline">
          Ikuti perjalanan
          <br />
          belajar kita!
        </h2>
        <p className="mt-2 text-label font-medium text-on-navy">
          Dapatkan artikel terbaru
          <br />
          dan insight menarik lainnya.
        </p>

        {k.tahap !== "berhasil" && (
          // method="post": kalau terkirim sebelum JavaScript siap, email tidak masuk ke URL
          <form method="post" onSubmit={kirim} className="mt-5">
            <div className="flex h-12 items-center rounded-full bg-paper pl-5 pr-1.5 has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-primary">
              <label htmlFor="email-langganan" className="sr-only">
                Email kamu
              </label>
              <input
                ref={inputRef}
                id="email-langganan"
                name="email"
                type="email"
                required
                maxLength={254}
                autoComplete="email"
                inputMode="email"
                enterKeyHint="send"
                placeholder="Email kamu…"
                aria-invalid={emailSalah || undefined}
                aria-describedby={gagal ? "status-langganan" : undefined}
                className="h-full min-w-0 flex-1 bg-transparent pr-2 text-body text-ink outline-none placeholder:text-ink-muted focus-visible:outline-none"
              />
              <button
                type="submit"
                aria-label="Daftar"
                disabled={mengirim}
                className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-white hover:bg-primary-strong disabled:cursor-wait disabled:opacity-60"
              >
                {mengirim ? (
                  <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white motion-reduce:animate-none" />
                ) : (
                  <ArrowRightIcon className="size-4" />
                )}
              </button>
            </div>

            {/* Honeypot: tersembunyi dari manusia dan pembaca layar; hanya bot yang mengisinya */}
            <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
              <label htmlFor="situs-langganan">Situs</label>
              <input id="situs-langganan" name="situs" type="text" tabIndex={-1} autoComplete="off" />
            </div>
          </form>
        )}

        <p
          ref={statusRef}
          id="status-langganan"
          role="status"
          tabIndex={-1}
          className={
            k.tahap === "berhasil"
              ? "mt-5 flex min-h-12 items-center gap-2 rounded-2xl bg-navy/70 px-4 py-2.5 text-label font-label text-white outline-none ring-1 ring-on-navy/40 focus-visible:ring-2 focus-visible:ring-white"
              : "mt-2 px-5 text-caption font-caption text-white outline-none empty:mt-0"
          }
        >
          {k.tahap === "berhasil" && (
            <>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
              {k.pesan}
            </>
          )}
          {k.tahap === "gagal" && k.pesan}
        </p>
      </div>
    </section>
  );
}
