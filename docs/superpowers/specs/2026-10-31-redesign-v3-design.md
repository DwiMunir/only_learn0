# Redesign v3 blog Only Learn · rancangan

31 Okt 2026 · status: disetujui di chat

Referensi visual: `design/referensi/redesign-v3.jpg` (gambar dari pemilik). Blog harus tampil seperti gambar itu.

## Kenapa

Pemilik ingin blog terasa lebih hidup dan modern, seperti majalah atau insight blog: hero berwarna pastel dengan ilustrasi, kartu artikel bergambar, dan sidebar. Ada juga fitur yang benar-benar berfungsi: cari, urutkan, simpan, dan berlangganan email.

## Tujuan, bukan tujuan, anti-tujuan

**Tujuan**
- Tampilan beranda mengikuti gambar referensi, termasuk:
  - header dengan menu topik dan ikon cari;
  - hero pastel bergelombang dengan badge, judul dua warna dan coretan kuning, kotak cari, dan ilustrasi 3D;
  - filter topik berikon dan pilihan urutan;
  - kartu artikel;
  - sidebar berisi kartu langganan email dan Kategori Populer.
- Fitur yang berfungsi:
  - **cari** artikel;
  - **urutkan** (Terbaru, Terlama);
  - **filter topik**;
  - **simpan** artikel (localStorage) beserta halaman **Tersimpan**;
  - **langganan email** lewat Resend.
- Blog **mendukung thumbnail artikel.** Gambarnya nanti dibuat dan dikirim oleh Morena (video engine).

**Bukan tujuan**
- Membuat thumbnail artikel. Itu tugas Morena nanti.
- Akun pembaca atau sinkronisasi Simpan lintas perangkat.
- Mengirim newsletter. Blog hanya mendaftarkan kontak ke Resend.
- Mengubah schema riset, importer, atau alur publish, selain menambah field `thumbnail`.

**Anti-tujuan**
- Fitur cari, urut, atau simpan yang tampil tapi tidak bekerja.
- Form email yang error atau membocorkan API key. Selama Resend belum disetel, form harus memberi tahu dengan sopan bahwa langganan belum aktif.
- Penanda kepercayaan riset hilang: stabilo, nomor sumber, meteran bukti, tanggal dicek, dan jumlah sumber.
- Teks kecil dengan kontras di bawah WCAG AA (4,5:1).
- Situs berhenti statis untuk halaman konten. Hanya endpoint langganan yang berjalan di server.

## Yang diputuskan pemilik

- **Desain mengikuti gambar referensi.**
- **Urutan, cari, Simpan, dan email harus berfungsi.**
  - Simpan memakai localStorage.
  - Email memakai Resend. Pemilik akan menyetel API key dan segment sendiri nanti.
- **Thumbnail:** blog hanya perlu mendukungnya. Pembuatannya ada di video engine.
- **Aset ilustrasi** dibuat dengan model gambar Cloudflare Workers AI. `CLOUDFLARE_API_TOKEN` dan `CLOUDFLARE_ACCOUNT_ID` sudah ada di `.env` blog.

## Keputusan perancang (bisa dikoreksi)

1. **Warna mengikuti gambar** (lihat tabel palet). Logo OL tetap memakai berkas asli berwarna teal, sedangkan teks "Only Learn" di sebelahnya berwarna navy.
2. **Tata letak di HP:**
   - menu topik di header menjadi deretan pill yang bisa digeser;
   - ilustrasi hero mengecil dan pindah ke atas judul;
   - kartu artikel menumpuk, dengan gambar di atas dan teks di bawah;
   - sidebar pindah ke bawah daftar.
3. **Teks berbahasa Indonesia:** "5 menit baca", tanggal panjang seperti "26 Oktober 2026", "Simpan" atau "Tersimpan", "Terbaru" atau "Terlama". Badge hero tetap "Blog & Insight", seperti di gambar.
4. **Jumlah sumber tetap tampil** di setiap kartu ("4 sumber"). Ini penanda kepercayaan utama blog, walaupun tidak ada di gambar.
5. **Gambar kartu** memakai thumbnail dulu. Kalau belum ada, kartu memakai poster reel. Kalau poster juga tidak ada, kartu memakai kotak gradasi pastel dengan monogram OL. Rasio gambar kartu 16:9 dengan `object-cover`.
6. **Ikon topik dan Kategori Populer memakai emoji** (Uang 🪙, Karier 💼, Psikologi sehari-hari 💜, Cara aku riset 💡). Tanpa aset tambahan.
7. **Kategori Populer:** jumlah artikel dihitung asli per topik. "Cara aku riset" tampil sebagai link ke halamannya, tanpa angka.
8. **Ikon hijau di pojok kanan atas gambar diabaikan**, karena dianggap sisa dari pembuat gambar.
9. **Cari:**
   - Berjalan di browser atas data ringkas semua artikel: judul, deskripsi, ringkasan, dan topik. Data itu disertakan di halaman saat build.
   - Tidak membedakan huruf besar kecil dan aksen.
   - Hasilnya langsung menyaring daftar di beranda.
   - Ikon cari di header mengarah ke `/#cari` dan memfokuskan kotak cari.
10. **Urut dan filter** berjalan di browser di beranda. Halaman `/topik/<slug>` dan `/catatan` tetap ada dengan kartu dan kontrol urut yang sama.
11. **Simpan:**
    - Disimpan di localStorage dengan kunci `onlylearn:simpan`, berisi daftar slug.
    - Halaman `/tersimpan` menampilkan kartu artikel yang tersimpan.
    - Kalau kosong, halaman itu menampilkan pesan.
    - Kalau localStorage tidak tersedia (misalnya mode privat yang memblokirnya), tombol Simpan disembunyikan, tidak error.
12. **Langganan email:**
    - Form mengirim ke Route Handler `POST /api/langganan` (Node runtime di Vercel).
    - Handler memvalidasi email (zod, maksimal 254 karakter) dan memakai honeypot sebagai jebakan bot.
    - Handler memanggil `POST https://api.resend.com/contacts` dengan `{ email, segments: [{ id: RESEND_SEGMENT_ID }] }`. `segments` hanya dikirim kalau env-nya ada. `unsubscribed` sengaja tidak dikirim supaya daftar ulang tidak pernah mengaktifkan lagi kontak yang sudah berhenti langganan.
    - Env yang dipakai: `RESEND_API_KEY` (wajib supaya aktif) dan `RESEND_SEGMENT_ID` (opsional).
    - Kalau `RESEND_API_KEY` kosong, handler membalas 503 dengan "Langganan belum aktif. Coba lagi nanti." dan tidak memanggil Resend.
    - Kalau kontak sudah ada, hasilnya dianggap berhasil.
    - API key tidak pernah sampai ke browser.
13. **Halaman artikel** tidak ada di gambar. Strukturnya tetap, gayanya mengikuti v3:
    - pita pastel di atas berisi label topik, judul, meta, dan tombol Simpan;
    - kartu putih membulat untuk ringkasan, "Apa kata riset", dan sumber;
    - stabilo kuning dan nomor sumber tetap ada;
    - sidenote di desktop tetap ada.
14. **Footer:** navy tua v3 (`#131B3A`), dengan logo di lencana putih, tagline, link, dan ©.
15. **Gambar preview link (OG)** ikut palet v3.
16. **Aset ilustrasi** dibuat sekali dengan model `@cf/black-forest-labs/flux-2-dev`. Prompt-nya disimpan di `design/referensi/prompt-aset.md` supaya bisa dibuat ulang. Isinya:
    - ilustrasi hero 3D: laptop, tumpukan buku, lampu, tanaman, mug, dan panah melengkung, gaya clay pastel tanpa teks;
    - pemandangan gunung malam untuk kartu langganan.
    - Disimpan sebagai JPEG terkompresi di `public/ilustrasi/`. Tepinya dilebur ke latar dengan CSS `mask-image`.

## Palet v3 (dari gambar)

| Token | Nilai | Dipakai untuk |
|---|---|---|
| `primary` | `#2563EB` | tombol Follow, pill aktif, tombol kirim, link utama (5,2:1 di putih) |
| `primary-strong` | `#1D4ED8` | hover |
| `primary-soft` | `#E8F0FE` | latar lembut biru, hover |
| `navy` | `#131B3A` | judul baris 1, chip "Semua" aktif, kartu langganan, footer |
| `ink` | `#1E2440` | teks utama |
| `ink-muted` | `#5E6582` | meta (5,6:1 di putih) |
| `paper` | `#FFFFFF` | kartu, latar |
| `surface` | `#F6F7FB` | latar halaman |
| `line` | `#E7E9F2` | garis kartu |
| `hero-peach` / `hero-lavender` / `hero-sky` / `hero-pink` | `#FDE8D7` / `#EEE6FB` / `#DCEAFE` / `#F9E0EC` | gradasi dan gelombang hero |
| `scribble` | `#F5C542` | coretan di bawah "reel." (hiasan, bukan teks) |
| `tag-psikologi` | latar `#EFE9FC`, teks `#6B46C1` | label topik |
| `tag-uang` | latar `#E3F6EA`, teks `#1E7A4C` | label topik |
| `tag-karier` | latar `#E6EEFF`, teks `#1F4FBF` | label topik |
| `highlight` | `#FFE066` | stabilo klaim (tetap) |
| `correction` / `correction-surface` | tetap | koreksi |
| `meter-filled` / `meter-empty` | `#2563EB` / `#C9D3EA` | meteran bukti |

Font tetap: Plus Jakarta Sans untuk antarmuka dan Literata untuk isi artikel. Kontras teks label topik harus dicek ≥ 4,5:1.

## Thumbnail (kontrak dengan Morena)

- **Frontmatter dan `artikel.json`** mendapat field opsional `thumbnail: "/thumbs/<slug>.jpg"`. Nilainya path lokal yang diawali `/thumbs/`.
- **Format yang disarankan:** 1200×675 (16:9), JPEG atau WebP, maksimal 200 KB.
- **Importer** meneruskan field ini.
- **`npm run cek`** memberi warning (bukan error) kalau file lokalnya tidak ada.
- **Tugas Morena nanti:**
  - menyalin gambar ke `public/thumbs/<slug>.jpg`;
  - mengisi `thumbnail` di `artikel.json`;
  - ikut meng-commit file gambar itu saat publish.

  Semua ini didokumentasikan di `docs/03` dan `docs/02`.
- **Urutan pakai:** thumbnail, lalu poster reel, lalu kotak pengganti.

## Data dan kode yang tersentuh

| Bagian | File |
|---|---|
| Desain | `DESIGN.md` (v3), `src/styles/tokens.css` (`npm run tokens`), `src/app/globals.css` |
| Thumbnail | `src/lib/schema.ts`, `src/lib/content.ts` (warning), `scripts/_catatan.ts` atau `scripts/impor.ts` (diteruskan), `schemas/research-note.schema.json` (`npm run schema`), `docs/02`, `docs/03` |
| Aset | `public/ilustrasi/*`, `design/referensi/prompt-aset.md` |
| Logika murni + tes | `src/lib/jelajah.ts` (cari, urut, filter), `src/lib/simpan.ts` (baca dan ubah daftar simpan), `src/lib/langganan.ts` (validasi dan panggilan Resend dengan `fetch` yang bisa diganti di tes) |
| Komponen | header, footer, hero, kartu artikel, jelajah artikel (klien), tombol simpan (klien), kartu langganan (klien), Kategori Populer |
| Halaman | `/`, `/catatan`, `/topik/[slug]`, `/catatan/[slug]`, `/tersimpan` (baru), `/tentang`, `/cara-aku-riset`, 404, OG image |
| Endpoint | `src/app/api/langganan/route.ts` |
| Env | `.env.example`: `RESEND_API_KEY=`, `RESEND_SEGMENT_ID=` |
