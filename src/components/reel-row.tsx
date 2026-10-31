/**
 * Gambar kartu dan tautan reel: thumbnail atau poster reel, atau kotak pengganti
 * bergradasi pastel dengan monogram OL kalau belum ada gambar. Ukuran diatur lewat `className`.
 */
export function ReelThumb({ src, className = "" }: { src?: string; className?: string }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt="" loading="lazy" decoding="async" className={`shrink-0 rounded-lg object-cover ${className}`} />;
  }
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-lg bg-linear-to-br from-hero-peach via-hero-lavender to-hero-sky ${className}`}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/ol-mark.png" alt="" width={164} height={96} className="h-auto w-[min(45%,84px)]" />
    </span>
  );
}
