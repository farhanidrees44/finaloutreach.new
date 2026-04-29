import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import {
  Breadcrumbs,
  PageCta,
  PageHeader,
  PageShell,
} from "@/components/site/page-shell"
import { CASE_STUDIES, SITE } from "@/lib/site-data"

const PAGE_TITLE = "B2B cold email case studies — Real outbound results"
const PAGE_DESCRIPTION =
  "Detailed case-study breakdowns of recent client wins across B2B SaaS, fintech, healthtech, cybersecurity, manufacturing, agencies, and B2B services. Real cycles, real numbers, real lessons."

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "B2B cold email case studies",
    "lead generation case studies",
    "outbound sales case studies",
    "appointment setting case studies",
    "cold email results",
    "SaaS pipeline case study",
    "fintech outbound case study",
    "healthtech outbound case study",
  ],
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: `Case studies — ${SITE.name}`,
    url: `${SITE.domain}/case-studies`,
    description: PAGE_DESCRIPTION,
    siteName: SITE.name,
    images: [
      {
        url: `${SITE.domain}/og.jpg`,
        width: 1200,
        height: 630,
        alt: `${SITE.name} case studies`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${SITE.domain}/og.jpg`],
  },
}

export default function CaseStudiesPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Case studies", href: "/case-studies" },
  ]

  // Aggregates rendered above the listing for instant credibility.
  const totalStudies = CASE_STUDIES.length
  const industries = Array.from(
    new Set(CASE_STUDIES.map((c) => c.industry)),
  ).length
  const aggregateStats = [
    { v: `${totalStudies}`, l: "Case studies" },
    { v: `${industries}`, l: "Industries covered" },
    { v: "$47M+", l: "Pipeline generated" },
    { v: "12,400+", l: "Meetings booked" },
  ]

  return (
    <PageShell breadcrumbs={crumbs}>
      <Breadcrumbs items={crumbs} />
      <PageHeader
        eyebrow="Case studies"
        title="Recent wins. The results speak."
        italicize="results speak"
        description="A growing collection of detailed outbound case studies. Real numbers, real cycles, real lessons — across B2B SaaS, fintech, healthtech, cybersecurity, manufacturing, agencies, and more."
      />

      {/* Aggregate KPI strip — instant proof above the fold */}
      <section className="mx-auto max-w-7xl px-6 pb-16 md:pb-20">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-08 bg-ink-08 md:grid-cols-4">
          {aggregateStats.map((s) => (
            <div
              key={s.l}
              className="flex flex-col gap-1.5 bg-card p-6 sm:p-7"
            >
              <dt className="text-[11px] uppercase tracking-[0.16em] text-ink-40">
                {s.l}
              </dt>
              <dd className="text-[32px] font-medium leading-none tabular tracking-display sm:text-[40px]">
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
              aria-label={`Read the ${c.client} case study: ${c.headline}`}
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
                      <span className="text-[26px] font-medium leading-none tabular tracking-display sm:text-[30px]">
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
