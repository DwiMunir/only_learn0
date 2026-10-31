import { bacaPermintaan, daftarkan, validasi } from "@/lib/langganan";

// Satu-satunya endpoint server di blog ini: mendaftarkan email ke Resend. Kunci API tetap di server.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  // Content-Type selain JSON → 415, body > 1 KB → 413, bukan JSON → 400 (lihat bacaPermintaan)
  const p = await bacaPermintaan(request);
  if (!p.ok) return Response.json({ pesan: p.hasil.pesan }, { status: p.hasil.status });

  const v = validasi(p.body);
  if (!v.ok) return Response.json({ pesan: v.hasil.pesan }, { status: v.hasil.status });

  // Hanya dua env ini yang diteruskan; tanpa RESEND_API_KEY balasannya 503 "Langganan belum aktif"
  const { RESEND_API_KEY, RESEND_SEGMENT_ID } = process.env;
  const { status, pesan } = await daftarkan(v.email, { RESEND_API_KEY, RESEND_SEGMENT_ID });
  return Response.json({ pesan }, { status });
}
