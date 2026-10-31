import { PlayIcon } from "./icons";
import { ReelThumb } from "./reel-row";
import { site } from "@/lib/site";

/**
 * Baris tautan ke reel di Instagram: thumbnail + tombol play.
 * Sengaja tidak memuat script embed Instagram supaya halaman tetap ringan dan cepat dari link bio.
 */
export function ReelLink({ url, poster }: { url?: string; poster?: string }) {
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener"
      className="flex items-center gap-3 rounded-2xl border border-line bg-paper p-2.5 hover:bg-primary-soft"
    >
      <span className="relative shrink-0">
        <ReelThumb src={poster} className="h-[74px] w-[52px]" />
        {/* ikon play di lingkaran navy semi-transparan agar terbaca di atas poster apa pun */}
        <span className="absolute inset-0 grid place-items-center" aria-hidden="true">
          <span className="grid size-[22px] place-items-center rounded-full bg-primary/70 text-on-primary">
            <PlayIcon className="size-3" />
          </span>
        </span>
      </span>
      <span className="min-w-0">
        <span className="block text-label font-label text-primary">Tonton reelnya</span>
        <span className="block text-caption text-ink-muted">Instagram @{site.instagram.handle}</span>
      </span>
    </a>
  );
}
