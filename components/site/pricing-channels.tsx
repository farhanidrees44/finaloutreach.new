"use client"

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion"
import { ArrowRight, Check, Linkedin, Mail, Phone } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { CountUp } from "@/components/site/count-up"
import { BookCallLink } from "@/components/site/book-call-link"
import { SectionEyebrow } from "@/components/site/section-eyebrow"
import {
  PRICING_CHANNELS,
  type PricingPlan,
} from "@/data/pricing-channels"

const CHANNEL_ICONS: Record<string, LucideIcon> = {
  "LinkedIn Outreach": Linkedin,
  "Cold Email Outreach": Mail,
  "Cold Call Outreach": Phone,
}

const cardListVariants = (reduced: boolean): Variants => ({
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

const featureListVariants = (reduced: boolean, delayChildren: number): Variants => ({
  hidden: {},
  show: {
    transition: reduced
      ? { staggerChildren: 0 }
      : { staggerChildren: 0.028, delayChildren },
  },
})

const featureItemVariants = (reduced: boolean): Variants => ({
  hidden: reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: reduced ? 0 : 0.22, ease: "easeOut" },
  },
})

function ChannelCard({
  plan,
  index,
  reduced,
  sourcePrefix,
}: {
  plan: PricingPlan
  index: number
  reduced: boolean
  sourcePrefix: string
}) {
  const popular = !!plan.isPopular
  const Icon = CHANNEL_ICONS[plan.name] ?? Mail

  return (
    <motion.article
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
        "relative flex h-full min-w-0 flex-col rounded-2xl border bg-card p-6 sm:p-8",
        popular
          ? cn(
              "z-10 border-primary/50 bg-gradient-to-b from-card via-card to-primary/[0.045]",
              "shadow-[0_0_0_1px_oklch(0.55_0.24_295/0.2),0_28px_64px_-28px_oklch(0.55_0.24_295/0.45)]",
              "xl:scale-[1.04] xl:py-10",
            )
          : "border-ink-08 shadow-md hover:border-primary/30 hover:shadow-xl",
      )}
    >
      {popular && (
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
          Most Popular
        </motion.span>
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-2">
          <h3 className="text-[22px] font-bold tracking-tight text-ink sm:text-[24px]">
            {plan.name}
          </h3>
          <p className="text-[14px] leading-relaxed text-ink-60">{plan.subtitle}</p>
        </div>
        <span
          className={cn(
            "grid size-11 shrink-0 place-items-center rounded-xl",
            popular
              ? "bg-primary/12 text-primary"
              : "bg-electric-blue/10 text-electric-blue",
          )}
          aria-hidden
        >
          <Icon className="size-5" strokeWidth={1.75} />
        </span>
      </div>

      <div className="mt-7 flex items-baseline gap-1.5">
        <span className="text-[44px] font-extrabold leading-none tracking-tight tabular-nums text-ink sm:text-[48px]">
          <CountUp value={plan.price} prefix="$" duration={800} />
        </span>
        <span className="text-[14px] text-ink-40">/mo</span>
      </div>

      <span className="mt-4 inline-flex w-fit rounded-full border border-ink-08 bg-cream px-3 py-1 text-[12px] font-medium text-ink-60">
        {plan.volumeLine}
      </span>

      <div className="my-6 h-px bg-ink-08" />

      <motion.ul
        variants={featureListVariants(reduced, index * 0.06)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        className="flex max-h-[min(52vh,420px)] min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto overscroll-contain pr-1 [scrollbar-width:thin]"
      >
        {plan.features.map((feature) => (
          <motion.li
            key={feature}
            variants={featureItemVariants(reduced)}
            className="flex items-start gap-2.5 text-[13.5px] leading-[1.5] text-ink"
          >
            <span
              className={cn(
                "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                popular
                  ? "bg-primary/12 text-primary"
                  : "bg-electric-blue/10 text-electric-blue",
              )}
            >
              <Check className="size-3" strokeWidth={2.5} aria-hidden />
            </span>
            <span>{feature}</span>
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
          source={`${sourcePrefix}-${plan.name.toLowerCase().replace(/\s+/g, "-")}`}
          className={cn(
            "group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full text-[14.5px] font-semibold transition-shadow",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            popular
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
              : "bg-ink text-background shadow-md hover:shadow-lg",
          )}
        >
          Book a strategy call
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </BookCallLink>
      </motion.div>
    </motion.article>
  )
}

function ChannelGrid({
  sourcePrefix,
  className,
}: {
  sourcePrefix: string
  className?: string
}) {
  const reduced = !!useReducedMotion()

  return (
    <motion.div
      variants={cardListVariants(reduced)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        "grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-5 xl:pt-4",
        className,
      )}
    >
      {PRICING_CHANNELS.map((plan, index) => (
        <ChannelCard
          key={plan.name}
          plan={plan}
          index={index}
          reduced={reduced}
          sourcePrefix={sourcePrefix}
        />
      ))}
    </motion.div>
  )
}

/** Homepage marketing pricing — same plans as /pricing */
export function Pricing() {
  return (
    <section id="pricing" className="relative isolate border-t border-ink-08 bg-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 50% 0%, oklch(0.55 0.24 295 / 0.09), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-28 lg:px-12">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionEyebrow number="12" label="Pricing" />
            <h2 className="mt-5 text-balance text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-ink">
              Outbound by channel.{" "}
              <span className="font-serif-italic text-electric-blue">
                Clear monthly pricing.
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-[15px] font-bold leading-relaxed text-ink-60">
            LinkedIn, cold email, or cold calling — pick the channel that fills your calendar.
          </p>
        </div>

        <p className="mt-8 max-w-2xl text-[15px] font-bold leading-relaxed text-ink-60">
          Same packages as our{" "}
          <Link href="/pricing" className="text-electric-blue underline-offset-4 hover:underline">
            pricing page
          </Link>
          . Operator-led work, not a junior pod spraying templates.
        </p>

        <ChannelGrid sourcePrefix="homepage-pricing" className="mt-14" />

        <p className="mt-10 text-center text-[13px] text-ink-60">
          Month-to-month after 90 days.{" "}
          <Link
            href="/pricing"
            className="font-semibold text-ink underline-offset-4 hover:underline"
          >
            Full details & FAQ →
          </Link>
        </p>
      </div>
    </section>
  )
}

/** Dedicated /pricing page cards — identical plans & styling */
export function PricingChannels() {
  return (
    <section
      className="relative isolate border-t border-ink-08 bg-background"
      aria-labelledby="pricing-channels-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 50% 35% at 50% 0%, oklch(0.55 0.24 295 / 0.07), transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24 lg:px-12">
        <h2 id="pricing-channels-heading" className="sr-only">
          Outbound pricing by channel
        </h2>
        <ChannelGrid sourcePrefix="pricing-page" />
      </div>
    </section>
  )
}
