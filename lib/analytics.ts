// Analytics helpers — Google Analytics 4 + Microsoft Clarity.
// All functions are safe no-ops when analytics IDs are not configured
// or when running on the server.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
    clarity?: (...args: unknown[]) => void
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID
export const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID

function isClient() {
  return typeof window !== "undefined"
}

/**
 * Track a generic event in GA4.
 * https://developers.google.com/analytics/devguides/collection/ga4/events
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (!isClient() || !window.gtag) return
  try {
    window.gtag("event", name, params)
  } catch {
    /* swallow analytics errors */
  }
}

/** Track CTA button clicks. */
export function trackCTAClick(buttonName: string, location: string) {
  trackEvent("cta_click", { button_name: buttonName, location })
}

/** Track form submissions. */
export function trackFormSubmit(formName: string, extra: Record<string, unknown> = {}) {
  trackEvent("form_submit", { form_name: formName, ...extra })
}

/** Track resource downloads. */
export function trackDownload(resourceName: string) {
  trackEvent("download", { resource_name: resourceName })
}

/** Track outbound clicks. */
export function trackOutboundClick(destination: string) {
  trackEvent("outbound_click", { destination })
}

/** Track conversions (lead, signup, etc.) — useful for GA4 conversion events. */
export function trackConversion(conversionName: string, value?: number) {
  trackEvent("conversion", { conversion_name: conversionName, value })
}

/** Manually push a page view (useful when not relying on automatic SPA tracking). */
export function trackPageView(url: string, title?: string) {
  if (!isClient() || !window.gtag || !GA_ID) return
  try {
    window.gtag("config", GA_ID, {
      page_path: url,
      page_title: title,
    })
  } catch {
    /* swallow */
  }
}
