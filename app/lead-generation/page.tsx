import type { Metadata } from "next"
import Link from "next/link"
import { PageShell } from "@/components/site/page-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbsSchema } from "@/lib/seo/schemas"
import { SITE } from "@/lib/site-data"
import { CITY_PROFILES } from "@/lib/pseo/cities"

export const metadata: Metadata = {
  title: "B2B lead generation services by market",
  description:
    "Market-specific B2B lead generation for teams in New York, San Francisco, London, Dubai, Singapore, and more — timing, compliance, and ICP notes without invented local stats.",
  alternates: { canonical: "/lead-generation" },
}

export default function LeadGenIndex() {
  return (
    <PageShell
      eyebrow="B2B lead generation"
      title="Lead generation services that book meetings, not just lists."
      italicize="book meetings"
      description="Pick a market for how we run outbound with HQ teams there — timezone, compliance posture, and ICP patterns. No fabricated city campaign counts."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Lead generation" },
      ]}
    >
      <JsonLd
        data={breadcrumbsSchema([
          { name: "Home", url: SITE.domain },
          { name: "Lead generation", url: `${SITE.domain}/lead-generation` },
        ])}
      />
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {CITY_PROFILES.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/lead-generation/${c.slug}`}
              className="group flex h-full flex-col rounded-3xl border border-ink-08 bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-[0_16px_48px_-28px_rgba(15,15,15,0.22)]"
            >
              <span className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-ink-40">
                {c.region}
              </span>
              <span className="mt-3 text-[18px] font-extrabold tracking-tight text-ink">
                {c.name}
              </span>
              <span className="mt-3 flex-1 text-[14px] font-medium leading-[1.55] text-ink-60">
                {c.verdict}
              </span>
              <span className="mt-5 text-[13.5px] font-semibold text-electric-blue">
                Market guide
                <span
                  aria-hidden="true"
                  className="ml-1 inline-block transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}
