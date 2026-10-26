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
      className="flex items-center gap-3 rounded-2xl border border-line p-2.5 hover:bg-surface"
    >
      <span className="relative shrink-0">
        <ReelThumb poster={poster} className="h-[74px] w-[52px]" />
        <span className="absolute inset-0 grid place-items-center text-white" aria-hidden="true">
          <PlayIcon className="size-4 drop-shadow" />
        </span>
      </span>
      <span className="min-w-0">
        <span className="block text-label font-label text-primary">Tonton reelnya</span>
        <span className="block text-caption text-ink-muted">Instagram @{site.instagram.handle}</span>
      </span>
    </a>
  );
}
