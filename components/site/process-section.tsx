"use client"

import { motion, useReducedMotion } from "framer-motion"
import { SectionEyebrow } from "./section-eyebrow"
import { OutreachEngineFlow } from "./outreach-engine-flow"

/** Process — centered, bold, premium outreach engine workflow. */
export function ProcessSection() {
  const reduced = useReducedMotion()

  return (
    <section id="process" className="border-t border-ink-08 bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow label="Workflow" className="justify-center" />
          <h2 className="mt-6 text-balance text-[clamp(2.1rem,4.2vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-ink">
            We launch fast and create{" "}
            <span className="font-serif-italic text-electric-blue">
              momentum that scales.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] font-bold leading-[1.6] text-ink sm:text-[17px]">
            We move quickly in the first weeks to get everything live, then spend
            the following months testing, refining, and scaling what works — so
            results compound, not stall.
          </p>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto mt-12 w-full max-w-6xl"
        >
          <OutreachEngineFlow />
        </motion.div>
      </div>
    </section>
  )
}
