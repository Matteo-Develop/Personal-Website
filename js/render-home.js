// Wires index.html's repeating sections to /data.
//
// The markup itself lives in js/templates.js, because tools/prerender.mjs
// writes the same strings into index.html before it ships. So this script
// only fills a mount that is empty — on a prerendered page every mount
// already has children and these functions do nothing but attach behaviour.
// Edit a data file, run `node tools/prerender.mjs`, and both paths update
// together.

import { experience } from "../data/experience.js";
import { projects } from "../data/projects.js";
import { skills } from "../data/skills.js";
import { involvement } from "../data/involvement.js";
import { config } from "../data/config.js";
import { experienceHtml, projectsHtml, skillsHtml, involvementHtml } from "./templates.js";
import { initDcf } from "./dcf.js";
import { initShared, staggerReveal } from "./main.js";

// Returns the mount, having filled it only if it was empty.
function hydrate(id, html) {
  const mount = document.getElementById(id);
  if (!mount) return null;
  if (!mount.children.length) mount.innerHTML = html;
  return mount;
}

const experienceMount = hydrate("experience-list", experienceHtml(experience));
if (experienceMount) staggerReveal(experienceMount, 60, 4);

const projectsMount = hydrate("projects-list", projectsHtml(projects));
if (projectsMount) {
  projectsMount.querySelectorAll(".project").forEach((item) => initDcf(item));
  staggerReveal(projectsMount, 60, 4);
}

const skillsMount = hydrate("skills-list", skillsHtml(skills));
if (skillsMount) staggerReveal(skillsMount, 45, 8);

const involvementMount = hydrate("involvement-list", involvementHtml(involvement));
if (involvementMount) staggerReveal(involvementMount, 45, 8);

// Hero and contact links are hardcoded in index.html so they still work if
// this script fails to load. data/config.js documents what they should be —
// keep the two in sync by hand.

initShared({ analytics: config.analytics });
