import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PageShell } from "@/components/site/page-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbsSchema } from "@/lib/seo/schemas"
import { SITE } from "@/lib/site-data"
import { INDUSTRY_PAGE_PROFILES } from "@/lib/pseo/industry-pages"
import { CtaButton } from "@/components/site/cta-button"

export const metadata: Metadata = {
  title: "Industries — Outbound playbooks for B2B verticals",
  description:
    "Specialized outbound playbooks for B2B SaaS, agencies, consulting, fintech, healthtech, B2B services, manufacturing, and commercial real estate.",
  alternates: { canonical: "/industries" },
  openGraph: {
    title: `Industries — ${SITE.name}`,
    url: `${SITE.domain}/industries`,
    description:
      "Unique outbound playbooks per vertical — not the same template with the industry name swapped.",
  },
}

export default function IndustriesPage() {
  return (
    <PageShell
      eyebrow="Industries"
      title="A different playbook for every vertical."
      italicize="every vertical"
      description="Outbound that works for B2B SaaS does not work for manufacturing or CRE. Eight verticals — each with its own ICP logic, cadence, and voice."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Industries" },
      ]}
    >
      <JsonLd
        data={breadcrumbsSchema([
          { name: "Home", url: SITE.domain },
          { name: "Industries", url: `${SITE.domain}/industries` },
        ])}
      />

      <section className="mb-16">
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {INDUSTRY_PAGE_PROFILES.map((i) => (
            <li key={i.slug}>
              <Link
                href={`/industries/${i.slug}`}
                className="group flex h-full flex-col justify-between gap-8 rounded-3xl border border-ink-08 bg-card p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-[0_16px_48px_-28px_rgba(15,15,15,0.22)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-40">
                    {i.focus.value}
                  </span>
                  <ArrowUpRight className="size-4 text-ink-40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                </div>
                <div>
                  <h2 className="text-[22px] font-extrabold leading-[1.15] tracking-tight text-ink">
                    {i.name}
                  </h2>
                  <p className="mt-3 text-[14.5px] font-medium leading-[1.55] text-ink-60">
                    {i.verdict}
                  </p>
                  <p className="mt-5 text-[13.5px] font-semibold text-electric-blue">
                    Read playbook
                    <span
                      aria-hidden="true"
                      className="ml-1 inline-block transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl border border-ink-08 bg-cream/50 p-8 text-center md:p-12">
        <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-ink">
          Not sure which playbook fits?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[15px] font-semibold leading-[1.65] text-ink-60">
          Book a strategy call. We will map your ICP to the right motion — or
          tell you when DIY tools are enough.
        </p>
        <div className="mt-8 flex justify-center">
          <CtaButton href={SITE.calendly}>Book a strategy call</CtaButton>
        </div>
      </section>
    </PageShell>
  )
}
