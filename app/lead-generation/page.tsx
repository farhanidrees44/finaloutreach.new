import type { Metadata } from "next"
import Link from "next/link"
import { PageShell } from "@/components/site/page-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbsSchema } from "@/lib/seo/schemas"
import { CITIES, SITE } from "@/lib/site-data"

export const metadata: Metadata = {
  title: "B2B lead generation services",
  description:
    "B2B lead generation services for teams in 15+ major markets. Verified prospects, qualified meetings, and a 90-day pipeline guarantee.",
  alternates: { canonical: "/lead-generation" },
}

export default function LeadGenIndex() {
  return (
    <PageShell
      eyebrow="B2B lead generation"
      title="Lead generation services that book meetings, not just lists."
      description="We work with B2B teams across 15+ major markets. Pick yours below to see how we run lead generation in your region — including timezones, time-of-send testing, and local proof."
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
        {CITIES.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/lead-generation/${c.slug}`}
              className="group flex items-center justify-between rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
            >
              <div>
                <div className="font-medium">Lead generation in {c.name}</div>
                <div className="text-sm text-muted-foreground">{c.region}</div>
              </div>
              <span aria-hidden="true" className="text-muted-foreground transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}
