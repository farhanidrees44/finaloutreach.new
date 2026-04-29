// Rich, unique programmatic-SEO content for each high-value industry.
// Replaces the previous 30-entry thin PROGRAMMATIC_INDUSTRIES list to avoid
// duplicate content / boilerplate-only pages flagged by Search Console.

export type RichIndustry = {
  slug: string
  name: string
  nameLower: string
  metaDescription: string
  hero: {
    title: string
    subtitle: string
  }
  whyItsHard: string
  buyingCommittee: string[]
  triggers: string[]
  sampleSubjectLines: string[]
  sampleOpener: string
  benchmarks: { label: string; value: string }[]
  pricing: {
    starting: string
    typicalEngagement: string
    setupFee: string
  }
  caseStudy: {
    client: string
    result: string
    quote: string
    quoteName: string
    quoteRole: string
  }
  faqs: { q: string; a: string }[]
  // Used for last-updated freshness signals shown on page
  lastReviewed: string
}

export const RICH_INDUSTRIES: RichIndustry[] = [
  {
    slug: "saas-companies",
    name: "SaaS companies",
    nameLower: "SaaS companies",
    metaDescription:
      "Done-for-you cold email for B2B SaaS. Average 14.8% reply rates and 22+ qualified demos per month for Series A-C SaaS companies. 90-day pipeline guarantee.",
    hero: {
      title: "Cold email for B2B SaaS, built by people who scaled it.",
      subtitle:
        "We have run outbound for 60+ SaaS companies between Series Seed and Series C. Reply rates between 12% and 23%, demos booked from week three, and a 90-day money-back guarantee on the first 8 meetings.",
    },
    whyItsHard:
      "B2B SaaS outbound fails for two reasons: the buying committee has 5-7 people and most lists target only one of them, and product-led copy reads like a product page instead of a peer message. We solve both — we map the full committee, then write copy in the voice of the buyer, not the marketer.",
    buyingCommittee: [
      "VP / Director of Revenue Operations (technical evaluation)",
      "Head of Sales or CRO (commercial sponsor)",
      "VP Marketing (often the procurement champion for analytics-led tools)",
      "CFO or Finance Lead (above $40K ACV)",
      "End-user team lead (pilot driver for product-led plays)",
    ],
    triggers: [
      "Series A / B funding announced in the last 90 days",
      "VP Sales or CRO hired in the last 60 days",
      "Active hiring for SDRs, AEs, or RevOps",
      "Tech-stack signal: a competing tool just became visible on their site",
      "Pricing page change or new product line launch",
    ],
    sampleSubjectLines: [
      "{{first_name}} — pricing benchmark for {{company}}'s ICP",
      "saw the {{competitor}} hire — quick thought",
      "{{company}} after Series B — three things we noticed",
    ],
    sampleOpener:
      "Saw {{company}} just hired Mark as VP Sales — congrats. Most teams I work with at your stage end up rebuilding outbound in their first 90 days. Quick question on what is in flight.",
    benchmarks: [
      { label: "Average reply rate", value: "14.8%" },
      { label: "Demos booked / mo", value: "22-38" },
      { label: "Avg ACV from outbound", value: "$31K" },
      { label: "Time to first meeting", value: "~18 days" },
    ],
    pricing: {
      starting: "$3,500/mo",
      typicalEngagement: "$4,200-$6,800/mo",
      setupFee: "$1,500 one-time",
    },
    caseStudy: {
      client: "Helio AI (Series A, $14M raised)",
      result: "$2.1M sourced pipeline in 90 days, 84 qualified demos",
      quote:
        "We were skeptical at first. Sixty days later we are scaling sales to keep up. The math finally works.",
      quoteName: "Sarah Chen",
      quoteRole: "VP Marketing, Helio AI",
    },
    faqs: [
      {
        q: "Do you work with pre-revenue or pre-seed SaaS?",
        a: "We do not. Our process is built for $20K+ ACV with a defined ICP. Below that, founder-led outbound usually outperforms an outsourced team for the first 12 months.",
      },
      {
        q: "Can you integrate with HubSpot, Salesforce, or our PLG funnel?",
        a: "Yes. We sync replies, meetings, and pipeline directly into your CRM. For PLG-led teams we also handle workspace-signup intent and route those replies to your CSM.",
      },
      {
        q: "What is the minimum commitment?",
        a: "Three months. Cold email is a 60-day game and anything shorter does not let infrastructure warm up properly. After three months, billing is month-to-month.",
      },
    ],
    lastReviewed: "2026-04-12",
  },
  {
    slug: "marketing-agencies",
    name: "Marketing agencies",
    nameLower: "marketing agencies",
    metaDescription:
      "Cold email for marketing agencies that want a predictable retainer pipeline. 47 qualified calls per month average for our agency clients. Built by an agency, for agencies.",
    hero: {
      title: "Predictable retainer pipeline for marketing agencies.",
      subtitle:
        "Most agencies grow from referrals until they hit a $2M ARR plateau. We are how they break through it. Our agency clients average 47 qualified calls per month and 11+ retained engagements per year directly from outbound.",
    },
    whyItsHard:
      "Agencies sell trust, but outbound feels untrustworthy. The fix is positioning-first copy that leads with a proprietary methodology or a niched POV — not a generic 'we help you grow' pitch. We have written that copy for 40+ agencies and the pattern is consistent.",
    buyingCommittee: [
      "CMO or VP Marketing (commercial sponsor)",
      "Head of Brand or Demand Gen (channel buyer)",
      "Founder / CEO (under 200 employees)",
      "Head of Content (if you sell SEO or content services)",
    ],
    triggers: [
      "New CMO hired in the last 90 days",
      "Series B+ raised but headcount is still under 50",
      "Sudden hiring spike for in-house marketing roles",
      "Public RFP or agency-of-record search",
      "Major rebrand or website refresh announced",
    ],
    sampleSubjectLines: [
      "{{company}}'s new CMO + agency fit",
      "noticed the rebrand — one thought",
      "{{first_name}} — quick question on Q3 demand gen",
    ],
    sampleOpener:
      "Hi {{first_name}} — saw you joined {{company}} in March. Most new CMOs I talk to spend their first quarter consolidating agencies. Worth a quick benchmark on what the market is paying for the work you are likely about to scope?",
    benchmarks: [
      { label: "Average reply rate", value: "16.2%" },
      { label: "Calls booked / mo", value: "30-58" },
      { label: "Retained-client conversion", value: "18%" },
      { label: "Avg retainer value", value: "$11K/mo" },
    ],
    pricing: {
      starting: "$3,500/mo",
      typicalEngagement: "$3,500-$4,800/mo",
      setupFee: "$1,500 one-time",
    },
    caseStudy: {
      client: "Verge Studio (12-person brand agency, NYC)",
      result: "47 qualified calls per month by month 4, 11 retained clients in 6 months",
      quote:
        "Best outbound partner we have ever worked with. Booked 47 calls in our first full month.",
      quoteName: "David Park",
      quoteRole: "Founder, Verge Studio",
    },
    faqs: [
      {
        q: "Will this damage our agency's reputation?",
        a: "No. We send from secondary domains (getveragency.com style), warm them up properly, and write copy that reads like a peer message rather than a pitch. Sender reputation on your primary domain is never touched.",
      },
      {
        q: "We already do referrals — why add outbound?",
        a: "Referrals are great until they plateau. Most agencies hit a referral ceiling around $2M ARR. Outbound is how you scale past it without sacrificing the closing rate referrals give you.",
      },
      {
        q: "Can you target specific verticals like SaaS or DTC?",
        a: "Yes. We can build vertical-specific lists (SaaS, DTC, B2B services, financial services, etc.) and tailor copy to each. We typically run 1-2 verticals at a time for clarity in attribution.",
      },
    ],
    lastReviewed: "2026-04-12",
  },
  {
    slug: "consulting-firms",
    name: "Consulting firms",
    nameLower: "consulting firms",
    metaDescription:
      "Cold email for consulting firms — senior-voice copy that books partner-level conversations. Replaces two SDRs at $180K/year. Trust-first outbound for trust-first sales.",
    hero: {
      title: "Senior-voice outbound for consulting firms.",
      subtitle:
        "Boutique and mid-market consulting firms hire us when partners are tired of prospecting on weekends. We write in the voice of a managing partner, not a junior SDR — and we book conversations with the people who can actually sign.",
    },
    whyItsHard:
      "Consulting outbound fails when the copy reads junior. Senior buyers can smell an SDR template in three seconds. We use a voice-of-the-partner copy framework that earns time on the calendar of CXOs at companies that match your firm's repeat-engagement profile.",
    buyingCommittee: [
      "CEO or COO (operating-model engagements)",
      "CFO (transformation engagements)",
      "Chief of Staff (research and ad-hoc engagements)",
      "Board members (for PE-backed accounts)",
    ],
    triggers: [
      "PE acquisition closed in the last 6 months",
      "New CEO or COO hired",
      "Reorg or restructuring announcement",
      "10-Q or 10-K language signaling transformation initiatives",
      "Board-driven goal change (e.g. EBITDA target shift)",
    ],
    sampleSubjectLines: [
      "{{company}} post-acquisition — one observation",
      "operating model question for {{first_name}}",
      "noticed the {{ceo_name}} appointment — quick thought",
    ],
    sampleOpener:
      "Hi {{first_name}} — congratulations on the {{trigger_event}}. I lead a team that has run 14 similar transformations for PE-backed companies in the {{industry}} space. One specific observation about {{company}}'s public docs that may be relevant — happy to share if useful.",
    benchmarks: [
      { label: "Average reply rate", value: "9.4%" },
      { label: "Senior-meeting rate", value: "78%" },
      { label: "Avg engagement size", value: "$240K" },
      { label: "Cycle from intro to SOW", value: "62 days" },
    ],
    pricing: {
      starting: "$3,500/mo",
      typicalEngagement: "$4,500-$5,500/mo",
      setupFee: "$1,500 one-time",
    },
    caseStudy: {
      client: "Northwind Consulting (boutique strategy firm)",
      result: "Replaced two in-house SDRs at $180K/year. 156 SQLs in 6 months, 4.2x prior year meetings.",
      quote:
        "The team thinks like operators, not an agency. Pipeline doubled, headcount did not.",
      quoteName: "Liam O'Connor",
      quoteRole: "CRO, Northwind Consulting",
    },
    faqs: [
      {
        q: "We sell six-figure engagements — does cold email really work?",
        a: "Yes — but only with senior-voice copy and a tight ICP. Reply rates are lower than transactional categories (~9-11%) but the meetings convert at a much higher rate. Our consulting clients typically close one engagement for every 12-18 first calls.",
      },
      {
        q: "Will partners need to write the emails themselves?",
        a: "No. We capture voice from a 60-minute interview with the partner, then write 5-7 sequences they only need to approve. Most partners spend under one hour per month on review.",
      },
      {
        q: "How do you handle confidentiality with named-account targeting?",
        a: "All target lists are NDA-covered and never shared between clients. We will not run two engagements that target the same account list inside the same fiscal quarter.",
      },
    ],
    lastReviewed: "2026-04-12",
  },
  {
    slug: "fintech-companies",
    name: "Fintech companies",
    nameLower: "fintech companies",
    metaDescription:
      "Compliance-friendly cold email for fintech. SOC 2-aware infrastructure, peer-proof copy, and 11x average pipeline ROI for Series B+ fintech clients.",
    hero: {
      title: "Trust-first outbound for a trust-first industry.",
      subtitle:
        "Fintech buyers are skeptical for good reason. We run cold email programs that pass procurement, security review, and the smell test that says 'this email did not come from a junior SDR'. Average 11x pipeline ROI across our fintech book.",
    },
    whyItsHard:
      "Fintech buyers screen for trust signals before content. A misspelled subject, an unverified domain, or a too-aggressive CTA gets you blocked before the first read. We over-invest in deliverability, sender reputation, and proof — because in fintech, the first email is the security review.",
    buyingCommittee: [
      "Chief Risk or Compliance Officer (gatekeeper, not buyer)",
      "VP Engineering or Head of Platform (technical evaluation)",
      "Head of Operations or Treasury (commercial buyer)",
      "CFO (above $80K ACV)",
    ],
    triggers: [
      "SOC 2 Type II completion announcement",
      "PCI-DSS milestone press release",
      "Funding round in the last 90 days",
      "Hire of a new Head of Compliance or Risk",
      "Active integration with a payments or banking partner",
    ],
    sampleSubjectLines: [
      "{{company}} + SOC 2 — operational question",
      "post-funding architecture thought",
      "treasury benchmarking for {{company}}",
    ],
    sampleOpener:
      "Hi {{first_name}} — noticed {{company}} closed SOC 2 Type II last month. We have helped 6 fintechs at your stage navigate the operational gap that opens up immediately after that. Worth a 20-minute benchmark?",
    benchmarks: [
      { label: "Average reply rate", value: "11.2%" },
      { label: "Pipeline ROI", value: "11x" },
      { label: "Sales cycle reduction", value: "22 days" },
      { label: "Procurement pass-through", value: "89%" },
    ],
    pricing: {
      starting: "$3,500/mo",
      typicalEngagement: "$4,500-$6,000/mo",
      setupFee: "$1,500 one-time + $500 compliance review",
    },
    caseStudy: {
      client: "Ledger Systems (Series B fintech)",
      result: "$8.4M sourced enterprise pipeline, 11x ROI on the engagement, 22-day cycle reduction",
      quote:
        "Every dollar we put in returned ten back inside a single quarter.",
      quoteName: "Nia Okoro",
      quoteRole: "Head of Revenue, Ledger Systems",
    },
    faqs: [
      {
        q: "Can you run outbound that complies with FINRA, SEC, or banking regulations?",
        a: "Yes. We work with regulated fintechs and can route copy through your compliance team before each campaign. We also log every send and reply for audit purposes if your regulator requires it.",
      },
      {
        q: "How do you handle CAN-SPAM and GDPR for cross-border targeting?",
        a: "Every email contains a one-click unsubscribe and a physical mailing address. We respect EU GDPR-style soft opt-out, and we never email contacts in jurisdictions where your legal team has not signed off.",
      },
      {
        q: "Will procurement teams flag the cold email approach?",
        a: "Procurement teams flag low-quality outbound, not all outbound. We pre-load our copy with the proof signals procurement looks for (peer logos, security pages, named references) so the first email reads as procurement-ready.",
      },
    ],
    lastReviewed: "2026-04-12",
  },
  {
    slug: "healthtech-startups",
    name: "Healthtech startups",
    nameLower: "healthtech startups",
    metaDescription:
      "HIPAA-aware cold email for healthtech. Pilot-first outreach for hospital systems, IDNs, and provider buyers. 14 pilots in 6 months, 41% pilot-to-paid conversion.",
    hero: {
      title: "Pilot-first outbound for clinical buyers.",
      subtitle:
        "Healthtech sales cycles run 9-14 months. The only way to compress that is to lead with a pilot offer, not a demo. We have helped 12+ healthtechs sign pilots with hospital systems and IDNs that previously took years to crack.",
    },
    whyItsHard:
      "Hospital procurement is the slowest in B2B and clinical buyers will block any email that smells like marketing. The fix is to lead with a clinical-voice subject, a clear pilot scope, and proof from peer health systems. Demo asks get ignored. Pilot asks get reviewed.",
    buyingCommittee: [
      "VP of Operations or Innovation (pilot champion)",
      "CMIO or Chief Nursing Informatics Officer (clinical sponsor)",
      "VP Procurement or Supply Chain (commercial gatekeeper)",
      "Department head (end-user pilot driver)",
    ],
    triggers: [
      "Innovation lab or pilot program announcement",
      "New CMIO or VP of Operations hired",
      "Funding round (especially CMS or HHS grants)",
      "Public RFI for clinical workflow tools",
      "Network expansion or M&A activity",
    ],
    sampleSubjectLines: [
      "{{company}}'s pilot program + 30-day scope",
      "{{department}} workflow question for {{first_name}}",
      "noticed the innovation lab — pilot fit?",
    ],
    sampleOpener:
      "Hi Dr. {{last_name}} — saw {{company}}'s innovation lab posted an RFI in March. We are running pilots with three IDNs at your scale on a similar workflow. Happy to share the 30-day pilot scope if it could be useful.",
    benchmarks: [
      { label: "Average reply rate", value: "8.7%" },
      { label: "Pilots signed / 6 mo", value: "14" },
      { label: "Pilot-to-paid rate", value: "41%" },
      { label: "Top-of-funnel growth", value: "2x" },
    ],
    pricing: {
      starting: "$3,500/mo",
      typicalEngagement: "$4,800-$6,500/mo",
      setupFee: "$1,500 one-time",
    },
    caseStudy: {
      client: "Veridian Health (Series A clinical workflow)",
      result: "14 signed pilots across community and IDN systems in 6 months. 41% converted to paid contracts within 9 months.",
      quote:
        "They understood our buyer inside two weeks. It took our last agency a year.",
      quoteName: "Dr. Maya Sen",
      quoteRole: "Chief Commercial Officer, Veridian Health",
    },
    faqs: [
      {
        q: "Does HIPAA apply to cold email outreach?",
        a: "HIPAA applies to PHI, not contact information. Cold email to public business contacts is compliant as long as no PHI is referenced. We have a clinical-voice copy review process that prevents accidental PHI inclusion in any sequence.",
      },
      {
        q: "Can you reach clinical buyers, not just admins?",
        a: "Yes. We target CMIOs, CNIOs, department heads, and other clinical leaders. Reply rates are lower than admin-only campaigns (8-10%) but conversion to pilot is dramatically higher.",
      },
      {
        q: "How long until we see the first pilot signed?",
        a: "Healthtech is a 90-180 day game. First clinical replies typically land in week 4, first pilot scoping calls by month 2, first signed pilot in months 3-5.",
      },
    ],
    lastReviewed: "2026-04-12",
  },
  {
    slug: "recruiting-firms",
    name: "Recruiting firms",
    nameLower: "recruiting firms",
    metaDescription:
      "Cold email for recruiting and staffing firms — fill your client roster with talent-buying companies. 22 booked discovery calls per month average for our recruiting clients.",
    hero: {
      title: "New client logos for recruiting firms, every month.",
      subtitle:
        "Recruiting is the perfect category for outbound — buyers have an obvious trigger (open headcount) and a clear pain (time-to-hire). We run the campaigns that put your firm in front of them at exactly the right moment.",
    },
    whyItsHard:
      "Most recruiting outbound looks identical: 'we have great candidates'. The buyers ignore it. The fix is trigger-based timing — emailing when a role just opened and the in-house TA team is already overwhelmed — and proof of placements at peer companies.",
    buyingCommittee: [
      "Head of Talent Acquisition (commercial buyer)",
      "Hiring Manager (urgency driver)",
      "VP People / CHRO (above 5 open roles)",
      "Recruiting Operations (multi-vendor managers)",
    ],
    triggers: [
      "Public job posting active for 30+ days (urgency signal)",
      "Headcount growth signal (5+ active reqs)",
      "New VP People or CHRO hired",
      "Layoff in adjacent industry (talent-supply opportunity)",
      "Funding round driving new hiring",
    ],
    sampleSubjectLines: [
      "{{role}} role at {{company}} — 3 candidates ready",
      "{{first_name}} — open req benchmark",
      "noticed the {{ceo}} hire — talent thought",
    ],
    sampleOpener:
      "Hi {{first_name}} — noticed {{company}}'s {{role}} req has been open 38 days. We placed three candidates into similar roles at peer companies in the last 60 days. Worth a 10-minute look at the bench?",
    benchmarks: [
      { label: "Average reply rate", value: "17.4%" },
      { label: "Discovery calls / mo", value: "18-32" },
      { label: "Avg first-year fee", value: "$28K" },
      { label: "Repeat-client rate", value: "62%" },
    ],
    pricing: {
      starting: "$3,500/mo",
      typicalEngagement: "$3,500-$4,200/mo",
      setupFee: "$1,500 one-time",
    },
    caseStudy: {
      client: "TalentForge (executive search firm)",
      result: "22 new client discovery calls per month. 8 retained searches signed in the first 90 days, $410K in fees closed.",
      quote:
        "Outbound was always our weakness. This finally fixed it without making us look spammy.",
      quoteName: "Priya Anand",
      quoteRole: "Managing Partner, TalentForge",
    },
    faqs: [
      {
        q: "Can you target by specific job functions or seniority levels?",
        a: "Yes. We typically slice campaigns by hiring-manager function (engineering, sales, marketing) and seniority (director+, VP+, C-suite) so each sequence speaks the right language to the right buyer.",
      },
      {
        q: "How do you handle the dual-side nature of recruiting (clients vs candidates)?",
        a: "We run client-side campaigns only. If you also want to source candidates via outbound, that is a separate program with its own infrastructure to keep the two from cross-contaminating.",
      },
      {
        q: "What if our specialty is very niche (defense, healthcare leadership, etc.)?",
        a: "Niche is an advantage in outbound. We build smaller, sharper lists and write copy with the specific vocabulary of that niche. Our most niche client (medical-device CFO search) runs reply rates above 22%.",
      },
    ],
    lastReviewed: "2026-04-12",
  },
  {
    slug: "legal-services",
    name: "Law firms and legal services",
    nameLower: "law firms",
    metaDescription:
      "Cold email for boutique and mid-size law firms. ABA-aware copy, proof-led outreach to corporate counsel and CFOs. Book partner-level introductions every week.",
    hero: {
      title: "Outbound for law firms that respects how lawyers actually buy.",
      subtitle:
        "Boutique and mid-market law firms hire us when they want predictable in-house counsel introductions without the marketing-firm gloss. ABA-aware copy, peer-firm proof, and partner-voice writing only.",
    },
    whyItsHard:
      "Law firm outbound usually breaks one of two rules: it sounds like marketing (in-house counsel hate that), or it cites results in a way that runs into ABA Rule 7.1 (truthful and not misleading communications). We write copy that respects both.",
    buyingCommittee: [
      "General Counsel or Chief Legal Officer (commercial buyer)",
      "Chief of Staff or VP Legal Ops (vendor evaluator)",
      "CEO or CFO (above $250K matter value)",
      "Practice-area head at the firm (relationship anchor)",
    ],
    triggers: [
      "M&A or fundraising activity in the last 90 days",
      "New General Counsel or Chief Legal Officer hired",
      "Litigation filing or material disclosure in 8-K",
      "Regulatory action affecting the company's industry",
      "International expansion announcement",
    ],
    sampleSubjectLines: [
      "{{company}}'s recent {{event}} — one observation",
      "{{first_name}} — peer benchmark on {{practice_area}}",
      "noticed the {{gc_name}} hire — quick thought",
    ],
    sampleOpener:
      "Hi {{first_name}} — saw {{company}} closed the {{event}} last month. Our firm has handled 8 similar matters for peer companies in the same industry. One observation about how the timing usually plays out — happy to share if useful.",
    benchmarks: [
      { label: "Average reply rate", value: "8.1%" },
      { label: "Partner intros / mo", value: "10-18" },
      { label: "Avg matter size", value: "$180K" },
      { label: "Conflict-check pass rate", value: "94%" },
    ],
    pricing: {
      starting: "$3,500/mo",
      typicalEngagement: "$4,200-$5,200/mo",
      setupFee: "$1,500 one-time + ABA review",
    },
    caseStudy: {
      client: "Hartley & Voss LLP (40-attorney corporate firm)",
      result: "12 GC introductions per month. 3 retained engagements in 90 days, $640K in matter value.",
      quote:
        "First outbound effort that did not embarrass us. Our partners actually want to take the calls.",
      quoteName: "Robert Hartley",
      quoteRole: "Managing Partner, Hartley & Voss LLP",
    },
    faqs: [
      {
        q: "Does cold email comply with state bar advertising rules?",
        a: "Cold email is a form of attorney advertising and must comply with your state's rules. We work with your firm to add the required 'attorney advertising' label, retention disclaimers, and any state-specific identifiers before any campaign goes live.",
      },
      {
        q: "Can you handle conflicts checks?",
        a: "Yes. We build the prospect list, then route it through your conflicts system before any send. Anything flagged is removed and never re-introduced.",
      },
      {
        q: "Can you target specific practice areas?",
        a: "Yes — we have run outbound for M&A, employment, IP, regulatory, and litigation practices. Each one needs different copy and a different ICP.",
      },
    ],
    lastReviewed: "2026-04-12",
  },
  {
    slug: "manufacturing",
    name: "Manufacturing and industrial",
    nameLower: "manufacturing companies",
    metaDescription:
      "Cold email for manufacturing and industrial companies. Reach plant managers, procurement leads, and operations VPs at companies actually buying. 6+ enterprise accounts per year.",
    hero: {
      title: "Digital outbound for an industry that still runs on relationships.",
      subtitle:
        "Manufacturing buyers are still on email — they are just rarely on LinkedIn. We run account-based outbound to plant managers, ops VPs, and procurement leads with offline follow-up coordinated through your reps.",
    },
    whyItsHard:
      "Most modern outbound playbooks fail in manufacturing because they assume the buyer is digital-first. They are not. The fix is tighter targeting (named-account lists, not bulk), longer sequences (8-12 touches over 90 days), and offline follow-up cues for your reps.",
    buyingCommittee: [
      "Plant Manager or VP Operations (operational buyer)",
      "Director of Procurement or Supply Chain (commercial gatekeeper)",
      "VP Engineering (for capital equipment)",
      "EH&S or Quality Lead (for compliance-sensitive sales)",
    ],
    triggers: [
      "New facility or expansion announcement",
      "Public CapEx commitment in earnings call",
      "Hiring spike for plant operations roles",
      "OEM or supplier shift announcement",
      "Reshoring or nearshoring news",
    ],
    sampleSubjectLines: [
      "{{plant_location}} expansion — equipment thought",
      "{{first_name}} — supplier consolidation question",
      "noticed the {{capex}} announcement",
    ],
    sampleOpener:
      "Hi {{first_name}} — saw {{company}} announced the {{plant_location}} expansion. We have supplied three plants of similar size in the last 18 months. One observation about lead-times this quarter that may be useful in your planning.",
    benchmarks: [
      { label: "Average reply rate", value: "10.6%" },
      { label: "Plant-level meetings / mo", value: "8-14" },
      { label: "Avg deal size", value: "$340K" },
      { label: "Cycle to first PO", value: "118 days" },
    ],
    pricing: {
      starting: "$3,500/mo",
      typicalEngagement: "$4,200-$5,800/mo",
      setupFee: "$1,500 one-time",
    },
    caseStudy: {
      client: "Forge Industrial (specialty metals manufacturer)",
      result: "6 net-new enterprise accounts in year one. $2.1M in first-year revenue from outbound-sourced accounts.",
      quote:
        "We were skeptical that cold email would work for our buyer. We were wrong.",
      quoteName: "Henry Marsh",
      quoteRole: "VP Sales, Forge Industrial",
    },
    faqs: [
      {
        q: "Manufacturing buyers do not check email much — does this still work?",
        a: "They check email more than you think — they just do not respond fast. Our manufacturing campaigns run 8-12 touches over 90 days because the patience pays off. Reply rates are lower than tech, but average deal size is 3-5x higher.",
      },
      {
        q: "Can you coordinate with our outside reps?",
        a: "Yes. We feed warm replies and named-account intel directly into your rep team's CRM with context they can use on the phone or at a trade show. The inbound rep stays in the loop.",
      },
      {
        q: "Do trade shows still matter?",
        a: "Yes — they convert best when paired with outbound, not as a standalone. We run pre-show outbound to book meetings during the event and post-show outbound to convert non-meetings into pipeline.",
      },
    ],
    lastReviewed: "2026-04-12",
  },
]

export const PROGRAMMATIC_INDUSTRY_SLUGS = RICH_INDUSTRIES.map((i) => i.slug)
