// Fails the build when a padding, margin or gap in app/globals.css (or an inline style in a page or
// component) is off the 4px grid (DESIGN.md, Layout: "Spacing is on a 4px base", 2026-10-21).
// Every value of 4px or more must be a multiple of 4. Left alone on purpose: values under 4px (the
// hairline and border-width nudges), negative margins (they cancel a border or a tap target's
// extra height, so they follow that geometry, not the scale), and anything inside calc().
// Run on every build via "prebuild".
import { readFileSync, readdirSync } from "node:fs";

const root = new URL("../", import.meta.url);
const bad = [];
const offGrid = (v) => v >= 4 && v % 4 !== 0;

const css = readFileSync(new URL("app/globals.css", root), "utf8")
  .replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, " "));   // drop comments, keep line numbers
css.split("\n").forEach((line, i) => {
  for (const [decl, , value] of line.matchAll(/(?<![\w-])((?:padding|margin|gap|row-gap|column-gap)(?:-[a-z]+)?)\s*:([^;}]*)/g)) {
    const outsideCalc = value.replace(/calc\((?:[^()]|\([^()]*\))*\)/g, "");
    for (const [, px] of outsideCalc.matchAll(/(?<![\w.-])(\d*\.?\d+)px/g)) {
      if (offGrid(Number(px))) bad.push(`  app/globals.css:${i + 1}  ${decl.trim()}  (${px}px)`);
    }
  }
});

const tsx = (dir) => readdirSync(new URL(dir, root), { recursive: true })
  .filter((f) => f.endsWith(".tsx")).map((f) => `${dir}${f}`);
for (const file of [...tsx("app/"), ...tsx("components/")]) {
  readFileSync(new URL(file, root), "utf8").split("\n").forEach((line, i) => {
    for (const [decl, , n] of line.matchAll(/\b(gap|rowGap|columnGap|padding\w*|margin\w*)\s*:\s*(\d*\.?\d+)\b/g)) {
      if (offGrid(Number(n))) bad.push(`  ${file}:${i + 1}  ${decl}`);
    }
  });
}

if (bad.length) {
  console.error(`Spacing check failed: padding, margin and gap sit on the 4px grid (see DESIGN.md, Layout).\n${bad.join("\n")}`);
  process.exit(1);
}
console.log("Spacing check: every padding, margin and gap is on the 4px grid.");
