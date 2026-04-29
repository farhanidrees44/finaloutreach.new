"use client"

import { useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Calculator, TrendingUp, ArrowRight } from "lucide-react"
import Link from "next/link"
import { SITE } from "@/lib/site-data"

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`
  return `$${Math.round(n)}`
}

export function RoiCalculator() {
  const [acv, setAcv] = useState(25000)
  const [meetings, setMeetings] = useState(40)
  const [close, setClose] = useState(15)
  const [annual, setAnnual] = useState(0)
  const [investment, setInvestment] = useState(0)
  const [roi, setRoi] = useState(0)

  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    const closed = (meetings * 12 * (close / 100))
    const annualRev = closed * acv
    const investmentTotal = 7500 * 12 // Growth tier as anchor
    const roiX = annualRev / investmentTotal
    setAnnual(annualRev)
    setInvestment(investmentTotal)
    setRoi(roiX)
  }, [acv, meetings, close])

  return (
    <section
      id="roi-calculator"
      ref={ref}
      className="relative overflow-hidden border-y border-ink-08 py-24 md:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 mesh-spectrum opacity-80"
      />

      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col items-start gap-3 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-vibrant-purple/20 bg-vibrant-purple/[0.04] px-3 py-1 text-[12px] font-medium uppercase tracking-[0.14em] text-vibrant-purple">
            <Calculator className="size-3.5" strokeWidth={2.2} />
            ROI calculator
          </span>
          <h2 className="max-w-3xl text-balance text-fluid-2xl font-medium tracking-display text-ink">
            See what 40 qualified meetings a month is{" "}
            <span className="font-serif-italic gradient-text-animated">
              actually worth
            </span>{" "}
            to your business.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          {/* INPUTS */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass-card flex flex-col gap-7 rounded-3xl p-8 md:p-10"
            style={{ boxShadow: "var(--shadow-lg)" }}
          >
            <Slider
              label="Average contract value (ACV)"
              hint="Annual revenue per closed deal"
              value={acv}
              setValue={setAcv}
              min={5000}
              max={250000}
              step={1000}
              format={fmt}
            />
            <Slider
              label="Qualified meetings per month"
              hint="What we'd target for your account"
              value={meetings}
              setValue={setMeetings}
              min={5}
              max={120}
              step={1}
              format={(n) => `${n}`}
            />
            <Slider
              label="Close rate"
              hint="% of meetings that become customers"
              value={close}
              setValue={setClose}
              min={2}
              max={40}
              step={1}
              format={(n) => `${n}%`}
            />
          </motion.div>

          {/* OUTPUT */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="relative flex flex-col gap-6 overflow-hidden rounded-3xl p-8 md:p-10"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.146 0 0) 0%, oklch(0.18 0.05 280) 100%)",
              boxShadow: "var(--shadow-2xl)",
            }}
          >
            {/* Glow accent */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-32 -right-32 size-64 rounded-full opacity-40 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.55 0.24 295 / 0.5), transparent 70%)",
              }}
            />

            <div className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] text-white/60">
              <TrendingUp className="size-3.5" strokeWidth={2.2} />
              Projected return
            </div>

            <div>
              <div className="text-[12px] uppercase tracking-[0.10em] text-white/50">
                Annual revenue from booked meetings
              </div>
              <div className="mt-2 text-fluid-3xl font-semibold tabular tracking-mega text-white">
                {fmt(annual)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Stat
                label="Annual investment"
                value={fmt(investment)}
                sub="Growth tier"
              />
              <Stat
                label="Return multiple"
                value={`${roi.toFixed(1)}x`}
                sub="ROI"
                accent
              />
            </div>

            <div className="mt-2 h-px bg-white/10" />

            <div className="flex flex-col gap-2 text-[13px] text-white/60">
              <Calc label="Closed deals / yr" value={Math.round(meetings * 12 * (close / 100))} />
              <Calc label="Meetings / yr" value={meetings * 12} />
              <Calc label="ACV" value={fmt(acv)} isMoney />
            </div>

            <a
              href={SITE.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-[14px] font-medium text-ink transition-all hover:bg-white/90"
            >
              Book a strategy call
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Slider({
  label,
  hint,
  value,
  setValue,
  min,
  max,
  step,
  format,
}: {
  label: string
  hint: string
  value: number
  setValue: (n: number) => void
  min: number
  max: number
  step: number
  format: (n: number) => string
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="text-[13px] font-medium text-ink">{label}</label>
        <span className="text-[20px] font-semibold tabular tracking-tight gradient-text">
          {format(value)}
        </span>
      </div>
      <p className="mt-0.5 text-[12px] text-ink-60">{hint}</p>
      <div className="relative mt-4 h-2">
        <div className="absolute inset-0 rounded-full bg-ink-08" />
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-vibrant-purple via-electric-blue to-bright-cyan"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="absolute inset-0 h-2 w-full cursor-pointer appearance-none bg-transparent
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:size-5
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:bg-white
                     [&::-webkit-slider-thumb]:border-2
                     [&::-webkit-slider-thumb]:border-vibrant-purple
                     [&::-webkit-slider-thumb]:shadow-md
                     [&::-webkit-slider-thumb]:cursor-grab
                     [&::-webkit-slider-thumb]:active:cursor-grabbing
                     [&::-moz-range-thumb]:size-5
                     [&::-moz-range-thumb]:rounded-full
                     [&::-moz-range-thumb]:bg-white
                     [&::-moz-range-thumb]:border-2
                     [&::-moz-range-thumb]:border-vibrant-purple
                     [&::-moz-range-thumb]:cursor-grab"
          aria-label={label}
          suppressHydrationWarning
        />
      </div>
    </div>
  )
}

function Stat({
  label,
  value,
  sub,
  accent,
}: {
  label: string
  value: string
  sub?: string
  accent?: boolean
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        accent
          ? "border-vibrant-purple/30 bg-vibrant-purple/10"
          : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <div className="text-[10.5px] uppercase tracking-[0.10em] text-white/50">
        {label}
      </div>
      <div className={`mt-1 text-[22px] font-semibold tabular tracking-tight ${accent ? "text-white" : "text-white"}`}>
        {value}
      </div>
      {sub && <div className="mt-0.5 text-[10.5px] text-white/40">{sub}</div>}
    </div>
  )
}

function Calc({
  label,
  value,
  isMoney,
}: {
  label: string
  value: number | string
  isMoney?: boolean
}) {
  return (
    <div className="flex items-center justify-between font-mono text-[12.5px]">
      <span>{label}</span>
      <span className="text-white tabular">
        {isMoney ? value : value.toLocaleString()}
      </span>
    </div>
  )
}
