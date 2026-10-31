import test from "node:test";
import assert from "node:assert/strict";
import { bacaPermintaan, daftarkan, validasi, type Hasil } from "./langganan";

const SUKSES: Hasil = { status: 200, pesan: "Terima kasih! Kamu sudah terdaftar." };
const BELUM_AKTIF: Hasil = { status: 503, pesan: "Langganan belum aktif. Coba lagi nanti." };
const GAGAL: Hasil = { status: 502, pesan: "Gagal mendaftar. Coba lagi sebentar lagi." };
const KUNCI = "re_kunci_rahasia_uji_123";

// ---------- validasi ----------

test("validasi: email valid lolos", () => {
  assert.deepEqual(validasi({ email: "a@b.co" }), { ok: true, email: "a@b.co" });
  assert.deepEqual(validasi({ email: "a@b.co", situs: "" }), { ok: true, email: "a@b.co" });
});

test("validasi: honeypot terisi jadi sukses palsu", () => {
  assert.deepEqual(validasi({ email: "a@b.co", situs: "http://spam.example" }), { ok: false, hasil: SUKSES });
  // Bot yang juga mengisi email asal-asalan tetap dapat sukses palsu
  assert.deepEqual(validasi({ email: "bukan-email", situs: "x" }), { ok: false, hasil: SUKSES });
  assert.deepEqual(validasi({ email: "a@b.co", situs: 1 }), { ok: false, hasil: SUKSES });
});

test("validasi: email tidak valid", () => {
  const salah = { ok: false, hasil: { status: 400, pesan: "Email tidak valid." } };
  assert.deepEqual(validasi({ email: "bukan-email" }), salah);
  assert.deepEqual(validasi({ email: "" }), salah);
  assert.deepEqual(validasi({ email: 42 }), salah);
  assert.deepEqual(validasi({}), salah);
});

test("validasi: email 255 karakter ditolak, 254 masih boleh", () => {
  const domain = "@contoh.com";
  const e254 = "a".repeat(254 - domain.length) + domain;
  const e255 = "a".repeat(255 - domain.length) + domain;
  assert.equal(e254.length, 254);
  assert.equal(e255.length, 255);
  assert.deepEqual(validasi({ email: e254 }), { ok: true, email: e254 });
  assert.deepEqual(validasi({ email: e255 }), { ok: false, hasil: { status: 400, pesan: "Email tidak valid." } });
});

test("validasi: badan bukan objek atau berisi kunci asing", () => {
  const salah = { ok: false, hasil: { status: 400, pesan: "Permintaan tidak valid." } };
  for (const body of [null, undefined, "a@b.co", 42, true, ["a@b.co"]]) {
    assert.deepEqual(validasi(body), salah, `body: ${JSON.stringify(body)}`);
  }
  assert.deepEqual(validasi({ email: "a@b.co", lain: 1 }), salah);
});

// ---------- bacaPermintaan ----------

const URL_UJI = "http://localhost/api/langganan";
const json = (body: string, header: Record<string, string> = {}) =>
  new Request(URL_UJI, { method: "POST", headers: { "content-type": "application/json", ...header }, body });

test("bacaPermintaan: JSON biasa (juga dengan charset) lolos", async () => {
  assert.deepEqual(await bacaPermintaan(json('{"email":"a@b.co"}')), { ok: true, body: { email: "a@b.co" } });
  const r = new Request(URL_UJI, { method: "POST", headers: { "Content-Type": "Application/JSON; charset=utf-8" }, body: "[1]" });
  assert.deepEqual(await bacaPermintaan(r), { ok: true, body: [1] });
});

test("bacaPermintaan: Content-Type selain application/json → 415, body tidak dibaca", async () => {
  const tolak = { ok: false, hasil: { status: 415, pesan: "Permintaan tidak valid." } };
  // POST no-cors dari situs lain hanya bisa text/plain, form-urlencoded, atau multipart
  for (const tipe of ["text/plain;charset=UTF-8", "application/x-www-form-urlencoded", "multipart/form-data; boundary=x"]) {
    const r = new Request(URL_UJI, { method: "POST", headers: { "content-type": tipe }, body: '{"email":"a@b.co"}' });
    assert.deepEqual(await bacaPermintaan(r), tolak, tipe);
    assert.equal(r.bodyUsed, false, `body tidak dibaca untuk ${tipe}`);
  }
  // Tanpa header Content-Type sama sekali
  const tanpa = new Request(URL_UJI, { method: "POST", body: new Uint8Array([123, 125]) });
  assert.equal(tanpa.headers.get("content-type"), null);
  assert.deepEqual(await bacaPermintaan(tanpa), tolak);
});

test("bacaPermintaan: content-length > 1024 → 413 tanpa membaca body", async () => {
  const r = json('{"email":"a@b.co"}', { "content-length": "1025" });
  assert.deepEqual(await bacaPermintaan(r), { ok: false, hasil: { status: 413, pesan: "Permintaan tidak valid." } });
  assert.equal(r.bodyUsed, false);
  // Tepat 1024 masih boleh (header saja; body asli kecil)
  assert.equal((await bacaPermintaan(json('{"email":"a@b.co"}', { "content-length": "1024" }))).ok, true);
});

test("bacaPermintaan: body nyata > 1024 byte tanpa content-length (chunked) → 413", async () => {
  const besar = JSON.stringify({ email: "a".repeat(1100) + "@b.co" });
  const r = json(besar);
  assert.equal(r.headers.get("content-length"), null);
  assert.deepEqual(await bacaPermintaan(r), { ok: false, hasil: { status: 413, pesan: "Permintaan tidak valid." } });
});

test("bacaPermintaan: bukan JSON → 400", async () => {
  for (const body of ["not json", "", "{email:"]) {
    assert.deepEqual(await bacaPermintaan(json(body)), { ok: false, hasil: { status: 400, pesan: "Permintaan tidak valid." } }, body);
  }
});

// ---------- daftarkan ----------

type Panggilan = { url: string; init: RequestInit };

/** Stub fetch yang mencatat panggilan dan membalas dengan Response tetap. */
function stub(balas: () => Response | Promise<Response>) {
  const panggilan: Panggilan[] = [];
  const f = (async (url: string | URL | Request, init?: RequestInit) => {
    panggilan.push({ url: String(url), init: init ?? {} });
    return balas();
  }) as typeof fetch;
  return { f, panggilan };
}

const semuaPesan: string[] = [];
const catat = (h: Hasil) => {
  semuaPesan.push(h.pesan);
  return h;
};

test("daftarkan: tanpa kunci → 503, Resend tidak dipanggil", async () => {
  const { f, panggilan } = stub(() => new Response("{}", { status: 200 }));
  assert.deepEqual(catat(await daftarkan("a@b.co", {}, f)), BELUM_AKTIF);
  assert.deepEqual(catat(await daftarkan("a@b.co", { RESEND_API_KEY: "" }, f)), BELUM_AKTIF);
  assert.deepEqual(catat(await daftarkan("a@b.co", { RESEND_API_KEY: "   ", RESEND_SEGMENT_ID: "seg" }, f)), BELUM_AKTIF);
  assert.equal(panggilan.length, 0);
});

test("daftarkan: 200 → sukses; URL, metode, header, body, dan timeout benar", async () => {
  const { f, panggilan } = stub(() => Response.json({ object: "contact", id: "c-1" }, { status: 200 }));
  const h = catat(await daftarkan("a@b.co", { RESEND_API_KEY: KUNCI, RESEND_SEGMENT_ID: "seg-123" }, f));
  assert.deepEqual(h, SUKSES);
  assert.equal(panggilan.length, 1);
  const { url, init } = panggilan[0];
  assert.equal(url, "https://api.resend.com/contacts");
  assert.equal(init.method, "POST");
  const header = new Headers(init.headers);
  assert.equal(header.get("authorization"), `Bearer ${KUNCI}`);
  assert.equal(header.get("content-type"), "application/json");
  assert.deepEqual(JSON.parse(String(init.body)), { email: "a@b.co", segments: [{ id: "seg-123" }] });
  assert.ok(init.signal instanceof AbortSignal, "ada signal timeout");
});

test("daftarkan: tanpa segment → body tanpa `segments`", async () => {
  const { f, panggilan } = stub(() => new Response("{}", { status: 201 }));
  assert.deepEqual(catat(await daftarkan("a@b.co", { RESEND_API_KEY: KUNCI }, f)), SUKSES);
  assert.deepEqual(JSON.parse(String(panggilan[0].init.body)), { email: "a@b.co" });
});

test("daftarkan: 409/422 kontak sudah ada → sukses", async () => {
  for (const status of [409, 422]) {
    const { f } = stub(() => Response.json({ statusCode: status, name: "validation_error", message: "Contact already exists." }, { status }));
    assert.deepEqual(catat(await daftarkan("a@b.co", { RESEND_API_KEY: KUNCI }, f)), SUKSES, `status ${status}`);
  }
});

test("daftarkan: 409/422 karena alasan lain → 502", async () => {
  for (const status of [409, 422]) {
    const { f } = stub(() => Response.json({ statusCode: status, name: "validation_error", message: "Invalid `email` field." }, { status }));
    assert.deepEqual(catat(await daftarkan("a@b.co", { RESEND_API_KEY: KUNCI }, f)), GAGAL, `status ${status}`);
  }
  // Salah setel segment bukan "kontak sudah ada": jangan jadi sukses palsu
  const { f } = stub(() =>
    Response.json({ statusCode: 422, name: "validation_error", message: "Segments must reference an existing segment." }, { status: 422 }),
  );
  assert.deepEqual(catat(await daftarkan("a@b.co", { RESEND_API_KEY: KUNCI, RESEND_SEGMENT_ID: "salah" }, f)), GAGAL);
});

test("daftarkan: 409/422 dengan isi teks biasa (bukan JSON)", async () => {
  const sudah = stub(() => new Response("Contact already exist", { status: 409 }));
  assert.deepEqual(catat(await daftarkan("a@b.co", { RESEND_API_KEY: KUNCI }, sudah.f)), SUKSES);
  const lain = stub(() => new Response("Conflict: existing request in progress", { status: 409 }));
  assert.deepEqual(catat(await daftarkan("a@b.co", { RESEND_API_KEY: KUNCI }, lain.f)), GAGAL);
});

test("daftarkan: body balasan yang tidak dibaca dibatalkan", async () => {
  for (const [status, harap] of [[500, GAGAL], [401, GAGAL], [200, SUKSES]] as const) {
    let batal = false;
    const body = new ReadableStream({ cancel: () => void (batal = true) });
    const { f } = stub(() => new Response(body, { status }));
    assert.deepEqual(catat(await daftarkan("a@b.co", { RESEND_API_KEY: KUNCI }, f)), harap, `status ${status}`);
    assert.equal(batal, true, `body ${status} dibatalkan`);
  }
});

test("daftarkan: 500, 401, 429 → 502 tanpa isi mentah Resend", async () => {
  for (const status of [500, 401, 429]) {
    const { f } = stub(() => new Response(`rahasia-resend-${status} ${KUNCI}`, { status }));
    const h = catat(await daftarkan("a@b.co", { RESEND_API_KEY: KUNCI }, f));
    assert.deepEqual(h, GAGAL, `status ${status}`);
    assert.ok(!h.pesan.includes("rahasia-resend"));
  }
});

test("daftarkan: fetch melempar (jaringan/timeout) → 502", async () => {
  const f = (async () => {
    throw new DOMException("The operation was aborted due to timeout", "TimeoutError");
  }) as typeof fetch;
  assert.deepEqual(catat(await daftarkan("a@b.co", { RESEND_API_KEY: KUNCI }, f)), GAGAL);
  const g = (async () => {
    throw new TypeError(`fetch failed ${KUNCI}`);
  }) as typeof fetch;
  assert.deepEqual(catat(await daftarkan("a@b.co", { RESEND_API_KEY: KUNCI }, g)), GAGAL);
});

test("daftarkan: kunci tidak pernah muncul di pesan", () => {
  assert.ok(semuaPesan.length >= 10, `pesan tercatat: ${semuaPesan.length}`);
  for (const p of semuaPesan) assert.ok(!p.includes(KUNCI), p);
});
