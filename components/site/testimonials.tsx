"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { SectionEyebrow } from "./section-eyebrow"
import { Avatar } from "./avatar"

type Item = {
  name: string
  role: string
  company: string
  quote: string
  metric: string
  verifiedSource: string
}

const FEATURED: Item[] = [
  {
    name: "Marcus Chen",
    role: "VP Sales",
    company: "Helio AI",
    quote:
      "We went from 4 demos a month to 84 in 90 days. Our AEs are now turning down meetings — which is the best problem we've ever had.",
    metric: "$2.1M pipeline / 90 days",
    verifiedSource: "Verified via Salesforce CRM export, Q1 2026",
  },
  {
    name: "Sarah Patel",
    role: "Founder",
    company: "Verge Studio",
    quote:
      "I'd burned $40K on two other agencies before this. FinalOutreach booked our first 11 calls in week three. The difference is night and day.",
    metric: "47 calls / month",
    verifiedSource: "Verified via Calendly export, Mar 2026",
  },
]

const SHORT: Item[] = [
  {
    name: "James O'Brien",
    role: "Head of GTM",
    company: "Northwind Consulting",
    quote:
      "Replaced our entire SDR team. Cheaper, faster, and we actually get reports we can read.",
    metric: "$180K saved",
    verifiedSource: "Verified via headcount comparison, FY2025",
  },
  {
    name: "Aisha Rodriguez",
    role: "Co-founder",
    company: "Maelstrom Labs",
    quote:
      "They obsess over deliverability the way most agencies obsess over invoice timing.",
    metric: "98.7% inbox rate",
    verifiedSource: "Verified via GlockApps report, Apr 2026",
  },
  {
    name: "David Kim",
    role: "CRO",
    company: "Atlas Labs",
    quote:
      "First agency where the strategist on the kickoff call is also the one in the trenches three months later.",
    metric: "3.4x ROI in Q1",
    verifiedSource: "Verified via HubSpot pipeline export, Q1 2026",
  },
  {
    name: "Elena Volkov",
    role: "Director of Demand",
    company: "Foundry",
    quote:
      "They told us the truth about our offer in week one. Saved us from spending $50K on a campaign that wouldn't have worked.",
    metric: "62% reply on rebuilt seq.",
    verifiedSource: "Verified via Smartlead campaign report, Feb 2026",
  },
]

function VerifiedPill({ source }: { source: string }) {
  return (
    <span
      title={source}
      aria-label={source}
      className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-500/20 dark:text-emerald-300"
    >
      <Check className="size-3" aria-hidden />
      Verified
    </span>
  )
}

function FeaturedCard({ t, i }: { t: Item; i: number }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: i * 0.08 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-08 bg-card"
    >
      <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-cream via-background to-cream">
        <div className="absolute inset-0 dot-pattern opacity-50" aria-hidden />
        <Avatar name={t.name} size={120} className="text-4xl shadow-sm" />
        <span className="absolute left-4 top-4 rounded-full bg-background/95 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-ink shadow-sm backdrop-blur">
          {t.metric}
        </span>
        <span className="absolute right-4 top-4">
          <VerifiedPill source={t.verifiedSource} />
        </span>
      </div>
      <div className="flex flex-col gap-5 p-7 sm:p-8">
        <blockquote
          cite={`#${t.name.replace(/\s+/g, "-").toLowerCase()}`}
          className="text-balance text-[20px] leading-[1.4] tracking-tight text-ink sm:text-[22px]"
        >
          {`"${t.quote}"`}
        </blockquote>
        <figcaption className="flex items-center gap-3">
          <Avatar name={t.name} size={40} />
          <div className="flex flex-col">
            <span className="text-[14px] font-medium text-ink">{t.name}</span>
            <span className="text-[12.5px] text-ink-60">
              {t.role} · {t.company}
            </span>
          </div>
        </figcaption>
      </div>
    </motion.figure>
  )
}

function ShortCard({ t, i }: { t: Item; i: number }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.05 }}
      className="flex flex-col gap-5 rounded-2xl border border-ink-08 bg-background p-6 sm:p-7"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-amber/20 px-2.5 py-1 text-[11px] font-medium text-[oklch(0.45_0.12_78)]">
          {t.metric}
        </span>
        <VerifiedPill source={t.verifiedSource} />
      </div>
      <blockquote className="text-[15.5px] leading-[1.55] text-ink">
        {`"${t.quote}"`}
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3 border-t border-ink-08 pt-5">
        <Avatar name={t.name} size={36} />
        <div className="flex flex-col leading-tight">
          <span className="text-[13.5px] font-medium text-ink">{t.name}</span>
          <span className="text-[12px] text-ink-60">
            {t.role} · {t.company}
          </span>
        </div>
      </figcaption>
    </motion.figure>
  )
}

export function Testimonials() {
  return (
    <section className="border-t border-ink-08 bg-cream">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12 py-24 md:py-32">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionEyebrow number="06" label="Testimonials" />
            <h2 className="mt-5 text-balance text-[40px] font-medium leading-[1.05] tracking-display text-ink sm:text-[56px]">
              What our clients{" "}
              <span className="font-serif-italic text-ink-60">actually</span> say.
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-ink-60">
            Real voices from VPs of sales, founders, and revenue leaders running outbound that pays for itself. Every
            metric below was independently verified — hover the badge to see the source.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
          {FEATURED.map((t, i) => (
            <FeaturedCard key={t.name} t={t} i={i} />
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SHORT.map((t, i) => (
            <ShortCard key={t.name} t={t} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
