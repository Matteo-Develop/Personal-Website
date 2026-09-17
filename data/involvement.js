// Involvement.
//
// `featured: true` puts an entry in the list proper. Everything else is
// collapsed into a single "Also" line underneath it. That split exists
// because eleven rows of mostly "Member" diluted the four that actually say
// something: by the time a reader reached Sigma Nu's chaired roles they had
// scrolled past six identical lines. Nothing is dropped — the rest is still
// on the page, just not competing with the signal.
//
// Chaired and elected roles first, then the societies, then volunteering.

export const involvement = [
  {
    org: "Sigma Nu Fraternity",
    // One elected office, then the committees. Five middot-separated items
    // read as five equal positions, which overstated the last four.
    roles: ["Formal Social Chair", "Treasury, Philanthropy, Alumni &amp; Recruitment Committees"],
    featured: true,
  },
  {
    org: "Order of Omega Honor Society",
    roles: ["Member", "Top 5% of Greek members"],
    featured: true,
  },
  { org: "M&A Society", roles: ["Member"], featured: true },
  { org: "Finance Society", roles: ["Member"], featured: true },
  { org: "Economics Society", roles: ["Member"], featured: true },
  { org: "AI Society", roles: ["Member"] },
  { org: "Sales Club", roles: ["Member"] },
  { org: "DanceBlue", roles: ["Volunteer Staff"] },
  { org: "Meals by Grace", roles: ["Assistant"] },
  { org: "Movement Mentor", roles: ["Mentor"] },
  { org: "57 Day Blood Club", roles: ["Member"] },
];
