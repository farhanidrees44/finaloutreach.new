"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { SectionEyebrow } from "./section-eyebrow"

/**
 * 01 · Process — outreach engine workflow.
 *
 * TODO: Replace the file at /public/process/outreach-engine-workflow.png
 * with the final diagram export (same path, no code change required).
 * Current asset is a working placeholder matching the intended 16:9 layout.
 */
export function ProcessSection() {
  const reduced = useReducedMotion()

  return (
    <section id="process" className="border-t border-ink-08 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow
            number="01"
            label="Process"
            className="justify-center"
          />
          <h2 className="mt-5 text-balance text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.05] tracking-tight text-ink">
            The engine behind every{" "}
            <span className="font-serif-italic text-electric-blue">
              meeting.
            </span>
          </h2>
          <p className="mt-4 text-[15px] font-bold leading-relaxed text-ink-60 sm:text-[16px]">
            Six connected steps, one system. Every lead gets found, verified,
            contacted, and followed up, with nothing handled off to a junior VA
            and nothing dropped between steps.
          </p>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto mt-10 w-full max-w-6xl overflow-hidden rounded-2xl border border-ink-08 bg-card shadow-[var(--shadow-sm)]"
        >
          <div className="relative aspect-[16/9] w-full">
            <Image
              src="/process/outreach-engine-workflow.png"
              alt="FinalOutreach outreach workflow: find leads, enrich and verify, cold email, follow-up calls, multi-channel outreach, and book meetings, with analytics and optimization across every step."
              fill
              className="object-contain object-center p-2 sm:p-4 md:p-6"
              sizes="(max-width: 1280px) 100vw, 1152px"
              priority={false}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
