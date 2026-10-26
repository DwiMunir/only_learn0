# Prompt Pack Stitch — Only Learn

Versi 1.0, 25 Oktober 2026. Pasangan dari `DESIGN.md` v1.0.

## Cara pakai

1. Buat project baru di Stitch, pilih device **Mobile** untuk Prompt 1–5. Prompt 6 dipakai untuk versi desktop.
2. Masukkan isi `DESIGN.md` sebagai design system project. Kalau di versi Stitch yang kamu pakai belum ada opsi import, tempel **Prompt 0** di awal Prompt 1.
3. Jalankan prompt **satu layar per prompt**, urut dari 1 sampai 6. Setelah tiap hasil keluar, cek dengan checklist di bagian bawah.
4. Kalau ada yang meleset, pakai **prompt perbaikan**. Satu perubahan per prompt, sesuai panduan resmi Stitch.
5. Jaga panjang prompt di bawah ±5.000 karakter. Ada laporan dari komunitas bahwa Stitch melewatkan komponen kalau prompt-nya terlalu panjang. Semua prompt di bawah sudah di bawah batas itu.

Prompt ditulis dalam bahasa Inggris karena Stitch paling konsisten membacanya. Semua teks UI tetap Bahasa Indonesia, ditulis persis di dalam tanda kutip.

> **Catatan konten:** judul reel di mock ini diambil dari reel asli @only_learn0. Nama sumber di halaman artikel adalah contoh tata letak. Aku cukup yakin paper-paper itu memang ada, tapi isi dan angkanya tetap harus dicek ke sumber aslinya sebelum dipakai di artikel sungguhan.

---

## Kenapa desainnya begini

**Metafora: catatan belajar.** Tinta hitam di kertas putih, pulpen biru untuk link dan tombol, stabilo kuning untuk kalimat penting, dan pulpen merah untuk koreksi. Semua anak sekolah dan mahasiswa Indonesia langsung paham bahasa visual ini, jadi tidak perlu dijelaskan.

**Stabilo = bukti.** Satu-satunya elemen yang "berani" adalah stabilo kuning, dan fungsinya informatif: kalimat yang distabilo adalah klaim riset, dan setiap stabilo punya nomor sumber. Dengan begitu, pembaca langsung melihat *mana yang ada risetnya* tanpa harus membaca semua. Ini inti legitimasi blognya.

**Label level bukti.** Tidak semua sumber sama kuat. Meteran 4 segmen ditambah label ("Bukti kuat", "Bukti sedang", "Data survei", "Masih dugaan") membuatmu jujur soal seberapa kuat klaimnya. Ini yang membedakan Only Learn dari akun motivasi biasa.

**List, bukan kartu.** Pengunjung dari Instagram sedang mencari satu reel tertentu. Baris dengan thumbnail dan hook jauh lebih cepat dipindai daripada grid kartu. Jumlah sumber ("4 sumber") muncul di tiap baris sebagai sinyal kepercayaan pertama.

**Font.** Plus Jakarta Sans buatan foundry Indonesia (Tokotype) dipakai untuk judul dan UI. Literata (serif) khusus untuk paragraf artikel, karena catatan ini memang untuk dibaca, bukan sekadar di-scroll.

**Yang sengaja dihindari:** gradient, ilustrasi stok, label huruf kapital, kartu berbayang, dan emoji. Semua itu membuat situs terlihat seperti template, padahal yang mau dibangun justru kesan serius.

---

## Prompt 0 — Ringkasan gaya (fallback)

Tempel di awal Prompt 1 hanya kalau `DESIGN.md` tidak bisa dimasukkan ke project.

```
Visual style for every screen in this project: a study-notes look. White paper background #FFFFFF, ink text #1B2430, muted text #5A6472, light grey surface #F2F4F6, 1px divider lines #DCE1E7. The accent is ballpoint-pen blue #1F3FAF for links, buttons, footnote numbers and evidence meters; pale blue #E8EDFB for footnote circles. A yellow highlighter #FFE066 appears only behind research claims inside article text, never anywhere else. Red pen #A8261C on #FCEDEB is used only for correction notes. Fonts: Plus Jakarta Sans for headings and UI (headlines ExtraBold with slightly tight tracking), Literata serif for article paragraphs at 18px with 1.7 line height. Flat design: no gradients, no shadows except a bottom sheet, 8px corners on buttons and cards, 16px on sheets, pill-shaped chips. Left aligned, 16px side margins, sentence case everywhere, no uppercase labels, no stock illustrations, no emoji, no arrows appended to button text.
```

---

## Prompt 1 — Home (link-in-bio)

**Tujuan layar:** pengunjung dari bio Instagram menemukan catatan reel yang barusan mereka tonton dalam satu ketukan.

```
Design the mobile home screen for "Only Learn", a reading site that holds the research notes behind each @only_learn0 Instagram reel. Visitors arrive from the Instagram bio link on their phone right after watching a reel. The screen's job: let them find the notes for the reel they just watched in one tap. Follow the project design system. All UI copy is in Bahasa Indonesia; use the exact text in quotes.

Top bar, 56px, white: the wordmark "only learn" on the left in lowercase Plus Jakarta Sans ExtraBold; a blue text button "Follow" on the right.

Intro, left aligned:
- Headline in the display style: "Riset di balik setiap reel."
- One muted line below: "Tiap konten @only_learn0 ada sumbernya. Ini catatan lengkapnya."

Section title "Kamu dari reel yang mana?", then a list of 4 rows separated by 1px divider lines. No cards and no shadows. Each row: a 48x64 vertical video thumbnail with 4px corners on the left; on the right the reel hook as the row title (max 2 lines, bold), and below it a muted meta line with the topic name, then a small document icon and the source count, spaced as separate items.
Row 1: "Rebahannya sama persis, tapi Minggu selalu kalah bahagia." / "Psikologi sehari-hari" / "4 sumber"
Row 2: "Unpopular opinion: pria paling aman itu yang keliatan bokek." / "Uang" / "3 sumber"
Row 3: "HR nanya kapan bisa mulai kerja. Lo jawab apa?" / "Karier" / "3 sumber"
Row 4: "Faktanya, rezekimu bisa ketahan sama 4 beban dari masa lalu." / "Uang" / "5 sumber"
Below the list, a full-width secondary button (white, blue text, 1px grey border): "Lihat semua catatan".

Section title "Topik", then three pill chips in one row on a light grey surface: "Uang", "Karier", "Psikologi sehari-hari".

Footer in small muted text: links "Cara aku riset" and "Tentang", then "© 2026 Only Learn".

Do not use yellow anywhere on this screen. Yellow is reserved for research claims inside articles.
```

---

## Prompt 2 — Artikel (mobile)

**Tujuan layar:** halaman inti. Setiap klaim riset terlihat jelas (stabilo kuning + nomor sumber), lengkap dengan level bukti dan daftar sumbernya.

```
Design the mobile article screen of Only Learn in the same style as the home screen. This page holds the research notes behind one reel. The key element: every research claim inside the article text sits on a yellow highlighter stroke (covering the lower 70% of the line, like a marker), followed directly by a small footnote marker: a blue number in a pale blue 20px circle. Yellow appears nowhere else on the page.

Top bar: a back chevron with "Semua catatan" on the left, blue text button "Follow" on the right.

Header, left aligned:
- A pill chip "Psikologi sehari-hari"
- Headline: "Rebahannya sama persis, tapi Minggu selalu kalah bahagia."
- A muted meta line with three separately spaced items: "Dicek 25 Okt 2026", "4 sumber", "5 menit baca"
- A vertical 9:16 Instagram reel embed, full width, 8px corners, a play icon in the center.

Section "Ringkasan" with 3 short bullet points:
"Mood cenderung naik di akhir pekan, lalu turun menjelang Minggu malam."
"Cemasnya datang dari bayangan Senin, bukan dari hari Minggu itu sendiri."
"Tiga cara kecil bisa bikin bayangan itu mengecil."

Section "Kenapa Minggu terasa beda": two paragraphs in Literata serif, 18px, 1.7 line height. In paragraph 1, highlight "suasana hati orang cenderung lebih baik di akhir pekan dibanding hari kerja" and follow it with footnote markers 1 and 2. In paragraph 2, highlight "banyak pekerja mengaku mulai cemas memikirkan Senin sejak Minggu sore" with footnote marker 3.

Section "Apa kata riset": three claim blocks separated by 1px divider lines. Each block: the claim sentence; under it an evidence meter made of 4 small horizontal pill segments (filled blue, empty light grey) followed by a text label; under that a muted source line.
Block 1: "Mood naik di akhir pekan" / 3 of 4 filled / "Bukti sedang" / "Helliwell & Wang, 2014. Social Indicators Research"
Block 2: "Pola suasana hati mengikuti hari dalam seminggu" / 3 of 4 filled / "Bukti sedang" / "Stone, Schneider & Harter, 2012. The Journal of Positive Psychology"
Block 3: "Banyak pekerja cemas menjelang Senin" / 2 of 4 filled / "Data survei" / "Survei LinkedIn tentang Sunday scaries, Amerika Serikat"

Section "Yang bisa kamu lakukan": a numbered list 1 to 3. In item 1, highlight "menuliskan rencana bisa meredakan pikiran soal tugas yang belum selesai" with footnote marker 4.
1. "Cicil sebelum libur: tulis 3 hal pertama untuk Senin, karena menuliskan rencana bisa meredakan pikiran soal tugas yang belum selesai."
2. "Kasih Minggu sore satu hal yang kamu tunggu."
3. "Jauhkan chat kerja selama libur."

Section "Sumber": a numbered list 1 to 4 matching the footnotes. Each item: source title, author or publisher and year in muted text, a blue link "Buka sumber asli", and muted "Dicek 25 Okt 2026".
1. "Weekends and Subjective Well-Being" / "Helliwell & Wang, 2014"
2. "Day-of-week mood patterns in the United States" / "Stone, Schneider & Harter, 2012"
3. "Survei Sunday scaries" / "LinkedIn"
4. "Consider it done! Plan making can eliminate the cognitive effects of unfulfilled goals" / "Masicampo & Baumeister, 2011"

One muted line after the sources: "Nemu yang keliru? Kirim lewat DM @only_learn0, aku perbaiki dan catat di halaman koreksi."

End of page: a full-width primary blue button "Follow @only_learn0" and below it a blue text link "Baca catatan lain".
```

---

## Prompt 3 — Sheet sumber (setelah nomor footnote diketuk)

**Tujuan layar:** pembaca bisa memeriksa sumber tanpa meninggalkan artikel.

```
On the article screen, show the state after the reader taps footnote marker 1. The article is dimmed with a 40% ink overlay, and a white bottom sheet slides up with 16px top corners and a small grab handle. The highlighted claim with marker 1 stays visible above the sheet, so the reader sees which sentence this source belongs to.

Sheet content, left aligned:
- Muted small text: "Sumber 1 dari 4"
- Source title in the title style: "Weekends and Subjective Well-Being"
- Muted line: "Helliwell & Wang, 2014. Social Indicators Research"
- Evidence meter with 3 of 4 segments filled and the label "Bukti sedang", then one muted helper line: "Studi besar dengan data survei harian. Menunjukkan pola, belum tentu sebab-akibat."
- Small label "Yang didukung sumber ini" followed by the sentence: "Suasana hati orang cenderung lebih baik di akhir pekan dibanding hari kerja."
- A full-width primary blue button "Buka sumber asli", with muted text "Dicek 25 Okt 2026" centered below it.
```

---

## Prompt 4 — Halaman topik

**Tujuan layar:** pembaca yang penasaran bisa menelusuri catatan lain di topik yang sama.

```
Design the mobile topic screen for the topic "Uang", in the same style. Top bar: back chevron with "Beranda" on the left, "Follow" on the right.

Header, left aligned: headline "Uang", and one muted line "Catatan riset soal kebiasaan dan psikologi uang anak muda."
A row of three pill chips: "Uang" is active (ink background, white text), "Karier" and "Psikologi sehari-hari" are inactive (light grey surface, ink text).
On the right above the list, a small blue text button "Terbaru" with a chevron-down icon for sorting.

A list of 4 rows separated by 1px divider lines, same row design as the home screen (48x64 thumbnail, hook as bold title, muted meta line with date and source count as separate items):
"Unpopular opinion: pria paling aman itu yang keliatan bokek." / "24 Okt 2026" / "3 sumber"
"Faktanya, rezekimu bisa ketahan sama 4 beban dari masa lalu." / "16 Okt 2026" / "5 sumber"
"Gaji naik, kok tabungan nggak ikut naik?" / "10 Okt 2026" / "4 sumber"
"Kenapa diskon bikin kita belanja lebih banyak?" / "3 Okt 2026" / "3 sumber"

No cards, no shadows, no yellow on this screen.
```

---

## Prompt 5 — Cara aku riset

**Tujuan layar:** halaman legitimasi. Menjelaskan proses riset, arti label bukti, dan catatan koreksi. Halaman ini yang akan dibaca brand atau sponsor.

```
Design the mobile page "Cara aku riset" for Only Learn, in the same style. Top bar: back chevron with "Beranda", "Follow" on the right.

Headline: "Cara aku riset"
Intro paragraph in Literata serif: "Setiap reel di @only_learn0 berangkat dari pertanyaan sehari-hari. Halaman ini menjelaskan dari mana jawabannya datang, dan seberapa kuat buktinya."

Section "Empat langkah": a numbered sequence 1 to 4. Each step has a bold short title and one muted sentence:
1. "Mulai dari pertanyaan" / "Biasanya dari komentar dan DM yang paling sering muncul."
2. "Cari sumber primer" / "Jurnal, laporan survei, dan aturan resmi. Bukan artikel yang mengutip ulang."
3. "Beri label bukti" / "Setiap klaim dapat label seberapa kuat buktinya."
4. "Cek ulang dan catat tanggalnya" / "Kalau ada yang keliru, aku perbaiki dan catat di halaman ini."

Section "Arti label bukti": five rows separated by divider lines. Rows 1 to 4 each show an evidence meter (4 small pill segments, filled blue, empty light grey), a bold label, and one muted explanation:
"Bukti kuat" (4 of 4) / "Gabungan banyak studi, seperti meta-analisis."
"Bukti sedang" (3 of 4) / "Satu studi yang sudah ditinjau peneliti lain."
"Data survei" (2 of 4) / "Survei atau laporan lembaga. Menunjukkan pola, bukan sebab-akibat."
"Masih dugaan" (1 of 4) / "Hipotesis atau pendapat ahli yang belum banyak diuji."
Row 5 shows a small outlined pill tag "Aturan resmi" instead of a meter, with the explanation "Undang-undang atau peraturan pemerintah, misalnya PP 35/2021."

Section "Catatan koreksi": one correction note block with a light red surface, 8px corners and red text. First line is the date "21 Okt 2026", second line: "Angka survei di catatan Sunday scaries diganti dengan angka dari laporan aslinya."

End: muted line "Nemu yang keliru?" and a full-width secondary button "Kirim koreksi lewat DM".

Do not use yellow on this page.
```

---

## Prompt 6 — Artikel desktop dengan sidenote

**Tujuan layar:** versi desktop untuk brand dan sponsor yang membuka dari laptop. Sumber muncul di margin kanan, seperti catatan pinggir di buku.

```
Create a desktop version (1440px wide) of the Only Learn article screen, keeping the same style and content. Layout: a centered 1080px container with a 680px article column on the left and a 240px sidenote column on the right, with a 160px gap between them.

On desktop, footnote markers don't open a sheet. Each source appears as a sidenote in the right column, aligned with the line of its highlighted claim: the footnote number in a pale blue circle, the short source name and year ("Helliwell & Wang, 2014"), an evidence meter with its label, and a small blue link "Buka sumber". Sidenotes use small Plus Jakarta Sans text in muted ink.

The top bar spans the full width: the wordmark "only learn" on the left; text links "Uang", "Karier", "Psikologi sehari-hari" and "Cara aku riset" in the middle; a primary blue button "Follow" on the right.

The reel embed sits inside the article column at 360px wide, left aligned. All other sections stay as on mobile, left aligned in the 680px column.
```

---

## Prompt perbaikan (satu perubahan per prompt)

Pakai yang relevan saja, kalau hasil Stitch meleset.

| Masalah | Prompt |
|---|---|
| Stabilo terlihat seperti kotak | `Make the yellow highlight look like a marker stroke: cover only the lower 70% of the text line height, with 2px overhang on each side. Keep the text color ink.` |
| Kuning muncul di luar klaim | `Remove the yellow color from [nama elemen]. Yellow is only for highlighted research claims in article text.` |
| List jadi kartu berbayang | `Remove the cards and shadows from the list. Separate rows with 1px #DCE1E7 divider lines only.` |
| Ada label huruf kapital | `Change every label and section title to sentence case. No uppercase text anywhere.` |
| Muncul ilustrasi atau ikon hiasan | `Remove the illustrations and decorative icons. Keep only the small document icon next to source counts.` |
| Font paragraf salah | `Use Literata serif at 18px with 1.7 line height for article paragraphs only. Keep Plus Jakarta Sans for everything else.` |
| Meta digabung dengan titik tengah | `In the meta line, show the date, source count and reading time as separate spaced items, without dots between them.` |
| Teks UI keluar dari Bahasa Indonesia | `Change all product copy and button text to Bahasa Indonesia, using the exact text from my previous prompt.` |
| Thumbnail salah rasio | `Make the reel thumbnails 48 by 64 pixel vertical video frames with 4px corners.` |

---

## Checklist review hasil Stitch

- [ ] Kuning **hanya** muncul di klaim riset dalam teks artikel.
- [ ] Setiap stabilo punya nomor footnote, dan nomornya cocok dengan daftar "Sumber".
- [ ] Jumlah sumber tampil di setiap baris list.
- [ ] Tanggal "Dicek" ada di setiap artikel dan di setiap sumber.
- [ ] Meteran bukti selalu disertai label teks, tidak hanya warna.
- [ ] Tidak ada gradient, ilustrasi stok, emoji, label huruf kapital, atau kartu berbayang.
- [ ] Teks rata kiri dan tetap terbaca di lebar 360px.
- [ ] Tombol memakai kata kerja yang jelas: "Buka sumber asli", "Follow @only_learn0".
- [ ] Semua teks UI dalam Bahasa Indonesia, sesuai teks di prompt.
- [ ] Merah hanya dipakai untuk catatan koreksi.

---

## Riwayat versi

| Versi | Tanggal | Perubahan |
|---|---|---|
| 1.0 | 25 Okt 2026 | Versi awal: 6 layar (5 mobile, 1 desktop), prompt perbaikan, checklist |
