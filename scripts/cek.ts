/**
 * npm run cek
 * Validasi semua catatan (termasuk draft): format frontmatter, ID sumber, klaim, reel, poster.
 * Otomatis jalan sebelum `npm run build`, jadi catatan yang rusak tidak bisa ter-deploy.
 */
import { validateAll } from "../src/lib/content";
import { printReports } from "./_util";

const errors = printReports(validateAll());
process.exit(errors > 0 ? 1 : 0);
