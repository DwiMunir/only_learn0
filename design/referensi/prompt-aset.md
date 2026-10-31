# Prompt aset ilustrasi

Dibuat sekali dengan Cloudflare Workers AI, model `@cf/black-forest-labs/flux-2-dev` (multipart form: `prompt`, `width`, `height`; tanpa seed tetap). Hasil di-encode ulang dengan `ffmpeg -q:v 5` jadi JPEG. Tidak ada skrip generator yang di-commit; panggil endpoint `POST /accounts/<id>/ai/run/@cf/black-forest-labs/flux-2-dev` dengan token sendiri.

## `public/ilustrasi/hero.jpg` (1280x960)

```
A soft 3D clay-style pastel illustration of an open laptop, a stack of two books, a glowing light bulb with small rays, a curved blue arrow, a potted green plant and a coffee mug, on a soft lavender-to-sky-blue background, gentle studio lighting, no text, no letters, no logos.
```

## `public/ilustrasi/langganan.jpg` (1024x640)

```
A calm night landscape with layered purple-blue mountains, pine trees silhouettes and a soft glowing horizon, deep navy sky, flat illustration, no text.
```

Tepi gambar dilebur ke latar dengan CSS `mask-image` di komponen.
