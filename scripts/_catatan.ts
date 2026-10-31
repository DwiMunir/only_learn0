import type { ResearchNote } from "../src/lib/schema";

type Lama = { publishedAt: string; corrections: { date: string; text: string }[] };

/**
 * Ubah research note jadi frontmatter + body catatan. Murni, tanpa baca/tulis file.
 * Kalau `lama` ada (--timpa), tanggal terbit dan riwayat koreksi dipertahankan.
 */
export function catatanDariNote(
  note: ResearchNote,
  o: { hariIni: string; waktu?: string; terbit: boolean; lama?: Lama; koreksi?: string },
): { frontmatter: Record<string, unknown>; body: string; apaKataRisetDitambah: boolean } {
  let body = note.body.trim();
  let apaKataRisetDitambah = false;
  if (note.claims.length > 0 && !/<ApaKataRiset\s*\/>/.test(body)) {
    body += "\n\n<ApaKataRiset />";
    apaKataRisetDitambah = true;
  }

  const corrections = [...(o.lama?.corrections ?? [])];
  if (o.koreksi) corrections.push({ date: o.hariIni, text: o.koreksi });

  const frontmatter = {
    title: note.hook,
    description: note.description,
    topic: note.topic,
    publishedAt: o.lama?.publishedAt ?? o.waktu ?? o.hariIni,
    checkedAt: note.checkedAt ?? o.hariIni,
    draft: !o.terbit,
    ...(note.thumbnail ? { thumbnail: note.thumbnail } : {}),
    ...(note.reel ? { reel: note.reel } : {}),
    summary: note.summary,
    sources: note.sources,
    claims: note.claims,
    ...(corrections.length > 0 ? { corrections } : {}),
  };
  return { frontmatter, body, apaKataRisetDitambah };
}
