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
      "Matteo Salinas — finance at UGA's Terry College of Business. Private wealth, equity research, credit, and cross-border capital.",
    url: "https://matteo0001.com",
  },

  // These are hardcoded in index.html too, so they survive a script
  // failure. If you change one, change both.
  links: {
    linkedin: "https://www.linkedin.com/in/matteosalinas1/",
    email: "salinasmatteo@gmail.com",
  },

  nav: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ],
};
