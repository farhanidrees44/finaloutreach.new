"use client"

import { useState } from "react"
import Image from "next/image"
import { STACK_DISCLAIMER, STACK_TOOLS, type StackTool } from "@/data/stack-tools"

/**
 * Our Stack — RTL infinite marquee of exact brand logo files.
 * No icon-library substitutes. Missing/broken files show a visible MISSING tile.
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
      className="flex h-[88px] w-[160px] shrink-0 items-center justify-center rounded-2xl border border-ink-08 bg-card px-5 shadow-[var(--shadow-sm)]"
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
        <span className="relative block h-12 w-full">
          <Image
            src={tool.src}
            alt={ariaHidden ? "" : `${tool.name} logo`}
            fill
            className="object-contain"
            sizes="160px"
            quality={95}
            unoptimized
            onError={() => setFailed(true)}
          />
        </span>
      )}
    </div>
  )
}

export function OurStackMarquee() {
  // Duplicate once for a seamless -50% translate loop
  const items = [...STACK_TOOLS, ...STACK_TOOLS]

  return (
    <section
      id="our-stack"
      aria-labelledby="our-stack-heading"
      className="relative overflow-hidden border-y border-ink-08 bg-cream py-12 sm:py-14"
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

      <div className="marquee-track marquee-track--logos relative overflow-hidden mask-fade-x-80">
        <div className="marquee flex w-max items-center gap-4 px-6 sm:gap-5">
          {items.map((tool, idx) => (
            <StackLogoCard
              key={`${tool.id}-${idx}`}
              tool={tool}
              ariaHidden={idx >= STACK_TOOLS.length}
            />
          ))}
        </div>
      </div>

      <p className="mx-auto mt-6 max-w-xl px-6 text-center text-[11px] leading-relaxed text-ink-40/80">
        {STACK_DISCLAIMER}
      </p>
    </section>
  )
}
