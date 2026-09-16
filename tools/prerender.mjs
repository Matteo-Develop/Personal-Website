// Writes the site's content into the HTML files, so the page carries its own
// experience, work and narrative before any JavaScript runs.
//
// Why this exists: every repeating section used to be injected by the render
// scripts at runtime, which meant a reader whose browser could not run them —
// a locked-down corporate machine, an aggressive content blocker, a proxy
// that mangles module scripts — got a hero, an About paragraph, and five
// empty headings. On a site whose whole job is showing a finance record to
// people at banks, that failure mode is not acceptable.
//
// The markup comes from js/templates.js, the same module the browser imports,
// so there is one copy of it rather than two that drift.
//
//   node tools/prerender.mjs        after editing anything in /data
//
// It is idempotent: it replaces whatever is between each mount's tags, so
// running it twice does nothing the first run did not already do.

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const { experience } = await import(`${root}/data/experience.js`);
const { projects } = await import(`${root}/data/projects.js`);
const { skills } = await import(`${root}/data/skills.js`);
const { involvement } = await import(`${root}/data/involvement.js`);
const { about } = await import(`${root}/data/about.js`);
const t = await import(`${root}/js/templates.js`);

// Replaces the inner HTML of the element carrying id="<id>", matching the
// opening tag by id and walking to its matching close. The mounts are all
// simple containers, so a non-greedy match to the next close of the same tag
// name is exact here.
function fill(html, id, contents) {
  const open = new RegExp(`(<(\\w+)[^>]*\\bid="${id}"[^>]*>)`, "i");
  const m = html.match(open);
  if (!m) throw new Error(`prerender: no element with id="${id}"`);
  const tag = m[2];
  const start = m.index + m[1].length;
  const close = `</${tag}>`;
  const end = html.indexOf(close, start);
  if (end === -1) throw new Error(`prerender: unclosed <${tag} id="${id}">`);
  return html.slice(0, start) + contents + "\n        " + html.slice(end);
}

const escape = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

let home = await readFile(`${root}/index.html`, "utf8");
home = fill(home, "experience-list", t.experienceHtml(experience));
home = fill(home, "projects-list", t.projectsHtml(projects));
home = fill(home, "skills-list", t.skillsHtml(skills));
home = fill(home, "involvement-list", t.involvementHtml(involvement));
await writeFile(`${root}/index.html`, home);

let story = await readFile(`${root}/about.html`, "utf8");
story = fill(story, "about-lede", escape(about.lede));
story = fill(story, "chapters", t.chaptersHtml(about.chapters));
story = fill(story, "chapter-nav", t.chapterNavHtml(about.chapters));
story = fill(story, "stats", t.statsHtml(about.stats));
story = fill(story, "operating-list", t.operatingHtml(about.operating));
story = fill(story, "capability-list", t.capabilitiesHtml(about.capabilities));
await writeFile(`${root}/about.html`, story);

console.log(
  `prerendered: ${experience.length} roles, ${projects.length} write-ups, ` +
    `${skills.length} certifications, ${involvement.length} involvement rows, ` +
    `${about.chapters.length} chapters, ${about.operating.length} operating roles, ` +
    `${about.capabilities.length} capability groups`
);
