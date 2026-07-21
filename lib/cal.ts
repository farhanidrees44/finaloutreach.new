import { trackCTAClick } from "@/lib/analytics"

export const CAL = {
  namespace: "30min",
  link: "finaloutreach/30min",
  url: "https://cal.com/finaloutreach/30min",
  config: {
    layout: "month_view" as const,
    useSlotsViewOnSmallScreen: "true" as const,
    theme: "dark" as const,
  },
} as const

/** True when an href is our Cal.com booking link (or legacy Calendly booking URL). */
export function isBookingHref(href: string | undefined | null) {
  if (!href) return false
  return (
    href === CAL.url ||
    href.includes("cal.com/finaloutreach") ||
    href.includes("calendly.com/finaloutreach")
  )
}

/**
 * Opens a single Cal.com month-view booking modal.
 * Prefer this over data-cal-* attributes — those auto-bind and stack a second modal.
 */
export async function openCalPopup(source = "cta") {
  if (typeof window === "undefined") return
  trackCTAClick("Book strategy call", source)

  try {
    const { getCalApi } = await import("@calcom/embed-react")
    const cal = await getCalApi({ namespace: CAL.namespace })
    cal("modal", {
      calLink: CAL.link,
      config: {
        layout: CAL.config.layout,
        useSlotsViewOnSmallScreen: CAL.config.useSlotsViewOnSmallScreen,
        theme: CAL.config.theme,
      },
    })
  } catch {
    window.open(CAL.url, "_blank", "noopener,noreferrer")
  }
}
