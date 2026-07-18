"use client"

import { useEffect, useId, useState } from "react"
import {
  AlertTriangle,
  Braces,
  CaseSensitive,
  CheckCircle2,
  CircleHelp,
  Hash,
  Lightbulb,
  MessageCircleQuestion,
  Ruler,
  Smile,
  Sparkles,
  Target,
  Timer,
  Type,
  Users,
  Wand2,
  Zap,
} from "lucide-react"
import { motion, useSpring, useTransform } from "framer-motion"
import {
  FieldLabel,
  PanelHeading,
  ToolWorkbench,
} from "@/components/tools/tool-shell"
import {
  analyzeSubjectLine,
  type FactorStatus,
  type SubjectLineAnalysis,
  type SubjectLineFactor,
  type SubjectLineGrade,
} from "@/lib/scoring/subject-line"
import { cn } from "@/lib/utils"

const SPRING = { type: "spring" as const, stiffness: 200, damping: 25 }
const DEBOUNCE_MS = 150

const SAMPLE_SUBJECTS = [
  "Quick question on your Q4 outbound",
  "{{first_name}} — saw the new pricing page",
  "URGENT: 50% OFF Limited Time Offer!!!",
  "How Acme cut their CAC by 32%",
]

const FACTOR_ICONS: Record<string, typeof Ruler> = {
  length: Ruler,
  words: Type,
  spam: AlertTriangle,
  caps: CaseSensitive,
  punct: Hash,
  emoji: Smile,
  merge: Braces,
  case: Wand2,
  personal: Target,
  question: MessageCircleQuestion,
  specificity: Sparkles,
  curiosity: Lightbulb,
  urgency: Timer,
  generic: Users,
  human: Zap,
}

function signalColor(score: number): string {
  if (score <= 40) {
    const t = score / 40
    return lerpHex("#B8402E", "#B8752E", t)
  }
  if (score <= 70) {
    const t = (score - 40) / 30
    return lerpHex("#B8752E", "#2E7D4F", t)
  }
  return "#2E7D4F"
}

function lerpHex(a: string, b: string, t: number): string {
  const clamp = Math.max(0, Math.min(1, t))
  const pa = hexToRgb(a)
  const pb = hexToRgb(b)
  const r = Math.round(pa.r + (pb.r - pa.r) * clamp)
  const g = Math.round(pa.g + (pb.g - pa.g) * clamp)
  const bl = Math.round(pa.b + (pb.b - pa.b) * clamp)
  return `rgb(${r}, ${g}, ${bl})`
}

function hexToRgb(hex: string) {
  const h = hex.replace("#", "")
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  }
}

function charPillTone(len: number): string {
  if (len === 0) return "border-ink-08 text-ink-40"
  if (len <= 30)
    return "border-emerald/25 bg-emerald-bright/10 text-emerald-dark"
  if (len <= 50) return "border-amber/30 bg-amber/10 text-ink"
  if (len <= 70) return "border-amber/40 bg-amber/15 text-ink"
  return "border-destructive/25 bg-destructive/10 text-destructive"
}

function statusColor(status: FactorStatus): string {
  if (status === "pass") return "var(--emerald)"
  if (status === "warn") return "var(--amber)"
  return "var(--destructive)"
}

function barClass(status: FactorStatus): string {
  if (status === "pass") return "bg-gradient-to-r from-emerald to-emerald-bright"
  if (status === "warn") return "bg-gradient-to-r from-amber to-gold"
  return "bg-gradient-to-r from-destructive to-coral-warm"
}

function ScoreGauge({
  score,
  grade,
}: {
  score: number
  grade: SubjectLineGrade
}) {
  const springScore = useSpring(score, SPRING)
  const [display, setDisplay] = useState(score)
  const [color, setColor] = useState(signalColor(score))

  const r = 54
  const circumference = 2 * Math.PI * r
  const arcLen = circumference * 0.75
  const dashOffset = useTransform(springScore, (v) => {
    const pct = Math.max(0, Math.min(100, v)) / 100
    return arcLen * (1 - pct)
  })

  useEffect(() => {
    springScore.set(score)
  }, [score, springScore])

  useEffect(() => {
    const unsub = springScore.on("change", (v) => {
      setDisplay(Math.round(v))
      setColor(signalColor(v))
    })
    return unsub
  }, [springScore])

  return (
    <div className="relative mx-auto flex size-[168px] shrink-0 items-center justify-center sm:size-[180px]">
      <svg viewBox="0 0 140 140" className="size-full" aria-hidden="true">
        <g transform="rotate(135 70 70)">
          <circle
            cx="70"
            cy="70"
            r={r}
            fill="none"
            className="stroke-ink-08"
            strokeWidth="10"
            strokeDasharray={`${arcLen} ${circumference}`}
            strokeLinecap="round"
          />
          <motion.circle
            cx="70"
            cy="70"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeDasharray={`${arcLen} ${circumference}`}
            style={{ strokeDashoffset: dashOffset }}
            strokeLinecap="round"
          />
        </g>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
        <span className="font-mono text-[48px] font-medium tabular-nums leading-none tracking-tight text-ink sm:text-[52px]">
          {display}
        </span>
        <span className="mt-2 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-ink-40">
          {grade}
        </span>
      </div>
    </div>
  )
}

function FactorRow({ factor }: { factor: SubjectLineFactor }) {
  const Icon = FACTOR_ICONS[factor.id] ?? CircleHelp
  const pct = factor.weight === 0 ? 0 : (factor.score / factor.weight) * 100
  const color = statusColor(factor.status)

  return (
    <li className="py-3.5">
      <div className="flex items-start gap-3">
        <span
          className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-lg border border-ink-08 bg-background"
          style={{ color }}
        >
          <Icon className="size-3.5 stroke-[1.75]" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-[13.5px] font-bold text-ink">{factor.label}</span>
            <span className="font-mono text-[11px] tabular-nums text-ink-40">
              {factor.score}/{factor.weight}
            </span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-08">
            <motion.div
              className={cn("h-full rounded-full", barClass(factor.status))}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={SPRING}
            />
          </div>
          <p className="mt-2 text-[13px] font-medium leading-[1.55] text-ink-60">
            {factor.message}
          </p>
        </div>
      </div>
    </li>
  )
}

function TruncationPreview({ analysis }: { analysis: SubjectLineAnalysis }) {
  if (!analysis.charCount) {
    return (
      <p className="text-[13px] font-medium leading-[1.55] text-ink-40">
        Mobile preview appears as you type.
      </p>
    )
  }
  return (
    <div className="space-y-3">
      {[
        {
          label: "30-char inbox",
          preview: analysis.preview30,
          cut: analysis.truncatedAt30,
        },
        {
          label: "55-char inbox",
          preview: analysis.preview55,
          cut: analysis.truncatedAt55,
        },
      ].map((row) => (
        <div key={row.label}>
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-40">
              {row.label}
            </span>
            {row.cut && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink">
                Truncated
              </span>
            )}
          </div>
          <p className="rounded-xl border border-ink-08 bg-card px-3 py-2.5 font-mono text-[13px] tabular-nums text-ink">
            {row.preview || "—"}
          </p>
        </div>
      ))}
    </div>
  )
}

export function SubjectLineTesterClient() {
  const id = useId()
  const [subject, setSubject] = useState("Quick question on your Q4 outbound")
  const [debounced, setDebounced] = useState(subject)

  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(subject), DEBOUNCE_MS)
    return () => window.clearTimeout(t)
  }, [subject])

  const analysis = analyzeSubjectLine(debounced)
  const liveCounts = {
    chars: subject.trim().length,
    words: subject.trim() ? subject.trim().split(/\s+/).length : 0,
  }
  const isEmpty = subject.trim().length === 0

  return (
    <div className="space-y-5">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SPRING, delay: 0 }}
        className="rounded-2xl border border-vibrant-purple/15 bg-vibrant-purple/[0.04] px-4 py-3.5 text-[13.5px] font-medium leading-[1.55] text-ink-60 sm:px-5"
      >
        Built from hundreds of live cold campaigns run through FinalOutreach +
        published industry benchmarks — calibrated for outbound, not newsletters.
      </motion.p>

      <ToolWorkbench
        inputs={
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING, delay: 0.12 }}
          >
            <PanelHeading
              step="Step 01"
              title="Subject line"
              hint="Type or paste — analysis runs in your browser. Nothing is sent."
            />
            <FieldLabel htmlFor={`${id}-subject`} label="Your subject line">
              <div className="relative">
                <textarea
                  id={`${id}-subject`}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  maxLength={120}
                  rows={3}
                  spellCheck
                  suppressHydrationWarning
                  placeholder="Quick question on your Q4 outbound"
                  className="w-full resize-none rounded-2xl border border-ink-08 bg-cream/60 px-4 py-3.5 pr-4 pb-11 text-[16px] font-medium leading-[1.5] text-ink shadow-[inset_0_1px_2px_rgba(15,15,15,0.04)] outline-none transition-shadow placeholder:text-ink-40 focus:border-electric-blue/40 focus:ring-2 focus:ring-electric-blue/15"
                />
                <span
                  className={cn(
                    "pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] font-medium tabular-nums",
                    charPillTone(liveCounts.chars),
                  )}
                >
                  {liveCounts.chars} chars · {liveCounts.words} words
                </span>
              </div>
            </FieldLabel>

            <div className="mt-6">
              <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-ink-40">
                Try a sample
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SAMPLE_SUBJECTS.map((s) => {
                  const active = subject === s
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSubject(s)}
                      className={cn(
                        "rounded-full border bg-transparent px-3 py-1.5 text-[12.5px] font-medium transition-colors",
                        active
                          ? "border-electric-blue/40 bg-electric-blue/5 text-ink"
                          : "border-ink-08 text-ink-60 hover:border-ink/25 hover:bg-cream/50 hover:text-ink",
                      )}
                    >
                      {s.length > 36 ? s.slice(0, 34) + "…" : s}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mt-7 rounded-2xl border border-ink-08 bg-cream/50 p-5">
              <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-ink-40">
                Mobile truncation
              </p>
              <div className="mt-3">
                <TruncationPreview analysis={analyzeSubjectLine(subject)} />
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-ink-08 bg-background p-5">
              <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-ink-40">
                Top fixes
              </p>
              {isEmpty ? (
                <p className="mt-3 text-[13.5px] font-medium leading-[1.55] text-ink-40">
                  Type a subject line — highest-impact rewrites land here.
                </p>
              ) : analysis.topFixes.length === 0 ? (
                <p className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-emerald-dark">
                  <CheckCircle2 className="size-4 text-emerald" />
                  Looks strong — nothing critical to change.
                </p>
              ) : (
                <ol className="mt-3 space-y-2.5">
                  {analysis.topFixes.map((f, i) => (
                    <li
                      key={i}
                      className="flex gap-2.5 text-[13.5px] font-medium leading-[1.55] text-ink"
                    >
                      <span className="font-mono tabular-nums text-ink-40">
                        0{i + 1}
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </motion.div>
        }
        results={
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING, delay: 0.24 }}
          >
            <PanelHeading
              step="Step 02"
              title="Cold open-rate score"
              hint="Weighted across 15 deliverability and engagement factors."
            />

            <div className="rounded-2xl border border-ink-08 bg-cream/50 px-4 py-6 sm:px-6">
              <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
                <ScoreGauge score={analysis.score} grade={analysis.grade} />
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-ink-40">
                    Verdict
                  </p>
                  <p className="mt-2 text-[16px] font-semibold leading-[1.45] text-ink">
                    {isEmpty
                      ? "Type a subject line to see your score."
                      : analysis.grade === "Excellent"
                        ? "Ready to send — strong across deliverability and engagement."
                        : analysis.grade === "Strong"
                          ? "Solid for cold — a few tweaks could push it higher."
                          : analysis.grade === "Average"
                            ? "Middle of the pack. Apply the top fixes below."
                            : analysis.grade === "Weak"
                              ? "Likely to underperform on cold opens and replies."
                              : "High risk of low opens or spam folder. Rewrite recommended."}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <p className="mb-1 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-ink-40">
                Deliverability factors
              </p>
              <ul className="divide-y divide-ink-08 border-b border-ink-08">
                {analysis.deliverability.map((f) => (
                  <FactorRow key={f.id} factor={f} />
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <p className="mb-1 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-ink-40">
                Engagement factors
              </p>
              <ul className="divide-y divide-ink-08 border-b border-ink-08">
                {analysis.engagement.map((f) => (
                  <FactorRow key={f.id} factor={f} />
                ))}
              </ul>
            </div>
          </motion.div>
        }
      />
    </div>
  )
}
