const fmt = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** "2026-10-25" → "25 Okt 2026" */
export function formatDate(iso: string): string {
  return fmt.format(new Date(`${iso}T00:00:00Z`));
}

export function today(): string {
  return new Date().toISOString().slice(0, 10);
}
