import { evidenceLevels, type EvidenceLevel } from "@/lib/evidence";

/** Meteran 4 segmen + label teks. Aturan resmi tampil sebagai tag, bukan meteran. Semua <span> agar aman di dalam <p>. */
export function EvidenceMeter({ level, className = "" }: { level: EvidenceLevel; className?: string }) {
  const info = evidenceLevels[level];

  if (info.score === null) {
    return (
      <span className={`inline-flex items-center ${className}`}>
        <span className="rounded-full border border-ink-muted px-2.5 py-0.5 text-caption font-label text-ink">
          {info.label}
        </span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="inline-flex gap-[3px]" aria-hidden="true">
        {[1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={`inline-block h-1.5 w-3.5 rounded-full ${i <= (info.score ?? 0) ? "bg-brand-teal" : "bg-line"}`}
          />
        ))}
      </span>
      <span className="text-caption font-label text-ink">
        {info.label}
        <span className="sr-only">, level {info.score} dari 4</span>
      </span>
    </span>
  );
}
