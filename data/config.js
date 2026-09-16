// Site configuration.
//
// The repeating sections (experience, projects, certifications, involvement)
// and the about.html narrative live in their own files in this folder.
// Add an entry there and it flows through — no layout, CSS, or animation
// changes needed.

export const config = {
  site: {
    name: "Matteo Salinas",
    title: "Matteo Salinas",
    description:
      "Matteo Salinas. Finance at the University of Georgia, focused on investment research, private wealth, credit and capital markets.",
    url: "https://matteo0001.com",
  },

  // These are hardcoded in index.html too, so they survive a script
  // failure. If you change one, change both.
  links: {
    linkedin: "https://www.linkedin.com/in/matteosalinas1/",
    email: "salinasmatteo@gmail.com",
  },

  // Analytics. Both are free, cookieless and need no consent banner, and
  // both report the same basic shape: page views, visitors, referrers,
  // countries, devices, and which page people actually read. Neither can
  // tell you who an individual visitor was.
  //
  // Fill in whichever account you have. Leave both empty and no script
  // loads and no third-party request is made at all. Filling in both would
  // load both, which is just double-counting, so pick one.
  //
  //   cloudflareToken  Cloudflare dashboard -> Analytics & Logs -> Web
  //                    Analytics -> your site -> the data-cf-beacon token.
  //   goatCounterCode  The subdomain you chose at goatcounter.com. If your
  //                    dashboard is at matteo.goatcounter.com, it is
  //                    "matteo", not the full URL.
  analytics: {
    cloudflareToken: "",
    goatCounterCode: "matteosalinas",
  },

  nav: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ],
};
