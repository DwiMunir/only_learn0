# Deploy

Situs ini statis penuh: semua halaman di-render saat build, tanpa database atau server yang perlu dirawat.

## Vercel (paling cepat)

1. Push repo ke GitHub.
2. Di Vercel: **Add New → Project**, pilih repo. Framework terdeteksi otomatis sebagai Next.js.
3. Atur environment variables:

   | Variable | Production | Preview |
   |---|---|---|
   | `NEXT_PUBLIC_SITE_URL` | `https://onlylearn0.vercel.app` | (kosongkan) |
   | `SHOW_DRAFTS` | `false` | `true` |

   Dengan pengaturan ini, setiap branch atau Pull Request mendapat link preview yang **menampilkan draft** (dan otomatis `noindex`), sementara produksi hanya menampilkan catatan yang sudah terbit.
4. Deploy. Build command bawaan (`npm run build`) sudah menjalankan `npm run cek` lebih dulu. Kalau ada catatan yang rusak, deploy gagal dan versi lama tetap jalan.

## Domain

1. Beli domain (misalnya `.id` atau `.com`).
2. Di Vercel: **Settings → Domains**, tambahkan domain, lalu ikuti instruksi DNS-nya.
3. Perbarui `NEXT_PUBLIC_SITE_URL` di Production, lalu redeploy.

## Setelah live

- **Link bio Instagram** → beranda (`https://onlylearn.id`). Beranda menampilkan catatan terbaru di urutan teratas.
- **Google Search Console**: daftarkan domain, lalu submit `https://onlylearn.id/sitemap.xml`.
- **Cek preview link:** tempel link catatan di WhatsApp. Gambar preview (OG image) dibuat otomatis per catatan.

## Catatan soal paket Vercel

Paket Hobby (gratis) hanya untuk penggunaan **non-komersial**. Menurut fair use guidelines Vercel, yang termasuk komersial antara lain menjual produk atau jasa, menerima pembayaran dari pengunjung, memasang iklan seperti AdSense, atau situs yang tujuan utamanya link affiliate. Meminta donasi tidak termasuk komersial.

Selama blog ini hanya berisi catatan riset dan lead magnet gratis, Hobby masih aman. Begitu kamu mulai menjual kit, memasang iklan, atau menjadikan affiliate sebagai tujuan utama, pindah ke paket Pro atau ke hosting lain. Cek ketentuan terbarunya di https://vercel.com/docs/limits/fair-use-guidelines.

Karena situsnya statis, pindah hosting relatif mudah. Satu hal yang perlu disesuaikan: redirect `/c/<slug>` di `next.config.ts` harus dipindah ke aturan redirect milik hosting baru.

## Perintah lokal

```bash
npm run build   # cek konten + build produksi
npm run start   # jalankan hasil build di http://localhost:3000
```
