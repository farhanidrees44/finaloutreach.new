"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Check, FileText, Play } from "lucide-react"
import { MagneticButton } from "./magnetic-button"
import { HeroBackground } from "./hero-background"
import { HeroWave } from "./hero-wave"
import { TrustpilotWidget } from "./trustpilot-widget"
import { SITE } from "@/lib/site-data"

/**
 * Phrases pulled from existing hero / services copy — no new claims.
 */
const TRUST_LINES = [
  "Done-for-you cold email",
  "Real infrastructure",
  "Meetings on your calendar",
] as const

/**
 * Centered hero — visual refinement only: pill eyebrow, Trustpilot,
 * headline + ambient waves, existing copy/CTA, micro-trust checks.
 * No fabricated stats, logos, or review scores.
 */
export function Hero() {
  const reduced = useReducedMotion()

  return (
    <section className="noise-bg relative isolate overflow-hidden pb-14 pt-5 sm:pb-16 sm:pt-6 md:pb-20 md:pt-7">
      <HeroBackground />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[640px] grid-lines opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />

      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        {/* Play cue — real walkthrough link; waves moved under headline */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.5 }}
          className="relative mb-5 flex w-full max-w-xl flex-col items-center"
        >
          <a
            href="#watch"
            aria-label="Watch how FinalOutreach runs outbound"
            className="group relative z-10 grid size-[4.25rem] place-items-center rounded-full border border-ink-08 bg-background/90 text-ink shadow-[0_16px_48px_-14px_rgba(15,15,15,0.35)] backdrop-blur-sm transition-transform duration-300 hover:scale-105 sm:size-[4.75rem]"
          >
            <span
              aria-hidden
              className="absolute inset-0 animate-ping rounded-full bg-vibrant-purple/15 opacity-40 [animation-duration:2.4s]"
            />
            <Play className="relative size-6 fill-ink pl-0.5 sm:size-7" aria-hidden />
          </a>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.08 }}
          className="flex flex-col items-center"
        >
          <p className="inline-flex items-center rounded-full border border-vibrant-purple/20 bg-vibrant-purple/[0.06] px-4 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.2em] text-vibrant-purple sm:text-[12px] sm:tracking-[0.22em]">
            B2B Cold Outreach Agency
          </p>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.14 }}
          className="mt-4 flex justify-center sm:mt-5"
          aria-label="Review FinalOutreach on Trustpilot"
        >
          <div className="w-[220px] shrink-0 transition-transform duration-300 hover:scale-[1.04]">
            <TrustpilotWidget />
          </div>
        </motion.div>

        <h1 className="mt-5 max-w-[20ch] text-balance text-[clamp(2.75rem,7vw,5.5rem)] font-extrabold leading-[1.1] tracking-tight text-ink sm:mt-6">
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
            Operators in the tools.
          </motion.span>
          <motion.span
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduced
                ? { duration: 0 }
                : { delay: 0.28, duration: 0.55, ease: [0.22, 1, 0.36, 1] }
            }
            className="mt-1 block font-serif-italic text-electric-blue"
          >
            Meetings on your calendar.
          </motion.span>
        </h1>

        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.36 }}
          className="w-full"
        >
          <HeroWave />
        </motion.div>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.45 }}
          className="mt-5 max-w-2xl text-pretty text-[17px] font-semibold leading-[1.65] text-ink-80 sm:text-[19px]"
        >
          Most teams burn 3–4 agencies before finding one that works. We&apos;re
          built to be your last one —{" "}
          <span className="font-bold text-ink">hands-on operators</span>,{" "}
          <span className="font-bold text-ink">real infrastructure</span>,
          meetings booked directly into your calendar.
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.52 }}
          className="mt-8 flex flex-col items-center gap-5"
        >
          <MagneticButton
            href={SITE.calendly}
            size="lg"
            variant="primary"
            className="h-14 px-9 shadow-[var(--shadow-glow-purple)] transition-[box-shadow,transform] duration-300 hover:shadow-[0_20px_56px_-14px_oklch(0.48_0.24_295_/_0.55)] [background-image:linear-gradient(120deg,oklch(0.48_0.24_295),oklch(0.52_0.22_250)_48%,oklch(0.44_0.20_270))] hover:[background-image:linear-gradient(120deg,oklch(0.44_0.24_295),oklch(0.48_0.22_250)_48%,oklch(0.40_0.20_270))]"
          >
            <span className="inline-flex items-center gap-2">
              <FileText className="size-4 opacity-90" aria-hidden />
              Get Your Custom Growth Blueprint
            </span>
          </MagneticButton>

          <ul className="flex max-w-xl flex-col items-stretch gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-5 sm:gap-y-2">
            {TRUST_LINES.map((line) => (
              <li
                key={line}
                className="inline-flex items-center justify-center gap-2 text-[13px] font-semibold text-ink-60"
              >
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-emerald/[0.12] text-emerald">
                  <Check className="size-3 stroke-[2.5]" aria-hidden />
                </span>
                {line}
              </li>
            ))}
          </ul>

          <p className="max-w-md text-[13px] font-medium leading-relaxed text-ink-60">
            Book a strategy call — see the live dashboard yourself. We&apos;ll
            tell you honestly if outbound fits your ACV.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
