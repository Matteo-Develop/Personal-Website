// Shared page behavior. Content-agnostic — it only reacts to elements and
// classes that already exist in the markup, so both pages share it.

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const REVEALABLE = ".reveal, .row, .project, .list-item";

function initTopbar() {
  const bar = document.querySelector(".topbar");
  if (!bar) return;
  const update = () => bar.classList.toggle("is-stuck", window.scrollY > 12);
  update();
  window.addEventListener("scroll", update, { passive: true });
}

function initDrawer() {
  const toggle = document.querySelector(".menu-toggle");
  const drawer = document.getElementById("drawer");
  if (!toggle || !drawer) return;

  const close = () => {
    toggle.setAttribute("aria-expanded", "false");
    drawer.classList.remove("is-open");
  };

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    drawer.classList.toggle("is-open", !open);
  });

  drawer.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  document.addEventListener("keydown", (e) => e.key === "Escape" && close());
}

// Native smooth scrolling handles the motion; this moves focus with it so
// keyboard and screen-reader users land where sighted users do.
function initAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href").slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      history.pushState(null, "", `#${id}`);
    });
  });
}

function initReveal() {
  const items = document.querySelectorAll(REVEALABLE);
  if (!items.length) return;

  if (reduced || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );

  items.forEach((el) => io.observe(el));
}

// Staggers a group of siblings without per-item markup.
export function staggerReveal(container, step = 70, cap = 6) {
  container.querySelectorAll(REVEALABLE).forEach((el, i) => {
    el.style.setProperty("--reveal-delay", `${Math.min(i, cap) * step}ms`);
  });
}

// The hero is above the fold, so it plays on load rather than on scroll.
function initHeroEntrance() {
  const masks = document.querySelectorAll(".hero .mask");
  const rest = document.querySelectorAll(".hero .reveal");

  masks.forEach((mask, i) => {
    mask.style.setProperty("--reveal-delay", `${120 + i * 90}ms`);
  });
  rest.forEach((el, i) => {
    el.style.setProperty("--reveal-delay", `${420 + i * 110}ms`);
  });

  requestAnimationFrame(() => {
    masks.forEach((m) => m.classList.add("is-visible"));
    rest.forEach((el) => el.classList.add("is-visible"));
  });
}

// Highlights the nav link for the section you're actually in.
//
// This used to be an IntersectionObserver watching a thin band across the
// middle of the viewport, which failed in two ways: sections with no nav
// link (certifications, involvement) crossed the band and left the previous
// link lit, and Contact sits too close to the bottom of the page to ever
// reach the middle of the screen, so it never lit at all. Measuring
// directly on scroll fixes both.
function initActiveNav() {
  const links = Array.from(document.querySelectorAll('.topnav a[href^="#"]'));
  if (!links.length) return;

  const targets = links
    .map((link) => ({ link, section: document.getElementById(link.getAttribute("href").slice(1)) }))
    .filter((t) => t.section);
  if (!targets.length) return;

  let queued = false;

  const paint = () => {
    queued = false;
    const y = window.scrollY;
    const doc = document.documentElement;
    const line = y + window.innerHeight * 0.35;

    let active = null;
    targets.forEach((t) => {
      if (t.section.getBoundingClientRect().top + y <= line) active = t;
    });

    // At the end of the page the last section wins outright, since a short
    // final section can never push its top above the line.
    if (y + window.innerHeight >= doc.scrollHeight - 2) {
      active = targets[targets.length - 1];
    }

    targets.forEach((t) => t.link.classList.toggle("is-active", t === active));
  };

  const onScroll = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(paint);
  };

  paint();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  if ("ResizeObserver" in window) {
    new ResizeObserver(onScroll).observe(document.body);
  }
}

// Greets the visitor against *their* clock, not a server's.
function initGreeting() {
  const slot = document.getElementById("hero-greeting");
  if (!slot) return;

  const hour = new Date().getHours();
  const greeting =
    hour >= 5 && hour < 12
      ? "Good morning."
      : hour >= 12 && hour < 18
        ? "Good afternoon."
        : "Good evening.";

  slot.textContent = greeting;
}

// Market clocks in the footer. Each <time data-clock="..."> names its own
// IANA zone, so adding a city is a markup change, not a code change.
function initClocks() {
  const faces = document.querySelectorAll("[data-clock]");
  if (!faces.length) return;

  const formatters = new Map();
  const formatterFor = (zone) => {
    if (!formatters.has(zone)) {
      formatters.set(
        zone,
        new Intl.DateTimeFormat("en-GB", {
          timeZone: zone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    }
    return formatters.get(zone);
  };

  const tick = () => {
    const now = new Date();
    faces.forEach((face) => {
      const zone = face.dataset.clock;
      try {
        face.textContent = formatterFor(zone).format(now);
        face.setAttribute("datetime", now.toISOString());
      } catch {
        // An unknown zone shouldn't take the rest of the footer down.
        face.textContent = "--:--";
      }
    });
  };

  tick();
  setInterval(tick, 20000);
}

// Scroll-linked motion: the hero drifts up and dissolves as you leave it,
// and a hairline across the top tracks progress through the page. One
// rAF-throttled listener drives both.
function initScrollMotion() {
  const hero = document.querySelector(".hero-inner");
  const progress = document.querySelector(".scroll-progress span");
  if (reduced || (!hero && !progress)) return;

  let queued = false;

  const paint = () => {
    queued = false;
    const y = window.scrollY;

    if (progress) {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? Math.min(Math.max(y / max, 0), 1) : 0;
      progress.style.transform = `scaleX(${pct})`;
    }

    if (hero) {
      const t = Math.min(y / Math.max(window.innerHeight, 1), 1);
      // Eased so the drift starts gently and accelerates as the hero leaves,
      // rather than moving in lockstep with the wheel.
      const e = t * t;
      hero.style.transform = `translate3d(0, ${(e * -140).toFixed(2)}px, 0)`;
      hero.style.opacity = String(1 - Math.min(t * 1.15, 1));
    }
  };

  const onScroll = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(paint);
  };

  paint();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  // The page height moves under us — reveals settling, a <details> opening,
  // fonts landing — and without a repaint the progress bar ends up short of
  // the end. Recompute whenever the document actually changes size.
  if ("ResizeObserver" in window) {
    new ResizeObserver(onScroll).observe(document.body);
  }
}

function initYear() {
  const el = document.querySelector("[data-current-year]");
  if (el) el.textContent = String(new Date().getFullYear());
}

// Called by each page's render script once its content is in the DOM, so
// the observers see final markup instead of racing it.
export function initShared() {
  initTopbar();
  initDrawer();
  initAnchors();
  initReveal();
  initGreeting();
  initHeroEntrance();
  initActiveNav();
  initClocks();
  initScrollMotion();
  initYear();
}
