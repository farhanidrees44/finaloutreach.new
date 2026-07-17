"use client"

import { motion, useReducedMotion } from "framer-motion"
import { FileText, Play } from "lucide-react"
import { MagneticButton } from "./magnetic-button"
import { HeroBackground } from "./hero-background"
import { HeroWaves } from "./hero-waves"
import { SITE } from "@/lib/site-data"

/**
 * Centered hero — clean composition: play cue, brand, outcome headline,
 * one supporting line, one CTA, honest trust line. No fabricated client counts.
 */
export function Hero() {
  const reduced = useReducedMotion()

  return (
    <section className="noise-bg relative isolate overflow-hidden pb-12 pt-20 sm:pb-14 sm:pt-20 md:pb-16 md:pt-24">
      <HeroBackground />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[640px] grid-lines opacity-25 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />

      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        {/* Play cue + full-bleed waves */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.5 }}
          className="relative mb-8 flex w-full flex-col items-center sm:mb-10"
        >
          <a
            href="#watch"
            aria-label="Watch how FinalOutreach runs outbound"
            className="group relative z-10 grid size-[4.5rem] place-items-center rounded-full border border-ink-08 bg-background text-ink shadow-[0_16px_48px_-14px_rgba(15,15,15,0.4)] transition-transform duration-300 hover:scale-105 sm:size-[5rem]"
          >
            <span
              aria-hidden
              className="absolute inset-0 animate-ping rounded-full bg-vibrant-purple/15 opacity-40 [animation-duration:2.4s]"
            />
            <Play className="relative size-6 fill-ink pl-0.5 sm:size-7" aria-hidden />
          </a>
          <HeroWaves />
          {/* Spacer so copy clears the full-bleed wave band */}
          <div className="h-10 w-full sm:h-12 md:h-14" aria-hidden />
        </motion.div>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.08 }}
          className="text-[13px] font-bold uppercase tracking-[0.22em] text-vibrant-purple"
        >
          B2B Cold Outreach Agency
        </motion.p>

        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.12 }}
          className="mt-2 text-[15px] font-bold tracking-tight text-ink"
        >
          {SITE.name}
        </motion.p>

        <h1 className="mt-4 max-w-[16ch] text-balance text-[clamp(2.75rem,7vw,5.5rem)] font-extrabold leading-[1.1] tracking-tight text-ink">
          <motion.span
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduced
                ? { duration: 0 }
                : { delay: 0.18, duration: 0.55, ease: [0.22, 1, 0.36, 1] }
            }
            className="block"
          >
            Stop Hiring Agencies.
          </motion.span>
          <motion.span
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduced
                ? { duration: 0 }
                : { delay: 0.28, duration: 0.55, ease: [0.22, 1, 0.36, 1] }
            }
            className="mt-1 block gradient-text-animated"
          >
            Start Booking Meetings.
          </motion.span>
        </h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.45 }}
          className="mt-5 max-w-2xl text-pretty text-[17px] leading-[1.65] text-ink-60 sm:text-[19px]"
        >
          Most teams burn 3–4 agencies before finding one that works. We&apos;re
          built to be your last one — hands-on operators, real infrastructure,
          meetings booked directly into your calendar.
        </motion.p>

        {/* Real Smartlead campaign numbers (same source as ResultsBar / Proof) */}
        <motion.dl
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.52 }}
          className="mt-7 grid w-full max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6"
        >
          {[
            { value: "11.58%", label: "Reply rate" },
            { value: "145", label: "Unique replies" },
            { value: "1,258", label: "Leads in campaign" },
            { value: "3", label: "Active sequences" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 border-t border-ink-08 pt-4"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-[clamp(1.5rem,3.5vw,2rem)] font-semibold leading-none tracking-display tabular text-ink">
                {stat.value}
              </dd>
              <p className="text-[11px] uppercase tracking-[0.12em] text-ink-40">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.dl>
        <p className="mt-3 text-[11px] text-ink-40">
          From a live property-management campaign — same figures as Proof below.
        </p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.6 }}
          className="mt-8 flex flex-col items-center gap-4"
        >
          <MagneticButton href={SITE.calendly} size="lg" variant="primary">
            <span className="inline-flex items-center gap-2">
              <FileText className="size-4 opacity-90" aria-hidden />
              Get Your Custom Growth Blueprint
            </span>
          </MagneticButton>

          <p className="max-w-md text-[13px] leading-relaxed text-ink-40">
            30-minute strategy call — we&apos;ll show live campaign dashboards
            and tell you honestly if outbound fits your ACV.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
