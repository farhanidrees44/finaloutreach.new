import { SITE } from "@/lib/site-data"
import { trackCTAClick } from "@/lib/analytics"

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void
    }
  }
}

/** Popup scheduling URL — calendar stays inside the site overlay. */
export const CALENDLY_POPUP_URL = `${SITE.calendly}?hide_gdpr_banner=1`

const WIDGET_JS = "https://assets.calendly.com/assets/external/widget.js"
const WIDGET_CSS = "https://assets.calendly.com/assets/external/widget.css"

function ensureCalendlyCss() {
  if (typeof document === "undefined") return
  if (document.getElementById("calendly-widget-css")) return
  const link = document.createElement("link")
  link.id = "calendly-widget-css"
  link.rel = "stylesheet"
  link.href = WIDGET_CSS
  document.head.appendChild(link)
}

function loadCalendlyScript(): Promise<void> {
  ensureCalendlyCss()
  if (typeof window === "undefined") return Promise.resolve()
  if (window.Calendly?.initPopupWidget) return Promise.resolve()

  const existing = document.querySelector<HTMLScriptElement>(
    `script[src="${WIDGET_JS}"]`,
  )
  if (existing) {
    return new Promise((resolve, reject) => {
      if (window.Calendly?.initPopupWidget) {
        resolve()
        return
      }
      existing.addEventListener("load", () => resolve(), { once: true })
      existing.addEventListener("error", () => reject(new Error("Calendly failed to load")), {
        once: true,
      })
      // Script may already be loaded but Calendly not yet attached
      let tries = 0
      const id = window.setInterval(() => {
        tries++
        if (window.Calendly?.initPopupWidget) {
          window.clearInterval(id)
          resolve()
        } else if (tries > 60) {
          window.clearInterval(id)
          reject(new Error("Calendly timed out"))
        }
      }, 50)
    })
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script")
    script.src = WIDGET_JS
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error("Calendly failed to load"))
    document.body.appendChild(script)
  })
}

/**
 * Opens the FinalOutreach Calendly event in Calendly’s on-site popup overlay.
 * Falls back to a new tab if the embed script cannot load.
 */
export async function openCalendlyPopup(source = "nav") {
  if (typeof window === "undefined") return

  trackCTAClick("Free Consultation", source)
  ensureCalendlyCss()

  try {
    await loadCalendlyScript()
    if (window.Calendly?.initPopupWidget) {
      window.Calendly.initPopupWidget({ url: CALENDLY_POPUP_URL })
      return
    }
  } catch {
    /* fall through */
  }

  window.open(SITE.calendly, "_blank", "noopener,noreferrer")
}
