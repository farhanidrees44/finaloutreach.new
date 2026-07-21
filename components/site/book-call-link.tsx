"use client"

import { CAL, openCalPopup } from "@/lib/cal"
import { cn } from "@/lib/utils"

/**
 * Opens the Cal.com month-view booking popup (same UX as Free Consultation).
 * Uses programmatic open only — do not add data-cal-* here or Cal stacks two modals.
 */
export function BookCallLink({
  children,
  className,
  source = "cta",
}: {
  children: React.ReactNode
  className?: string
  source?: string
}) {
  return (
    <a
      href={CAL.url}
      onClick={(e) => {
        e.preventDefault()
        void openCalPopup(source)
      }}
      className={cn(className)}
    >
      {children}
    </a>
  )
}
