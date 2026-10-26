const fmt = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** "2026-10-25" atau "2026-10-25T05:35" → "25 Okt 2026" */
export function formatDate(iso: string): string {
  return fmt.format(new Date(`${iso.slice(0, 10)}T00:00:00Z`));
}

export function today(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Waktu sekarang sampai menit, UTC: "2026-10-26T05:35". Dipakai untuk publishedAt artikel baru. */
export function sekarang(): string {
  return new Date().toISOString().slice(0, 16);
}
