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
 * Trustpilot Mini TrustBox — live score, stars, and review count.
 * Bootstrap script lives in root layout; this remounts after SPA hydration.
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
      data-template-id="53aa8807dec7e10d38f59f32"
      data-businessunit-id="6a5a83923e37cfe6ecc09631"
      data-style-height="120px"
      data-style-width="100%"
      data-theme="light"
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
