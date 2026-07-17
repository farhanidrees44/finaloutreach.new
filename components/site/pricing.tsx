"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { SectionEyebrow } from "./section-eyebrow"
import { SITE } from "@/lib/site-data"

const PACKAGES = [
  {
    name: "Starter engagement",
    price: "$3,500",
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
    price: "$7,500",
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
    price: "Custom",
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
  return (
    <section
      id="pricing"
      className="border-t border-ink-08 bg-cream"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12 py-20 md:py-24">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionEyebrow number="12" label="Pricing" />
            <h2 className="mt-5 text-balance text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-ink">
              Simple, transparent{" "}
              <span className="font-serif-italic text-ink-60">
                engagements.
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-ink-60">
            Pick a starting point. We&apos;ll customize the rest on the call.
          </p>
        </div>

        <ul className="mt-14 flex flex-col gap-4">
          {PACKAGES.map((p, i) => (
            <motion.li
              key={p.name}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className={cn(
                "group relative grid grid-cols-1 gap-8 rounded-2xl border bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-32px_rgba(20,20,16,0.45)] sm:p-9 lg:grid-cols-[260px_1fr_280px] lg:items-center lg:gap-10",
                p.featured
                  ? "scale-[1.01] border-primary/50 shadow-[0_0_0_1px_oklch(0.55_0.14_155/0.25),0_20px_50px_-28px_oklch(0.55_0.14_155/0.45)] hover:border-primary"
                  : "border-ink-08 hover:border-ink/25",
              )}
            >
              {p.featured && (
                <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-primary-foreground">
                  Most popular
                </span>
              )}

              <div className="flex flex-col gap-2">
                <h3 className="text-[22px] font-bold tracking-tight text-ink sm:text-[26px]">
                  {p.name}
                </h3>
                <p className="text-[14px] text-ink-60">{p.blurb}</p>
              </div>

              <div className="flex flex-col gap-4 border-t border-ink-08 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[40px] font-semibold leading-none tabular tracking-display text-ink">
                    {p.price}
                  </span>
                  {p.cadence && (
                    <span className="text-[14px] text-ink-60">
                      {p.cadence}
                    </span>
                  )}
                </div>
                <ul className="flex flex-col gap-2 text-[14px] text-ink-60 sm:flex-wrap sm:flex-row sm:items-center sm:gap-x-1.5 sm:gap-y-2">
                  {p.items.map((it, idx) => (
                    <li key={it} className="flex items-center gap-1.5">
                      <span className="text-ink">{it}</span>
                      {idx < p.items.length - 1 && (
                        <span aria-hidden="true" className="hidden text-ink-40 sm:inline">
                          ·
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
                <p className="text-[12.5px] uppercase tracking-[0.14em] text-ink-40">
                  Best for: {p.fit}
                </p>
              </div>

              <div className="flex lg:justify-end">
                <a
                  href={SITE.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex h-12 items-center gap-2 rounded-full px-5 text-[14.5px] font-semibold transition-all active:scale-[0.97]",
                    p.featured
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-ink text-background hover:bg-ink/90",
                  )}
                >
                  {p.cta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </motion.li>
          ))}
        </ul>

        <p className="mt-8 text-center text-[13px] text-ink-60">
          All engagements include free infrastructure setup —{" "}
          <span className="text-ink">$1,500 value</span>.
        </p>
      </div>
    </section>
  )
}
