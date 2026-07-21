"use client"

import { CAL, CAL_BUTTON_PROPS, openCalPopup } from "@/lib/cal"
import { cn } from "@/lib/utils"

/**
 * Opens the Cal.com month-view booking popup (same UX as Free Consultation).
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
      {...CAL_BUTTON_PROPS}
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
