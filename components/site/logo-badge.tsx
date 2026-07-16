"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

type LogoBadgeProps = {
  name: string
  /** Optional raster/SVG path under /public */
  src?: string | null
  /** Inline SVG mark (fallback when no raster) */
  mark?: ReactNode
  size?: "sm" | "md" | "lg"
  className?: string
  /** Decorative duplicate in marquee */
  ariaHidden?: boolean
}

const SIZE = {
  sm: { box: "h-10 w-10", mark: "h-5 w-5", text: "text-[13px]", imgPad: "p-1.5" },
  md: { box: "h-12 w-12", mark: "h-6 w-6", text: "text-[14.5px]", imgPad: "p-1.5" },
  lg: { box: "h-14 w-14", mark: "h-7 w-7", text: "text-[15px]", imgPad: "p-2" },
} as const

/**
 * Single consistent treatment for tool / credential marks
 * (Our Stack, Recognitions, footer credentials).
 */
export function LogoBadge({
  name,
  src,
  mark,
  size = "md",
  className,
  ariaHidden,
}: LogoBadgeProps) {
  const s = SIZE[size]

  return (
    <div
      className={cn(
        "group inline-flex shrink-0 items-center gap-3 opacity-85 transition-opacity duration-300 hover:opacity-100",
        className,
      )}
      aria-hidden={ariaHidden || undefined}
      title={ariaHidden ? undefined : name}
    >
      <span
        className={cn(
          "relative grid shrink-0 place-items-center overflow-hidden rounded-full border border-ink-08 bg-white text-ink shadow-[0_1px_0_rgba(15,15,15,0.04)]",
          s.box,
        )}
      >
        {src ? (
          <span className="absolute inset-[15%]">
            <Image
              src={src}
              alt={ariaHidden ? "" : `${name} logo`}
              fill
              className="object-contain"
              sizes="48px"
              quality={95}
            />
          </span>
        ) : mark ? (
          <span className={cn("inline-flex items-center justify-center text-ink", s.mark)}>
            {mark}
          </span>
        ) : (
          <span className="text-[11px] font-bold uppercase tracking-wider text-ink-40">
            {name.slice(0, 2)}
          </span>
        )}
      </span>
      <span
        className={cn(
          "font-semibold tracking-tight text-ink whitespace-nowrap",
          s.text,
        )}
      >
        {name}
      </span>
    </div>
  )
}
