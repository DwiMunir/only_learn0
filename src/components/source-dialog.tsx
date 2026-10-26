"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { EvidenceLevel } from "@/lib/evidence";
import { EvidenceMeter } from "./evidence-meter";

export type SheetSource = {
  id: string;
  n: number;
  title: string;
  authors: string;
  year: number;
  publisher?: string;
  url: string;
  level: EvidenceLevel;
  supports: string;
  note?: string;
  checkedLabel: string;
};

const SourceDialogContext = createContext<{ open: (id: string) => void } | null>(null);

/**
 * Mobile: nomor footnote membuka bottom sheet berisi detail sumber.
 * Desktop (≥1024px): sumber sudah tampil sebagai sidenote, jadi klik nomor melompat ke daftar sumber.
 */
export function SourceDialogProvider({ sources, children }: { sources: SheetSource[]; children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState<SheetSource | null>(null);

  const open = useCallback(
    (id: string) => {
      const source = sources.find((s) => s.id === id);
      if (!source) return;
      if (window.matchMedia("(min-width: 1024px)").matches) {
        const el = document.getElementById(`sumber-${id}`);
        if (!el) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
        el.classList.add("flash");
        window.setTimeout(() => el.classList.remove("flash"), 1400);
        return;
      }
      setCurrent(source);
    },
    [sources],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (current && dialog && !dialog.open) dialog.showModal();
  }, [current]);

  const close = () => dialogRef.current?.close();

  return (
    <SourceDialogContext.Provider value={{ open }}>
      {children}
      <dialog
        ref={dialogRef}
        className="sheet"
        aria-labelledby="sheet-title"
        onClose={() => setCurrent(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        {current && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <span className="mx-auto h-1 w-10 rounded-full bg-line" aria-hidden="true" />
            </div>
            <div className="flex items-start justify-between gap-4">
              <p className="text-caption font-caption text-ink-muted">
                Sumber {current.n} dari {sources.length}
              </p>
              <button type="button" onClick={close} className="text-label font-label text-accent">
                Tutup
              </button>
            </div>
            <h2 id="sheet-title" className="mt-2 text-title font-title">
              {current.title}
            </h2>
            <p className="mt-1 text-caption font-caption text-ink-muted">
              {current.authors}, {current.year}
              {current.publisher ? `. ${current.publisher}` : ""}
            </p>

            <div className="mt-4">
              <EvidenceMeter level={current.level} />
              {current.note && <p className="mt-1.5 text-caption font-caption text-ink-muted">{current.note}</p>}
            </div>

            <p className="mt-5 text-label font-label">Yang didukung sumber ini</p>
            <p className="mt-1 font-serif text-body leading-relaxed">{current.supports}</p>

            <a
              href={current.url}
              target="_blank"
              rel="noopener"
              className="mt-6 flex h-12 w-full items-center justify-center rounded-md bg-primary text-label font-label text-on-primary hover:bg-primary-strong"
            >
              Buka sumber asli
            </a>
            <p className="mt-2 text-center text-caption font-caption text-ink-muted">Dicek {current.checkedLabel}</p>
          </div>
        )}
      </dialog>
    </SourceDialogContext.Provider>
  );
}

export function FootnoteButton({ id, n }: { id: string; n: number }) {
  const ctx = useContext(SourceDialogContext);
  return (
    <button type="button" className="fn" aria-label={`Lihat sumber ${n}`} onClick={() => ctx?.open(id)}>
      {n}
    </button>
  );
}
