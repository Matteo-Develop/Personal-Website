// The markup for every repeating section, as pure functions of the data.
//
// These are imported by two callers that must never disagree: the browser's
// render scripts, and tools/prerender.mjs, which writes the same strings into
// the HTML files so the site has content before any JavaScript runs. Keeping
// the templates here is what makes those two the same markup rather than two
// copies that drift.
//
// Nothing here touches the DOM, so Node can import it without a browser.

import { dcfMarkup } from "./dcf.js";

const pad = (n) => String(n + 1).padStart(2, "0");

export function experienceHtml(experience) {
  return experience
    .map(
      (job) => `
      <article class="row">
        <p class="row-when mono">${job.dates}</p>
        <div class="row-body">
          <h3 class="row-role">${job.role}</h3>
          <p class="row-org">${job.org}${job.location ? ` <span class="at">&middot; ${job.location}</span>` : ""}</p>
          <p class="row-summary">${job.summary}</p>
          <details class="row-more">
            <summary class="mono"><span class="plus" aria-hidden="true"></span>${job.artifactsLabel}</summary>
            <ul class="row-notes">${job.artifacts.map((a) => `<li>${a}</li>`).join("")}</ul>
          </details>
        </div>
      </article>`
    )
    .join("");
}

// A PDF or another site opens in a new tab and carries the outbound arrow.
// Another page of this site stays in the tab and gets a plain one, because
// sending a reader off-tab to reach your own second page is a small rudeness.
function projectLink({ href, label }) {
  const external = /^https?:/i.test(href) || /\.pdf$/i.test(href);
  const attrs = external ? ' target="_blank" rel="noopener"' : "";
  const arrow = external ? "&#8599;" : "&rarr;";
  return `<p class="project-link"><a class="wipe mono" href="${href}"${attrs}>${label} <span aria-hidden="true">${arrow}</span></a></p>`;
}

export function projectsHtml(projects) {
  return projects
    .map(
      (project, i) => `
      <article class="project${project.featured ? " project--featured" : ""}">
        <div class="project-top mono">
          <span class="project-tag">${project.tag}</span>
          <span class="faint">${pad(i)}</span>
        </div>
        <h3>${project.title}</h3>
        <p class="project-note">${project.note}</p>
        ${project.featured && project.link ? projectLink(project.link) : ""}
        <details>
          <summary class="mono"><span class="plus" aria-hidden="true"></span>Detail</summary>
          <ul class="project-detail">${project.detail.map((d) => `<li>${d}</li>`).join("")}</ul>
          ${project.dcf ? dcfMarkup() : ""}
          ${project.link && !project.featured ? projectLink(project.link) : ""}
        </details>
      </article>`
    )
    .join("");
}

export function skillsHtml(skills) {
  return skills
    .map(
      (skill) =>
        `<div class="list-item"><dt class="name">${skill.name}</dt><dd class="by mono">${skill.by}</dd></div>`
    )
    .join("");
}

export function involvementHtml(involvement) {
  const featured = involvement.filter((item) => item.featured);
  const rest = involvement.filter((item) => !item.featured);

  const rows = featured
    .map(
      (item) =>
        `<li class="list-item"><span class="name">${item.org}</span><span class="by mono">${item.roles.join(" &middot; ")}</span></li>`
    )
    .join("");

  // The remainder as one wrapped line rather than one row each. Six more
  // rows reading "Member" cost 400px of scroll and told a reader nothing
  // the first five had not; as a single line they are still on the page for
  // anyone who wants them.
  const more = rest.length
    ? `<li class="list-item list-more"><span class="name mono faint">Also</span><span class="by">${rest
        .map((item) => item.org)
        .join(" &middot; ")}</span></li>`
    : "";

  return rows + more;
}

export function chaptersHtml(chapters) {
  return chapters
    .map(
      (chapter, i) => `
      <article class="chapter" id="ch-${pad(i)}">
        <h2 class="chapter-head">
          <span class="idx mono">${pad(i)}</span>
          <span class="chapter-title">${chapter.label}</span>
        </h2>
        <div class="chapter-body reveal">
          ${chapter.body.map((para) => `<p>${para}</p>`).join("")}
        </div>
      </article>`
    )
    .join("");
}

export function chapterNavHtml(chapters) {
  return chapters
    .map(
      (chapter, i) => `<li><a class="chapter-link mono" href="#ch-${pad(i)}" data-chapter="ch-${pad(i)}">
      <span class="dot" aria-hidden="true"></span><span class="idx">${pad(i)}</span><span>${chapter.label}</span>
    </a></li>`
    )
    .join("");
}

// The markup carries the real figure, not a zero placeholder.
//
// It used to render 0, on the assumption that initCounters would replace it
// before anyone looked. That put six false numbers into the shipped HTML —
// "0+ subscribers at peak", "$0K monthly revenue" — which is what a reader
// without working JavaScript saw, and what a print-to-PDF captured. A page
// that states nothing is incomplete; a page that states zero is wrong.
//
// initCounters still animates: its first frame overwrites with 0 and counts
// back up, so the motion is unchanged and only the fallback differs.
const statText = (stat) =>
  (stat.prefix || "") +
  (stat.value >= 1000 ? stat.value.toLocaleString("en-US") : String(stat.value)) +
  (stat.suffix || "");

export function statsHtml(stats) {
  return stats
    .map(
      (stat) => `
      <div class="stat">
        <dt class="stat-value" data-value="${stat.value}" data-prefix="${stat.prefix || ""}" data-suffix="${stat.suffix || ""}">${statText(stat)}</dt>
        <dd class="stat-label mono">${stat.label}</dd>
      </div>`
    )
    .join("");
}

export function operatingHtml(operating) {
  return operating
    .map(
      (item) => `
      <article class="row">
        <p class="row-when mono">${item.dates}</p>
        <div class="row-body">
          <h3 class="row-role">${item.org}</h3>
          <p class="row-org">${item.role}</p>
          <p class="row-summary">${item.note}</p>
          <ul class="row-notes">${item.metrics.map((m) => `<li>${m}</li>`).join("")}</ul>
        </div>
      </article>`
    )
    .join("");
}

export function capabilitiesHtml(capabilities) {
  // Each group is a disclosure showing how many terms sit inside it, so the
  // shape of the list is readable at a glance and the terms are one click
  // away. Ten groups as full rows ran to 1403px for 124 words.
  return capabilities
    .map(
      (cap) => `
      <details class="cap-group reveal">
        <summary class="mono">
          <span class="plus" aria-hidden="true"></span>${cap.group}
          <span class="cap-count">${cap.items.split("\u00b7").length}</span>
        </summary>
        <p class="cap-items">${cap.items}</p>
      </details>`
    )
    .join("");
}
