"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, Play } from "lucide-react"
import { MagneticButton } from "./magnetic-button"
import { HeroBackground } from "./hero-background"
import { SITE } from "@/lib/site-data"

const headlineLines = [
  ["Booked", "meetings", "on", "your"],
  ["calendar —", "__not", "slide", "decks."],
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

      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <motion.p
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          className="text-[12px] uppercase tracking-[0.2em] text-ink-40"
          style={{ opacity: 1 }}
        >
          Done-for-you B2B outbound
        </motion.p>

        <h1 className="mt-6 max-w-[18ch] text-balance text-[clamp(2.5rem,6.5vw,5.25rem)] font-medium leading-[1.05] tracking-display text-ink">
          {headlineLines.map((line, lineIdx) => (
            <span key={lineIdx} className="block pb-[0.02em]">
              <span className="inline-flex flex-wrap justify-center gap-x-[0.22em] gap-y-1">
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
                          ? "inline-block font-serif-italic text-[1.08em] gradient-text-animated"
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
          className="mt-7 max-w-2xl text-pretty text-[17px] leading-[1.6] text-ink-60 sm:text-[19px]"
        >
          We warm domains, build verified lists, write sequences, and handle
          replies — so qualified meetings land on your calendar, not in a
          quarterly report.
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.7 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
        >
          <MagneticButton href={SITE.calendly} size="lg" variant="primary">
            Book a strategy call
          </MagneticButton>
          <a
            href="#campaign-proof"
            className="group inline-flex items-center gap-1.5 px-2 py-3 text-[15px] font-medium text-ink"
          >
            <span className="link-underline">See the proof</span>
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <a
            href="#watch"
            className="group inline-flex items-center gap-1.5 px-2 py-3 text-[15px] font-medium text-ink-60"
          >
            <Play className="size-4 fill-ink/20" aria-hidden />
            <span className="link-underline">Watch how it works</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
