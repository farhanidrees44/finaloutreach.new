"use client"

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (element: Element, forceReload?: boolean) => void
    }
  }
}

type TrustpilotWidgetProps = {
  className?: string
}

/**
 * Trustpilot Review Collector TrustBox.
 * Bootstrap script lives in root layout; this remounts the widget after SPA hydration.
 */
export function TrustpilotWidget({ className }: TrustpilotWidgetProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const load = () => {
      window.Trustpilot?.loadFromElement(el, true)
    }

    if (window.Trustpilot) {
      load()
      return
    }

    const id = window.setInterval(() => {
      if (window.Trustpilot) {
        load()
        window.clearInterval(id)
      }
    }, 200)

    return () => window.clearInterval(id)
  }, [])

  return (
    <div
      ref={ref}
      className={`trustpilot-widget ${className ?? ""}`.trim()}
      data-locale="en-US"
      data-template-id="56278e9abfbbba0bdcd568bc"
      data-businessunit-id="6a5a83923e37cfe6ecc09631"
      data-style-height="52px"
      data-style-width="100%"
      data-token="8ee94261-38b2-483f-ae05-bb598ce53598"
    >
      <a
        href="https://www.trustpilot.com/review/finaloutreach.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Trustpilot
      </a>
    </div>
  )
}
