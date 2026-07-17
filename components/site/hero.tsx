"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { SITE } from "@/lib/site-data"

/**
 * Premium rounded hero card — dark gradient, centered hierarchy, verified stats.
 * Omits trust-rating / client-count / photo overlays until real assets exist.
 *
 * Stats source: same Smartlead property-management campaign as ResultsBar / Proof.
 */
const HERO_STATS = [
  { value: "1,258", label: "Leads in campaign" },
  { value: "11.58%", label: "Reply rate" },
  { value: "145", label: "Unique replies" },
] as const

export function Hero() {
  const reduced = useReducedMotion()

  return (
    <section className="relative px-4 pb-10 pt-20 sm:px-6 sm:pt-24 md:pb-12 md:pt-28">
      <div
        className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-[24px] sm:rounded-[28px] md:rounded-[32px]"
        style={{
          // Near-black → brand navy / electric-blue (no purple)
          background:
            "linear-gradient(165deg, oklch(0.14 0.01 250) 0%, oklch(0.18 0.04 250) 42%, oklch(0.32 0.12 250) 78%, oklch(0.42 0.16 250) 100%)",
        }}
      >
        {/* Soft blue glow texture — no photo asset available */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 100%, oklch(0.58 0.22 250 / 0.35), transparent 70%), radial-gradient(ellipse 50% 40% at 80% 20%, oklch(0.58 0.22 250 / 0.12), transparent 55%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(oklch(1 0 0) 0.6px, transparent 0.6px)",
            backgroundSize: "18px 18px",
          }}
        />

        <div className="relative mx-auto flex max-w-[800px] flex-col items-center px-6 py-10 text-center sm:px-10 sm:py-14 md:px-12 md:py-16 lg:py-20">
          {/* Positioning eyebrow (existing copy) */}
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.4 }}
            className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/55 sm:text-[13px]"
          >
            B2B Cold Outreach Agency
          </motion.p>

          <h1 className="mt-5 max-w-[14ch] text-balance text-[28px] font-semibold leading-[1.12] tracking-display text-white sm:mt-6 sm:text-[40px] md:text-[48px] lg:text-[56px]">
            <motion.span
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { delay: 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }
              }
              className="block"
            >
              Stop Hiring Agencies.
            </motion.span>
            <motion.span
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { delay: 0.16, duration: 0.5, ease: [0.22, 1, 0.36, 1] }
              }
              className="mt-1 block font-serif-italic text-white/90"
            >
              Start Booking Meetings.
            </motion.span>
          </h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.28 }}
            className="mt-5 max-w-[600px] text-pretty text-[17px] leading-[1.55] text-white/65 sm:mt-6 sm:text-[19px] md:text-[20px]"
          >
            Most teams burn 3–4 agencies before finding one that works. We&apos;re
            built to be your last one — hands-on operators, real infrastructure,
            meetings booked directly into your calendar.
          </motion.p>

          {/* Eyebrow above CTA — existing positioning line */}
          <motion.p
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.36 }}
            className="mt-6 text-[13px] font-medium tracking-tight text-white/50 sm:mt-7"
          >
            {SITE.name} · Done-for-you outbound
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.42 }}
            className="mt-5 flex flex-col items-center gap-3 sm:mt-6"
          >
            <a
              href={SITE.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-[14px] text-[15px] font-semibold tracking-tight text-[oklch(0.14_0.01_250)] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.45)] transition-all duration-200 hover:scale-[1.03] hover:bg-white/95 active:scale-[0.98] sm:px-8 sm:text-[15.5px]"
            >
              Get Your Custom Growth Blueprint
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            {/* Micro-trust: real call format only — no invented client count */}
            <p className="max-w-sm text-[12.5px] leading-relaxed text-white/45">
              30-minute strategy call — live campaign dashboards, honest fit check.
            </p>
          </motion.div>

          {/* Verified campaign stats only */}
          <motion.dl
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.52 }}
            className="mt-10 grid w-full max-w-2xl grid-cols-3 gap-3 border-t border-white/15 pt-8 sm:mt-12 sm:gap-6 sm:pt-10"
          >
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1.5 sm:gap-2">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-[clamp(1.35rem,4vw,2.35rem)] font-bold leading-none tracking-display tabular text-white">
                  {stat.value}
                </dd>
                <p className="max-w-[11ch] text-[10px] uppercase leading-snug tracking-[0.12em] text-white/45 sm:text-[11px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.dl>
          <p className="mt-4 text-[10px] text-white/30 sm:text-[11px]">
            Live property-management campaign — same figures as Proof below.
          </p>
        </div>
      </div>
    </section>
  )
}
