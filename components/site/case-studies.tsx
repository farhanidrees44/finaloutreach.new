"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { SectionEyebrow } from "./section-eyebrow"
import { HOMEPAGE_CASE_STUDIES } from "@/data/homepage-case-studies"

const isDev = process.env.NODE_ENV !== "production"

/**
 * Homepage case studies — honest placeholders until real permissioned stories exist.
 * Does not invent companies, people, or metrics.
 */
export function CaseStudies() {
  const reduced = useReducedMotion()

  return (
    <section
      id="case-studies"
      className="relative border-t border-ink-08 bg-background"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionEyebrow number="08" label="Case studies" />
            <h2 className="mt-5 text-balance text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.05] tracking-display text-ink">
              Recent wins —{" "}
              <span className="font-serif-italic text-ink-60">
                when we can name them.
              </span>
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-60">
              Named companies and faces appear only with written permission.
              Slots below are placeholders until those permissions are in place.
            </p>
          </div>
          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-ink"
          >
            <span className="link-underline">Browse case study pages</span>
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {HOMEPAGE_CASE_STUDIES.map((cs, i) => (
            <motion.li
              key={cs.id}
              initial={reduced ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              className="relative flex flex-col rounded-2xl border border-dashed border-ink-08 bg-cream/40 p-6"
            >
              {isDev && cs.isPlaceholder && (
                <span className="absolute left-0 top-0 bg-amber-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Sample
                </span>
              )}
              <p className="text-[11px] uppercase tracking-[0.14em] text-ink-40">
                {cs.industry} · {cs.timeframe}
              </p>
              <h3 className="mt-3 text-[17px] font-medium leading-snug text-ink">
                {cs.headline}
              </h3>
              <p className="mt-3 flex-1 text-[14px] leading-relaxed text-ink-60">
                &ldquo;{cs.quote}&rdquo;
              </p>
              <div className="mt-5 border-t border-ink-08 pt-4">
                <p className="text-[14px] font-medium text-ink">{cs.personName}</p>
                <p className="text-[12px] text-ink-40">
                  {cs.role} · {cs.client}
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-ink-40">
                  <span>{cs.metricPrimary}</span>
                  <span aria-hidden>·</span>
                  <span>{cs.metricSecondary}</span>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
