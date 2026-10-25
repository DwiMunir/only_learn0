/**
 * npm run schema
 * Ekspor kontrak research-note ke JSON Schema, untuk divalidasi di sisi Morena.
 */
import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import { researchNoteSchema } from "../src/lib/schema";
import { color } from "./_util";

const schema = z.toJSONSchema(researchNoteSchema, { io: "input" });
const out = path.join(process.cwd(), "schemas", "research-note.schema.json");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(
  out,
  `${JSON.stringify({ title: "Only Learn research note", ...schema }, null, 2)}\n`,
);
console.log(`${color.green("✓")} ${path.relative(process.cwd(), out)}`);
