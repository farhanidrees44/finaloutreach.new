"use client"

import { Fragment, useEffect, useState } from "react"
import {
  motion,
  useReducedMotion,
  AnimatePresence,
  type Variants,
} from "framer-motion"
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  CalendarCheck,
  Crosshair,
  Mail,
  MessagesSquare,
  Phone,
  Send,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

type Step = {
  title: string
  body: string
  detail: string
  Icon: LucideIcon
}

const STEPS: Step[] = [
  {
    title: "Find Leads",
    body: "Find ideal prospects with precision.",
    detail: "Build highly targeted lists of ideal prospects.",
    Icon: Crosshair,
  },
  {
    title: "Enrich & Verify",
    body: "Enrich data and verify emails for higher deliverability.",
    detail: "Improve data quality and ensure email validity.",
    Icon: Mail,
  },
  {
    title: "Cold Email",
    body: "Send personalized cold emails at scale.",
    detail: "Create & send personalized emails that get replies.",
    Icon: Send,
  },
  {
    title: "Follow Up Calls",
    body: "Call, connect, and close more meetings.",
    detail: "Connect by phone and turn interest into conversations.",
    Icon: Phone,
  },
  {
    title: "Multi-Channel",
    body: "Engage across email, calls, SMS & more.",
    detail: "Reach prospects on their preferred channels.",
    Icon: MessagesSquare,
  },
  {
    title: "Book Meetings",
    body: "More replies. More meetings. More revenue.",
    detail: "Book qualified meetings that drive pipeline growth.",
    Icon: CalendarCheck,
  },
]

const ease = [0.22, 1, 0.36, 1] as const

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
}

function StepCard({
  step,
  index,
  active,
  reduced,
  layout = "desktop",
}: {
  step: Step
  index: number
  active: boolean
  reduced: boolean | null
  layout?: "desktop" | "mobile" | "tablet"
}) {
  const { Icon, title, body, detail } = step
  const n = String(index + 1).padStart(2, "0")

  return (
    <motion.article
      variants={reduced ? undefined : cardVariants}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border bg-background/90 backdrop-blur-sm",
        "transition-[border-color,box-shadow,transform] duration-300",
        active
          ? "border-vibrant-purple/35 shadow-[0_12px_40px_-16px_oklch(0.55_0.24_295_/_0.45)]"
          : "border-ink-08 shadow-[var(--shadow-sm)] hover:border-vibrant-purple/20 hover:shadow-[var(--shadow-md)]",
        layout === "desktop" && "h-full min-w-0 flex-1 p-4 xl:p-5",
        layout === "tablet" && "h-full p-5",
        layout === "mobile" && "w-full p-5",
      )}
    >
      {/* Active shimmer */}
      {!reduced && active ? (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-vibrant-purple to-transparent"
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}

      <div className="flex items-start gap-3">
        <motion.span
          className={cn(
            "relative grid size-11 shrink-0 place-items-center rounded-full text-white",
            "bg-gradient-to-br from-vibrant-purple to-electric-blue",
            "shadow-[0_10px_24px_-10px_oklch(0.55_0.24_295_/_0.65)]",
          )}
          animate={
            reduced || !active
              ? undefined
              : { scale: [1, 1.08, 1], rotate: [0, 4, 0] }
          }
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          {!reduced && active ? (
            <span className="absolute inset-0 animate-ping rounded-full bg-vibrant-purple/30 [animation-duration:2s]" />
          ) : null}
          <Icon className="relative size-5" strokeWidth={1.75} />
        </motion.span>

        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-40">
            Step {n}
          </p>
          <h3 className="mt-0.5 text-[15px] font-bold leading-tight tracking-tight text-ink xl:text-[16px]">
            {title}
          </h3>
        </div>
      </div>

      <p className="mt-3 flex-1 text-[12.5px] font-medium leading-snug text-ink-60 xl:text-[13px]">
        {body}
      </p>
      <p
        className={cn(
          "mt-3 rounded-xl border px-2.5 py-2 text-[11px] leading-snug xl:text-[11.5px]",
          active
            ? "border-vibrant-purple/20 bg-vibrant-purple/[0.06] text-ink-80"
            : "border-ink-08 bg-cream/80 text-ink-60",
        )}
      >
        {detail}
      </p>
    </motion.article>
  )
}

function FlowArrow({
  active,
  reduced,
  vertical = false,
}: {
  active: boolean
  reduced: boolean | null
  vertical?: boolean
}) {
  const Icon = vertical ? ArrowDown : ArrowRight
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center",
        vertical ? "py-1" : "px-0.5 self-center",
      )}
      aria-hidden
    >
      <motion.span
        className={cn(
          "grid size-8 place-items-center rounded-full text-white",
          "bg-gradient-to-br from-vibrant-purple to-electric-blue",
          active && "shadow-[0_0_20px_-2px_oklch(0.55_0.24_295_/_0.7)]",
        )}
        animate={
          reduced
            ? undefined
            : vertical
              ? { y: [0, 5, 0], scale: active ? [1, 1.12, 1] : [1, 1.05, 1] }
              : { x: [0, 5, 0], scale: active ? [1, 1.12, 1] : [1, 1.05, 1] }
        }
        transition={{
          duration: active ? 1.1 : 1.7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Icon className="size-3.5" strokeWidth={2.5} />
      </motion.span>
    </div>
  )
}

function FlowingDash({
  d,
  delay,
  reduced,
  active,
}: {
  d: string
  delay: number
  reduced: boolean | null
  active: boolean
}) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="url(#outreach-flow-stroke)"
      strokeWidth={active ? 2.25 : 1.5}
      strokeLinecap="round"
      strokeDasharray="5 7"
      strokeOpacity={active ? 0.95 : 0.45}
      animate={
        reduced
          ? undefined
          : { strokeDashoffset: [0, -42] }
      }
      transition={{
        duration: active ? 0.9 : 1.6,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  )
}

/**
 * Modern animated outreach engine — cycling active step, flowing connectors,
 * vertical mobile timeline, tablet grid, desktop flow row.
 */
export function OutreachEngineFlow() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % STEPS.length)
    }, 2400)
    return () => window.clearInterval(id)
  }, [reduced])

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.75rem] border border-ink-08",
        "bg-gradient-to-br from-background via-vibrant-purple/[0.04] to-electric-blue/[0.06]",
        "px-4 py-7 sm:px-6 sm:py-9 md:px-8 md:py-11",
      )}
      role="region"
      aria-label="FinalOutreach outreach workflow: find leads, enrich and verify, cold email, follow-up calls, multi-channel outreach, and book meetings, with analytics and optimization across every step."
    >
      {/* Ambient orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 top-8 size-48 rounded-full bg-vibrant-purple/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 bottom-20 size-56 rounded-full bg-electric-blue/15 blur-3xl"
      />

      <div className="relative mb-7 text-center sm:mb-9">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[clamp(1.4rem,2.8vw,2rem)] font-extrabold leading-[1.15] tracking-tight text-ink"
        >
          The Outreach Engine{" "}
          <span className="bg-gradient-to-r from-vibrant-purple via-electric-blue to-vibrant-purple bg-[length:200%_auto] bg-clip-text text-transparent animate-[gradient-flow_6s_linear_infinite]">
            That Drives Results
          </span>
        </motion.p>
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mx-auto mt-2.5 max-w-xl text-[13px] font-medium leading-relaxed text-ink-60 sm:text-[14.5px]"
        >
          All the tools. One seamless flow. More replies, more meetings, more
          revenue.
        </motion.p>

        {/* Progress dots */}
        <div
          className="mt-5 flex items-center justify-center gap-1.5"
          aria-hidden
        >
          {STEPS.map((step, i) => (
            <button
              key={step.title}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === active
                  ? "w-6 bg-gradient-to-r from-vibrant-purple to-electric-blue"
                  : "w-1.5 bg-ink-08 hover:bg-ink-20",
              )}
              aria-label={`Show step ${i + 1}: ${step.title}`}
            />
          ))}
        </div>
      </div>

      {/* Mobile: vertical timeline */}
      <motion.div
        variants={reduced ? undefined : containerVariants}
        initial={reduced ? false : "hidden"}
        whileInView={reduced ? undefined : "show"}
        viewport={{ once: true, margin: "-6%" }}
        className="relative flex flex-col sm:hidden"
      >
        {STEPS.map((step, i) => (
          <Fragment key={step.title}>
            <StepCard
              step={step}
              index={i}
              active={active === i}
              reduced={reduced}
              layout="mobile"
            />
            {i < STEPS.length - 1 ? (
              <FlowArrow
                active={active === i}
                reduced={reduced}
                vertical
              />
            ) : null}
          </Fragment>
        ))}
      </motion.div>

      {/* Tablet: 2×3 grid */}
      <motion.div
        variants={reduced ? undefined : containerVariants}
        initial={reduced ? false : "hidden"}
        whileInView={reduced ? undefined : "show"}
        viewport={{ once: true, margin: "-6%" }}
        className="hidden grid-cols-2 gap-4 sm:grid lg:hidden"
      >
        {STEPS.map((step, i) => (
          <StepCard
            key={step.title}
            step={step}
            index={i}
            active={active === i}
            reduced={reduced}
            layout="tablet"
          />
        ))}
      </motion.div>

      {/* Desktop: horizontal flow */}
      <motion.div
        variants={reduced ? undefined : containerVariants}
        initial={reduced ? false : "hidden"}
        whileInView={reduced ? undefined : "show"}
        viewport={{ once: true, margin: "-6%" }}
        className="hidden lg:flex lg:items-stretch lg:gap-1"
      >
        {STEPS.map((step, i) => (
          <Fragment key={step.title}>
            <StepCard
              step={step}
              index={i}
              active={active === i}
              reduced={reduced}
              layout="desktop"
            />
            {i < STEPS.length - 1 ? (
              <FlowArrow active={active === i} reduced={reduced} />
            ) : null}
          </Fragment>
        ))}
      </motion.div>

      {/* Analytics feedback */}
      <div className="relative mt-8 lg:mt-5">
        <div
          className="relative mx-auto hidden h-16 max-w-5xl lg:block"
          aria-hidden
        >
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1200 64"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="outreach-flow-stroke"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="oklch(0.55 0.24 295)" />
                <stop offset="50%" stopColor="oklch(0.58 0.22 250)" />
                <stop offset="100%" stopColor="oklch(0.55 0.24 295)" />
              </linearGradient>
            </defs>
            {[100, 300, 500, 700, 900, 1100].map((x, i) => (
              <FlowingDash
                key={x}
                d={`M ${x} 2 C ${x} 28, 600 28, 600 62`}
                delay={i * 0.1}
                reduced={reduced}
                active={active === i}
              />
            ))}
          </svg>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: reduced ? 0 : 0.25, ease }}
          className={cn(
            "relative mx-auto flex max-w-xl flex-col items-center gap-3.5 overflow-hidden rounded-2xl border border-ink-08 bg-background/95 px-5 py-5 text-center shadow-[var(--shadow-md)] backdrop-blur-sm sm:flex-row sm:gap-4 sm:px-6 sm:py-5 sm:text-left",
            !reduced && "animate-[fo-engine-pulse_2.8s_ease-in-out_infinite]",
          )}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={active}
              initial={reduced ? false : { opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-electric-blue to-vibrant-purple text-white shadow-[0_10px_28px_-10px_oklch(0.58_0.22_250_/_0.65)]"
            >
              <BarChart3 className="size-5" strokeWidth={1.75} aria-hidden />
            </motion.span>
          </AnimatePresence>
          <div className="min-w-0">
            <h3 className="text-[16px] font-bold tracking-tight text-ink sm:text-[17px]">
              Analytics &amp; Optimization
            </h3>
            <p className="mt-1 text-[13px] font-medium leading-snug text-ink-60">
              Track, analyze &amp; optimize every step for maximum performance.
            </p>
            <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.14em] text-vibrant-purple/80">
              Syncing · {STEPS[active]?.title}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
