import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowUpRight, Check } from "lucide-react"
import {
  Breadcrumbs,
  PageCta,
  PageHeader,
  PageShell,
} from "@/components/site/page-shell"
import { RelatedLinks } from "@/components/site/related-links"
import { JsonLd } from "@/components/seo/json-ld"
import { SERVICES, SITE } from "@/lib/site-data"

type Params = { slug: string }

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const service = SERVICES.find((s) => s.slug === slug)
  if (!service) return {}
  const title = `${service.title}`
  const description = service.tagline
  return {
    title,
    description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${title} — ${SITE.name}`,
      description,
      url: `${SITE.domain}/services/${service.slug}`,
      type: "article",
    },
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const service = SERVICES.find((s) => s.slug === slug)
  if (!service) notFound()

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: service.shortTitle, href: `/services/${service.slug}` },
  ]

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: { "@type": "Organization", name: SITE.name, url: SITE.domain },
    offers: {
      "@type": "Offer",
      price: service.price,
      priceCurrency: "USD",
    },
  }

  return (
    <PageShell breadcrumbs={crumbs}>
      <JsonLd data={schema} />
      <Breadcrumbs items={crumbs} />
      <PageHeader
        eyebrow={`Service · ${service.price}`}
        title={service.title}
        description={service.tagline}
      />

      <section className="border-t border-ink-08">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:py-24 lg:grid-cols-[1.3fr_1fr]">
          <div className="flex flex-col gap-10">
            <p className="text-[17px] leading-[1.65] text-ink-60">
              {service.description}
            </p>

            <div className="flex flex-col gap-4">
              <h2 className="text-[22px] font-medium tracking-display text-ink">
                What is included
              </h2>
              <ul className="flex flex-col gap-3">
                {service.deliverables.map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-3 rounded-xl border border-ink-08 bg-card p-4"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-[oklch(0.55_0.13_78)]" />
                    <span className="text-[14.5px] leading-[1.5] text-ink">
                      {d}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="flex h-fit flex-col gap-6 rounded-2xl border border-ink-08 bg-cream p-7 sm:sticky sm:top-28">
            <div>
              <span className="text-[11px] uppercase tracking-[0.18em] text-ink-40">
                {service.metricLabel}
              </span>
              <p className="mt-2 text-[56px] font-medium leading-none tabular tracking-display">
                {service.metricValue}
              </p>
            </div>
            <div className="h-px bg-ink-08" />
            <div className="flex flex-col gap-2 text-[13.5px]">
              <span className="text-ink-40">Timeline</span>
              <span className="text-ink">{service.timeline}</span>
            </div>
            <div className="flex flex-col gap-2 text-[13.5px]">
              <span className="text-ink-40">Ideal for</span>
              <span className="text-ink">{service.idealFor}</span>
            </div>
            <div className="flex flex-col gap-2 text-[13.5px]">
              <span className="text-ink-40">Investment</span>
              <span className="text-ink">{service.price}</span>
            </div>
            <a
              href={SITE.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-5 text-[14px] font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              Book a call about this
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </aside>
        </div>
      </section>

      <PageCta
        title={`Ready to talk about ${service.shortTitle.toLowerCase()}?`}
        subtitle="30-minute strategy call. We will be honest about whether we are a fit."
      />

      <RelatedLinks
        title="Other services"
        items={SERVICES.filter((s) => s.slug !== service.slug).map((s) => ({
          href: `/services/${s.slug}`,
          label: s.shortTitle,
          meta: s.price,
        }))}
      />
    </PageShell>
  )
}
