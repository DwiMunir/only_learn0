import { PlayIcon } from "./icons";

/**
 * Facade reel: poster + tombol play yang membuka Instagram.
 * Sengaja tidak memuat script embed Instagram supaya halaman tetap ringan dan cepat dari link bio.
 */
export function ReelEmbed({ url, poster, title }: { url?: string; poster?: string; title: string }) {
  if (!url) return null;
  return (
    <figure className="my-6">
      <a
        href={url}
        target="_blank"
        rel="noopener"
        className="group relative block aspect-[9/16] w-full overflow-hidden rounded-md bg-ink lg:w-[360px]"
      >
        {poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <span className="absolute inset-x-6 bottom-8 text-headline font-headline text-paper">{title}</span>
        )}
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid size-16 place-items-center rounded-full bg-paper/90 text-ink group-hover:bg-paper">
            <PlayIcon className="ml-1 size-7" />
          </span>
        </span>
        <span className="sr-only">Tonton reel di Instagram</span>
      </a>
      <figcaption className="mt-2 text-caption font-caption text-ink-muted">Tonton reel aslinya di Instagram</figcaption>
    </figure>
  );
}
