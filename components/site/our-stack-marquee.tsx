"use client"

import { useState } from "react"
import Image from "next/image"
import { STACK_DISCLAIMER, STACK_TOOLS, type StackTool } from "@/data/stack-tools"

/**
 * Our Stack — RTL infinite marquee of exact brand logo files.
 * Animates on all viewports; pauses only on hover-capable devices.
 */
function StackLogoCard({
  tool,
  ariaHidden,
}: {
  tool: StackTool
  ariaHidden?: boolean
}) {
  const [failed, setFailed] = useState(false)

  return (
    <div
      className="flex h-[72px] w-[132px] shrink-0 items-center justify-center rounded-2xl border border-ink-08 bg-card px-4 shadow-[var(--shadow-sm)] sm:h-[88px] sm:w-[160px] sm:px-5"
      title={tool.name}
      aria-hidden={ariaHidden || undefined}
    >
      {failed ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-coral-warm/50 bg-coral-warm/5 px-2 text-center">
          <span className="text-[9px] font-bold uppercase tracking-wider text-coral-warm">
            Missing
          </span>
          <span className="break-all text-[10px] leading-tight text-ink-40">
            {tool.src}
          </span>
        </div>
      ) : (
        <span className="relative block h-10 w-full sm:h-12">
          <Image
            src={tool.src}
            alt={ariaHidden ? "" : `${tool.name} logo`}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 132px, 160px"
            quality={95}
            unoptimized
            onError={() => setFailed(true)}
          />
        </span>
      )}
    </div>
  )
}

/**
 * Our Stack — infinite RTL logo marquee.
 * Motion is CSS-driven and forced on for all viewports (see globals.css).
 */
export function OurStackMarquee() {
  // Duplicate once for a seamless -50% translateX loop (right → left)
  const items = [...STACK_TOOLS, ...STACK_TOOLS]

  return (
    <section
      id="our-stack"
      aria-labelledby="our-stack-heading"
      className="relative overflow-hidden border-y border-ink-08 bg-cream py-10 sm:py-12 md:py-14"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p
          id="our-stack-heading"
          className="mb-6 text-center text-[11px] uppercase tracking-[0.22em] text-ink-40 sm:mb-8 sm:text-[11.5px]"
        >
          Our Stack —{" "}
          <span className="font-semibold text-ink-60">tools we run in</span>
        </p>
      </div>

      <div className="marquee-track marquee-track--logos relative overflow-hidden mask-fade-x-40 sm:mask-fade-x-80">
        <div
          className="marquee flex w-max items-center gap-3 px-4 sm:gap-5 sm:px-6"
          style={{ animationPlayState: "running" }}
        >
          {items.map((tool, idx) => (
            <StackLogoCard
              key={`${tool.id}-${idx}`}
              tool={tool}
              ariaHidden={idx >= STACK_TOOLS.length}
            />
          ))}
        </div>
      </div>

      <p className="mx-auto mt-5 max-w-xl px-4 text-center text-[10.5px] leading-relaxed text-ink-40/80 sm:mt-6 sm:px-6 sm:text-[11px]">
        {STACK_DISCLAIMER}
      </p>
    </section>
  )
}
