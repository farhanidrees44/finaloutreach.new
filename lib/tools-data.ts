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
      "Score any subject line against 14 deliverability and open-rate factors.",
    description:
      "Test cold email subject lines against length, spam triggers, urgency, personalization, casing, and curiosity gap. Get an instant open-rate score.",
    longDescription:
      "Paste a subject line, get an open-rate score in milliseconds. We grade against the same 14 factors top SDR teams use — length, casing, spam triggers, personalization tokens, urgency, curiosity, specificity, and more — then tell you exactly what to change.",
    category: "Copy",
    icon: Sparkles,
    order: 1,
    outputs: [
      "Open-rate score 0–100",
      "Per-factor breakdown",
      "Specific rewrite suggestions",
    ],
    timeToValue: "<2s",
    howItWorks: [
      {
        title: "Paste a subject line",
        body:
          "Type or paste any subject line. We analyze it client-side — nothing is sent to a server.",
      },
      {
        title: "Get a 0–100 score",
        body:
          "We weight 14 deliverability and engagement factors, then surface the ones hurting your open rate.",
      },
      {
        title: "Apply the fixes",
        body:
          "Each failing check tells you what to change and why, with example rewrites.",
      },
    ],
    faqs: [
      {
        q: "What makes a subject line score high?",
        a: "Subject lines under 50 characters, in sentence case, with a single specific number or personalization token, no spam triggers, and a clear curiosity gap consistently outperform on cold open rates.",
      },
      {
        q: "Is my data sent anywhere?",
        a: "No. The tester runs entirely in your browser. We never log, store, or transmit the subject lines you test.",
      },
      {
        q: "What open rate should I expect?",
        a: "Healthy cold outbound subject lines should see 35–55% open rates on a warmed-up domain to a clean list. Below 30% indicates a subject-line, list, or deliverability issue.",
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
        a: "No tool can. But a Low score means you've removed the cheap, obvious signals. Inbox placement also depends on your domain reputation, SPF/DKIM/DMARC, list hygiene, and reply rates.",
      },
      {
        q: "Do you check 'spammy' formatting like links and images?",
        a: "Yes — we flag excessive links, all-caps runs, and money-related phrases. We don't render HTML, so test plain text or copy from your sending tool.",
      },
      {
        q: "How is this different from a spam-rating service like Mail-Tester?",
        a: "Mail-Tester checks your actual delivery, headers, and DNS. This is a content-only checker that runs in your browser — use it before you ever send a test.",
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
        q: "Why does DKIM show 'inconclusive' on a working domain?",
        a: "DKIM uses a 'selector' chosen by your email provider (Google, Microsoft, SendGrid, etc.). We probe the most common selectors but cannot guess every custom one. If you know your selector, the absence here is not necessarily a problem.",
      },
      {
        q: "Will this fix my deliverability?",
        a: "It will tell you what's missing. Adding the records is a 5-minute DNS edit. If you'd like us to handle the full warmup, infrastructure, and sending setup, book a strategy call.",
      },
      {
        q: "Is the lookup logged?",
        a: "No. We perform the DNS query and discard the result after returning it to your browser.",
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
        a: "They're built from a structured frame — not a language model. That means they're consistent, not 'creative,' and they always follow proven cold-email anatomy: relevance hook, problem, micro-offer, soft CTA.",
      },
      {
        q: "Can I customize the cadence?",
        a: "The default cadence is Day 0, Day 3, Day 7. Many teams use 4–6 touches; this tool gives you the first 3, which carry 80% of the response weight.",
      },
      {
        q: "Will these get me booked meetings?",
        a: "Templates are 20% of the equation. List quality, sender infrastructure, deliverability, and personalization carry the other 80%. We do all of it for clients — book a call to see how.",
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
        a: "Healthy cold outbound to a tightly-defined ICP runs 1.5–4% reply rate, 25–40% reply→meeting, and 15–25% meeting→close on a B2B SaaS deal. We pre-fill the sliders with conservative midpoints.",
      },
      {
        q: "Why doesn't ROI account for sales-team time?",
        a: "It does — program cost should be all-in: agency fees + SDR salary + tooling. The default cost field assumes a fully-loaded outbound program.",
      },
      {
        q: "Can I share this model?",
        a: "Yes — the URL captures every input. Hit 'Copy share link' to send a populated calculator to anyone.",
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
        a: "30% day-over-day, the consensus rate that lets ESPs build a healthy reputation without tripping rate limits or filters. We start at 5 sends/day and ramp from there.",
      },
      {
        q: "Should I warm up multiple inboxes in parallel?",
        a: "Yes — most teams warm 3–5 inboxes per domain in parallel. The numbers in this calculator are per-inbox; multiply by your inbox count for total daily volume.",
      },
      {
        q: "Do I still need a warmup tool?",
        a: "Yes, especially in the first 14 days. Warmup tools generate inbound replies that train ESPs your domain is human. Switch them off at the milestone we flag.",
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
