/**
 * Shared layout primitives for /tools/* detail pages.
 *
 * Goal: every tool page should feel like a member of the same family —
 * same hero, same panel chrome, same "How it works" + FAQ + related-tools
 * pattern at the bottom. Page-specific UI is the only thing that varies.
 *
 * All client interactivity lives in the per-tool *-client.tsx files;
 * this file is server-renderable.
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

export function ToolPageShell({
  tool,
  children,
}: {
  tool: Tool
  children: ReactNode
}) {
  const Icon = tool.icon
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Free tools", href: "/tools" },
    { name: tool.shortName, href: `/tools/${tool.slug}` },
  ]
  const related = getRelatedTools(tool.slug)

  return (
    <div className="relative min-h-screen bg-background text-ink">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <SiteNavigation />
      <main id="main">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-6 pt-28">
          <ol className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-ink-40">
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

        {/* Hero */}
        <section className="mx-auto max-w-7xl px-6 pb-12 pt-10 md:pb-16 md:pt-14">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="inline-flex size-11 items-center justify-center rounded-2xl border border-ink-08 bg-card text-ink shadow-[0_1px_0_rgba(0,0,0,0.02)]">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-ink-40">
                  <span>{tool.category}</span>
                  <span className="size-1 rounded-full bg-ink-30" aria-hidden="true" />
                  <span>Free, no signup</span>
                </div>
              </div>
              <h1 className="mt-6 max-w-3xl text-balance text-[40px] font-extrabold leading-[1.1] tracking-tight sm:text-[52px] md:text-[60px]">
                {tool.name}
              </h1>
              <p className="mt-5 max-w-2xl text-pretty text-[17px] leading-[1.6] text-ink-60 sm:text-[18px]">
                {tool.longDescription}
              </p>
            </div>

            <aside className="rounded-2xl border border-ink-08 bg-card p-6">
              <p className="text-[11.5px] font-medium uppercase tracking-[0.2em] text-ink-40">
                What you get
              </p>
              <ul className="mt-4 space-y-3">
                {tool.outputs.map((o) => (
                  <li key={o} className="flex items-start gap-2.5 text-[14.5px] leading-[1.5] text-ink">
                    <span
                      aria-hidden="true"
                      className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-[oklch(0.55_0.13_78)]"
                    />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center justify-between border-t border-ink-08 pt-5 text-[12.5px] text-ink-60">
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="size-3.5 text-[oklch(0.55_0.13_78)]" aria-hidden="true" />
                  Time to result
                </span>
                <span className="font-mono tabular-nums text-ink">{tool.timeToValue}</span>
              </div>
            </aside>
          </div>
        </section>

        {/* The actual tool */}
        <section className="border-t border-ink-08 bg-cream/40">
          <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">{children}</div>
        </section>

        {/* How it works */}
        <section className="border-t border-ink-08">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
            <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-ink-40">
              <span className="h-px w-8 bg-ink-08" />
              <span>How it works</span>
            </div>
            <h2 className="mt-6 max-w-2xl text-balance text-[28px] font-bold leading-[1.1] tracking-tight sm:text-[36px]">
              Three steps. No signup. No waiting on results.
            </h2>
            <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
              {tool.howItWorks.map((step, i) => (
                <li
                  key={step.title}
                  className="rounded-2xl border border-ink-08 bg-card p-7"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-40">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[18px] font-medium leading-[1.25] text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-[1.6] text-ink-60">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-ink-08 bg-cream">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr]">
              <div>
                <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-ink-40">
                  <span className="h-px w-8 bg-ink-08" />
                  <span>Frequently asked</span>
                </div>
                <h2 className="mt-6 max-w-md text-balance text-[28px] font-bold leading-[1.1] tracking-tight sm:text-[36px]">
                  Quick answers about the {tool.shortName.toLowerCase()}.
                </h2>
              </div>
              <dl className="divide-y divide-ink-08 border-y border-ink-08">
                {tool.faqs.map((f) => (
                  <div key={f.q} className="py-6">
                    <dt className="text-[16px] font-medium text-ink">{f.q}</dt>
                    <dd className="mt-2 text-[14.5px] leading-[1.65] text-ink-60">
                      {f.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Related tools */}
        <section className="border-t border-ink-08">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-ink-40">
                  <span className="h-px w-8 bg-ink-08" />
                  <span>Keep going</span>
                </div>
                <h2 className="mt-4 text-[24px] font-bold leading-[1.15] tracking-tight sm:text-[30px]">
                  Other free tools
                </h2>
              </div>
              <Link
                href="/tools"
                className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-ink"
              >
                <span className="border-b border-ink/30 pb-0.5 transition-colors group-hover:border-ink">
                  All tools
                </span>
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => {
                const RIcon = r.icon
                return (
                  <Link
                    key={r.slug}
                    href={`/tools/${r.slug}`}
                    className="group flex flex-col gap-5 rounded-2xl border border-ink-08 bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/25"
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex size-9 items-center justify-center rounded-xl border border-ink-08 bg-background text-ink">
                        <RIcon className="size-4" aria-hidden="true" />
                      </span>
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-40">
                        {r.category}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-[18px] font-bold leading-[1.2] tracking-tight text-ink">
                        {r.shortName}
                      </h3>
                      <p className="mt-1.5 text-[13.5px] leading-[1.55] text-ink-60">
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

/**
 * Two-column tool body wrapper. Left = inputs / form, right = results.
 * On mobile, inputs stack above results.
 */
export function ToolWorkbench({
  inputs,
  results,
}: {
  inputs: ReactNode
  results: ReactNode
}) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
      <div className="rounded-2xl border border-ink-08 bg-card p-6 sm:p-7">
        {inputs}
      </div>
      <div className="rounded-2xl border border-ink-08 bg-card p-6 sm:p-7">
        {results}
      </div>
    </div>
  )
}

/**
 * Visual heading for a panel inside ToolWorkbench. Step counter is optional.
 */
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
    <div className="mb-5 flex items-start justify-between gap-3">
      <div>
        {step && (
          <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-40">
            {step}
          </span>
        )}
        <h2 className={cn("text-[18px] font-bold leading-[1.2] tracking-tight text-ink", step && "mt-1.5")}>
          {title}
        </h2>
        {hint && <p className="mt-1.5 text-[13px] leading-[1.5] text-ink-60">{hint}</p>}
      </div>
      {rightSlot && <div className="shrink-0">{rightSlot}</div>}
    </div>
  )
}

/**
 * Reusable styled label + input wrapper.
 */
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
        <span className="text-[12.5px] font-medium uppercase tracking-[0.14em] text-ink-60">
          {label}
        </span>
        {hint && <span className="text-[11.5px] text-ink-40">{hint}</span>}
      </div>
      <div className="mt-2">{children}</div>
    </label>
  )
}
