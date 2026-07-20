/**
 * Rich city lead-gen pages — market-specific, no invented local campaign counts.
 * Frame as market knowledge + how we work with HQ teams in-region.
 */

export type CityProfile = {
  slug: string
  name: string
  region: string
  country: string
  metaTitle: string
  metaDescription: string
  verdict: string
  intro: string
  marketNotes: string[]
  commonIcps: string[]
  timing: string
  compliance: string
  playbook: { heading: string; body: string }[]
  faqs: { q: string; a: string }[]
  lastReviewed: string
}

export const CITY_PROFILES: CityProfile[] = [
  {
    slug: "new-york",
    name: "New York",
    region: "NY, USA",
    country: "United States",
    metaTitle: "B2B Lead Generation in New York | FinalOutreach",
    metaDescription:
      "Done-for-you B2B lead generation for New York–headquartered teams. Cold email + LinkedIn operators, ET send windows, and a 90-day pipeline miss clause.",
    verdict:
      "NYC buyers are flooded with polished outreach. Specificity and infrastructure beat volume.",
    intro:
      "New York concentrates finance, media, SaaS, and professional services buyers who see more cold email than almost any other US market. That density is an opportunity and a filter: generic sequences die fast. FinalOutreach runs outbound for NY-headquartered teams with Eastern-time send testing, trigger-led lists, and copy that sounds like a peer — not a Manhattan spray campaign.",
    marketNotes: [
      "High outreach noise across fintech, ads, and B2B SaaS",
      "Buyers often multi-threaded — need clarity on who you want",
      "Brand voice gets judged harder; typos and hype burn trust",
      "ET business hours still matter for first-touch opens",
    ],
    commonIcps: [
      "B2B SaaS and fintech selling into mid-market and enterprise",
      "Agencies and consultancies hunting retainer logos",
      "Infrastructure and data vendors selling to ops leaders",
    ],
    timing:
      "We test ET morning and late-afternoon windows first, then adjust to prospect time zones when your ICP is national or global.",
    compliance:
      "US CAN-SPAM basics apply: accurate from lines, physical address, working unsubscribe. We configure suppression and identity so NY-based brands do not look like fly-by-night senders.",
    playbook: [
      {
        heading: "Win with specificity, not swagger",
        body: "NY buyers have seen every “quick question” template. We lead with company-specific triggers — hiring, funding, product launches, regulatory shifts — and keep length short.",
      },
      {
        heading: "Protect the brand domain",
        body: "We never send cold volume from your primary corporate domain. Dedicated warmed domains keep your @company.com reputation intact while outbound scales.",
      },
      {
        heading: "Meetings over vanity opens",
        body: "Apple Mail Privacy Protection muddies opens in every market. We optimize for replies and qualified meetings — the metrics NY leadership actually reviews.",
      },
    ],
    faqs: [
      {
        q: "Do you only work with companies based in New York?",
        a: "No. We are remote-first. NY pages exist because many clients and prospects HQ here and search locally — the delivery model is the same global pod.",
      },
      {
        q: "Can you sell into Wall Street / finance ICPs?",
        a: "Yes, with compliance-aware copy and careful list rules. We avoid anything that looks like unlicensed financial solicitation.",
      },
      {
        q: "What does it cost?",
        a: "Done-for-you outbound starts at $3,500/mo plus a one-time infrastructure setup. Book a strategy call for a scope matched to your ACV.",
      },
    ],
    lastReviewed: "2026-07-01",
  },
  {
    slug: "san-francisco",
    name: "San Francisco",
    region: "CA, USA",
    country: "United States",
    metaTitle: "B2B Lead Generation in San Francisco | FinalOutreach",
    metaDescription:
      "Outbound for San Francisco and Bay Area teams — ICP discipline for SaaS, PT send testing, and operator-run cold email + LinkedIn.",
    verdict:
      "Bay Area outbound fails when everyone targets the same Series B titles. We narrow hard.",
    intro:
      "San Francisco and the broader Bay Area still mint SaaS buyers — and still recycle the same VP Sales / Head of Growth lists. FinalOutreach helps SF-headquartered teams escape that sameness with trigger-based ICPs, PT-aligned send windows, and infrastructure that survives aggressive volume competition.",
    marketNotes: [
      "SaaS density means brutal subject-line competition",
      "Buyers are tool-fluent — smell templates instantly",
      "Funding and hiring triggers move faster than annual planning cycles",
      "PT hours for local HQ; multi-timezone for national ICPs",
    ],
    commonIcps: [
      "B2B SaaS selling to other SaaS",
      "Devtools and infrastructure vendors",
      "AI / data platforms with long evaluation cycles",
    ],
    timing:
      "Pacific morning tests first for Bay HQ teams; we split schedules when prospects sit in ET or EMEA.",
    compliance:
      "Standard US commercial email rules. California teams should also stay clean on CCPA expectations for any form-based lead magnets on the site — outbound lists stay business-contact focused.",
    playbook: [
      {
        heading: "Triggers over firmographics alone",
        body: "Series stage is not a strategy. We layer hiring, tech installs, and product launches so the first line earns the reply.",
      },
      {
        heading: "Founder-voice without founder time",
        body: "Bay Area buyers respond to peer tone. We write like an operator, then put a human on replies — not a chatbot loop.",
      },
      {
        heading: "Short contracts to prove the motion",
        body: "SF teams move fast and hate 12-month lock-ins. Our 3-month minimum matches how Bay companies actually buy services.",
      },
    ],
    faqs: [
      {
        q: "Do you work with early-stage startups?",
        a: "Yes if ACV and offer clarity support outbound. If the product still cannot articulate a sharp pain, we will say so on the audit call.",
      },
      {
        q: "Can you sell into enterprise from an SF HQ?",
        a: "Yes. List building and messaging change; infrastructure discipline stays the same.",
      },
      {
        q: "How do you handle west-coast / east-coast ICPs?",
        a: "Separate send schedules and sometimes separate copy angles. One blast to both coasts is how placement dies.",
      },
    ],
    lastReviewed: "2026-07-01",
  },
  {
    slug: "los-angeles",
    name: "Los Angeles",
    region: "CA, USA",
    country: "United States",
    metaTitle: "B2B Lead Generation in Los Angeles | FinalOutreach",
    metaDescription:
      "Done-for-you outbound for Los Angeles B2B teams — media, agencies, SaaS, and services ICPs with PT send discipline.",
    verdict:
      "LA outbound works when you respect industry dialect — entertainment, agencies, and SaaS do not share one template.",
    intro:
      "Los Angeles mixes creative industries, agencies, e-commerce operators, and a growing SaaS pocket. Treating “LA” as one ICP is how campaigns stall. We build outbound for LA-headquartered teams with vertical-specific messaging and Pacific-time send hygiene.",
    marketNotes: [
      "Agency and media buyers expect cultural fluency",
      "E-commerce and DTC brands care about margin and channel mix",
      "SaaS still grows but competes with Bay Area noise",
      "PT windows; avoid Monday morning creative-industry dead zones",
    ],
    commonIcps: [
      "Marketing and creative agencies",
      "DTC / e-commerce operators and their vendors",
      "B2B SaaS with West Coast footprints",
    ],
    timing:
      "PT mid-morning tests for most B2B; creative industries sometimes respond better mid-week after production crunch hours.",
    compliance:
      "US CAN-SPAM standards. We keep commercial intent clear and unsubscribes honored — brand-sensitive LA companies notice sloppy identity.",
    playbook: [
      {
        heading: "Dialect matches vertical",
        body: "Agency prospects get agency language. SaaS prospects get pipeline language. We do not run one LA mega-sequence across both.",
      },
      {
        heading: "Creative ≠ gimmicky",
        body: "LA brands appreciate craft. That does not mean emoji-heavy spam. Plain-text peer notes outperform cleverness in most B2B tests we run.",
      },
      {
        heading: "LinkedIn as a precision layer",
        body: "For agency and founder-led buyers, LinkedIn compounds email. We coordinate both so the same prospect is not double-tapped with mismatched pitches.",
      },
    ],
    faqs: [
      {
        q: "Do you only serve LA companies?",
        a: "No — remote delivery worldwide. This page is for teams HQ’d in LA searching local lead-gen partners.",
      },
      {
        q: "Can you sell into entertainment studios?",
        a: "Selectively, with tight ICPs. Studio procurement is slow and relationship-driven; we will tell you if outbound is the wrong primary motion.",
      },
      {
        q: "What’s the engagement look like?",
        a: "Discovery → infrastructure → sequences → weekly optimization. Starting at $3,500/mo with a 90-day miss clause on committed targets.",
      },
    ],
    lastReviewed: "2026-07-01",
  },
  {
    slug: "chicago",
    name: "Chicago",
    region: "IL, USA",
    country: "United States",
    metaTitle: "B2B Lead Generation in Chicago | FinalOutreach",
    metaDescription:
      "Cold email and LinkedIn outbound for Chicago B2B teams — industrials, SaaS, and services with CT send windows.",
    verdict:
      "Chicago buyers reward straight talk. Skip coastal hype; lead with operational clarity.",
    intro:
      "Chicago’s B2B fabric spans industrials, logistics, financial services, and a solid SaaS corridor. Outbound that sounds like a Silicon Valley template underperforms. We write for how Midwest operators buy — clear problem, clear proof, clear ask.",
    marketNotes: [
      "Practical buyer culture — low tolerance for fluff",
      "Strong industrial and logistics decision-makers",
      "CT hours align well with national US sending",
      "Longer trust cycles in traditional industries",
    ],
    commonIcps: [
      "Industrial / manufacturing software and services",
      "Logistics and supply-chain vendors",
      "Midwest SaaS and professional services",
    ],
    timing:
      "Central Time business hours are a strong default for US-wide ICPs. We still split when prospects cluster on the coasts.",
    compliance:
      "US commercial email rules. Traditional industries often have longer legal review — we keep claims conservative and documentation ready.",
    playbook: [
      {
        heading: "Operational first lines",
        body: "We open on throughput, cost, risk, or downtime — not “synergy.” Midwest buyers reply to concrete stakes.",
      },
      {
        heading: "Patient multi-touch",
        body: "Some Chicago ICPs need more touches before a meeting. We plan sequences accordingly instead of declaring failure after email two.",
      },
      {
        heading: "Proof without theater",
        body: "Where we have permissioned metrics, we show them. Where we do not, we do not invent Midwest case studies.",
      },
    ],
    faqs: [
      {
        q: "Do you understand industrial sales cycles?",
        a: "Yes — longer evaluations, committee buying, and conservative messaging. Outbound still works when the offer is sharp.",
      },
      {
        q: "Are you local to Chicago?",
        a: "We are remote. Strategy calls land in CT-friendly slots for Midwest teams.",
      },
      {
        q: "How fast to first meetings?",
        a: "Infrastructure and list work come first. Most clients see leading indicators within the first weeks of live sending after warmup.",
      },
    ],
    lastReviewed: "2026-07-01",
  },
  {
    slug: "austin",
    name: "Austin",
    region: "TX, USA",
    country: "United States",
    metaTitle: "B2B Lead Generation in Austin | FinalOutreach",
    metaDescription:
      "Outbound for Austin startups and B2B teams — CT send testing, SaaS-heavy ICPs, and operator-run cold email.",
    verdict:
      "Austin growth culture loves speed. We match it with short contracts and weekly experiments — not 12-month theater.",
    intro:
      "Austin’s startup and SaaS density creates hungry buyers and crowded inboxes. FinalOutreach helps Austin-headquartered teams run outbound that feels native to a build-in-public market: sharp ICPs, fast iteration, and infrastructure that does not torch the brand domain.",
    marketNotes: [
      "High startup / SaaS concentration",
      "Competitive talent and vendor noise",
      "CT timezone; strong overlap with US national ICPs",
      "Founders often still in the buying committee",
    ],
    commonIcps: [
      "B2B SaaS and product-led growth companies",
      "Devtools and AI application vendors",
      "Agencies serving startup ecosystems",
    ],
    timing:
      "CT mornings for local HQ; we expand windows when selling nationally from Austin.",
    compliance:
      "US CAN-SPAM. Startup brands still need professional from-names and suppression — casual tone is fine, casual infrastructure is not.",
    playbook: [
      {
        heading: "Founder-to-founder tone",
        body: "When the buyer is a founder, we write like one — short, specific, zero corporate fog.",
      },
      {
        heading: "Experiment cadence",
        body: "Austin teams expect shipping. We run weekly subject/opener tests and kill losers quickly.",
      },
      {
        heading: "Scale without spray",
        body: "Volume comes after verification and warmup. Growing fast on a bad list is how Austin domains get burned.",
      },
    ],
    faqs: [
      {
        q: "Do you work with pre-seed / seed companies?",
        a: "Only when ACV and messaging are ready. Outbound cannot fix an unclear product.",
      },
      {
        q: "Can you sell into enterprise from Austin?",
        a: "Yes. Messaging and list sources change; the operating system stays disciplined.",
      },
      {
        q: "What’s the minimum commitment?",
        a: "Three months — enough to warm, learn, and hit a meaningful sample size.",
      },
    ],
    lastReviewed: "2026-07-01",
  },
  {
    slug: "boston",
    name: "Boston",
    region: "MA, USA",
    country: "United States",
    metaTitle: "B2B Lead Generation in Boston | FinalOutreach",
    metaDescription:
      "Cold outbound for Boston B2B — healthcare, SaaS, and edtech ICPs with ET send discipline and careful claims.",
    verdict:
      "Boston buyers skew analytical. Bring evidence, not hype — especially in health and bio-adjacent sales.",
    intro:
      "Boston pairs universities, healthcare, and B2B SaaS. That mix rewards precision and punishes overclaim. We run outbound for Boston-headquartered teams with ET timing and copy that survives skeptical technical buyers.",
    marketNotes: [
      "Healthcare and life-sciences adjacency requires careful language",
      "Strong SaaS and cybersecurity presence",
      "ET hours; academic calendars can affect some ICPs",
      "Buyers expect credible detail",
    ],
    commonIcps: [
      "Healthtech and healthcare software (non-PHI outreach)",
      "B2B SaaS and cybersecurity",
      "Professional services selling to technical leaders",
    ],
    timing:
      "Eastern business hours default. We avoid naive Monday 8am blasts into clinical-admin ICPs when patterns show mid-week strength.",
    compliance:
      "No PHI in cold email. US commercial email rules. Health-adjacent claims stay conservative — we sell meetings, not medical outcomes.",
    playbook: [
      {
        heading: "Evidence-led openers",
        body: "Boston technical buyers reply to concrete mechanisms and constraints — not vague “transformation.”",
      },
      {
        heading: "Committee-aware sequencing",
        body: "Health and enterprise deals multi-thread. We map roles early so outreach does not stall on a single champion.",
      },
      {
        heading: "Quiet brand safety",
        body: "Dedicated domains, clean identity, and restrained design keep institutional brands comfortable.",
      },
    ],
    faqs: [
      {
        q: "Can you do HIPAA-sensitive outreach?",
        a: "We outreach to business contacts with no PHI. Clinical voice is reviewed to prevent accidental sensitive content.",
      },
      {
        q: "Do you understand university / research buyers?",
        a: "Selectively. Procurement can be slow; we will say if outbound should be secondary to partnerships.",
      },
      {
        q: "Where do calls land for ET teams?",
        a: "Strategy calls are scheduled in ET-friendly windows by default.",
      },
    ],
    lastReviewed: "2026-07-01",
  },
  {
    slug: "miami",
    name: "Miami",
    region: "FL, USA",
    country: "United States",
    metaTitle: "B2B Lead Generation in Miami | FinalOutreach",
    metaDescription:
      "Outbound for Miami and South Florida B2B teams — bilingual market awareness, ET timing, and operator-run cold email.",
    verdict:
      "Miami outbound wins with international awareness — LATAM ties, finance, and hospitality tech are not one list.",
    intro:
      "Miami sits at a US–LATAM crossroads: fintech, hospitality, real estate tech, and professional services. We build outbound for Miami-headquartered teams with ET send windows and ICP splits that respect how international the buyer graph really is.",
    marketNotes: [
      "Cross-border buying relationships are common",
      "Finance and hospitality tech density",
      "ET timezone with international prospect spillover",
      "Bilingual markets — language strategy must be intentional",
    ],
    commonIcps: [
      "Fintech and payments",
      "Hospitality / travel tech",
      "Professional services with LATAM clients",
    ],
    timing:
      "ET defaults for US prospects; separate schedules when targeting LATAM time zones from a Miami HQ.",
    compliance:
      "US CAN-SPAM for US sends. Cross-border campaigns get explicit language and consent posture review before scale.",
    playbook: [
      {
        heading: "Split domestic vs cross-border",
        body: "One sequence rarely fits both. We separate US and international tracks when the ICP crosses borders.",
      },
      {
        heading: "Language with intent",
        body: "English-first is fine for many B2B ICPs. When Spanish (or other) is required, we staff copy accordingly — we do not machine-translate spam.",
      },
      {
        heading: "Infrastructure still wins",
        body: "International sending amplifies deliverability mistakes. Warmup and DNS come before volume.",
      },
    ],
    faqs: [
      {
        q: "Do you run Spanish-language campaigns?",
        a: "When the ICP requires it and we can staff quality copy. We will not ship low-grade translations just to check a box.",
      },
      {
        q: "Can you help sell into LATAM from Miami?",
        a: "Yes with clear country prioritization and compliance review. “All of LATAM” is not an ICP.",
      },
      {
        q: "Are you based in Miami?",
        a: "Remote team. We schedule around ET for South Florida HQs.",
      },
    ],
    lastReviewed: "2026-07-01",
  },
  {
    slug: "toronto",
    name: "Toronto",
    region: "ON, Canada",
    country: "Canada",
    metaTitle: "B2B Lead Generation in Toronto | FinalOutreach",
    metaDescription:
      "CASL-aware cold outbound for Toronto B2B teams — Canadian compliance posture, ET timing, and done-for-you email + LinkedIn.",
    verdict:
      "Canada is not “US outbound with a maple leaf.” CASL expectations change how we build lists and identity.",
    intro:
      "Toronto is Canada’s largest B2B hub — banks, SaaS, and professional services. FinalOutreach supports Toronto-headquartered teams with ET-aligned sending and a CASL-aware operating posture: clean identity, thoughtful list sources, and copy that does not pick unnecessary fights with Canadian anti-spam norms.",
    marketNotes: [
      "CASL shapes how Canadian businesses think about commercial email",
      "Strong fintech and SaaS corridors",
      "ET timezone shared with US East",
      "Cross-border selling into the US is common",
    ],
    commonIcps: [
      "Canadian SaaS selling domestically or into the US",
      "Fintech and financial services vendors",
      "Agencies and consultancies in the GTA",
    ],
    timing:
      "Eastern Time for GTA HQ teams; split when prospects are primarily US West or EMEA.",
    compliance:
      "We treat Canadian commercial email carefully: accurate sender identity, honor opt-outs, and document list rationale. We are not your law firm — regulated teams should have counsel review edge cases.",
    playbook: [
      {
        heading: "Compliance as brand",
        body: "Canadian buyers notice sloppy senders. Professional domains, clear unsubscribes, and restrained claims are part of win-rate — not just legal hygiene.",
      },
      {
        heading: "US expansion from Toronto",
        body: "Many clients sell south. We build separate tracks for Canadian vs US prospects when messaging or offers differ.",
      },
      {
        heading: "Banking-adjacent caution",
        body: "Financial services ICPs get conservative copy and tighter targeting. No fake urgency, no reckless claims.",
      },
    ],
    faqs: [
      {
        q: "Are you CASL compliant?",
        a: "We operate with CASL-aware practices for Canadian commercial email. For novel use cases, involve your counsel — we will collaborate, not improvise legal advice.",
      },
      {
        q: "Can you help Canadian SaaS sell into the US?",
        a: "Yes. That is a common motion. Lists, send times, and sometimes offers are split by market.",
      },
      {
        q: "Do you have Canadian phone support hours?",
        a: "Strategy calls land in ET-friendly slots for Toronto teams.",
      },
    ],
    lastReviewed: "2026-07-01",
  },
  {
    slug: "london",
    name: "London",
    region: "UK",
    country: "United Kingdom",
    metaTitle: "B2B Lead Generation in London | FinalOutreach",
    metaDescription:
      "GDPR-aware outbound for London B2B teams — UK buyer tone, GMT/BST send windows, and operator-run cold email + LinkedIn.",
    verdict:
      "London buyers expect understatement. American hype copy underperforms — we rewrite for UK register.",
    intro:
      "London remains Europe’s densest English-language B2B market: fintech, SaaS, and professional services. FinalOutreach runs outbound for London-headquartered teams with UK-appropriate tone, GMT/BST send testing, and GDPR-aware list discipline for EEA/UK prospects.",
    marketNotes: [
      "Understated tone outperforms US-style urgency",
      "Fintech and SaaS density with sophisticated buyers",
      "GMT/BST seasonality affects send clocks",
      "GDPR expectations influence how lists are built and documented",
    ],
    commonIcps: [
      "UK SaaS and fintech",
      "Professional services and consultancies",
      "US companies selling into UK from a London beachhead",
    ],
    timing:
      "UK business hours first. We add US or EMEA windows only when the ICP actually sits there.",
    compliance:
      "GDPR/UK GDPR-aware operations for relevant prospects: lawful basis thinking, suppression, and careful data sources. We coordinate with your counsel on edge cases — we do not replace them.",
    playbook: [
      {
        heading: "Rewrite the Americanisms",
        body: "Words like “crushing KPIs” and stacked exclamation marks read off-brand in UK B2B. We localize voice, not just spelling.",
      },
      {
        heading: "Document the list story",
        body: "UK/EU buyers and legal teams may ask where contacts came from. We keep sourcing rationales clean.",
      },
      {
        heading: "Multi-market without merge chaos",
        body: "London HQs often sell UK + US + EU. We separate tracks instead of one clumsy global blast.",
      },
    ],
    faqs: [
      {
        q: "Can you run GDPR-compliant cold email?",
        a: "We run GDPR-aware B2B outbound practices. Your counsel should review novel data sources or regulated verticals.",
      },
      {
        q: "Do you localize for British English?",
        a: "Yes when the ICP is UK-primary. Spelling and tone both matter.",
      },
      {
        q: "Are strategy calls in UK hours?",
        a: "We offer GMT/BST-friendly slots for London teams.",
      },
    ],
    lastReviewed: "2026-07-01",
  },
  {
    slug: "berlin",
    name: "Berlin",
    region: "Germany",
    country: "Germany",
    metaTitle: "B2B Lead Generation in Berlin | FinalOutreach",
    metaDescription:
      "Outbound for Berlin startups and German B2B teams — GDPR-aware ops, CET timing, and careful cold email craft.",
    verdict:
      "German B2B rewards precision and privacy discipline. Volume-first US playbooks struggle here.",
    intro:
      "Berlin’s startup ecosystem sits inside a German business culture that values privacy, precision, and process. We support Berlin-headquartered teams with CET send windows, GDPR-aware list practices, and copy that respects how German buyers evaluate vendors.",
    marketNotes: [
      "Strong privacy norms and GDPR sensitivity",
      "Startup scene plus traditional Mittelstand nearby",
      "CET/CEST timing",
      "English-language SaaS selling EU-wide is common",
    ],
    commonIcps: [
      "Berlin SaaS selling across EU",
      "Climate / industrial software vendors",
      "Marketplaces and B2B platforms",
    ],
    timing:
      "Central European mornings for local prospects; separate tracks for UK or US expansion.",
    compliance:
      "GDPR-aware B2B outbound: careful sourcing, suppression, and conservative messaging. Legal review recommended for aggressive scraping models — we avoid those.",
    playbook: [
      {
        heading: "Precision over personality hacks",
        body: "Gimmick personalization underperforms. Clear problem statements and credible specifics win.",
      },
      {
        heading: "Language strategy",
        body: "Many Berlin SaaS buyers operate in English. When German is required, we staff properly — we do not ship broken machine copy.",
      },
      {
        heading: "EU expansion hygiene",
        body: "Country-by-country prioritization beats “all EU” lists that destroy placement.",
      },
    ],
    faqs: [
      {
        q: "Do you send German-language email?",
        a: "When needed and quality-controlled. English-first is fine for many SaaS ICPs.",
      },
      {
        q: "How do you handle GDPR?",
        a: "GDPR-aware processes and documentation. Your DPO/counsel stays in the loop for edge cases.",
      },
      {
        q: "Can you help a Berlin company sell into the US?",
        a: "Yes — with separate messaging and send schedules.",
      },
    ],
    lastReviewed: "2026-07-01",
  },
  {
    slug: "amsterdam",
    name: "Amsterdam",
    region: "Netherlands",
    country: "Netherlands",
    metaTitle: "B2B Lead Generation in Amsterdam | FinalOutreach",
    metaDescription:
      "Outbound for Amsterdam and Dutch B2B teams — English-fluent buyers, CET timing, GDPR-aware cold email ops.",
    verdict:
      "Dutch buyers are direct and English-fluent. Reward clarity; punish fluff.",
    intro:
      "Amsterdam punches above its weight in European SaaS, fintech, and marketplaces. Buyers are typically English-comfortable and allergic to vague positioning. We run outbound for Amsterdam-headquartered teams with CET timing and GDPR-aware ops.",
    marketNotes: [
      "High English proficiency in B2B",
      "Direct communication culture",
      "Strong SaaS / fintech / marketplace presence",
      "CET hub for broader Benelux outreach",
    ],
    commonIcps: [
      "Dutch SaaS and fintech",
      "Marketplaces and logistics tech",
      "US companies using Amsterdam as EU HQ",
    ],
    timing:
      "CET business hours for Benelux; add UK or US tracks only when ICP geography demands it.",
    compliance:
      "GDPR-aware B2B outbound. Dutch organizations often have mature privacy expectations — we keep sourcing and identity clean.",
    playbook: [
      {
        heading: "Be blunt",
        body: "Dutch business culture rewards direct asks. We cut hedging language that US templates lean on.",
      },
      {
        heading: "Benelux without laziness",
        body: "NL/BE/LU can share a motion — but lists and offers still need country sense-checks.",
      },
      {
        heading: "EU HQ patterns",
        body: "Many US companies run EU sales from Amsterdam. We align outbound with that beachhead strategy.",
      },
    ],
    faqs: [
      {
        q: "Is English copy enough for the Netherlands?",
        a: "Often yes in SaaS/fintech. We confirm per ICP before assuming.",
      },
      {
        q: "Can you cover Belgium from an Amsterdam program?",
        a: "Yes with intentional list splits — not one careless Benelux dump.",
      },
      {
        q: "What are call times for CET?",
        a: "We offer Central European–friendly strategy slots.",
      },
    ],
    lastReviewed: "2026-07-01",
  },
  {
    slug: "dubai",
    name: "Dubai",
    region: "UAE",
    country: "United Arab Emirates",
    metaTitle: "B2B Lead Generation in Dubai | FinalOutreach",
    metaDescription:
      "Outbound for Dubai and UAE B2B teams — GST timezone strategy, regional buyer etiquette, and operator-run cold email.",
    verdict:
      "Dubai outbound succeeds with relationship-aware messaging and realistic geography — not generic US templates.",
    intro:
      "Dubai concentrates regional HQs across tech, logistics, finance, and professional services. FinalOutreach helps Dubai-headquartered teams run outbound with Gulf-appropriate tone, GST send windows, and clear ICP geography across MENA and beyond.",
    marketNotes: [
      "Regional HQ density for MENA expansion",
      "Relationship-sensitive buying cultures",
      "GST timezone; prospects may span Europe and Asia",
      "English commonly used in B2B; Arabic when required",
    ],
    commonIcps: [
      "Tech and SaaS regional HQs",
      "Logistics and trade vendors",
      "Professional services selling across GCC",
    ],
    timing:
      "Gulf business hours for local ICPs; separate tracks for Europe or APAC prospects.",
    compliance:
      "We follow careful commercial-email practices and local brand sensitivity. Regulated sectors get conservative claims and counsel involvement when needed.",
    playbook: [
      {
        heading: "Respect the relationship layer",
        body: "Hard-sell urgency reads poorly. We lead with relevance and a low-friction ask.",
      },
      {
        heading: "Define “MENA” properly",
        body: "Country prioritization beats a vague regional spray. We build lists market by market.",
      },
      {
        heading: "Infrastructure still matters",
        body: "Regional sending does not excuse weak DNS. Warmup and dedicated domains remain non-negotiable.",
      },
    ],
    faqs: [
      {
        q: "Do you send Arabic campaigns?",
        a: "When the ICP requires it and we can quality-control copy. Many Dubai B2B motions run in English.",
      },
      {
        q: "Can you help a Dubai HQ sell into Europe?",
        a: "Yes with separate compliance and messaging tracks.",
      },
      {
        q: "Are you on Gulf time for calls?",
        a: "We offer GST-friendly meeting windows for UAE teams.",
      },
    ],
    lastReviewed: "2026-07-01",
  },
  {
    slug: "singapore",
    name: "Singapore",
    region: "Singapore",
    country: "Singapore",
    metaTitle: "B2B Lead Generation in Singapore | FinalOutreach",
    metaDescription:
      "Outbound for Singapore B2B teams — APAC hub strategy, SGT timing, and disciplined cold email + LinkedIn ops.",
    verdict:
      "Singapore is an APAC springboard. Treat it as a hub strategy — not a single-city spray list.",
    intro:
      "Singapore hosts regional HQs selling across SEA and broader APAC. FinalOutreach supports Singapore-headquartered teams with SGT send discipline, English-first B2B copy, and market-by-market list building instead of a lazy “Asia” blast.",
    marketNotes: [
      "Regional HQ pattern for SEA expansion",
      "High English proficiency in B2B",
      "SGT timing; prospects across SEA time zones",
      "Sophisticated, efficiency-minded buyers",
    ],
    commonIcps: [
      "SaaS and fintech regional HQs",
      "Logistics and trade tech",
      "US/EU companies using Singapore as APAC base",
    ],
    timing:
      "SGT mornings for local; staggered windows when targeting Indonesia, Australia, or India-heavy ICPs.",
    compliance:
      "Careful commercial email practices and clean identity. Cross-border SEA campaigns get explicit market prioritization.",
    playbook: [
      {
        heading: "Hub, then spoke",
        body: "Win the Singapore motion, then expand country by country. Parallelizing five SEA markets on day one destroys learning speed.",
      },
      {
        heading: "Concise professionalism",
        body: "Buyers here are busy and bilingual-capable. Short, specific emails outperform long narratives.",
      },
      {
        heading: "LinkedIn compounds in APAC tech",
        body: "We coordinate LinkedIn with email for regional tech buyers who live on both.",
      },
    ],
    faqs: [
      {
        q: "Can you cover all of SEA from Singapore?",
        a: "Sequentially, yes. Simultaneously without prioritization, no — that is how quality dies.",
      },
      {
        q: "Do you localize for each SEA market?",
        a: "Messaging and lists adapt per country. Language localization happens when quality can be maintained.",
      },
      {
        q: "Call times for SGT?",
        a: "We offer Singapore-friendly strategy slots.",
      },
    ],
    lastReviewed: "2026-07-01",
  },
  {
    slug: "sydney",
    name: "Sydney",
    region: "Australia",
    country: "Australia",
    metaTitle: "B2B Lead Generation in Sydney | FinalOutreach",
    metaDescription:
      "Outbound for Sydney and Australian B2B teams — AEST timing, local tone, and operator-run cold email + LinkedIn.",
    verdict:
      "Australian buyers want straight talk and local awareness — US midnight sends and hype tone fail here.",
    intro:
      "Sydney anchors Australian B2B across SaaS, finance, and professional services. FinalOutreach runs outbound for Sydney-headquartered teams with AEST/AEDT send windows and copy that respects Australian register — direct, unfussy, and light on imported US sales clichés.",
    marketNotes: [
      "Geographic isolation makes timezone discipline critical",
      "Direct, informal-professional tone",
      "AEST/AEDT seasonality",
      "Often selling ANZ first, then wider APAC",
    ],
    commonIcps: [
      "Australian SaaS and fintech",
      "Professional services across ANZ",
      "Global vendors with Sydney offices",
    ],
    timing:
      "Australian business hours for ANZ prospects. US or EU prospects get separate schedules — never one global send.",
    compliance:
      "Australian Spam Act awareness for commercial email: clear identification and unsubscribe. We keep identity and suppression tight.",
    playbook: [
      {
        heading: "Kill the US midnight blast",
        body: "If your sequencer still sends from US hours into Sydney inboxes, fix that before rewriting copy.",
      },
      {
        heading: "ANZ then expand",
        body: "Prove messaging in Australia/NZ before pouring into broader APAC lists.",
      },
      {
        heading: "Tone audit",
        body: "We strip exaggerated urgency and keep asks human. Australian B2B notices try-hard copy.",
      },
    ],
    faqs: [
      {
        q: "Do you understand Australian spam rules?",
        a: "We operate with Spam Act–aware practices for commercial email. Edge cases go through your counsel.",
      },
      {
        q: "Can you sell into NZ from Sydney?",
        a: "Yes with intentional list building — not an afterthought append.",
      },
      {
        q: "Are calls available in AEST?",
        a: "Yes — we schedule Australia-friendly strategy windows.",
      },
    ],
    lastReviewed: "2026-07-01",
  },
  {
    slug: "sao-paulo",
    name: "São Paulo",
    region: "Brazil",
    country: "Brazil",
    metaTitle: "B2B Lead Generation in São Paulo | FinalOutreach",
    metaDescription:
      "Outbound for São Paulo B2B teams — BRT timing, Portuguese/English strategy, and disciplined cold email ops for Brazil’s largest market.",
    verdict:
      "Brazil’s largest B2B market needs language intent and local timing — not a translated US sequence.",
    intro:
      "São Paulo is Latin America’s core B2B engine: fintech, SaaS, industrials, and professional services. FinalOutreach supports SP-headquartered teams with BRT send windows and a deliberate Portuguese vs English strategy — quality-controlled, never slapdash machine translation at scale.",
    marketNotes: [
      "Portuguese-first for many domestic ICPs",
      "English-ok for some multinational and SaaS buyers",
      "BRT timezone; large domestic market gravity",
      "Relationship and trust cues matter in copy",
    ],
    commonIcps: [
      "Brazilian SaaS and fintech",
      "Industrial and logistics vendors",
      "Regional HQs selling across Brazil",
    ],
    timing:
      "Brasília Time business hours for domestic ICPs. Separate tracks for US/EU expansion.",
    compliance:
      "Careful commercial email practices and clean identity. Local regulated sectors get conservative messaging and counsel involvement when required.",
    playbook: [
      {
        heading: "Language is a product decision",
        body: "We pick Portuguese or English per ICP segment. Mixing randomly trains spam filters and confuses buyers.",
      },
      {
        heading: "Domestic scale is huge",
        body: "Brazil alone can fill a pipeline. We prioritize states/segments instead of boiling the ocean.",
      },
      {
        heading: "Infrastructure before volume",
        body: "High domestic volume ambitions make warmup and list verification non-optional.",
      },
    ],
    faqs: [
      {
        q: "Do you run Portuguese campaigns?",
        a: "Yes when quality-controlled copy is available for the ICP. We will not ship broken translations.",
      },
      {
        q: "Can you help a Brazilian company sell into the US?",
        a: "Yes with a separate English track, US send times, and US-appropriate positioning.",
      },
      {
        q: "Call times for BRT?",
        a: "We offer Brazil-friendly strategy slots.",
      },
    ],
    lastReviewed: "2026-07-01",
  },
]

export function getCity(slug: string) {
  return CITY_PROFILES.find((c) => c.slug === slug)
}
