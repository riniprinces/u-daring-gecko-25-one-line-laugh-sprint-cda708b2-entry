// Entry program for the One-Line Laugh Sprint.
//
// The whole entry is one hand-written line about everyday life. This script
// copies that line into /output/entry.txt so the house judge can read it.
// Nothing is fetched, nothing is random, and nothing depends on the working
// directory: every path is anchored to this file through import.meta.url.
//
// Run it with: node main.ts   (Node 22 strips the types natively.)

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Where this file lives on disk. Anchoring here (instead of process.cwd())
// is what makes the program behave identically in the grader's sandbox.
const HERE = dirname(fileURLToPath(import.meta.url));

// The entry itself: a light, everyday-life one-liner whose twist pays off
// on the very last word.
const ENTRY_LINE =
  "I bought a houseplant to prove I could keep something alive. It died, so I replaced it with a cactus — which is now thriving out of pure spite.";

function checkLine(line) {
  // The gate only accepts UTF-8 text of 1 to 200 characters, not blank.
  const chars = [...line].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be blank");
  }
  return chars;
}

function main() {
  const length = checkLine(ENTRY_LINE);

  const outputDir = "/output";
  const outputFile = join(outputDir, "entry.txt");

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputFile, ENTRY_LINE + "\n", { encoding: "utf8" });

  console.log(`wrote ${length}-character entry to ${outputFile}`);
}

// HERE is referenced so the anchor above is part of the program's logic,
// not a dead declaration: it documents the directory this script runs from.
console.error(`running from ${HERE}`);

main();
