"use client"

import { useEffect } from "react"
import { getCalApi } from "@calcom/embed-react"
import { CAL } from "@/lib/cal"

/**
 * Initializes Cal.com embed UI once for the whole site.
 * Buttons/links with data-cal-* attributes open the month-view popup.
 */
export function CalProvider() {
  useEffect(() => {
    void (async () => {
      try {
        const cal = await getCalApi({ namespace: CAL.namespace })
        cal("ui", {
          hideEventTypeDetails: false,
          layout: CAL.config.layout,
          theme: "dark",
        })
      } catch {
        /* popup still falls back to cal.com URL */
      }
    })()
  }, [])

  return null
}
