// Long-form narrative for about.html — where the professional record on the
// front page came from.
//
// Market-level facts about Sneaker Twitter (scale, the infrastructure layer,
// the secondary market, where people went afterwards) are industry context.
// Everything in the first person is Matteo's own.
//
// The figures in `operating` come from a LinkedIn export taken before three
// of those roles were removed from the profile. They are his own numbers,
// but this site is now the only public place they appear, so there is no
// second copy to check them against.
//
// Naming follows the same line Matteo drew on LinkedIn: Sensei Notify is
// his own company and still listed there, so it keeps its name. The other
// three were removed from the profile, so they keep every date, metric and
// responsibility but are described by what they were rather than by brand
// name. Nothing is hidden by this — the Sneaker Twitter chapter above spells
// out exactly what that industry was — it only drops the searchable strings.
//
// Those descriptions name the business function rather than the subculture:
// "an e-commerce infrastructure company", not "a proxy business". A reader
// who knows the ecosystem loses nothing; a recruiter who does not is not
// sent to look up what a proxy or a checkout bot is in the middle of a
// paragraph about a fifteen-year-old running support.

export const about = {
  lede: "It started because I wanted to buy something in a game and my dad said no. So I had to figure out how to make my own money.",

  chapters: [
    {
      label: "Fourteen",
      body: [
        "I started buying and selling sneakers when I was fourteen. It reads like a hobby. The actual work was pricing, inventory, and working out which counterparty would actually pay, with my own money, before I could drive.",
      ],
    },
    {
      label: "Sneaker Twitter",
      body: [
        "What I'd walked into was a market most people have never heard of: a few thousand serious participants worldwide, nearly all teenagers, building the infrastructure behind limited-release retail. Restock monitors, proxy networks, data services, paid information groups. All of it existed to save a customer a few hundred milliseconds at checkout, and customers paid a lot for that.",
        "It had real price discovery. Software licenses traded on a secondary market at multiples of retail, and an exchange got built to clear those trades with escrow. Venture-backed founders and early employees at hypergrowth companies came out of the same Discords.",
        "I ended up building inside it rather than buying from it: a subscription service of my own, and support and operations roles at three of the businesses other people ran.",
      ],
    },
    {
      label: "What it taught me",
      body: [
        "That market repriced you in public every weekend. If your product underperformed on one release, members cancelled that night, not next quarter. I learned retention and incident response at an age when most of my friends had part-time jobs.",
        "I also learned how to talk to people who outranked me. At fifteen I was working alongside adults who didn't care how old I was as long as I was useful. That's still the most valuable thing I took from it.",
        "All of it ran alongside club and high school soccer: practice, a release at 10am on a Saturday, and a support queue that cared about neither.",
      ],
    },
    {
      label: "Then code",
      body: [
        "Running services like those means eventually building them yourself. I taught myself HTML and CSS, then Python, Go, and Java, enough to ship and maintain the things subscribers were paying for. Some of my closest friendships came out of that stretch, with people I've still never met in person.",
      ],
    },
    {
      label: "Kentucky",
      body: [
        "I went to the University of Kentucky in August 2023 for biomedical technology, aiming at medicine. It didn't last. What kept pulling at me was the market side. I was running an event-driven ticket book on the side, and it held my attention in a way the pre-med track never did.",
      ],
    },
    {
      label: "Finance",
      body: [
        "So I switched to finance, and after three years at Kentucky I transferred to the University of Georgia in the fall of 2026. I've applied to the Terry College of Business to study finance, with a decision expected in October. FP&A in Singapore and equity research in Lexington while I was still at Kentucky, then private banking in Atlanta over the summer in between. The research side came naturally, because it used the same instinct as the sneaker work: understand what drives value, work out what other people are missing, and make a decision without complete information.",
        "What I'm actually interested in is markets, geopolitics, and how capital moves around the world. You can't really follow one without ending up in the other two.",
      ],
    },
    {
      label: "Now",
      body: [
        "I'm comfortable on the technical side, and I'll build the model or write the measure or automate the report if that's what the job needs. I'm also comfortable with people, which comes from selling things and dealing with customers since I was fourteen rather than from anything I studied.",
        "What I'd like is work where those two aren't separate jobs. Somewhere I can do the analysis and then be in the room when it gets discussed.",
      ],
    },
  ],

  // Headline figures for the operating years, counted up on scroll.
  //
  // Each label names the business it belongs to. Unlabelled, the six read as
  // one company's numbers, which would have Sensei Notify doing $100k a month
  // with 6,000 users — neither of which the detail below claims. Four
  // different businesses are represented here and the block has to say so.
  //
  // Same caveat as `operating` below: his own numbers, no second source.
  stats: [
    { value: 400, suffix: "+", label: "Sensei subscribers at peak" },
    { value: 95, suffix: "%", label: "Sensei retention rate" },
    { value: 100, prefix: "$", suffix: "K", label: "Monthly revenue, infrastructure company" },
    { value: 15, label: "Sensei team managed" },
    { value: 6000, suffix: "+", label: "Users on the largest platform" },
    { value: 70, suffix: "%", label: "Recurring questions removed" },
  ],

  // The operating record behind the narrative above, 2019–2022.
  operating: [
    {
      org: "Sensei Notify Inc.",
      role: "Founder & Strategy Director",
      dates: "Dec 2019 – Feb 2022",
      note: "A subscription research platform built from nothing: market analysis, alerts and trend forecasting for the release market described above.",
      metrics: [
        "400+ active subscribers on recurring billing, at a 95% retention rate.",
        "Managed a team of 15, spread across time zones, most of whom I never met in person.",
        "Owned customer acquisition, financial management and community end to end.",
      ],
    },
    {
      org: "An e-commerce infrastructure company",
      role: "Customer Support Specialist → Operations Manager",
      dates: "Feb 2021 – Aug 2021",
      note: "Started on the support queue and moved into running operations two months later.",
      metrics: [
        "Two of us ran it, me and the owner, against $100,000 in monthly revenue.",
        "Ran the support queue to a same-day standard, then wrote the procedures it ran on after I moved into operations.",
      ],
    },
    {
      org: "A limited-release retail automation platform",
      role: "Technical Support Staff",
      dates: "Aug 2020 – Feb 2021",
      note: "Front-line and escalation support, at the largest scale I worked at. Seven people in the company, and support ran through me: live, in chat, while releases were happening, not a queue somebody worked through the next morning.",
      metrics: [
        "6,000+ users on a platform carrying $10M+ in annual transactions.",
        "Worked with the developers on the failures causing the most downtime, and wrote the documentation that removed 70% of the questions that kept coming back.",
      ],
    },
    {
      org: "A smaller retail automation platform",
      role: "Technical Support Staff",
      dates: "Feb 2021 – Jul 2021",
      note: "Release-day support, under a clock, at a five-person company.",
      metrics: [
        "Supported 5,000+ transactions, focused on system reliability and customer experience.",
        "Wrote the onboarding materials, which took work off the queue by getting new customers running without needing it.",
      ],
    },
  ],

  // Grouped rather than a flat badge wall.
  capabilities: [
    {
      group: "Valuation",
      items: "DCF · Comparable companies · Precedent transactions · Scenario modeling · WACC · Football-field valuation",
    },
    {
      group: "Wealth",
      items: "Private wealth management · Portfolio analysis · Tax-efficient strategies · Estate planning concepts · Net worth statements",
    },
    {
      group: "FP&A",
      items: "Monthly forecasting · Variance analysis · Management reporting · Sales & margin analysis · GL reconciliation",
    },
    {
      group: "Data",
      items: "Excel (financial modeling, scenario analysis, PivotTables, advanced lookups) · Power BI · DAX · Power Query · SQL · Bloomberg Terminal · Salesforce & CRM",
    },
    {
      group: "AI",
      items: "AI workflow development · Anthropic Claude API integration · Prompt design · Research automation",
    },
    {
      group: "Code",
      items: "Python · Go · Java · HTML & CSS",
    },
    {
      group: "Client & Commercial",
      items: "Client relationship management · Business development · Prospect research · Negotiation",
    },
    {
      group: "Operating",
      items: "Subscription retention · Support operations · Incident response · Distributed teams · Technical documentation",
    },
    {
      group: "Languages",
      items: "English · Spanish",
    },
    {
      group: "Outside work",
      items: "Soccer · Golf · Geopolitics · History",
    },
  ],
};
