// Generates assets/og.png, the card that renders whenever this link is sent
// — a LinkedIn message, an email to a recruiter, a text to an alum. That
// preview is the first impression and it happens before anyone decides
// whether to click, so it is worth having and worth being generated rather
// than hand-made: this script reads the site's own tokens, so the card
// cannot drift away from the design it represents.
//
//   node tools/og.mjs
//
// Fonts are embedded from the site's own assets/fonts rather than fetched
// at render time, so the output is identical on any machine, does not
// depend on the network, and uses exactly the faces the site does.

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { createRequire } from "node:module";

// require() rather than import so a globally installed Playwright resolves
// via NODE_PATH as well as a local devDependency.
const { chromium } = createRequire(import.meta.url)("playwright");

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Pull the palette out of the stylesheet so this file holds no colours of
// its own. Change a token in css/main.css and re-run; the card follows.
const css = await readFile(join(root, "css/main.css"), "utf8");
const token = (name) => {
  const m = css.match(new RegExp(`--${name}:\\s*([^;]+);`));
  if (!m) throw new Error(`og: no --${name} in css/main.css`);
  return m[1].trim();
};

const bg = token("bg");
const ink = token("ink");
const inkDim = token("ink-dim");
const muted = token("muted");
const accent = token("accent");

const b64 = async (f) =>
  (await readFile(join(root, "assets/fonts", f))).toString("base64");
const serif400 = await b64("SourceSerif4-400.woff2");
const serif600 = await b64("SourceSerif4-600.woff2");
const sans500 = await b64("IBMPlexSans-500.woff2");

const html = `<!doctype html><meta charset="utf-8"><style>
  @font-face { font-family: "Source Serif 4"; font-weight: 400; src: url(data:font/woff2;base64,${serif400}) format("woff2"); }
  @font-face { font-family: "Source Serif 4"; font-weight: 600; src: url(data:font/woff2;base64,${serif600}) format("woff2"); }
  @font-face { font-family: "IBM Plex Sans"; font-weight: 500; src: url(data:font/woff2;base64,${sans500}) format("woff2"); }
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; background: ${bg}; color: ${ink};
    display: flex; flex-direction: column; justify-content: space-between;
    padding: 72px 80px;
  }
  .kicker, .foot {
    font-family: "IBM Plex Sans", sans-serif; font-weight: 500; font-size: 24px;
    color: ${muted};
  }
  h1 { font-family: "Source Serif 4", Georgia, serif; font-weight: 600; font-size: 112px; line-height: 1; letter-spacing: -0.02em; }
  .sub { font-family: "Source Serif 4", Georgia, serif; font-weight: 400; font-size: 42px; line-height: 1.25; color: ${inkDim}; margin-top: 22px; max-width: 26ch; }
  .rule { height: 2px; background: ${accent}; width: 120px; margin: 40px 0 0; }
  .foot { display: flex; justify-content: space-between; align-items: baseline; }
  .foot .dom { color: ${accent}; }
</style>
<div class="kicker">Economics &middot; UGA Terry</div>
<div>
  <h1>Matteo Salinas</h1>
  <p class="sub">Investment research, private wealth, credit and capital markets.</p>
  <div class="rule"></div>
</div>
<div class="foot">
  <span>Bank of America &middot; BNY &middot; ZEISS &middot; HCA &middot; Marathon</span>
  <span class="dom">matteo0001.com</span>
</div>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: join(root, "assets/og.png") });
const browser2 = browser;

// The same mark as assets/favicon.svg, rasterised for the contexts that
// still want a PNG (iOS home screen, some link unfurlers).
const mark = await readFile(join(root, "assets/favicon.svg"), "utf8");
const icon = await browser2.newPage({ viewport: { width: 180, height: 180 } });
await icon.setContent(
  `<style>*{margin:0}body{width:180px;height:180px}svg{width:180px;height:180px;display:block}</style>${mark}`,
  { waitUntil: "load" }
);
await icon.screenshot({ path: join(root, "assets/apple-touch-icon.png") });
await browser2.close();

const size = (await readFile(join(root, "assets/og.png"))).length;
const isize = (await readFile(join(root, "assets/apple-touch-icon.png"))).length;
console.log(`assets/og.png written, 1200x630, ${Math.round(size / 1024)}KB`);
console.log(`assets/apple-touch-icon.png written, 180x180, ${Math.round(isize / 1024)}KB`);
