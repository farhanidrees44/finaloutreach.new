"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"
import { HubSpotLogo, G2Logo } from "./brand-logos"

/* ──────────── Inline partner logos — full colour, HD ──────────── */

/* Salesforce — signature cyan cloud + dark wordmark */
function SalesforceLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 40" aria-label="Salesforce" {...props}>
      <title>Salesforce</title>
      <defs>
        <linearGradient id="sf-cloud" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#00A1E0" />
          <stop offset="1" stopColor="#0070D2" />
        </linearGradient>
      </defs>
      <g transform="translate(0 6)">
        {/* Three-bump cloud silhouette — Salesforce mark */}
        <path
          d="M9 14
             a8 8 0 0 1 13.5 -3.6
             a7 7 0 0 1 11 4.6
             a6 6 0 0 1 -2 11.4
             H10
             a8 8 0 0 1 -1 -12.4 z"
          fill="url(#sf-cloud)"
        />
        <path
          d="M11 16 q3 -3 6 0 t6 0 t6 0"
          stroke="#FFFFFF"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
      </g>
      <text
        x="46"
        y="28"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="700"
        fontSize="20"
        letterSpacing="-0.5"
        fill="#032D60"
      >
        Salesforce
      </text>
    </svg>
  )
}

/* Clutch — navy C-mark with signature red dot + wordmark */
function ClutchLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 180 40" aria-label="Clutch" {...props}>
      <title>Clutch</title>
      <g transform="translate(2 6)">
        {/* Open C ring */}
        <path
          d="M14 0 a14 14 0 1 0 14 14 h-6 a8 8 0 1 1 -8 -8 z"
          fill="#17313B"
        />
        {/* Iconic red dot */}
        <circle cx="22" cy="22" r="4.2" fill="#EF4135" />
      </g>
      <text
        x="38"
        y="28"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="700"
        fontSize="20"
        letterSpacing="-0.5"
        fill="#17313B"
      >
        Clutch
      </text>
    </svg>
  )
}

/* SOC 2 — emerald audited-compliance shield with white check */
function Soc2Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 160 40" aria-label="SOC 2 Compliant" {...props}>
      <title>SOC 2</title>
      <defs>
        <linearGradient id="soc2-shield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#10B981" />
          <stop offset="1" stopColor="#0B4F3A" />
        </linearGradient>
      </defs>
      <g transform="translate(2 4)">
        <path
          d="M16 0 L30 6 V18 a14 14 0 0 1 -14 14 a14 14 0 0 1 -14 -14 V6 Z"
          fill="url(#soc2-shield)"
        />
        <path
          d="M10 16 l4 4 l8 -8"
          stroke="#FFFFFF"
          strokeWidth="2.6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <text
        x="40"
        y="26"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="800"
        fontSize="18"
        letterSpacing="-0.5"
        fill="#0B4F3A"
      >
        SOC 2
      </text>
    </svg>
  )
}

/* ──────────── Partner data ──────────── */

const PARTNERS = [
  {
    name: "HubSpot Solutions Partner",
    short: "HubSpot Partner",
    Logo: HubSpotLogo,
    verified: "Apr 2026",
    href: "https://ecosystem.hubspot.com",
  },
  {
    name: "Salesforce Partner",
    short: "Salesforce Partner",
    Logo: SalesforceLogo,
    verified: "Mar 2026",
    href: "https://appexchange.salesforce.com",
  },
  {
    name: "G2 Top Rated 2026",
    short: "G2 Top Rated",
    Logo: G2Logo,
    verified: "Q1 2026",
    href: "https://g2.com",
  },
  {
    name: "Clutch Top 100 Lead Gen",
    short: "Clutch Top 100",
    Logo: ClutchLogo,
    verified: "Feb 2026",
    href: "https://clutch.co",
  },
  {
    name: "SOC 2 Type II Compliant",
    short: "SOC 2 Type II",
    Logo: Soc2Logo,
    verified: "Audited 2025",
    href: "#",
  },
] as const

export function Awards() {
  const prefersReducedMotion = useReducedMotion()
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.15 })

  return (
    <section
      ref={ref}
      aria-label="Trusted partners and certifications"
      className="relative isolate border-t border-ink-08 bg-background"
    >
      {/* Mesh gradient background — emerald top-left + gold accent */}
      <div
        aria-hidden="true"
        className="mesh-emerald absolute inset-0 -z-10"
      />

      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12 py-16 sm:py-20">
        {/* Heading */}
        <motion.h2
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={
            inView
              ? { opacity: 1, y: 0 }
              : prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 14 }
          }
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="mx-auto max-w-2xl text-balance text-center text-[26px] font-medium leading-[1.15] tracking-display text-ink sm:text-[32px]"
        >
          <span className="font-serif-italic text-emerald">Trusted</span>{" "}
          partner of leading platforms
        </motion.h2>
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={
            inView
              ? { opacity: 1, y: 0 }
              : prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 10 }
          }
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
          className="mx-auto mt-3 max-w-xl text-pretty text-center text-[14.5px] leading-[1.65] text-ink-60"
        >
          Verified relationships with the platforms our clients rely on every
          day — backed by audited security and recognized track record.
        </motion.p>

        {/* Partner grid: 5 cols desktop, 2 tablet, 1 small mobile */}
        <ul className="mt-10 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-5">
          {PARTNERS.map(({ name, short, Logo, verified, href }, i) => (
            <motion.li
              key={name}
              initial={
                prefersReducedMotion ? false : { opacity: 0, y: 16, scale: 0.97 }
              }
              animate={
                inView
                  ? { opacity: 1, y: 0, scale: 1 }
                  : prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 0, y: 16, scale: 0.97 }
              }
              transition={{
                duration: 0.55,
                delay: 0.18 + i * 0.06,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
            >
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="glass-card group relative flex h-full flex-col items-start gap-4 rounded-2xl p-6 transition-all duration-300 ease-out hover:scale-[1.03] hover:border-emerald/40 hover:shadow-[0_8px_30px_-12px_rgba(11,79,58,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label={`${name} — verified ${verified}`}
              >
                {/* Each logo carries its own brand colours via inline fills.
                    A subtle drop-shadow on hover lifts them off the card. */}
                <Logo
                  className="h-9 max-w-[8rem] w-auto transition-[transform,filter] duration-300 group-hover:scale-[1.04] group-hover:drop-shadow-[0_4px_8px_rgba(0,0,0,0.08)]"
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-1">
                  <span className="text-[14px] font-medium leading-tight tracking-tight text-ink">
                    {short}
                  </span>
                  <span className="text-[12px] text-ink-40">
                    Verified {verified}
                  </span>
                </div>

                {/* Hover badge — top right */}
                <span
                  className="absolute right-4 top-4 inline-flex translate-y-[-2px] items-center gap-1 rounded-full border border-emerald/20 bg-emerald/[0.06] px-2 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.14em] text-emerald opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  aria-hidden="true"
                >
                  <ExternalLink className="size-2.5" strokeWidth={2.2} />
                  Verified
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
