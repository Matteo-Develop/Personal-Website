// Generates assets/og.png, the card that renders whenever this link is sent
// — a LinkedIn message, an email to a recruiter, a text to an alum. That
// preview is the first impression and it happens before anyone decides
// whether to click, so it is worth having and worth being generated rather
// than hand-made: this script reads the site's own tokens, so the card
// cannot drift away from the design it represents.
//
//   node tools/og.mjs
//
// Fonts are embedded from tools/og-assets rather than fetched at render
// time, so the output is identical on any machine and does not depend on
// the network.

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

const navy = token("navy-900");
const bone = token("bone");
const muted = token("muted");
const accent = token("accent");

const b64 = async (f) =>
  (await readFile(join(root, "tools/og-assets", f))).toString("base64");
const serif = await b64("InstrumentSerif.ttf");
const mono = await b64("IBMPlexMono.ttf");

const html = `<!doctype html><meta charset="utf-8"><style>
  @font-face { font-family: "Instrument Serif"; src: url(data:font/ttf;base64,${serif}) format("truetype"); }
  @font-face { font-family: "IBM Plex Mono"; src: url(data:font/ttf;base64,${mono}) format("truetype"); }
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; background: ${navy}; color: ${bone};
    display: flex; flex-direction: column; justify-content: space-between;
    padding: 72px 80px; -webkit-font-smoothing: antialiased;
  }
  .kicker, .foot {
    font-family: "IBM Plex Mono", monospace; font-size: 19px;
    letter-spacing: 0.16em; text-transform: uppercase; color: ${muted};
  }
  h1 { font-family: "Instrument Serif", Georgia, serif; font-size: 128px; line-height: 0.95; letter-spacing: -0.02em; }
  .sub { font-family: "Instrument Serif", Georgia, serif; font-size: 44px; line-height: 1.2; color: ${bone}; opacity: 0.72; margin-top: 18px; max-width: 24ch; }
  .rule { height: 1px; background: ${accent}; width: 148px; margin: 40px 0 0; }
  .foot { display: flex; justify-content: space-between; align-items: baseline; }
  .foot .dom { color: ${accent}; }
</style>
<div class="kicker">BBA Finance &middot; UGA Terry</div>
<div>
  <h1>Matteo Salinas</h1>
  <p class="sub">Investment research, private wealth, credit and capital markets.</p>
  <div class="rule"></div>
</div>
<div class="foot">
  <span>HCA &middot; Marathon &middot; BNY &middot; ZEISS &middot; Bluegrass</span>
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
