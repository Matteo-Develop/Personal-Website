// Write-ups. Add an object to grow the section.
//
// To attach a deck: drop the PDF into assets/ and swap that project's
// `link: null` for the line commented directly above it. Nothing renders
// while it stays null, so an unattached deck never leaves a broken link.

export const projects = [
  {
    title: "Marathon Petroleum",
    featured: true,
    tag: "Equity research",
    note: "The market prices MPC as a pure refiner and misses the midstream floor underneath it. MPLX, 64% owned, throws off enough fee-based cash to cover the dividend and all standalone CapEx on its own, which puts a floor under the equity that has nothing to do with crack spreads. Strong Buy at ~$232, April 2026: $287 bull case against a $142 bear floor.",
    detail: [
      "Built for the University of Kentucky 2026 Stock Pitch Competition.",
      "Scenario spread rather than a single number: $230 mid-cycle DCF base, ~$232 sum-of-the-parts intrinsic, $287 bull, $142 bear floor.",
      "The thesis: MPLX, 64% owned, pays MPC $3.5B+ a year in fee-based distributions by 2027, independent of crack spreads. That alone covers the dividend and all standalone CapEx, which makes the refining upside close to free.",
      "An FCFF discounted cash flow at a 7.90% WACC, a sum-of-the-parts valuing MPC ex-MPLX against pure-play refiner multiples, and a WACC against terminal-growth sensitivity grid.",
      "A reverse DCF showing that at $232 the market was implying only about 3.5% revenue CAGR over five years.",
      "Bear case floored at $142, because the midstream distributions hold even when crack spreads compress.",
    ],
    link: { href: "assets/marathon-petroleum.pdf", label: "Read the full deck" },
  },
  {
    title: "Roth Conversion Analysis Tool",
    tag: "BNY · Private Banking",
    note: "Built from the ground up to model one-time and multi-year conversion strategies.",
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
      "The network-density thesis: HCA holds 27% of the US hospital services market and targets 29% by 2030, with outpatient sites compounding referral retention.",
    ],
    link: { href: "assets/hca-healthcare.pdf", label: "Read the full report" },
  },
  {
    title: "Sell vs. Borrow Dashboard",
    tag: "BNY · Private Banking",
    note: "Prices a taxable liquidation against securities-based lending, so the cost of each route is explicit before the client picks one.",
    detail: [
      "Built for the private banking team to make the liquidate-or-lend decision explicit in the client conversation rather than after it.",
      "Paired with a Banking Deal Sheet dashboard that cut the prep time on deal documentation.",
    ],
    link: null,
  },
  {
    title: "MAAD Investments",
    tag: "Founded",
    note: "An event-driven ticket portfolio. $70,000 of revenue in the first five months.",
    detail: [
      "Evaluated 100+ event opportunities a year, pricing off supply-demand dynamics and market research.",
      "Averaged markups above 200%, sizing positions across concurrent events so no single night carried the book.",
      "Owned capital allocation, operating budget and full P&L.",
    ],
    link: null,
  },
  {
    title: "Sensei Notify",
    tag: "Founded",
    note: "A subscription research platform I started at fifteen and ran for just over two years. Market analysis, alerts and trend forecasting for a market that repriced every weekend.",
    detail: [
      "Owned customer acquisition, pricing, financial management and the community end to end.",
      "Managed a team of 15, spread across time zones.",
      "Recurring revenue, so churn was the whole business. Subscribers could leave any week, which meant the product had to be right every week.",
    ],
    link: { href: "about.html", label: "The longer story" },
  },
];
