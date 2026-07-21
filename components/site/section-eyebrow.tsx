"use client"

import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

type SectionEyebrowProps = {
  /** @deprecated Numbers are no longer shown — kept for call-site compatibility */
  number?: string
  label?: string
  className?: string
  children?: ReactNode
}

/**
 * Premium section label — white pill, electric-blue text (Results-style).
 * Numbers (01, 02…) are intentionally omitted.
 */
export function SectionEyebrow({
  label,
  className,
  children,
}: SectionEyebrowProps) {
  const text = children ?? label
  const reduced = useReducedMotion()

  if (!text) return null

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
      className={cn("flex justify-start", className)}
    >
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full bg-white px-4 py-1.5 sm:px-5 sm:py-2",
          "text-[11px] font-semibold uppercase tracking-[0.18em] text-electric-blue sm:text-[12px]",
          "shadow-[0_4px_16px_-4px_oklch(0.58_0.22_250_/_0.28),0_1px_2px_oklch(0.156_0_0_/_0.04)]",
          "ring-1 ring-ink-08/60",
        )}
      >
        {text}
      </span>
    </motion.div>
  )
}
