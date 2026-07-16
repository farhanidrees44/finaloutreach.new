"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { STACK_DISCLAIMER, STACK_TOOLS } from "@/data/stack-tools"

/**
 * Static Tool Stack grid — full-color brand marks in equal cards.
 * Replaces the low-contrast marquee so each logo can actually register.
 */
export function OurStackMarquee() {
  const reduced = useReducedMotion()

  return (
    <section
      id="our-stack"
      aria-labelledby="our-stack-heading"
      className="relative border-y border-ink-08 bg-cream py-14 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-6">
        <p
          id="our-stack-heading"
          className="text-center text-[11.5px] uppercase tracking-[0.22em] text-ink-40"
        >
          Our Stack —{" "}
          <span className="font-semibold text-ink-60">tools we run in</span>
        </p>

        <ul className="mt-9 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {STACK_TOOLS.map((tool, i) => (
            <motion.li
              key={tool.id}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
            >
              <div
                className="group flex h-[88px] w-full items-center justify-center rounded-2xl border border-ink-08 bg-card px-6 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.04] hover:border-ink-20 hover:shadow-[var(--shadow-lg)] sm:h-[96px]"
                title={tool.name}
              >
                {/* Fixed aspect box reserves space → no CLS while images load */}
                <span className="relative block h-11 w-[7.5rem] sm:h-12 sm:w-36">
                  <Image
                    src={tool.src}
                    alt={`${tool.name} logo`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 40vw, 160px"
                    quality={95}
                    unoptimized={tool.src.endsWith(".svg")}
                  />
                </span>
                <span className="sr-only">{tool.name}</span>
              </div>
            </motion.li>
          ))}
        </ul>

        <p className="mx-auto mt-6 max-w-xl text-center text-[11px] leading-relaxed text-ink-40/80">
          {STACK_DISCLAIMER}
        </p>
      </div>
    </section>
  )
}
