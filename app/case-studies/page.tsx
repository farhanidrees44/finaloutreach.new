import type { Metadata } from "next"
import Link from "next/link"
import {
  Breadcrumbs,
  PageCta,
  PageHeader,
  PageShell,
} from "@/components/site/page-shell"
import { ArrowUpRight } from "lucide-react"
import { CASE_STUDIES, SITE } from "@/lib/site-data"

const PAGE_TITLE = "B2B outbound case studies — anonymized results"
const PAGE_DESCRIPTION =
  "Anonymized outbound case-study breakdowns across B2B SaaS, fintech, healthtech, agencies, and more. Named clients appear only with written permission."

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "B2B cold email case studies",
    "lead generation case studies",
    "outbound sales case studies",
    "appointment setting case studies",
  ],
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: `Case studies — ${SITE.name}`,
    url: `${SITE.domain}/case-studies`,
    description: PAGE_DESCRIPTION,
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
}

export default function CaseStudiesPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Case studies", href: "/case-studies" },
  ]

  const industries = Array.from(new Set(CASE_STUDIES.map((c) => c.industry))).length

  return (
    <PageShell breadcrumbs={crumbs}>
      <Breadcrumbs items={crumbs} />
      <PageHeader
        eyebrow="Case studies"
        title="Outbound results by industry and stage."
        italicize="results"
        description="These breakdowns are anonymized until a client gives written permission to be named. Metrics describe engagement types — not invented testimonials."
      />

      <section className="mx-auto max-w-7xl px-6 pb-16 md:pb-20">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-08 bg-ink-08 md:grid-cols-3">
          {[
            { v: `${CASE_STUDIES.length}`, l: "Anonymized studies" },
            { v: `${industries}`, l: "Industries covered" },
            { v: "Named", l: "Only with permission" },
          ].map((s) => (
            <div key={s.l} className="flex flex-col gap-1.5 bg-card p-6 sm:p-7">
              <dt className="text-[11px] uppercase tracking-[0.16em] text-ink-40">
                {s.l}
              </dt>
              <dd className="text-[28px] font-medium leading-none tracking-display sm:text-[36px]">
                {s.v}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-t border-ink-08">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-16 md:grid-cols-2 md:py-24">
          {CASE_STUDIES.map((c) => (
            <Link
              key={c.slug}
              href={`/case-studies/${c.slug}`}
              className="group flex flex-col justify-between gap-8 rounded-2xl border border-ink-08 bg-card p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/25 sm:p-10"
              aria-label={`Read the ${c.industry} case study: ${c.headline}`}
            >
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-ink-08 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-ink-40">
                  {c.industry}
                </span>
                <span className="rounded-full border border-ink-08 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-ink-40">
                  {c.timeline}
                </span>
                <span className="rounded-full border border-ink-08 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-ink-40">
                  {c.client}
                </span>
              </div>
              <div>
                <h2 className="text-balance text-[28px] font-medium leading-[1.1] tracking-display text-ink sm:text-[32px]">
                  {c.headline}
                </h2>
                <div className="mt-8 grid grid-cols-3 gap-4">
                  {c.metrics.map((m) => (
                    <div key={m.l} className="flex flex-col gap-1">
                      <span className="text-[26px] font-medium leading-none tabular-nums tracking-display sm:text-[30px]">
                        {m.v}
                      </span>
                      <span className="text-[10.5px] uppercase tracking-[0.14em] text-ink-40">
                        {m.l}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink">
                  <span className="border-b border-ink/30 pb-0.5 transition-colors group-hover:border-ink">
                    Read the breakdown
                  </span>
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <PageCta />
    </PageShell>
  )
}
