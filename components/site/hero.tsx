"use client"

import { motion, useReducedMotion } from "framer-motion"
import { FileText, Play } from "lucide-react"
import { MagneticButton } from "./magnetic-button"
import { HeroBackground } from "./hero-background"
import { OrbitRing } from "@/components/hero/OrbitRing"
import { SITE } from "@/lib/site-data"

/**
 * Desktop: 2-column — copy left, OrbitRing right.
 * Mobile: centered copy + play cue; OrbitRing omitted (no cursor tilt / tight space).
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

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 xl:gap-16">
        {/* Copy column */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          {/* Mobile play cue — desktop uses OrbitRing as the visual anchor */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.5 }}
            className="relative mb-6 flex w-full max-w-xl flex-col items-center lg:hidden"
          >
            <a
              href="#watch"
              aria-label="Watch how FinalOutreach runs outbound"
              className="group relative z-10 grid size-[4.5rem] place-items-center rounded-full border border-ink-08 bg-background text-ink shadow-[0_16px_48px_-14px_rgba(15,15,15,0.4)] transition-transform duration-300 hover:scale-105"
            >
              <span
                aria-hidden
                className="absolute inset-0 animate-ping rounded-full bg-vibrant-purple/15 opacity-40 [animation-duration:2.4s]"
              />
              <Play className="relative size-6 fill-ink pl-0.5" aria-hidden />
            </a>
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

          <h1 className="mt-4 max-w-[18ch] text-balance text-[clamp(2.5rem,5.5vw,4.75rem)] font-extrabold leading-[1.08] tracking-tight text-ink lg:max-w-[14ch]">
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

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.45 }}
            className="mt-5 max-w-xl text-pretty text-[17px] leading-[1.65] text-ink-60 sm:text-[18px]"
          >
            Most teams burn 3–4 agencies before finding one that works. We&apos;re
            built to be your last one — hands-on operators, real infrastructure,
            meetings booked directly into your calendar.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.52 }}
            className="mt-8 flex w-full flex-col items-center gap-4 lg:items-start"
          >
            <MagneticButton href={SITE.calendly} size="lg" variant="primary">
              <span className="inline-flex items-center gap-2">
                <FileText className="size-4 opacity-90" aria-hidden />
                Get Your Custom Growth Blueprint
              </span>
            </MagneticButton>

            <p className="max-w-md text-[13px] leading-relaxed text-ink-40">
              Book a strategy call — see the live dashboard yourself. We&apos;ll
              tell you honestly if outbound fits your ACV.
            </p>

            <a
              href="#watch"
              className="group mt-1 hidden items-center gap-2 text-[13px] font-semibold text-ink lg:inline-flex"
            >
              <span className="grid size-8 place-items-center rounded-full border border-ink-08 bg-background transition-colors group-hover:border-ink/25">
                <Play className="size-3.5 fill-ink pl-0.5" aria-hidden />
              </span>
              <span className="link-underline">Watch how we run outbound</span>
            </a>
          </motion.div>
        </div>

        {/* Visual column — OrbitRing desktop/tablet only */}
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduced ? 0 : 0.65, delay: reduced ? 0 : 0.2 }}
          className="relative hidden justify-center md:flex lg:justify-end"
        >
          <OrbitRing />
        </motion.div>
      </div>
    </section>
  )
}
