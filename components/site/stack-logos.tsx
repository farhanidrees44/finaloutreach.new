"use client"

/**
 * Recognizable monochrome wordmarks for tools we operate.
 * Logos shown for identification only — not partnership claims.
 * Prefer official brand-kit SVGs when replacing these marks.
 */

import type { ReactElement, ReactNode } from "react"

type LogoProps = {
  title?: string
  className?: string
}

function Wordmark({
  title,
  className,
  children,
}: {
  title: string
  className?: string
  children: ReactNode
}) {
  return (
    <svg
      viewBox="0 0 160 40"
      role="img"
      aria-label={title}
      className={className}
      fill="currentColor"
    >
      <title>{title}</title>
      {children}
    </svg>
  )
}

export function ApolloMark({ title = "Apollo", className }: LogoProps) {
  return (
    <Wordmark title={title} className={className}>
      <circle cx="14" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="14" cy="20" r="3.5" />
      <text x="32" y="27" fontFamily="ui-sans-serif,system-ui,sans-serif" fontWeight="700" fontSize="18" letterSpacing="-0.5">
        Apollo
      </text>
    </Wordmark>
  )
}

export function ZoomInfoMark({ title = "ZoomInfo", className }: LogoProps) {
  return (
    <Wordmark title={title} className={className}>
      <text x="0" y="27" fontFamily="ui-sans-serif,system-ui,sans-serif" fontWeight="700" fontSize="18" letterSpacing="-0.6">
        ZoomInfo
      </text>
    </Wordmark>
  )
}

export function SmartleadMark({ title = "Smartlead", className }: LogoProps) {
  return (
    <Wordmark title={title} className={className}>
      <path d="M8 28 V12 l8 10 8-10 v16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <text x="32" y="27" fontFamily="ui-sans-serif,system-ui,sans-serif" fontWeight="700" fontSize="17" letterSpacing="-0.5">
        Smartlead
      </text>
    </Wordmark>
  )
}

export function InstantlyMark({ title = "Instantly", className }: LogoProps) {
  return (
    <Wordmark title={title} className={className}>
      <path d="M12 8 L20 20 H14 L18 32 L8 18 H14 Z" />
      <text x="28" y="27" fontFamily="ui-sans-serif,system-ui,sans-serif" fontWeight="700" fontSize="17" letterSpacing="-0.5">
        Instantly
      </text>
    </Wordmark>
  )
}

export function GoHighLevelMark({ title = "GoHighLevel", className }: LogoProps) {
  return (
    <Wordmark title={title} className={className}>
      <text x="0" y="27" fontFamily="ui-sans-serif,system-ui,sans-serif" fontWeight="700" fontSize="15" letterSpacing="-0.4">
        GoHighLevel
      </text>
    </Wordmark>
  )
}

export function HubSpotStackMark({ title = "HubSpot", className }: LogoProps) {
  return (
    <Wordmark title={title} className={className}>
      <circle cx="8" cy="12" r="4" />
      <circle cx="22" cy="12" r="4" />
      <circle cx="15" cy="26" r="4" />
      <path d="M8 12 L22 12 M8 12 L15 26 M22 12 L15 26" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <text x="34" y="27" fontFamily="ui-sans-serif,system-ui,sans-serif" fontWeight="700" fontSize="17" letterSpacing="-0.5">
        HubSpot
      </text>
    </Wordmark>
  )
}

export function ClayMark({ title = "Clay", className }: LogoProps) {
  return (
    <Wordmark title={title} className={className}>
      <path d="M6 28 a12 12 0 0 1 24 0" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M10 28 a8 8 0 0 1 16 0" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M14 28 a4 4 0 0 1 8 0" fill="none" stroke="currentColor" strokeWidth="3" />
      <text x="40" y="27" fontFamily="ui-sans-serif,system-ui,sans-serif" fontWeight="700" fontSize="18" letterSpacing="-0.5">
        Clay
      </text>
    </Wordmark>
  )
}

export function HeyReachMark({ title = "HeyReach", className }: LogoProps) {
  return (
    <Wordmark title={title} className={className}>
      <text x="0" y="27" fontFamily="Georgia,serif" fontWeight="600" fontSize="18" letterSpacing="-0.3">
        heyreach
      </text>
    </Wordmark>
  )
}

export function LemlistMark({ title = "lemlist", className }: LogoProps) {
  return (
    <Wordmark title={title} className={className}>
      <text x="0" y="27" fontFamily="ui-sans-serif,system-ui,sans-serif" fontWeight="700" fontSize="18" letterSpacing="-0.6">
        lemlist
      </text>
    </Wordmark>
  )
}

export function SalesforceMark({ title = "Salesforce", className }: LogoProps) {
  return (
    <Wordmark title={title} className={className}>
      <ellipse cx="18" cy="20" rx="16" ry="12" fill="none" stroke="currentColor" strokeWidth="2" />
      <text x="40" y="27" fontFamily="ui-sans-serif,system-ui,sans-serif" fontWeight="700" fontSize="15" letterSpacing="-0.4">
        Salesforce
      </text>
    </Wordmark>
  )
}

export const STACK_LOGO_MAP: Record<
  string,
  (props: LogoProps) => ReactElement
> = {
  apollo: ApolloMark,
  zoominfo: ZoomInfoMark,
  smartlead: SmartleadMark,
  instantly: InstantlyMark,
  gohighlevel: GoHighLevelMark,
  hubspot: HubSpotStackMark,
  clay: ClayMark,
  heyreach: HeyReachMark,
  lemlist: LemlistMark,
  salesforce: SalesforceMark,
}
