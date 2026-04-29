"use client"

/**
 * Cold Outbound ROI Calculator.
 *
 * One pure `model(inputs)` function does all the math. The UI is a stack of
 * sliders + numeric inputs feeding into a "headline cards" row and a
 * sensitivity table that shows what the model says at half/double rates.
 *
 * URL state: every slider mirrors to the URL (`?ls=2000&rr=2.5&...`), so
 * users can share their model with a copy-link button.
 */

import { useId, useEffect, useMemo, useState } from "react"
import {
  Calculator,
  Copy,
  CheckCheck,
  TrendingUp,
  Banknote,
  Users,
  CalendarRange,
  Sparkles,
  RotateCcw,
} from "lucide-react"
import { ToolWorkbench, PanelHeading } from "@/components/tools/tool-shell"
import { cn } from "@/lib/utils"

type Inputs = {
  listSize: number       // contacts per month
  replyRate: number      // percent of contacts who reply
  meetingRate: number    // percent of replies who book a meeting
  closeRate: number      // percent of meetings that close
  acv: number            // average contract value, USD
  monthlyCost: number    // all-in monthly program cost, USD
}

type Output = {
  replies: number
  meetings: number
  deals: number
  revenue: number
  profit: number
  roiMultiple: number      // revenue / cost
  paybackMonths: number    // months until cumulative profit > 0
  costPerMeeting: number
  costPerDeal: number
}

const DEFAULTS: Inputs = {
  listSize: 2500,
  replyRate: 2.5,
  meetingRate: 30,
  closeRate: 22,
  acv: 18000,
  monthlyCost: 5500,
}

function model(i: Inputs): Output {
  const replies = (i.listSize * i.replyRate) / 100
  const meetings = (replies * i.meetingRate) / 100
  const deals = (meetings * i.closeRate) / 100
  const revenue = deals * i.acv
  const profit = revenue - i.monthlyCost
  const roiMultiple = i.monthlyCost > 0 ? revenue / i.monthlyCost : 0
  const costPerMeeting = meetings > 0 ? i.monthlyCost / meetings : 0
  const costPerDeal = deals > 0 ? i.monthlyCost / deals : 0
  // Payback semantics: revenue and cost are both monthly; if monthly net
  // profit is positive, the month's program cost is recovered inside that
  // same month (payback < 1 mo). Otherwise the program never pays back at
  // these inputs — flag explicitly.
  const paybackMonths = profit > 0 ? 1 : Infinity
  return { replies, meetings, deals, revenue, profit, roiMultiple, paybackMonths, costPerMeeting, costPerDeal }
}

function fmt$(n: number) {
  if (!Number.isFinite(n)) return "—"
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
}
function fmtN(n: number) {
  if (!Number.isFinite(n)) return "—"
  return n.toLocaleString("en-US", { maximumFractionDigits: 1 })
}

// URL serializer — short keys to keep links friendly.
const URL_KEYS: Record<keyof Inputs, string> = {
  listSize: "ls", replyRate: "rr", meetingRate: "mr",
  closeRate: "cr", acv: "av", monthlyCost: "mc",
}
function inputsToParams(i: Inputs): URLSearchParams {
  const p = new URLSearchParams()
  ;(Object.keys(i) as (keyof Inputs)[]).forEach((k) => {
    p.set(URL_KEYS[k], String(i[k]))
  })
  return p
}
function inputsFromParams(p: URLSearchParams): Partial<Inputs> {
  const out: Partial<Inputs> = {}
  ;(Object.keys(URL_KEYS) as (keyof Inputs)[]).forEach((k) => {
    const raw = p.get(URL_KEYS[k])
    if (raw !== null) {
      const n = Number(raw)
      if (Number.isFinite(n)) out[k] = n
    }
  })
  return out
}

function Slider({
  id, label, value, onChange, min, max, step, format,
}: {
  id: string
  label: string
  value: number
  onChange: (v: number) => void
  min: number; max: number; step: number
  format: (n: number) => string
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-[12.5px] font-medium uppercase tracking-[0.14em] text-ink-60">
          {label}
        </label>
        <span className="font-mono text-[14px] tabular-nums text-ink">{format(value)}</span>
      </div>
      <input
        id={id} type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        suppressHydrationWarning
        className="mt-2 w-full accent-[oklch(0.55_0.13_78)]"
      />
      <div className="mt-1 flex justify-between text-[10.5px] text-ink-40">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  )
}

function MetricCard({
  label, value, hint, icon: Ic, accent,
}: {
  label: string
  value: string
  hint?: string
  icon: typeof Calculator
  accent?: "primary" | "neutral"
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-4 sm:p-5",
        accent === "primary"
          ? "border-[oklch(0.55_0.13_78)]/30 bg-gradient-to-br from-[oklch(0.97_0.02_78)] to-background"
          : "border-ink-08 bg-background",
      )}
    >
      <div className="flex items-center gap-2">
        <Ic className={cn("size-3.5", accent === "primary" ? "text-[oklch(0.55_0.13_78)]" : "text-ink-40")} />
        <span className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-ink-60">
          {label}
        </span>
      </div>
      <p className="mt-2 font-mono text-[24px] font-medium tabular-nums leading-tight text-ink sm:text-[28px]">
        {value}
      </p>
      {hint && <p className="mt-1 text-[12px] leading-[1.45] text-ink-60">{hint}</p>}
    </div>
  )
}

export function RoiCalculatorClient() {
  const id = useId()
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS)
  const [copied, setCopied] = useState(false)

  // Hydrate from URL on mount
  useEffect(() => {
    if (typeof window === "undefined") return
    const fromUrl = inputsFromParams(new URLSearchParams(window.location.search))
    if (Object.keys(fromUrl).length > 0) {
      setInputs((prev) => ({ ...prev, ...fromUrl }))
    }
  }, [])

  // Mirror to URL (replaceState — don't pollute history per slider tick)
  useEffect(() => {
    if (typeof window === "undefined") return
    const params = inputsToParams(inputs)
    const next = `${window.location.pathname}?${params.toString()}`
    window.history.replaceState(null, "", next)
  }, [inputs])

  const out = useMemo(() => model(inputs), [inputs])

  const update = <K extends keyof Inputs>(k: K, v: Inputs[K]) =>
    setInputs((prev) => ({ ...prev, [k]: v }))

  // Sensitivity matrix: 0.5x / 1x / 2x reply rate vs 0.5x / 1x / 2x close rate
  const factors = [0.5, 1, 2]
  const sensitivity = factors.map((rrF) =>
    factors.map((crF) =>
      model({
        ...inputs,
        replyRate: inputs.replyRate * rrF,
        closeRate: inputs.closeRate * crF,
      }),
    ),
  )

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {
      // ignore
    }
  }

  const reset = () => setInputs(DEFAULTS)

  return (
    <ToolWorkbench
      inputs={
        <>
          <PanelHeading
            step="Step 01"
            title="Your assumptions"
            hint="Sliders re-compute the model live. Defaults are conservative B2B SaaS midpoints."
            rightSlot={
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink-08 bg-background px-2.5 py-1 text-[11.5px] font-medium text-ink-60 transition-colors hover:border-ink/25 hover:text-ink"
              >
                <RotateCcw className="size-3" /> Reset
              </button>
            }
          />

          <div className="space-y-6">
            <Slider
              id={`${id}-ls`} label="List size / month"
              value={inputs.listSize} onChange={(v) => update("listSize", v)}
              min={250} max={20000} step={250}
              format={(n) => `${n.toLocaleString()} contacts`}
            />
            <Slider
              id={`${id}-rr`} label="Reply rate"
              value={inputs.replyRate} onChange={(v) => update("replyRate", v)}
              min={0.5} max={8} step={0.1}
              format={(n) => `${n.toFixed(1)}%`}
            />
            <Slider
              id={`${id}-mr`} label="Reply → Meeting"
              value={inputs.meetingRate} onChange={(v) => update("meetingRate", v)}
              min={5} max={70} step={1}
              format={(n) => `${n}%`}
            />
            <Slider
              id={`${id}-cr`} label="Meeting → Close"
              value={inputs.closeRate} onChange={(v) => update("closeRate", v)}
              min={5} max={60} step={1}
              format={(n) => `${n}%`}
            />
            <Slider
              id={`${id}-av`} label="Average deal size"
              value={inputs.acv} onChange={(v) => update("acv", v)}
              min={1000} max={150000} step={500}
              format={fmt$}
            />
            <Slider
              id={`${id}-mc`} label="All-in monthly cost"
              value={inputs.monthlyCost} onChange={(v) => update("monthlyCost", v)}
              min={500} max={30000} step={250}
              format={fmt$}
            />
          </div>

          <div className="mt-7 flex items-center gap-2">
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex items-center gap-1.5 rounded-full border border-ink-08 bg-background px-3 py-1.5 text-[12.5px] font-medium text-ink-60 transition-colors hover:border-ink/25 hover:text-ink"
            >
              {copied ? <CheckCheck className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
              {copied ? "Link copied" : "Copy share link"}
            </button>
            <span className="text-[11.5px] text-ink-40">
              Captures every slider value
            </span>
          </div>
        </>
      }
      results={
        <>
          <PanelHeading
            step="Step 02"
            title="Your monthly model"
            hint="Per-month outputs at the inputs on the left."
          />

          <div className="grid grid-cols-2 gap-3">
            <MetricCard
              label="Pipeline (revenue)"
              value={fmt$(out.revenue)}
              hint={`From ${fmtN(out.deals)} closed deal${out.deals === 1 ? "" : "s"}`}
              icon={Banknote} accent="primary"
            />
            <MetricCard
              label="ROI multiple"
              value={Number.isFinite(out.roiMultiple) ? `${out.roiMultiple.toFixed(1)}x` : "—"}
              hint={`On ${fmt$(inputs.monthlyCost)} spend`}
              icon={TrendingUp} accent="primary"
            />
            <MetricCard
              label="Meetings / mo"
              value={fmtN(out.meetings)}
              hint={`From ${fmtN(out.replies)} replies`}
              icon={Users}
            />
            <MetricCard
              label="Payback"
              value={
                Number.isFinite(out.paybackMonths)
                  ? out.paybackMonths === 1 ? "<1 mo" : `${out.paybackMonths} mo`
                  : "Never"
              }
              hint={
                out.profit >= 0
                  ? `Net profit ${fmt$(out.profit)} / mo`
                  : `Loss ${fmt$(-out.profit)} / mo at these rates`
              }
              icon={CalendarRange}
            />
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2">
            <div className="rounded-xl border border-ink-08 bg-background p-3">
              <p className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-ink-60">
                Cost / meeting
              </p>
              <p className="mt-1 font-mono text-[15px] tabular-nums text-ink">
                {fmt$(out.costPerMeeting)}
              </p>
            </div>
            <div className="rounded-xl border border-ink-08 bg-background p-3">
              <p className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-ink-60">
                Cost / deal
              </p>
              <p className="mt-1 font-mono text-[15px] tabular-nums text-ink">
                {fmt$(out.costPerDeal)}
              </p>
            </div>
            <div className="rounded-xl border border-ink-08 bg-background p-3">
              <p className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-ink-60">
                Annualized
              </p>
              <p className="mt-1 font-mono text-[15px] tabular-nums text-ink">
                {fmt$(out.revenue * 12)}
              </p>
            </div>
          </div>

          <div className="mt-7 rounded-2xl border border-ink-08 bg-background p-5">
            <div className="flex items-center justify-between">
              <p className="text-[11.5px] font-medium uppercase tracking-[0.14em] text-ink-60">
                Sensitivity — revenue / mo
              </p>
              <span className="inline-flex items-center gap-1 text-[11px] text-ink-40">
                <Sparkles className="size-3" /> Stress-test the model
              </span>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse text-[12.5px]">
                <thead>
                  <tr className="text-left text-ink-40">
                    <th className="pb-2 pr-3 font-mono text-[10.5px] uppercase tracking-[0.14em]">
                      Reply rate ↓ / Close ↓
                    </th>
                    {factors.map((f) => (
                      <th key={f} className="pb-2 px-3 font-mono text-[10.5px] uppercase tracking-[0.14em]">
                        Close × {f}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sensitivity.map((row, ri) => (
                    <tr key={ri} className="border-t border-ink-08">
                      <td className="py-2 pr-3 font-mono text-[11.5px] text-ink-60">
                        Reply × {factors[ri]}
                      </td>
                      {row.map((cell, ci) => {
                        const isCenter = ri === 1 && ci === 1
                        return (
                          <td
                            key={ci}
                            className={cn(
                              "px-3 py-2 font-mono tabular-nums",
                              isCenter
                                ? "rounded-md bg-[oklch(0.97_0.02_78)] text-ink"
                                : "text-ink-60",
                            )}
                          >
                            {fmt$(cell.revenue)}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-[11.5px] leading-[1.5] text-ink-40">
              Center cell = your current model. Use the rest to brief your CFO.
            </p>
          </div>
        </>
      }
    />
  )
}
