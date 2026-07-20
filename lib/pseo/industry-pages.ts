/**
 * Rich /industries/[slug] content — unique per vertical.
 * Honest operator copy only: no invented named quotes or unverifiable $ pipeline claims.
 * Nav mega + footer should derive from INDUSTRY_PAGE_PROFILES so pages cannot be omitted.
 */

export type IndustryPageProfile = {
  slug: string
  name: string
  nameLower: string
  /** Short label shown in mega-nav */
  navTitle: string
  navSubtitle: string
  metaTitle: string
  metaDescription: string
  headline: string
  verdict: string
  intro: string
  painPoints: string[]
  approach: string
  /** Honest focus signal — not a fabricated pipeline dollar figure */
  focus: { value: string; label: string }
  buyingSignals: string[]
  playbook: { heading: string; body: string }[]
  whatWeWontDo: string[]
  faqs: { q: string; a: string }[]
  /** Related /cold-email-for slug when a deeper cold-email page exists */
  relatedColdEmailFor?: string
  lastReviewed: string
}

export const INDUSTRY_PAGE_PROFILES: IndustryPageProfile[] = [
  {
    slug: "saas",
    name: "B2B SaaS",
    nameLower: "B2B SaaS companies",
    navTitle: "B2B SaaS",
    navSubtitle: "Pipeline for teams racing the next funding milestone.",
    metaTitle: "Cold Email & Lead Generation for B2B SaaS | FinalOutreach",
    metaDescription:
      "Done-for-you outbound for B2B SaaS: ICP lists from funding and hiring signals, senior-voice copy, and reply handling aimed at qualified demos — not lead dumps.",
    headline: "Pipeline for SaaS teams that need to beat the next funding milestone.",
    verdict:
      "SaaS outbound dies when lists chase one persona and copy sounds like a product page. We map the committee and write like a peer.",
    intro:
      "Most SaaS teams do not fail outbound because they lack a sequencer. They fail because the list is one title deep, the copy sells features, and nobody owns replies. FinalOutreach runs cold email and LinkedIn for B2B SaaS so founders and CROs wake up to qualified conversations — not another dashboard of vanity opens.",
    painPoints: [
      "CAC climbs while paid channels saturate and SDR ramp stays slow",
      "Lists hit one persona while five other people block the deal",
      "Product-led copy reads like a landing page, not a peer note",
      "Reply piles rot because no one qualifies and books",
    ],
    approach:
      "We build ICP lists from funding round, tech stack, and hiring signals, then run a multi-touch sequence across cold email and LinkedIn. Copy is written for the commercial sponsor and the operator who feels the pain — not a generic “quick question.” Reply handling is briefed on your category before the first send.",
    focus: {
      value: "Series A–C",
      label: "Typical stage we run outbound for — defined ICP, $20K+ ACV",
    },
    buyingSignals: [
      "Recent funding or pricing-page / product-line changes",
      "VP Sales, CRO, or RevOps hired in the last 60–90 days",
      "Open roles for SDRs, AEs, or customer success at scale",
      "Competitor stack signals visible on careers or tool pages",
    ],
    playbook: [
      {
        heading: "Committee-aware targeting",
        body: "We do not spray “Head of Growth” and hope. Lists are built around who evaluates, who sponsors budget, and who can kill a pilot — then sequences speak to each role without sounding like seven different companies.",
      },
      {
        heading: "Proof without hype",
        body: "SaaS buyers have seen every “10x pipeline” claim. We lead with a specific observation about their stage, stack, or hire — and a low-friction ask that earns a calendar slot.",
      },
      {
        heading: "Operate the inbox",
        body: "Opens do not pay payroll. We handle positive, neutral, and soft-no replies so your AEs only see meetings that match the ICP you approved.",
      },
    ],
    whatWeWontDo: [
      "Pre-revenue or undefined-ICP outbound sold as a growth engine",
      "Spray lists bought once and never refreshed",
      "Sending cold volume from your primary corporate domain",
    ],
    faqs: [
      {
        q: "Do you replace our SDR team?",
        a: "Usually we sit beside them — or cover outbound while you hire. We own infrastructure, lists, copy, and reply qualification. Your AEs own the demo.",
      },
      {
        q: "Which tools do you run?",
        a: "Sequencers in the Instantly / Smartlead class, enrichment, and LinkedIn tools as needed. You buy outcomes and operators — not another login to babysit.",
      },
      {
        q: "How do you measure success?",
        a: "Qualified meetings and pipeline conversations that match the ICP we locked in writing — with a 90-day miss clause on committed targets.",
      },
    ],
    relatedColdEmailFor: "saas-companies",
    lastReviewed: "2026-07-20",
  },
  {
    slug: "agencies",
    name: "Marketing agencies",
    nameLower: "marketing agencies",
    navTitle: "Marketing agencies",
    navSubtitle: "Retainer growth without hiring another biz-dev lead.",
    metaTitle: "Lead Generation for Marketing Agencies | FinalOutreach",
    metaDescription:
      "Outbound for marketing agencies that need retainer pipeline without burning brand reputation — trigger-led lists, positioning-first copy, and weekly reply ops.",
    headline: "Retainer growth without hiring another biz-dev lead.",
    verdict:
      "Agencies sell growth for clients while their own pipeline runs on referrals. We make outbound a quiet weekly system — not a reputation risk.",
    intro:
      "When delivery is full, biz-dev is the first thing that slips. When delivery dips, panic outbound burns domains and brand. We run a steady outbound engine for agencies: lists tied to real buying moments, copy that sounds like a peer operator, and reply handling that protects how you show up in the market.",
    painPoints: [
      "Referrals plateau and feast-or-famine cash flow returns",
      "Founders hate sounding salesy — so nothing ships for weeks",
      "DIY tools burn sending reputation the agency cannot afford",
      "Retainer churn needs replacement pipeline before the hole shows",
    ],
    approach:
      "Positioning-first outreach to ops, growth, and marketing leaders at companies that just raised, hired a CMO, or publicly signaled a channel rebuild. Sequences stay short, specific, and human — the opposite of “we help brands scale.”",
    focus: {
      value: "Retainers",
      label: "Built for agencies selling ongoing work — not one-off project spam",
    },
    buyingSignals: [
      "Funding announcements or new CMO / VP Marketing hires",
      "Careers pages hiring for growth, content, or paid roles",
      "Public launches that imply bandwidth or channel gaps",
      "Category shifts (privacy, AI tooling, retail media) buyers must respond to",
    ],
    playbook: [
      {
        heading: "Sell the outcome you already prove for clients",
        body: "Your outbound should look like a case of your craft — tight ICP, clean infrastructure, and copy that respects the reader. If your own funnel is sloppy, sophisticated buyers notice.",
      },
      {
        heading: "Protect the agency domain",
        body: "Cold volume never leaves from the primary client-facing domain. Dedicated warmed domains keep @agency.com reputation intact while pipeline compounds.",
      },
      {
        heading: "Book discovery, not pitches",
        body: "Agency buyers hate being pitched mid-email. We aim for a short diagnostic call with a clear fit filter — then your team runs the chemistry.",
      },
    ],
    whatWeWontDo: [
      "Generic “we grow brands” sequences that could belong to any shop",
      "Buying recycled agency lead lists that every competitor already hit",
      "Volume goals that ignore brand risk",
    ],
    faqs: [
      {
        q: "Will this conflict with how we pitch clients?",
        a: "It should reinforce it. We mirror the standards you sell — deliverability hygiene, ICP clarity, and human copy — so your outbound becomes proof, not a liability.",
      },
      {
        q: "Can you target a narrow niche we serve?",
        a: "Yes. Niche agencies usually win faster because the list and language get sharper. Bring the niche; we build the system around it.",
      },
      {
        q: "How fast until meetings?",
        a: "Infrastructure and list build come first. Most agency clients see qualified conversations once domains are warm and the first ICP slice is live — timeline depends on starting from zero vs an existing stack.",
      },
    ],
    relatedColdEmailFor: "marketing-agencies",
    lastReviewed: "2026-07-20",
  },
  {
    slug: "consulting",
    name: "Consulting firms",
    nameLower: "consulting firms",
    navTitle: "Consulting firms",
    navSubtitle: "Senior-voice outreach to decision-makers, not gatekeepers.",
    metaTitle: "Outbound Lead Generation for Consulting Firms | FinalOutreach",
    metaDescription:
      "Senior-voice cold outreach for consulting firms — trigger-led account lists, partner-grade copy, and LinkedIn-assisted sequences that reach decision-makers.",
    headline: "Senior-level conversations with decision-makers, not gatekeepers.",
    verdict:
      "Consulting pipeline needs patience and stature. Spammy cadence destroys trust; silence destroys utilization. We hold the middle.",
    intro:
      "Partners cannot live in a sequencer, and junior SDRs often cannot sound like partners. FinalOutreach runs outbound for consulting firms with senior-voice copy, tight account lists, and a cadence that respects long cycles — so utilization stays healthy without turning your brand into a cold-email mill.",
    painPoints: [
      "Long cycles need steady top-of-funnel while delivery consumes partners",
      "Gatekeepers filter anything that sounds mass-produced",
      "Cold email “sounds spammy” — yours cannot afford to",
      "Proposal volume swings with network luck, not a system",
    ],
    approach:
      "LinkedIn-aware, email-led sequences to decision-makers at accounts hitting trigger criteria — leadership changes, transformation programs, funding, or public operational stress. Copy is written as a peer observation, not a capability brochure.",
    focus: {
      value: "Partners",
      label: "Copy and cadence designed for partner-led selling motions",
    },
    buyingSignals: [
      "New PE ownership or transformation mandate",
      "Executive hires in ops, finance, or digital",
      "Public filings or news implying cost, risk, or growth pressure",
      "RFP culture where early relationship still wins the room",
    ],
    playbook: [
      {
        heading: "Sound like the room you want to enter",
        body: "Consulting buyers forgive a short email. They do not forgive a junior tone. We write like someone who has sat in the same meetings — specific, calm, and light on adjectives.",
      },
      {
        heading: "Accounts over sprays",
        body: "Named-account slices beat giant lists. We refresh ICP as your practice focus shifts — industry, deal size, geography — instead of locking a stale CSV for a year.",
      },
      {
        heading: "Protect the long game",
        body: "Sequences are longer and lighter than SaaS demo blasts. Soft nos stay warm; hard nos get suppressed. Your brand equity is part of the deliverable.",
      },
    ],
    whatWeWontDo: [
      "High-volume blast plays that cheapen a premium practice brand",
      "Copy that lists every service line in one email",
      "Measuring success only by raw reply count",
    ],
    faqs: [
      {
        q: "Can partners approve copy before send?",
        a: "Yes. Most consulting clients approve voice and claims in week one. After that we iterate inside the agreed guardrails.",
      },
      {
        q: "Do you do LinkedIn only?",
        a: "We usually combine LinkedIn touches with email. Pure LinkedIn can work for ultra-high ACV, but email still carries volume and logging for most practices.",
      },
      {
        q: "What does a qualified meeting mean here?",
        a: "A conversation with budget influence or problem ownership for a mandate that matches your practice — not an informational coffee with no path to work.",
      },
    ],
    relatedColdEmailFor: "consulting-firms",
    lastReviewed: "2026-07-20",
  },
  {
    slug: "fintech",
    name: "Fintech",
    nameLower: "fintech companies",
    navTitle: "Fintech",
    navSubtitle: "Compliance-friendly outbound for trust-first buyers.",
    metaTitle: "Cold Email for Fintech Companies | FinalOutreach",
    metaDescription:
      "Trust-first outbound for fintech: compliance-aware infrastructure, proof-led copy, and buying-committee targeting for risk-sensitive buyers.",
    headline: "Trust-first outbound for a trust-first industry.",
    verdict:
      "Fintech buyers punish hype and sloppy sending. Infrastructure and claims discipline matter as much as the offer.",
    intro:
      "Fintech outbound is not “SaaS copy with a bank logo.” Security reviews, compliance language, and peer proof shape every reply. We run outbound that stays inside those constraints — warmed domains, careful claims, and sequences aimed at operators who feel the pain without triggering risk teams early.",
    painPoints: [
      "Compliance and security reviews stretch cycles and kill weak messaging",
      "Buyers trust peers more than vendor adjectives",
      "Tooling choices get blocked by IT and risk before a demo happens",
      "Generic growth-agency tactics look reckless in regulated contexts",
    ],
    approach:
      "Compliance-aware infrastructure, proof-led copy, and committee mapping across commercial and risk stakeholders. We avoid overclaiming and keep CTAs appropriate for how fintech teams actually evaluate vendors.",
    focus: {
      value: "Trust",
      label: "Claims, sending hygiene, and proof framing built for regulated buyers",
    },
    buyingSignals: [
      "New product launches or licensing footprint expansion",
      "Risk, fraud, or ops leadership hires",
      "Funding that implies go-to-market acceleration",
      "Public incidents or regulation shifts that create urgency without fear-mongering",
    ],
    playbook: [
      {
        heading: "Earn the right to a meeting",
        body: "First touches lead with a concrete observation and a credible reason to talk — not “quick chat?” We keep language precise so legal and risk can live with a forwarded thread.",
      },
      {
        heading: "Separate brand from cold volume",
        body: "Dedicated sending domains, authentication, and warmup are non-negotiable. Your primary domain stays clean for customers, investors, and auditors.",
      },
      {
        heading: "Route replies with judgment",
        body: "Curious analysts are not the same as commercial sponsors. We qualify before we put time on a founder or enterprise AE calendar.",
      },
    ],
    whatWeWontDo: [
      "Aggressive scarcity tactics that look manipulative in finance",
      "Ignoring unsubscribe and identity basics",
      "Promising outcomes we cannot defend in a security review",
    ],
    faqs: [
      {
        q: "Can you work within our compliance review?",
        a: "Yes. We share infrastructure practices, claim guidelines, and sample copy early. If a claim cannot clear review, we rewrite — we do not “hope it lands.”",
      },
      {
        q: "Do you sell into banks and fintech startups?",
        a: "Both, when ICP is clear. Bank cycles are longer; startup cycles are faster but noisier. The playbook changes with the buyer, not just the logo.",
      },
      {
        q: "What proof do you show?",
        a: "We point to permissioned live metrics on /results and walk dashboards on strategy calls. We do not invent named fintech case quotes for marketing pages.",
      },
    ],
    relatedColdEmailFor: "fintech-companies",
    lastReviewed: "2026-07-20",
  },
  {
    slug: "healthtech",
    name: "Healthtech",
    nameLower: "healthtech startups",
    navTitle: "Healthtech",
    navSubtitle: "Pilot-first sequences for provider and payer committees.",
    metaTitle: "Lead Generation for Healthtech | FinalOutreach",
    metaDescription:
      "Outbound for healthtech sellers: clinical-aware copy, buying-committee mapping, and pilot-first CTAs for provider and payer environments.",
    headline: "Reach provider and payer buyers without sounding reckless.",
    verdict:
      "Healthtech outbound fails when it ignores committees and asks for a hard close too early. Pilots open doors; hype closes them.",
    intro:
      "Provider and payer buyers move carefully. Clinical voice, procurement reality, and pilot framing matter more than clever subject lines. We run outbound that respects that pace — mapping committees, leading with a low-risk next step, and keeping infrastructure clean enough that IT does not bounce you on sight.",
    painPoints: [
      "Long procurement with clinical and admin stakeholders in the same deal",
      "Generic SaaS-style email gets treated as risk, not relevance",
      "You need pilots and champions, not vanity demos",
      "Founders under-send because every word feels regulated",
    ],
    approach:
      "Clinical-aware, non-hype copy; buying-committee mapping; and CTAs aimed at a scoped pilot or working session — not “book a demo this week” for a twelve-month cycle.",
    focus: {
      value: "Pilots",
      label: "Sequences built to earn a scoped evaluation — not a forced close",
    },
    buyingSignals: [
      "New clinical informatics or ops leadership",
      "Public quality, staffing, or capacity pressures",
      "Funding or partnership announcements that expand footprint",
      "Tech stack changes visible through hiring or RFPs",
    ],
    playbook: [
      {
        heading: "Write for the champion and the skeptic",
        body: "One email rarely converts a full committee. We design threads that a champion can forward without embarrassment — clear problem, clear ask, no medical overclaim.",
      },
      {
        heading: "Patience as a feature",
        body: "Cadence is longer than typical SaaS. We stay present without nagging, and we suppress when “not now” is really “not ever.”",
      },
      {
        heading: "Keep identity boring (in a good way)",
        body: "Authentication, consistent from-lines, and dedicated domains reduce the chance IT treats you like a phishing pattern.",
      },
    ],
    whatWeWontDo: [
      "Fear-based clinical claims we cannot support",
      "Treating hospital systems like SMB SaaS demos",
      "Skipping suppression hygiene",
    ],
    faqs: [
      {
        q: "Do you handle HIPAA concerns in email?",
        a: "Cold outbound should not include protected health information. We keep messaging commercial and operational. Any PHI workflows live in your approved systems — not in first-touch cold email.",
      },
      {
        q: "Can you sell to payers and providers?",
        a: "Yes, with separate ICPs. Mixing them in one sequence is how relevance dies. We split lists and language.",
      },
      {
        q: "What does success look like?",
        a: "Champions identified, pilots scoped, and meetings with people who can advance evaluation — measured against the ICP we agreed up front.",
      },
    ],
    relatedColdEmailFor: "healthtech-startups",
    lastReviewed: "2026-07-20",
  },
  {
    slug: "b2b-services",
    name: "B2B services",
    nameLower: "B2B service providers",
    navTitle: "B2B services",
    navSubtitle: "Steady pipeline for retainer and project firms.",
    metaTitle: "Lead Generation for B2B Service Firms | FinalOutreach",
    metaDescription:
      "Done-for-you outbound for B2B service providers — weekly pipeline while delivery runs, trigger-led lists, and senior-voice copy for retainer and project sales.",
    headline: "Predictable pipeline for firms that sell retainers or projects.",
    verdict:
      "Service firms do not need more “hustle.” They need a weekly outbound system that survives busy delivery weeks.",
    intro:
      "When client work is heavy, business development stops. When client work is light, panic outreach starts. That rhythm is why service firms plateau. FinalOutreach runs a calm, always-on outbound engine for B2B service providers — IT services, managed providers, specialized operators, and professional services firms that sell expertise on retainers or scoped projects.",
    painPoints: [
      "Delivery eats the calendar; BD becomes a leftover task",
      "Word of mouth plateaus and churn shows up as a cliff",
      "Founders hate outbound that sounds like a call center",
      "Project firms feast after a win, then starve for ninety days",
    ],
    approach:
      "A two-channel engine (email + LinkedIn touches) that keeps moving every week. Lists refresh on hiring, contract, tech, and growth signals. Copy sounds like a peer operator offering a sharp observation — not a brochure of every service SKU.",
    focus: {
      value: "Weekly",
      label: "Designed to run during delivery weeks — not only when the pipeline is empty",
    },
    buyingSignals: [
      "New leadership in ops, IT, finance, or procurement",
      "Hiring spikes that imply capacity or systems stress",
      "Funding, expansion, or M&A that creates vendor reopenings",
      "Public tech or compliance changes your service line addresses",
    ],
    playbook: [
      {
        heading: "One offer per sequence",
        body: "Service firms love listing twelve capabilities. Buyers ignore that. Each campaign leads with one problem and one next step — then we rotate offers across quarters.",
      },
      {
        heading: "Replace feast-or-famine with a floor",
        body: "The goal is not a viral week. It is a floor of qualified conversations that keeps utilization and cash flow from swinging violently.",
      },
      {
        heading: "Make BD survive delivery",
        body: "We own list ops, sending, and reply triage. Your principals step in when a conversation is real — not when a CSV needs cleaning.",
      },
    ],
    whatWeWontDo: [
      "Spray “we do IT services” to every company with an email",
      "Measuring success only by meetings with no ICP fit",
      "Locking you into a twelve-month contract before proof",
    ],
    faqs: [
      {
        q: "We already get referrals. Why outbound?",
        a: "Referrals are wonderful and unpredictable. Outbound is the floor under referrals — especially when a key client churns or a partner goes quiet.",
      },
      {
        q: "Will this work for specialized niches?",
        a: "Specialized niches usually work better. The tighter the ICP, the sharper the copy and the higher the meeting quality.",
      },
      {
        q: "Do you book for us or hand off replies?",
        a: "We qualify and book against the criteria you set. You own the sales conversation once it is on the calendar.",
      },
    ],
    lastReviewed: "2026-07-20",
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    nameLower: "manufacturing companies",
    navTitle: "Manufacturing",
    navSubtitle: "Account-based outbound for industrial buyers.",
    metaTitle: "B2B Lead Generation for Manufacturing | FinalOutreach",
    metaDescription:
      "Account-based outbound for manufacturing and industrial sellers — plant, procurement, and ops targeting with longer cadences and offline follow-up cues.",
    headline: "Digital outbound for an industry that still runs on relationships.",
    verdict:
      "Manufacturing buyers are not “anti-email.” They are anti-noise. Named accounts and patience beat spray volume.",
    intro:
      "Trade shows and relationships still matter in manufacturing — and they are no longer enough on their own. FinalOutreach runs account-based outbound for industrial and manufacturing sellers: plant managers, procurement leads, and operations VPs on named lists, with longer sequences and clear handoffs so your reps can follow up offline when a thread goes warm.",
    painPoints: [
      "Trade shows and referrals cannot fill the year alone",
      "Best buyers are not living in LinkedIn all day",
      "Long cycles need always-on presence without sounding desperate",
      "Modern SaaS outbound tactics feel tone-deaf on the plant floor",
    ],
    approach:
      "Named-account lists over bulk databases. Longer touch patterns. Copy that respects operational reality — downtime, procurement process, and multi-site complexity — plus cues for your sales team when a human follow-up will close the loop.",
    focus: {
      value: "Accounts",
      label: "Named-account outbound — not spray-and-pray industrial lists",
    },
    buyingSignals: [
      "Capex or expansion announcements",
      "New plant leadership or procurement ownership",
      "Quality, safety, or capacity public signals",
      "Supplier consolidation or nearshoring moves",
    ],
    playbook: [
      {
        heading: "Write for operators, not growth Twitter",
        body: "Skip the startup slang. Be specific about the operational problem you solve and why now — a line change, a cost pressure, a compliance deadline.",
      },
      {
        heading: "Expect slower replies, higher stakes",
        body: "Reply rates can look quieter than tech. Deal sizes and account value often do not. We optimize for the right conversations, not vanity reply %.",
      },
      {
        heading: "Bridge digital to field",
        body: "When a thread warms, your reps should know who to call and what was already said. We keep that context clean.",
      },
    ],
    whatWeWontDo: [
      "Buying giant “manufacturing email” dumps with no account logic",
      "Twelve-touch weekly spam that trains buyers to ignore you",
      "Ignoring how procurement actually awards work",
    ],
    faqs: [
      {
        q: "Do plant managers even read email?",
        a: "More than stereotypes suggest — they just do not reply fast. Longer cadences and sharp relevance matter more than daily nudges.",
      },
      {
        q: "Can you support multi-site account lists?",
        a: "Yes. We structure lists by site and role when that is how you sell, and we keep suppression so the same VP is not hit three ways at once.",
      },
      {
        q: "How does this sit next to distributors or reps?",
        a: "We can target end buyers, channel partners, or both — with separate messaging so you do not create channel conflict by accident.",
      },
    ],
    relatedColdEmailFor: "manufacturing",
    lastReviewed: "2026-07-20",
  },
  {
    slug: "real-estate",
    name: "Commercial real estate",
    nameLower: "commercial real estate firms",
    navTitle: "Commercial real estate",
    navSubtitle: "Trigger-led deal flow without stale broker lists.",
    metaTitle: "Lead Generation for Commercial Real Estate | FinalOutreach",
    metaDescription:
      "Outbound for CRE brokers and firms — trigger-led targeting (funding, hiring, relocation), broker-voice sequences, and lists that refresh as markets shift.",
    headline: "Sourcing deal flow with outbound, not another stale list.",
    verdict:
      "CRE outbound fails when lists go stale weekly. Triggers and broker voice beat rented contact files.",
    intro:
      "Commercial real estate teams bill time and lose hours to prospecting theater — recycled broker lists, generic “just circling back,” and ICPs that ignore how capital and occupancy actually move. FinalOutreach builds trigger-led outbound for CRE firms and brokers: funding, hiring, relocation, and expansion signals paired with sequences that sound like a sharp broker, not a SaaS SDR.",
    painPoints: [
      "Purchased lists are stale the week you buy them",
      "Producers bill hours — they cannot live in a sequencer",
      "Regional and asset-class ICP shifts every quarter",
      "Tenants and owners ignore anything that smells mass-mailed",
    ],
    approach:
      "Real-time trigger targeting — funding, hiring, relocation, expansion — with broker-voice copy and geographic slices that match how you actually cover a market. Lists refresh on a cadence so you are not farming last year’s CSV.",
    focus: {
      value: "Triggers",
      label: "Lists built from live market signals — not a static broker dump",
    },
    buyingSignals: [
      "Company funding or headcount jumps that imply space needs",
      "Leadership changes in real estate, ops, or finance",
      "Public relocation, expansion, or consolidation news",
      "Lease-event windows and portfolio reshuffles you can time around",
    ],
    playbook: [
      {
        heading: "Sound local even when the system is central",
        body: "CRE is relational and geographic. Copy references the right submarket and asset logic — not a national template with a city merge tag.",
      },
      {
        heading: "Refresh or die",
        body: "We treat list hygiene as part of delivery. A CRE campaign on a rotting file is worse than no campaign — it trains the market to ignore your name.",
      },
      {
        heading: "Hand warm threads to producers fast",
        body: "When someone engages, speed matters. We qualify and route so producers call while intent is still warm.",
      },
    ],
    whatWeWontDo: [
      "Renting the same CRE contact file everyone already burned",
      "Sending as if every asset class buys the same way",
      "Promising “$48M attributed volume” marketing claims we cannot show live",
    ],
    faqs: [
      {
        q: "Do you work with brokers or principals?",
        a: "Both. Messaging and ICP change. Brokers need deal-flow conversations; principals often need capital, tenants, or operator relationships. We do not mash them into one sequence.",
      },
      {
        q: "Can you focus on one metro?",
        a: "Yes — and usually should. Metro-specific outbound outperforms national spray for most CRE motions.",
      },
      {
        q: "How do you avoid looking like spam in a relationship business?",
        a: "Low volume, high relevance, authentic voice, and strict suppression. Reputation is the asset; meetings are the byproduct.",
      },
    ],
    lastReviewed: "2026-07-20",
  },
]

export function getIndustryPage(slug: string) {
  return INDUSTRY_PAGE_PROFILES.find((i) => i.slug === slug)
}

export const INDUSTRY_PAGE_SLUGS = INDUSTRY_PAGE_PROFILES.map((i) => i.slug)
