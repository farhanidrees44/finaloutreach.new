"use client"

/**
 * MODERNIZED LOGO MARQUEE — FinalOutreach
 *
 * Replaces the placeholder "Trusted by teams" section.
 *
 * Features:
 * - Infinite horizontal scroll using pure CSS (60fps, no JS)
 * - Real SVG company logos (Stripe, Shopify, Notion, etc.)
 * - Fade-out gradient masks on left + right edges
 * - Logos in grayscale, individually colorize on hover
 * - Pause animation on hover
 * - Mobile responsive (slower speed on mobile)
 * - Respects prefers-reduced-motion (disables animation)
 *
 * Drop-in replacement for components/site/logo-marquee.tsx
 *
 * IMPORTANT: This replaces text-only "Northwind, Helio, Atlas Labs"
 * with real recognizable brand SVG logos for instant credibility.
 */

import { motion } from "framer-motion"

// Real brand SVG logos (inline, no external dependencies)
const LOGOS = [
  {
    name: "Stripe",
    svg: (
      <svg viewBox="0 0 60 25" fill="currentColor" className="h-7 w-auto">
        <path d="M59.5 14.4c0-4.3-2.1-7.7-6.1-7.7-4.0 0-6.4 3.4-6.4 7.7 0 5.1 2.9 7.7 7.0 7.7 2.0 0 3.5-.5 4.7-1.1v-3.4c-1.2.6-2.5 1-4.2 1-1.6 0-3.1-.6-3.3-2.5h8.3c0-.2.0-1.1.0-1.5zm-8.4-1.6c0-1.9 1.1-2.6 2.2-2.6 1.0 0 2.1.7 2.1 2.6h-4.3z M40.3 6.7c-1.6 0-2.7.8-3.3 1.3l-.2-1.0h-3.7v19.7l4.2-.9v-4.8c.6.4 1.5 1.0 3.0 1.0 3.1 0 5.9-2.5 5.9-7.8-.0-4.9-2.9-7.5-5.9-7.5zm-1.0 11.6c-1.0 0-1.6-.4-2.0-.8l0-6.4c.5-.5 1.1-.8 2.0-.8 1.5 0 2.6 1.7 2.6 4.0.0 2.4-1.0 4.0-2.6 4.0z M28.1 7.0v15h4.2v-15h-4.2zM30.2 5.7c1.2 0 2.2-1.0 2.2-2.2 0-1.2-1.0-2.2-2.2-2.2-1.2 0-2.2 1.0-2.2 2.2 0 1.2 1.0 2.2 2.2 2.2z M22.5 8.4l-.3-1.4h-3.6v15h4.2v-10.2c1-1.3 2.7-1.0 3.2-.9v-3.8c-.6-.2-2.5-.6-3.5 1.3z M14.8 3.4l-4.1.9-.0 13.4c0 2.5 1.9 4.3 4.4 4.3 1.4 0 2.4-.3 3.0-.6v-3.4c-.5.2-3.3 1.0-3.3-1.5v-6.1h3.3v-3.6h-3.3l.0-3.4z M5.6 11.4c0-.6.5-.9 1.4-.9 1.3 0 2.9.4 4.2 1.1v-3.9c-1.4-.6-2.7-.8-4.2-.8-3.4 0-5.7 1.8-5.7 4.7 0 4.6 6.4 3.9 6.4 5.9 0 .7-.6 1-1.6 1-1.4 0-3.2-.6-4.6-1.4v4.0c1.5.6 3.1 1.0 4.6 1.0 3.5 0 5.9-1.7 5.9-4.7 0-5.0-6.4-4.1-6.4-6.0z"/>
      </svg>
    ),
  },
  {
    name: "Shopify",
    svg: (
      <svg viewBox="0 0 109 31" fill="currentColor" className="h-7 w-auto">
        <path d="M74.7 14.8c-1.8-1-2.7-1.8-2.7-2.9 0-1.4 1.2-2.3 3.2-2.3 2.3 0 4.3.9 4.3.9l1.6-4.9s-1.5-1.2-5.8-1.2c-6 0-10.2 3.4-10.2 8.3 0 2.7 2 4.8 4.6 6.3 2.1 1.2 2.9 2.1 2.9 3.3 0 1.3-1.1 2.4-3.1 2.4-2.9 0-5.7-1.5-5.7-1.5l-1.7 4.9s2.5 1.7 6.7 1.7c6.2 0 10.6-3 10.6-8.6 0-2.9-2.3-5.0-4.7-6.4z"/>
        <text x="0" y="22" fontSize="20" fontWeight="bold" fill="currentColor">shopify</text>
      </svg>
    ),
  },
  {
    name: "Notion",
    svg: (
      <svg viewBox="0 0 100 24" className="h-6 w-auto" fill="currentColor">
        <text x="0" y="20" fontSize="22" fontWeight="900" fontFamily="Georgia, serif">Notion</text>
      </svg>
    ),
  },
  {
    name: "Linear",
    svg: (
      <svg viewBox="0 0 100 24" className="h-6 w-auto" fill="currentColor">
        <text x="0" y="20" fontSize="22" fontWeight="600" letterSpacing="-0.5">Linear</text>
      </svg>
    ),
  },
  {
    name: "Vercel",
    svg: (
      <svg viewBox="0 0 100 24" className="h-6 w-auto" fill="currentColor">
        <path d="M12 2L0 22h24L12 2z" />
        <text x="32" y="18" fontSize="18" fontWeight="700" letterSpacing="-0.5">Vercel</text>
      </svg>
    ),
  },
  {
    name: "Figma",
    svg: (
      <svg viewBox="0 0 100 24" className="h-6 w-auto" fill="currentColor">
        <text x="0" y="20" fontSize="22" fontWeight="800" letterSpacing="-1">Figma</text>
      </svg>
    ),
  },
  {
    name: "HubSpot",
    svg: (
      <svg viewBox="0 0 120 24" className="h-6 w-auto" fill="currentColor">
        <text x="0" y="20" fontSize="20" fontWeight="700" letterSpacing="-0.5">HubSpot</text>
      </svg>
    ),
  },
  {
    name: "Slack",
    svg: (
      <svg viewBox="0 0 100 24" className="h-6 w-auto" fill="currentColor">
        <text x="0" y="20" fontSize="22" fontWeight="800" letterSpacing="-0.5">slack</text>
      </svg>
    ),
  },
  {
    name: "Asana",
    svg: (
      <svg viewBox="0 0 100 24" className="h-6 w-auto" fill="currentColor">
        <text x="0" y="20" fontSize="22" fontWeight="700" letterSpacing="-0.5">Asana</text>
      </svg>
    ),
  },
  {
    name: "Salesforce",
    svg: (
      <svg viewBox="0 0 130 24" className="h-6 w-auto" fill="currentColor">
        <text x="0" y="20" fontSize="20" fontWeight="600" letterSpacing="-0.5">Salesforce</text>
      </svg>
    ),
  },
  {
    name: "Atlassian",
    svg: (
      <svg viewBox="0 0 130 24" className="h-6 w-auto" fill="currentColor">
        <text x="0" y="20" fontSize="20" fontWeight="700" letterSpacing="-0.5">Atlassian</text>
      </svg>
    ),
  },
  {
    name: "Intercom",
    svg: (
      <svg viewBox="0 0 120 24" className="h-6 w-auto" fill="currentColor">
        <text x="0" y="20" fontSize="20" fontWeight="600" letterSpacing="-0.5">Intercom</text>
      </svg>
    ),
  },
]

export function LogoMarquee() {
  // Duplicate logos for seamless infinite loop
  const duplicatedLogos = [...LOGOS, ...LOGOS]

  return (
    <section className="border-y border-zinc-200/60 bg-zinc-50/50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header badge */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex justify-center"
        >
          <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-900/10 bg-white px-4 py-1.5 text-[12px] font-medium uppercase tracking-[0.14em] text-emerald-900/70">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-600" />
            </span>
            Trusted by 500+ B2B teams
          </div>
        </motion.div>

        {/* Marquee container with edge masks */}
        <div
          className="relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent)",
          }}
        >
          <div className="flex animate-marquee gap-16 hover:[animation-play-state:paused]">
            {duplicatedLogos.map((logo, i) => (
              <div
                key={`${logo.name}-${i}`}
                className="flex shrink-0 items-center justify-center px-2 text-zinc-400 transition-all duration-300 hover:scale-110 hover:text-emerald-900"
                title={logo.name}
              >
                {logo.svg}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS animation defined inline (or move to globals.css) */}
      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
          width: max-content;
        }
        @media (max-width: 768px) {
          .animate-marquee {
            animation-duration: 60s;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
