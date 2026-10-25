/**
 * Level bukti. Label dan penjelasan tampil di situs (meteran bukti dan halaman "Cara aku riset").
 * Nilai kunci (strong, moderate, ...) dipakai di frontmatter dan di research-note.json.
 */
export const evidenceLevels = {
  strong: {
    label: "Bukti kuat",
    score: 4,
    explain: "Gabungan banyak studi, seperti meta-analisis.",
    useFor: "Meta-analisis dan tinjauan sistematis",
  },
  moderate: {
    label: "Bukti sedang",
    score: 3,
    explain: "Satu studi yang sudah ditinjau peneliti lain.",
    useFor: "Satu studi peer-reviewed: eksperimen, kohort, atau observasi besar",
  },
  survey: {
    label: "Data survei",
    score: 2,
    explain: "Survei atau laporan lembaga. Menunjukkan pola, bukan sebab-akibat.",
    useFor: "Survei, laporan perusahaan atau lembaga",
  },
  preliminary: {
    label: "Masih dugaan",
    score: 1,
    explain: "Hipotesis atau pendapat ahli yang belum banyak diuji.",
    useFor: "Hipotesis, opini ahli, temuan awal",
  },
  regulation: {
    label: "Aturan resmi",
    score: null,
    explain: "Undang-undang atau peraturan pemerintah, misalnya PP 35/2021.",
    useFor: "Undang-undang, PP, Permen, aturan lembaga resmi",
  },
} as const;

export type EvidenceLevel = keyof typeof evidenceLevels;
export const evidenceLevelKeys = Object.keys(evidenceLevels) as [EvidenceLevel, ...EvidenceLevel[]];

/** Level terkuat dari beberapa sumber (dipakai untuk blok "Apa kata riset"). */
export function strongestLevel(levels: EvidenceLevel[]): EvidenceLevel {
  const scored = levels.filter((l) => evidenceLevels[l].score !== null);
  if (scored.length === 0) return levels[0] ?? "preliminary";
  return scored.reduce((best, l) =>
    (evidenceLevels[l].score ?? 0) > (evidenceLevels[best].score ?? 0) ? l : best,
  );
}
