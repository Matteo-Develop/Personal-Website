// Reverse-chronological. Each role is a short piece of prose about what the
// work actually was, plus the concrete things that came out of it — not a
// resume bullet list. `artifactsLabel` names that second block per role.

export const experience = [
  {
    org: "BNY",
    role: "Global Investments & Wealth Intern",
    location: "Atlanta, GA",
    dates: "May 2026 – Aug 2026",
    summary:
      "I rotated across the floor rather than sitting on one desk: private banking, advisory and portfolio management. Most of my time went into the dashboards and tools those teams ran on, the analysis that has to exist before a client conversation starts and the material that carries it once it does. My mentor was a private banker, so that is where the most hours landed, and the client side was the part I liked most.",
    artifactsLabel: "What I built",
    artifacts: [
      "A Sell vs. Borrow dashboard pricing a taxable liquidation against securities-based lending, so the advisor could put a number on the tradeoff in front of the client.",
      "A Roth conversion analysis tool from scratch: one-time and multi-year strategies across tax cost, IRMAA and estate outcomes, shipped with an advisor SOP so the desk could run it without me.",
      "A banking deal sheet dashboard to take the friction out of deal prep.",
      "Net Worth Statements and client meeting books organizing assets and liabilities across investment, retirement, trust, alternative and real estate holdings.",
      "Relationship-level SWOT analyses, leaning on internal AI tooling to move faster, presented for office review.",
      "Prospect coverage across the Southeast and Florida: high-net-worth families, family offices and centers of influence the advisors hadn't reached yet.",
    ],
  },
  {
    org: "Bluegrass Capital Research",
    role: "Equity Research Analyst Intern",
    location: "Lexington, KY",
    dates: "Feb 2026 – May 2026",
    summary:
      "A five-year unlevered DCF, comps and three cases on HCA. The model is how you defend a call. The theses underneath are why you make it: capital return policy, structural margin mispricing, and network density compounding.",
    artifactsLabel: "The call",
    artifacts: [
      "BUY on HCA Healthcare (NYSE: HCA). $558 price target, 28.4% implied upside.",
      "WACC analysis and a football-field valuation across the three cases.",
      "Forward projections off 10-K/10-Q filings and earnings releases, covering revenue, margins, CapEx and working capital in healthcare, energy and TMT.",
    ],
  },
  {
    org: "ZEISS Group",
    role: "Financial Planning & Analysis Intern, Southeast Asia",
    location: "Singapore, SG",
    dates: "Oct 2025 – Jan 2026",
    summary:
      "Four markets on one monthly close: Singapore, Malaysia, Vietnam and the AEM cluster. Rolling forecasts, variance against budget, and the management reporting that came out of both. Most of my time went underneath that, into the data layer the reporting sat on, because a management pack is only ever as good as the tables feeding it.",
    artifactsLabel: "What I built",
    artifacts: [
      "Four Power BI dashboards over SQL-structured datasets, with the transformations in Power Query and the measures written in DAX rather than patched into the source.",
      "Excel models projecting revenue, operating expense and cash flow across the region, built off drivers so one assumption change moved the whole regional forecast.",
      "Variance analysis against budget and prior forecast, with sales and margin analysis feeding regional strategy.",
      "Market, competitor and industry research across the four markets.",
    ],
  },
  {
    org: "Vantage Financial Alliance",
    role: "Private Wealth & Asset Management Intern",
    location: "Alpharetta, GA",
    dates: "May 2025 – Aug 2025",
    summary:
      "Mostly, I was in the room. I went with the firm's Chairman into executive-level client meetings and strategic planning sessions, which is the fastest way to learn how a wealth conversation actually runs. Less analysis than apprenticeship: how you talk to people, how you read a room, and how much of this job turns out to be exactly that.",
    artifactsLabel: "What I took from it",
    artifacts: [
      "How a wealth conversation runs, watched at close range with the Chairman and C-suite clients in the room.",
      "Exposure to tax-efficient strategy, estate planning considerations and portfolio construction for high-net-worth clients.",
      "Direct mentorship from the Chairman, and training in the sales side of it: how a relationship gets opened, and what keeps it.",
    ],
  },
  {
    org: "MAAD Investments",
    role: "Founder & Director of Operations",
    location: "Atlanta, GA",
    dates: "Aug 2024 – Dec 2025",
    summary:
      "An event-driven book in concert and event tickets. Over a hundred event opportunities evaluated a year, priced off supply-demand dynamics rather than instinct, which is the entire edge. Capital allocation, operating budget and full P&L were mine.",
    artifactsLabel: "The numbers",
    artifacts: [
      "$70,000 in revenue within the first five months.",
      "Average markups above 200%.",
      "100+ event opportunities evaluated annually.",
    ],
  },
];
