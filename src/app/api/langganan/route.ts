import { daftarkan, PESAN, validasi } from "@/lib/langganan";

// Satu-satunya endpoint server di blog ini: mendaftarkan email ke Resend. Kunci API tetap di server.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ pesan: PESAN.permintaanSalah }, { status: 400 });
  }

  const v = validasi(body);
  if (!v.ok) return Response.json({ pesan: v.hasil.pesan }, { status: v.hasil.status });

  // Hanya dua env ini yang diteruskan; tanpa RESEND_API_KEY balasannya 503 "Langganan belum aktif"
  const { RESEND_API_KEY, RESEND_SEGMENT_ID } = process.env;
  const { status, pesan } = await daftarkan(v.email, { RESEND_API_KEY, RESEND_SEGMENT_ID });
  return Response.json({ pesan }, { status });
}
