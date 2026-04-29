import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Breadcrumbs, PageCta, PageHeader, PageShell } from "@/components/site/page-shell"
import { INDUSTRIES, SITE } from "@/lib/site-data"

export const metadata: Metadata = {
  title: "Industries — Outbound playbooks for B2B verticals",
  description:
    "Specialized outbound playbooks for B2B SaaS, agencies, consulting, fintech, healthtech, and more.",
  alternates: { canonical: "/industries" },
  openGraph: {
    title: `Industries — ${SITE.name}`,
    url: `${SITE.domain}/industries`,
    description: "Specialized outbound playbooks per vertical.",
  },
}

export default function IndustriesPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Industries", href: "/industries" },
  ]
  return (
    <PageShell breadcrumbs={crumbs}>
      <Breadcrumbs items={crumbs} />
      <PageHeader
        eyebrow="Industries"
        title="A different playbook for every vertical."
        italicize="every vertical"
        description="Outbound that works for B2B SaaS does not work for healthtech. We have shipped campaigns across all of these — pick yours."
      />

      <section className="border-t border-ink-08">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 py-16 md:grid-cols-2 md:py-24 lg:grid-cols-3">
          {INDUSTRIES.map((i) => (
            <Link
              key={i.slug}
              href={`/industries/${i.slug}`}
              className="group flex flex-col justify-between gap-8 rounded-2xl border border-ink-08 bg-card p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/25"
            >
              <div className="flex items-start justify-between">
                <span className="text-[11px] uppercase tracking-[0.14em] text-ink-40">
                  {i.exampleClient}
                </span>
                <ArrowUpRight className="size-4 text-ink-40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
              </div>
              <div>
                <h2 className="text-[24px] font-medium leading-[1.15] tracking-display text-ink">
                  {i.name}
                </h2>
                <p className="mt-3 text-[14px] leading-[1.55] text-ink-60">
                  {i.headline}
                </p>
                <div className="mt-6 h-px w-12 bg-ink-08" />
                <div className="mt-6">
                  <p className="text-[28px] font-medium leading-none tabular tracking-display">
                    {i.metric.value}
                  </p>
                  <p className="mt-2 text-[11.5px] uppercase tracking-[0.14em] text-ink-40">
                    {i.metric.label}
                  </p>
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
