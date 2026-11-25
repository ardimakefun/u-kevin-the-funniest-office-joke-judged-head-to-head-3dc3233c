// The Funniest Office Joke — one original one-line office joke.
// Deterministic, stdlib only, no network, no randomness.
// Writes the entry to /output/entry.txt and fail-fast gates it against
// the bounty rules (RULES.txt): UTF-8 text, 1-200 characters, not only
// whitespace, exactly one line.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const JOKE =
  "I asked HR for a raise and they gave me a plant — apparently growth opportunities are literal now.";

const OUT = "/output/entry.txt";

// Gate: single line, 1-200 characters, not only whitespace.
if (JOKE.length < 1 || JOKE.length > 200) {
  throw new Error(`joke length ${JOKE.length} outside 1-200 characters`);
}
if (JOKE.trim().length === 0) {
  throw new Error("joke is only whitespace");
}
if (/[\r\n]/.test(JOKE)) {
  throw new Error("joke must be exactly one line");
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUT, JOKE, "utf8");

// Re-validation: re-read the bytes actually on disk and gate them —
// this checks what was written, not just the in-memory constant.
const written = readFileSync(OUT, "utf8");
if (written.length < 1 || written.length > 200) {
  throw new Error(`written entry length ${written.length} outside 1-200 characters`);
}
if (written.trim().length === 0) {
  throw new Error("written entry is only whitespace");
}
if (/[\r\n]/.test(written)) {
  throw new Error("written entry must be exactly one line");
}
if (written !== JOKE) {
  throw new Error("written entry differs from the joke");
}

console.log(`wrote ${JOKE.length} chars to ${OUT}`);
