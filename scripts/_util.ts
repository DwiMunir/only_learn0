import path from "node:path";
import YAML from "yaml";
import type { FileReport } from "../src/lib/content";

const c = {
  red: (s: string) => `\x1b[31m${s}\x1b[0m`,
  yellow: (s: string) => `\x1b[33m${s}\x1b[0m`,
  green: (s: string) => `\x1b[32m${s}\x1b[0m`,
  dim: (s: string) => `\x1b[2m${s}\x1b[0m`,
  bold: (s: string) => `\x1b[1m${s}\x1b[0m`,
};
export const color = c;

/** Cetak laporan validasi. Return jumlah error. */
export function printReports(reports: FileReport[]): number {
  let errors = 0;
  let warnings = 0;
  for (const r of reports) {
    const rel = path.relative(process.cwd(), r.file);
    if (r.findings.length === 0) {
      console.log(`${c.green("✓")} ${rel}`);
      continue;
    }
    console.log(`${r.findings.some((f) => f.level === "error") ? c.red("✗") : c.yellow("!")} ${c.bold(rel)}`);
    for (const f of r.findings) {
      if (f.level === "error") errors++;
      else warnings++;
      const tag = f.level === "error" ? c.red("  error  ") : c.yellow("  warning");
      console.log(`${tag} ${f.message.replace(/\n/g, "\n           ")}`);
    }
  }
  console.log(
    `\n${reports.length} catatan dicek: ${errors > 0 ? c.red(`${errors} error`) : "0 error"}, ${
      warnings > 0 ? c.yellow(`${warnings} warning`) : "0 warning"
    }`,
  );
  return errors;
}

/** Tulis ulang file MDX dari frontmatter + body, tanpa melipat baris panjang. */
export function toMdx(data: Record<string, unknown>, body: string): string {
  const yaml = YAML.stringify(normalizeDates(data), { lineWidth: 0 });
  return `---\n${yaml}---\n\n${body.trim()}\n`;
}

/** gray-matter mengubah tanggal jadi Date. Kembalikan ke YYYY-MM-DD sebelum ditulis. */
function normalizeDates(value: unknown): unknown {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (Array.isArray(value)) return value.map(normalizeDates);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, normalizeDates(v)]));
  }
  return value;
}

export function fail(message: string): never {
  console.error(c.red(`✗ ${message}`));
  process.exit(1);
}
