import Link from "next/link";
import type { Article } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { getTopic } from "@/lib/site";
import { DocIcon, PlayIcon } from "./icons";

export function ReelThumb({ poster, className = "" }: { poster?: string; className?: string }) {
  if (poster) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={poster} alt="" className={`shrink-0 rounded-sm object-cover ${className}`} />;
  }
  return (
    <span className={`grid shrink-0 place-items-center rounded-sm bg-ink text-paper ${className}`} aria-hidden="true">
      <PlayIcon className="size-4" />
    </span>
  );
}

export function ReelRow({ article, showDate = false }: { article: Article; showDate?: boolean }) {
  const fm = article.frontmatter;
  const topic = getTopic(fm.topic);
  return (
    <li className="border-b border-line last:border-b-0">
      <Link href={`/catatan/${article.slug}`} className="group flex gap-3 py-3">
        <ReelThumb poster={fm.reel?.poster} className="h-16 w-12" />
        <span className="min-w-0">
          <span className="line-clamp-2 text-item-title font-item-title group-hover:text-primary">{fm.title}</span>
          <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-caption font-caption text-ink-muted">
            {showDate ? <span>{formatDate(fm.publishedAt)}</span> : <span>{topic?.name}</span>}
            <span className="inline-flex items-center gap-1">
              <DocIcon className="size-3.5" />
              {article.sources.length} sumber
            </span>
            {fm.draft && <span className="rounded-full bg-surface px-2 text-ink">Draft</span>}
          </span>
        </span>
      </Link>
    </li>
  );
}

export function ReelList({ articles, showDate }: { articles: Article[]; showDate?: boolean }) {
  return (
    <ul>
      {articles.map((a) => (
        <ReelRow key={a.slug} article={a} showDate={showDate} />
      ))}
    </ul>
  );
}
