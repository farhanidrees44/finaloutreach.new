"use client"

import { motion } from "framer-motion"
import { ShieldCheck } from "lucide-react"
import { SectionEyebrow } from "./section-eyebrow"
import { CountUp } from "./count-up"

const STATS = [
  {
    value: 18,
    suffix: " mo",
    label: "Average client tenure",
    sub: "Most agencies struggle to keep clients past 6 months. We grow with you.",
    source: "FinalOutreach internal billing data, Q1 2026",
  },
  {
    value: 94,
    suffix: "%",
    label: "Client retention rate",
    sub: "We grow with our clients, not from churn.",
    source: "Trailing-12-month renewals, calculated Apr 2026",
  },
  {
    value: 4.7,
    decimals: 1,
    suffix: "x",
    label: "Average ROI within 90 days",
    sub: "Real pipeline, not vanity metrics.",
    source: "Median ROI across 142 client engagements, 2024–2026",
  },
  {
    value: 23,
    suffix: "",
    label: "Industries served",
    sub: "From SaaS and consulting to manufacturing and fintech.",
    source: "Active client roster as of Apr 2026",
  },
]

export function ByNumbers() {
  return (
    <section className="border-t border-ink-08 bg-background">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12 py-24 md:py-32">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionEyebrow number="04" label="By the numbers" />
            <h2 className="mt-5 text-balance text-[40px] font-bold leading-[1.05] tracking-tight text-ink sm:text-[56px]">
              Five years.{" "}
              <span className="font-serif-italic text-ink-60">Receipts, not promises.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-ink-60">
            We&apos;d rather show you the math than spin a story. Numbers taken from our active book of business.
            Hover any stat for the source.
          </p>
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ink-08 bg-ink-08 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.li
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="flex flex-col gap-3 bg-background p-8 lg:p-10"
            >
              <div className="flex items-center justify-between">
                <span className="text-[12px] uppercase tracking-[0.18em] text-ink-40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  title={s.source}
                  aria-label={s.source}
                  className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-700 ring-1 ring-emerald-500/20 dark:text-emerald-300"
                >
                  <ShieldCheck className="size-3" aria-hidden />
                  Verified
                </span>
              </div>
              <div className="text-[44px] font-bold leading-none tracking-tight text-ink sm:text-[56px] lg:text-[64px]">
                <CountUp value={s.value} decimals={s.decimals ?? 0} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-[14.5px] font-medium tracking-tight text-ink">{s.label}</div>
              <p className="text-[13.5px] leading-[1.55] text-ink-60">{s.sub}</p>
            </motion.li>
          ))}
        </ul>
        <p className="mt-6 text-center text-[12px] uppercase tracking-[0.18em] text-ink-40">
          Sources: internal CRM, Cal.com, Smartlead, GlockApps · last reviewed April 2026
        </p>
      </div>
    </section>
  )
}
