"use client"

/**
 * Email Warmup Calculator.
 *
 * Implements the consensus 30%-day-over-day ramp:
 *   day 0 → 5 sends
 *   day n → ceil(prev * 1.30)
 * Stops at the user's target daily volume. We compute the calendar
 * (including weekends — warmup tools run 7 days a week), and surface
 * a "switch off warmup tool" milestone at the day daily volume crosses 50.
 */

import { useId, useEffect, useMemo, useState } from "react"
import {
  Flame,
  Calendar,
  CheckCircle2,
  Sparkles,
  ArrowDown,
  TrendingUp,
  Mailbox,
} from "lucide-react"
import { ToolWorkbench, PanelHeading, FieldLabel } from "@/components/tools/tool-shell"

type Inputs = {
  targetVolume: number  // sends/day per inbox
  startDate: string     // YYYY-MM-DD
  startVolume: number   // initial sends/day
  growthPct: number     // day-over-day growth %, default 30
}

type Day = {
  index: number
  date: Date
  sends: number
  pctOfTarget: number
  milestone?: "switch-off-warmup" | "complete"
}

function buildPlan(i: Inputs): Day[] {
  // Cap at 365 days — well past any sane warmup window.
  const days: Day[] = []
  const start = new Date(`${i.startDate}T00:00:00`)
  if (Number.isNaN(start.getTime())) return days
  let current = Math.max(1, i.startVolume)
  let switched = false
  for (let n = 0; n < 365; n++) {
    const date = new Date(start)
    date.setDate(start.getDate() + n)
    const sends = Math.min(i.targetVolume, current)
    const day: Day = {
      index: n,
      date,
      sends,
      pctOfTarget: i.targetVolume > 0 ? (sends / i.targetVolume) * 100 : 100,
    }
    // Switch off warmup tool when daily volume crosses 50 (industry rule)
    if (!switched && sends >= 50) {
      day.milestone = "switch-off-warmup"
      switched = true
    }
    if (sends >= i.targetVolume) {
      day.milestone = "complete"
      days.push(day)
      break
    }
    days.push(day)
    current = Math.ceil(current * (1 + i.growthPct / 100))
  }
  return days
}

const DEFAULT_START = (() => {
  // Default to today in YYYY-MM-DD, computed *after* hydration via effect.
  // Fixed string here so SSR matches initial render.
  return "2026-04-27"
})()

const DEFAULTS: Inputs = {
  targetVolume: 50,
  startDate: DEFAULT_START,
  startVolume: 5,
  growthPct: 30,
}

function fmtDate(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", weekday: "short" })
}

export function WarmupCalculatorClient() {
  const id = useId()
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS)

  // Hydrate startDate to today on client (SSR-safe)
  useEffect(() => {
    if (inputs.startDate === DEFAULT_START) {
      const today = new Date()
      const y = today.getFullYear()
      const m = String(today.getMonth() + 1).padStart(2, "0")
      const d = String(today.getDate()).padStart(2, "0")
      setInputs((prev) => ({ ...prev, startDate: `${y}-${m}-${d}` }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const plan = useMemo(() => buildPlan(inputs), [inputs])
  const totalDays = plan.length
  const endDate = plan.length > 0 ? plan[plan.length - 1].date : null
  const switchOffIndex = plan.findIndex((d) => d.milestone === "switch-off-warmup")
  const totalSends = plan.reduce((sum, d) => sum + d.sends, 0)

  const update = <K extends keyof Inputs>(k: K, v: Inputs[K]) =>
    setInputs((prev) => ({ ...prev, [k]: v }))

  return (
    <ToolWorkbench
      inputs={
        <>
          <PanelHeading
            step="Step 01"
            title="Warmup parameters"
            hint="Per-inbox values. Multiply by your inbox count for total daily sends."
          />

          <div className="space-y-5">
            <FieldLabel htmlFor={`${id}-target`} label="Target sends / day per inbox">
              <div className="relative">
                <Mailbox className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-ink-40" />
                <input
                  id={`${id}-target`} type="number"
                  value={inputs.targetVolume}
                  min={10} max={500} step={5}
                  onChange={(e) => update("targetVolume", Math.max(1, Number(e.target.value || 0)))}
                  suppressHydrationWarning
                  className="w-full rounded-2xl border border-ink-08 bg-cream/60 py-3 pl-10 pr-3 font-mono text-[15px] tabular-nums outline-none transition-all focus:border-electric-blue/40 focus:ring-2 focus:ring-electric-blue/15"
                />
              </div>
            </FieldLabel>

            <FieldLabel htmlFor={`${id}-start`} label="Start date">
              <div className="relative">
                <Calendar className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-ink-40" />
                <input
                  id={`${id}-start`} type="date"
                  value={inputs.startDate}
                  onChange={(e) => update("startDate", e.target.value)}
                  suppressHydrationWarning
                  className="w-full rounded-2xl border border-ink-08 bg-cream/60 py-3 pl-10 pr-3 text-[15px] outline-none transition-all focus:border-electric-blue/40 focus:ring-2 focus:ring-electric-blue/15"
                />
              </div>
            </FieldLabel>

            <div className="grid grid-cols-2 gap-4">
              <FieldLabel htmlFor={`${id}-start-vol`} label="Day 1 sends" hint="5 is standard">
                <input
                  id={`${id}-start-vol`} type="number"
                  value={inputs.startVolume}
                  min={1} max={50}
                  onChange={(e) => update("startVolume", Math.max(1, Number(e.target.value || 0)))}
                  suppressHydrationWarning
                  className="w-full rounded-2xl border border-ink-08 bg-cream/60 px-3.5 py-3 font-mono text-[15px] tabular-nums outline-none transition-all focus:border-electric-blue/40 focus:ring-2 focus:ring-electric-blue/15"
                />
              </FieldLabel>
              <FieldLabel htmlFor={`${id}-growth`} label="Daily growth %" hint="30 is industry rule">
                <input
                  id={`${id}-growth`} type="number"
                  value={inputs.growthPct}
                  min={5} max={100} step={5}
                  onChange={(e) => update("growthPct", Math.max(5, Number(e.target.value || 0)))}
                  suppressHydrationWarning
                  className="w-full rounded-2xl border border-ink-08 bg-cream/60 px-3.5 py-3 font-mono text-[15px] tabular-nums outline-none transition-all focus:border-electric-blue/40 focus:ring-2 focus:ring-electric-blue/15"
                />
              </FieldLabel>
            </div>
          </div>

          <div className="mt-7 rounded-2xl border border-vibrant-purple/15 bg-vibrant-purple/[0.04] p-5">
            <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-vibrant-purple">
              Why 30% / day?
            </p>
            <p className="mt-2 text-[13px] font-medium leading-[1.55] text-ink-60">
              The consensus rate that lets ESPs build a healthy reputation without
              tripping rate limits or filters. Faster ramps consistently get blocked.
            </p>
          </div>
        </>
      }
      results={
        <>
          <PanelHeading
            step="Step 02"
            title="Day-by-day plan"
            hint={endDate ? `From ${fmtDate(plan[0].date)} → ${fmtDate(endDate)}` : ""}
          />

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-electric-blue/25 bg-electric-blue/[0.04] p-4">
              <p className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-ink-60">
                Total days
              </p>
              <p className="mt-1.5 font-mono text-[28px] font-extrabold tabular-nums leading-tight text-ink">
                {totalDays}
              </p>
              <p className="mt-1 text-[11.5px] text-ink-60">
                Until you hit {inputs.targetVolume.toLocaleString()} / day
              </p>
            </div>
            <div className="rounded-2xl border border-ink-08 bg-background p-4">
              <p className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-ink-60">
                Total sends
              </p>
              <p className="mt-1.5 font-mono text-[28px] font-medium tabular-nums leading-tight text-ink">
                {totalSends.toLocaleString()}
              </p>
              <p className="mt-1 text-[11.5px] text-ink-60">Across the warmup window</p>
            </div>
            <div className="rounded-2xl border border-ink-08 bg-background p-4">
              <p className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-ink-60">
                Switch off warmup
              </p>
              <p className="mt-1.5 font-mono text-[28px] font-medium tabular-nums leading-tight text-ink">
                {switchOffIndex >= 0 ? `Day ${switchOffIndex + 1}` : "—"}
              </p>
              <p className="mt-1 text-[11.5px] text-ink-60">
                {switchOffIndex >= 0 ? "Crosses 50 sends/day" : "Below the threshold"}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-ink-08 bg-background">
            <div className="flex items-center justify-between border-b border-ink-08 px-4 py-3 sm:px-5">
              <p className="text-[11.5px] font-medium uppercase tracking-[0.14em] text-ink-60">
                Schedule
              </p>
              <span className="inline-flex items-center gap-1 font-mono text-[10.5px] text-ink-40">
                <ArrowDown className="size-3" /> Day 1 → target
              </span>
            </div>
            <div className="max-h-[420px] overflow-y-auto">
              <table className="w-full border-collapse text-[13px]">
                <thead className="sticky top-0 bg-background">
                  <tr className="text-left text-ink-40">
                    <th className="px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.14em] sm:px-5">
                      Day
                    </th>
                    <th className="px-3 py-2 font-mono text-[10.5px] uppercase tracking-[0.14em]">
                      Date
                    </th>
                    <th className="px-3 py-2 text-right font-mono text-[10.5px] uppercase tracking-[0.14em]">
                      Sends
                    </th>
                    <th className="px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.14em] sm:px-5">
                      % of target
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {plan.map((d) => {
                    const isMilestone = !!d.milestone
                    return (
                      <tr
                        key={d.index}
                        className="border-t border-ink-08"
                      >
                        <td className="px-4 py-2 font-mono text-[12.5px] tabular-nums text-ink-60 sm:px-5">
                          {String(d.index + 1).padStart(2, "0")}
                        </td>
                        <td className="px-3 py-2 text-ink-60">
                          {fmtDate(d.date)}
                        </td>
                        <td className="px-3 py-2 text-right font-mono text-[13.5px] tabular-nums text-ink">
                          {d.sends.toLocaleString()}
                        </td>
                        <td className="px-4 py-2 sm:px-5">
                          <div className="flex items-center gap-2">
                            <div className="relative h-1.5 w-full max-w-[120px] overflow-hidden rounded-full bg-ink-08">
                              <div
                                className="absolute inset-y-0 left-0 bg-[oklch(0.55_0.13_78)] transition-[width]"
                                style={{ width: `${Math.min(100, d.pctOfTarget)}%` }}
                              />
                            </div>
                            <span className="font-mono text-[11px] tabular-nums text-ink-40">
                              {Math.round(d.pctOfTarget)}%
                            </span>
                            {isMilestone && (
                              <span
                                className={
                                  d.milestone === "complete"
                                    ? "inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-emerald-700"
                                    : "inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-amber-700"
                                }
                              >
                                {d.milestone === "complete" ? (
                                  <>
                                    <CheckCircle2 className="size-3" />
                                    At target
                                  </>
                                ) : (
                                  <>
                                    <Sparkles className="size-3" />
                                    Switch off warmup
                                  </>
                                )}
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-4 inline-flex items-center gap-1.5 text-[11.5px] text-ink-40">
            <TrendingUp className="size-3.5" />
            Numbers are per inbox — multiply by inbox count for total volume.
          </p>
        </>
      }
    />
  )
}
