"use client"

import { useState } from "react"
import Image from "next/image"
import { STACK_DISCLAIMER, STACK_TOOLS, type StackTool } from "@/data/stack-tools"

/**
 * Our Stack — RTL infinite marquee of exact brand logo files.
 * Edge-faded, grayscale at rest, color on hover — Linear/Vercel treatment.
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
      className="group/logo flex h-16 w-[132px] shrink-0 items-center justify-center rounded-xl border border-ink-08 bg-card px-3 shadow-[var(--shadow-xs)] sm:h-[72px] sm:w-[156px] sm:px-4"
      title={tool.name}
      aria-hidden={ariaHidden || undefined}
    >
      {failed ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-ink-08 bg-cream px-2 text-center">
          <span className="text-[9px] font-bold uppercase tracking-wider text-ink-40">
            Missing
          </span>
          <span className="break-all text-[10px] leading-tight text-ink-40">
            {tool.src}
          </span>
        </div>
      ) : (
        <span className="relative block h-8 w-full sm:h-9">
          <Image
            src={tool.src}
            alt={ariaHidden ? "" : `${tool.name} logo`}
            fill
            className="object-contain object-center grayscale opacity-70 transition-[filter,opacity] duration-200 ease-out group-hover/logo:grayscale-0 group-hover/logo:opacity-100"
            sizes="(max-width: 640px) 132px, 156px"
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
  const items = [...STACK_TOOLS, ...STACK_TOOLS]

  return (
    <section
      id="our-stack"
      aria-labelledby="our-stack-heading"
      className="relative overflow-hidden border-y border-ink-08 bg-cream py-12 sm:py-14 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p
          id="our-stack-heading"
          className="mb-7 text-center text-[11px] uppercase tracking-[0.22em] text-ink-40 sm:mb-9 sm:text-[11.5px]"
        >
          Our stack,{" "}
          <span className="font-semibold text-ink-60">
            the tools behind every campaign
          </span>
        </p>
      </div>

      <div className="marquee-track marquee-track--logos relative overflow-hidden mask-fade-x-160">
        <div
          className="marquee flex w-max items-center gap-3 px-4 sm:gap-4 sm:px-6"
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

      <p className="mx-auto mt-6 max-w-xl px-4 text-center text-[10.5px] leading-relaxed text-ink-40/80 sm:mt-7 sm:px-6 sm:text-[11px]">
        {STACK_DISCLAIMER}
      </p>
    </section>
  )
}
