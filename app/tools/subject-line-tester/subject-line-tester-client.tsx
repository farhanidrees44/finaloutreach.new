"use client"

import { useEffect, useId, useState } from "react"
import {
  AlertTriangle,
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
  Braces,
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
  // Interpolate fail → warn → pass across 40 / 70
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
  if (len === 0) return "text-[var(--ink-400)] border-[var(--border-hairline)]"
  if (len <= 30) return "text-[var(--signal-pass)] border-[var(--signal-pass)]/25 bg-[var(--signal-pass-soft)]"
  if (len <= 50) return "text-[var(--signal-warn)] border-[var(--signal-warn)]/25 bg-[var(--signal-warn-soft)]"
  if (len <= 70) return "text-[var(--signal-warn)] border-[var(--signal-warn)]/30 bg-[var(--signal-warn-soft)]"
  return "text-[var(--signal-fail)] border-[var(--signal-fail)]/25 bg-[var(--signal-fail-soft)]"
}

function statusColor(status: FactorStatus): string {
  if (status === "pass") return "var(--signal-pass)"
  if (status === "warn") return "var(--signal-warn)"
  return "var(--signal-fail)"
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

  // 270° arc (¾ circle)
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
        {/* Track — rotated so gap sits at bottom */}
        <g transform="rotate(135 70 70)">
          <circle
            cx="70"
            cy="70"
            r={r}
            fill="none"
            stroke="var(--border-hairline)"
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
        <span className="font-mono text-[48px] font-medium tabular-nums leading-none tracking-tight text-[var(--ink-900)] sm:text-[52px]">
          {display}
        </span>
        <span className="mt-2 text-[10.5px] font-medium uppercase tracking-[0.2em] text-[var(--ink-400)]">
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
          className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-lg border border-[var(--border-hairline)] bg-[var(--surface-card)]"
          style={{ color }}
        >
          <Icon className="size-3.5 stroke-[1.5]" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-[13.5px] font-medium text-[var(--ink-900)]">
              {factor.label}
            </span>
            <span className="font-mono text-[11px] tabular-nums text-[var(--ink-400)]">
              {factor.score}/{factor.weight}
            </span>
          </div>
          <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-[var(--border-hairline)]">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: color }}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={SPRING}
            />
          </div>
          <p className="mt-2 text-[12.5px] leading-[1.55] text-[var(--ink-600)]">
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
      <p className="text-[13px] leading-[1.55] text-[var(--ink-400)]">
        Mobile preview appears as you type.
      </p>
    )
  }
  return (
    <div className="space-y-3">
      {[
        { label: "30-char inbox", preview: analysis.preview30, cut: analysis.truncatedAt30 },
        { label: "55-char inbox", preview: analysis.preview55, cut: analysis.truncatedAt55 },
      ].map((row) => (
        <div key={row.label}>
          <div className="mb-1 flex items-center justify-between gap-2">
            <span className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-[var(--ink-400)]">
              {row.label}
            </span>
            {row.cut && (
              <span className="text-[10.5px] uppercase tracking-[0.12em] text-[var(--signal-warn)]">
                Truncated
              </span>
            )}
          </div>
          <p className="rounded-lg border border-[var(--border-hairline)] bg-[var(--surface-card)] px-3 py-2 font-mono text-[13px] tabular-nums text-[var(--ink-900)]">
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
        className="rounded-xl border border-[var(--border-hairline)] bg-[var(--accent-gold-soft)] px-4 py-3 text-[13.5px] leading-[1.55] text-[var(--ink-600)]"
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
                  className="w-full resize-none rounded-xl border border-[var(--border-hairline)] bg-[var(--surface-card-sunk)] px-4 py-3.5 pr-28 pb-10 text-[16px] leading-[1.5] text-[var(--ink-900)] shadow-[inset_0_1px_2px_rgba(22,21,15,0.06)] outline-none transition-shadow placeholder:text-[var(--ink-400)] focus:border-[var(--accent-gold)]/40 focus:ring-2 focus:ring-[var(--accent-gold-soft)]"
                />
                <span
                  className={cn(
                    "pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] tabular-nums",
                    charPillTone(liveCounts.chars),
                  )}
                >
                  {liveCounts.chars} chars · {liveCounts.words} words
                </span>
              </div>
            </FieldLabel>

            <div className="mt-6">
              <p className="text-[11.5px] font-medium uppercase tracking-[0.14em] text-[var(--ink-400)]">
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
                        "rounded-full border bg-transparent px-3 py-1.5 text-[12.5px] transition-colors",
                        active
                          ? "border-[var(--accent-gold)] text-[var(--ink-900)]"
                          : "border-[var(--border-hairline)] text-[var(--ink-600)] hover:border-[var(--ink-600)]/40 hover:text-[var(--ink-900)] hover:bg-[var(--surface-card-sunk)]",
                      )}
                    >
                      {s.length > 36 ? s.slice(0, 34) + "…" : s}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mt-7 rounded-xl border border-[var(--border-hairline)] bg-[var(--surface-card-sunk)] p-5">
              <p className="text-[11.5px] font-medium uppercase tracking-[0.14em] text-[var(--ink-400)]">
                Mobile truncation
              </p>
              <div className="mt-3">
                <TruncationPreview analysis={analyzeSubjectLine(subject)} />
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-[var(--border-hairline)] bg-[var(--surface-card)] p-5">
              <p className="text-[11.5px] font-medium uppercase tracking-[0.14em] text-[var(--ink-400)]">
                Top fixes
              </p>
              {isEmpty ? (
                <p className="mt-3 text-[13.5px] leading-[1.55] text-[var(--ink-400)]">
                  Type a subject line — highest-impact rewrites land here.
                </p>
              ) : analysis.topFixes.length === 0 ? (
                <p className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] text-[var(--signal-pass)]">
                  <CheckCircle2 className="size-4" />
                  Looks strong — nothing critical to change.
                </p>
              ) : (
                <ol className="mt-3 space-y-2">
                  {analysis.topFixes.map((f, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-[13.5px] leading-[1.55] text-[var(--ink-900)]"
                    >
                      <span className="font-mono tabular-nums text-[var(--ink-400)]">
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

            <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--surface-card-sunk)] px-4 py-6 sm:px-6">
              <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
                <ScoreGauge score={analysis.score} grade={analysis.grade} />
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-[11.5px] font-medium uppercase tracking-[0.14em] text-[var(--ink-400)]">
                    Verdict
                  </p>
                  <p className="mt-2 text-[16px] leading-[1.45] text-[var(--ink-900)]">
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

            <div className="mt-7">
              <p className="mb-1 text-[11.5px] font-medium uppercase tracking-[0.14em] text-[var(--ink-400)]">
                Deliverability factors
              </p>
              <ul className="divide-y divide-[var(--border-hairline)] border-b border-[var(--border-hairline)]">
                {analysis.deliverability.map((f) => (
                  <FactorRow key={f.id} factor={f} />
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <p className="mb-1 text-[11.5px] font-medium uppercase tracking-[0.14em] text-[var(--ink-400)]">
                Engagement factors
              </p>
              <ul className="divide-y divide-[var(--border-hairline)] border-b border-[var(--border-hairline)]">
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
