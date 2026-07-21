"use client"

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { CountUp } from "@/components/site/count-up"
import { BookCallLink } from "@/components/site/book-call-link"
import {
  PRICING_CHANNELS,
  type PricingPlan,
} from "@/data/pricing-channels"

const cardListVariants = (reduced: boolean): Variants => ({
  hidden: {},
  show: {
    transition: reduced
      ? { staggerChildren: 0 }
      : { staggerChildren: 0.12 },
  },
})

const cardVariants = (reduced: boolean): Variants => ({
  hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
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
      : { staggerChildren: 0.03, delayChildren },
  },
})

const featureItemVariants = (reduced: boolean): Variants => ({
  hidden: reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: reduced ? 0 : 0.25, ease: "easeOut" },
  },
})

function ChannelCard({
  plan,
  index,
  reduced,
}: {
  plan: PricingPlan
  index: number
  reduced: boolean | null
}) {
  const prefersReduced = !!reduced
  const popular = !!plan.isPopular

  return (
    <motion.article
      variants={cardVariants(prefersReduced)}
      whileHover={
        prefersReduced
          ? undefined
          : {
              y: -6,
              transition: { type: "spring", stiffness: 260, damping: 20 },
            }
      }
      className={cn(
        "relative flex h-full min-w-0 flex-col rounded-2xl border bg-card p-6 sm:p-8",
        "snap-center md:min-w-[min(100%,340px)] md:max-w-[380px] md:shrink-0 xl:min-w-0 xl:max-w-none",
        popular
          ? cn(
              "z-10 border-primary/50 shadow-[0_0_0_1px_oklch(0.55_0.24_295/0.2),0_24px_60px_-28px_oklch(0.55_0.24_295/0.45)]",
              "xl:scale-105 xl:py-10",
            )
          : "border-ink-08 shadow-md hover:border-primary/35 hover:shadow-xl",
      )}
    >
      {popular && (
        <motion.span
          aria-label="Most popular plan"
          animate={
            prefersReduced
              ? undefined
              : {
                  scale: [1, 1.04, 1],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }
          }
          className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-foreground shadow-md"
        >
          Most Popular
        </motion.span>
      )}

      <div className="flex flex-col gap-2">
        <h3 className="text-[22px] font-bold tracking-tight text-ink sm:text-[24px]">
          {plan.name}
        </h3>
        <p className="text-[14px] leading-relaxed text-ink-60">{plan.subtitle}</p>
      </div>

      <div className="mt-6 flex items-baseline gap-1.5">
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
        variants={featureListVariants(prefersReduced, index * 0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto overscroll-contain pr-1"
      >
        {plan.features.map((feature) => (
          <motion.li
            key={feature}
            variants={featureItemVariants(prefersReduced)}
            className="flex items-start gap-2.5 text-[13.5px] leading-[1.5] text-ink"
          >
            <Check
              className={cn(
                "mt-0.5 size-4 shrink-0",
                popular ? "text-primary" : "text-electric-blue",
              )}
              aria-hidden
              strokeWidth={2.25}
            />
            <span>{feature}</span>
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        className="mt-8 shrink-0"
        whileHover={prefersReduced ? undefined : { scale: 1.02 }}
        whileTap={prefersReduced ? undefined : { scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
      >
        <BookCallLink
          source={`pricing-channels-${plan.name.toLowerCase().replace(/\s+/g, "-")}`}
          className={cn(
            "group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full text-[14.5px] font-semibold transition-shadow",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            popular
              ? "bg-primary text-primary-foreground shadow-lg hover:shadow-xl"
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

export function PricingChannels() {
  const reduced = useReducedMotion()

  return (
    <section className="border-t border-ink-08 bg-background" aria-labelledby="pricing-channels-heading">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24 lg:px-12">
        <h2 id="pricing-channels-heading" className="sr-only">
          Outbound pricing by channel
        </h2>

        <motion.div
          variants={cardListVariants(!!reduced)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className={cn(
            "flex flex-col gap-6",
            "md:flex-row md:items-stretch md:gap-5 md:overflow-x-auto md:pb-2 md:snap-x md:snap-mandatory",
            "xl:grid xl:grid-cols-3 xl:items-stretch xl:gap-6 xl:overflow-visible xl:pb-0 xl:pt-4",
            "[scrollbar-width:thin]",
          )}
        >
          {PRICING_CHANNELS.map((plan, index) => (
            <ChannelCard
              key={plan.name}
              plan={plan}
              index={index}
              reduced={reduced}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
