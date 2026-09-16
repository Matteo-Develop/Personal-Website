// Renders about.html from data/about.js.

import { about } from "../data/about.js";
import { config } from "../data/config.js";
import { initShared, staggerReveal } from "./main.js";

function renderLede() {
  const slot = document.getElementById("about-lede");
  if (slot) slot.textContent = about.lede;
}

// One sticky navigator for the whole narrative, plus the chapters
// themselves. Clicking a chapter jumps to it; scrolling highlights it.
function renderChapters() {
  const mount = document.getElementById("chapters");
  const nav = document.getElementById("chapter-nav");
  if (!mount || !nav) return;

  about.chapters.forEach((chapter, i) => {
    const n = String(i + 1).padStart(2, "0");
    const id = "ch-" + n;

    const section = document.createElement("article");
    section.className = "chapter";
    section.id = id;
    section.innerHTML = `
      <h2 class="chapter-head">
        <span class="idx mono">${n}</span>
        <span class="chapter-title">${chapter.label}</span>
      </h2>
      <div class="chapter-body reveal">
        ${chapter.body.map((para) => `<p>${para}</p>`).join("")}
      </div>
    `;
    mount.appendChild(section);

    const li = document.createElement("li");
    li.innerHTML = `<a class="chapter-link mono" href="#${id}" data-chapter="${id}">
      <span class="dot" aria-hidden="true"></span><span class="idx">${n}</span><span>${chapter.label}</span>
    </a>`;
    nav.appendChild(li);
  });
}

// Counts the headline figures up as they come into view.
function renderStats() {
  const mount = document.getElementById("stats");
  if (!mount) return;

  about.stats.forEach((stat) => {
    const item = document.createElement("div");
    item.className = "stat";
    item.innerHTML = `
      <dt class="stat-value" data-value="${stat.value}" data-prefix="${stat.prefix || ""}" data-suffix="${stat.suffix || ""}">${stat.prefix || ""}0${stat.suffix || ""}</dt>
      <dd class="stat-label mono">${stat.label}</dd>
    `;
    mount.appendChild(item);
  });
}

function renderOperating() {
  const mount = document.getElementById("operating-list");
  if (!mount) return;

  about.operating.forEach((item) => {
    const row = document.createElement("article");
    row.className = "row";
    row.innerHTML = `
      <p class="row-when mono">${item.dates}</p>
      <div class="row-body">
        <h3 class="row-role">${item.org}</h3>
        <p class="row-org">${item.role}</p>
        <p class="row-summary">${item.note}</p>
        <ul class="row-notes">${item.metrics.map((m) => `<li>${m}</li>`).join("")}</ul>
      </div>
    `;
    mount.appendChild(row);
  });

  staggerReveal(mount, 60, 4);
}

function renderCapabilities() {
  const mount = document.getElementById("capability-list");
  if (!mount) return;

  // Ten groups rendered as full rows ran to 1403px for 124 words, the worst
  // density on either page. Each group is now a disclosure showing how many
  // terms sit inside it, so the shape of the list is readable at a glance
  // and the terms themselves are one click away.
  about.capabilities.forEach((cap) => {
    const count = cap.items.split("\u00b7").length;
    const group = document.createElement("details");
    group.className = "cap-group reveal";
    group.innerHTML = `
      <summary class="mono">
        <span class="plus" aria-hidden="true"></span>${cap.group}
        <span class="cap-count">${count}</span>
      </summary>
      <p class="cap-items">${cap.items}</p>
    `;
    mount.appendChild(group);
  });

  staggerReveal(mount, 40, 8);
}

renderLede();
renderChapters();
renderStats();
renderOperating();
renderCapabilities();
initShared({ analytics: config.analytics });
