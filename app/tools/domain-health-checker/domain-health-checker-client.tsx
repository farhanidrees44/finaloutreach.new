"use client"

/**
 * Domain Health Checker — calls the server-side /api/tools/domain-health
 * endpoint (which runs Node's dns module) and renders the result.
 *
 * The "score ring" + per-check accordion mirrors the subject-line tester's
 * visual language so the tool family feels consistent.
 */

import { useId, useState, useTransition } from "react"
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Globe2,
  ChevronDown,
  ChevronUp,
  Loader2,
  Search,
  Info,
  Copy,
  CheckCheck,
} from "lucide-react"
import { ToolWorkbench, PanelHeading, FieldLabel } from "@/components/tools/tool-shell"
import { cn } from "@/lib/utils"

type CheckStatus = "pass" | "warn" | "fail" | "info"

type CheckResult = {
  id: "mx" | "spf" | "dkim" | "dmarc"
  label: string
  status: CheckStatus
  headline: string
  detail: string
  raw?: string[]
  fix?: string
}

type Report = {
  domain: string
  score: number
  grade: "Excellent" | "Good" | "Needs work" | "At risk"
  checks: CheckResult[]
}

const SAMPLE_DOMAINS = ["google.com", "github.com", "stripe.com", "notion.so"]

function StatusIcon({ status, className }: { status: CheckStatus; className?: string }) {
  const map = {
    pass: { Icon: CheckCircle2, cls: "text-emerald-600" },
    warn: { Icon: AlertTriangle, cls: "text-amber-600" },
    fail: { Icon: XCircle, cls: "text-rose-600" },
    info: { Icon: Info, cls: "text-sky-600" },
  } as const
  const { Icon, cls } = map[status]
  return <Icon className={cn("size-4", cls, className)} aria-hidden="true" />
}

function ScoreRing({ score, grade }: { score: number; grade: Report["grade"] }) {
  const pct = Math.max(0, Math.min(100, score))
  const r = 52
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ
  const stroke =
    grade === "Excellent"
      ? "stroke-emerald-500"
      : grade === "Good"
        ? "stroke-[oklch(0.55_0.13_78)]"
        : grade === "Needs work"
          ? "stroke-amber-500"
          : "stroke-rose-500"
  return (
    <div className="relative inline-flex size-[136px] shrink-0 items-center justify-center">
      <svg viewBox="0 0 120 120" className="size-full -rotate-90">
        <circle cx="60" cy="60" r={r} className="fill-none stroke-ink-08" strokeWidth="10" />
        <circle
          cx="60" cy="60" r={r}
          className={cn("fill-none transition-[stroke-dashoffset] duration-500", stroke)}
          strokeWidth="10" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-[34px] font-medium tabular-nums leading-none text-ink">{pct}</span>
        <span className="mt-1 text-[10.5px] uppercase tracking-[0.18em] text-ink-40">{grade}</span>
      </div>
    </div>
  )
}

function CheckRow({ check }: { check: CheckResult }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const hasDetail = !!check.fix || (check.raw && check.raw.length > 0)

  const copyFix = async () => {
    if (!check.fix) return
    try {
      await navigator.clipboard.writeText(check.fix)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {
      // ignore
    }
  }

  return (
    <li className="border-b border-ink-08 last:border-b-0">
      <button
        type="button"
        onClick={() => hasDetail && setOpen((o) => !o)}
        className={cn(
          "flex w-full items-start gap-3 py-4 text-left transition-colors",
          hasDetail && "hover:text-ink cursor-pointer",
        )}
      >
        <span className="mt-0.5">
          <StatusIcon status={check.status} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[14px] font-medium text-ink">{check.label}</span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-40">
              {check.headline}
            </span>
          </div>
          <p className="mt-1 text-[13px] leading-[1.55] text-ink-60">{check.detail}</p>
        </div>
        {hasDetail && (
          <span className="mt-0.5 text-ink-40">
            {open ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </span>
        )}
      </button>
      {hasDetail && open && (
        <div className="space-y-3 pb-5 pl-7">
          {check.raw && check.raw.length > 0 && (
            <div className="rounded-lg border border-ink-08 bg-background p-3">
              <p className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-ink-40">
                Raw record{check.raw.length > 1 ? "s" : ""}
              </p>
              <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-all font-mono text-[11.5px] leading-[1.5] text-ink">
                {check.raw.join("\n")}
              </pre>
            </div>
          )}
          {check.fix && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
              <div className="flex items-start justify-between gap-2">
                <p className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-emerald-700">
                  Fix
                </p>
                <button
                  type="button"
                  onClick={copyFix}
                  className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-white px-2 py-0.5 text-[10.5px] font-medium text-emerald-700 transition-colors hover:bg-emerald-100"
                >
                  {copied ? <CheckCheck className="size-3" /> : <Copy className="size-3" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="mt-2 text-[12.5px] leading-[1.5] text-emerald-900">{check.fix}</p>
            </div>
          )}
        </div>
      )}
    </li>
  )
}

export function DomainHealthCheckerClient() {
  const id = useId()
  const [domain, setDomain] = useState("")
  const [report, setReport] = useState<Report | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!domain.trim()) return
    setError(null)
    startTransition(async () => {
      try {
        const res = await fetch(`/api/tools/domain-health?domain=${encodeURIComponent(domain.trim())}`, {
          cache: "no-store",
        })
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error ?? "Lookup failed")
        }
        const data = (await res.json()) as Report
        setReport(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Lookup failed")
        setReport(null)
      }
    })
  }

  const runSample = (d: string) => {
    setDomain(d)
    setError(null)
    startTransition(async () => {
      try {
        const res = await fetch(`/api/tools/domain-health?domain=${encodeURIComponent(d)}`, { cache: "no-store" })
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error ?? "Lookup failed")
        }
        setReport((await res.json()) as Report)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Lookup failed")
      }
    })
  }

  return (
    <ToolWorkbench
      inputs={
        <>
          <PanelHeading
            step="Step 01"
            title="Domain"
            hint="Just the apex domain — no @ or protocol. Lookup runs server-side."
          />
          <form onSubmit={submit}>
            <FieldLabel htmlFor={`${id}-d`} label="Your sending domain">
              <div className="relative">
                <Globe2 className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-ink-40" />
                <input
                  id={`${id}-d`}
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  spellCheck="false"
                  autoCapitalize="off"
                  autoCorrect="off"
                  inputMode="url"
                  suppressHydrationWarning
                  placeholder="example.com"
                  className="w-full rounded-xl border border-ink-08 bg-background py-3.5 pl-10 pr-3 text-[16px] text-ink shadow-[inset_0_1px_0_rgba(0,0,0,0.02)] outline-none transition-all placeholder:text-ink-40 focus:border-ink/30 focus:ring-2 focus:ring-[oklch(0.55_0.13_78)]/20"
                />
              </div>
            </FieldLabel>
            <button
              type="submit"
              disabled={pending || !domain.trim()}
              className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-[15px] font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Looking up…
                </>
              ) : (
                <>
                  <Search className="size-4" />
                  Run health check
                </>
              )}
            </button>
          </form>

          <div className="mt-6">
            <p className="text-[11.5px] font-medium uppercase tracking-[0.14em] text-ink-60">
              Or try a known-good domain
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {SAMPLE_DOMAINS.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => runSample(d)}
                  disabled={pending}
                  className="rounded-full border border-ink-08 bg-background px-3 py-1.5 text-[12.5px] text-ink-60 transition-colors hover:border-ink/25 hover:text-ink disabled:opacity-50"
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7 rounded-xl border border-ink-08 bg-background p-5">
            <p className="text-[11.5px] font-medium uppercase tracking-[0.14em] text-ink-60">
              What we check
            </p>
            <ul className="mt-3 space-y-1.5 text-[13px] leading-[1.55] text-ink-60">
              <li><span className="font-medium text-ink">SPF</span> — sender authorization</li>
              <li><span className="font-medium text-ink">DKIM</span> — message signature (probes common selectors)</li>
              <li><span className="font-medium text-ink">DMARC</span> — policy when SPF or DKIM fail</li>
              <li><span className="font-medium text-ink">MX</span> — can the domain receive mail at all</li>
            </ul>
          </div>
        </>
      }
      results={
        <>
          <PanelHeading
            step="Step 02"
            title="Health report"
            hint={report ? `Live DNS for ${report.domain}` : "Run a check to see the report."}
          />

          {!report && !error && !pending && (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-ink-08 bg-background py-14 text-center">
              <Globe2 className="size-8 text-ink-40" />
              <p className="mt-4 text-[14.5px] text-ink-60">
                Enter a domain on the left.
              </p>
              <p className="mt-1 max-w-xs text-[12.5px] leading-[1.5] text-ink-40">
                Or click a sample to see the format.
              </p>
            </div>
          )}

          {pending && !report && (
            <div className="flex flex-col items-center justify-center rounded-xl border border-ink-08 bg-background py-14 text-center">
              <Loader2 className="size-8 animate-spin text-[oklch(0.55_0.13_78)]" />
              <p className="mt-4 text-[14.5px] text-ink-60">Resolving SPF, DKIM, DMARC, and MX…</p>
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
              <div className="flex items-start gap-2">
                <XCircle className="mt-0.5 size-4 text-rose-600" />
                <div>
                  <p className="text-[14px] font-medium text-rose-900">Lookup failed</p>
                  <p className="mt-1 text-[13px] text-rose-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {report && (
            <>
              <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                <ScoreRing score={report.score} grade={report.grade} />
                <div className="flex-1">
                  <p className="text-[11.5px] font-medium uppercase tracking-[0.14em] text-ink-40">
                    Domain
                  </p>
                  <p className="mt-1 font-mono text-[18px] text-ink">{report.domain}</p>
                  <p className="mt-3 text-[14px] leading-[1.5] text-ink">
                    {report.grade === "Excellent"
                      ? "All four authentication records look correct. You're good to send."
                      : report.grade === "Good"
                        ? "Solid foundation — one or two records to tighten before scaling cold volume."
                        : report.grade === "Needs work"
                          ? "Multiple gaps will be hurting your inbox placement. Apply the fixes below."
                          : "Critical authentication is missing. Cold sends from this domain will largely land in spam."}
                  </p>
                </div>
              </div>

              <ul className="mt-6 border-y border-ink-08">
                {report.checks.map((c) => (
                  <CheckRow key={c.id} check={c} />
                ))}
              </ul>
            </>
          )}
        </>
      }
    />
  )
}
