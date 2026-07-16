"use client"

import { motion, useReducedMotion } from "framer-motion"
import { FileText, Play } from "lucide-react"
import { MagneticButton } from "./magnetic-button"
import { HeroBackground } from "./hero-background"
import { SITE } from "@/lib/site-data"

/**
 * Centered hero — clean composition: play cue, brand, outcome headline,
 * one supporting line, one CTA, honest trust line. No fabricated client counts.
 */
export function Hero() {
  const reduced = useReducedMotion()

  return (
    <section className="noise-bg relative isolate overflow-hidden pb-20 pt-24 sm:pt-28 md:pb-28 md:pt-36">
      <HeroBackground />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[640px] grid-lines opacity-25 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />

      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        {/* Play cue + decorative wave — scrolls to walkthrough */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.5 }}
          className="relative mb-8 flex w-full max-w-xl flex-col items-center"
        >
          <a
            href="#watch"
            aria-label="Watch how FinalOutreach runs outbound"
            className="group relative z-10 grid size-14 place-items-center rounded-full border border-ink-08 bg-background text-ink shadow-[0_12px_40px_-16px_rgba(15,15,15,0.35)] transition-transform duration-300 hover:scale-105"
          >
            <span
              aria-hidden
              className="absolute inset-0 animate-ping rounded-full bg-vibrant-purple/15 opacity-40 [animation-duration:2.4s]"
            />
            <Play className="relative size-5 fill-ink pl-0.5" aria-hidden />
          </a>
          <svg
            aria-hidden
            viewBox="0 0 420 36"
            className="pointer-events-none -mt-3 h-9 w-full max-w-[420px]"
            fill="none"
          >
            <path
              d="M8 22 C 70 6, 120 30, 180 16 S 300 8, 412 20"
              stroke="oklch(0.62 0.18 250)"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.55"
            />
            <path
              d="M12 26 C 90 12, 140 34, 210 20 S 320 14, 408 24"
              stroke="oklch(0.55 0.24 295)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d="M20 28 C 100 18, 160 32, 230 22 S 340 18, 400 26"
              stroke="oklch(0.68 0.20 35)"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.45"
            />
          </svg>
        </motion.div>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.08 }}
          className="text-[13px] font-semibold uppercase tracking-[0.22em] text-vibrant-purple"
        >
          B2B Cold Outreach Agency
        </motion.p>

        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.12 }}
          className="mt-3 text-[15px] font-medium tracking-tight text-ink"
        >
          {SITE.name}
        </motion.p>

        <h1 className="mt-5 max-w-[16ch] text-balance text-[clamp(2.75rem,7vw,5.5rem)] font-medium leading-[1.02] tracking-display text-ink">
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
            className="mt-1 block font-serif-italic gradient-text-animated"
          >
            Start Booking Meetings.
          </motion.span>
        </h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.45 }}
          className="mt-7 max-w-2xl text-pretty text-[17px] leading-[1.65] text-ink-60 sm:text-[19px]"
        >
          Most teams burn 3–4 agencies before finding one that works. We&apos;re
          built to be your last one — hands-on operators, real infrastructure,
          meetings booked directly into your calendar.
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.6 }}
          className="mt-10 flex flex-col items-center gap-4"
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
