/**
 * GET /api/tools/domain-health?domain=example.com
 *
 * Live DNS lookup for the Domain Email Health Checker tool. We resolve:
 *   - MX records (does the domain accept mail at all?)
 *   - TXT records → SPF (find a record starting with "v=spf1")
 *   - TXT records at _dmarc.<domain> → DMARC policy
 *   - TXT records at <selector>._domainkey.<domain> → DKIM (probe common selectors)
 *
 * Each check is graded pass / warn / fail with a remediation hint, and a
 * final 0–100 health score is computed from weighted points.
 *
 * No data is logged or persisted — we look up, return, discard.
 */

import { NextResponse } from "next/server"
import { promises as dns } from "dns"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// Per-DNS-call timeout — we'd rather return a partial "fail" than hang the
// entire request waiting on a slow authoritative server.
const DNS_TIMEOUT_MS = 4000

// In-memory IP rate limiter. Single-process best effort — for production
// multi-region scale this should be backed by a shared store. For a free
// public tool, this is enough to keep a casual abuser from melting the box.
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 12 // requests/min/IP
const ipBuckets = new Map<string, number[]>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const cutoff = now - RATE_LIMIT_WINDOW_MS
  const bucket = (ipBuckets.get(ip) ?? []).filter((t) => t > cutoff)
  if (bucket.length >= RATE_LIMIT_MAX) {
    ipBuckets.set(ip, bucket)
    return false
  }
  bucket.push(now)
  ipBuckets.set(ip, bucket)
  // Opportunistic cleanup so the Map doesn't grow unbounded.
  if (ipBuckets.size > 5000) {
    for (const [k, v] of ipBuckets) {
      if (v.every((t) => t <= cutoff)) ipBuckets.delete(k)
    }
  }
  return true
}

function withTimeout<T>(p: Promise<T>, ms: number, fallback: T): Promise<T> {
  return new Promise<T>((resolve) => {
    const timer = setTimeout(() => resolve(fallback), ms)
    p.then(
      (v) => { clearTimeout(timer); resolve(v) },
      () => { clearTimeout(timer); resolve(fallback) },
    )
  })
}

type Status = "pass" | "warn" | "fail" | "info"

type CheckResult = {
  id: "mx" | "spf" | "dkim" | "dmarc"
  label: string
  status: Status
  /** Short, plain-language headline for the UI badge. */
  headline: string
  /** Sentence explaining the impact in human terms. */
  detail: string
  /** Resolved record values, if any — surfaced in a <details> drawer. */
  raw?: string[]
  /** Copy-paste ready fix when the check fails or warns. */
  fix?: string
}

type DomainReport = {
  domain: string
  /** 0–100 score derived from the weighted check outcomes. */
  score: number
  /** Plain-text grade for the badge (Excellent / Good / Needs work / At risk). */
  grade: "Excellent" | "Good" | "Needs work" | "At risk"
  checks: CheckResult[]
}

// Selectors we probe for DKIM. Most ESPs use one of these — a hit on any
// counts as a pass. Absence does not strictly mean DKIM is missing
// (custom selectors exist), so a pure absence is reported as "warn", not "fail".
const COMMON_DKIM_SELECTORS = [
  "google",      // Google Workspace
  "selector1",   // Microsoft 365
  "selector2",   // Microsoft 365 (rotated key)
  "k1",          // Mailchimp / Mandrill
  "s1",
  "default",
  "smtp",        // SendGrid (some setups)
  "mxvault",     // Sendinblue
  "dkim",
]

// Validates "looks like a domain" before we send it to dns.* — defends against
// goofy inputs like "https://example.com" or "a@b.com". We intentionally don't
// allow IDN here for simplicity. Hard cap on length protects against silly
// over-long inputs aimed at DNS resolvers.
const MAX_DOMAIN_LENGTH = 253 // RFC 1035 limit
function normalizeDomain(input: string): string | null {
  if (typeof input !== "string" || input.length > 1024) return null
  const trimmed = input
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "")
    .replace(/^.*@/, "")
  if (trimmed.length === 0 || trimmed.length > MAX_DOMAIN_LENGTH) return null
  if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/.test(trimmed)) {
    return null
  }
  return trimmed
}

async function safeResolveTxt(host: string): Promise<string[]> {
  return withTimeout(
    (async () => {
      try {
        // resolveTxt returns string[][]; each TXT record can be split into chunks.
        const records = await dns.resolveTxt(host)
        return records.map((chunks) => chunks.join(""))
      } catch {
        return []
      }
    })(),
    DNS_TIMEOUT_MS,
    [],
  )
}

async function safeResolveMx(
  host: string,
): Promise<{ exchange: string; priority: number }[]> {
  return withTimeout(
    (async () => {
      try {
        const records = await dns.resolveMx(host)
        return records.sort((a, b) => a.priority - b.priority)
      } catch {
        return []
      }
    })(),
    DNS_TIMEOUT_MS,
    [],
  )
}

async function checkMx(domain: string): Promise<CheckResult> {
  const records = await safeResolveMx(domain)
  if (records.length === 0) {
    return {
      id: "mx",
      label: "MX (mail server)",
      status: "fail",
      headline: "No MX records",
      detail:
        "This domain isn't configured to receive email at all — replies to your cold sends will bounce.",
      fix: "Add MX records for your email provider (Google Workspace: mx.google.com, Microsoft 365: <tenant>.mail.protection.outlook.com).",
    }
  }
  return {
    id: "mx",
    label: "MX (mail server)",
    status: "pass",
    headline: `${records.length} MX record${records.length > 1 ? "s" : ""}`,
    detail: `Top priority mail server: ${records[0].exchange} (priority ${records[0].priority}).`,
    raw: records.map((r) => `${r.priority} ${r.exchange}`),
  }
}

async function checkSpf(domain: string): Promise<CheckResult> {
  const txt = await safeResolveTxt(domain)
  const spfRecords = txt.filter((r) => r.toLowerCase().startsWith("v=spf1"))

  if (spfRecords.length === 0) {
    return {
      id: "spf",
      label: "SPF",
      status: "fail",
      headline: "No SPF record",
      detail:
        "Without SPF, mailbox providers can't verify that you authorized the server sending your email — a major spam-folder signal.",
      fix: 'Add a TXT record at the apex of your domain: v=spf1 include:_spf.google.com ~all (replace include with your ESP).',
    }
  }
  if (spfRecords.length > 1) {
    return {
      id: "spf",
      label: "SPF",
      status: "fail",
      headline: "Multiple SPF records",
      detail:
        "RFC 7208 forbids more than one SPF record per domain. Mailbox providers will treat your domain as unauthenticated.",
      raw: spfRecords,
      fix: "Merge into a single TXT record. Combine all 'include:' mechanisms into one line ending with ~all or -all.",
    }
  }
  const record = spfRecords[0]
  // Soft warnings: lookup count > 10 will be exceeded; +all is permissive
  if (/\+all/.test(record)) {
    return {
      id: "spf",
      label: "SPF",
      status: "warn",
      headline: "SPF too permissive",
      detail:
        "Your SPF record ends with +all, which authorizes any server on the internet to send as your domain. Inbox providers will dock you.",
      raw: [record],
      fix: "Replace +all with ~all (soft fail) or -all (hard fail).",
    }
  }
  if (!/[~\-?]all\s*$/.test(record)) {
    return {
      id: "spf",
      label: "SPF",
      status: "warn",
      headline: "SPF missing 'all' qualifier",
      detail:
        "Your SPF record doesn't end with ~all or -all. Some providers will treat senders not in your include list as neutral instead of fail.",
      raw: [record],
      fix: "Append ~all (recommended for cold sending) to the end of your SPF record.",
    }
  }
  return {
    id: "spf",
    label: "SPF",
    status: "pass",
    headline: "SPF configured",
    detail: "Your SPF record is present, unique, and uses a strict policy qualifier.",
    raw: [record],
  }
}

async function checkDmarc(domain: string): Promise<CheckResult> {
  const records = await safeResolveTxt(`_dmarc.${domain}`)
  const dmarc = records.filter((r) => r.toLowerCase().startsWith("v=dmarc1"))

  if (dmarc.length === 0) {
    return {
      id: "dmarc",
      label: "DMARC",
      status: "fail",
      headline: "No DMARC record",
      detail:
        "Without DMARC, you have no policy telling inboxes what to do with unauthenticated mail spoofing your domain. Google and Yahoo now require it.",
      fix: 'Add a TXT record at _dmarc.<domain>: v=DMARC1; p=none; rua=mailto:postmaster@<domain> — start with p=none to monitor, then move to p=quarantine.',
    }
  }
  const record = dmarc[0]
  const policyMatch = record.match(/p=([a-z]+)/i)
  const policy = (policyMatch?.[1] ?? "").toLowerCase()

  if (policy === "none") {
    return {
      id: "dmarc",
      label: "DMARC",
      status: "warn",
      headline: "DMARC policy = none",
      detail:
        "DMARC is present, but p=none only monitors — it doesn't actually instruct inboxes to reject or quarantine spoofed mail.",
      raw: [record],
      fix: "Once you've reviewed reports for 2–4 weeks, change p=none to p=quarantine, then to p=reject.",
    }
  }
  if (policy === "quarantine" || policy === "reject") {
    return {
      id: "dmarc",
      label: "DMARC",
      status: "pass",
      headline: `DMARC enforced (p=${policy})`,
      detail:
        policy === "reject"
          ? "Strongest possible policy — spoofed mail is rejected outright. Excellent for sender reputation."
          : "Spoofed mail is sent to spam. Solid policy for production cold outbound.",
      raw: [record],
    }
  }
  return {
    id: "dmarc",
    label: "DMARC",
    status: "warn",
    headline: "DMARC has no policy",
    detail: "Your DMARC record is missing a 'p=' policy directive.",
    raw: [record],
    fix: "Add p=quarantine or p=reject to your DMARC TXT record.",
  }
}

async function checkDkim(domain: string): Promise<CheckResult> {
  // Probe selectors in parallel — first hit wins.
  const probes = await Promise.all(
    COMMON_DKIM_SELECTORS.map(async (selector) => {
      const records = await safeResolveTxt(`${selector}._domainkey.${domain}`)
      const dkim = records.find((r) => /(^|;\s*)v=dkim1/i.test(r) || /p=/i.test(r))
      return dkim ? { selector, record: dkim } : null
    }),
  )
  const found = probes.filter((p): p is { selector: string; record: string } => p !== null)

  if (found.length === 0) {
    return {
      id: "dkim",
      label: "DKIM",
      status: "warn",
      headline: "No DKIM at common selectors",
      detail:
        "We probed the most common DKIM selectors (google, selector1/2, k1, default, …) and found none. You may be using a custom selector — but if not, DKIM is missing.",
      fix: "Confirm your selector with your ESP, then publish the public-key TXT record at <selector>._domainkey.<domain>.",
    }
  }
  return {
    id: "dkim",
    label: "DKIM",
    status: "pass",
    headline: `DKIM found (${found.map((f) => f.selector).join(", ")})`,
    detail: `Public-key DKIM record(s) found at ${found.length} known selector${found.length > 1 ? "s" : ""}.`,
    raw: found.map((f) => `${f.selector}: ${f.record.slice(0, 100)}…`),
  }
}

// Score weights map roughly to the impact each record has on inbox placement.
const WEIGHTS: Record<CheckResult["id"], { pass: number; warn: number; fail: number }> = {
  mx:    { pass: 20, warn: 10, fail: 0 },
  spf:   { pass: 30, warn: 18, fail: 0 },
  dmarc: { pass: 30, warn: 15, fail: 0 },
  dkim:  { pass: 20, warn: 10, fail: 0 },
}

function scoreReport(checks: CheckResult[]): number {
  return checks.reduce((acc, c) => {
    const w = WEIGHTS[c.id]
    if (c.status === "pass") return acc + w.pass
    if (c.status === "warn") return acc + w.warn
    return acc
  }, 0)
}

function gradeFromScore(score: number): DomainReport["grade"] {
  if (score >= 90) return "Excellent"
  if (score >= 70) return "Good"
  if (score >= 40) return "Needs work"
  return "At risk"
}

export async function GET(request: Request) {
  // Best-effort client identification for rate limiting. Behind a proxy/CDN,
  // x-forwarded-for is the only signal we get; fall back to "unknown".
  const fwd = request.headers.get("x-forwarded-for") ?? ""
  const ip = (fwd.split(",")[0] || request.headers.get("x-real-ip") || "unknown").trim()
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Try again in a minute." },
      { status: 429, headers: { "Retry-After": "60" } },
    )
  }

  const { searchParams } = new URL(request.url)
  const raw = searchParams.get("domain") ?? ""
  const domain = normalizeDomain(raw)

  if (!domain) {
    return NextResponse.json(
      { error: "Invalid domain. Try just 'example.com' — no @ or protocol." },
      { status: 400 },
    )
  }

  try {
    // Run all four lookups in parallel — total wall time = slowest single check.
    const [mx, spf, dmarc, dkim] = await Promise.all([
      checkMx(domain),
      checkSpf(domain),
      checkDmarc(domain),
      checkDkim(domain),
    ])
    const checks = [mx, spf, dkim, dmarc]
    const score = scoreReport(checks)
    const report: DomainReport = {
      domain,
      score,
      grade: gradeFromScore(score),
      checks,
    }
    return NextResponse.json(report, {
      // Cache identical lookups for 5 min to be neighborly to public DNS.
      headers: { "Cache-Control": "public, max-age=300, s-maxage=300" },
    })
  } catch (err) {
    return NextResponse.json(
      { error: "DNS lookup failed. Try again in a few seconds." },
      { status: 500 },
    )
  }
}
