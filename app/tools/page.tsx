import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PageShell } from "@/components/site/page-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { SITE } from "@/lib/site-data"
import { TOOLS } from "@/lib/tools-data"
import { BookCallLink } from "@/components/site/book-call-link"

export const metadata: Metadata = {
  title: "Free Cold Email Tools — Subject Tester, Spam Checker, ROI Calculator",
  description:
    "Six free tools for cold email and outbound: subject line tester, spam word checker, domain health checker, warmup calculator, ROI calculator, and template generator. No signup, no email required.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: `Free cold email tools — ${SITE.name}`,
    description:
      "Free, instant cold email tools. Test subject lines, check spam triggers, audit domain health, model ROI, plan domain warmup, and generate sequences.",
    url: `${SITE.domain}/tools`,
  },
}

export default function ToolsIndexPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Free tools", href: "/tools" },
  ]

  // CollectionPage JSON-LD lists every tool — helps Google surface them as
  // a sitelinks-style group from the /tools URL.
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free Cold Email Tools",
    url: `${SITE.domain}/tools`,
    description:
      "Free, instant cold email and outbound tools — no signup required.",
    hasPart: TOOLS.map((t) => ({
      "@type": "SoftwareApplication",
      name: t.name,
      description: t.description,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: `${SITE.domain}/tools/${t.slug}`,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    })),
  }

  return (
    <PageShell
      breadcrumbs={crumbs}
      eyebrow="Free tools"
      title="Six tools we use to ship cold outbound that converts."
      italicize="ship"
      description="Everything we open in the first hour of a new client engagement — packaged for you, free, no signup. Built and maintained by the FinalOutreach team."
    >
      <JsonLd data={collectionSchema} />

      <section className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2">
        {TOOLS.map((tool) => {
          const Icon = tool.icon
          return (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group flex flex-col justify-between gap-8 rounded-2xl border border-ink-08 bg-card p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/25 sm:p-9"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-11 items-center justify-center rounded-2xl border border-ink-08 bg-background text-ink">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-40">
                    {String(tool.order).padStart(2, "0")} · {tool.category}
                  </span>
                </div>
                <span className="rounded-full border border-ink-08 px-2.5 py-1 text-[11px] font-medium text-ink-60">
                  {tool.timeToValue}
                </span>
              </div>

              <div>
                <h2 className="text-[26px] font-bold leading-[1.1] tracking-tight text-ink sm:text-[30px]">
                  {tool.shortName}
                </h2>
                <p className="mt-3 max-w-md text-[14.5px] leading-[1.6] text-ink-60">
                  {tool.tagline}
                </p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {tool.outputs.map((o) => (
                    <li
                      key={o}
                      className="rounded-full border border-ink-08 bg-background px-2.5 py-1 text-[11.5px] text-ink-60"
                    >
                      {o}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center gap-1.5 text-[13.5px] font-medium text-ink">
                  <span className="border-b border-ink/30 pb-0.5 transition-colors group-hover:border-ink">
                    Open tool
                  </span>
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          )
        })}
      </section>

      <section className="mt-16 rounded-2xl border border-ink-08 bg-cream p-8 sm:p-12">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-40">
              Want the full system, not just the tools?
            </p>
            <h2 className="mt-3 max-w-xl text-balance text-[26px] font-bold leading-[1.15] tracking-tight sm:text-[32px]">
              We run done-for-you outbound for B2B teams that want pipeline, not playbooks.
            </h2>
          </div>
          <BookCallLink
            source="tools-page"
            className="group inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-primary px-6 text-[15px] font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.97]"
          >
            Book a strategy call
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </BookCallLink>
        </div>
      </section>
    </PageShell>
  )
}
