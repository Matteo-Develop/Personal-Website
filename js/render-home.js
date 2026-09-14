// Renders the repeating sections of index.html from /data. Add an entry to
// a data file and it shows up here — this file only changes if the shape
// of a section changes.

import { experience } from "../data/experience.js";
import { projects } from "../data/projects.js";
import { skills } from "../data/skills.js";
import { involvement } from "../data/involvement.js";
import { config } from "../data/config.js";
import { initShared, staggerReveal } from "./main.js";

const pad = (n) => String(n + 1).padStart(2, "0");

function node(tag, className, html) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (html !== undefined) el.innerHTML = html;
  return el;
}

function renderExperience() {
  const mount = document.getElementById("experience-list");
  if (!mount) return;

  experience.forEach((job) => {
    const row = node("article", "row");
    row.innerHTML = `
      <p class="row-when mono">${job.dates}</p>
      <div class="row-body">
        <h3 class="row-role">${job.role}</h3>
        <p class="row-org">${job.org}${job.location ? ` <span class="at">&middot; ${job.location}</span>` : ""}</p>
        <p class="row-summary">${job.summary}</p>
        <p class="artifact-label mono faint">${job.artifactsLabel}</p>
        <ul class="row-notes">${job.artifacts.map((a) => `<li>${a}</li>`).join("")}</ul>
      </div>
    `;
    mount.appendChild(row);
  });

  staggerReveal(mount, 60, 4);
}

function renderProjects() {
  const mount = document.getElementById("projects-list");
  if (!mount) return;

  projects.forEach((project, i) => {
    const item = node("article", "project");
    item.innerHTML = `
      <div class="project-top mono">
        <span>${project.tag}</span>
        <span class="faint">${pad(i)}</span>
      </div>
      <h3>${project.title}</h3>
      <p class="project-note">${project.note}</p>
      <details>
        <summary class="mono"><span class="plus" aria-hidden="true"></span>Detail</summary>
        <ul class="project-detail">${project.detail.map((d) => `<li>${d}</li>`).join("")}</ul>
        ${project.link ? `<p class="project-link"><a class="wipe mono" href="${project.link.href}" target="_blank" rel="noopener">${project.link.label} <span aria-hidden="true">&#8599;</span></a></p>` : ""}
      </details>
    `;
    mount.appendChild(item);
  });

  staggerReveal(mount, 60, 4);
}

function renderSkills() {
  const mount = document.getElementById("skills-list");
  if (!mount) return;

  skills.forEach((skill) => {
    const item = node("div", "list-item");
    item.innerHTML = `<dt class="name">${skill.name}</dt><dd class="by mono">${skill.by}</dd>`;
    mount.appendChild(item);
  });

  staggerReveal(mount, 45, 8);
}

function renderInvolvement() {
  const mount = document.getElementById("involvement-list");
  if (!mount) return;

  involvement.forEach((item) => {
    const li = node("li", "list-item");
    li.innerHTML = `<span class="name">${item.org}</span><span class="by mono">${item.roles.join(" &middot; ")}</span>`;
    mount.appendChild(li);
  });

  staggerReveal(mount, 45, 8);
}

// Hero and contact links are hardcoded in index.html so they still work if
// this script fails to load. data/config.js documents what they should be —
// keep the two in sync by hand.

renderExperience();
renderProjects();
renderSkills();
renderInvolvement();
initShared({ analytics: config.analytics });
