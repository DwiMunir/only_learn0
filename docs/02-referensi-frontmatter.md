# Referensi frontmatter

Semua aturan di bawah dicek oleh `npm run cek` dan saat build. Sumber kebenarannya ada di `src/lib/schema.ts`.

## Field utama

| Field | Wajib | Tipe | Keterangan |
|---|---|---|---|
| `title` | ya | teks | Hook reel, apa adanya. Jadi judul halaman. |
| `description` | ya | teks, maks 200 | Untuk Google dan preview link di WhatsApp atau DM. |
| `topic` | ya | `uang` \| `karier` \| `psikologi-sehari-hari` | Daftar topik ada di `src/lib/site.ts`. |
| `publishedAt` | ya | `YYYY-MM-DD` | Tanggal terbit. Menentukan urutan di daftar. |
| `checkedAt` | ya | `YYYY-MM-DD` | Tanggal terakhir semua sumber dicek. Tampil sebagai "Dicek ...". |
| `draft` | tidak | `true` \| `false` | Default `false`. Draft tidak tampil di produksi. |
| `reel.url` | ya saat terbit | link reel Instagram | Contoh `https://www.instagram.com/reel/De5eo3WFZqJ/` |
| `reel.poster` | tidak | path | Contoh `/reels/sunday-scaries.jpg` (file di `public/reels/`). |
| `summary` | ya | 1–5 teks | Poin di bagian "Ringkasan". |
| `sources` | ya | daftar, minimal 1 | Lihat tabel di bawah. Urutannya jadi nomor footnote. |
| `claims` | tidak | daftar | Isi bagian "Apa kata riset". |
| `corrections` | tidak | daftar | Catatan koreksi. |

## `sources[]`

| Field | Wajib | Keterangan |
|---|---|---|
| `id` | ya | Huruf kecil dan tanda hubung, unik di dalam satu catatan. Pola yang disarankan: `penulis-tahun`, misalnya `stone-2012`. |
| `title` | ya | Judul sumber asli. Kalau ada titik dua, bungkus dengan tanda kutip. |
| `authors` | ya | Penulis atau lembaga: `Stone, Schneider & Harter`. |
| `year` | ya | Angka tahun. |
| `publisher` | tidak | Jurnal, volume, halaman, atau lembaga. |
| `url` | ya | Link ke sumber asli. Utamakan DOI (`https://doi.org/...`). |
| `level` | ya | `strong`, `moderate`, `survey`, `preliminary`, atau `regulation`. |
| `supports` | ya | Satu kalimat: apa yang didukung sumber ini. Tampil di sheet sumber. |
| `note` | tidak | Catatan kecil: jenis studi, jumlah responden, batasannya. |
| `checkedAt` | tidak | Kalau satu sumber dicek di tanggal berbeda. Default: `checkedAt` artikel. |

## Level bukti

| Nilai | Label di situs | Meteran | Untuk |
|---|---|---|---|
| `strong` | Bukti kuat | 4 dari 4 | Meta-analisis, tinjauan sistematis |
| `moderate` | Bukti sedang | 3 dari 4 | Satu studi peer-reviewed |
| `survey` | Data survei | 2 dari 4 | Survei, laporan perusahaan atau lembaga |
| `preliminary` | Masih dugaan | 1 dari 4 | Hipotesis, opini ahli, temuan awal |
| `regulation` | Aturan resmi | tag | UU, PP, Permen |

## `claims[]`

| Field | Keterangan |
|---|---|
| `text` | Klaim singkat, sekitar 3–10 kata. Contoh: `Mood naik di akhir pekan`. |
| `sources` | Daftar ID sumber: `[helliwell-wang-2014, stone-2012]`. |

Pasang `<ApaKataRiset />` di teks, di posisi tempat bagian ini harus muncul.

## `corrections[]`

| Field | Keterangan |
|---|---|
| `date` | `YYYY-MM-DD` |
| `text` | Apa yang diubah, dalam satu atau dua kalimat. |

## Komponen MDX

| Komponen | Contoh | Fungsi |
|---|---|---|
| `<Klaim>` | `<Klaim sumber="stone-2012">teks</Klaim>` | Stabilo + nomor footnote + sidenote |
| `<ApaKataRiset />` | `<ApaKataRiset />` | Render bagian "Apa kata riset" dari `claims` |

Markdown biasa tetap berlaku: `## Judul bagian`, `**tebal**`, daftar bernomor, dan `[link](https://...)`.
