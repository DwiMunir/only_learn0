import Link from "next/link";
import { topics } from "@/lib/site";

export function TopicChips({ active }: { active?: string }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {topics.map((t) => {
        const isActive = t.slug === active;
        return (
          <li key={t.slug}>
            <Link
              href={`/topik/${t.slug}`}
              aria-current={isActive ? "page" : undefined}
              className={`inline-flex h-9 items-center rounded-full px-4 text-label font-label ${
                isActive ? "bg-ink text-paper" : "bg-surface text-ink hover:bg-line"
              }`}
            >
              {t.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
