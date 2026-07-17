"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionEyebrow } from "./section-eyebrow"
import { CountUp } from "./count-up"
import { SITE } from "@/lib/site-data"
import {
  fadeUp,
  staggerContainer,
  viewportOnce,
  motionSafe,
  springSnappy,
} from "@/lib/motion"

const PACKAGES = [
  {
    name: "Starter engagement",
    priceNum: 3500,
    priceLabel: null as string | null,
    cadence: "/ month",
    blurb: "For founders ready to test cold outreach.",
    items: [
      "1 campaign",
      "2,000 prospects",
      "Weekly reports",
      "~21-day domain warmup",
      "SPF / DKIM / DMARC setup",
      "Custom sequence + reply playbook",
    ],
    fit: "Pre-seed to Series A",
    cta: "Book intro call",
    featured: false,
  },
  {
    name: "Growth engagement",
    priceNum: 7500,
    priceLabel: null as string | null,
    cadence: "/ month",
    blurb: "For teams scaling outbound seriously.",
    items: [
      "3 campaigns",
      "8,000 prospects",
      "Dedicated strategist",
      "Friday performance & pipeline review",
      "Weekly A/B on copy & cadence",
      "Live dashboard walkthrough on call",
      "CRM-ready lead handoff",
      "Infrastructure setup included",
    ],
    fit: "Series A to Series B",
    cta: "Book intro call",
    featured: true,
  },
  {
    name: "Enterprise",
    priceNum: null as number | null,
    priceLabel: "Custom",
    cadence: "",
    blurb: "For revenue teams treating outbound as a channel.",
    items: [
      "Unlimited campaigns",
      "Full SDR team",
      "Custom integrations",
      "Dedicated operator pod",
      "Quarterly scaling plan",
      "Priority infrastructure & deliverability",
      "Multi-channel (email + LinkedIn)",
    ],
    fit: "Series B+ and established",
    cta: "Book strategy call",
    featured: false,
  },
]

export function Pricing() {
  const reduced = useReducedMotion()
  const container = motionSafe(reduced, staggerContainer)
  const item = motionSafe(reduced, fadeUp)

  return (
    <section id="pricing" className="border-t border-ink-08 bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24 lg:px-12">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionEyebrow number="12" label="Pricing" />
            <h2 className="type-h2 mt-5 text-balance text-ink">
              Simple, transparent{" "}
              <span className="font-serif-italic font-normal text-ink-60">
                engagements.
              </span>
            </h2>
          </div>
          <p className="type-body max-w-sm text-ink-60">
            Pick a starting point. We&apos;ll customize the rest on the call.
          </p>
        </div>

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 flex flex-col gap-4"
        >
          {PACKAGES.map((p) => (
            <motion.li
              key={p.name}
              variants={item}
              whileHover={
                reduced ? undefined : { y: -2, transition: springSnappy }
              }
              className={cn(
                "group relative grid grid-cols-1 gap-8 rounded-2xl border bg-background p-7 sm:p-9 lg:grid-cols-[260px_1fr_280px] lg:items-center lg:gap-10",
                p.featured
                  ? "scale-[1.01] border-electric-blue/50 shadow-[0_0_0_1px_oklch(0.58_0.22_250_/_0.25),0_20px_50px_-28px_oklch(0.58_0.22_250_/_0.35)]"
                  : "border-ink-08 hover:border-ink/25",
              )}
            >
              {p.featured && (
                <motion.span
                  initial={reduced ? false : { opacity: 0, y: -6, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={springSnappy}
                  className="absolute -top-3 left-7 rounded-full bg-electric-blue px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white"
                >
                  Most popular
                </motion.span>
              )}

              <div className="flex flex-col gap-2">
                <h3 className="type-h3 text-ink sm:text-[26px]">{p.name}</h3>
                <p className="text-[14px] text-ink-60">{p.blurb}</p>
              </div>

              <div className="flex flex-col gap-4 border-t border-ink-08 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                <div className="flex items-baseline gap-1.5">
                  {p.priceNum != null ? (
                    <span className="type-stat text-ink">
                      $
                      <CountUp value={p.priceNum} duration={1400} />
                    </span>
                  ) : (
                    <span className="type-stat text-ink">{p.priceLabel}</span>
                  )}
                  {p.cadence && (
                    <span className="text-[14px] text-ink-60">{p.cadence}</span>
                  )}
                </div>
                <ul className="flex flex-col gap-2 text-[14px] text-ink-60 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-1.5 sm:gap-y-2">
                  {p.items.map((it, idx) => (
                    <li key={it} className="flex items-center gap-1.5">
                      <span className="text-ink">
                        <span className="proof">{it.split(" ")[0]}</span>
                        {" "}
                        {it.split(" ").slice(1).join(" ")}
                      </span>
                      {idx < p.items.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="hidden text-ink-40 sm:inline"
                        >
                          ·
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
                <p className="type-label text-ink-40">Best for: {p.fit}</p>
              </div>

              <div className="flex lg:justify-end">
                <a
                  href={SITE.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex h-12 items-center gap-2 rounded-full px-5 text-[14.5px] font-semibold transition-all active:scale-[0.97]",
                    p.featured
                      ? "bg-electric-blue text-white hover:brightness-110"
                      : "bg-ink text-background hover:bg-ink/90",
                  )}
                >
                  {p.cta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        <p className="mt-8 text-center text-[13px] text-ink-60">
          All engagements include free infrastructure setup —{" "}
          <span className="proof">$1,500 value</span>.
        </p>
      </div>
    </section>
  )
}
