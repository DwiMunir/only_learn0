import type { ReactNode } from "react";
import type { NumberedSource } from "@/lib/content";
import { strongestLevel, type EvidenceLevel } from "@/lib/evidence";
import { formatDate } from "@/lib/format";
import type { Claim } from "@/lib/schema";
import { EvidenceMeter } from "./evidence-meter";
import { FootnoteButton } from "./source-dialog";

function pick(sources: NumberedSource[], ids: string[]) {
  return ids.map((id) => sources.find((s) => s.id === id)).filter((s): s is NumberedSource => Boolean(s));
}

function StaticNumber({ n }: { n: number }) {
  return (
    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-soft px-1.5 text-footnote font-footnote text-primary">
      {n}
    </span>
  );
}

/**
 * <Klaim sumber="id-1,id-2">kalimat</Klaim> di MDX.
 * Render: stabilo kuning + nomor footnote (+ sidenote di desktop).
 */
export function Klaim({
  sumber,
  children,
  sources,
  seen,
}: {
  sumber: string;
  children: ReactNode;
  sources: NumberedSource[];
  /** ID sumber yang sidenote-nya sudah tampil. Sumber yang sama hanya muncul sekali di margin. */
  seen?: Set<string>;
}) {
  const refs = pick(
    sources,
    sumber.split(",").map((s) => s.trim()),
  );
  const firstTime = refs.filter((s) => !seen?.has(s.id));
  firstTime.forEach((s) => seen?.add(s.id));
  return (
    <>
      <mark className="klaim">{children}</mark>
      {refs.map((s) => (
        <FootnoteButton key={s.id} id={s.id} n={s.n} />
      ))}
      {firstTime.map((s) => (
        <span key={`sn-${s.id}`} className="sidenote" role="note">
          <span className="flex items-center gap-2">
            <StaticNumber n={s.n} />
            <span className="font-label text-ink">
              {s.authors}, {s.year}
            </span>
          </span>
          <span className="mt-1.5 block">
            <EvidenceMeter level={s.level as EvidenceLevel} />
          </span>
          <a href={s.url} target="_blank" rel="noopener" className="mt-1 inline-block text-primary underline underline-offset-2">
            Buka sumber
          </a>
        </span>
      ))}
    </>
  );
}

/** <ApaKataRiset /> di MDX. Mengambil data dari `claims` di frontmatter. */
export function ApaKataRiset({ claims, sources }: { claims: Claim[]; sources: NumberedSource[] }) {
  if (claims.length === 0) return null;
  return (
    <section aria-labelledby="apa-kata-riset" className="my-10">
      <h2 id="apa-kata-riset" className="mb-2 text-title font-title">
        Apa kata riset
      </h2>
      <ul>
        {claims.map((c) => {
          const refs = pick(sources, c.sources);
          const level = strongestLevel(refs.map((r) => r.level as EvidenceLevel));
          return (
            <li key={c.text} className="border-b border-line py-4 last:border-b-0">
              <p className="text-item-title font-item-title">{c.text}</p>
              <EvidenceMeter level={level} className="mt-2" />
              <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-caption font-caption text-ink-muted">
                {refs.map((r) => (
                  <span key={r.id} className="inline-flex items-center gap-1.5">
                    <StaticNumber n={r.n} />
                    {r.authors}, {r.year}
                  </span>
                ))}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function SourceList({ sources }: { sources: NumberedSource[] }) {
  return (
    <section aria-labelledby="sumber" className="mt-12">
      <h2 id="sumber" className="mb-2 text-title font-title">
        Sumber
      </h2>
      <ol>
        {sources.map((s) => (
          <li key={s.id} id={`sumber-${s.id}`} className="flex gap-3 rounded-md border-b border-line py-4 last:border-b-0">
            <StaticNumber n={s.n} />
            <div className="min-w-0">
              <p className="text-label font-label break-words">{s.title}</p>
              <p className="mt-1 text-caption font-caption text-ink-muted">
                {s.authors}, {s.year}
                {s.publisher ? `. ${s.publisher}` : ""}
              </p>
              <EvidenceMeter level={s.level as EvidenceLevel} className="mt-2" />
              <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-caption font-caption">
                <a href={s.url} target="_blank" rel="noopener" className="text-primary underline underline-offset-2">
                  Buka sumber asli
                </a>
                <span className="text-ink-muted">Dicek {formatDate(s.checkedAt)}</span>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function CorrectionNote({ date, children }: { date: string; children: ReactNode }) {
  return (
    <div className="rounded-md bg-correction-surface p-4 text-body text-correction">
      <p className="text-label font-label">{formatDate(date)}</p>
      <p className="mt-1">{children}</p>
    </div>
  );
}
