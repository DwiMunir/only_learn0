import Link from "next/link";
import { topics, type TopicSlug } from "@/lib/site";

const chipCls = "inline-flex h-8 items-center rounded-full px-3.5 text-label font-label";

export function TopicChips({ active = "semua" }: { active?: "semua" | TopicSlug }) {
  const items = [{ slug: "semua" as const, name: "Semua", href: "/catatan" }].concat(
    topics.map((t) => ({ slug: t.slug as "semua", name: t.name, href: `/topik/${t.slug}` })),
  );
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((t) => {
        const isActive = t.slug === active;
        return (
          <li key={t.slug}>
            <Link
              href={t.href}
              aria-current={isActive ? "page" : undefined}
              className={`${chipCls} ${isActive ? "bg-primary text-on-primary" : "bg-primary-soft text-ink hover:bg-line"}`}
            >
              {t.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
