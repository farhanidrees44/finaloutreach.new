"use client"

/**
 * Spam Word Checker — inline highlighter + risk score.
 *
 * The interesting bit is that we render the user's own text below the input,
 * with each detected risk wrapped in a colored span. The user can keep typing
 * in the textarea above; the highlighted preview stays in sync.
 *
 * Categories are weighted; we expose category-level counts so the right pane
 * can show "you have 4 spam words and 2 ALL-CAPS runs" rather than a single
 * opaque number.
 */

import { useId, useMemo, useState } from "react"
import {
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Megaphone,
  DollarSign,
  Link as LinkIcon,
  Sparkles,
  Mailbox,
} from "lucide-react"
import { ToolWorkbench, PanelHeading, FieldLabel } from "@/components/tools/tool-shell"
import { cn } from "@/lib/utils"

type Severity = "high" | "medium" | "low"
type Category = "spam" | "money" | "urgency" | "caps" | "punct" | "links"

type Match = {
  start: number
  end: number
  text: string
  category: Category
  severity: Severity
  reason: string
}

const SPAM_PHRASES: { phrase: string; severity: Severity }[] = [
  { phrase: "free money", severity: "high" },
  { phrase: "act now", severity: "high" },
  { phrase: "no obligation", severity: "high" },
  { phrase: "risk-free", severity: "high" },
  { phrase: "100% free", severity: "high" },
  { phrase: "click here", severity: "high" },
  { phrase: "buy now", severity: "high" },
  { phrase: "limited time", severity: "high" },
  { phrase: "limited time offer", severity: "high" },
  { phrase: "as seen on", severity: "medium" },
  { phrase: "lowest price", severity: "medium" },
  { phrase: "best price", severity: "medium" },
  { phrase: "hidden charges", severity: "medium" },
  { phrase: "double your", severity: "medium" },
  { phrase: "cash bonus", severity: "high" },
  { phrase: "earn extra cash", severity: "high" },
  { phrase: "pre-approved", severity: "medium" },
  { phrase: "winner", severity: "medium" },
  { phrase: "you've been selected", severity: "high" },
  { phrase: "congratulations", severity: "medium" },
  { phrase: "guarantee", severity: "medium" },
  { phrase: "guaranteed", severity: "medium" },
  { phrase: "earn money", severity: "high" },
  { phrase: "make money", severity: "high" },
  { phrase: "increase sales", severity: "low" },
  { phrase: "no cost", severity: "medium" },
  { phrase: "amazing", severity: "low" },
  { phrase: "all natural", severity: "low" },
  { phrase: "unbelievable", severity: "medium" },
  { phrase: "incredible deal", severity: "medium" },
]

const URGENCY_PHRASES: { phrase: string; severity: Severity }[] = [
  { phrase: "urgent", severity: "medium" },
  { phrase: "asap", severity: "low" },
  { phrase: "expires soon", severity: "high" },
  { phrase: "ending soon", severity: "high" },
  { phrase: "last chance", severity: "high" },
  { phrase: "deadline", severity: "low" },
  { phrase: "while supplies last", severity: "high" },
]

type Report = {
  riskScore: number  // 0 (safe) → 100 (very risky)
  level: "Low" | "Medium" | "High"
  categories: { category: Category; label: string; count: number; icon: typeof ShieldAlert }[]
  matches: Match[]
  summary: string
}

const CATEGORY_META: Record<Category, { label: string; weight: Record<Severity, number>; icon: typeof ShieldAlert }> = {
  spam:    { label: "Spam phrases",     weight: { high: 12, medium: 7, low: 3 }, icon: ShieldAlert },
  money:   { label: "Money signals",    weight: { high: 10, medium: 6, low: 2 }, icon: DollarSign },
  urgency: { label: "Urgency / pressure", weight: { high: 8, medium: 5, low: 2 }, icon: AlertTriangle },
  caps:    { label: "ALL-CAPS runs",    weight: { high: 8, medium: 5, low: 2 }, icon: Megaphone },
  punct:   { label: "Excess punctuation", weight: { high: 6, medium: 4, low: 1 }, icon: AlertTriangle },
  links:   { label: "Excess links",     weight: { high: 8, medium: 5, low: 2 }, icon: LinkIcon },
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function findPhraseMatches(
  text: string,
  list: { phrase: string; severity: Severity }[],
  category: Category,
): Match[] {
  const out: Match[] = []
  for (const { phrase, severity } of list) {
    const re = new RegExp(`\\b${escapeRegExp(phrase)}\\b`, "gi")
    let m: RegExpExecArray | null
    while ((m = re.exec(text)) !== null) {
      out.push({
        start: m.index,
        end: m.index + m[0].length,
        text: m[0],
        category,
        severity,
        reason:
          category === "spam"
            ? `"${m[0]}" is a known spam-trigger phrase.`
            : category === "money"
              ? `"${m[0]}" is associated with promotional/money mail.`
              : `"${m[0]}" reads as urgency or pressure.`,
      })
    }
  }
  return out
}

function findCapsRuns(text: string): Match[] {
  // 3+ consecutive uppercase letters (allowing spaces/dashes between letters)
  const re = /\b([A-Z]{3,}(?:[\s'-]+[A-Z]{2,})*)\b/g
  const out: Match[] = []
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    // Skip ordinary acronyms like API, SaaS, ROI when 4 chars or fewer and isolated
    if (m[0].replace(/\s+/g, "").length <= 4) continue
    out.push({
      start: m.index,
      end: m.index + m[0].length,
      text: m[0],
      category: "caps",
      severity: m[0].length > 8 ? "high" : "medium",
      reason: "ALL-CAPS run — strong spam signal in body copy.",
    })
  }
  return out
}

function findPunctRuns(text: string): Match[] {
  const re = /([!?]{2,}|\.{3,})/g
  const out: Match[] = []
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    out.push({
      start: m.index,
      end: m.index + m[0].length,
      text: m[0],
      category: "punct",
      severity: m[0].length >= 3 ? "high" : "medium",
      reason: "Excessive punctuation — feels like marketing copy.",
    })
  }
  return out
}

function findLinks(text: string): Match[] {
  const re = /https?:\/\/\S+/gi
  const matches: Match[] = []
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    matches.push({
      start: m.index,
      end: m.index + m[0].length,
      text: m[0],
      category: "links",
      severity: "low",
      reason: "Link — fine in moderation.",
    })
  }
  // Severity escalates if there are 2+ links
  if (matches.length >= 3) {
    return matches.map((m) => ({ ...m, severity: "high", reason: "3+ links — common spam pattern." }))
  }
  if (matches.length === 2) {
    return matches.map((m) => ({ ...m, severity: "medium", reason: "Multiple links — keep one CTA, max." }))
  }
  return matches
}

// Money signals: $123, "100%" off, prices
function findMoneyMatches(text: string): Match[] {
  const out: Match[] = []
  const re1 = /\$\s?\d{1,6}([,.\d]+)?/g
  const re2 = /\b\d{1,3}%\s*(off|free|discount)\b/gi
  for (const re of [re1, re2]) {
    let m: RegExpExecArray | null
    while ((m = re.exec(text)) !== null) {
      out.push({
        start: m.index,
        end: m.index + m[0].length,
        text: m[0],
        category: "money",
        severity: "medium",
        reason: `"${m[0]}" — money/price signal common in promotional mail.`,
      })
    }
  }
  return out
}

function analyze(text: string): Report {
  if (!text.trim()) {
    return {
      riskScore: 0,
      level: "Low",
      categories: (["spam", "money", "urgency", "caps", "punct", "links"] as Category[]).map((c) => ({
        category: c, label: CATEGORY_META[c].label, count: 0, icon: CATEGORY_META[c].icon,
      })),
      matches: [],
      summary: "Drop in your email body to start.",
    }
  }

  const all: Match[] = [
    ...findPhraseMatches(text, SPAM_PHRASES, "spam"),
    ...findPhraseMatches(text, URGENCY_PHRASES, "urgency"),
    ...findCapsRuns(text),
    ...findPunctRuns(text),
    ...findLinks(text),
    ...findMoneyMatches(text),
  ].sort((a, b) => a.start - b.start)

  // Resolve overlaps: keep the higher-severity / earlier match
  const resolved: Match[] = []
  for (const m of all) {
    const prev = resolved[resolved.length - 1]
    if (prev && m.start < prev.end) {
      // Skip overlapping match
      continue
    }
    resolved.push(m)
  }

  // Compute weighted risk
  let raw = 0
  for (const m of resolved) {
    raw += CATEGORY_META[m.category].weight[m.severity]
  }
  // Normalize: 60+ raw points = max risk
  const riskScore = Math.min(100, Math.round((raw / 60) * 100))
  const level: Report["level"] =
    riskScore >= 60 ? "High" : riskScore >= 25 ? "Medium" : "Low"

  const categories = (["spam", "money", "urgency", "caps", "punct", "links"] as Category[]).map((c) => ({
    category: c,
    label: CATEGORY_META[c].label,
    count: resolved.filter((m) => m.category === c).length,
    icon: CATEGORY_META[c].icon,
  }))

  let summary = ""
  if (resolved.length === 0) summary = "Looks clean. No common spam triggers detected."
  else if (level === "High") summary = `Found ${resolved.length} risk${resolved.length > 1 ? "s" : ""} — likely to land in spam.`
  else if (level === "Medium") summary = `Found ${resolved.length} risk${resolved.length > 1 ? "s" : ""} — borderline. Trim the highlighted phrases.`
  else summary = `Found ${resolved.length} minor risk${resolved.length > 1 ? "s" : ""}. Should still inbox if domain reputation is healthy.`

  return { riskScore, level, categories, matches: resolved, summary }
}

const SAMPLE_BODY = `Hi {{first_name}},

Quick one — saw Acme just hired its first head of demand gen. Congratulations!

We help SaaS teams in your stage book 30+ qualified meetings per month using cold email + LinkedIn. Worth a 15-min chat next week?

— Sarah`

const SAMPLE_BAD = `URGENT!!! ACT NOW — 100% FREE limited time offer!!!

Hi friend,

You've been selected for an AMAZING DEAL. Earn money risk-free — no cost, no obligation. Click here to claim your $5000 cash bonus before this incredible deal expires soon!!!

https://promo.example.com/winner
https://offer.example.com/claim
https://promo.example.com/today`

function HighlightedPreview({ text, matches }: { text: string; matches: Match[] }) {
  const parts: { key: string; node: React.ReactNode }[] = []
  let cursor = 0
  matches.forEach((m, i) => {
    if (m.start > cursor) {
      parts.push({ key: `t-${i}`, node: text.slice(cursor, m.start) })
    }
    const sevClass =
      m.severity === "high"
        ? "bg-rose-100 text-rose-900 ring-rose-200"
        : m.severity === "medium"
          ? "bg-amber-100 text-amber-900 ring-amber-200"
          : "bg-sky-50 text-sky-900 ring-sky-200"
    parts.push({
      key: `m-${i}`,
      node: (
        <mark
          title={m.reason}
          className={cn(
            "rounded-[4px] px-0.5 py-px ring-1 ring-inset transition-colors",
            sevClass,
          )}
        >
          {text.slice(m.start, m.end)}
        </mark>
      ),
    })
    cursor = m.end
  })
  if (cursor < text.length) {
    parts.push({ key: "t-end", node: text.slice(cursor) })
  }
  return (
    <pre className="whitespace-pre-wrap break-words font-sans text-[14px] leading-[1.65] text-ink">
      {parts.map((p) => (
        <span key={p.key}>{p.node}</span>
      ))}
    </pre>
  )
}

function RiskBadge({ level, score }: { level: Report["level"]; score: number }) {
  const styles =
    level === "Low"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : level === "Medium"
        ? "border-amber-200 bg-amber-50 text-amber-700"
        : "border-rose-200 bg-rose-50 text-rose-700"
  return (
    <div className={cn("flex items-center gap-3 rounded-2xl border px-4 py-3", styles)}>
      <span className="font-mono text-[28px] font-medium tabular-nums leading-none">{score}</span>
      <div>
        <p className="text-[10.5px] font-medium uppercase tracking-[0.18em] opacity-70">
          Risk score
        </p>
        <p className="text-[15px] font-medium leading-tight">{level} risk</p>
      </div>
    </div>
  )
}

export function SpamWordCheckerClient() {
  const id = useId()
  const [text, setText] = useState(SAMPLE_BODY)
  const report = useMemo(() => analyze(text), [text])

  return (
    <ToolWorkbench
      inputs={
        <>
          <PanelHeading
            step="Step 01"
            title="Email body"
            hint="Paste the full body (or subject + body). Highlights update live."
            rightSlot={
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setText(SAMPLE_BODY)}
                  className="rounded-full border border-ink-08 bg-background px-2.5 py-1 text-[11px] font-medium text-ink-60 transition-colors hover:border-ink/25 hover:text-ink"
                >
                  Clean sample
                </button>
                <button
                  type="button"
                  onClick={() => setText(SAMPLE_BAD)}
                  className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-[11px] font-medium text-rose-700 transition-colors hover:bg-rose-100"
                >
                  Bad sample
                </button>
              </div>
            }
          />
          <FieldLabel htmlFor={`${id}-body`} label="Your email">
            <textarea
              id={`${id}-body`}
              value={text}
              onChange={(e) => setText(e.target.value)}
              spellCheck="true"
              suppressHydrationWarning
              rows={14}
              className="w-full resize-y rounded-xl border border-ink-08 bg-background px-4 py-3 font-sans text-[14.5px] leading-[1.6] text-ink shadow-[inset_0_1px_0_rgba(0,0,0,0.02)] outline-none transition-all placeholder:text-ink-40 focus:border-ink/30 focus:ring-2 focus:ring-[oklch(0.55_0.13_78)]/20"
              placeholder="Paste your cold email here…"
            />
          </FieldLabel>

          <p className="mt-3 text-[12px] leading-[1.5] text-ink-40">
            Word count: {text.trim() ? text.trim().split(/\s+/).length : 0} ·
            Character count: {text.length}
          </p>
        </>
      }
      results={
        <>
          <PanelHeading
            step="Step 02"
            title="Risk report"
            hint="Highlights map onto your text — hover any mark for the reason."
          />

          <div className="flex flex-wrap items-center gap-4">
            <RiskBadge level={report.level} score={report.riskScore} />
            <p className="flex-1 text-[14px] leading-[1.5] text-ink">
              {report.summary}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {report.categories.map((c) => {
              const Ic = c.icon
              return (
                <div
                  key={c.category}
                  className={cn(
                    "rounded-xl border p-3",
                    c.count === 0
                      ? "border-ink-08 bg-background text-ink-60"
                      : "border-amber-200 bg-amber-50/40 text-ink",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Ic className={cn("size-3.5", c.count === 0 ? "text-ink-40" : "text-amber-600")} />
                    <span className="text-[10.5px] font-medium uppercase tracking-[0.14em]">
                      {c.label}
                    </span>
                  </div>
                  <p className="mt-1.5 font-mono text-[20px] tabular-nums leading-none text-ink">
                    {c.count}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="mt-6 rounded-xl border border-ink-08 bg-background p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[11.5px] font-medium uppercase tracking-[0.14em] text-ink-60">
                Highlighted preview
              </p>
              <span className="font-mono text-[10.5px] text-ink-40">
                {report.matches.length} match{report.matches.length === 1 ? "" : "es"}
              </span>
            </div>
            {text.trim() ? (
              <HighlightedPreview text={text} matches={report.matches} />
            ) : (
              <p className="text-[13.5px] text-ink-40">Nothing to preview yet.</p>
            )}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-[11.5px] text-ink-60">
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block size-3 rounded ring-1 ring-rose-200 bg-rose-100" /> High risk
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block size-3 rounded ring-1 ring-amber-200 bg-amber-100" /> Medium
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block size-3 rounded ring-1 ring-sky-200 bg-sky-50" /> Low
            </span>
          </div>
        </>
      }
    />
  )
}
