"use client"

import { STACK_DISCLAIMER, STACK_TOOLS } from "@/data/stack-tools"
import { STACK_LOGO_MAP } from "./stack-logos"

/**
 * "Our Stack" marquee — tools we operate, never framed as clients/partners.
 */
export function OurStackMarquee() {
  const items = [...STACK_TOOLS, ...STACK_TOOLS]

  return (
    <section
      id="our-stack"
      aria-labelledby="our-stack-heading"
      className="relative overflow-hidden border-y border-ink-08 py-14 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-6">
        <p
          id="our-stack-heading"
          className="mb-8 text-center text-[11.5px] uppercase tracking-[0.22em] text-ink-40"
        >
          Our Stack —{" "}
          <span className="font-semibold text-ink-60">tools we run in</span>
        </p>

        <div className="marquee-track group/marquee relative overflow-hidden mask-fade-x-80">
          <div className="marquee flex w-max items-center gap-12 sm:gap-16 group-hover/marquee:[animation-play-state:paused]">
            {items.map((tool, idx) => {
              const Logo = STACK_LOGO_MAP[tool.slug]
              const ariaHide = idx >= STACK_TOOLS.length
              return (
                <div
                  key={`${tool.id}-${idx}`}
                  className="flex shrink-0 items-center text-ink-60 transition-colors duration-300 hover:text-ink"
                  aria-hidden={ariaHide ? true : undefined}
                >
                  {Logo ? (
                    <Logo
                      title={ariaHide ? undefined : tool.name}
                      className="h-8 w-auto sm:h-9"
                    />
                  ) : (
                    <span className="text-[18px] font-semibold tracking-tight">
                      {tool.name}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-[12px] leading-relaxed text-ink-40">
          {STACK_DISCLAIMER}
        </p>
      </div>
    </section>
  )
}
