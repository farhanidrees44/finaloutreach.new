"use client"

import Image from "next/image"
import { useReducedMotion, motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  Check,
  Compass,
  PenLine,
  Rocket,
  Server,
  TrendingUp,
} from "lucide-react"
import { SectionEyebrow } from "./section-eyebrow"
import { cn } from "@/lib/utils"
import { useCallback, useEffect, useRef, useState } from "react"

const STEPS = [
  {
    n: "01",
    title: "Discovery & ICP definition",
    when: "Week 1",
    desc: "We map your offer, decode your buyer, and lock the exact accounts worth chasing. No spray-and-pray. Every prospect is a deliberate match for what you sell.",
    outcomes: [
      "Sharpened ICP & messaging angles",
      "Named-account target list",
      "Win-criteria & disqualification rules",
    ],
    Icon: Compass,
    visual: "discovery" as const,
    image: "/process/step-1-discovery.png",
    imageAlt: "Discovery and ICP definition workflow — market research, competitor analysis, customer data, and opportunity identification.",
  },
  {
    n: "02",
    title: "Infrastructure & list building",
    when: "Week 2",
    desc: "DNS locked, lists verified, and domains warmed for ~21 days before we ramp volume — so placement holds when sequences go live. We never send from your primary domain.",
    outcomes: [
      "Dedicated sending domains, fully warmed",
      "SPF, DKIM, DMARC & BIMI configured",
      "Triple-verified prospect list (≤2% bounce)",
    ],
    Icon: Server,
    visual: "infra" as const,
    image: "/process/step-2-infrastructure.png",
    imageAlt: "Infra setup — accounts, workspace, tables, automations, channels, research, strategy, and GTM agents.",
  },
  {
    n: "03",
    title: "Copy & sequence creation",
    when: "Week 3",
    desc: "Sequences engineered around your ICP's pain — not templates, not AI sludge. Real research, real angles, real reasons your prospect will reply.",
    outcomes: [
      "Custom multi-step sequence per persona",
      "A/B/C subject-line + opener variants",
      "Reply playbook for the SDR team",
    ],
    Icon: PenLine,
    visual: "copy" as const,
    image: "/process/step-3-copy.png",
    imageAlt: "Early campaign signals analysis — outbound performance and A/B test results.",
  },
  {
    n: "04",
    title: "Launch & optimize",
    when: "Week 4",
    desc: "Campaigns go live. We A/B test subject lines, openers, and angles weekly. You see leading indicators by day 5 and meetings by week 2.",
    outcomes: [
      "Live campaigns across all inboxes",
      "Weekly experiments on copy & cadence",
      "First booked meetings inside 14 days",
    ],
    Icon: Rocket,
    visual: "launch" as const,
    image: "/process/step-4-launch.png",
    imageAlt: "Month 2 scale and optimize — launch new campaigns, angles, and offers from campaign data.",
  },
  {
    n: "05",
    title: "Scale & report",
    when: "Ongoing",
    desc: "What works gets doubled. What doesn't gets cut. You see the dashboard every Friday, and the meetings every day.",
    outcomes: [
      "Friday performance & pipeline review",
      "Quarterly scaling plan tied to revenue",
      "Always-on optimisation by your pod",
    ],
    Icon: TrendingUp,
    visual: "scale" as const,
    image: "/process/step-5-scale.png",
    imageAlt: "AI-powered optimization loop — target analysis, smart insights, scale campaigns, continuous testing, and intent signals.",
  },
] as const

type Step = (typeof STEPS)[number]

export function Process() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const stepRefs = useRef<(HTMLLIElement | null)[]>([])
  const lockRef = useRef(false)

  const selectStep = useCallback((i: number, lockMs = 0) => {
    setActive(i)
    if (lockMs > 0) {
      lockRef.current = true
      window.setTimeout(() => {
        lockRef.current = false
      }, lockMs)
    }
  }, [])

  // Scroll-spy: keep sticky preview + highlight in sync while scrolling,
  // including fast scroll and #process hash jumps.
  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean) as HTMLLIElement[]
    if (nodes.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (lockRef.current) return
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        const top = visible[0]
        if (!top?.target) return
        const idx = nodes.indexOf(top.target as HTMLLIElement)
        if (idx >= 0) setActive(idx)
      },
      {
        root: null,
        // Bias toward the upper mid-viewport where the sticky panel sits
        rootMargin: "-25% 0px -45% 0px",
        threshold: [0.15, 0.35, 0.55, 0.75],
      },
    )

    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const syncFromHash = () => {
      if (window.location.hash !== "#process") return
      // Land on first step when jumping via anchor; content already visible
      setActive(0)
    }
    syncFromHash()
    window.addEventListener("hashchange", syncFromHash)
    return () => window.removeEventListener("hashchange", syncFromHash)
  }, [])

  return (
    <section id="process" className="relative border-t border-ink-08 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-28 md:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow label="Process" className="justify-center" />
          <h2 className="mt-6 text-balance text-[clamp(2.1rem,4.2vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-ink">
            How we book meetings,{" "}
            <span className="font-serif-italic text-electric-blue">step by step.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] font-bold leading-[1.6] text-ink sm:text-[17px]">
            From kickoff to calendar — domains warm ~21 days before volume so
            inbox placement holds. No agency theatre, no endless decks.
          </p>
        </div>

        {/* Desktop: sticky preview + step list (all bodies always visible) */}
        <div className="mt-12 hidden gap-10 lg:grid lg:grid-cols-[1.15fr_0.9fr] xl:gap-12">
          <div className="relative">
            <div className="sticky top-24">
              <div className="relative min-h-[420px] overflow-hidden rounded-[1.75rem] border border-ink-08 bg-[#0a0a0c] shadow-[0_28px_70px_-40px_rgba(15,15,15,0.35)]">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={STEPS[active].n}
                    initial={reduced ? false : { opacity: 0.35, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0.35, y: -6 }}
                    transition={{ duration: 0.28 }}
                    className="absolute inset-0"
                  >
                    <StepPanel step={STEPS[active]} />
                  </motion.div>
                </AnimatePresence>
              </div>
              <p className="mt-4 text-center text-[12px] uppercase tracking-[0.16em] text-ink-40">
                {STEPS[active].when}
              </p>
            </div>
          </div>

          <ol className="flex flex-col gap-3">
            {STEPS.map((step, i) => {
              const open = active === i
              return (
                <li
                  key={step.n}
                  ref={(el) => {
                    stepRefs.current[i] = el
                  }}
                  data-step={step.n}
                >
                  <button
                    type="button"
                    onClick={() => selectStep(i, 600)}
                    onMouseEnter={() => selectStep(i, 400)}
                    onFocus={() => selectStep(i, 400)}
                    className={cn(
                      "w-full rounded-2xl border px-5 py-5 text-left transition-all duration-300",
                      open
                        ? "border-ink/30 bg-background shadow-sm"
                        : "border-ink-08 bg-transparent hover:border-ink/20 hover:bg-background/60",
                    )}
                  >
                    <div className="flex justify-center">
                      <span
                        className={[
                          "inline-flex items-center justify-center rounded-full bg-white px-3.5 py-1",
                          "text-[10px] font-semibold uppercase tracking-[0.16em] text-electric-blue",
                          "shadow-[0_4px_14px_-4px_oklch(0.58_0.22_250_/_0.25)]",
                          "ring-1 ring-ink-08/60",
                        ].join(" ")}
                      >
                        {step.when}
                      </span>
                    </div>
                    <h3 className="mt-3 flex items-center justify-center gap-2 text-center text-[20px] font-extrabold tracking-tight text-ink">
                      <step.Icon className="size-4 shrink-0 text-electric-blue" />
                      {step.title}
                    </h3>
                    {/* Always mounted — never gated behind opacity:0 / unmount */}
                    <div
                      className={cn(
                        "overflow-hidden transition-[max-height,opacity] duration-300",
                        open ? "max-h-[480px] opacity-100" : "max-h-[480px] opacity-90",
                      )}
                    >
                      <p className="mt-3 text-center text-[15px] font-bold leading-[1.65] text-ink">
                        {step.desc}
                      </p>
                      <ul className="mt-4 flex flex-col gap-2 border-t border-ink-08 pt-4 text-left">
                        {step.outcomes.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-[14px] font-bold leading-snug text-ink"
                          >
                            <Check
                              className="mt-0.5 size-3.5 shrink-0 text-electric-blue"
                              strokeWidth={2.5}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Mobile: stacked steps with panels always visible (no opacity:0 gate) */}
        <ol className="mt-10 flex flex-col gap-8 lg:hidden">
          {STEPS.map((step) => (
            <li key={step.n} className="flex flex-col gap-4">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[1.5rem] border border-ink-08 bg-[#0a0a0c]">
                <StepPanel step={step} />
              </div>
              <div className="flex flex-col items-center text-center">
                <span
                  className={[
                    "inline-flex items-center justify-center rounded-full bg-white px-3.5 py-1",
                    "text-[10px] font-semibold uppercase tracking-[0.16em] text-electric-blue",
                    "shadow-[0_4px_14px_-4px_oklch(0.58_0.22_250_/_0.25)]",
                    "ring-1 ring-ink-08/60",
                  ].join(" ")}
                >
                  {step.when}
                </span>
                <h3 className="mt-3 text-[22px] font-extrabold tracking-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-[14.5px] font-semibold leading-[1.65] text-ink-80">
                  {step.desc}
                </p>
                <ul className="mt-4 flex w-full flex-col gap-2 text-left">
                  {step.outcomes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[13px] font-semibold leading-snug text-ink"
                    >
                      <Check
                        className="mt-0.5 size-3.5 shrink-0 text-electric-blue"
                        strokeWidth={2.5}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 flex flex-col items-start justify-between gap-5 border-t border-ink-08 pt-10 sm:flex-row sm:items-center">
          <p className="text-[20px] font-bold tracking-tight text-ink">
            Ready to start{" "}
            <span className="font-serif-italic text-electric-blue">week one?</span>
          </p>
          <a
            href="#contact"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary px-5 text-[14.5px] font-semibold text-primary-foreground transition-all hover:bg-primary/90"
          >
            Book a call
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  )
}

function StepPanel({ step }: { step: Step }) {
  return (
    <div className="relative size-full min-h-[inherit]">
      <Image
        src={step.image}
        alt={step.imageAlt}
        fill
        className="object-contain object-center"
        sizes="(max-width: 1024px) 100vw, 560px"
        priority={step.n === "01"}
      />
    </div>
  )
}
