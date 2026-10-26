# Redesign visual blog Only Learn · rancangan

26 Okt 2026 · status: disetujui (lewat mockup di browser)

## Kenapa

Struktur blog sudah benar, tapi tampilannya terasa kaku seperti dokumen: hampir semuanya teks hitam putih, thumbnail reel hanya kotak hitam, logo belum dipakai, dan warna biru tuanya tidak serumpun dengan logo. Tujuannya membuat blog terasa milik Only Learn dan lebih hidup, tanpa jadi ramai.

## Tujuan, bukan tujuan, anti-tujuan

**Tujuan**
- Setiap halaman terbagi jelas: **header, hero, isi, footer**.
- Logo dipakai di header, footer, ikon tab, dan gambar preview link.
- Palet warna diambil dari logo.
- Poster reel menjadi gambar utama di daftar artikel.

**Bukan tujuan**
- Mengubah alur konten, schema, atau importer.
- Ilustrasi, foto stok, atau animasi baru.
- Fitur thumbnail di Morena (proyek terpisah).

**Anti-tujuan**
- Tampilan ramai, misalnya ubin warna-warni, gradasi di mana-mana, atau label berwarna di setiap baris.
- Kuning dipakai selain untuk klaim riset.
- Teks kecil yang kontrasnya di bawah WCAG AA (4,5:1).

## Yang diputuskan bersama (mockup)

- **Header:**
  - Kiri: monogram OL ditambah wordmark "**Only**" (navy) "**Learn**" (teal logo), dengan garis tipis di bawahnya.
  - Kanan: tombol pill "Follow" di beranda, atau link "← Semua catatan" atau "← Beranda" di halaman dalam.
  - Di desktop, link topik dan "Cara aku riset" tetap ada di tengah.
- **Hero glassmorphism** di setiap halaman: blok membulat berlatar gradasi lembut, dengan dua lingkaran warna logo (cyan di kiri atas, teal transparan di kanan bawah). Di atasnya ada kartu kaca buram (putih 55%, blur 14px, border putih, bayangan lembut) berisi judul halaman dan satu kalimat pengantar.
- **Daftar artikel berupa list:**
  - Setiap baris berisi poster reel kecil (54×76, sudut 12px), judul (hook), lalu baris meta berisi topik dan jumlah sumber.
  - Antarbaris dipisah garis tipis.
  - Di atas daftar ada filter topik berbentuk pill ("Semua", "Uang", "Karier", "Psikologi sehari-hari").
- **Kit gratis (lead magnet) dihapus** dari situs.
- **Halaman artikel**, urut dari atas:
  1. hero kaca berisi chip topik, judul, dan meta (tanggal dicek, jumlah sumber, waktu baca);
  2. baris "Tonton reelnya" dengan poster kecil;
  3. ringkasan dalam kotak lembut;
  4. isi artikel (serif, stabilo kuning, nomor sumber navy);
  5. "Apa kata riset" (meteran bukti teal);
  6. "Sumber";
  7. koreksi.
- **Footer navy:**
  - Logo berwarna asli di lencana putih membulat.
  - Satu kalimat "Riset di balik setiap reel @only_learn0."
  - Link "Cara aku riset", "Tentang" dan "Instagram", lalu "© tahun Only Learn".

## Palet (dari logo)

| Token | Nilai | Dipakai untuk |
|---|---|---|
| `primary` | `#0E314D` navy | tombol utama, nomor sumber (latar), chip aktif, footer, judul |
| `primary-strong` | `#0A2539` | hover tombol utama |
| `primary-soft` | `#E3F1F5` | chip tidak aktif, kotak ringkasan, sorotan sementara |
| `accent` | `#2F6B8D` | link dan teks aksen kecil (kontras 5,8:1) |
| `brand-teal` | `#3B87A6` | **hanya** wordmark "Learn" dan segmen meteran bukti (bukan teks kecil; kontras 4,0:1) |
| `brand-cyan` | `#ADDFE5` | lingkaran hero, gradasi gambar pengganti |
| `ink` | `#14283A` | teks utama |
| `ink-muted` | `#5B6B78` | meta, keterangan |
| `paper` | `#FFFFFF` | latar halaman |
| `surface` | `#F1F7F9` | latar lembut |
| `line` | `#E3EBF0` | garis pemisah |
| `on-dark` | `#CFE3EA` | teks sekunder di footer navy |
| `highlight` | `#FFE066` | tetap, hanya stabilo klaim |
| `correction` / `correction-surface` | tetap | hanya koreksi |

Font tetap: Plus Jakarta Sans untuk antarmuka dan Literata untuk isi artikel.

## Keputusan perancang (bisa dikoreksi)

1. **Halaman lain mengikuti pola yang sama.** Semua catatan, Topik, Tentang, Cara aku riset dan 404 memakai header, hero kaca (judul halaman + pengantar), isi, lalu footer.
2. **Filter topik berupa link** ke `/topik/<slug>`. "Semua" mengarah ke `/catatan`, dan chip halaman yang sedang dibuka tampil aktif. Tidak ada filter di sisi browser, jadi situs tetap statis.
3. **Gambar pengganti poster:** kotak gradasi cyan → teal dengan monogram OL putih. Dipakai untuk artikel yang belum punya poster.
4. **Artikel `sunday-scaries`** diberi poster dari frame videonya di Morena (`public/reels/sunday-scaries.jpg`).
5. **Aset logo:**
   - ikon tab: `src/app/icon.png`;
   - ikon iOS: `src/app/apple-icon.png`;
   - monogram: `public/brand/ol-mark.png`;
   - logo lengkap: `public/brand/ol-logo.png`.
6. **Gambar preview link (OG):** latar putih, monogram dan wordmark di kiri atas, judul dengan stabilo, lalu baris topik, jumlah sumber dan @handle dalam warna baru.
7. **Label huruf kapital di atas judul** (seperti "CATATAN RISET" di mockup) **dihilangkan.** Aturan suara di DESIGN.md (sentence case, tanpa eyebrow) tetap berlaku, jadi hero cukup berisi judul dan pengantar.
8. **Meta tetap dipisah spasi**, tidak memakai titik tengah, sesuai aturan yang ada.
9. **DESIGN.md naik ke versi 2.0:**
   - Gradasi hanya boleh di latar hero dan gambar pengganti poster.
   - Bayangan hanya di kartu kaca hero dan sheet sumber.
   - Selebihnya tetap datar.
   - Token dibuat ulang dengan `npm run tokens`.
10. **Desktop:** isi tetap selebar 680px di dalam kontainer 1080px, dan sidenote sumber di margin kanan dipertahankan.
11. **Lingkaran blur hero** tetap statis dan tidak bergerak.
12. **Fallback kaca:** kalau `backdrop-filter` tidak didukung, kartu memakai putih 85% supaya teks tetap terbaca.

## Data dan kode yang tersentuh

| Bagian | File |
|---|---|
| Desain dan token | `DESIGN.md` (v2.0), `src/styles/tokens.css` (dibuat ulang), `src/app/globals.css` |
| Aset | `public/brand/*`, `src/app/icon.png`, `src/app/apple-icon.png`, `public/reels/sunday-scaries.jpg` |
| Kerangka | `src/components/top-bar.tsx`, `src/components/footer.tsx`, `src/components/hero.tsx` (baru) |
| Daftar | `src/components/reel-row.tsx`, `src/components/topic-chips.tsx` |
| Halaman | `src/app/page.tsx`, `catatan/page.tsx`, `catatan/[slug]/page.tsx`, `topik/[slug]/page.tsx`, `tentang/page.tsx`, `cara-aku-riset/page.tsx`, `not-found.tsx`, `catatan/[slug]/opengraph-image.tsx` |
| Komponen riset | `src/components/research.tsx`, `evidence-meter.tsx`, `source-dialog.tsx`, `reel-embed.tsx` (warna dan bentuk saja) |
| Dihapus | `src/components/lead-magnet.tsx`, `site.leadMagnet` di `src/lib/site.ts` |
| Konten | `content/catatan/sunday-scaries.mdx` (`reel.poster`) |
| Docs | `docs/05-desain-dan-token.md` (peta komponen) |

## Referensi visual

Mockup yang disetujui ada di `only-learn/.superpowers/brainstorm/98404-1792989462/content/`. File itu ada di checkout utama, bukan di branch ini:

- **`struktur-v3.html`:** opsi "Hero · Glassmorphism", untuk beranda.
- **`artikel-v1.html`:** halaman artikel.
- **`footer-v1.html`:** opsi "Footer navy, logo di lencana putih".
