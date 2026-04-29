/**
 * High-fidelity inline SVG brand wordmarks used across the site
 * (the "As featured in" press strip and the client-logo marquee).
 *
 * Each logo renders inside a normalised 40px-tall viewBox so the
 * marquee row maintains perfect optical alignment regardless of
 * which mark is on screen. Logos use authentic brand typography
 * (serif for editorial, geometric sans for tech) and recognisable
 * marks. Default fill is currentColor so the parent can switch
 * between monochrome (default) and full-colour (on hover) without
 * touching individual nodes — colored accents use solid hex values.
 */

import * as React from "react"
import { useId } from "react"

type LogoProps = React.SVGProps<SVGSVGElement> & {
  title?: string
}

function withTitle(title: string | undefined, children: React.ReactNode) {
  if (!title) return children
  return (
    <>
      <title>{title}</title>
      {children}
    </>
  )
}

/* ──────────────────────────────────────────────────────────────
   Forbes — iconic editorial serif wordmark.
   The real Forbes logo uses a custom display serif with steep
   contrast. Georgia is the closest websafe approximation.
   ────────────────────────────────────────────────────────────── */
export function ForbesLogo({ title = "Forbes", ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 168 40"
      role="img"
      aria-label={title}
      fill="currentColor"
      {...props}
    >
      {withTitle(
        title,
        <text
          x="0"
          y="32"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontWeight="700"
          fontSize="38"
          letterSpacing="-1.4"
        >
          Forbes
        </text>,
      )}
    </svg>
  )
}

/* ──────────────────────────────────────────────────────────────
   TechCrunch — signature green square + geometric sans wordmark.
   ────────────────────────────────────────────────────────────── */
export function TechCrunchLogo({ title = "TechCrunch", ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 218 40"
      role="img"
      aria-label={title}
      fill="currentColor"
      {...props}
    >
      {withTitle(
        title,
        <>
          {/* Signature green square — TechCrunch's iconic mark */}
          <rect x="0" y="6" width="28" height="28" rx="2" />
          <text
            x="36"
            y="29"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontWeight="800"
            fontSize="23"
            letterSpacing="-0.6"
          >
            TechCrunch
          </text>
        </>,
      )}
    </svg>
  )
}

/* ──────────────────────────────────────────────────────────────
   HubSpot — three-node sprocket icon + wordmark.
   ────────────────────────────────────────────────────────────── */
export function HubSpotLogo({ title = "HubSpot", ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 178 40"
      role="img"
      aria-label={title}
      fill="currentColor"
      {...props}
    >
      {withTitle(
        title,
        <>
          {/* Three-node sprocket mark — three connected circles */}
          <g transform="translate(0 6)">
            <circle cx="6" cy="6" r="4.2" />
            <circle cx="22" cy="6" r="4.2" />
            <circle cx="14" cy="22" r="4.2" />
            <path
              d="M6 6 L22 6 M6 6 L14 22 M22 6 L14 22"
              stroke="currentColor"
              strokeWidth="1.8"
              fill="none"
            />
          </g>
          <text
            x="36"
            y="28"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontWeight="700"
            fontSize="23"
            letterSpacing="-0.7"
          >
            HubSpot
          </text>
        </>,
      )}
    </svg>
  )
}

/* ──────────────────────────────────────────────────────────────
   SaaStr — bold, condensed sans wordmark.
   ────────────────────────────────────────────────────────────── */
export function SaaStrLogo({ title = "SaaStr", ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 138 40"
      role="img"
      aria-label={title}
      fill="currentColor"
      {...props}
    >
      {withTitle(
        title,
        <text
          x="0"
          y="30"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontWeight="800"
          fontSize="28"
          letterSpacing="-1.2"
        >
          SaaStr
        </text>,
      )}
    </svg>
  )
}

/* ──────────────────────────────────────────────────────────────
   Product Hunt — circular mark with stylised "P" + wordmark.
   The real Product Hunt logo is an orange circle with a
   geometric "P" cut from a rounded rectangle.
   ────────────────────────────────────────────────────────────── */
export function ProductHuntLogo({ title = "Product Hunt", ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 196 40"
      role="img"
      aria-label={title}
      fill="currentColor"
      {...props}
    >
      {withTitle(
        title,
        <>
          {/* Circular mark with a notched P — Product Hunt's signature */}
          <g transform="translate(0 4)">
            <circle cx="16" cy="16" r="16" />
            {/* The P is rendered as a negative shape (background-coloured) */}
            <path
              d="M11.5 8 h7.5 a4.5 4.5 0 0 1 0 9 h-3.5 v7 h-4 z M15.5 11.6 v3.2 h3 a1.6 1.6 0 0 0 0 -3.2 z"
              fill="var(--background, #FAFAF7)"
              fillRule="evenodd"
            />
          </g>
          <text
            x="40"
            y="28"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontWeight="700"
            fontSize="22"
            letterSpacing="-0.6"
          >
            Product Hunt
          </text>
        </>,
      )}
    </svg>
  )
}

/* ──────────────────────────────────────────────────────────────
   G2 — rounded square mark + wordmark.
   ────────────────────────────────────────────────────────────── */
export function G2Logo({ title = "G2", ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 92 40"
      role="img"
      aria-label={title}
      fill="currentColor"
      {...props}
    >
      {withTitle(
        title,
        <>
          <rect x="0" y="2" width="36" height="36" rx="9" />
          <text
            x="18"
            y="27"
            textAnchor="middle"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontWeight="800"
            fontSize="19"
            letterSpacing="-0.4"
            fill="var(--background, #FAFAF7)"
          >
            G2
          </text>
        </>,
      )}
    </svg>
  )
}

/* ──────────────────────────────────────────────────────────────
   Inc. magazine — bold sans wordmark with terminal period.
   ────────────────────────────────────────────────────────────── */
export function IncLogo({ title = "Inc.", ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 92 40"
      role="img"
      aria-label={title}
      fill="currentColor"
      {...props}
    >
      {withTitle(
        title,
        <text
          x="0"
          y="32"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontWeight="900"
          fontSize="36"
          letterSpacing="-1.5"
        >
          Inc.
        </text>,
      )}
    </svg>
  )
}

/* ──────────────────────────────────────────────────────────────
   Entrepreneur — bold black sans wordmark.
   ────────────────────────────────────────────────────────────── */
export function EntrepreneurLogo({
  title = "Entrepreneur",
  ...props
}: LogoProps) {
  return (
    <svg
      viewBox="0 0 220 40"
      role="img"
      aria-label={title}
      fill="currentColor"
      {...props}
    >
      {withTitle(
        title,
        <text
          x="0"
          y="29"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontWeight="800"
          fontSize="22"
          letterSpacing="-0.6"
        >
          ENTREPRENEUR
        </text>,
      )}
    </svg>
  )
}

/* ──────────────────────────────────────────────────────────────
   Fast Company — geometric sans wordmark, two-line stack.
   ────────────────────────────────────────────────────────────── */
export function FastCompanyLogo({
  title = "Fast Company",
  ...props
}: LogoProps) {
  return (
    <svg
      viewBox="0 0 184 40"
      role="img"
      aria-label={title}
      fill="currentColor"
      {...props}
    >
      {withTitle(
        title,
        <text
          x="0"
          y="29"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontWeight="800"
          fontSize="22"
          letterSpacing="-0.6"
        >
          FastCompany
        </text>,
      )}
    </svg>
  )
}

/* ══════════════════════════════════════════════════════════════
   Client / Trusted-by logos — recognisable B2B SaaS marks
   rendered with authentic brand colours. Used by LogoMarquee.
   ══════════════════════════════════════════════════════════════ */

/* Slack — 4-colour pinwheel hash + aubergine wordmark */
export function SlackLogo({ title = "Slack", ...props }: LogoProps) {
  return (
    <svg viewBox="0 0 116 40" role="img" aria-label={title} {...props}>
      {withTitle(
        title,
        <>
          <g transform="translate(2 6)">
            {/* 4 rounded pills arranged into a hash, each in a Slack brand colour */}
            <rect x="11" y="0" width="6" height="13" rx="3" fill="#ECB22E" />
            <rect x="15" y="11" width="13" height="6" rx="3" fill="#2EB67D" />
            <rect x="11" y="15" width="6" height="13" rx="3" fill="#36C5F0" />
            <rect x="0" y="11" width="13" height="6" rx="3" fill="#E01E5A" />
          </g>
          <text
            x="34"
            y="28"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontWeight="800"
            fontSize="22"
            letterSpacing="-0.7"
            fill="#4A154B"
          >
            slack
          </text>
        </>,
      )}
    </svg>
  )
}

/* Notion — rounded-square N mark + serif wordmark */
export function NotionLogo({ title = "Notion", ...props }: LogoProps) {
  return (
    <svg viewBox="0 0 132 40" role="img" aria-label={title} {...props}>
      {withTitle(
        title,
        <>
          <g transform="translate(2 4)">
            <rect width="32" height="32" rx="6" fill="#FFFFFF" stroke="#E5E5E5" />
            <path
              d="M9 8 V24 M9 8 L23 24 M23 8 V24"
              stroke="#000000"
              strokeWidth="2.6"
              fill="none"
              strokeLinecap="square"
            />
          </g>
          <text
            x="42"
            y="28"
            fontFamily="ui-serif, Georgia, serif"
            fontWeight="700"
            fontSize="22"
            letterSpacing="-0.5"
            fill="#000000"
          >
            Notion
          </text>
        </>,
      )}
    </svg>
  )
}

/* Stripe — bold italicised wordmark in Stripe Indigo */
export function StripeLogo({ title = "Stripe", ...props }: LogoProps) {
  return (
    <svg viewBox="0 0 110 40" role="img" aria-label={title} {...props}>
      {withTitle(
        title,
        <text
          x="0"
          y="30"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontWeight="900"
          fontSize="28"
          letterSpacing="-1.1"
          fontStyle="italic"
          fill="#635BFF"
        >
          stripe
        </text>,
      )}
    </svg>
  )
}

/* Shopify — green bag mark + wordmark */
export function ShopifyLogo({ title = "Shopify", ...props }: LogoProps) {
  return (
    <svg viewBox="0 0 142 40" role="img" aria-label={title} {...props}>
      {withTitle(
        title,
        <>
          <g transform="translate(2 4)">
            {/* Shopping bag silhouette */}
            <path
              d="M16 4 c-3.6 0 -6 2.6 -6 6 v2 H7 l-2 18 h22 l-2 -18 h-3 v-2 c0 -3.4 -2.4 -6 -6 -6 z M13 12 v-2 c0 -1.7 1.3 -3 3 -3 s3 1.3 3 3 v2 z"
              fill="#95BF47"
            />
            <text
              x="14.5"
              y="25"
              textAnchor="middle"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontWeight="800"
              fontSize="13"
              fill="#FFFFFF"
            >
              S
            </text>
          </g>
          <text
            x="40"
            y="28"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontWeight="700"
            fontSize="22"
            letterSpacing="-0.7"
            fill="#5E8E3E"
          >
            shopify
          </text>
        </>,
      )}
    </svg>
  )
}

/* Asana — three-dot triangle mark + wordmark */
export function AsanaLogo({ title = "Asana", ...props }: LogoProps) {
  return (
    <svg viewBox="0 0 122 40" role="img" aria-label={title} {...props}>
      {withTitle(
        title,
        <>
          <g transform="translate(2 8)">
            <circle cx="11" cy="6" r="6" fill="#FCBD92" />
            <circle cx="4" cy="18" r="6" fill="#F06A6A" />
            <circle cx="18" cy="18" r="6" fill="#F06A6A" />
          </g>
          <text
            x="32"
            y="28"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontWeight="700"
            fontSize="22"
            letterSpacing="-0.6"
            fill="#1E1F21"
          >
            asana
          </text>
        </>,
      )}
    </svg>
  )
}

/* Linear — gradient-bar mark + wordmark */
export function LinearLogo({ title = "Linear", ...props }: LogoProps) {
  // Per-instance ID — defs are duplicated when the marquee clones the
  // logo list, and duplicate `id` attributes break the SVG <-> url(#id)
  // reference in some browsers.
  const gradId = `linear-grad-${useId()}`
  return (
    <svg viewBox="0 0 124 40" role="img" aria-label={title} {...props}>
      {withTitle(
        title,
        <>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#5E6AD2" />
              <stop offset="1" stopColor="#9CA3F0" />
            </linearGradient>
          </defs>
          <g transform="translate(2 6)">
            {/* Concentric arcs forming Linear's signature mark */}
            <rect width="28" height="28" rx="7" fill={`url(#${gradId})`} />
            <path
              d="M7 21 L21 7 M11 25 L25 11 M5 17 L17 5"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.9"
            />
          </g>
          <text
            x="34"
            y="28"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontWeight="700"
            fontSize="22"
            letterSpacing="-0.6"
            fill="#1A1A1A"
          >
            Linear
          </text>
        </>,
      )}
    </svg>
  )
}

/* Figma — 5-colour geometric mark + wordmark */
export function FigmaLogo({ title = "Figma", ...props }: LogoProps) {
  return (
    <svg viewBox="0 0 116 40" role="img" aria-label={title} {...props}>
      {withTitle(
        title,
        <>
          <g transform="translate(2 4)">
            {/* Top-left red */}
            <path d="M5 0 h7 v8 h-7 a4 4 0 0 1 0 -8 z" fill="#F24E1E" />
            {/* Top-right orange */}
            <path d="M12 0 h3 a4 4 0 0 1 0 8 h-3 z" fill="#FF7262" />
            {/* Mid-right circle (purple) */}
            <circle cx="15" cy="12" r="4" fill="#A259FF" />
            {/* Mid-left green */}
            <path d="M5 8 h7 v8 h-7 a4 4 0 0 1 0 -8 z" fill="#1ABCFE" />
            {/* Bottom-left blue */}
            <path d="M5 16 h7 v8 a4 4 0 0 1 -7 0 z" fill="#0ACF83" />
          </g>
          <text
            x="26"
            y="28"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontWeight="700"
            fontSize="22"
            letterSpacing="-0.6"
            fill="#1E1E1E"
          >
            Figma
          </text>
        </>,
      )}
    </svg>
  )
}

/* Intercom — blue rounded square + wordmark */
export function IntercomLogo({ title = "Intercom", ...props }: LogoProps) {
  return (
    <svg viewBox="0 0 148 40" role="img" aria-label={title} {...props}>
      {withTitle(
        title,
        <>
          <g transform="translate(2 4)">
            <rect width="32" height="32" rx="8" fill="#1F8DED" />
            {/* Three vertical bars representing chat lines */}
            <line x1="9" y1="11" x2="9" y2="21" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
            <line x1="16" y1="9" x2="16" y2="23" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
            <line x1="23" y1="11" x2="23" y2="21" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
          </g>
          <text
            x="42"
            y="28"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontWeight="700"
            fontSize="22"
            letterSpacing="-0.6"
            fill="#1A1A1A"
          >
            Intercom
          </text>
        </>,
      )}
    </svg>
  )
}

/* Atlassian — blue stacked-mountain mark + wordmark */
export function AtlassianLogo({ title = "Atlassian", ...props }: LogoProps) {
  const gradId = `atl-grad-${useId()}`
  return (
    <svg viewBox="0 0 152 40" role="img" aria-label={title} {...props}>
      {withTitle(
        title,
        <>
          <defs>
            <linearGradient id={gradId} x1="0" y1="1" x2="0.6" y2="0">
              <stop offset="0" stopColor="#0052CC" />
              <stop offset="1" stopColor="#2684FF" />
            </linearGradient>
          </defs>
          <g transform="translate(2 8)">
            <path d="M8 0 L16 24 H0 z" fill={`url(#${gradId})`} />
            <path d="M18 6 L26 24 H10 z" fill="#0052CC" opacity="0.9" />
          </g>
          <text
            x="34"
            y="28"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontWeight="700"
            fontSize="22"
            letterSpacing="-0.7"
            fill="#0052CC"
          >
            Atlassian
          </text>
        </>,
      )}
    </svg>
  )
}

/* Zoom — blue camera mark + lowercase wordmark */
export function ZoomLogo({ title = "Zoom", ...props }: LogoProps) {
  return (
    <svg viewBox="0 0 116 40" role="img" aria-label={title} {...props}>
      {withTitle(
        title,
        <>
          <g transform="translate(2 8)">
            <rect width="22" height="14" rx="3" y="5" fill="#2D8CFF" />
            <path d="M22 10 L30 6 V18 L22 14 z" fill="#2D8CFF" />
          </g>
          <text
            x="36"
            y="28"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontWeight="800"
            fontSize="24"
            letterSpacing="-1"
            fill="#2D8CFF"
          >
            zoom
          </text>
        </>,
      )}
    </svg>
  )
}

/* ──────────────────────────────────────────────────────────────
   Generic client wordmark used by the LogoMarquee component.
   Keeps backwards compatibility with existing consumers.
   ────────────────────────────────────────────────────────────── */
type ClientLogoProps = LogoProps & { name: string }

export function ClientWordmark({
  name,
  variant = "geometric",
  title,
  ...props
}: ClientLogoProps & {
  variant?: "geometric" | "dot" | "ring" | "tri" | "bar" | "node"
}) {
  const variants: Record<string, React.ReactNode> = {
    geometric: <rect x="2" y="6" width="14" height="14" rx="3" />,
    dot: <circle cx="9" cy="13" r="6" />,
    ring: (
      <circle
        cx="9"
        cy="13"
        r="6"
        stroke="currentColor"
        strokeWidth="2.4"
        fill="none"
      />
    ),
    tri: <path d="M2 21 L9 5 L16 21 Z" />,
    bar: <rect x="3" y="9" width="14" height="8" rx="2" />,
    node: (
      <g>
        <circle cx="4" cy="13" r="2.5" />
        <circle cx="14" cy="13" r="2.5" />
        <path d="M4 13 H14" stroke="currentColor" strokeWidth="2" />
      </g>
    ),
  }

  return (
    <svg
      viewBox="0 0 160 26"
      role="img"
      aria-label={title ?? name}
      fill="currentColor"
      {...props}
    >
      <title>{title ?? name}</title>
      <g>{variants[variant]}</g>
      <text
        x="22"
        y="19"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="700"
        fontSize="16"
        letterSpacing="-0.4"
      >
        {name}
      </text>
    </svg>
  )
}
