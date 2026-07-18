/**
 * Shared layout primitives for /tools/* detail pages.
 * Matches homepage visual language: Plus Jakarta extrabold heads,
 * Instrument Serif italics on accents, ink/cream surfaces, electric-blue signals.
 */

import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowUpRight, ChevronRight, Sparkles } from "lucide-react"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbSchema } from "@/lib/seo/schemas"
import { SiteNavigation } from "@/components/site/site-navigation"
import { Footer } from "@/components/site/footer"
import { StickyMobileCta } from "@/components/site/sticky-mobile-cta"
import { cn } from "@/lib/utils"
import { getRelatedTools, type Tool } from "@/lib/tools-data"

function splitAccentTitle(name: string): { lead: string; accent: string } | null {
  const parts = name.trim().split(/\s+/)
  if (parts.length < 2) return null
  return {
    lead: parts.slice(0, -1).join(" "),
    accent: parts[parts.length - 1]!,
  }
}

export function ToolPageShell({
  tool,
  children,
  belowTool,
  afterFaq,
}: {
  tool: Tool
  children: ReactNode
  belowTool?: ReactNode
  afterFaq?: ReactNode
}) {
  const Icon = tool.icon
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Free tools", href: "/tools" },
    { name: tool.shortName, href: `/tools/${tool.slug}` },
  ]
  const related = getRelatedTools(tool.slug)
  const titleParts = splitAccentTitle(tool.name)

  return (
    <div className="relative min-h-screen bg-background text-ink">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <SiteNavigation />
      <main id="main">
        <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-6 pt-28">
          <ol className="flex flex-wrap items-center gap-1.5 text-[12.5px] font-medium text-ink-40">
            {crumbs.map((c, i) => (
              <li key={`${c.href}-${i}`} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="size-3 text-ink-40" />}
                {i === crumbs.length - 1 ? (
                  <span className="text-ink-60">{c.name}</span>
                ) : (
                  <Link href={c.href} className="transition-colors hover:text-ink">
                    {c.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <section className="mx-auto max-w-7xl px-6 pb-14 pt-10 md:pb-20 md:pt-14">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.45fr_1fr] lg:items-end lg:gap-14">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex size-11 items-center justify-center rounded-2xl border border-ink-08 bg-card text-ink shadow-[0_8px_24px_-12px_rgba(15,15,15,0.25)]">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-vibrant-purple/20 bg-vibrant-purple/[0.04] px-3 py-1 text-[11.5px] font-medium uppercase tracking-[0.14em] text-vibrant-purple">
                  {tool.category}
                  <span className="size-1 rounded-full bg-vibrant-purple/50" aria-hidden="true" />
                  Free · no signup
                </span>
              </div>

              <h1 className="mt-6 max-w-3xl text-balance text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1.08] tracking-tight text-ink">
                {titleParts ? (
                  <>
                    {titleParts.lead}{" "}
                    <span className="font-serif-italic text-electric-blue">
                      {titleParts.accent}
                    </span>
                  </>
                ) : (
                  tool.name
                )}
              </h1>

              <p className="mt-5 max-w-2xl text-pretty text-[17px] font-semibold leading-[1.65] text-ink-80 sm:text-[18px]">
                {tool.longDescription}
              </p>
            </div>

            <aside className="rounded-3xl border border-ink-08 bg-card p-7 shadow-[0_16px_48px_-28px_rgba(15,15,15,0.28)]">
              <p className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-ink-40">
                What you get
              </p>
              <ul className="mt-4 space-y-3.5">
                {tool.outputs.map((o) => (
                  <li
                    key={o}
                    className="flex items-start gap-2.5 text-[15px] font-medium leading-[1.5] text-ink"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-gradient-to-r from-electric-blue to-vibrant-purple"
                    />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center justify-between border-t border-ink-08 pt-5 text-[13px] font-medium text-ink-60">
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="size-3.5 text-electric-blue" aria-hidden="true" />
                  Time to result
                </span>
                <span className="font-mono tabular-nums text-ink">{tool.timeToValue}</span>
              </div>
            </aside>
          </div>
        </section>

        <section className="border-t border-ink-08 bg-cream/50">
          <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">{children}</div>
        </section>

        {belowTool}

        <section className="border-t border-ink-08 bg-background">
          <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
            <div className="flex items-center gap-4 text-[12px] uppercase tracking-[0.2em]">
              <span className="h-px w-10 bg-gradient-to-r from-ink-20 to-ink-08" />
              <span className="font-medium text-ink-40">How it works</span>
            </div>
            <h2 className="mt-6 max-w-2xl text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold leading-[1.08] tracking-tight text-ink">
              Three steps. No signup.{" "}
              <span className="font-serif-italic text-electric-blue">No waiting.</span>
            </h2>
            <ol className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
              {tool.howItWorks.map((step, i) => (
                <li
                  key={step.title}
                  className="rounded-3xl border border-ink-08 bg-card p-7 shadow-[0_12px_40px_-24px_rgba(15,15,15,0.22)]"
                >
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink-40">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[18px] font-bold leading-[1.25] tracking-tight text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] font-medium leading-[1.65] text-ink-60">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-ink-08 bg-cream/40">
          <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[360px_1fr] lg:gap-16">
              <div>
                <div className="flex items-center gap-4 text-[12px] uppercase tracking-[0.2em]">
                  <span className="h-px w-10 bg-gradient-to-r from-ink-20 to-ink-08" />
                  <span className="font-medium text-ink-40">Frequently asked</span>
                </div>
                <h2 className="mt-6 max-w-md text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold leading-[1.08] tracking-tight text-ink">
                  Quick answers,{" "}
                  <span className="font-serif-italic text-electric-blue">no fluff.</span>
                </h2>
              </div>
              <dl className="divide-y divide-ink-08 border-y border-ink-08">
                {tool.faqs.map((f) => (
                  <div key={f.q} className="py-6">
                    <dt className="text-[17px] font-bold leading-tight tracking-tight text-ink">
                      {f.q}
                    </dt>
                    <dd className="mt-2 max-w-2xl text-[15px] leading-[1.7] text-ink-60">
                      {f.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {afterFaq}

        <section className="border-t border-ink-08 bg-background">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-4 text-[12px] uppercase tracking-[0.2em]">
                  <span className="h-px w-10 bg-gradient-to-r from-ink-20 to-ink-08" />
                  <span className="font-medium text-ink-40">Keep going</span>
                </div>
                <h2 className="mt-4 text-[clamp(1.5rem,3vw,2rem)] font-extrabold leading-[1.1] tracking-tight text-ink">
                  Other free{" "}
                  <span className="font-serif-italic text-electric-blue">tools</span>
                </h2>
              </div>
              <Link
                href="/tools"
                className="group inline-flex items-center gap-1.5 text-[14px] font-bold text-ink"
              >
                <span className="border-b border-ink/30 pb-0.5 transition-colors group-hover:border-ink">
                  All tools
                </span>
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => {
                const RIcon = r.icon
                return (
                  <Link
                    key={r.slug}
                    href={`/tools/${r.slug}`}
                    className="group flex flex-col gap-5 rounded-3xl border border-ink-08 bg-card p-6 shadow-[0_12px_40px_-24px_rgba(15,15,15,0.18)] transition-all duration-300 hover:border-ink/20 hover:shadow-[0_20px_48px_-24px_rgba(15,15,15,0.28)]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex size-10 items-center justify-center rounded-xl border border-ink-08 bg-background text-ink">
                        <RIcon className="size-4" aria-hidden="true" />
                      </span>
                      <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-ink-40">
                        {r.category}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-[18px] font-bold leading-[1.2] tracking-tight text-ink">
                        {r.shortName}
                      </h3>
                      <p className="mt-1.5 text-[13.5px] font-medium leading-[1.55] text-ink-60">
                        {r.tagline}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCta />
    </div>
  )
}

export function ToolWorkbench({
  inputs,
  results,
}: {
  inputs: ReactNode
  results: ReactNode
}) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-6">
      <div className="rounded-3xl border border-ink-08 bg-card p-6 shadow-[0_16px_48px_-28px_rgba(15,15,15,0.28)] sm:p-8">
        {inputs}
      </div>
      <div className="rounded-3xl border border-ink-08 bg-card p-6 shadow-[0_16px_48px_-28px_rgba(15,15,15,0.28)] sm:p-8">
        {results}
      </div>
    </div>
  )
}

export function PanelHeading({
  step,
  title,
  hint,
  rightSlot,
}: {
  step?: string
  title: string
  hint?: string
  rightSlot?: ReactNode
}) {
  return (
    <div className="mb-6 flex items-start justify-between gap-3">
      <div>
        {step && (
          <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-ink-40">
            {step}
          </span>
        )}
        <h2
          className={cn(
            "text-[18px] font-extrabold leading-[1.2] tracking-tight text-ink",
            step && "mt-1.5",
          )}
        >
          {title}
        </h2>
        {hint && (
          <p className="mt-1.5 text-[13.5px] font-medium leading-[1.5] text-ink-60">
            {hint}
          </p>
        )}
      </div>
      {rightSlot && <div className="shrink-0">{rightSlot}</div>}
    </div>
  )
}

export function FieldLabel({
  htmlFor,
  label,
  hint,
  children,
}: {
  htmlFor?: string
  label: string
  hint?: string
  children: ReactNode
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <div className="flex items-baseline justify-between">
        <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-60">
          {label}
        </span>
        {hint && <span className="text-[11.5px] font-medium text-ink-40">{hint}</span>}
      </div>
      <div className="mt-2">{children}</div>
    </label>
  )
}
