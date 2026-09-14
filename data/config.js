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
      "Matteo Salinas. Finance at UGA's Terry College of Business, focused on markets, equity research, credit and cross-border capital.",
    url: "https://matteo0001.com",
  },

  // These are hardcoded in index.html too, so they survive a script
  // failure. If you change one, change both.
  links: {
    linkedin: "https://www.linkedin.com/in/matteosalinas1/",
    email: "salinasmatteo@gmail.com",
  },

  // Cloudflare Web Analytics. Paste the token from the Cloudflare dashboard
  // (Analytics & Logs -> Web Analytics -> your site -> the data-cf-beacon
  // token) between the quotes and it starts collecting on the next deploy.
  // Left empty, no beacon loads and no request is made — the site behaves
  // exactly as if analytics were never added.
  //
  // It is cookieless and does not fingerprint visitors, so it needs no
  // consent banner. It reports counts, referrers, countries, devices and
  // pages. It cannot tell you who any individual visitor was.
  analytics: {
    cloudflareToken: "",
  },

  nav: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ],
};
