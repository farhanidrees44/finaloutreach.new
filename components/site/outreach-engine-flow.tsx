"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
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

/**
 * Premium outreach engine — equal cards, left-aligned type, visible flow motion.
 */
export function OutreachEngineFlow() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % STEPS.length)
    }, 2800)
    return () => window.clearInterval(id)
  }, [reduced])

  return (
    <div
      className={cn(
        "fo-engine relative overflow-hidden rounded-[1.75rem] border border-ink-08",
        "bg-[linear-gradient(165deg,oklch(0.99_0.01_290)_0%,oklch(0.985_0.01_250)_45%,oklch(0.99_0.008_200)_100%)]",
        "px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12",
      )}
      role="region"
      aria-label="FinalOutreach outreach workflow: find leads, enrich and verify, cold email, follow-up calls, multi-channel outreach, and book meetings, with analytics and optimization across every step."
    >
      <div aria-hidden className="fo-engine__orb fo-engine__orb--a" />
      <div aria-hidden className="fo-engine__orb fo-engine__orb--b" />

      {/* Header */}
      <header className="relative mx-auto mb-8 max-w-2xl text-center sm:mb-10">
        <h3 className="text-balance text-[clamp(1.5rem,3vw,2.125rem)] font-extrabold leading-[1.15] tracking-tight text-ink">
          The Outreach Engine{" "}
          <span className="fo-engine__title-grad">That Drives Results</span>
        </h3>
        <p className="mx-auto mt-3 max-w-lg text-[14px] font-medium leading-relaxed text-ink-60 sm:text-[15px]">
          All the tools. One seamless flow. More replies, more meetings, more
          revenue.
        </p>

        <div className="mt-5 flex items-center justify-center gap-2" role="tablist" aria-label="Workflow steps">
          {STEPS.map((step, i) => (
            <button
              key={step.title}
              type="button"
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500 ease-out",
                active === i
                  ? "w-7 bg-gradient-to-r from-vibrant-purple to-electric-blue"
                  : "w-1.5 bg-ink/15 hover:bg-ink/30",
              )}
            >
              <span className="sr-only">{step.title}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Desktop / large: 6 equal cards + arrows */}
      <div className="relative hidden lg:block">
        <ol className="flex items-stretch gap-0">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex min-w-0 flex-1 items-stretch">
              <div className="flex min-w-0 flex-1">
                <StepCard
                  step={step}
                  index={i}
                  active={mounted && active === i}
                  onSelect={() => setActive(i)}
                />
              </div>
              {i < STEPS.length - 1 ? (
                <div className="flex shrink-0 items-center px-1.5" aria-hidden>
                  <span
                    className={cn(
                      "fo-engine__arrow grid size-9 place-items-center rounded-full text-white",
                      "bg-gradient-to-br from-vibrant-purple to-electric-blue",
                      mounted && active === i && "fo-engine__arrow--live",
                    )}
                  >
                    <ArrowRight className="size-3.5" strokeWidth={2.75} />
                  </span>
                </div>
              ) : null}
            </li>
          ))}
        </ol>

        {/* Flow lines into analytics */}
        <div className="relative mx-auto mt-1 h-[4.5rem] w-full max-w-5xl" aria-hidden>
          <svg className="h-full w-full" viewBox="0 0 1200 72" preserveAspectRatio="none">
            <defs>
              <linearGradient id="fo-engine-line" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="oklch(0.55 0.24 295)" />
                <stop offset="100%" stopColor="oklch(0.58 0.22 250)" />
              </linearGradient>
            </defs>
            {[100, 300, 500, 700, 900, 1100].map((x, i) => (
              <path
                key={x}
                className={cn(
                  "fo-engine__dash",
                  mounted && active === i && "fo-engine__dash--active",
                )}
                d={`M ${x} 4 C ${x} 34, 600 34, 600 70`}
                fill="none"
                stroke="url(#fo-engine-line)"
                strokeWidth={active === i ? 2.25 : 1.5}
                strokeLinecap="round"
                strokeDasharray="6 8"
                style={{ animationDelay: `${i * 0.12}s` }}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Tablet: 3×2 equal cards */}
      <ol className="hidden grid-cols-3 gap-4 sm:grid lg:hidden">
        {STEPS.map((step, i) => (
          <li key={step.title} className="min-h-0">
            <StepCard
              step={step}
              index={i}
              active={mounted && active === i}
              onSelect={() => setActive(i)}
            />
          </li>
        ))}
      </ol>

      {/* Mobile: one focused card + next peek */}
      <div className="sm:hidden">
        <div className="relative min-h-[17.5rem]">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: active === i ? 1 : 0,
                y: active === i ? 0 : 12,
                scale: active === i ? 1 : 0.97,
                pointerEvents: active === i ? "auto" : "none",
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <StepCard
                step={step}
                index={i}
                active
                onSelect={() => setActive(i)}
                large
              />
            </motion.div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setActive((a) => (a - 1 + STEPS.length) % STEPS.length)}
            className="rounded-full border border-ink-08 bg-background px-4 py-2 text-[12px] font-semibold text-ink-60"
          >
            Prev
          </button>
          <p className="text-[12px] font-medium text-ink-40">
            {active + 1} / {STEPS.length}
          </p>
          <button
            type="button"
            onClick={() => setActive((a) => (a + 1) % STEPS.length)}
            className="rounded-full border border-ink-08 bg-background px-4 py-2 text-[12px] font-semibold text-ink-60"
          >
            Next
          </button>
        </div>
      </div>

      {/* Analytics */}
      <div
        className={cn(
          "fo-engine__analytics relative mx-auto mt-6 flex w-full max-w-xl flex-col items-center gap-4 rounded-2xl border border-ink-08 bg-background px-5 py-5 text-center sm:mt-2 sm:flex-row sm:items-center sm:gap-5 sm:px-6 sm:text-left",
          !reduced && "fo-engine__analytics--pulse",
        )}
      >
        <span className="fo-engine__analytics-icon grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-electric-blue to-vibrant-purple text-white shadow-[0_12px_28px_-10px_oklch(0.55_0.24_295_/_0.55)]">
          <BarChart3 className="size-5" strokeWidth={1.85} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[16px] font-bold tracking-tight text-ink sm:text-[17px]">
            Analytics &amp; Optimization
          </p>
          <p className="mt-1 text-[13px] font-medium leading-snug text-ink-60">
            Track, analyze &amp; optimize every step for maximum performance.
          </p>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-vibrant-purple">
            Syncing · {STEPS[active]?.title}
          </p>
        </div>
      </div>
    </div>
  )
}

function StepCard({
  step,
  index,
  active,
  onSelect,
  large = false,
}: {
  step: Step
  index: number
  active: boolean
  onSelect: () => void
  large?: boolean
}) {
  const { Icon, title, body, detail } = step
  const n = String(index + 1).padStart(2, "0")

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "fo-engine__card group flex h-full w-full flex-col items-start text-left",
        "rounded-2xl border bg-background p-4 transition-all duration-500 xl:p-5",
        large && "p-5",
        active
          ? "fo-engine__card--active border-vibrant-purple/40"
          : "border-ink-08 shadow-[var(--shadow-sm)] hover:-translate-y-1 hover:border-vibrant-purple/25 hover:shadow-[var(--shadow-md)]",
      )}
    >
      {/* Icon — fixed top-left, consistent across all cards */}
      <span
        className={cn(
          "grid size-11 shrink-0 place-items-center rounded-full text-white",
          "bg-gradient-to-br from-vibrant-purple to-electric-blue",
          "shadow-[0_10px_22px_-10px_oklch(0.55_0.24_295_/_0.6)]",
          active && "fo-engine__icon--live",
        )}
        aria-hidden
      >
        <Icon className="size-[1.15rem]" strokeWidth={1.85} />
      </span>

      <p className="mt-3.5 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-ink-40">
        Step {n}
      </p>

      <h4 className="mt-1 w-full text-[15px] font-bold leading-snug tracking-tight text-ink xl:text-[15.5px]">
        {title}
      </h4>

      <p className="mt-2 min-h-[2.6em] w-full flex-1 text-[12.5px] font-medium leading-snug text-ink-60">
        {body}
      </p>

      <p
        className={cn(
          "mt-3 w-full rounded-xl border px-2.5 py-2.5 text-[11px] font-medium leading-snug",
          active
            ? "border-vibrant-purple/25 bg-vibrant-purple/[0.07] text-ink-80"
            : "border-ink-08 bg-[#F6F5F8] text-ink-60",
        )}
      >
        {detail}
      </p>
    </button>
  )
}
