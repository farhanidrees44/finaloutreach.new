"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, CalendarCheck, Play } from "lucide-react"
import { MagneticButton } from "./magnetic-button"
import { HeroBackground } from "./hero-background"
import { SITE } from "@/lib/site-data"
import { WALKTHROUGH_VIMEO_EMBED_URL } from "@/lib/seo/video"

const headlineLines = [
  ["Outbound", "that", "books"],
  ["__real", "meetings."],
]

/**
 * Hero uses direct `animate` (not whileInView) so above-the-fold content
 * never gets stuck at opacity:0. Words animate as motion nodes with an
 * explicit delay — variants do not propagate through plain span wrappers.
 */
export function Hero() {
  const reduced = useReducedMotion()
  let wordIndex = 0

  return (
    <section className="noise-bg relative isolate overflow-hidden pb-16 pt-20 sm:pt-28 md:pb-20 md:pt-32">
      <HeroBackground />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[640px] grid-lines opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-[0.78fr_1fr] lg:gap-12">
        <div className="max-w-xl text-left">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-vibrant-purple/20 bg-vibrant-purple/10 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-vibrant-purple"
          >
            <CalendarCheck className="size-3.5" aria-hidden />
            Now booking — limited spots this quarter
          </motion.p>

          <h1 className="mt-6 max-w-[11ch] text-balance text-[clamp(3rem,6.2vw,5.8rem)] font-medium leading-[0.98] tracking-display text-ink">
            {headlineLines.map((line, lineIdx) => (
              <span key={lineIdx} className="block pb-[0.03em]">
                <span className="inline-flex flex-wrap gap-x-[0.18em] gap-y-1">
                  {line.map((word, wordIdx) => {
                    const isItalic = word.startsWith("__")
                    const display = isItalic ? word.slice(2) : word
                    const i = wordIndex++
                    return (
                      <motion.span
                        key={`${lineIdx}-${wordIdx}`}
                        initial={reduced ? false : { opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={
                          reduced
                            ? { duration: 0 }
                            : {
                                delay: 0.08 + i * 0.065,
                                duration: 0.55,
                                ease: [0.22, 1, 0.36, 1],
                              }
                        }
                        className={
                          isItalic
                            ? "inline-block font-serif-italic text-[1.06em] gradient-text-animated"
                            : "inline-block text-ink"
                        }
                      >
                        {display}
                        {wordIdx < line.length - 1 ? "\u00A0" : null}
                      </motion.span>
                    )
                  })}
                </span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.55 }}
            className="mt-7 max-w-md text-pretty text-[16px] leading-[1.65] text-ink-60"
          >
            Hand-built targeting, deliverability-first infrastructure, and SDRs
            who close — one team, no agency layers.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.7 }}
            className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <MagneticButton href={SITE.calendly} size="lg" variant="primary">
              Book a strategy call
            </MagneticButton>
            <a
              href="#campaign-proof"
              className="group inline-flex items-center gap-1.5 px-2 py-3 text-[15px] font-medium text-ink"
            >
              <span className="link-underline">See case studies</span>
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>

        <motion.div
          id="watch"
          initial={reduced ? false : { opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.35 }}
          className="relative mx-auto w-full max-w-[660px] lg:mr-0"
        >
          <div className="relative aspect-video overflow-hidden rounded-[1.6rem] border border-white/30 bg-ink shadow-[0_28px_70px_-36px_rgba(15,15,15,0.55)] ring-1 ring-ink/10">
            <iframe
              src={WALKTHROUGH_VIMEO_EMBED_URL}
              title="FinalOutreach LinkedIn and Email walkthrough"
              className="absolute inset-0 h-full w-full"
              allow="fullscreen; picture-in-picture; clipboard-write"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[12px] text-ink-40">
            <Play className="size-3 fill-ink/20" aria-hidden />
            Press play when you&apos;re ready — this Vimeo video does not autoplay.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
