/**
 * Langganan email lewat Resend: validasi isi form dan pendaftaran kontak.
 * Murni dan bisa dites: env dan fetch diberikan dari luar, jadi tes tidak pernah memanggil Resend sungguhan.
 * Kunci API hanya dipakai di sini (server) dan tidak pernah masuk ke pesan balasan.
 */
import { z } from "zod";

export type Hasil = { status: number; pesan: string };

export const PESAN = {
  sukses: "Terima kasih! Kamu sudah terdaftar.",
  emailSalah: "Email tidak valid.",
  permintaanSalah: "Permintaan tidak valid.",
  belumAktif: "Langganan belum aktif. Coba lagi nanti.",
  gagal: "Gagal mendaftar. Coba lagi sebentar lagi.",
} as const;

const SUKSES: Hasil = { status: 200, pesan: PESAN.sukses };
const GAGAL: Hasil = { status: 502, pesan: PESAN.gagal };

const RESEND_CONTACTS = "https://api.resend.com/contacts";

/** Batas ukuran body permintaan. Isi yang sah ({ email, situs }) jauh di bawah ini. */
export const BATAS_BODY = 1024;

// `situs` adalah honeypot: kolom tersembunyi yang hanya diisi bot
const skema = z.strictObject({
  email: z.email().max(254),
  situs: z.string().max(0).optional(),
});

/**
 * Gerbang sebelum validasi: hanya `application/json`, maksimal 1 KB, dan harus JSON.
 * Content-Type wajib JSON supaya halaman situs lain tidak bisa menembak endpoint ini dengan POST no-cors
 * (yang hanya boleh text/plain atau form): permintaan JSON lintas situs butuh preflight CORS, dan endpoint ini
 * tidak pernah menjawabnya.
 */
export async function bacaPermintaan(request: Request): Promise<{ ok: true; body: unknown } | { ok: false; hasil: Hasil }> {
  const tolak = (status: number) => ({ ok: false as const, hasil: { status, pesan: PESAN.permintaanSalah } });
  const tipe = request.headers.get("content-type")?.toLowerCase() ?? "";
  if (!tipe.startsWith("application/json")) return tolak(415);
  // Header dicek dulu supaya body besar tidak dibaca sama sekali; panjang asli dicek lagi untuk body chunked
  if (Number(request.headers.get("content-length")) > BATAS_BODY) return tolak(413);

  let teks: string;
  try {
    teks = await request.text();
  } catch {
    // Koneksi putus di tengah pengiriman body
    return tolak(400);
  }
  if (new TextEncoder().encode(teks).length > BATAS_BODY) return tolak(413);
  try {
    return { ok: true, body: JSON.parse(teks) as unknown };
  } catch {
    // Bukan JSON yang sah
    return tolak(400);
  }
}

export function validasi(body: unknown): { ok: true; email: string } | { ok: false; hasil: Hasil } {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return { ok: false, hasil: { status: 400, pesan: PESAN.permintaanSalah } };
  }
  const r = skema.safeParse(body);
  if (r.success) return { ok: true, email: r.data.email };

  const kena = (kolom: string) => r.error.issues.some((i) => i.path[0] === kolom);
  // Honeypot terisi: pura-pura berhasil supaya bot tidak tahu dirinya ketahuan
  if (kena("situs")) return { ok: false, hasil: SUKSES };
  if (kena("email")) return { ok: false, hasil: { status: 400, pesan: PESAN.emailSalah } };
  return { ok: false, hasil: { status: 400, pesan: PESAN.permintaanSalah } };
}

/**
 * Resend membalas 409/422 dengan pesan semacam "Contact already exists" kalau email sudah terdaftar.
 * Hanya frasa "already exist(s)" yang dihitung: pesan lain (mis. "must reference an existing segment") berarti salah setel.
 */
async function kontakSudahAda(res: Response): Promise<boolean> {
  const teks = await res.text().catch(() => "");
  let pesan = teks;
  try {
    const json: unknown = JSON.parse(teks);
    if (json && typeof json === "object" && "message" in json && typeof json.message === "string") pesan = json.message;
  } catch {
    // Bukan JSON: periksa teks mentahnya saja
  }
  return /already\s+exists?/i.test(pesan);
}

/** Body balasan yang tidak dibaca dibatalkan supaya koneksinya dilepas. Galat saat membatalkan diabaikan. */
async function buang(res: Response): Promise<void> {
  await res.body?.cancel().catch(() => undefined);
}

export async function daftarkan(
  email: string,
  env: { RESEND_API_KEY?: string; RESEND_SEGMENT_ID?: string },
  f: typeof fetch = fetch,
): Promise<Hasil> {
  const kunci = env.RESEND_API_KEY?.trim();
  if (!kunci) return { status: 503, pesan: PESAN.belumAktif };
  const segmen = env.RESEND_SEGMENT_ID?.trim();

  try {
    const res = await f(RESEND_CONTACTS, {
      method: "POST",
      headers: { Authorization: `Bearer ${kunci}`, "Content-Type": "application/json" },
      body: JSON.stringify({ email, unsubscribed: false, ...(segmen ? { segments: [{ id: segmen }] } : {}) }),
      signal: AbortSignal.timeout(10_000),
    });
    if (res.ok) {
      await buang(res);
      return SUKSES;
    }
    if (res.status === 409 || res.status === 422) return (await kontakSudahAda(res)) ? SUKSES : GAGAL;
    // Status lain (401 kunci salah, 429 kena batas, 5xx): pesan umum, tanpa isi balasan Resend
    await buang(res);
    return GAGAL;
  } catch {
    // Jaringan putus atau lewat 10 detik
    return GAGAL;
  }
}
