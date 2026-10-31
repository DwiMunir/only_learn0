// Hari ditampilkan menurut WIB. Jakarta selalu UTC+7 tanpa musim panas.
const ZONA = "Asia/Jakarta";

const fmt = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: ZONA,
});

const fmtPanjang = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: ZONA,
});

/**
 * "2026-10-27T17:32" (jam UTC) → saat itu juga, jadi harinya ikut WIB (28 Oktober).
 * "2026-10-27" (tanggal saja) → tengah hari UTC, jadi harinya tidak bergeser di zona mana pun.
 */
function keDate(iso: string): Date {
  return iso.length > 10 ? new Date(`${iso.slice(0, 16)}Z`) : new Date(`${iso.slice(0, 10)}T12:00:00Z`);
}

/** "2026-10-25" → "25 Okt 2026"; tanggal berjam (UTC) dibaca sebagai hari di WIB. */
export function formatDate(iso: string): string {
  return fmt.format(keDate(iso));
}

/** "2026-10-26T05:35" → "26 Oktober 2026". Dipakai di kartu artikel; tanggal berjam (UTC) dibaca sebagai hari di WIB. */
export function formatTanggalPanjang(iso: string): string {
  return fmtPanjang.format(keDate(iso));
}

/** Nilai atribut `dateTime` untuk <time>: jam UTC diberi "Z" supaya zonanya jelas, tanggal saja apa adanya. */
export function waktuMesin(iso: string): string {
  return iso.length > 10 ? `${iso.slice(0, 16)}Z` : iso.slice(0, 10);
}

export function today(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Waktu sekarang sampai menit, UTC: "2026-10-26T05:35". Dipakai untuk publishedAt artikel baru. */
export function sekarang(): string {
  return new Date().toISOString().slice(0, 16);
}
