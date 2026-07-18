/**
 * Cold email subject-line scoring engine.
 * Fully client-side / deterministic — no network calls.
 *
 * Returns a typed result so future batch/sequence tools can reuse it.
 */

export type FactorStatus = "pass" | "warn" | "fail"
export type FactorTier = "deliverability" | "engagement"

export type SubjectLineFactor = {
  id: string
  label: string
  tier: FactorTier
  status: FactorStatus
  /** Points earned toward `weight`. */
  score: number
  /** Max points this factor can contribute. All weights sum to 100. */
  weight: number
  message: string
  /** Optional one-line rewrite hint. */
  exampleFix?: string
}

export type SubjectLineGrade =
  | "Excellent"
  | "Strong"
  | "Average"
  | "Weak"
  | "Risky"

export type SubjectLineAnalysis = {
  score: number
  grade: SubjectLineGrade
  factors: SubjectLineFactor[]
  deliverability: SubjectLineFactor[]
  engagement: SubjectLineFactor[]
  topFixes: string[]
  charCount: number
  wordCount: number
  preview30: string
  preview55: string
  truncatedAt30: boolean
  truncatedAt55: boolean
}

const SPAM_WORDS = [
  "free",
  "guarantee",
  "guaranteed",
  "winner",
  "won",
  "cash",
  "prize",
  "cheap",
  "discount",
  "sale",
  "buy now",
  "urgent",
  "act now",
  "click here",
  "limited time",
  "100%",
  "no obligation",
  "risk-free",
  "earn money",
  "income",
  "investment",
  "apply now",
  "call now",
  "credit",
  "loan",
  "no cost",
  "no fees",
  "double your",
  "amazing",
]

const URGENCY_WORDS = [
  "urgent",
  "asap",
  "now",
  "today",
  "limited",
  "expires",
  "deadline",
  "last chance",
  "ending soon",
  "final hours",
  "tonight",
]

const CURIOSITY_WORDS = [
  "why",
  "how",
  "secret",
  "discovered",
  "surprising",
  "what",
  "you won't believe",
  "the truth",
  "hidden",
  "nobody",
]

const GENERIC_OPENERS = [
  "hi",
  "hello",
  "hey",
  "greetings",
  "to whom",
  "dear sir",
  "dear madam",
  "checking in",
  "following up",
  "touching base",
  "circling back",
]

/** Broken / unresolved merge-tag patterns common in cold tools. */
const BROKEN_MERGE = [
  /\{\{[^}]+\}\}/,
  /\{[a-z_][a-z0-9_]*\}/i,
  /\[[A-Z][A-Za-z0-9_ ]*\]/,
  /%[A-Z_]+%/i,
  /\{\%[a-z_]+\%\}/i,
]

/** Weak first-name-only style tokens (still better than nothing, scored lower). */
const WEAK_NAME_TOKEN = /\{\{?\s*(first[_\s]?name|fname|name)\s*\}\}?/i

/** Stronger company/role/trigger personalization. */
const STRONG_PERSONAL = [
  /\{\{?\s*(company|company_name|org|organization)\s*\}\}?/i,
  /\{\{?\s*(title|role|job_title)\s*\}\}?/i,
  /\{\{?\s*(recent[_\s]?news|trigger|event|funding)\s*\}\}?/i,
  /\[[^\]]*(company|role|title|funding)[^\]]*\]/i,
]

function matchesAny(lowered: string, phrases: string[]): string[] {
  return phrases.filter((p) =>
    new RegExp(
      `(^|\\W)${p.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}(\\W|$)`,
      "i",
    ).test(lowered),
  )
}

function truncatePreview(text: string, max: number): {
  preview: string
  truncated: boolean
} {
  if (text.length <= max) return { preview: text, truncated: false }
  return { preview: text.slice(0, Math.max(0, max - 1)) + "…", truncated: true }
}

export function analyzeSubjectLine(subject: string): SubjectLineAnalysis {
  const trimmed = subject.trim()
  const length = trimmed.length
  const words = trimmed ? trimmed.split(/\s+/) : []
  const wordCount = words.length
  const lowered = trimmed.toLowerCase()

  const factors: SubjectLineFactor[] = []

  // —— Deliverability ——

  // Length (2–7 words ideal for cold; 30–55 chars mobile-safe)
  factors.push((() => {
    if (length === 0) {
      return {
        id: "length",
        label: "Length",
        tier: "deliverability" as const,
        status: "fail" as FactorStatus,
        score: 0,
        weight: 10,
        message: "Type a subject line to begin.",
      }
    }
    if (length < 20) {
      return {
        id: "length",
        label: "Length",
        tier: "deliverability",
        status: "warn",
        score: 5,
        weight: 10,
        message: `Only ${length} chars — often reads as low-effort on cold.`,
        exampleFix: "Add a specific company detail or number.",
      }
    }
    if (length > 70) {
      return {
        id: "length",
        label: "Length",
        tier: "deliverability",
        status: "fail",
        score: 2,
        weight: 10,
        message: `${length} chars — mobile clients truncate hard after ~50–55.`,
        exampleFix: "Cut to under 55 characters.",
      }
    }
    if (length > 55) {
      return {
        id: "length",
        label: "Length",
        tier: "deliverability",
        status: "warn",
        score: 7,
        weight: 10,
        message: `${length} chars — desktop OK, mobile may cut the ending.`,
      }
    }
    return {
      id: "length",
      label: "Length",
      tier: "deliverability",
      status: "pass",
      score: 10,
      weight: 10,
      message: `${length} chars — within the mobile-safe cold range.`,
    }
  })())

  // Word count — cold prefers 2–7
  factors.push((() => {
    if (wordCount === 0) {
      return {
        id: "words",
        label: "Word count",
        tier: "deliverability",
        status: "fail",
        score: 0,
        weight: 5,
        message: "No words yet.",
      }
    }
    if (wordCount >= 2 && wordCount <= 7) {
      return {
        id: "words",
        label: "Word count",
        tier: "deliverability",
        status: "pass",
        score: 5,
        weight: 5,
        message: `${wordCount} words — cold email sweet spot (2–7).`,
      }
    }
    if (wordCount === 1) {
      return {
        id: "words",
        label: "Word count",
        tier: "deliverability",
        status: "warn",
        score: 3,
        weight: 5,
        message: "One word can work as a pattern interrupt — A/B it.",
      }
    }
    return {
      id: "words",
      label: "Word count",
      tier: "deliverability",
      status: "warn",
      score: 2,
      weight: 5,
      message: `${wordCount} words — cold performance usually drops past 7.`,
      exampleFix: "Trim to 2–7 words.",
    }
  })())

  // Spam
  factors.push((() => {
    const hits = matchesAny(lowered, SPAM_WORDS)
    if (hits.length >= 2) {
      return {
        id: "spam",
        label: "Spam triggers",
        tier: "deliverability",
        status: "fail",
        score: 0,
        weight: 12,
        message: `Multiple risky words: ${hits.slice(0, 3).join(", ")}.`,
        exampleFix: "Rewrite without sales-y trigger phrases.",
      }
    }
    if (hits.length === 1) {
      return {
        id: "spam",
        label: "Spam triggers",
        tier: "deliverability",
        status: "warn",
        score: 6,
        weight: 12,
        message: `Risky word: "${hits[0]}". Stronger spam-filter risk on cold than newsletters.`,
      }
    }
    return {
      id: "spam",
      label: "Spam triggers",
      tier: "deliverability",
      status: "pass",
      score: 12,
      weight: 12,
      message: "No common spam triggers detected.",
    }
  })())

  // ALL CAPS
  factors.push((() => {
    const capsWords = words.filter(
      (w) => w.length > 1 && w === w.toUpperCase() && /[A-Z]/.test(w),
    )
    if (capsWords.length >= 2) {
      return {
        id: "caps",
        label: "ALL-CAPS use",
        tier: "deliverability",
        status: "fail",
        score: 0,
        weight: 8,
        message: `${capsWords.length} ALL-CAPS words — spam signal + lower opens.`,
      }
    }
    if (capsWords.length === 1) {
      return {
        id: "caps",
        label: "ALL-CAPS use",
        tier: "deliverability",
        status: "warn",
        score: 4,
        weight: 8,
        message: `1 ALL-CAPS word ("${capsWords[0]}") — use sparingly.`,
      }
    }
    return {
      id: "caps",
      label: "ALL-CAPS use",
      tier: "deliverability",
      status: "pass",
      score: 8,
      weight: 8,
      message: "No ALL-CAPS words.",
    }
  })())

  // Punctuation
  factors.push((() => {
    const exclaim = (trimmed.match(/!/g) || []).length
    if (exclaim > 1 || /!!/.test(trimmed)) {
      return {
        id: "punct",
        label: "Punctuation",
        tier: "deliverability",
        status: "fail",
        score: 0,
        weight: 6,
        message: `${exclaim} exclamation marks — heavily flagged on cold.`,
      }
    }
    if (exclaim === 1) {
      return {
        id: "punct",
        label: "Punctuation",
        tier: "deliverability",
        status: "warn",
        score: 3,
        weight: 6,
        message: "1 exclamation mark — statements usually convert better on cold.",
      }
    }
    return {
      id: "punct",
      label: "Punctuation",
      tier: "deliverability",
      status: "pass",
      score: 6,
      weight: 6,
      message: "Punctuation looks restrained.",
    }
  })())

  // Emoji — colder risk than newsletters
  factors.push((() => {
    const emoji = trimmed.match(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu)
    const count = emoji?.length ?? 0
    if (count === 0) {
      return {
        id: "emoji",
        label: "Emoji use",
        tier: "deliverability",
        status: "pass",
        score: 5,
        weight: 5,
        message: "No emoji — safest default for B2B cold.",
      }
    }
    if (count === 1) {
      return {
        id: "emoji",
        label: "Emoji use",
        tier: "deliverability",
        status: "warn",
        score: 2,
        weight: 5,
        message:
          "1 emoji — more spam-filter risk on cold than on opted-in newsletters.",
        exampleFix: "A/B against an emoji-free version.",
      }
    }
    return {
      id: "emoji",
      label: "Emoji use",
      tier: "deliverability",
      status: "fail",
      score: 0,
      weight: 5,
      message: `${count} emoji — usually too much for B2B cold.`,
    }
  })())

  // Merge tag risk (NEW)
  factors.push((() => {
    const broken = BROKEN_MERGE.some((re) => re.test(trimmed))
    if (broken) {
      return {
        id: "merge",
        label: "Merge tag risk",
        tier: "deliverability",
        status: "fail",
        score: 0,
        weight: 8,
        message:
          "Unresolved merge-tag syntax detected — would send as literal {{tokens}}.",
        exampleFix: "Render tokens before send, or remove the braces.",
      }
    }
    return {
      id: "merge",
      label: "Merge tag risk",
      tier: "deliverability",
      status: "pass",
      score: 8,
      weight: 8,
      message: "No broken merge-tag syntax.",
    }
  })())

  // Casing
  factors.push((() => {
    if (length < 5) {
      return {
        id: "case",
        label: "Casing",
        tier: "deliverability",
        status: "warn",
        score: 2,
        weight: 5,
        message: "Too short to evaluate casing.",
      }
    }
    const titleCaseScore = words.filter(
      (w) => /^[A-Z][a-z]+/.test(w) && w.length > 2,
    ).length
    const lowerScore = words.filter(
      (w) => /^[a-z]+/.test(w) && w.length > 2,
    ).length
    if (titleCaseScore > 3 && titleCaseScore > lowerScore) {
      return {
        id: "case",
        label: "Casing",
        tier: "deliverability",
        status: "warn",
        score: 2,
        weight: 5,
        message:
          "Title Case looks like marketing mail — sentence case wins on cold.",
        exampleFix: "Switch to sentence case.",
      }
    }
    return {
      id: "case",
      label: "Casing",
      tier: "deliverability",
      status: "pass",
      score: 5,
      weight: 5,
      message: "Sentence case — reads like a personal email.",
    }
  })())

  // —— Engagement ——

  // Personalization quality (NEW distinction)
  factors.push((() => {
    const hasStrong = STRONG_PERSONAL.some((re) => re.test(trimmed))
    const hasWeakName = WEAK_NAME_TOKEN.test(trimmed)
    const startsWithName = /^[A-Z][a-z]{1,15}[\s,]/.test(trimmed)
    // Company/role specificity without tokens
    const hasCompanyShape =
      /\b(at|for|re:)\s+[A-Z][A-Za-z0-9&.-]{1,}/.test(trimmed) ||
      /\b[A-Z][a-z]+(?:\s[A-Z][a-z]+)?\s+(pricing|hiring|funding|launch)/i.test(
        trimmed,
      )

    if (hasStrong || hasCompanyShape) {
      return {
        id: "personal",
        label: "Personalization quality",
        tier: "engagement",
        status: "pass",
        score: 10,
        weight: 10,
        message:
          "Specific personalization (company/role/trigger) — stronger than first name alone.",
      }
    }
    if (hasWeakName || startsWithName) {
      return {
        id: "personal",
        label: "Personalization quality",
        tier: "engagement",
        status: "warn",
        score: 5,
        weight: 10,
        message:
          "First-name-only personalization is weak on cold — add a company or trigger detail.",
        exampleFix: "e.g. “Acme’s Series B — quick question”",
      }
    }
    return {
      id: "personal",
      label: "Personalization quality",
      tier: "engagement",
      status: "warn",
      score: 2,
      weight: 10,
      message: "No specific personalization — cold opens rise with real detail.",
      exampleFix: "Reference company, role, or a recent trigger.",
    }
  })())

  // Question / reply-bait
  factors.push((() => {
    if (/\?$/.test(trimmed)) {
      return {
        id: "question",
        label: "Reply-bait framing",
        tier: "engagement",
        status: "pass",
        score: 6,
        weight: 6,
        message:
          "Question format — oriented toward replies, not just opens (cold KPI).",
      }
    }
    return {
      id: "question",
      label: "Reply-bait framing",
      tier: "engagement",
      status: "warn",
      score: 3,
      weight: 6,
      message: "Statement format — questions often pull more cold replies.",
    }
  })())

  // Specificity number
  factors.push((() => {
    const numbers = trimmed.match(/\b\d{1,4}%?\b/g)
    if (numbers && numbers.length > 0) {
      return {
        id: "specificity",
        label: "Specificity",
        tier: "engagement",
        status: "pass",
        score: 7,
        weight: 7,
        message: `Includes specific number: ${numbers[0]}.`,
      }
    }
    return {
      id: "specificity",
      label: "Specificity",
      tier: "engagement",
      status: "warn",
      score: 3,
      weight: 7,
      message: "No number — concrete figures boost credibility on cold.",
    }
  })())

  // Curiosity
  factors.push((() => {
    const hits = matchesAny(lowered, CURIOSITY_WORDS)
    if (hits.length > 0) {
      return {
        id: "curiosity",
        label: "Curiosity gap",
        tier: "engagement",
        status: "pass",
        score: 5,
        weight: 5,
        message: `Curiosity hook: "${hits[0]}".`,
      }
    }
    return {
      id: "curiosity",
      label: "Curiosity gap",
      tier: "engagement",
      status: "warn",
      score: 2,
      weight: 5,
      message: "No curiosity hook — try why/how or a concrete teaser.",
    }
  })())

  // Urgency
  factors.push((() => {
    const hits = matchesAny(lowered, URGENCY_WORDS)
    if (hits.length >= 2) {
      return {
        id: "urgency",
        label: "Urgency",
        tier: "engagement",
        status: "warn",
        score: 1,
        weight: 4,
        message: "Heavy urgency reads as pressure on cold opens.",
      }
    }
    if (hits.length === 1) {
      return {
        id: "urgency",
        label: "Urgency",
        tier: "engagement",
        status: "pass",
        score: 4,
        weight: 4,
        message: `Light urgency ("${hits[0]}") — OK if authentic.`,
      }
    }
    return {
      id: "urgency",
      label: "Urgency",
      tier: "engagement",
      status: "pass",
      score: 3,
      weight: 4,
      message: "No urgency — fine for cold first-touch.",
    }
  })())

  // Generic opener
  factors.push((() => {
    const startsGeneric = GENERIC_OPENERS.some(
      (g) =>
        lowered === g ||
        lowered.startsWith(g + " ") ||
        lowered.startsWith(g + ","),
    )
    if (startsGeneric) {
      return {
        id: "generic",
        label: "Generic opener",
        tier: "engagement",
        status: "fail",
        score: 0,
        weight: 5,
        message: "“Checking in / following up” style openers get archived.",
        exampleFix: "Lead with a specific observation instead.",
      }
    }
    return {
      id: "generic",
      label: "Generic opener",
      tier: "engagement",
      status: "pass",
      score: 5,
      weight: 5,
      message: "No tired follow-up phrasing.",
    }
  })())

  // Human tone
  factors.push((() => {
    if (/\$/.test(trimmed)) {
      return {
        id: "human",
        label: "Sounds human",
        tier: "engagement",
        status: "warn",
        score: 2,
        weight: 4,
        message: "$ symbols feel transactional on cold.",
        exampleFix: "Write the number out or drop the $.",
      }
    }
    if (/^[a-z]/.test(trimmed)) {
      return {
        id: "human",
        label: "Sounds human",
        tier: "engagement",
        status: "pass",
        score: 4,
        weight: 4,
        message: "Starts lowercase — often reads like a real note.",
      }
    }
    return {
      id: "human",
      label: "Sounds human",
      tier: "engagement",
      status: "pass",
      score: 3,
      weight: 4,
      message: "Tone reads natural.",
    }
  })())

  const totalWeight = factors.reduce((a, f) => a + f.weight, 0)
  const earned = factors.reduce((a, f) => a + f.score, 0)
  const score =
    length === 0 ? 0 : Math.round((earned / Math.max(totalWeight, 1)) * 100)

  let grade: SubjectLineGrade = "Risky"
  if (score >= 85) grade = "Excellent"
  else if (score >= 70) grade = "Strong"
  else if (score >= 55) grade = "Average"
  else if (score >= 35) grade = "Weak"

  const topFixes = factors
    .filter((f) => f.status !== "pass")
    .sort((a, b) => b.weight - b.score - (a.weight - a.score))
    .slice(0, 3)
    .map((f) => f.exampleFix ?? f.message)

  const p30 = truncatePreview(trimmed, 30)
  const p55 = truncatePreview(trimmed, 55)

  return {
    score,
    grade,
    factors,
    deliverability: factors.filter((f) => f.tier === "deliverability"),
    engagement: factors.filter((f) => f.tier === "engagement"),
    topFixes,
    charCount: length,
    wordCount,
    preview30: p30.preview,
    preview55: p55.preview,
    truncatedAt30: p30.truncated,
    truncatedAt55: p55.truncated,
  }
}

/** Factor explainer copy for SEO / how-it-works expansion. */
export const SUBJECT_LINE_FACTOR_EXPLAINERS: {
  id: string
  why: string
  good: string
  bad: string
}[] = [
  {
    id: "length",
    why: "Cold first-touch has low trust — long subjects get truncated and feel like marketing mail.",
    good: "Acme pricing page — quick question",
    bad: "I wanted to reach out regarding a potential partnership opportunity for Q4",
  },
  {
    id: "spam",
    why: "Cold sends aren't on a permission list, so spam triggers hurt harder than in newsletters.",
    good: "Saw your Series B announcement",
    bad: "FREE limited-time offer — act now!!!",
  },
  {
    id: "merge",
    why: "Unresolved {{tokens}} destroy trust instantly and look like a broken sequencer.",
    good: "Jordan — quick note on Acme's hiring",
    bad: "Hi {{first_name}}, {{company}} opportunity",
  },
  {
    id: "personal",
    why: "First name alone is weak; company/role/trigger detail is what lifts cold opens and replies.",
    good: "Your new VP Sales hire — timing?",
    bad: "{{first_name}} — checking in",
  },
  {
    id: "question",
    why: "Cold KPI is reply rate — questions invite a response, not just an open.",
    good: "Wrong person for outbound at Acme?",
    bad: "Exciting partnership opportunity",
  },
]
