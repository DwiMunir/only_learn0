/**
 * Daftar artikel yang disimpan pembaca: slug di localStorage, terbaru disimpan di depan.
 * Fungsi di sini murni; akses localStorage ada di src/components/simpan.tsx.
 */
export const KUNCI = "onlylearn:simpan";

/** Isi mentah localStorage → daftar slug. Isi rusak, bukan array, atau bukan teks diabaikan. */
export function bacaSimpan(raw: string | null): string[] {
  if (!raw) return [];
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(data)) return [];
  return unik(data.filter((x): x is string => typeof x === "string" && x.length > 0));
}

/** Simpan kalau belum ada (masuk paling depan), hapus kalau sudah ada. Hasilnya selalu tanpa duplikat. */
export function ubahSimpan(daftar: string[], slug: string): string[] {
  const sisa = unik(daftar).filter((s) => s !== slug);
  return daftar.includes(slug) ? sisa : [slug, ...sisa];
}

function unik(daftar: string[]): string[] {
  return [...new Set(daftar)];
}
