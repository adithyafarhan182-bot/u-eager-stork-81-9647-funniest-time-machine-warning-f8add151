// Funniest Time Machine Warning Label — make.fun entry.
// Writes one 78-character warning label to /output/entry.txt.
// The label: deadpan safety notice, duplicate-self paradox, punch in the last words.
// Node 22 stdlib only, deterministic, no network.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LABEL =
  "WARNING: Never argue with your past self. You already lost - yesterday, twice.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUT = join(outDir, "entry.txt");
const MAX_CHARS = 120;

// The gate: 1 to 120 characters, not only white space. Fail loudly here
// rather than shipping an entry the scorer would refuse.
const chars = [...LABEL].length;
if (chars < 1 || chars > MAX_CHARS || LABEL.trim().length === 0) {
  console.error(`entry must be 1-${MAX_CHARS} chars, got ${chars}`);
  process.exit(1);
}
if (LABEL.includes("\n")) {
  console.error("entry must be a single non-blank line");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(OUT, LABEL, "utf8");
console.log(`wrote ${chars} chars to ${OUT}`);
