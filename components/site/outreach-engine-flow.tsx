"use client"

import { Fragment } from "react"
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion"
import {
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

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

function StepCard({
  step,
  index,
  reduced,
}: {
  step: Step
  index: number
  reduced: boolean | null
}) {
  const { Icon, title, body, detail } = step

  return (
    <motion.article
      variants={reduced ? undefined : cardVariants}
      className={cn(
        "group relative flex h-full w-[min(100%,12rem)] shrink-0 flex-col rounded-2xl border border-ink-08 bg-background p-4 shadow-[var(--shadow-sm)]",
        "transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]",
        "sm:w-[13rem] lg:w-auto lg:min-w-0 lg:flex-1",
      )}
    >
      <span
        className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-vibrant-purple to-electric-blue text-white shadow-[0_8px_20px_-10px_oklch(0.55_0.24_295_/_0.55)]"
        aria-hidden
      >
        <Icon className="size-5" strokeWidth={1.75} />
      </span>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-40">
        Step {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="mt-1 text-[15px] font-bold leading-tight tracking-tight text-ink">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-[12.5px] font-medium leading-snug text-ink-60">
        {body}
      </p>
      <p className="mt-3 rounded-xl border border-ink-08 bg-cream/70 px-2.5 py-2 text-[11px] leading-snug text-ink-60">
        {detail}
      </p>
    </motion.article>
  )
}

function FlowArrow({ reduced }: { reduced: boolean | null }) {
  return (
    <div
      className="hidden shrink-0 items-center self-center px-0.5 lg:flex"
      aria-hidden
    >
      <motion.span
        className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-vibrant-purple to-electric-blue text-white"
        animate={
          reduced
            ? undefined
            : {
                x: [0, 5, 0],
                scale: [1, 1.06, 1],
              }
        }
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ArrowRight className="size-3.5" strokeWidth={2.5} />
      </motion.span>
    </div>
  )
}

function FlowingDash({
  d,
  delay,
  reduced,
}: {
  d: string
  delay: number
  reduced: boolean | null
}) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="url(#outreach-flow-stroke)"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeDasharray="6 8"
      strokeOpacity="0.65"
      animate={
        reduced
          ? undefined
          : {
              strokeDashoffset: [0, -28],
            }
      }
      transition={{
        duration: 1.4,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  )
}

/**
 * Live Framer Motion recreation of the outreach engine diagram —
 * crisp cards, pulsing arrows, and dashed lines that flow into analytics.
 */
export function OutreachEngineFlow() {
  const reduced = useReducedMotion()

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-ink-08",
        "bg-gradient-to-b from-vibrant-purple/[0.06] via-background to-electric-blue/[0.05]",
        "px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10",
      )}
      role="img"
      aria-label="FinalOutreach outreach workflow: find leads, enrich and verify, cold email, follow-up calls, multi-channel outreach, and book meetings, with analytics and optimization across every step."
    >
      <div className="mb-6 text-center sm:mb-8">
        <p className="text-[clamp(1.35rem,2.5vw,1.85rem)] font-extrabold leading-tight tracking-tight text-ink">
          The Outreach Engine{" "}
          <span className="bg-gradient-to-r from-vibrant-purple to-electric-blue bg-clip-text text-transparent">
            That Drives Results
          </span>
        </p>
        <p className="mx-auto mt-2 max-w-xl text-[13px] font-medium leading-relaxed text-ink-60 sm:text-[14px]">
          All the tools. One seamless flow. More replies, more meetings, more
          revenue.
        </p>
      </div>

      {/* Mobile / tablet: horizontal snap rail */}
      <motion.div
        variants={reduced ? undefined : containerVariants}
        initial={reduced ? false : "hidden"}
        whileInView={reduced ? undefined : "show"}
        viewport={{ once: true, margin: "-8%" }}
        className="flex gap-3 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory lg:hidden [&::-webkit-scrollbar]:hidden"
      >
        {STEPS.map((step, i) => (
          <div key={step.title} className="snap-center">
            <StepCard step={step} index={i} reduced={reduced} />
          </div>
        ))}
      </motion.div>

      {/* Desktop: full flow row */}
      <motion.div
        variants={reduced ? undefined : containerVariants}
        initial={reduced ? false : "hidden"}
        whileInView={reduced ? undefined : "show"}
        viewport={{ once: true, margin: "-8%" }}
        className="hidden lg:flex lg:items-stretch lg:gap-1.5"
      >
        {STEPS.map((step, i) => (
          <Fragment key={step.title}>
            <StepCard step={step} index={i} reduced={reduced} />
            {i < STEPS.length - 1 ? <FlowArrow reduced={reduced} /> : null}
          </Fragment>
        ))}
      </motion.div>

      {/* Analytics feedback loop */}
      <div className="relative mt-6 lg:mt-4">
        <div className="relative mx-auto hidden h-14 max-w-5xl lg:block" aria-hidden>
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1200 56"
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
                <stop offset="100%" stopColor="oklch(0.58 0.22 250)" />
              </linearGradient>
            </defs>
            {[100, 300, 500, 700, 900, 1100].map((x, i) => (
              <FlowingDash
                key={x}
                d={`M ${x} 0 C ${x} 24, 600 24, 600 56`}
                delay={i * 0.12}
                reduced={reduced}
              />
            ))}
          </svg>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: reduced ? 0 : 0.3 }}
          className={cn(
            "relative mx-auto flex max-w-xl flex-col items-center gap-3 rounded-2xl border border-ink-08 bg-background px-5 py-5 text-center shadow-[var(--shadow-md)] sm:flex-row sm:gap-4 sm:px-6 sm:text-left",
            !reduced && "animate-[fo-engine-pulse_2.8s_ease-in-out_infinite]",
          )}
        >
          <motion.span
            className="grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-electric-blue to-vibrant-purple text-white shadow-[0_8px_20px_-10px_oklch(0.58_0.22_250_/_0.55)]"
            animate={
              reduced
                ? undefined
                : { scale: [1, 1.05, 1] }
            }
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <BarChart3 className="size-5" strokeWidth={1.75} aria-hidden />
          </motion.span>
          <div>
            <h3 className="text-[16px] font-bold tracking-tight text-ink">
              Analytics &amp; Optimization
            </h3>
            <p className="mt-1 text-[13px] font-medium leading-snug text-ink-60">
              Track, analyze &amp; optimize every step for maximum performance.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
