"use client"

import { motion } from "framer-motion"
import { SectionEyebrow } from "./section-eyebrow"

const POINTS = [
  {
    vs: "Hiring SDRs",
    headline: "75% cheaper. Live in 2 weeks. No HR headache.",
    detail: "An in-house SDR is $80K+ all-in before you measure a single meeting.",
  },
  {
    vs: "Other agencies",
    headline: "We don't manage 100 clients. We take 10 and deliver.",
    detail: "Senior strategists own your account end to end. No revolving door of juniors.",
  },
  {
    vs: "DIY tools",
    headline: "Tools cost $500/mo. We bring strategy + execution.",
    detail: "Buying Smartlead doesn't write your copy or build your list. We do both.",
  },
  {
    vs: "Doing nothing",
    headline: "Pipeline doesn't fill itself. Every week costs deals.",
    detail: "Your competitors are sending 5,000 emails today. The math doesn't get better waiting.",
  },
]

export function WhyUs() {
  return (
    <section className="border-t border-ink-08 bg-cream">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12 py-24 md:py-32">
        <div className="max-w-3xl">
          <SectionEyebrow number="04" label="Why us" />
          <h2 className="mt-5 text-balance text-[40px] font-medium leading-[1.05] tracking-display text-ink sm:text-[56px]">
            Why teams hire us instead of an SDR or{" "}
            <span className="font-serif-italic text-ink-60">
              another agency.
            </span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ink-08 bg-ink-08 sm:grid-cols-2">
          {POINTS.map((p, i) => (
            <motion.div
              key={p.vs}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="flex flex-col gap-4 bg-background p-8 sm:p-10"
            >
              <span className="text-[12px] uppercase tracking-[0.18em] text-ink-40">
                vs {p.vs}
              </span>
              <h3 className="text-balance text-[22px] font-medium leading-[1.2] tracking-display text-ink sm:text-[26px]">
                {p.headline}
              </h3>
              <p className="text-[14.5px] leading-[1.65] text-ink-60">
                {p.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
