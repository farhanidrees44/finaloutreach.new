"use client"

import { Check, X } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { SectionEyebrow } from "./section-eyebrow"
import {
  slideFromLeft,
  slideFromRight,
  staggerContainer,
  viewportOnce,
  motionSafe,
} from "@/lib/motion"

/**
 * Side-by-side differentiators — every line is already claimed elsewhere
 * on the site (Process, FAQ, Hero, Services). No invented claims.
 */
const ROWS = [
  {
    us: "Hands-on operators who live in the tools",
    them: "Account manager you never talk to",
  },
  {
    us: "Real campaign dashboards on the strategy call",
    them: "Slide-deck reporting after the fact",
  },
  {
    us: "21-day proper domain warmup before volume",
    them: "Rushed sends that tank deliverability",
  },
  {
    us: "Custom sequences per persona — not templates",
    them: "Generic AI copy sprayed at a bought list",
  },
  {
    us: "Senior strategists · ~10 clients / quarter",
    them: "Junior pods stretched across dozens of accounts",
  },
  {
    us: "Meetings booked into your calendar",
    them: "Lead dumps you still have to chase",
  },
] as const

export function OperatorDifference() {
  const reduced = useReducedMotion()
  const container = motionSafe(reduced, staggerContainer)
  const left = motionSafe(reduced, slideFromLeft)
  const right = motionSafe(reduced, slideFromRight)

  return (
    <section id="difference" className="border-t border-ink-08 bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24 lg:px-12">
        <div className="max-w-2xl">
          <SectionEyebrow number="05b" label="Difference" />
          <h2 className="type-h2 mt-5 text-balance text-ink">
            What you get — and what you&apos;re{" "}
            <span className="font-serif-italic font-normal text-ink-60">
              done with.
            </span>
          </h2>
          <p className="type-body mt-4 max-w-xl text-ink-60">
            Pulled from how we actually run engagements — Process, Services,
            and the FAQ — not a marketing wishlist.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-ink-08 bg-background">
          <div className="grid grid-cols-1 border-b border-ink-08 sm:grid-cols-2">
            <div className="border-b border-ink-08 bg-electric-blue/[0.04] px-5 py-3.5 sm:border-b-0 sm:border-r sm:border-ink-08">
              <p className="type-label text-electric-blue">With FinalOutreach</p>
            </div>
            <div className="bg-ink/[0.02] px-5 py-3.5">
              <p className="type-label text-ink-40">Typical agency theatre</p>
            </div>
          </div>

          <motion.ul
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="divide-y divide-ink-08"
          >
            {ROWS.map((row) => (
              <li key={row.us} className="grid grid-cols-1 sm:grid-cols-2">
                <motion.div
                  variants={left}
                  className="flex items-start gap-3 border-b border-ink-08 px-5 py-4 sm:border-b-0 sm:border-r sm:border-ink-08"
                >
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-electric-blue"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                  <span className="type-body text-[14.5px] text-ink">
                    {row.us}
                  </span>
                </motion.div>
                <motion.div
                  variants={right}
                  className="flex items-start gap-3 px-5 py-4"
                >
                  <X
                    className="mt-0.5 size-4 shrink-0 text-ink-40"
                    strokeWidth={2.25}
                    aria-hidden
                  />
                  <span className="type-body text-[14.5px] text-ink-60">
                    {row.them}
                  </span>
                </motion.div>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
