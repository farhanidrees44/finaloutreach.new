"use client"

import { useEffect, useRef, useState } from "react"
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
  desc: string
  Icon: LucideIcon
}

/** Single description per step — no secondary highlight boxes. */
const STEPS: Step[] = [
  {
    title: "Find Leads",
    desc: "Build highly targeted lists of ideal prospects.",
    Icon: Crosshair,
  },
  {
    title: "Enrich & Verify",
    desc: "Improve data quality and ensure email validity.",
    Icon: Mail,
  },
  {
    title: "Cold Email",
    desc: "Create & send personalized emails that get replies.",
    Icon: Send,
  },
  {
    title: "Follow Up Calls",
    desc: "Connect by phone and turn interest into conversations.",
    Icon: Phone,
  },
  {
    title: "Multi-Channel",
    desc: "Reach prospects on their preferred channels.",
    Icon: MessagesSquare,
  },
  {
    title: "Book Meetings",
    desc: "Book qualified meetings that drive pipeline growth.",
    Icon: CalendarCheck,
  },
]

/**
 * Final outreach-engine diagram — equal short cards, CSS-driven motion,
 * responsive on every breakpoint. Prefer CSS over Framer so animation
 * still runs when Framer viewports / reduced-motion heuristics fail.
 */
export function OutreachEngineFlow() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setInView(true)
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % STEPS.length)
    }, 2600)
    return () => window.clearInterval(id)
  }, [inView])

  return (
    <div
      ref={rootRef}
      className={cn("fo-flow", inView && "fo-flow--on")}
      role="region"
      aria-label="FinalOutreach outreach workflow: find leads, enrich and verify, cold email, follow-up calls, multi-channel outreach, and book meetings, with analytics and optimization across every step."
    >
      <div className="fo-flow__glow fo-flow__glow--tl" aria-hidden />
      <div className="fo-flow__glow fo-flow__glow--br" aria-hidden />

      <header className="fo-flow__head">
        <h3 className="fo-flow__title">
          The Outreach Engine{" "}
          <span className="fo-flow__title-accent">That Drives Results</span>
        </h3>
        <p className="fo-flow__sub">
          All the tools. One seamless flow. More replies, more meetings, more
          revenue.
        </p>
        <div className="fo-flow__dots" role="tablist" aria-label="Steps">
          {STEPS.map((step, i) => (
            <button
              key={step.title}
              type="button"
              role="tab"
              aria-selected={active === i}
              className={cn("fo-flow__dot", active === i && "is-active")}
              onClick={() => setActive(i)}
            >
              <span className="sr-only">{step.title}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Desktop flow */}
      <ol className="fo-flow__desktop">
        {STEPS.map((step, i) => (
          <li key={step.title} className="fo-flow__desk-item">
            <StepCard
              step={step}
              index={i}
              active={active === i}
              onSelect={() => setActive(i)}
              delay={i}
            />
            {i < STEPS.length - 1 ? (
              <span
                className={cn(
                  "fo-flow__arrow",
                  active === i && "is-live",
                )}
                aria-hidden
              >
                <ArrowRight className="size-3.5" strokeWidth={2.75} />
              </span>
            ) : null}
          </li>
        ))}
      </ol>

      <div className="fo-flow__wires" aria-hidden>
        <svg viewBox="0 0 1200 64" preserveAspectRatio="none">
          <defs>
            <linearGradient id="fo-flow-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
          {[100, 300, 500, 700, 900, 1100].map((x, i) => (
            <path
              key={x}
              className={cn("fo-flow__wire", active === i && "is-active")}
              d={`M ${x} 2 C ${x} 30, 600 30, 600 62`}
              fill="none"
              stroke="url(#fo-flow-stroke)"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeDasharray="5 7"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </svg>
      </div>

      {/* Tablet grid */}
      <ol className="fo-flow__tablet">
        {STEPS.map((step, i) => (
          <li key={step.title}>
            <StepCard
              step={step}
              index={i}
              active={active === i}
              onSelect={() => setActive(i)}
              delay={i}
            />
          </li>
        ))}
      </ol>

      {/* Mobile carousel */}
      <div className="fo-flow__mobile">
        <div className="fo-flow__mobile-track">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className={cn(
                "fo-flow__mobile-slide",
                active === i && "is-active",
              )}
            >
              <StepCard
                step={step}
                index={i}
                active={active === i}
                onSelect={() => setActive(i)}
                delay={0}
              />
            </div>
          ))}
        </div>
        <div className="fo-flow__mobile-nav">
          <button
            type="button"
            className="fo-flow__nav-btn"
            onClick={() =>
              setActive((a) => (a - 1 + STEPS.length) % STEPS.length)
            }
          >
            Prev
          </button>
          <span className="fo-flow__mobile-count">
            {active + 1} / {STEPS.length}
          </span>
          <button
            type="button"
            className="fo-flow__nav-btn"
            onClick={() => setActive((a) => (a + 1) % STEPS.length)}
          >
            Next
          </button>
        </div>
      </div>

      <div className="fo-flow__analytics">
        <span className="fo-flow__analytics-icon" aria-hidden>
          <BarChart3 className="size-5" strokeWidth={1.9} />
        </span>
        <div className="fo-flow__analytics-copy">
          <p className="fo-flow__analytics-title">
            Analytics &amp; Optimization
          </p>
          <p className="fo-flow__analytics-desc">
            Track, analyze &amp; optimize every step for maximum performance.
          </p>
          <p className="fo-flow__analytics-sync">
            Syncing · {STEPS[active]?.title}
          </p>
        </div>
      </div>
    </div>
  )
}

function StepCard({
  step,
  active,
  onSelect,
  delay,
}: {
  step: Step
  index?: number
  active: boolean
  onSelect: () => void
  delay: number
}) {
  const { Icon, title, desc } = step

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn("fo-flow__card", active && "is-active")}
      style={{ ["--fo-delay" as string]: `${delay * 70}ms` }}
      aria-label={title}
    >
      <span className="fo-flow__icon" aria-hidden>
        <Icon className="size-[1.125rem]" strokeWidth={1.9} />
      </span>
      <h4 className="fo-flow__card-title">{title}</h4>
      <p className="fo-flow__card-desc">{desc}</p>
    </button>
  )
}
