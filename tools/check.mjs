// The checks that would have caught the two bugs this site has shipped.
//
//   node tools/check.mjs
//
// Run it before committing. It needs no browser and no network: everything
// here is answered by parsing the HTML that will actually be served, which
// is the point — the previous test suite drove a browser and still missed a
// corrupted page, because it counted elements and every element existed.
//
// 1. NESTING. tools/prerender.mjs once spliced content at the wrong boundary
//    and </div> ended up closing <section>. Counting rows passed throughout.
//    Parsing does not.
// 2. IDEMPOTENCY. The same bug only appeared on the second prerender run.
//    If running it again changes the file, something is wrong.
// 3. FRESHNESS. /data is the source of truth but the HTML is what ships.
//    Edit a data file, forget to prerender, and the site is quietly a
//    version behind for every reader without JavaScript.

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { execFileSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const PAGES = ["index.html", "about.html"];
const VOID = new Set(["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"]);

let failures = 0;
const ok = (m) => console.log(`  pass  ${m}`);
const bad = (m) => { failures++; console.log(`  FAIL  ${m}`); };

// --- 1. nesting -------------------------------------------------------------
function nesting(html) {
  const stack = [];
  const errors = [];
  const tag = /<(\/?)([a-zA-Z][\w-]*)\b[^>]*?(\/?)>|<!--[\s\S]*?-->/g;
  for (let m; (m = tag.exec(html)); ) {
    if (m[0].startsWith("<!--")) continue;
    const [, close, name, selfClose] = m;
    const t = name.toLowerCase();
    if (VOID.has(t) || selfClose === "/") continue;
    if (!close) stack.push(t);
    else if (stack[stack.length - 1] === t) stack.pop();
    else {
      errors.push(`</${t}> closes <${stack[stack.length - 1] ?? "nothing"}>`);
      if (stack.includes(t)) while (stack.length && stack.pop() !== t);
    }
  }
  return { errors, unclosed: stack };
}

console.log("nesting");
for (const f of PAGES) {
  const { errors, unclosed } = nesting(await readFile(join(root, f), "utf8"));
  if (errors.length || unclosed.length)
    bad(`${f}: ${errors.length} mismatches${unclosed.length ? `, unclosed: ${unclosed.join(",")}` : ""}${errors[0] ? ` (first: ${errors[0]})` : ""}`);
  else ok(`${f}: well formed`);
}

// --- 2 & 3. prerender is idempotent and up to date --------------------------
console.log("\nprerender");
const before = await Promise.all(PAGES.map((f) => readFile(join(root, f), "utf8")));
execFileSync("node", [join(root, "tools/prerender.mjs")], { stdio: "pipe" });
const after = await Promise.all(PAGES.map((f) => readFile(join(root, f), "utf8")));
PAGES.forEach((f, i) => {
  if (before[i] === after[i]) ok(`${f}: up to date and idempotent`);
  else bad(`${f}: changed when prerendered — the committed HTML is behind /data, or fill() is not idempotent. It has been rewritten; review the diff and commit it.`);
});

// --- 4. the content is actually in the HTML ---------------------------------
console.log("\ncontent present without JavaScript");
const { experience } = await import(`${root}/data/experience.js`);
const { projects } = await import(`${root}/data/projects.js`);
const { skills } = await import(`${root}/data/skills.js`);
const { involvement } = await import(`${root}/data/involvement.js`);
const { about } = await import(`${root}/data/about.js`);

const home = after[0];
const story = after[1];
const count = (html, needle) => html.split(needle).length - 1;

const expectations = [
  ["index", home, '<article class="row"', experience.length, "experience roles"],
  ["index", home, '<article class="project', projects.length, "work write-ups"],
  ["index", home, '<div class="list-item"><dt', skills.length, "certifications"],
  // Featured entries get a row each; everything else is one collapsed "Also"
  // row. Both halves are asserted, so dropping a name from either is caught.
  ["index", home, '<li class="list-item">', involvement.filter((i) => i.featured).length,
    "featured involvement rows"],
  ["index", home, '<li class="list-item list-more">',
    involvement.some((i) => !i.featured) ? 1 : 0, "collapsed involvement rows"],
  ["about", story, '<article class="chapter"', about.chapters.length, "chapters"],
  ["about", story, 'class="chapter-link', about.chapters.length, "chapter nav links"],
  ["about", story, '<div class="stat">', about.stats.length, "stats"],
  ["about", story, '<article class="row"', about.operating.length, "operating roles"],
  ["about", story, '<details class="cap-group', about.capabilities.length, "capability groups"],
];
for (const [page, html, needle, want, label] of expectations) {
  const got = count(html, needle);
  got === want ? ok(`${page}: ${got} ${label}`) : bad(`${page}: ${got} ${label}, expected ${want}`);
}

// Collapsing the tail of the involvement list must not lose any of it.
// The templates interpolate the name as-is, so "M&A Society" reaches the
// page with a bare ampersand. Accept either spelling rather than assuming
// one, so this check keeps working if the templates start escaping.
const missing = involvement
  .map((item) => item.org)
  .filter((org) => !home.includes(org) && !home.includes(org.replace(/&/g, "&amp;")));
missing.length === 0
  ? ok(`index: all ${involvement.length} involvement names present`)
  : bad(`index: involvement names missing from the page: ${missing.join(", ")}`);

// --- 5. duplicate ids -------------------------------------------------------
console.log("\nunique ids");
for (const [f, html] of PAGES.map((f, i) => [f, after[i]])) {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  dupes.length ? bad(`${f}: duplicate ids ${[...new Set(dupes)].join(", ")}`) : ok(`${f}: ${ids.length} ids, all unique`);
}

// --- 6. nothing points at a third party we did not choose -------------------
console.log("\nexternal references");
const allowed = [/gc\.zgo\.at/, /static\.cloudflareinsights\.com/, /linkedin\.com/, /schema\.org/, /sitemaps\.org/, /w3\.org/, /matteo0001\.com/];
for (const [f, html] of PAGES.map((f, i) => [f, after[i]])) {
  const urls = [...html.matchAll(/https?:\/\/[^\s"'<>)]+/g)].map((m) => m[1] ?? m[0]);
  const unexpected = [...new Set(urls.filter((u) => !allowed.some((a) => a.test(u))))];
  unexpected.length ? bad(`${f}: unexpected external references: ${unexpected.join(", ")}`) : ok(`${f}: no unexpected third parties`);
}

console.log(failures ? `\n${failures} check(s) failed` : "\nall checks passed");
process.exit(failures ? 1 : 0);
