import type { ReactNode } from "react";

/** Gradasi pastel + gelombang berlapis. Dipakai bersama oleh hero beranda dan pita halaman. */
function LatarPastel({ tinggi }: { tinggi: "penuh" | "pita" }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-hero-peach via-hero-lavender to-hero-sky" />
      <svg
        className={`absolute inset-x-0 bottom-0 w-full ${tinggi === "penuh" ? "h-[55%]" : "h-[70%]"}`}
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
      >
        <path d="M0 90 C240 20 480 170 760 100 C1040 30 1240 120 1440 60 L1440 200 L0 200 Z" className="fill-hero-sky" opacity="0.75" />
        <path d="M0 140 C300 80 560 190 860 130 C1120 80 1300 150 1440 110 L1440 200 L0 200 Z" className="fill-hero-pink" opacity="0.7" />
        <path d="M0 175 C320 140 640 200 960 165 C1180 140 1330 180 1440 160 L1440 200 L0 200 Z" className="fill-paper" />
      </svg>
    </div>
  );
}

/** Hero beranda: badge, judul dengan coretan kuning, pengantar, slot pencarian, dan ilustrasi. */
export function HeroBeranda({ children }: { children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden">
      <LatarPastel tinggi="penuh" />
      <div className="relative mx-auto grid max-w-[1200px] items-center gap-2 px-4 pb-16 pt-6 lg:grid-cols-2 lg:gap-6 lg:px-6 lg:pb-20 lg:pt-10">
        {/* Ilustrasi: di mobile tampil di atas, di desktop di kanan */}
        <div className="order-first flex justify-center lg:order-last">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ilustrasi/hero.jpg"
            alt=""
            width={1280}
            height={960}
            fetchPriority="high"
            className="h-[220px] w-auto max-w-full object-contain lg:h-auto lg:w-full lg:max-w-[600px]"
            style={{
              maskImage: "radial-gradient(ellipse 50% 50% at 50% 50%, #000 55%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 50% 50% at 50% 50%, #000 55%, transparent 100%)",
            }}
          />
        </div>

        <div className="min-w-0">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-paper/70 px-3 py-1.5 text-label font-label text-navy">
            <span aria-hidden="true" className="text-primary">
              ✦
            </span>
            Blog &amp; Insight
          </span>
          <h1 className="mt-4 text-[2.5rem] font-extrabold leading-[1.05] tracking-display text-navy lg:text-[3.5rem]">
            Riset di balik
            <br />
            setiap{" "}
            <span className="relative inline-block text-primary">
              reel.
              <svg
                aria-hidden="true"
                viewBox="0 0 200 14"
                preserveAspectRatio="none"
                className="absolute -bottom-1 left-0 h-[10px] w-[115%] text-scribble"
              >
                <path d="M2 9 C40 3 90 11 130 5 C160 2 185 6 198 3" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mt-5 max-w-[34ch] text-body text-ink lg:text-[1.125rem]">
            Tiap konten @only_learn0 ada sumbernya. Ini catatan lengkapnya.
          </p>
          {children && <div className="mt-6 max-w-[520px]">{children}</div>}
        </div>
      </div>
    </section>
  );
}

/** Pita pastel lebih pendek untuk halaman dalam, tanpa ilustrasi. */
export function PitaHalaman({ children }: { children: ReactNode }) {
  return (
    <section className="relative overflow-hidden">
      <LatarPastel tinggi="pita" />
      <div className="relative mx-auto max-w-[1080px] break-words px-4 py-10">{children}</div>
    </section>
  );
}
