// Renders about.html from data/about.js.

import { about } from "../data/about.js";
import { initShared, staggerReveal } from "./main.js";

function renderLede() {
  const slot = document.getElementById("about-lede");
  if (slot) slot.textContent = about.lede;
}

// Each chapter is its own band, so the mono label sits in the sticky rail
// beside its prose — the same structure the main page uses.
function renderChapters() {
  const mount = document.getElementById("chapters");
  if (!mount) return;

  about.chapters.forEach((chapter, i) => {
    const section = document.createElement("section");
    section.className = "band chapter";
    section.innerHTML = `
      <div class="shell band-grid">
        <div class="rail mono">
          <p class="rail-label"><span class="idx">${String(i + 1).padStart(2, "0")}</span><span>${chapter.label}</span></p>
        </div>
        <div class="band-body">
          <div class="chapter-body reveal">
            ${chapter.body.map((p) => `<p>${p}</p>`).join("")}
          </div>
        </div>
      </div>
    `;
    mount.appendChild(section);
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

  about.capabilities.forEach((cap) => {
    const row = document.createElement("article");
    row.className = "row";
    row.innerHTML = `
      <p class="row-when mono">${cap.group}</p>
      <div class="row-body"><p class="cap-items">${cap.items}</p></div>
    `;
    mount.appendChild(row);
  });

  staggerReveal(mount, 55, 6);
}

renderLede();
renderChapters();
renderOperating();
renderCapabilities();
initShared();
