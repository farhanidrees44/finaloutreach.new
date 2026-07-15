import {
  BODY_REPLY_RATES as RICH_REPLY_RATES,
  BODY_EMAIL_VS_LINKEDIN as RICH_EMAIL_VS_LINKEDIN,
  BODY_DELIVERABILITY as RICH_DELIVERABILITY,
  BODY_LEAD_LIST as RICH_LEAD_LIST,
  BODY_INFRASTRUCTURE as RICH_INFRASTRUCTURE,
  BODY_TEMPLATES as RICH_TEMPLATES,
  BODY_SPAM as RICH_SPAM,
  BODY_ICP as RICH_ICP,
  BODY_FOLLOWUP as RICH_FOLLOWUP,
  BODY_METRICS as RICH_METRICS,
} from "./blog-bodies"

export const SITE = {
  name: "FinalOutreach",
  domain: "https://www.finaloutreach.com",
  tagline: "Cold email and lead generation for B2B teams",
  description:
    "Done-for-you cold email, LinkedIn outreach, and appointment setting for B2B teams — run by operators who live in the tools, not slide decks.",
  email: "hello@finaloutreach.com",
  location: "Remote — Americas & EMEA",
  twitter: "@finaloutreach",
  calendly: "https://calendly.com/finaloutreach/project-discussion-million-leads",
  founded: "2019",
}

export type Service = {
  slug: string
  title: string
  shortTitle: string
  tagline: string
  description: string
  price: string
  deliverables: string[]
  timeline: string
  idealFor: string
  metricLabel: string
  metricValue: string
}

export const SERVICES: Service[] = [
  {
    slug: "cold-email",
    title: "Done-for-you cold email outreach",
    shortTitle: "Cold email outreach",
    tagline: "Fill your calendar with qualified meetings — without touching the send button.",
    description:
      "We handle everything end-to-end: infrastructure, copywriting, list building, sending, and reply handling. You wake up to meetings on your calendar.",
    price: "From $3,500/mo",
    deliverables: [
      "Dedicated domain & inbox infrastructure (5–15 mailboxes)",
      "SPF / DKIM / DMARC configuration and 4-week warm-up",
      "ICP definition workshop and list of 3,000–8,000 verified prospects per month",
      "3-touch sequence written by a senior copywriter",
      "Inbox monitoring and reply handling by a trained SDR",
      "Weekly reporting call and live Slack channel",
    ],
    timeline: "2 weeks onboarding, meetings typically booked by week 3",
    idealFor: "Series A+ SaaS, agencies, and B2B services with a $15K+ ACV",
    metricLabel: "Avg reply rate",
    metricValue: "14.8%",
  },
  {
    slug: "linkedin-outreach",
    title: "LinkedIn outreach that gets replies",
    shortTitle: "LinkedIn outreach",
    tagline: "Multi-touch sequences that get past the connection request.",
    description:
      "Human-sounding LinkedIn campaigns that blend with your brand voice. Works alongside cold email or as a standalone channel for high-value targets.",
    price: "From $1,800/mo",
    deliverables: [
      "LinkedIn account warm-up and safety configuration",
      "Custom 5-step sequence (connection, voice note, follow-ups)",
      "Profile optimization for sender credibility",
      "Weekly optimization based on reply rates",
      "CRM sync with HubSpot / Salesforce / Pipedrive",
    ],
    timeline: "1 week setup, first replies typically inside week 2",
    idealFor: "Founders and execs with a personal brand and $30K+ ACV",
    metricLabel: "Avg acceptance rate",
    metricValue: "38%",
  },
  {
    slug: "lead-list-building",
    title: "Hyper-targeted lead list building",
    shortTitle: "Lead list building",
    tagline: "Verified, enriched prospect lists your team actually wants to work.",
    description:
      "Every lead manually reviewed, every email verified with bounce protection, every account enriched with the data your sequences need.",
    price: "From $0.40/lead",
    deliverables: [
      "ICP and buyer persona workshop",
      "Multi-source prospect research (Apollo, ZoomInfo, LinkedIn Sales Nav)",
      "Email verification with less than 2% bounce rate guarantee",
      "Custom enrichment fields (tech stack, funding, headcount growth, intent)",
      "Weekly delivery in a format your tools consume",
    ],
    timeline: "3 business days from ICP sign-off",
    idealFor: "Teams running outbound in-house but short on research capacity",
    metricLabel: "Bounce rate",
    metricValue: "<1.4%",
  },
  {
    slug: "appointment-setting",
    title: "Human appointment setting",
    shortTitle: "Appointment setting",
    tagline: "Trained SDRs living inside your inbox, booking meetings onto your calendar.",
    description:
      "A hybrid of our automation and a real person handling every conversation. Replies are qualified, objections are handled, meetings are booked.",
    price: "From $4,200/mo",
    deliverables: [
      "Dedicated SDR trained on your offer for 2 weeks",
      "Full inbox management across email and LinkedIn",
      "Qualification framework aligned to your sales team",
      "Direct calendar booking with no handoff friction",
      "Daily activity log and weekly pipeline review",
    ],
    timeline: "2 weeks of training, live by week 3",
    idealFor: "Teams with a clear ICP who need meetings, not more tools",
    metricLabel: "Meetings per month",
    metricValue: "22–48",
  },
  {
    slug: "email-infrastructure",
    title: "Cold email infrastructure setup",
    shortTitle: "Email infrastructure",
    tagline: "Deliverability done right from day one.",
    description:
      "Bulletproof sending setup: domains, SPF/DKIM/DMARC, warm-up, monitoring. Stop landing in spam before your first send.",
    price: "One-time $1,500",
    deliverables: [
      "Up to 3 secondary domains registered and configured",
      "Up to 15 Google Workspace or Microsoft 365 mailboxes",
      "Full DNS records (SPF, DKIM, DMARC, MX, custom tracking)",
      "4-week supervised warm-up with reputation monitoring",
      "Sending tool configuration (Instantly, Smartlead, or Lemlist)",
      "30 days of post-setup deliverability support",
    ],
    timeline: "5 business days to go live, 4 weeks to full volume",
    idealFor: "Teams that want to run cold email in-house the right way",
    metricLabel: "Avg inbox placement",
    metricValue: "94%+",
  },
  {
    slug: "outreach-audit",
    title: "Free outreach audit",
    shortTitle: "Outreach audit (free)",
    tagline: "A 30-minute teardown of what is actually broken in your outbound.",
    description:
      "We review your infrastructure, copy, targeting, and funnel, and send a recorded Loom with a prioritized fix list. No sales pitch.",
    price: "Free for qualified teams",
    deliverables: [
      "Deliverability scan of your current setup",
      "Copy review of your last 2 sequences",
      "ICP and list-quality assessment",
      "Prioritized 10-item fix list delivered via Loom",
    ],
    timeline: "Delivered inside 48 hours",
    idealFor: "Teams already running outbound that are not hitting targets",
    metricLabel: "Turnaround",
    metricValue: "48h",
  },
]

export type Industry = {
  slug: string
  name: string
  nameLower: string
  headline: string
  painPoints: string[]
  approach: string
  metric: { value: string; label: string }
  exampleClient: string
}

export const INDUSTRIES: Industry[] = [
  {
    slug: "saas",
    name: "B2B SaaS",
    nameLower: "B2B SaaS companies",
    headline: "Pipeline for SaaS teams that need to beat the next funding milestone.",
    painPoints: [
      "CAC is climbing faster than ARR",
      "Paid channels saturated — outbound is the new moat",
      "SDR ramp is 6 months, you have 3",
    ],
    approach:
      "We build ICP lists by tech stack, funding round, and hiring signals, then run a 3-channel sequence across email, LinkedIn, and targeted ads.",
    metric: { value: "$2.1M", label: "Pipeline in 90 days for a Series A AI company" },
    exampleClient: "Series A AI SaaS",
  },
  {
    slug: "agencies",
    name: "Marketing agencies",
    nameLower: "marketing agencies",
    headline: "Retainer growth without hiring another biz-dev lead.",
    painPoints: [
      "Referrals are unpredictable",
      "Cold email tools burn your reputation",
      "Your agency sells growth — your own funnel should prove it",
    ],
    approach:
      "Positioning-first outreach targeting ops and growth leads at companies that just raised or hired a new CMO.",
    metric: { value: "47", label: "Qualified calls per month for a 12-person agency" },
    exampleClient: "12-person marketing agency",
  },
  {
    slug: "consulting",
    name: "Consulting firms",
    nameLower: "consulting firms",
    headline: "Senior-level conversations with decision-makers, not gatekeepers.",
    painPoints: [
      "Long sales cycles need steady top-of-funnel",
      "Partners do not have time to prospect",
      "Cold email sounds 'spammy' — yours cannot",
    ],
    approach:
      "Senior-voice copy, tight ICP, and LinkedIn-first outreach to decision-makers at companies hitting our trigger criteria.",
    metric: { value: "$180K", label: "Saved vs hiring two internal SDRs" },
    exampleClient: "Mid-market consulting firm",
  },
  {
    slug: "fintech",
    name: "Fintech",
    nameLower: "fintech companies",
    headline: "Trust-first outbound for a trust-first industry.",
    painPoints: [
      "Compliance blocks half of the tools agencies use",
      "Buyers only trust peer recommendations",
      "Security reviews kill your sales cycle",
    ],
    approach:
      "Compliance-friendly infrastructure, proof-led copy, and referrals engineered through peer-company targeting.",
    metric: { value: "11x", label: "Pipeline ROI for a Series B fintech" },
    exampleClient: "Series B fintech",
  },
  {
    slug: "healthtech",
    name: "Healthtech",
    nameLower: "healthtech startups",
    headline: "Reach provider and payer buyers without HIPAA headaches.",
    painPoints: [
      "Long procurement cycles with clinical buyers",
      "Generic cold email gets flagged as risk",
      "You need pilots, not just intros",
    ],
    approach:
      "Clinical-voice copy, buying-committee mapping, and a pilot-first CTA that works for hospital systems.",
    metric: { value: "14", label: "Health-system pilots in 6 months" },
    exampleClient: "Series A healthtech",
  },
  {
    slug: "b2b-services",
    name: "B2B services",
    nameLower: "B2B service providers",
    headline: "Predictable pipeline for firms that sell retainers or projects.",
    painPoints: [
      "Client work leaves zero time for business development",
      "Word of mouth plateaus around $2M ARR",
      "Retainer churn needs a steady replacement pipeline",
    ],
    approach:
      "A 2-channel outbound engine that runs every week, whether you are slammed with client work or not.",
    metric: { value: "22", label: "Meetings per month, every month, for 18 months" },
    exampleClient: "B2B services firm",
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    nameLower: "manufacturing companies",
    headline: "Digital outbound for an industry that still runs on relationships.",
    painPoints: [
      "Trade shows are not enough anymore",
      "Your best buyers are not on LinkedIn all day",
      "Long cycles need an always-on pipeline",
    ],
    approach:
      "Account-based outreach to plant managers and procurement leads, with offline follow-up orchestrated through your reps.",
    metric: { value: "6", label: "Net-new enterprise accounts in year one" },
    exampleClient: "Industrial manufacturing OEM",
  },
  {
    slug: "real-estate",
    name: "Commercial real estate",
    nameLower: "commercial real estate firms",
    headline: "Sourcing deal flow with outbound, not cold calls.",
    painPoints: [
      "Broker lists are stale the day you buy them",
      "Your team bills hours, not prospecting time",
      "Regional shifts change your ICP quarterly",
    ],
    approach:
      "Real-time trigger-based targeting (funding, hiring, relocation) paired with a broker-voice sequence.",
    metric: { value: "$48M", label: "Deal volume attributed to our campaigns" },
    exampleClient: "Regional CRE firm",
  },
]

export type CaseStudy = {
  slug: string
  client: string
  industry: string
  timeline: string
  headline: string
  challenge: string
  solution: string
  results: string[]
  metrics: { v: string; l: string }[]
  quote: { text: string; name: string; role: string }
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "helio-ai",
    client: "Series A B2B SaaS",
    industry: "B2B SaaS",
    timeline: "90 days",
    headline: "$2.1M pipeline in 90 days for a Series A AI startup",
    challenge:
      "The client had raised a $14M Series A and needed to 3x its pipeline inside a single quarter. Their in-house SDR team of two was overwhelmed and their founder was personally prospecting on nights and weekends.",
    solution:
      "We ran a 3-channel sequence across cold email, LinkedIn, and a targeted pilot on retargeting ads. Lists were built from VC portfolio movement, hiring triggers, and product-led signals.",
    results: [
      "84 qualified demos booked in the first 90 days",
      "23% reply rate on the primary email sequence",
      "$25K MRR closed from first-cohort demos alone",
      "Pipeline coverage moved from 1.8x to 4.6x of quota",
    ],
    metrics: [
      { v: "84", l: "Demos booked" },
      { v: "23%", l: "Reply rate" },
      { v: "$25K", l: "MRR closed" },
    ],
    quote: {
      text: "We were skeptical at first. 60 days later, we’re scaling our sales team to keep up.",
      name: "Client",
      role: "VP Marketing",
    },
  },
  {
    slug: "verge-studio",
    client: "Marketing agency",
    industry: "Marketing agency",
    timeline: "120 days",
    headline: "Filled the calendar from 0 to 47 calls per month",
    challenge:
      "This 12-person brand agency had grown exclusively through referrals. When two major clients offboarded the same quarter, the team needed predictable outbound in weeks, not months.",
    solution:
      "Positioning-first messaging that led with a proprietary brand audit. ICP targeted companies that recently hired a new CMO or raised Series B.",
    results: [
      "47 qualified calls per month by month four",
      "11 new retained clients in the first six months",
      "8x return on the monthly retainer across the first year",
      "Founder reclaimed 12 hours per week previously spent prospecting",
    ],
    metrics: [
      { v: "47", l: "Calls per month" },
      { v: "11", l: "Retained clients" },
      { v: "8x", l: "Return on retainer" },
    ],
    quote: {
      text: "Best outbound partner we’ve ever worked with. Booked 47 calls our first month.",
      name: "Client",
      role: "Founder",
    },
  },
  {
    slug: "northwind-consulting",
    client: "Consulting firm",
    industry: "B2B services",
    timeline: "6 months",
    headline: "Replaced two SDRs with our team — saved $180K",
    challenge:
      "The client was running two in-house SDRs at a fully-loaded cost of over $200K per year, with uneven output and high turnover. They wanted consistent pipeline without the management overhead.",
    solution:
      "Full done-for-you outbound with senior-voice copywriting, target-account lists built from industry events, and a dedicated SDR for reply handling.",
    results: [
      "156 sales-qualified leads in six months",
      "$180K net savings versus the prior SDR team",
      "4.2x more meetings than the same period the prior year",
      "CRO reclaimed weekly 1:1 time previously spent coaching SDRs",
    ],
    metrics: [
      { v: "$180K", l: "SDR cost saved" },
      { v: "156", l: "SQLs in 6 months" },
      { v: "4.2x", l: "More meetings" },
    ],
    quote: {
      text: "The team thinks like operators, not an agency. Pipeline doubled, headcount didn’t.",
      name: "Client",
      role: "CRO",
    },
  },
  {
    slug: "ledger-systems",
    client: "Series B fintech",
    industry: "Fintech",
    timeline: "8 months",
    headline: "11x pipeline ROI for a Series B fintech breaking into enterprise",
    challenge:
      "This Series B fintech had strong mid-market traction but enterprise buyers would not respond to their self-serve playbook. Long procurement cycles required a true outbound motion.",
    solution:
      "Buying-committee mapping, senior-voice copy, and a trust-first sequence that opened with a security-ready pilot offer.",
    results: [
      "$8.4M in newly sourced enterprise pipeline",
      "11x return on the engagement across the first eight months",
      "Average ACV on sourced deals 3.2x vs inbound",
      "Sales cycle shortened by 22 days on average",
    ],
    metrics: [
      { v: "11x", l: "Pipeline ROI" },
      { v: "$8.4M", l: "Enterprise pipeline" },
      { v: "22 days", l: "Shorter cycle" },
    ],
    quote: {
      text: "Every dollar we put in returned ten back inside a single quarter.",
      name: "Client",
      role: "Head of Revenue",
    },
  },
  {
    slug: "veridian-health",
    client: "Series A healthtech",
    industry: "Healthtech",
    timeline: "6 months",
    headline: "14 health-system pilots in 6 months for a Series A healthtech",
    challenge:
      "The client had a strong product but a 14-month sales cycle with hospital systems and no consistent top-of-funnel.",
    solution:
      "Clinical-voice copy, targeted outreach to VPs of operations at IDNs, and a pilot-first CTA that matched how hospitals actually buy.",
    results: [
      "14 signed pilots across community and IDN health systems",
      "41% of pilots converted to paid contracts inside 9 months",
      "Doubled top-of-funnel without adding clinical sales headcount",
    ],
    metrics: [
      { v: "14", l: "Pilots signed" },
      { v: "41%", l: "Pilot-to-paid rate" },
      { v: "2x", l: "Top-of-funnel" },
    ],
    quote: {
      text: "They understood our buyer inside two weeks. It took our last agency a year.",
      name: "Client",
      role: "Chief Commercial Officer",
    },
  },
  {
    slug: "atlas-partners",
    client: "B2B services firm",
    industry: "B2B services",
    timeline: "18 months",
    headline: "22 meetings per month, every month, for 18 straight months",
    challenge:
      "This team wanted a boring result: the same number of qualified meetings every single month, with zero variance, while the partners stayed billable.",
    solution:
      "A 2-channel outbound engine with disciplined list replenishment and zero copy drift. We treated pipeline like a utility, not a campaign.",
    results: [
      "22 meetings per month with a standard deviation under 3",
      "18 straight months of on-target delivery",
      "Zero partner time spent on prospecting",
    ],
    metrics: [
      { v: "22", l: "Meetings per month" },
      { v: "18", l: "Straight months on target" },
      { v: "0h", l: "Partner prospecting time" },
    ],
    quote: {
      text: "It is genuinely the most boring line item on our P&L. That is the highest compliment we can give.",
      name: "Client",
      role: "Managing Partner",
    },
  },
  {
    slug: "forge-industrial",
    client: "Industrial manufacturing OEM",
    industry: "Manufacturing",
    timeline: "12 months",
    headline: "6 net-new enterprise accounts for a 60-year-old industrial OEM",
    challenge:
      "The client had grown for six decades on trade shows and rep referrals. With a new private-equity owner pushing for 18% ARR growth, the leadership team needed a digital outbound motion their senior reps would actually trust — without sounding like a SaaS company.",
    solution:
      "Account-based outreach to plant managers and procurement leads at Tier-1 manufacturers, with offline follow-up orchestrated through the client's regional reps. Targeting was triggered by capex announcements, hiring spikes, and supply-chain reshoring signals.",
    results: [
      "6 net-new enterprise accounts closed inside year one",
      "$4.1M in incremental contract value attributed to outbound",
      "Average deal cycle held under 11 months despite procurement complexity",
      "Sales reps reclaimed 9 hours per week previously spent prospecting",
    ],
    metrics: [
      { v: "6", l: "Net-new accounts" },
      { v: "$4.1M", l: "New contract value" },
      { v: "11mo", l: "Avg deal cycle" },
    ],
    quote: {
      text: "We were genuinely worried digital outbound would feel wrong for our buyer. Six new logos later, that worry is gone.",
      name: "Client",
      role: "VP Sales",
    },
  },
  {
    slug: "hearth-cre",
    client: "Regional CRE firm",
    industry: "Commercial real estate",
    timeline: "9 months",
    headline: "$48M in sourced deal volume for a regional CRE firm",
    challenge:
      "The client's brokers were billing hours, not prospecting time. Their lead lists were stale within a quarter and they had no consistent way to reach owners and operators outside their personal networks during a down market.",
    solution:
      "Real-time, trigger-based targeting on funding events, hiring spikes, and corporate relocations, paired with a broker-voice sequence written specifically for owner-operators and family offices.",
    results: [
      "$48M in deal volume directly attributed to outbound campaigns",
      "31 owner-side meetings booked across nine months",
      "Two trophy properties sourced exclusively through outreach",
      "Broker prospecting time dropped from 18 to 4 hours per month",
    ],
    metrics: [
      { v: "$48M", l: "Sourced deal volume" },
      { v: "31", l: "Owner meetings" },
      { v: "78%", l: "Less broker prospecting" },
    ],
    quote: {
      text: "Outbound finally feels like a brokerage tool, not a SaaS gimmick. The deal flow is real.",
      name: "Client",
      role: "Managing Principal",
    },
  },
  {
    slug: "apex-cybersecurity",
    client: "Series B cybersecurity",
    industry: "Cybersecurity",
    timeline: "6 months",
    headline: "$3.7M in CISO pipeline for a Series B cyber startup",
    challenge:
      "The client's product solved a real problem but CISOs ignored generic outbound. This team needed a peer-credible motion that could survive procurement and security review without burning the founders' personal LinkedIn networks.",
    solution:
      "Founder-voice copy reviewed by a former CISO, ICP narrowed to 1,200 named accounts with a clear trigger event, and a long-form sequence that opened with a security-cleared mini-audit, not a demo request.",
    results: [
      "$3.7M in qualified CISO pipeline inside six months",
      "9.4% reply rate on a sequence sent only to VP-and-above security buyers",
      "27 first-call meetings with named-account CISOs",
      "Average deal size on sourced pipeline 2.6x vs inbound",
    ],
    metrics: [
      { v: "$3.7M", l: "CISO pipeline" },
      { v: "27", l: "Named-account meetings" },
      { v: "9.4%", l: "Reply rate" },
    ],
    quote: {
      text: "We finally have a motion that does not embarrass us in front of CISOs. It actually opens doors.",
      name: "Client",
      role: "Co-founder",
    },
  },
  {
    slug: "brightpath-logistics",
    client: "Growth-stage 3PL",
    industry: "Logistics",
    timeline: "5 months",
    headline: "31 enterprise shipper meetings for a fast-growing 3PL",
    challenge:
      "This logistics team had grown to $40M revenue almost entirely through inbound and reseller channels. They needed direct relationships with Fortune 1000 shippers, but their internal team had never run real outbound and the freight market was tightening.",
    solution:
      "Triple-channel sequencing across email, LinkedIn, and direct mail, gated by RFP-cycle triggers and freight-spend intelligence. Replies were handled by a dedicated SDR briefed on each prospect's existing freight network.",
    results: [
      "31 enterprise shipper meetings inside five months",
      "9 of those meetings advanced to RFP within the same quarter",
      "$2.3M in awarded freight tied to outbound-sourced opportunities",
      "Outbound now represents 28% of new logo pipeline",
    ],
    metrics: [
      { v: "31", l: "Shipper meetings" },
      { v: "$2.3M", l: "Awarded freight" },
      { v: "28%", l: "Of new logo pipeline" },
    ],
    quote: {
      text: "Every quarter we say we will hire SDRs internally, and every quarter the FinalOutreach team out-performs. We stopped hiring SDRs.",
      name: "Client",
      role: "CRO",
    },
  },
]

export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string
  category: "Cold Email" | "LinkedIn" | "Strategy" | "Case Studies" | "Tools"
  readingMinutes: number
  author: { name: string; role: string }
  excerpt: string
  body: string
  featured?: boolean
}

const author = { name: "Jordan Hale", role: "Founder, FinalOutreach" }

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "cold-emails-that-get-30-percent-reply-rates",
    title: "How to write cold emails that get 30%+ reply rates in 2026",
    description:
      "The exact framework we use to write cold emails that average 14% reply rates — and hit 30%+ on our top sequences.",
    date: "2026-04-02",
    category: "Cold Email",
    readingMinutes: 11,
    author,
    featured: true,
    excerpt:
      "Most cold emails fail at the same three places: the subject line, the opening, and the CTA. Here is what we changed to triple our reply rates.",
    body: BODY_REPLY_RATES(),
  },
  {
    slug: "cold-email-vs-linkedin-outreach",
    title: "Cold email vs LinkedIn outreach: which is better for B2B in 2026?",
    description:
      "A clear decision framework — when to run cold email, when to run LinkedIn, and when to run both in parallel.",
    date: "2026-03-21",
    category: "Strategy",
    readingMinutes: 9,
    author,
    excerpt:
      "There is a boring answer to this question. And then there is the answer that is correct for your specific ICP. Let us walk through both.",
    body: BODY_EMAIL_VS_LINKEDIN(),
  },
  {
    slug: "email-deliverability-guide-2026",
    title: "The complete guide to email deliverability in 2026",
    description:
      "Everything you need to land in the inbox in 2026: SPF, DKIM, DMARC, warm-up, sending volume, and reputation management.",
    date: "2026-03-05",
    category: "Cold Email",
    readingMinutes: 14,
    author,
    excerpt:
      "Deliverability is not a setting. It is a system. Here is exactly how we configure sending infrastructure for our clients.",
    body: BODY_DELIVERABILITY(),
  },
  {
    slug: "build-a-lead-list-that-converts",
    title: "How to build a lead list that actually converts",
    description:
      "Lists are the single biggest lever in cold email. Here is how we build ones that convert at 3x industry average.",
    date: "2026-02-19",
    category: "Strategy",
    readingMinutes: 10,
    author,
    excerpt:
      "Most people buy a list, upload it, and wonder why nothing works. The real answer starts long before you open Apollo.",
    body: BODY_LEAD_LIST(),
  },
  {
    slug: "cold-email-infrastructure-setup",
    title: "Cold email infrastructure setup: a step-by-step guide",
    description:
      "The exact infrastructure setup we use for every new client — domains, mailboxes, DNS, warm-up, and monitoring.",
    date: "2026-02-04",
    category: "Cold Email",
    readingMinutes: 13,
    author,
    excerpt:
      "You can have the best copy in the world. If your infrastructure is bad, none of it matters. Here is how to set it up right.",
    body: BODY_INFRASTRUCTURE(),
  },
  {
    slug: "cold-email-templates-that-worked",
    title: "10 cold email templates that booked us $1M+ in pipeline",
    description:
      "Ten real templates from our books — with the win conditions, reply rates, and what to change for your own ICP.",
    date: "2026-01-18",
    category: "Cold Email",
    readingMinutes: 12,
    author,
    excerpt:
      "Templates are a starting point, not a finish line. Here are ten of our best — along with what makes them work.",
    body: BODY_TEMPLATES(),
  },
  {
    slug: "why-cold-emails-go-to-spam",
    title: "Why your cold emails go to spam (and how to fix it)",
    description:
      "The five things that almost always cause spam problems — and the fix for each one.",
    date: "2026-01-06",
    category: "Cold Email",
    readingMinutes: 8,
    author,
    excerpt:
      "Going to spam is not bad luck. It is almost always one of five very fixable things.",
    body: BODY_SPAM(),
  },
  {
    slug: "icp-definition-framework",
    title: "The ultimate ICP definition framework for B2B",
    description:
      "Define an ICP precise enough to cut your list by 80% and double your reply rate.",
    date: "2025-12-14",
    category: "Strategy",
    readingMinutes: 10,
    author,
    excerpt:
      "Most ICPs are too broad to be useful. Here is the framework we use to make yours sharper in an afternoon.",
    body: BODY_ICP(),
  },
  {
    slug: "follow-up-without-being-annoying",
    title: "How to follow up without being annoying: 7 frameworks",
    description:
      "Seven follow-up frameworks that keep replies high without pushing your prospects to unsubscribe.",
    date: "2025-11-28",
    category: "Cold Email",
    readingMinutes: 9,
    author,
    excerpt:
      "80% of replies come from follow-ups. But most follow-ups are awful. Here are seven that work.",
    body: BODY_FOLLOWUP(),
  },
  {
    slug: "cold-email-metrics-that-matter",
    title: "Cold email metrics that actually matter (and which to ignore)",
    description:
      "Open rates are mostly noise. Here are the metrics that actually predict pipeline.",
    date: "2025-11-10",
    category: "Tools",
    readingMinutes: 7,
    author,
    excerpt:
      "Most cold email dashboards are lying to you. Here is what to measure instead.",
    body: BODY_METRICS(),
  },
]

export const COMPETITORS = [
  { slug: "vs-belkins", name: "Belkins" },
  { slug: "vs-martal", name: "Martal" },
  { slug: "vs-cleverly", name: "Cleverly" },
  { slug: "vs-leadium", name: "Leadium" },
  { slug: "vs-callbox", name: "Callbox" },
  { slug: "vs-cience", name: "CIENCE" },
]

export const TOOL_ALTERNATIVES = [
  { slug: "instantly-alternatives", name: "Instantly" },
  { slug: "smartlead-alternatives", name: "Smartlead" },
  { slug: "apollo-alternatives", name: "Apollo" },
  { slug: "lemlist-alternatives", name: "Lemlist" },
  { slug: "outreach-io-alternatives", name: "Outreach.io" },
]

export const CITIES = [
  { slug: "new-york", name: "New York", region: "NY, USA" },
  { slug: "san-francisco", name: "San Francisco", region: "CA, USA" },
  { slug: "los-angeles", name: "Los Angeles", region: "CA, USA" },
  { slug: "chicago", name: "Chicago", region: "IL, USA" },
  { slug: "austin", name: "Austin", region: "TX, USA" },
  { slug: "boston", name: "Boston", region: "MA, USA" },
  { slug: "miami", name: "Miami", region: "FL, USA" },
  { slug: "toronto", name: "Toronto", region: "ON, Canada" },
  { slug: "london", name: "London", region: "UK" },
  { slug: "berlin", name: "Berlin", region: "Germany" },
  { slug: "amsterdam", name: "Amsterdam", region: "Netherlands" },
  { slug: "dubai", name: "Dubai", region: "UAE" },
  { slug: "singapore", name: "Singapore", region: "Singapore" },
  { slug: "sydney", name: "Sydney", region: "Australia" },
  { slug: "sao-paulo", name: "São Paulo", region: "Brazil" },
]

// NOTE: Programmatic industry data has moved to `lib/industries-data.ts`
// where each industry has unique pricing, sample copy, FAQ, and case-study
// content. This avoids the duplicate-content / boilerplate-only-page problem
// flagged by Search Console for the previous 30-entry version.

// ---- Long-form post bodies are now defined in `lib/blog-bodies.ts`. ----
// The local wrappers below delegate to the rich versions so that anything
// already calling these names (e.g. inside BLOG_POSTS) continues to work.

function BODY_REPLY_RATES() {
  return RICH_REPLY_RATES()
}
function BODY_EMAIL_VS_LINKEDIN() {
  return RICH_EMAIL_VS_LINKEDIN()
}
function BODY_DELIVERABILITY() {
  return RICH_DELIVERABILITY()
}
function BODY_LEAD_LIST() {
  return RICH_LEAD_LIST()
}
function BODY_INFRASTRUCTURE() {
  return RICH_INFRASTRUCTURE()
}
function BODY_TEMPLATES() {
  return RICH_TEMPLATES()
}
function BODY_SPAM() {
  return RICH_SPAM()
}
function BODY_ICP() {
  return RICH_ICP()
}
function BODY_FOLLOWUP() {
  return RICH_FOLLOWUP()
}
function BODY_METRICS() {
  return RICH_METRICS()
}
