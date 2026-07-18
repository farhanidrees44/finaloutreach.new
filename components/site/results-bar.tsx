"use client"

import { motion } from "framer-motion"
import { SectionEyebrow } from "./section-eyebrow"
import { CountUp } from "./count-up"

/**
 * Stats tied to proof visible elsewhere on the page (Smartlead screenshot)
 * plus operational commitments — not invented pipeline aggregates.
 */
const STATS = [
  {
    value: 11.58,
    prefix: "",
    suffix: "%",
    decimals: 2,
    label: "Reply rate — property management campaign",
  },
  {
    value: 145,
    prefix: "",
    suffix: "",
    decimals: 0,
    label: "Unique replies on that send",
  },
  {
    value: 1258,
    prefix: "",
    suffix: "",
    decimals: 0,
    label: "Leads in the same campaign",
  },
  {
    value: 3,
    prefix: "",
    suffix: "",
    decimals: 0,
    label: "Active sequences in that program",
  },
]

export function ResultsBar() {
  return (
    <section className="relative overflow-hidden border-t border-ink-08 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
        <div className="mb-10 flex flex-col gap-3">
          <SectionEyebrow number="04" label="By the numbers" />
          <h2 className="max-w-2xl text-balance text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-ink">
            One live campaign,{" "}
            <span className="font-serif-italic text-ink-60">real dashboard numbers.</span>
          </h2>
          <p className="max-w-xl text-[14px] text-ink-40">
            Figures below match the Smartlead screenshot in Proof — not rolled-up
            marketing aggregates.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col gap-2 border-t border-ink-08 pt-6"
            >
              <CountUp
                value={s.value}
                prefix={s.prefix}
                suffix={s.suffix}
                decimals={s.decimals}
                className="text-[clamp(2.25rem,4vw,3.25rem)] font-bold leading-none tracking-tight tabular text-ink"
              />
              <p className="max-w-[18ch] text-[13.5px] leading-snug text-ink-60">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
