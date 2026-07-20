/**
 * Single source of truth for the free-tools surface area.
 *
 * Every tool page, the /tools index, the navigation dropdown, and SEO/JSON-LD
 * metadata pull from this file so labels, slugs, and copy stay in lockstep.
 */

import type { LucideIcon } from "lucide-react"
import {
  Sparkles,
  ShieldAlert,
  Globe2,
  Mailbox,
  Calculator,
  Flame,
} from "lucide-react"

export type ToolCategory = "Deliverability" | "Copy" | "Strategy"

export type Tool = {
  slug: string
  name: string
  shortName: string
  tagline: string
  description: string
  // Long-form description used on the tool detail page hero.
  longDescription: string
  category: ToolCategory
  icon: LucideIcon
  // Numbered ordering used on the index grid.
  order: number
  // Short list of "what you get" rendered on the index card.
  outputs: string[]
  // Estimated time-to-result, shown as a small chip.
  timeToValue: string
  // FAQ pairs — light SEO, also helpful for the user.
  faqs: { q: string; a: string }[]
  // Three sequential steps shown in the "How it works" strip.
  howItWorks: { title: string; body: string }[]
}

export const TOOLS: Tool[] = [
  {
    slug: "subject-line-tester",
    name: "Cold Email Subject Line Tester",
    shortName: "Subject Line Tester",
    tagline:
      "Score cold outbound subject lines against deliverability and engagement factors — not newsletter heuristics.",
    description:
      "Test cold email subject lines against 15 deliverability and engagement factors built for outbound — not newsletters. Instant score, real fixes, no signup.",
    longDescription:
      "Paste a cold email subject line and get an instant, rules-based score in your browser. Built for outbound — spam-filter risk, merge-tag failures, personalization quality, and reply-oriented framing — not newsletter open-rate psychology.",
    category: "Copy",
    icon: Sparkles,
    order: 1,
    outputs: [
      "Cold-specific score 0–100",
      "Deliverability + engagement breakdown",
      "Mobile truncation preview + top fixes",
    ],
    timeToValue: "<2s",
    howItWorks: [
      {
        title: "Paste a subject line",
        body:
          "Type or paste any subject line. Analysis runs entirely in your browser — nothing is sent to a server.",
      },
      {
        title: "Get a 0–100 cold score",
        body:
          "We weight 15 deliverability and engagement factors tuned for cold outbound, then surface what is hurting opens and replies.",
      },
      {
        title: "Apply the fixes",
        body:
          "Each failing check explains why it matters on cold email specifically, with a concrete rewrite direction.",
      },
    ],
    faqs: [
      {
        q: "What's a good subject line length for cold email specifically?",
        a: "Cold email should skew shorter than newsletters: aim for 2–7 words and under ~55 characters so mobile clients don't truncate the meaning. Low-trust first-touch favors brevity; long subjects read like marketing mail.",
      },
      {
        q: "Do emojis hurt cold email deliverability?",
        a: "More than on permissioned newsletters. Cold sends aren't on an opted-in list, so filters weight unusual characters harder. One emoji can be A/B tested; multiple usually raise spam risk without helping B2B reply rates.",
      },
      {
        q: "Should I use the recipient's first name in a cold subject line?",
        a: "First name alone is a weak signal. Pair a name with a company-specific detail, role, or trigger event. Studies and campaign practice both show real personalization lifts opens and replies more than {{first_name}} by itself.",
      },
      {
        q: "What's the difference between this and Omnisend or MailerLite-style testers?",
        a: "Those tools are calibrated for opted-in marketing lists. Cold outbound has different spam-risk and trust dynamics — merge-tag failures, permission context, and reply rate matter more than newsletter open psychology alone.",
      },
      {
        q: "How is the score calculated — is this AI or rules-based?",
        a: "Rules-based and deterministic. Every factor has a transparent weight and pass/warn/fail logic you can see in the breakdown. No black-box AI rewrite — fast, honest, and reproducible.",
      },
      {
        q: "Does testing here affect my sender reputation or send anything?",
        a: "No. The tester runs entirely in your browser. We never send mail, hit your domain, or transmit the subject lines you type.",
      },
      {
        q: "What makes a subject line score high?",
        a: "Sentence case, 2–7 words, no spam triggers or broken merge tags, specific personalization (company/role/trigger), restrained punctuation, and ideally a reply-oriented question — not ALL CAPS marketing urgency.",
      },
      {
        q: "What's a good cold email open rate in 2026?",
        a: "Industry studies put average cold opens in the low-to-mid 20s%; strong subject lines can push 45%+. Treat open rate cautiously — Apple Mail Privacy Protection inflates many reported opens. Reply rate and click-to-open are more reliable.",
      },
    ],
  },
  {
    slug: "spam-word-checker",
    name: "Cold Email Spam Word Checker",
    shortName: "Spam Word Checker",
    tagline:
      "Highlight every spam-trigger word, all-caps run, and risky phrase before you hit send.",
    description:
      "Paste your email body — we highlight spam triggers, ALL CAPS, excessive punctuation, and risky phrases that send your messages straight to the spam folder.",
    longDescription:
      "Spam filters score your emails on hundreds of signals. This checker flags the obvious ones — trigger words, ALL CAPS, exclamation marks, money phrases — and gives you a clear pass/warn/fail rating with the exact lines that need fixing.",
    category: "Deliverability",
    icon: ShieldAlert,
    order: 2,
    outputs: [
      "Inline-highlighted spam triggers",
      "Risk score: low / medium / high",
      "Per-category breakdown with fixes",
    ],
    timeToValue: "<1s",
    howItWorks: [
      {
        title: "Paste your email body",
        body:
          "Drop in your full email — subject line plus body. Plain text or rich text, doesn't matter.",
      },
      {
        title: "See triggers highlighted inline",
        body:
          "We color-code every spam word, all-caps run, and risky phrase right inside your text.",
      },
      {
        title: "Rewrite and re-score",
        body:
          "Edit your text in place. The risk score updates as you type — keep it Low for safe sending.",
      },
    ],
    faqs: [
      {
        q: "Will a Low risk score guarantee inbox placement?",
        a: "No tool can. A Low score means you removed cheap content signals. Inbox placement still depends on domain reputation, SPF/DKIM/DMARC, list hygiene, bounce rate, and replies.",
      },
      {
        q: "Do you check spammy formatting like links and images?",
        a: "We flag excessive links, ALL CAPS runs, urgency phrases, and money language. We do not render HTML — paste plain text or copy from your sending tool for the most honest read.",
      },
      {
        q: "How is this different from Mail-Tester?",
        a: "Mail-Tester scores a real send: headers, DNS, and content together. This checker is content-only and runs in your browser before you ever hit send — use both.",
      },
      {
        q: "Are spam word lists the same for cold email and newsletters?",
        a: "Overlapping, but cold is less forgiving. You are not on a permission list, so promo and urgency language is weighted harder. What passes on a weekly newsletter can still hurt first-touch outbound.",
      },
      {
        q: "Should I remove every flagged word even if it is accurate?",
        a: "Rewrite for clarity, not for a perfect score. Sometimes “guarantee” is the honest word — just do not stack it with CAPS, !!!, and “act now.” Judgment beats keyword theater.",
      },
      {
        q: "Is my email text stored or sent to a server?",
        a: "No. Analysis runs in your browser. Nothing is uploaded for scoring.",
      },
      {
        q: "What should I check after I clean the copy?",
        a: "Authenticate the sending domain (Domain Health Checker), warm new domains (Warmup Calculator), and score the subject line separately — body and subject fail for different reasons.",
      },
    ],
  },
  {
    slug: "domain-health-checker",
    name: "Domain Email Health Checker",
    shortName: "Domain Health Checker",
    tagline:
      "Check SPF, DKIM, DMARC, and MX records on any domain in seconds.",
    description:
      "Look up any domain's email authentication setup — SPF, DKIM, DMARC, and MX records. Get a deliverability health score with specific fixes for each issue.",
    longDescription:
      "Type any domain. We do a live DNS lookup against your real authentication records and tell you exactly what's missing, mis-configured, or working. No signup, no logs, no email required.",
    category: "Deliverability",
    icon: Globe2,
    order: 3,
    outputs: [
      "Live SPF / DKIM / DMARC / MX lookup",
      "Health score 0–100 with risk level",
      "Specific fix per failing record",
    ],
    timeToValue: "~3s",
    howItWorks: [
      {
        title: "Enter your domain",
        body:
          "Just the domain — no @, no protocol. We look up the live DNS records ourselves.",
      },
      {
        title: "We resolve your real records",
        body:
          "Server-side DNS query against SPF, DKIM (default selector), DMARC, and MX. Read-only.",
      },
      {
        title: "Fix what's broken",
        body:
          "Each missing or mis-configured record gets a status, the raw value we found, and a copy-paste fix.",
      },
    ],
    faqs: [
      {
        q: "Why does DKIM show inconclusive on a working domain?",
        a: "DKIM uses a selector chosen by your email provider. We probe common selectors but cannot guess every custom one. If mail already authenticates in your ESP, a miss here is often just selector mismatch — not a broken domain.",
      },
      {
        q: "Will this fix my deliverability?",
        a: "It tells you what is missing or misconfigured. Adding records is usually a short DNS edit. Reputation, warmup, and list quality are separate — this is the identity gate.",
      },
      {
        q: "Is the lookup logged?",
        a: "No. We perform a read-only DNS query and return the result to your browser without keeping a lookup history for marketing.",
      },
      {
        q: "Should I put cold email on my primary company domain?",
        a: "No. Use dedicated sending domains for cold volume so customer and investor mail on @company.com stay protected if outbound reputation dips.",
      },
      {
        q: "What DMARC policy should I start with?",
        a: "Most teams start with p=none plus reporting (rua) to see alignment failures, then move to quarantine/reject once SPF and DKIM are solid. Jumping straight to reject without monitoring can break legitimate mail.",
      },
      {
        q: "Does a high score mean I am ready to send cold volume?",
        a: "It means authentication looks healthy. You still need warmup, clean lists, and restrained content before full volume. Pair this with the Warmup Calculator.",
      },
      {
        q: "Can I check a competitor’s domain?",
        a: "Yes — DNS is public. Use it to learn how serious senders configure mail, not to copy their cold domains wholesale.",
      },
    ],
  },
  {
    slug: "cold-email-generator",
    name: "Cold Email Template Generator",
    shortName: "Cold Email Generator",
    tagline:
      "Generate a 3-step cold email sequence built around your offer and persona.",
    description:
      "Plug in your offer, target persona, and value proposition — get a 3-email sequence designed around your prospect's pain, not generic templates.",
    longDescription:
      "Forget swipe files. Tell us who you sell to, what you sell, and what changes for them — we build a structured 3-touch sequence: a problem-led opener, a value-led nudge, and a graceful break-up. Copy, paste, send.",
    category: "Copy",
    icon: Mailbox,
    order: 4,
    outputs: [
      "3 emails: opener, nudge, break-up",
      "Tone-adjusted (direct, warm, or playful)",
      "Copy-paste ready, no AI markdown noise",
    ],
    timeToValue: "<5s",
    howItWorks: [
      {
        title: "Tell us about your offer",
        body:
          "Who you sell to, what you sell, and the one outcome they care about most.",
      },
      {
        title: "Choose a tone",
        body:
          "Direct (consultative), Warm (conversational), or Playful (founder-led). Output adjusts copy, openers, and sign-offs.",
      },
      {
        title: "Get a 3-touch sequence",
        body:
          "Subject + body for each email, written to be easily edited. Copy them straight into your sending tool.",
      },
    ],
    faqs: [
      {
        q: "Are these templates AI-generated?",
        a: "They are built from a structured frame — not an open-ended language model. That keeps anatomy consistent: relevance hook, problem, micro-offer, soft CTA — editable, not “creative” noise.",
      },
      {
        q: "Can I customize the cadence?",
        a: "Default framing is Day 0 / Day 3 / Day 7. Many teams run 4–6 touches; the first three usually carry most of the reply weight. Add later touches once the opener is proven.",
      },
      {
        q: "Will these get me booked meetings?",
        a: "Copy is roughly 20% of the outcome. List quality, infrastructure, deliverability, and reply handling carry the rest. Use this to ship a strong draft, then operate the system.",
      },
      {
        q: "Should I personalize every line?",
        a: "Personalize the first sentence and any merge fields with real triggers (hire, funding, page change). Do not fake intimacy. Specific beats “hope you’re doing well.”",
      },
      {
        q: "Which tone should I pick?",
        a: "Direct for consultative B2B, Warm for services and founder-led sales, Playful only when your ICP actually tolerates it — still keep the email short and specific.",
      },
      {
        q: "How do I avoid sounding like every other sequence?",
        a: "Replace generic claims with one verifiable observation about the prospect. Then run the body through the Spam Word Checker and the subject through the Subject Line Tester.",
      },
      {
        q: "Can I use this for LinkedIn messages too?",
        a: "The frame works, but LinkedIn should be shorter. Steal the opener logic; cut the email scaffolding.",
      },
    ],
  },
  {
    slug: "roi-calculator",
    name: "Cold Outbound ROI Calculator",
    shortName: "ROI Calculator",
    tagline:
      "Model the revenue, payback, and ROI of a cold outbound program in seconds.",
    description:
      "Plug in your list size, conversion rates, and deal size. See projected pipeline, revenue, ROI multiple, and payback period — with a sensitivity table.",
    longDescription:
      "Sliders, not spreadsheets. Move list size, reply rate, meeting rate, and close rate to see how each lever changes pipeline, revenue, ROI, and payback. Industry-default benchmarks are baked in to keep your model honest.",
    category: "Strategy",
    icon: Calculator,
    order: 5,
    outputs: [
      "Projected pipeline & revenue",
      "ROI multiple and payback months",
      "Sensitivity by reply / close rate",
    ],
    timeToValue: "<1s",
    howItWorks: [
      {
        title: "Enter your assumptions",
        body:
          "List size per month, reply rate, meeting-set rate, close rate, ACV, and program cost.",
      },
      {
        title: "Watch the model update",
        body:
          "Every slider re-computes pipeline, revenue, ROI multiple, and payback in real time.",
      },
      {
        title: "Stress-test the case",
        body:
          "The sensitivity table shows what happens at half and double your reply / close rates. Bring the printout to your CFO.",
      },
    ],
    faqs: [
      {
        q: "What benchmarks should I use?",
        a: "For tight ICPs, plan roughly 1.5–4% reply rate, 25–40% reply→meeting, and 15–25% meeting→close on many B2B SaaS motions. We pre-fill conservative midpoints — stress-test in the sensitivity table.",
      },
      {
        q: "Why doesn't ROI account for sales-team time?",
        a: "It does if you enter all-in program cost: agency or SDR salary, tools, and management overhead. Do not model agency fee alone if an AE still burns hours on bad meetings.",
      },
      {
        q: "Can I share this model?",
        a: "Yes — the URL captures every input. Use Copy share link so finance and GTM argue about the same assumptions.",
      },
      {
        q: "What if ROI only works at heroic reply rates?",
        a: "That is a useful failure. Fix offer clarity, ICP, or ACV before buying more volume. Heroic assumptions are how outbound budgets get canceled in month two.",
      },
      {
        q: "Should I include opportunity cost of not doing outbound?",
        a: "For planning, model the program on its own first. Then separately compare against paid or hiring an internal pod — different decision, same honesty about conversion rates.",
      },
      {
        q: "Is pipeline the same as revenue?",
        a: "No. Pipeline is meetings × ACV (or your pipeline definition). Revenue applies close rate. Keep them separate so optimism does not hide in one number.",
      },
      {
        q: "How does this relate to your pricing?",
        a: "Use the calculator to see whether a done-for-you program can pay back under conservative assumptions, then compare against live pricing on /pricing.",
      },
    ],
  },
  {
    slug: "warmup-calculator",
    name: "Email Warmup Calculator",
    shortName: "Warmup Calculator",
    tagline:
      "Day-by-day warmup schedule for a brand-new sending domain.",
    description:
      "How long until your new sending domain is ready for full-volume cold outreach? Get a day-by-day plan based on your target sending volume.",
    longDescription:
      "Brand-new domains can't blast. We compute a day-by-day ramp using the industry-standard 30% growth rule, show you the total warmup window, and tell you when to switch from automated warmup tools to real cold sending.",
    category: "Deliverability",
    icon: Flame,
    order: 6,
    outputs: [
      "Day-by-day sending plan",
      "Total warmup days & end date",
      "Switch-to-cold milestone",
    ],
    timeToValue: "<1s",
    howItWorks: [
      {
        title: "Set your target volume",
        body:
          "Tell us how many cold sends per day per inbox you eventually want to hit.",
      },
      {
        title: "Pick your start date",
        body:
          "We compute the calendar — including weekends, since deliverability tools warm 7 days a week.",
      },
      {
        title: "Follow the ramp",
        body:
          "Day-by-day numbers, with a milestone for when you can switch off the warmup tool and run real campaigns.",
      },
    ],
    faqs: [
      {
        q: "What growth curve do you use?",
        a: "About 30% day-over-day from a low base (we start near 5 sends/day). It is the common ramp that builds reputation without looking like a sudden blast.",
      },
      {
        q: "Should I warm multiple inboxes in parallel?",
        a: "Yes — many teams warm 3–5 inboxes per domain. Calculator numbers are per-inbox; multiply for total daily volume across the domain.",
      },
      {
        q: "Do I still need a warmup tool?",
        a: "Especially in the first two weeks. Warmup tools create engagement patterns ESPs recognize. At the milestone, shift toward real ICP sends and keep warmup light if you need a buffer.",
      },
      {
        q: "Can I skip warmup if SPF/DKIM/DMARC pass?",
        a: "Authentication is required, not sufficient. A perfect DNS score on a brand-new domain still needs a ramp. Check DNS first, then follow the calendar.",
      },
      {
        q: "Should I warm on weekends?",
        a: "Most automated warmup tools run daily. This calendar includes weekends for that reason. Real cold sends to business buyers can favor weekdays once you graduate.",
      },
      {
        q: "What kills a warmup faster than anything?",
        a: "Sudden volume spikes, spammy copy, bad lists, and high complaint rates. Protect the domain like an asset — you are buying future inbox placement.",
      },
      {
        q: "When do I turn warmup off completely?",
        a: "After you hit target daily volume with stable placement and clean metrics. Some teams keep a low warmup trickle forever; others stop once cold volume is healthy. Watch bounces and spam complaints either way.",
      },
    ],
  },
]

/**
 * Lookup a tool by slug — returns undefined if not found, so the caller can
 * trigger Next's notFound() at the page boundary.
 */
export function getToolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug)
}

/**
 * Companion tools, excluding the current slug — used for the "Related tools"
 * strip at the bottom of every detail page. Returns 3 tools, wrapping order.
 */
export function getRelatedTools(slug: string, count = 3): Tool[] {
  const idx = TOOLS.findIndex((t) => t.slug === slug)
  if (idx === -1) return TOOLS.slice(0, count)
  const rest = [...TOOLS.slice(idx + 1), ...TOOLS.slice(0, idx)]
  return rest.slice(0, count)
}
