"use client"

import { motion } from "framer-motion"
import { SectionEyebrow } from "./section-eyebrow"
import { CountUp } from "./count-up"

/**
 * PLACEHOLDER STATS — verify against CRM / reporting before ship.
 * Numbers below are illustrative of scale claims historically used on-site;
 * replace with audited figures and set `isPlaceholder: false`.
 */
const STATS = [
  {
    value: 47,
    prefix: "$",
    suffix: "M+",
    decimals: 0,
    label: "Pipeline influenced for clients",
    isPlaceholder: true, // PLACEHOLDER — replace before deploy
  },
  {
    value: 12400,
    prefix: "",
    suffix: "+",
    decimals: 0,
    label: "Qualified meetings booked",
    isPlaceholder: true, // PLACEHOLDER — replace before deploy
  },
  {
    value: 200,
    prefix: "",
    suffix: "+",
    decimals: 0,
    label: "B2B companies served",
    isPlaceholder: true, // PLACEHOLDER — replace before deploy
  },
  {
    value: 3.2,
    prefix: "",
    suffix: "x",
    decimals: 1,
    label: "Average ROI within 90 days",
    isPlaceholder: true, // PLACEHOLDER — replace before deploy
  },
]

const isDev = process.env.NODE_ENV !== "production"

export function ResultsBar() {
  return (
    <section className="relative overflow-hidden border-t border-ink-08 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="mb-12 flex flex-col gap-3">
          <SectionEyebrow number="05" label="By the numbers" />
          <h2 className="max-w-2xl text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.05] tracking-display text-ink">
            Outcomes we optimize for —{" "}
            <span className="font-serif-italic text-ink-60">meetings and pipeline.</span>
          </h2>
          <p className="max-w-xl text-[14px] text-ink-40">
            Figures marked SAMPLE in development are pending audited source data
            before production.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col gap-2 border-t border-ink-08 pt-6"
            >
              {isDev && s.isPlaceholder && (
                <span className="absolute right-0 top-2 bg-amber-500 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                  Sample
                </span>
              )}
              <CountUp
                value={s.value}
                prefix={s.prefix}
                suffix={s.suffix}
                decimals={s.decimals}
                className="text-[clamp(2.5rem,5vw,4.25rem)] font-semibold leading-[0.95] tracking-display text-ink [font-variant-numeric:tabular-nums]"
              />
              <span className="max-w-[28ch] text-[14px] leading-relaxed text-ink-60">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
