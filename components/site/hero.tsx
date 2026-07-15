"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { MagneticButton } from "./magnetic-button"
import { HeroBackground } from "./hero-background"

const headlineLines = [
  ["Cold", "email,", "LinkedIn,", "and"],
  ["appointment", "setting —"],
  ["__run", "by", "operators."],
]

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.12 },
  },
}

const wordVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

export function Hero() {
  const reduced = useReducedMotion()

  return (
    <section className="noise-bg relative isolate overflow-hidden pb-20 pt-20 sm:pt-28 md:pb-24 md:pt-32">
      <HeroBackground />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[640px] grid-lines opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />

      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[12px] uppercase tracking-[0.2em] text-ink-40"
        >
          Done-for-you B2B outbound
        </motion.p>

        <motion.h1
          variants={container}
          initial={reduced ? false : "hidden"}
          animate="visible"
          className="mt-7 max-w-[20ch] text-balance text-[clamp(2.75rem,7vw,5.5rem)] font-medium leading-[1.02] tracking-display text-ink"
        >
          {headlineLines.map((line, lineIdx) => (
            <span key={lineIdx} className="block overflow-hidden pb-[0.04em]">
              <span className="inline-flex flex-wrap justify-center gap-x-[0.22em] gap-y-1">
                {line.map((word, wordIdx) => {
                  const isItalic = word.startsWith("__")
                  const display = isItalic ? word.slice(2) : word
                  return (
                    <span key={`${lineIdx}-${wordIdx}`} className="inline-block overflow-hidden">
                      <motion.span
                        variants={reduced ? undefined : wordVariants}
                        className={
                          isItalic
                            ? "inline-block font-serif-italic text-[1.08em] gradient-text-animated"
                            : "inline-block"
                        }
                      >
                        {display}
                      </motion.span>
                      {wordIdx < line.length - 1 && " "}
                    </span>
                  )
                })}
              </span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: reduced ? 0 : 0.75 }}
          className="mt-8 max-w-2xl text-pretty text-[17px] leading-[1.6] text-ink-60 sm:text-[19px]"
        >
          A small hands-on team that builds lists, warms domains, writes
          sequences, and books meetings into your calendar — not a slide-deck
          consultancy.
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: reduced ? 0 : 0.9 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
        >
          <MagneticButton href="/contact" size="lg" variant="primary">
            Book a strategy call
          </MagneticButton>
          <a
            href="#campaign-proof"
            className="group inline-flex items-center gap-1.5 px-2 py-3 text-[15px] font-medium text-ink"
          >
            <span className="link-underline">See the proof</span>
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
