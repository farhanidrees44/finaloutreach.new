"use client"

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion"
import { ArrowRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionEyebrow } from "./section-eyebrow"
import { BookCallLink } from "./book-call-link"
import { CountUp } from "./count-up"

type Package = {
  name: string
  /** Numeric price for count-up; null = Custom */
  priceValue: number | null
  priceLabel?: string
  cadence: string
  blurb: string
  items: string[]
  fit: string
  cta: string
  featured: boolean
}

const PACKAGES: Package[] = [
  {
    name: "Starter engagement",
    priceValue: 3500,
    cadence: "/ month",
    blurb: "For founders ready to test cold outreach.",
    items: [
      "1 campaign",
      "2,000 prospects",
      "Weekly reports",
      "~21-day domain warmup",
      "SPF / DKIM / DMARC setup",
      "Custom sequence + reply playbook",
    ],
    fit: "Pre-seed to Series A",
    cta: "Book intro call",
    featured: false,
  },
  {
    name: "Growth engagement",
    priceValue: 7500,
    cadence: "/ month",
    blurb: "For teams scaling outbound seriously.",
    items: [
      "3 campaigns",
      "8,000 prospects",
      "Dedicated strategist",
      "Friday performance & pipeline review",
      "Weekly A/B on copy & cadence",
      "Live dashboard walkthrough on call",
      "CRM-ready lead handoff",
      "Infrastructure setup included",
    ],
    fit: "Series A to Series B",
    cta: "Book intro call",
    featured: true,
  },
  {
    name: "Enterprise",
    priceValue: null,
    priceLabel: "Custom",
    cadence: "",
    blurb: "For revenue teams treating outbound as a channel.",
    items: [
      "Unlimited campaigns",
      "Full SDR team",
      "Custom integrations",
      "Dedicated operator pod",
      "Quarterly scaling plan",
      "Priority infrastructure & deliverability",
      "Multi-channel (email + LinkedIn)",
    ],
    fit: "Series B+ and established",
    cta: "Book strategy call",
    featured: false,
  },
]

const listVariants = (reduced: boolean): Variants => ({
  hidden: {},
  show: {
    transition: reduced ? { staggerChildren: 0 } : { staggerChildren: 0.12 },
  },
})

const cardVariants = (reduced: boolean): Variants => ({
  hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: reduced ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] },
  },
})

const featureListVariants = (reduced: boolean): Variants => ({
  hidden: {},
  show: {
    transition: reduced
      ? { staggerChildren: 0 }
      : { staggerChildren: 0.035, delayChildren: 0.12 },
  },
})

const featureItemVariants = (reduced: boolean): Variants => ({
  hidden: reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: reduced ? 0 : 0.28, ease: "easeOut" },
  },
})

function PricingCard({
  pkg,
  reduced,
}: {
  pkg: Package
  reduced: boolean
}) {
  const featured = pkg.featured

  return (
    <motion.li
      variants={cardVariants(reduced)}
      whileHover={
        reduced
          ? undefined
          : {
              y: -8,
              transition: { type: "spring", stiffness: 280, damping: 22 },
            }
      }
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border bg-card p-7 sm:p-8",
        featured
          ? cn(
              "z-10 border-primary/45 bg-gradient-to-b from-card via-card to-primary/[0.04]",
              "shadow-[0_0_0_1px_oklch(0.55_0.24_295/0.18),0_28px_64px_-28px_oklch(0.55_0.24_295/0.42)]",
              "xl:scale-[1.04] xl:py-10",
            )
          : "border-ink-08 shadow-md hover:border-primary/30 hover:shadow-xl",
      )}
    >
      {featured && (
        <motion.span
          aria-label="Most popular plan"
          animate={
            reduced
              ? undefined
              : {
                  scale: [1, 1.04, 1],
                  transition: {
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }
          }
          className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 rounded-full bg-primary px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-foreground shadow-md"
        >
          Most popular
        </motion.span>
      )}

      <div className="flex flex-col gap-2">
        <h3 className="text-[22px] font-bold tracking-tight text-ink sm:text-[24px]">
          {pkg.name}
        </h3>
        <p className="text-[14px] leading-relaxed text-ink-60">{pkg.blurb}</p>
      </div>

      <div className="mt-7 flex items-baseline gap-1.5">
        {pkg.priceValue != null ? (
          <span className="text-[44px] font-extrabold leading-none tracking-tight tabular-nums text-ink sm:text-[48px]">
            <CountUp value={pkg.priceValue} prefix="$" duration={800} />
          </span>
        ) : (
          <span className="text-[44px] font-extrabold leading-none tracking-tight text-ink sm:text-[48px]">
            {pkg.priceLabel}
          </span>
        )}
        {pkg.cadence ? (
          <span className="text-[14px] text-ink-40">{pkg.cadence}</span>
        ) : null}
      </div>

      <p className="mt-4 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-ink-40">
        Best for: {pkg.fit}
      </p>

      <div className="my-6 h-px bg-ink-08" />

      <motion.ul
        variants={featureListVariants(reduced)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        className="flex flex-1 flex-col gap-3"
      >
        {pkg.items.map((item) => (
          <motion.li
            key={item}
            variants={featureItemVariants(reduced)}
            className="flex items-start gap-2.5 text-[14px] leading-[1.5] text-ink"
          >
            <span
              className={cn(
                "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                featured
                  ? "bg-primary/12 text-primary"
                  : "bg-electric-blue/10 text-electric-blue",
              )}
            >
              <Check className="size-3" strokeWidth={2.5} aria-hidden />
            </span>
            <span>{item}</span>
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        className="mt-8 shrink-0"
        whileHover={reduced ? undefined : { scale: 1.02 }}
        whileTap={reduced ? undefined : { scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
      >
        <BookCallLink
          source={`homepage-pricing-${pkg.name.toLowerCase().replace(/\s+/g, "-")}`}
          className={cn(
            "group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full text-[14.5px] font-semibold transition-shadow",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            featured
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
              : "bg-ink text-background shadow-md hover:shadow-lg",
          )}
        >
          {pkg.cta}
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </BookCallLink>
      </motion.div>
    </motion.li>
  )
}

export function Pricing() {
  const reduced = !!useReducedMotion()

  return (
    <section id="pricing" className="relative isolate border-t border-ink-08 bg-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 0%, oklch(0.55 0.24 295 / 0.08), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-28 lg:px-12">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionEyebrow number="12" label="Pricing" />
            <h2 className="mt-5 text-balance text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-ink">
              Simple, transparent{" "}
              <span className="font-serif-italic text-electric-blue">
                engagements.
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-[15px] font-bold leading-relaxed text-ink-60">
            Pick a starting point. We&apos;ll customize the rest on the call.
          </p>
        </div>

        <p className="mt-8 max-w-2xl text-[15px] font-bold leading-relaxed text-ink-60">
          Priced for operator-led work, not a junior pod{" "}
          <span className="font-serif-italic text-electric-blue">
            spraying templates.
          </span>
        </p>

        <motion.ul
          variants={listVariants(reduced)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-14 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-5 xl:pt-4"
        >
          {PACKAGES.map((pkg) => (
            <PricingCard key={pkg.name} pkg={pkg} reduced={reduced} />
          ))}
        </motion.ul>

        <p className="mt-10 text-center text-[13px] text-ink-60">
          All engagements include free infrastructure setup —{" "}
          <span className="font-semibold text-ink">$1,500 value</span>.
        </p>
      </div>
    </section>
  )
}
