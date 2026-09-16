// Wires about.html to data/about.js. Same arrangement as render-home.js:
// the markup lives in js/templates.js so tools/prerender.mjs can write it
// into the page, and this script fills only what the prerender left empty.

import { about } from "../data/about.js";
import { config } from "../data/config.js";
import {
  chaptersHtml,
  chapterNavHtml,
  statsHtml,
  operatingHtml,
  capabilitiesHtml,
} from "./templates.js";
import { initShared, staggerReveal } from "./main.js";

function hydrate(id, html) {
  const mount = document.getElementById(id);
  if (!mount) return null;
  if (!mount.children.length) mount.innerHTML = html;
  return mount;
}

const lede = document.getElementById("about-lede");
if (lede && !lede.textContent.trim()) lede.textContent = about.lede;

hydrate("chapters", chaptersHtml(about.chapters));
hydrate("chapter-nav", chapterNavHtml(about.chapters));
hydrate("stats", statsHtml(about.stats));

const operating = hydrate("operating-list", operatingHtml(about.operating));
if (operating) staggerReveal(operating, 60, 4);

const capabilities = hydrate("capability-list", capabilitiesHtml(about.capabilities));
if (capabilities) staggerReveal(capabilities, 40, 8);

initShared({ analytics: config.analytics });
