"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { CAL, CAL_BUTTON_PROPS, isBookingHref, openCalPopup } from "@/lib/cal"

type Variant = "primary" | "ghost" | "ink"

export function CtaButton({
  href = "#contact",
  children,
  variant = "primary",
  size = "md",
  className,
  showArrow = true,
}: {
  href?: string
  children: React.ReactNode
  variant?: Variant
  size?: "sm" | "md" | "lg"
  className?: string
  showArrow?: boolean
}) {
  const sizes = {
    sm: "h-10 px-4 text-sm",
    md: "h-12 px-6 text-[15px]",
    lg: "h-14 px-7 text-base",
  }
  const variants: Record<Variant, string> = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]",
    ghost:
      "bg-transparent text-ink border border-ink-08 hover:border-ink/30 hover:bg-ink/[0.03] active:scale-[0.98]",
    ink: "bg-ink text-background hover:bg-ink/90 active:scale-[0.98]",
  }

  const booking = isBookingHref(href)
  const isExternal = !booking && /^https?:\/\//.test(href)
  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-200",
    sizes[size],
    variants[variant],
    className,
  )
  const inner = (
    <>
      <span>{children}</span>
      {showArrow && (
        <ArrowRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-safe:[a:hover_&]:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  )

  if (booking) {
    return (
      <a
        href={CAL.url}
        {...CAL_BUTTON_PROPS}
        onClick={(e) => {
          e.preventDefault()
          void openCalPopup("cta")
        }}
        className={classes}
      >
        {inner}
      </a>
    )
  }

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  )
}
