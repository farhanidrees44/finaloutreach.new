"use client"

/** Compact 24px icon marks — same visual weight for every tool. */

import type { ReactElement } from "react"

type MarkProps = { className?: string; title?: string }

export function ApolloIcon({ className, title = "Apollo" }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden={!title}>
      {title ? <title>{title}</title> : null}
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 3.2a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8Zm0 13.1a7.4 7.4 0 0 1-5.5-2.5 1.2 1.2 0 0 1 .2-1.7 8.6 8.6 0 0 1 10.6 0 1.2 1.2 0 0 1 .2 1.7 7.4 7.4 0 0 1-5.5 2.5Z" />
    </svg>
  )
}

export function ZoomInfoIcon({ className, title = "ZoomInfo" }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden={!title}>
      {title ? <title>{title}</title> : null}
      <path d="M4 5h7.2L7.6 12 11.2 19H4l3.6-7L4 5Zm8.8 0H20l-3.6 7L20 19h-7.2l3.6-7-3.6-7Z" />
    </svg>
  )
}

export function SmartleadIcon({ className, title = "Smartlead" }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden={!title}>
      {title ? <title>{title}</title> : null}
      <path d="M5 20V4l7 8 7-8v16" strokeLinejoin="round" />
    </svg>
  )
}

export function InstantlyIcon({ className, title = "Instantly" }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden={!title}>
      {title ? <title>{title}</title> : null}
      <path d="M13 2 4 14h6l-1 8 11-14h-6l-1-6Z" />
    </svg>
  )
}

export function GoHighLevelIcon({ className, title = "GoHighLevel" }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden={!title}>
      {title ? <title>{title}</title> : null}
      <path d="M6 18V9l4 4.5L14 7l4 11H6Zm8.5-3.2L14 11.2l-1.5 3.6h2Z" />
    </svg>
  )
}

export function HubSpotIcon({ className, title = "HubSpot" }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden={!title}>
      {title ? <title>{title}</title> : null}
      <circle cx="7" cy="8" r="2.2" />
      <circle cx="17" cy="8" r="2.2" />
      <circle cx="12" cy="16" r="2.2" />
      <path d="M7 8h10M7 8l5 8M17 8l-5 8" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

export function ClayIcon({ className, title = "Clay" }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden={!title}>
      {title ? <title>{title}</title> : null}
      <path d="M4 18a8 8 0 0 1 16 0" />
      <path d="M7 18a5 5 0 0 1 10 0" />
      <path d="M10 18a2 2 0 0 1 4 0" />
    </svg>
  )
}

export function HeyReachIcon({ className, title = "HeyReach" }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden={!title}>
      {title ? <title>{title}</title> : null}
      <path d="M8 11a4 4 0 1 1 8 0v7h-2.2v-6.5a1.8 1.8 0 1 0-3.6 0V18H8v-7Z" />
      <path d="M3 10h2.5M5 7.5 6.8 9M5 12.5 6.8 11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function LemlistIcon({ className, title = "lemlist" }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden={!title}>
      {title ? <title>{title}</title> : null}
      <path d="M4 5h3v14H4V5Zm5 7c0-4.4 3-7 7.2-7C20.5 5 22 7.2 22 10.4c0 4.3-3.1 7.6-8.2 7.6H9V12Zm3.1 0v3.4h1.7c2.7 0 4.3-1.5 4.3-3.6 0-1.9-1.3-3.1-3.4-3.1-1.8 0-2.6 1-2.6 3.3Z" />
    </svg>
  )
}

export function SalesforceIcon({ className, title = "Salesforce" }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden={!title}>
      {title ? <title>{title}</title> : null}
      <path d="M10.2 6.2a3.6 3.6 0 0 1 3.3-2.1c1.3 0 2.4.6 3.1 1.6A4.1 4.1 0 0 1 21 9.8a3.7 3.7 0 0 1-1.1 7h-9.2A4.6 4.6 0 0 1 6 12.6c0-.5.1-1 .2-1.4A3.9 3.9 0 0 1 10.2 6.2Z" />
    </svg>
  )
}

export const STACK_ICON_MAP: Record<string, (p: MarkProps) => ReactElement> = {
  apollo: ApolloIcon,
  zoominfo: ZoomInfoIcon,
  smartlead: SmartleadIcon,
  instantly: InstantlyIcon,
  gohighlevel: GoHighLevelIcon,
  hubspot: HubSpotIcon,
  clay: ClayIcon,
  heyreach: HeyReachIcon,
  lemlist: LemlistIcon,
  salesforce: SalesforceIcon,
}
