import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Breadcrumbs, PageCta, PageHeader, PageShell } from "@/components/site/page-shell"
import { RelatedLinks } from "@/components/site/related-links"
import { INDUSTRIES, CASE_STUDIES, SERVICES, SITE } from "@/lib/site-data"

type Params = { slug: string }

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const ind = INDUSTRIES.find((i) => i.slug === slug)
  if (!ind) return {}
  return {
    title: `Cold email and lead generation for ${ind.nameLower}`,
    description: ind.headline,
    alternates: { canonical: `/industries/${ind.slug}` },
    openGraph: {
      title: `Outbound for ${ind.name} — ${SITE.name}`,
      url: `${SITE.domain}/industries/${ind.slug}`,
      description: ind.headline,
    },
  }
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const ind = INDUSTRIES.find((i) => i.slug === slug)
  if (!ind) notFound()

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Industries", href: "/industries" },
    { name: ind.name, href: `/industries/${ind.slug}` },
  ]
  const matchingCase = CASE_STUDIES.find(
    (c) => c.industry.toLowerCase().includes(ind.name.toLowerCase().split(" ")[0]),
  )

  return (
    <PageShell breadcrumbs={crumbs}>
      <Breadcrumbs items={crumbs} />
      <PageHeader
        eyebrow={`Industry · ${ind.name}`}
        title={ind.headline}
        italicize="grow"
        description={`Outbound for ${ind.nameLower} that respects how your buyers actually buy.`}
      />

      <section className="border-t border-ink-08">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 md:py-24 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col gap-12">
            <div>
              <h2 className="text-[12px] uppercase tracking-[0.18em] text-ink-40">
                Pain points
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {ind.painPoints.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-3 rounded-xl border border-ink-08 bg-card p-4 text-[15px] leading-[1.55] text-ink"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[oklch(0.55_0.13_78)]" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-[12px] uppercase tracking-[0.18em] text-ink-40">
                Our approach
              </h2>
              <p className="mt-5 text-[17px] leading-[1.7] text-ink">
                {ind.approach}
              </p>
            </div>

            <div>
              <h2 className="text-[12px] uppercase tracking-[0.18em] text-ink-40">
                What that looks like in practice
              </h2>
              <p className="mt-5 text-[16px] leading-[1.7] text-ink-60">
                For {ind.nameLower} we typically run a 2- or 3-channel
                sequence anchored to industry-specific triggers — funding,
                hiring, product launches — and pair it with a senior-voice
                copy approach. Our reply-handling SDR is briefed on your
                category before any first send goes out.
              </p>
            </div>
          </div>

          <aside className="flex h-fit flex-col gap-6 rounded-2xl border border-ink-08 bg-cream p-7 sm:sticky sm:top-28">
            <span className="text-[11px] uppercase tracking-[0.18em] text-ink-40">
              Industry headline
            </span>
            <p className="text-[56px] font-bold leading-none tabular tracking-tight">
              {ind.metric.value}
            </p>
            <p className="text-[13px] leading-[1.5] text-ink">
              {ind.metric.label}
            </p>
            <div className="h-px bg-ink-08" />
            <p className="text-[12px] uppercase tracking-[0.18em] text-ink-40">
              Featured client
            </p>
            <p className="text-[18px] font-bold tracking-tight text-ink">
              {ind.exampleClient}
            </p>
            <a
              href={SITE.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-5 text-[14px] font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              Book a call about {ind.name}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </aside>
        </div>
      </section>

      {matchingCase && (
        <section className="border-t border-ink-08 bg-cream">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
            <span className="text-[12px] uppercase tracking-[0.18em] text-ink-40">
              Case study from this industry
            </span>
            <Link
              href="/results"
              className="group mt-6 flex flex-col gap-6 rounded-2xl border border-ink-08 bg-background p-8 transition-all hover:-translate-y-0.5 hover:border-ink/25 sm:p-10"
            >
              <h3 className="text-balance text-[28px] font-bold leading-[1.1] tracking-tight text-ink sm:text-[36px]">
                {matchingCase.headline}
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {matchingCase.metrics.map((m) => (
                  <div key={m.l} className="flex flex-col gap-1">
                    <span className="text-[28px] font-bold leading-none tabular tracking-tight">
                      {m.v}
                    </span>
                    <span className="text-[10.5px] uppercase tracking-[0.14em] text-ink-40">
                      {m.l}
                    </span>
                  </div>
                ))}
              </div>
              <span className="mt-2 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink">
                <span className="border-b border-ink/30 pb-0.5 transition-colors group-hover:border-ink">
                  Read full case study
                </span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        </section>
      )}

      <PageCta />
      <RelatedLinks
        title="Other industries"
        items={INDUSTRIES.filter((i) => i.slug !== ind.slug).map((i) => ({
          href: `/industries/${i.slug}`,
          label: i.name,
          meta: i.metric.value + " · " + i.metric.label,
        }))}
      />
    </PageShell>
  )
}
