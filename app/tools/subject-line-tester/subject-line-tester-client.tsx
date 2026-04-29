"use client"

/**
 * Subject Line Tester — 14-factor analyzer.
 *
 * Pure client-side: every metric is computed on each keystroke from a single
 * `analyze(subject)` function. We also expose the analyzer's intermediate
 * weights so the UI can render a per-factor breakdown with status pills and
 * actionable suggestions, not just a number.
 */

import { useId, useMemo, useState } from "react"
import {
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  XCircle,
  Type,
  Hash,
  AtSign,
  Smile,
  HelpCircle,
  Megaphone,
  Clock,
  Eye,
  Zap,
  Shield,
  Users,
  Wand2,
  Star,
} from "lucide-react"
import { ToolWorkbench, PanelHeading, FieldLabel } from "@/components/tools/tool-shell"
import { cn } from "@/lib/utils"

type FactorStatus = "pass" | "warn" | "fail"

type Factor = {
  id: string
  label: string
  icon: typeof CheckCircle2
  status: FactorStatus
  /** Score contribution out of `weight`. */
  score: number
  weight: number
  message: string
}

// Deliberately curated — these are the words a human reviewer flags first.
// Lowercased; we match on word boundaries.
const SPAM_WORDS = [
  "free", "guarantee", "guaranteed", "winner", "won", "cash", "prize",
  "cheap", "discount", "sale", "buy now", "urgent", "act now", "click here",
  "limited time", "100%", "no obligation", "risk-free", "earn money",
  "income", "investment", "apply now", "call now", "credit", "loan",
  "no cost", "no fees", "double your", "amazing",
]

const URGENCY_WORDS = [
  "urgent", "asap", "now", "today", "limited", "expires", "deadline",
  "last chance", "ending soon", "final hours", "tonight",
]

const CURIOSITY_WORDS = [
  "why", "how", "secret", "discovered", "surprising", "what",
  "you won't believe", "the truth", "hidden", "nobody",
]

const GENERIC_OPENERS = [
  "hi", "hello", "hey", "greetings", "to whom", "dear sir", "dear madam",
  "checking in", "following up", "touching base", "circling back",
]

// Non-global RegExps — using `g` here would bleed `lastIndex` across .test()
// calls and produce alternating results across renders.
const PERSONALIZATION_TOKENS = [
  /\{\{?[^}]+\}\}?/,    // {name}, {{first_name}}, {company}
  /\[[^\]]+\]/,         // [name], [Company]
  /%[a-z_]+%/i,         // %first_name%
]

type Analysis = {
  score: number
  grade: "Excellent" | "Strong" | "Average" | "Weak" | "Risky"
  factors: Factor[]
  /** Quick hits the user should fix first. */
  topFixes: string[]
}

function analyze(subject: string): Analysis {
  const trimmed = subject.trim()
  const length = trimmed.length
  const words = trimmed ? trimmed.split(/\s+/) : []
  const wordCount = words.length
  const lowered = trimmed.toLowerCase()

  // Helper: word-boundary regex test for a phrase list
  const matchesAny = (phrases: string[]) =>
    phrases.filter((p) =>
      new RegExp(`(^|\\W)${p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(\\W|$)`, "i").test(lowered),
    )

  const factors: Factor[] = []

  // 1. Length (sweet spot 30–55 chars)
  factors.push((() => {
    if (length === 0) {
      return { id: "length", label: "Length", icon: Type, status: "fail" as FactorStatus, score: 0, weight: 12, message: "Type a subject line to begin." }
    }
    if (length < 20) return { id: "length", label: "Length", icon: Type, status: "warn", score: 6, weight: 12, message: `Only ${length} chars — too short, often reads as low-effort.` }
    if (length > 70) return { id: "length", label: "Length", icon: Type, status: "fail", score: 2, weight: 12, message: `${length} chars — most mobile clients will truncate after ~50.` }
    if (length > 55) return { id: "length", label: "Length", icon: Type, status: "warn", score: 8, weight: 12, message: `${length} chars — fine on desktop but mobile may cut off.` }
    return { id: "length", label: "Length", icon: Type, status: "pass", score: 12, weight: 12, message: `${length} chars — within the mobile-safe 30–55 range.` }
  })())

  // 2. Word count (3–8 ideal)
  factors.push((() => {
    if (wordCount === 0) return { id: "words", label: "Word count", icon: Hash, status: "fail", score: 0, weight: 6, message: "No words yet." }
    if (wordCount < 3) return { id: "words", label: "Word count", icon: Hash, status: "warn", score: 3, weight: 6, message: "Under 3 words usually lacks context." }
    if (wordCount > 10) return { id: "words", label: "Word count", icon: Hash, status: "warn", score: 3, weight: 6, message: `${wordCount} words — try to cut to 6–8.` }
    return { id: "words", label: "Word count", icon: Hash, status: "pass", score: 6, weight: 6, message: `${wordCount} words — comfortable read.` }
  })())

  // 3. Spam triggers
  factors.push((() => {
    const hits = matchesAny(SPAM_WORDS)
    if (hits.length >= 2) return { id: "spam", label: "Spam triggers", icon: Shield, status: "fail", score: 0, weight: 12, message: `Multiple risky words: ${hits.slice(0, 3).join(", ")}.` }
    if (hits.length === 1) return { id: "spam", label: "Spam triggers", icon: Shield, status: "warn", score: 6, weight: 12, message: `Risky word: "${hits[0]}". Consider rephrasing.` }
    return { id: "spam", label: "Spam triggers", icon: Shield, status: "pass", score: 12, weight: 12, message: "No common spam triggers detected." }
  })())

  // 4. ALL CAPS — count uppercase-only words (allowing 1 letter hint)
  factors.push((() => {
    const capsWords = words.filter((w) => w.length > 1 && w === w.toUpperCase() && /[A-Z]/.test(w))
    if (capsWords.length >= 2) return { id: "caps", label: "ALL-CAPS use", icon: Megaphone, status: "fail", score: 0, weight: 8, message: `${capsWords.length} ALL-CAPS words — strong spam signal.` }
    if (capsWords.length === 1) return { id: "caps", label: "ALL-CAPS use", icon: Megaphone, status: "warn", score: 4, weight: 8, message: `1 ALL-CAPS word ("${capsWords[0]}") — use sparingly.` }
    return { id: "caps", label: "ALL-CAPS use", icon: Megaphone, status: "pass", score: 8, weight: 8, message: "No ALL-CAPS words." }
  })())

  // 5. Excessive punctuation (multiple ! or ?)
  factors.push((() => {
    const exclaim = (trimmed.match(/!/g) || []).length
    const question = (trimmed.match(/\?/g) || []).length
    if (exclaim > 1 || /!!/.test(trimmed)) return { id: "punct", label: "Punctuation", icon: AlertTriangle, status: "fail", score: 0, weight: 6, message: `${exclaim} exclamation marks — heavily flagged.` }
    if (exclaim === 1 && question === 0) return { id: "punct", label: "Punctuation", icon: AlertTriangle, status: "warn", score: 3, weight: 6, message: "1 exclamation mark — try removing it; statements convert better." }
    return { id: "punct", label: "Punctuation", icon: AlertTriangle, status: "pass", score: 6, weight: 6, message: "Punctuation looks restrained." }
  })())

  // 6. Personalization tokens
  factors.push((() => {
    const hasToken = PERSONALIZATION_TOKENS.some((re) => re.test(trimmed))
    if (hasToken) return { id: "personal", label: "Personalization", icon: AtSign, status: "pass", score: 10, weight: 10, message: "Personalization token found — good." }
    // Check for first-name-shaped capitalized word at the start
    const startsWithName = /^[A-Z][a-z]{1,15}[\s,]/.test(trimmed)
    if (startsWithName) return { id: "personal", label: "Personalization", icon: AtSign, status: "pass", score: 8, weight: 10, message: "Starts with what looks like a first name — solid." }
    return { id: "personal", label: "Personalization", icon: AtSign, status: "warn", score: 3, weight: 10, message: "No {name} or {company} token. Add one." }
  })())

  // 7. Question vs statement
  factors.push((() => {
    if (/\?$/.test(trimmed)) return { id: "question", label: "Asks a question", icon: HelpCircle, status: "pass", score: 5, weight: 5, message: "Question subjects often beat statements on cold opens." }
    return { id: "question", label: "Asks a question", icon: HelpCircle, status: "warn", score: 3, weight: 5, message: "Statement format — questions tend to outperform on cold." }
  })())

  // 8. Specificity — has a number
  factors.push((() => {
    const numbers = trimmed.match(/\b\d{1,4}%?\b/g)
    if (numbers && numbers.length > 0) return { id: "specificity", label: "Specific number", icon: Star, status: "pass", score: 8, weight: 8, message: `Includes specific number: ${numbers[0]}.` }
    return { id: "specificity", label: "Specific number", icon: Star, status: "warn", score: 3, weight: 8, message: "No number — specific numbers boost credibility." }
  })())

  // 9. Curiosity gap
  factors.push((() => {
    const hits = matchesAny(CURIOSITY_WORDS)
    if (hits.length > 0) return { id: "curiosity", label: "Curiosity gap", icon: Eye, status: "pass", score: 6, weight: 6, message: `Curiosity word: "${hits[0]}".` }
    return { id: "curiosity", label: "Curiosity gap", icon: Eye, status: "warn", score: 3, weight: 6, message: "No curiosity hook — consider 'why', 'how', or a teaser." }
  })())

  // 10. Urgency
  factors.push((() => {
    const hits = matchesAny(URGENCY_WORDS)
    if (hits.length >= 2) return { id: "urgency", label: "Urgency", icon: Clock, status: "warn", score: 2, weight: 5, message: "Heavy urgency reads as pressure on cold opens." }
    if (hits.length === 1) return { id: "urgency", label: "Urgency", icon: Clock, status: "pass", score: 5, weight: 5, message: `Light urgency ("${hits[0]}") — appropriate.` }
    return { id: "urgency", label: "Urgency", icon: Clock, status: "pass", score: 4, weight: 5, message: "No urgency — that's fine for cold." }
  })())

  // 11. Emoji count
  factors.push((() => {
    // eslint-disable-next-line no-misleading-character-class
    const emoji = trimmed.match(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu)
    const count = emoji?.length ?? 0
    if (count === 0) return { id: "emoji", label: "Emoji use", icon: Smile, status: "pass", score: 5, weight: 5, message: "No emoji — safe default for B2B cold." }
    if (count === 1) return { id: "emoji", label: "Emoji use", icon: Smile, status: "warn", score: 3, weight: 5, message: "1 emoji — A/B test against an emoji-free version." }
    return { id: "emoji", label: "Emoji use", icon: Smile, status: "fail", score: 1, weight: 5, message: `${count} emoji — usually too much for B2B.` }
  })())

  // 12. Sentence case vs Title Case
  factors.push((() => {
    if (length < 5) return { id: "case", label: "Casing", icon: Wand2, status: "warn", score: 2, weight: 5, message: "Too short to evaluate." }
    const titleCaseScore = words.filter((w) => /^[A-Z][a-z]+/.test(w) && w.length > 2).length
    const lowerScore = words.filter((w) => /^[a-z]+/.test(w) && w.length > 2).length
    if (titleCaseScore > 3 && titleCaseScore > lowerScore) {
      return { id: "case", label: "Casing", icon: Wand2, status: "warn", score: 2, weight: 5, message: "Title Case looks like a marketing email — sentence case wins on cold." }
    }
    return { id: "case", label: "Casing", icon: Wand2, status: "pass", score: 5, weight: 5, message: "Sentence case — reads like a personal email." }
  })())

  // 13. Generic opener detection (full-string match)
  factors.push((() => {
    const startsGeneric = GENERIC_OPENERS.some((g) =>
      lowered === g || lowered.startsWith(g + " ") || lowered.startsWith(g + ","),
    )
    if (startsGeneric) return { id: "generic", label: "Generic opener", icon: Users, status: "fail", score: 0, weight: 6, message: "'Checking in' / 'Following up' style openers get archived." }
    return { id: "generic", label: "Generic opener", icon: Users, status: "pass", score: 6, weight: 6, message: "No tired follow-up phrasing." }
  })())

  // 14. Reads like a real human note (no $ or ALL CAPS-y MARKETING tone)
  factors.push((() => {
    const dollar = /\$/.test(trimmed)
    if (dollar) return { id: "human", label: "Sounds human", icon: Zap, status: "warn", score: 2, weight: 6, message: "$ symbols feel transactional. Try writing the number out." }
    const startsLower = /^[a-z]/.test(trimmed)
    if (startsLower) return { id: "human", label: "Sounds human", icon: Zap, status: "pass", score: 6, weight: 6, message: "Starts lowercase — often reads as a forwarded reply (great)." }
    return { id: "human", label: "Sounds human", icon: Zap, status: "pass", score: 5, weight: 6, message: "Tone reads natural." }
  })())

  const totalWeight = factors.reduce((a, f) => a + f.weight, 0)
  const earned = factors.reduce((a, f) => a + f.score, 0)
  const score = Math.round((earned / totalWeight) * 100)

  let grade: Analysis["grade"] = "Risky"
  if (score >= 85) grade = "Excellent"
  else if (score >= 70) grade = "Strong"
  else if (score >= 55) grade = "Average"
  else if (score >= 35) grade = "Weak"

  const topFixes = factors
    .filter((f) => f.status !== "pass")
    .sort((a, b) => b.weight - b.score - (a.weight - a.score))
    .slice(0, 3)
    .map((f) => f.message)

  return { score, grade, factors, topFixes }
}

const SAMPLE_SUBJECTS = [
  "Quick question on your Q4 outbound",
  "{{first_name}} — saw the new pricing page",
  "URGENT: 50% OFF Limited Time Offer!!!",
  "How Acme cut their CAC by 32%",
]

function StatusPill({ status }: { status: FactorStatus }) {
  if (status === "pass")
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.12em] text-emerald-700">
        <CheckCircle2 className="size-3" /> Pass
      </span>
    )
  if (status === "warn")
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.12em] text-amber-700">
        <AlertTriangle className="size-3" /> Warn
      </span>
    )
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-1.5 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.12em] text-rose-700">
      <XCircle className="size-3" /> Fail
    </span>
  )
}

function ScoreRing({ score, grade }: { score: number; grade: Analysis["grade"] }) {
  const pct = Math.max(0, Math.min(100, score))
  const r = 52
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ
  const stroke =
    grade === "Excellent"
      ? "stroke-emerald-500"
      : grade === "Strong"
        ? "stroke-[oklch(0.55_0.13_78)]"
        : grade === "Average"
          ? "stroke-amber-500"
          : "stroke-rose-500"
  return (
    <div className="relative inline-flex size-[136px] shrink-0 items-center justify-center">
      <svg viewBox="0 0 120 120" className="size-full -rotate-90">
        <circle cx="60" cy="60" r={r} className="fill-none stroke-ink-08" strokeWidth="10" />
        <circle
          cx="60" cy="60" r={r}
          className={cn("fill-none transition-[stroke-dashoffset] duration-500", stroke)}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-[34px] font-medium tabular-nums leading-none text-ink">{pct}</span>
        <span className="mt-1 text-[10.5px] uppercase tracking-[0.18em] text-ink-40">{grade}</span>
      </div>
    </div>
  )
}

export function SubjectLineTesterClient() {
  const id = useId()
  const [subject, setSubject] = useState("Quick question on your Q4 outbound")
  const analysis = useMemo(() => analyze(subject), [subject])
  const isEmpty = subject.trim().length === 0

  return (
    <ToolWorkbench
      inputs={
        <>
          <PanelHeading
            step="Step 01"
            title="Subject line"
            hint="Type or paste — analysis runs in your browser as you type."
            rightSlot={
              <span className="rounded-full border border-ink-08 px-2 py-0.5 font-mono text-[10.5px] tabular-nums text-ink-60">
                {subject.length} / 70
              </span>
            }
          />
          <FieldLabel htmlFor={`${id}-subject`} label="Your subject line">
            <input
              id={`${id}-subject`}
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              maxLength={120}
              spellCheck="true"
              suppressHydrationWarning
              placeholder="Quick question on your Q4 outbound"
              className="w-full rounded-xl border border-ink-08 bg-background px-4 py-3.5 text-[16px] text-ink shadow-[inset_0_1px_0_rgba(0,0,0,0.02)] outline-none transition-all placeholder:text-ink-40 focus:border-ink/30 focus:ring-2 focus:ring-[oklch(0.55_0.13_78)]/20"
            />
          </FieldLabel>

          <div className="mt-6">
            <p className="text-[11.5px] font-medium uppercase tracking-[0.14em] text-ink-60">
              Try a sample
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {SAMPLE_SUBJECTS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSubject(s)}
                  className="rounded-full border border-ink-08 bg-background px-3 py-1.5 text-[12.5px] text-ink-60 transition-colors hover:border-ink/25 hover:text-ink"
                >
                  {s.length > 36 ? s.slice(0, 34) + "…" : s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7 rounded-xl border border-ink-08 bg-background p-5">
            <p className="text-[11.5px] font-medium uppercase tracking-[0.14em] text-ink-60">
              Top fixes
            </p>
            {isEmpty ? (
              <p className="mt-3 text-[13.5px] leading-[1.55] text-ink-40">
                Type a subject line — we'll surface the highest-impact rewrites here.
              </p>
            ) : analysis.topFixes.length === 0 ? (
              <p className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] text-emerald-700">
                <CheckCircle2 className="size-4" />
                Looks great — nothing critical to change.
              </p>
            ) : (
              <ol className="mt-3 space-y-2">
                {analysis.topFixes.map((f, i) => (
                  <li key={i} className="flex gap-2 text-[13.5px] leading-[1.55] text-ink">
                    <span className="font-mono text-ink-40 tabular-nums">0{i + 1}</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </>
      }
      results={
        <>
          <PanelHeading
            step="Step 02"
            title="Open-rate score"
            hint="Weighted across 14 deliverability and engagement factors."
          />
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <ScoreRing score={analysis.score} grade={analysis.grade} />
            <div className="flex-1">
              <p className="text-[11.5px] font-medium uppercase tracking-[0.14em] text-ink-40">
                Verdict
              </p>
              <p className="mt-2 text-[18px] leading-[1.4] text-ink">
                {isEmpty
                  ? "Type a subject line to see your score."
                  : analysis.grade === "Excellent"
                    ? "This one's ready to send. Strong on every key factor."
                    : analysis.grade === "Strong"
                      ? "Solid subject line — small tweaks could push it higher."
                      : analysis.grade === "Average"
                        ? "Lands somewhere in the middle. Apply the top fixes."
                        : analysis.grade === "Weak"
                          ? "Likely to underperform. Address the warnings below."
                          : "High risk of low opens or spam folder. Rewrite recommended."}
              </p>
              <p className="mt-2 text-[13px] leading-[1.55] text-ink-60">
                Cold benchmarks: 35–55% open rate on a warmed-up domain to a clean list.
              </p>
            </div>
          </div>

          <div className="mt-7">
            <p className="mb-3 text-[11.5px] font-medium uppercase tracking-[0.14em] text-ink-60">
              14-factor breakdown
            </p>
            <ul className="divide-y divide-ink-08 border-y border-ink-08">
              {analysis.factors.map((f) => {
                const FIcon = f.icon
                return (
                  <li key={f.id} className="flex items-start gap-3 py-3">
                    <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-lg border border-ink-08 bg-background text-ink-60">
                      <FIcon className="size-3.5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[13.5px] font-medium text-ink">{f.label}</span>
                        <StatusPill status={f.status} />
                        <span className="ml-auto font-mono text-[11.5px] tabular-nums text-ink-40">
                          {f.score}/{f.weight}
                        </span>
                      </div>
                      <p className="mt-1 text-[12.5px] leading-[1.55] text-ink-60">
                        {f.message}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </>
      }
    />
  )
}
