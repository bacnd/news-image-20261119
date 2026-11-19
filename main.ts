// news-image-20261119 entry (Node 22, standard library only).
//
// The entry is a single image, entry.png, that sums up the world's news of
// Thursday 19 November 2026. This program copies that image to the output
// directory as entry.png. It reads nothing else and reaches no network, so
// every run writes exactly the same bytes.

import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The image shipped beside this file.
const source = join(dirname(fileURLToPath(import.meta.url)), "entry.png");

// The grader's output directory; MAKEFUN_OUTPUT_DIR stands in for it
// when the program runs outside the grader's container.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outDir, "entry.png");

if (!existsSync(source)) {
  throw new Error(`entry image missing: ${source}`);
}
const expected = statSync(source).size;
mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// The grader runs the program twice and both runs must write the same
// bytes; refuse to report success if the copy came out short.
const written = statSync(target).size;
if (written !== expected) {
  throw new Error(`copy incomplete: wrote ${written} of ${expected} bytes`);
}
console.log(`wrote ${target} (${written} bytes)`);
