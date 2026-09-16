// Reverse-chronological. Each role is a short piece of prose about what the
// work actually was, plus the concrete things that came out of it — not a
// resume bullet list. `artifactsLabel` names that second block per role.
//
// This section and the Work section had started to explain the same things
// twice: BNY described the Roth tool and the Sell vs. Borrow dashboard here,
// and data/projects.js described both again. The division now is Experience
// says what the work was and what it taught; Work carries the evidence. So
// anything with its own entry in projects.js gets one line here and the
// detail lives there.

export const experience = [
  {
    org: "BNY",
    role: "Global Investments & Wealth Intern",
    location: "Atlanta, GA",
    dates: "May 2026 – Aug 2026",
    summary:
      "I rotated across the floor rather than sitting on one desk: private banking, advisory and portfolio management. Most of my time went into the dashboards and tools those teams ran on, turning a complex client decision into a financial tradeoff an advisor could put a number on in the room. My primary mentor was a private banker, so most of the work was banking and client advisory, and the client side was the part I liked most.",
    artifactsLabel: "What I built",
    artifacts: [
      "A Roth conversion analysis tool and a Sell vs. Borrow dashboard, both written up in Work below, adopted across the wealth team in the Atlanta office.",
      "A banking deal sheet dashboard to take the friction out of deal prep.",
      "Net Worth Statements and client meeting books across investment, retirement, trust, alternative and real estate holdings.",
      "Relationship-level SWOT analyses presented for office review, identifying client needs, risks and potential opportunities.",
      "Prospect coverage across the Southeast and Florida: high-net-worth families, family offices and centers of influence the advisors hadn't reached yet.",
    ],
  },
  {
    org: "Bluegrass Capital Research",
    role: "Equity Research Analyst Intern",
    location: "Lexington, KY",
    dates: "Feb 2026 – May 2026",
    summary:
      "I built a five-year unlevered DCF, trading comps and a three-case valuation for HCA. The work forced me to separate the mechanics of valuation from the investment thesis behind it: capital returns, margin durability, and the value of network density.",
    artifactsLabel: "The call",
    artifacts: [
      "BUY on HCA Healthcare (NYSE: HCA). $558 price target, 28.4% implied upside. The full report is in Work below.",
      "Forward projections off 10-K/10-Q filings and earnings releases across the healthcare, energy and TMT names on the coverage list: revenue, margins, CapEx and working capital.",
    ],
  },
  {
    org: "ZEISS Group",
    role: "Financial Planning & Analysis Intern, Southeast Asia",
    location: "Singapore, SG",
    dates: "Oct 2025 – Jan 2026",
    summary:
      "I supported the Southeast Asia FP&A team across Singapore, Malaysia, Vietnam and the AEM cluster, working on monthly close, rolling forecasts, budget variance analysis and management reporting. Much of my work focused on improving the data and reporting infrastructure underneath those processes.",
    artifactsLabel: "What I built",
    artifacts: [
      "Four Power BI dashboards built from the ground up over SQL-structured datasets, one per market. The architecture is in Work below. They remained in use after my internship.",
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
      "The value of this internship was proximity. I accompanied the firm's Chairman into executive-level client meetings and strategic planning conversations, getting an early look at how wealth-management relationships are built, maintained and expanded.",
    artifactsLabel: "What I took from it",
    artifacts: [
      "How tax strategy, estate planning, portfolio construction and business development come together inside a single client conversation, and how much of the judgment depends on understanding the person across the table.",
      "Direct mentorship from the Chairman, and training in the sales side of it: how a relationship gets opened, and what keeps it.",
    ],
  },
  {
    org: "MAAD Investments",
    role: "Founder & Operator",
    location: "Atlanta, GA",
    dates: "Aug 2024 – Dec 2025",
    summary:
      "A ticket resale business built around supply-demand analysis, pricing and disciplined capital allocation. Over a hundred event opportunities evaluated a year, priced off the supply and demand around each one rather than off instinct, which is the entire edge. Capital allocation, operating budget and full P&L were mine.",
    artifactsLabel: "The numbers",
    artifacts: [
      "$70,000 in revenue within the first five months.",
      "Managed pricing, inventory, capital allocation and full P&L across concurrent events.",
      "100+ event opportunities evaluated annually.",
    ],
  },
];
