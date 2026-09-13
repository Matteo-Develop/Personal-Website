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

export const about = {
  lede: "It started when I wanted to buy in-game currency on an app. My dad said no, so I had to find a way to make my own money.",

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
        "What I'd walked into was a market most people have never heard of. A few thousand serious participants worldwide, nearly all teenagers, building the infrastructure behind limited-release retail: monitors watching individual sites for restocks, proxy networks, data services, and paid information groups. Every one of those businesses existed to save a customer a few hundred milliseconds at checkout, and those milliseconds were worth real money.",
        "It had genuine price discovery. Software licenses traded on a secondary market at multiples of retail, and eventually an exchange got built to clear those trades with escrow and dispute resolution. It has since turned into a reasonably well-known hiring pool. A number of venture-backed founders and early employees at hypergrowth companies came out of the same Discords.",
        "I ended up building inside it rather than just buying from it: a subscription research service of my own, and support and operations roles at three of the businesses other people were running. That record is further down this page.",
      ],
    },
    {
      label: "What it taught me",
      body: [
        "That market repriced you in public every weekend. If your product underperformed on a single release, members cancelled that night, not next quarter. I learned retention, incident response, and how to hold a paying customer base together under that kind of pressure at an age when most of my friends had part-time jobs.",
        "I also learned how to talk to people who outranked me. At fifteen and sixteen I was working alongside adults who didn't care how old I was as long as I was useful, and that's still the most valuable thing I took out of it.",
        "All of it ran alongside club and high school soccer. Practice, a release at 10am on a Saturday, and a support queue that cared about neither one. Whatever I know about holding three things at once, I learned it there.",
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
        "I went to the University of Kentucky for biomedical technology, aiming at medicine. It didn't take. What kept pulling at me was the market side. I was running an event-driven ticket book on the side, and it held my attention in a way the pre-med track never did.",
      ],
    },
    {
      label: "Finance",
      body: [
        "So I switched to finance and eventually transferred to Georgia, into Terry. FP&A in Singapore, then equity research in Lexington, then private banking in Atlanta. The research side came naturally, because it's the same instinct as the sneaker work. Find the thing that's mispriced, understand why, and get there before the rest of the market does.",
        "What I'm actually interested in is markets, geopolitics, and how capital moves around the world. Those three turn out to be the same subject.",
      ],
    },
    {
      label: "Now",
      body: [
        "Two things, and the combination is the point. I'm technical: I'll build the model, write the measure, automate the report. And I'm good with people, because I've been selling, negotiating and keeping customers since I was fourteen.",
        "So what I want is work that uses both sides. An industry where the technical half and the people half are the same job, not two different departments.",
      ],
    },
  ],

  // Headline figures for the operating years, counted up on scroll.
  // Same caveat as `operating` below: his own numbers, no second source.
  stats: [
    { value: 400, suffix: "+", label: "Subscribers at peak" },
    { value: 95, suffix: "%", label: "Retention rate" },
    { value: 100, prefix: "$", suffix: "K", label: "Monthly revenue" },
    { value: 10, label: "People on the team" },
    { value: 6000, suffix: "+", label: "Users supported" },
    { value: 70, suffix: "%", label: "Recurring tickets removed" },
  ],

  // The operating record behind the narrative above, 2019–2022.
  operating: [
    {
      org: "Sensei Notify Inc.",
      role: "Founder & Strategy Director",
      dates: "Dec 2019 – Feb 2022",
      note: "A subscription research platform built from nothing: market analysis, alerts and trend forecasting for the release market described above.",
      metrics: [
        "400+ active subscribers at a 95% retention rate.",
        "Owned customer acquisition, financial management and community end to end.",
      ],
    },
    {
      org: "A proxy infrastructure business",
      role: "Customer Support Specialist → Operations Manager",
      dates: "Feb 2021 – Aug 2021",
      note: "Started on the support queue and moved into running operations two months later.",
      metrics: [
        "Managed a team of 10 against $100,000 in monthly revenue, at a 95% customer satisfaction rate.",
        "Resolved 85% of tickets inside 24 hours and wrote the procedures that cut response times by 60%.",
      ],
    },
    {
      org: "A checkout-automation platform",
      role: "Technical Support Staff",
      dates: "Feb 2021 – Jul 2021",
      note: "Release-day support, under a clock.",
      metrics: [
        "Supported 5,000+ transactions, focused on system reliability and customer experience.",
        "Wrote onboarding materials that lifted adoption 25% and cut resolution times 24%.",
      ],
    },
    {
      org: "A high-volume checkout-automation platform",
      role: "Technical Support Staff",
      dates: "Aug 2020 – Feb 2021",
      note: "Front-line and escalation support, at the largest scale I worked at.",
      metrics: [
        "6,000+ users on a platform carrying $10M+ in annual transactions.",
        "Cut downtime 15% working with the developers, and wrote documentation that removed 70% of recurring tickets.",
      ],
    },
  ],

  // Grouped rather than a flat badge wall.
  capabilities: [
    {
      group: "Valuation",
      items: "Financial modeling · DCF · Comparable companies · Precedent transactions · Scenario modeling · WACC · Football-field valuation · Forecasting",
    },
    {
      group: "Wealth",
      items: "Private wealth management · Family wealth · Portfolio analysis · Investment management · Tax-efficient strategies · Estate & inheritance planning · Net worth statements",
    },
    {
      group: "FP&A",
      items: "Monthly forecasting · Variance analysis · Budgeting · Management reporting · Sales & margin analysis · GL reconciliation",
    },
    {
      group: "Data",
      items: "Excel (PivotTables, lookups) · Power BI · DAX · Power Query · SQL · Bloomberg Terminal · PowerPoint · Salesforce & CRM · GitHub",
    },
    {
      group: "AI",
      items: "Anthropic Claude API · Prompt engineering · Agent building (reasoning & deep-research) · LLM applications · AI-assisted research & workflow automation",
    },
    {
      group: "Code",
      items: "Python · Go · Java · SQL · HTML & CSS",
    },
    {
      group: "Commercial",
      items: "Business development · Client relations · Prospecting & lead generation · Negotiation · Sales · Customer support",
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
      items: "Soccer · Golf · Geopolitics · Tennis · History · Hiking · Pickleball",
    },
  ],
};
