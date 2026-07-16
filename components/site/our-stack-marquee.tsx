"use client"

import { STACK_DISCLAIMER, STACK_TOOLS } from "@/data/stack-tools"
import { STACK_ICON_MAP } from "./stack-logos"
import { LogoBadge } from "./logo-badge"

/**
 * Infinite CSS marquee — tools duplicated 2× for seamless loop.
 * Pause on hover via .marquee-track:hover rules in globals.css.
 * Raster logos under /public/stack use equal 48×48 circular badges.
 */
export function OurStackMarquee() {
  const items = [...STACK_TOOLS, ...STACK_TOOLS]

  return (
    <section
      id="our-stack"
      aria-labelledby="our-stack-heading"
      className="relative overflow-hidden border-y border-ink-08 bg-[#F7F7F4] py-12 sm:py-14"
    >
      <div className="mx-auto max-w-7xl px-6">
        <p
          id="our-stack-heading"
          className="mb-8 text-center text-[11.5px] uppercase tracking-[0.22em] text-ink-40"
        >
          Our Stack —{" "}
          <span className="font-semibold text-ink-60">tools we run in</span>
        </p>
      </div>

      <div className="marquee-track relative overflow-hidden mask-fade-x-80">
        <div className="marquee flex w-max items-center gap-10 px-6 sm:gap-14">
          {items.map((tool, idx) => {
            const Icon = STACK_ICON_MAP[tool.slug]
            const ariaHide = idx >= STACK_TOOLS.length
            return (
              <LogoBadge
                key={`${tool.id}-${idx}`}
                name={tool.name}
                size="md"
                ariaHidden={ariaHide}
                src={tool.src}
                mark={
                  !tool.src && Icon ? <Icon className="h-6 w-6" /> : null
                }
              />
            )
          })}
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-2xl px-6 text-center text-[12px] leading-relaxed text-ink-40">
        {STACK_DISCLAIMER}
      </p>
    </section>
  )
}
