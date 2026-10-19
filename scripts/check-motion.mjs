// Fails the build when a transition or animation in app/globals.css uses a speed or curve that is
// not one of the motion tokens (DESIGN.md, "Motion system", 2026-10-19). Speeds come from
// --t-quick / --t-base / --t-slow / --t-step, the curve is --feed. `linear` is allowed for things
// that keep a constant pace (the seal's turn, the walk on the map, the beliefs timer bar), and a
// bare 0s or `none` is always fine. Run on every build via "prebuild".
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8")
  .replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, " "));   // drop comments, keep line numbers

/** Loop periods, not motion speeds: each is a deliberate exception, named here so it stays visible. */
const ALLOWED = [/seal-turn 60s linear infinite/];

const bad = [];
css.split("\n").forEach((line, i) => {
  for (const [decl] of line.matchAll(/(?:transition|animation)(?:-[a-z-]+)?\s*:[^;}]*/g)) {
    if (ALLOWED.some((re) => re.test(decl))) continue;
    const literal = decl.match(/(?<![\w-])(?!0m?s\b)\d*\.?\d+m?s\b/);
    const curve = decl.match(/\bease(?:-in|-out|-in-out)?\b|cubic-bezier\(|steps\(|--press/);
    if (literal || curve) bad.push(`  app/globals.css:${i + 1}  ${decl.trim()}  (${literal ? `raw speed ${literal[0]}` : `curve ${curve[0]}`})`);
  }
});

if (bad.length) {
  console.error(`Motion check failed: use the --t-* tokens and --feed (see DESIGN.md, Motion system).\n${bad.join("\n")}`);
  process.exit(1);
}
console.log("Motion check: every transition and animation uses the tokens.");
