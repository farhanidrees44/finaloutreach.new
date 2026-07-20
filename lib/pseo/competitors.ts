/**
 * Rich compare-page content — unique per competitor.
 * Honest differentiation only; no invented competitor pricing or fake client quotes.
 */

export type CompetitorProfile = {
  slug: string
  name: string
  metaTitle: string
  metaDescription: string
  /** Short positioning of the competitor as commonly known in market. */
  theirModel: string
  /** One-line verdict for the hero. */
  verdict: string
  /** Unique intro — not a name-swap of the same paragraph. */
  intro: string
  comparisonRows: { feature: string; us: string; them: string }[]
  whenTheyWin: string[]
  whenWeWin: string[]
  deepDive: { heading: string; body: string }[]
  faqs: { q: string; a: string }[]
  lastReviewed: string
}

export const COMPETITOR_PROFILES: CompetitorProfile[] = [
  {
    slug: "vs-belkins",
    name: "Belkins",
    metaTitle: "FinalOutreach vs Belkins — Cold Email Agency Comparison",
    metaDescription:
      "FinalOutreach vs Belkins: pricing shape, transparency, guarantees, and which cold email agency fits $500K–$10M ARR teams. Honest side-by-side.",
    theirModel:
      "Belkins is a large, brand-name cold email and appointment-setting agency known for volume programs and a broad service menu.",
    verdict:
      "Belkins fits bigger budgets and brand-name procurement. FinalOutreach fits leaner teams that want operator transparency and a short contract.",
    intro:
      "Belkins built one of the most recognizable names in done-for-you cold email. That brand helps when a buying committee wants a known vendor on the shortlist. The tradeoff is usually price, process weight, and how much raw campaign data you actually see week to week. FinalOutreach is built for teams that want operators in the tools, a three-month minimum, and a clear miss-clause on pipeline — not a twelve-month enterprise packaging exercise.",
    comparisonRows: [
      { feature: "Typical starting price", us: "From $3,500/mo", them: "Usually higher mid-market packages" },
      { feature: "Contract length", us: "3-month minimum", them: "Often longer enterprise-style terms" },
      { feature: "Pipeline miss clause", us: "90-day guarantee with a free month if we miss committed targets", them: "Varies by package — ask for written terms" },
      { feature: "Reporting style", us: "Weekly dashboard + exportable reply data", them: "Often polished monthly reporting" },
      { feature: "ICP refresh", us: "Reviewed every 30 days", them: "Typically heavier at kickoff" },
      { feature: "Best fit ACV / stage", us: "$500K–$10M ARR teams needing speed", them: "Buyers who need brand-name coverage" },
      { feature: "Channel mix", us: "Cold email + LinkedIn + infrastructure", them: "Broad outbound menu at scale" },
    ],
    whenTheyWin: [
      "Your procurement team needs a widely recognized agency logo on the vendor list.",
      "You want a large-bench, multi-offer package and can absorb higher monthly spend.",
      "You prefer a polished, enterprise-style reporting cadence over raw weekly exports.",
    ],
    whenWeWin: [
      "You want a 3-month start, not a long lock-in, while you prove outbound.",
      "You care more about reply-level transparency than a slide deck.",
      "You want operators who live in Instantly/Smartlead/HeyReach — not account managers who only summarize.",
    ],
    deepDive: [
      {
        heading: "Brand vs operator density",
        body: "Belkins’ advantage is recognition. That matters in RFPs. FinalOutreach’s advantage is density of operators on a smaller book of clients — ICP workshops, weekly experiments, and reply handling that does not get shared across a huge roster. If your risk is “will procurement approve the vendor,” Belkins may win. If your risk is “will we actually get meetings this quarter,” choose the team that shows you the inbox.",
      },
      {
        heading: "Guarantees you can quote in a board update",
        body: "Ask any agency what happens when meetings miss. FinalOutreach puts a 90-day pipeline miss clause in writing: if we miss the committed target, you get a free month. Belkins packages vary — some clients get strong SLAs, others get softer language. Put both proposals side by side on the miss clause before you sign.",
      },
      {
        heading: "Who should not choose either",
        body: "If you only need a self-serve sequencer and already have a strong internal SDR, buy Instantly or Smartlead and skip agencies entirely. If you need a 100-seat BDR call center, neither Belkins’ cold-email-led packages nor FinalOutreach’s lean pod is the right motion — look at true call-center outsourcers.",
      },
    ],
    faqs: [
      {
        q: "Is FinalOutreach cheaper than Belkins?",
        a: "Usually yes for mid-market scopes. Belkins packages often land higher once you add setup and multi-channel work. FinalOutreach starts at $3,500/mo with a one-time infrastructure setup. Always compare written scopes — not homepage teasers.",
      },
      {
        q: "Why would someone still pick Belkins?",
        a: "Brand recognition in procurement, a larger delivery bench, and a broader catalog of outbound services. If those matter more than speed-to-proof and raw data access, Belkins can be the rational choice.",
      },
      {
        q: "Do you compete head-to-head on cold email quality?",
        a: "Yes. Both teams run cold email as a core motion. The difference is client load, reporting style, contract length, and how aggressively we refresh ICP every month.",
      },
      {
        q: "Can I get a teardown of both proposals?",
        a: "Book a strategy call and bring the Belkins quote. We will map scope gaps honestly — including where Belkins may be the better buy.",
      },
    ],
    lastReviewed: "2026-07-01",
  },
  {
    slug: "vs-martal",
    name: "Martal",
    metaTitle: "FinalOutreach vs Martal — Outsourced Sales Comparison",
    metaDescription:
      "FinalOutreach vs Martal: cold email operators vs outsourced BDR/sales development. Pricing shape, model fit, and when each wins.",
    theirModel:
      "Martal is known for outsourced sales development / BDR-style programs — closer to a remote sales team than a pure cold-email pod.",
    verdict:
      "Martal fits teams buying outsourced BDRs. FinalOutreach fits teams that want cold email + LinkedIn run by operators with a pipeline miss clause.",
    intro:
      "Martal and FinalOutreach get compared because both sell “meetings without hiring SDRs.” The models diverge fast. Martal leans into outsourced sales development capacity. FinalOutreach leans into cold email infrastructure, copy, list building, and reply handling — with LinkedIn as a second channel. If you want someone to run dialer-led BDR motions, Martal is closer. If you want inbox-first outbound with domain warmup and weekly copy experiments, we are closer.",
    comparisonRows: [
      { feature: "Primary motion", us: "Cold email + LinkedIn + infra", them: "Outsourced sales development / BDR-led" },
      { feature: "Starting price shape", us: "From $3,500/mo", them: "Typically higher for full BDR capacity" },
      { feature: "Contract", us: "3-month minimum", them: "Often longer capacity commitments" },
      { feature: "Infrastructure ownership", us: "We build and warm dedicated domains", them: "Depends on package — clarify who owns domains" },
      { feature: "Copy ownership", us: "Custom sequences + monthly experiments", them: "Scripted BDR talk tracks + email support" },
      { feature: "Guarantee", us: "90-day pipeline miss clause", them: "Ask for written meeting SLAs" },
      { feature: "Best fit", us: "Teams that want outbound without hiring", them: "Teams that want embedded BDR capacity" },
    ],
    whenTheyWin: [
      "You specifically want outsourced BDRs, not an email-first agency.",
      "Phone-led multi-touch is central to how your buyers respond.",
      "You are buying headcount replacement more than campaign operations.",
    ],
    whenWeWin: [
      "Your buyers live in email and LinkedIn more than dialers.",
      "You need domain reputation, list quality, and reply handling fixed first.",
      "You want a shorter contract to prove outbound before scaling headcount-like spend.",
    ],
    deepDive: [
      {
        heading: "BDR capacity vs campaign operations",
        body: "Martal’s value prop reads like sales capacity. FinalOutreach’s value prop reads like campaign operations. That sounds semantic until you look at what breaks: burnt domains, weak ICPs, and unreplied threads. We start there. If your bottleneck is “not enough humans dialing,” Martal’s model may map better.",
      },
      {
        heading: "What “meetings” means in each model",
        body: "Define a qualified meeting in writing before you compare quotes. FinalOutreach qualifies against your ICP and disqualification rules from a discovery workshop. Outsourced BDR programs sometimes optimize for booked holds. Ask both vendors how no-shows and bad-fit meetings are counted against the SLA.",
      },
      {
        heading: "Stack implications",
        body: "We operate inside modern cold-email stacks (sequencers, enrichment, LinkedIn tools). Martal engagements may center on CRM + dialer workflows. If your RevOps team already standardized on Outreach or Salesloft for AE follow-up, clarify handoff ownership with either vendor.",
      },
    ],
    faqs: [
      {
        q: "Is FinalOutreach a Martal alternative?",
        a: "For teams comparing outsourced pipeline vendors, yes. For teams that specifically need BDR dialer capacity, Martal is often the closer category match.",
      },
      {
        q: "Do you do phone outreach?",
        a: "Our core motion is cold email and LinkedIn. We do not sell a call-center BDR package. If phone is mandatory, say so on the strategy call and we will tell you honestly if we are a fit.",
      },
      {
        q: "Which is better for SaaS?",
        a: "Depends on ACV and buyer behavior. High-ACV SaaS with email-responsive buyers often does well with our model. Teams that sell through heavy phone sequences may prefer Martal-style BDR capacity.",
      },
    ],
    lastReviewed: "2026-07-01",
  },
  {
    slug: "vs-cleverly",
    name: "Cleverly",
    metaTitle: "FinalOutreach vs Cleverly — LinkedIn Outreach Comparison",
    metaDescription:
      "FinalOutreach vs Cleverly: LinkedIn-led agency vs cold email + LinkedIn operators. Where each model wins for B2B pipeline.",
    theirModel:
      "Cleverly is widely known for LinkedIn outreach / lead-gen style programs — LinkedIn-first rather than inbox-first.",
    verdict:
      "Cleverly fits LinkedIn-first lead gen. FinalOutreach fits teams that need cold email infrastructure plus LinkedIn — not LinkedIn alone.",
    intro:
      "Cleverly and FinalOutreach both sell done-for-you outbound, but the center of gravity differs. Cleverly built its reputation on LinkedIn-led acquisition. FinalOutreach starts with deliverability, lists, and cold email sequences, then layers LinkedIn where it compounds. If your ICP lives on LinkedIn and you do not need email infrastructure, Cleverly’s model can be enough. If your domain is weak, your list is noisy, or email is still the highest-volume channel in your market, you need more than LinkedIn touches.",
    comparisonRows: [
      { feature: "Primary channel", us: "Cold email first, LinkedIn second", them: "LinkedIn-led outbound" },
      { feature: "Email infrastructure", us: "Dedicated domains, warmup, DNS hardening", them: "Not the core offer — LinkedIn-focused" },
      { feature: "Starting price shape", us: "From $3,500/mo", them: "Package-dependent LinkedIn programs" },
      { feature: "List building", us: "ICP + trigger-based, triple-verified", them: "LinkedIn-centric prospecting" },
      { feature: "Reply handling", us: "SDR-style inbox + LinkedIn replies", them: "LinkedIn conversation management" },
      { feature: "Guarantee", us: "90-day pipeline miss clause", them: "Ask for written lead/meeting terms" },
      { feature: "Best fit", us: "Teams that need inbox + LinkedIn", them: "Teams all-in on LinkedIn" },
    ],
    whenTheyWin: [
      "Your buyers are highly responsive on LinkedIn and email is secondary.",
      "You specifically want a LinkedIn-specialist agency, not a multi-channel pod.",
      "You already have email covered in-house and only need LinkedIn volume.",
    ],
    whenWeWin: [
      "Email is still a primary channel and domains need professional warmup.",
      "You want one pod owning list → copy → send → reply across email and LinkedIn.",
      "You need written pipeline targets with a miss clause, not lead volume alone.",
    ],
    deepDive: [
      {
        heading: "LinkedIn alone hits a ceiling",
        body: "LinkedIn is excellent for high-ACV, relationship-sensitive deals. It is a poor sole channel when you need consistent pipeline coverage across a 2,000–10,000 account universe. FinalOutreach uses LinkedIn as a precision layer on top of warmed email infrastructure — not as the whole engine.",
      },
      {
        heading: "Risk profiles differ",
        body: "LinkedIn programs risk account restrictions and thin personalization at volume. Cold email programs risk spam-folder placement and domain burns. We invest heavily in the second risk class because most B2B pipeline still moves through email. Cleverly invests in the first. Pick based on which risk you are equipped to manage.",
      },
      {
        heading: "What “leads” vs “meetings” means",
        body: "Some LinkedIn agencies optimize for accepted connection requests or conversations. FinalOutreach optimizes for qualified meetings on your calendar. Align the KPI before you compare monthly fees — otherwise you are comparing different products.",
      },
    ],
    faqs: [
      {
        q: "Do you replace Cleverly or complement it?",
        a: "Usually replace, because we already include LinkedIn in multi-channel pods. If you love your Cleverly LinkedIn motion and only need email infrastructure, we can discuss an email-only scope on the audit call.",
      },
      {
        q: "Is LinkedIn included in FinalOutreach?",
        a: "Yes on standard growth engagements. Sequences are coordinated so prospects are not hammered on both channels with mismatched messaging.",
      },
      {
        q: "Which is better for agencies selling to founders?",
        a: "LinkedIn-heavy motions can work well for founder-led buyers. We still recommend email coverage for scale. Many agency clients run both — with us owning the system end-to-end.",
      },
    ],
    lastReviewed: "2026-07-01",
  },
  {
    slug: "vs-leadium",
    name: "Leadium",
    metaTitle: "FinalOutreach vs Leadium — Cold Email Agency Comparison",
    metaDescription:
      "FinalOutreach vs Leadium: two cold email agencies compared on transparency, contract length, guarantees, and mid-market fit.",
    theirModel:
      "Leadium is a cold email / appointment-setting agency in the same broad category as FinalOutreach — done-for-you outbound for B2B teams.",
    verdict:
      "Same category, different operating style. Choose Leadium if their package and proof match your ICP; choose FinalOutreach for shorter contracts and weekly raw-data transparency.",
    intro:
      "Leadium and FinalOutreach sit in the same aisle: agencies that run cold email so you do not have to hire a full SDR team. Category overlap means the real comparison is operating style — how ICP is refreshed, what you see in reporting, how domains are owned, and what happens when meetings miss. This page is built for that comparison, not for claiming we invented outbound.",
    comparisonRows: [
      { feature: "Category", us: "Done-for-you cold email + LinkedIn", them: "Done-for-you cold email / appointment setting" },
      { feature: "Starting price", us: "From $3,500/mo", them: "Confirm current packages directly" },
      { feature: "Minimum term", us: "3 months", them: "Confirm in proposal" },
      { feature: "Transparency", us: "Weekly dashboard + exportable replies", them: "Varies — request sample report" },
      { feature: "Infrastructure", us: "Dedicated warmed domains standard", them: "Ask who owns sending domains" },
      { feature: "Miss clause", us: "90-day pipeline guarantee, free month if missed", them: "Request written SLA language" },
      { feature: "ICP process", us: "Workshop + 30-day refresh", them: "Confirm refresh cadence" },
    ],
    whenTheyWin: [
      "Their recent proof in your exact vertical is stronger than ours.",
      "Their pricing for your required volume is meaningfully better.",
      "You already have a trusted relationship or referral into their team.",
    ],
    whenWeWin: [
      "You want a short minimum term while you validate outbound.",
      "You insist on exportable reply data every week.",
      "You want LinkedIn coordinated with email under one pod.",
    ],
    deepDive: [
      {
        heading: "Same category — interrogate the SLA",
        body: "When two agencies sell the same category, the proposal appendix matters more than the homepage. Ask both for: qualified meeting definition, no-show policy, domain ownership, and what “pipeline guarantee” means in dollars or meetings. FinalOutreach answers those in writing up front.",
      },
      {
        heading: "Proof without theater",
        body: "We publish live campaign proof where we have permissioned metrics and screenshots. Leadium will have their own proof assets. Compare like-for-like industries and stages — not vanity logos.",
      },
      {
        heading: "Switching cost",
        body: "If you are already mid-contract with Leadium, finish the term or negotiate an exit before overlapping vendors. Dual agencies on the same ICP usually create list collisions and brand damage.",
      },
    ],
    faqs: [
      {
        q: "Are you and Leadium basically the same?",
        a: "Same category, different ops. The differentiators to test are contract length, reporting rawness, LinkedIn inclusion, and miss-clause language — not whether both “do cold email.”",
      },
      {
        q: "Can you migrate a Leadium program?",
        a: "Often yes. We audit domains, copy, and lists first. If the infrastructure is healthy, we keep what works and rewrite what does not.",
      },
      {
        q: "How do I choose without a sales call marathon?",
        a: "Ask both agencies for a one-page SLA comparison and a sample weekly report. The clearer artifact usually reflects the clearer operator.",
      },
    ],
    lastReviewed: "2026-07-01",
  },
  {
    slug: "vs-callbox",
    name: "Callbox",
    metaTitle: "FinalOutreach vs Callbox — Appointment Setting Comparison",
    metaDescription:
      "FinalOutreach vs Callbox: email-led operators vs multi-channel appointment setting with a call-center heritage. Which fits your motion.",
    theirModel:
      "Callbox is a long-running appointment-setting / lead-gen firm with multi-channel and telemarketing roots.",
    verdict:
      "Callbox fits call-heavy, multi-channel appointment setting. FinalOutreach fits email-infrastructure-led outbound for modern B2B SaaS motions.",
    intro:
      "Callbox has been in appointment setting long enough that “Callbox vs modern cold email agency” is a real buyer question. Their heritage is multi-channel lead gen with a strong phone component. FinalOutreach is built around warmed domains, trigger-based lists, and cold email + LinkedIn — the stack most SaaS and services teams run in 2026. If your buyers still convert primarily by phone, Callbox’s model may map better. If your buyers ignore unknown numbers and live in email, start with inbox operations.",
    comparisonRows: [
      { feature: "Heritage", us: "Modern cold email + LinkedIn operators", them: "Multi-channel appointment setting / telemarketing roots" },
      { feature: "Primary leverage", us: "Deliverability + copy + list quality", them: "Multi-touch including phone" },
      { feature: "Price shape", us: "From $3,500/mo", them: "Package-based — often higher for call capacity" },
      { feature: "Contract", us: "3-month minimum", them: "Confirm term in proposal" },
      { feature: "Tech stack", us: "Sequencers, enrichment, LinkedIn tools", them: "Call + email + multi-channel stack" },
      { feature: "Guarantee", us: "90-day pipeline miss clause", them: "Ask for written appointment SLAs" },
      { feature: "Best fit", us: "Email-responsive B2B buyers", them: "Phone-responsive appointment motions" },
    ],
    whenTheyWin: [
      "Phone is a required channel for your ICP.",
      "You want a classic multi-channel appointment-setting firm.",
      "Your category historically converts on dialer-led sequences.",
    ],
    whenWeWin: [
      "Your ICP ignores cold calls and responds to sharp email.",
      "You need domain reputation rebuilt before any volume.",
      "You want a lean pod with modern sequencer tooling.",
    ],
    deepDive: [
      {
        heading: "Channel reality in 2026",
        body: "Cold calling still works in some verticals. In others, connect rates collapsed. FinalOutreach does not pretend phone is dead — we just do not sell a call center. If your win stories require dials, say so early so we can decline cleanly or partner the phone layer.",
      },
      {
        heading: "Compliance and brand risk",
        body: "Phone-heavy programs carry TCPA / local dialing risk depending on geography. Email-heavy programs carry spam and consent risk. We configure DNS, suppression, and copy for email compliance by default. Callbox will have its own compliance posture — compare both in regulated markets.",
      },
      {
        heading: "Reporting you can trust",
        body: "Appointment-setting firms sometimes count “leads” differently from “qualified meetings.” Align definitions. Our dashboards expose reply classifications so you can audit quality without waiting for a monthly PDF.",
      },
    ],
    faqs: [
      {
        q: "Do you offer cold calling?",
        a: "Not as a core package. Our motion is cold email and LinkedIn. If dials are mandatory, Callbox or a BDR outsourcer is usually the better category.",
      },
      {
        q: "Can FinalOutreach and Callbox work together?",
        a: "Rarely a good idea on the same ICP — collision risk is high. Pick one primary vendor for a given account list.",
      },
      {
        q: "Which is better for enterprise?",
        a: "Enterprise with complex phone trees may prefer Callbox-style multi-channel. Enterprise SaaS with email-first buying committees often prefers our model. Stage alone does not decide it — buyer behavior does.",
      },
    ],
    lastReviewed: "2026-07-01",
  },
  {
    slug: "vs-cience",
    name: "CIENCE",
    metaTitle: "FinalOutreach vs CIENCE — BDR Outsourcing Comparison",
    metaDescription:
      "FinalOutreach vs CIENCE: lean cold email operators vs large-scale BDR/outbound outsourcing. Fit, cost shape, and when to choose each.",
    theirModel:
      "CIENCE is a large outbound / BDR outsourcing platform known for scale and a wide delivery footprint.",
    verdict:
      "CIENCE fits companies buying scale and platform breadth. FinalOutreach fits mid-market teams that want a small operator pod and a short path to proof.",
    intro:
      "CIENCE plays at a different altitude than FinalOutreach. They are built for scale — larger programs, broader outsourcing footprints, and buyers who want a big-vendor motion. We are built for mid-market teams that want a handful of operators deep in their ICP, not a platform-sized engagement. If you are comparing us to CIENCE, you are usually deciding between “scale vendor” and “specialist pod.”",
    comparisonRows: [
      { feature: "Company shape", us: "Specialist cold email / LinkedIn pod", them: "Large outbound / BDR outsourcing platform" },
      { feature: "Starting engagement", us: "From $3,500/mo, 3-month minimum", them: "Typically larger program scopes" },
      { feature: "Client load philosophy", us: "Smaller book, higher operator density", them: "Scale across many programs" },
      { feature: "Customization speed", us: "Weekly experiments, 30-day ICP refresh", them: "Process depends on package tier" },
      { feature: "Transparency", us: "Raw weekly reply data", them: "Enterprise reporting stacks" },
      { feature: "Guarantee", us: "90-day pipeline miss clause", them: "Confirm SLA per contract" },
      { feature: "Best fit", us: "$500K–$10M ARR proving outbound", them: "Larger orgs buying scale" },
    ],
    whenTheyWin: [
      "You need a large-scale BDR outsourcing partner with platform breadth.",
      "Procurement prefers a bigger vendor footprint.",
      "Your monthly outbound budget is well above mid-market agency norms.",
    ],
    whenWeWin: [
      "You want to prove outbound in a quarter without a platform-sized commitment.",
      "You care about operator density and weekly experimentation.",
      "You want clear miss-clause language on a 90-day window.",
    ],
    deepDive: [
      {
        heading: "Scale is a feature until it is not",
        body: "Large outbound platforms win on capacity. Specialist pods win on attention. Mid-market SaaS teams often lose on platforms because their ICP nuances never make it past a shared playbook. If you have already failed a big-vendor outbound engagement, a smaller pod is usually the corrective move.",
      },
      {
        heading: "Cost of being small",
        body: "We will not pretend to match CIENCE’s delivery footprint. If you need dozens of simultaneous workstreams across regions, we will tell you to buy scale. If you need one sharp motion for one ICP, we will take the work.",
      },
      {
        heading: "How to run a fair bake-off",
        body: "Give both vendors the same ICP definition, meeting criteria, and 90-day target. Compare cost per qualified meeting — not logo size. Keep list ownership and suppression files clean so the test is not contaminated.",
      },
    ],
    faqs: [
      {
        q: "Is FinalOutreach a CIENCE alternative?",
        a: "For mid-market teams evaluating outbound vendors, yes. For enterprises that need platform-scale BDR outsourcing, CIENCE is usually the closer category match.",
      },
      {
        q: "Can you support multiple regions like a large platform?",
        a: "We support multi-timezone sending and global ICPs, but we do not sell a 50-market BDR platform. Scope honestly on the strategy call.",
      },
      {
        q: "What if we outgrow FinalOutreach?",
        a: "Good problem. We will help you graduate to internal SDR capacity or a larger partner when volume demands it — and we will not cling to a retainer that no longer fits.",
      },
    ],
    lastReviewed: "2026-07-01",
  },
]

export function getCompetitor(slug: string) {
  return COMPETITOR_PROFILES.find((c) => c.slug === slug)
}
