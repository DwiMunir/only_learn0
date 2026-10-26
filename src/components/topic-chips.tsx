import Link from "next/link";
import { topics } from "@/lib/site";

const chipCls = "inline-flex h-8 items-center rounded-full px-3.5 text-label font-label";

type Chip = { key: string; name: string; href: string };

const items: Chip[] = [
  { key: "semua", name: "Semua", href: "/catatan" },
  ...topics.map((t) => ({ key: t.slug, name: t.name, href: `/topik/${t.slug}` })),
];

/**
 * `active` menentukan chip yang tampil aktif (tanpa nilai bawaan: pemanggil wajib memilih).
 * `ariaCurrent` dimatikan di beranda: chip "Semua" tampil aktif tetapi href-nya bukan halaman ini.
 */
export function TopicChips({ active, ariaCurrent = true }: { active: string; ariaCurrent?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((t) => {
        const isActive = t.key === active;
        return (
          <li key={t.key}>
            <Link
              href={t.href}
              aria-current={isActive && ariaCurrent ? "page" : undefined}
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
