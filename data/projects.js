// Write-ups. Add an object to grow the section.
//
// To attach a deck: drop the PDF into assets/ and swap that project's
// `link: null` for the line commented directly above it. Nothing renders
// while it stays null, so an unattached deck never leaves a broken link.

export const projects = [
  {
    title: "Marathon Petroleum",
    dcf: true,
    featured: true,
    tag: "Equity research",
    note: "The market prices MPC as a pure refiner and misses the midstream business underneath it. MPLX, 64% owned, generates enough fee-based cash to cover the dividend and all standalone CapEx, which materially reduces MPC&rsquo;s dependence on refining economics and supports a stronger downside case than a pure-refiner valuation implies. Strong Buy &middot; price at publication ~$232, April 2026 &middot; bull case $287 &middot; bear case $142.",
    detail: [
      "Built for the University of Kentucky 2026 Stock Pitch Competition.",
      "Scenario spread rather than a single number: $230 mid-cycle DCF base, ~$232 sum-of-the-parts intrinsic, $287 bull, $142 bear.",
      "The thesis: MPLX, 64% owned, pays MPC $3.5B+ a year in fee-based distributions by 2027, independent of crack spreads. That alone covers the dividend and all standalone CapEx, which makes the refining upside close to free.",
      "An FCFF discounted cash flow at a 7.90% WACC, a sum-of-the-parts valuing MPC ex-MPLX against pure-play refiner multiples, and a WACC against terminal-growth sensitivity grid.",
      "A reverse DCF showing that at $232 the market was implying only about 3.5% revenue CAGR over five years.",
      "The bear case sits at $142 rather than lower because the midstream distributions are contracted and fee-based: the argument is that the downside is set by MPLX, not by crack spreads.",
    ],
    link: { href: "assets/marathon-petroleum.pdf", label: "Read the full deck" },
  },
  {
    title: "Roth Conversion Analysis Tool",
    tag: "BNY · Private Banking",
    note: "Built from scratch to compare one-time and multi-year Roth conversion strategies across tax cost, IRMAA, portfolio growth and estate outcomes. Designed so advisors could run the analysis themselves after my internship.",
    detail: [
      "Models tax cost, IRMAA exposure and estate outcomes across one-time and staged multi-year conversions.",
      "Shipped with a written advisor SOP so the team could run it without me.",
    ],
    link: null,
  },
  {
    title: "HCA Healthcare",
    featured: true,
    tag: "Equity research",
    note: "Five-year unlevered DCF, comps and a three-case scenario model. BUY, $558 price target, 28.4% implied upside.",
    detail: [
      "Built the revenue, margin, CapEx and working-capital build off 10-K/10-Q filings and earnings releases.",
      "Differentiated theses on capital return policy, structural margin mispricing and network density compounding.",
      "Supported by WACC analysis and a football-field valuation across the scenario set.",
      "The network-density thesis: roughly 27% inpatient share across the markets HCA actually operates in, targeting 29% by 2030, with outpatient sites compounding referral retention inside each one.",
    ],
    link: { href: "assets/hca-healthcare.pdf", label: "Read the full report" },
  },
  {
    title: "Southeast Asia FP&A Reporting System",
    tag: "ZEISS \u00b7 FP&A",
    note: "Four markets reported on four different shapes of source data, which meant the regional pack was rebuilt by hand every month. I rebuilt the layer underneath it: one modelled dataset per market, the logic written once, the monthly pack falling out of it.",
    detail: [
      "The architecture: source extracts per market, cleaned and conformed in Power Query, modelled into a star schema over SQL-structured datasets, measures written in DAX, surfaced as four Power BI dashboards feeding management reporting.",
      "Writing the logic as DAX measures rather than patching the source is the part that made it survive: the definitions live in one place, so a change to how margin is calculated moves every market at once instead of being re-fixed four times.",
      "Covered Singapore, Malaysia, Vietnam and the AEM cluster, against monthly close, rolling forecast and budget variance.",
      "No figures or screenshots here. The work is the architecture, and the architecture is the part that transfers.",
    ],
    link: null,
  },
  {
    title: "Sell vs. Borrow Dashboard",
    tag: "BNY · Private Banking",
    note: "Compares the after-tax cost of liquidating appreciated securities against borrowing against the portfolio, giving an advisor a client-ready view of the tradeoff.",
    detail: [
      "Built for the private banking team to make the liquidate-or-lend decision explicit in the client conversation rather than after it.",
      "Paired with a Banking Deal Sheet dashboard that cut the prep time on deal documentation.",
    ],
    link: null,
  },
  {
    title: "MAAD Investments",
    tag: "Founded",
    note: "A ticket resale business built around supply-demand analysis, pricing and disciplined capital allocation. $70,000 of revenue in the first five months.",
    detail: [
      "Evaluated 100+ event opportunities a year, pricing off supply-demand dynamics and market research.",
      "Sized positions across concurrent events so no single night carried the book.",
      "Owned capital allocation, operating budget and full P&L.",
    ],
    link: null,
  },
  {
    title: "Sensei Notify",
    tag: "Founded",
    note: "A subscription research platform I started at fifteen and ran for just over two years: market analysis, alerts and trend forecasting for a market that repriced every weekend. 400+ subscribers at peak, at a 95% retention rate.",
    detail: [
      "Owned customer acquisition, pricing, financial management and the community end to end.",
      "Managed a team of 15, spread across time zones.",
      "Recurring revenue, so churn was the whole business. Subscribers could leave any week, which meant the product had to be right every week.",
    ],
    link: { href: "about.html", label: "The longer story" },
  },
];
