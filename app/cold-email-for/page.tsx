import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PageShell } from "@/components/site/page-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbsSchema } from "@/lib/seo/schemas"
import { SITE } from "@/lib/site-data"
import { RICH_INDUSTRIES } from "@/lib/industries-data"

export const metadata: Metadata = {
  title: "Cold email services by industry",
  description:
    "Done-for-you cold email playbooks tailored to 8 high-value B2B industries. Real benchmarks, real pricing, real client results — pick your industry below.",
  alternates: { canonical: "/cold-email-for" },
}

export default function ColdEmailForIndex() {
  return (
    <PageShell
      eyebrow="Cold email by industry"
      title="Cold email services tailored to your industry."
      description="Generic outbound playbooks fail in specialised industries. Below are eight categories where we have run dozens of campaigns and have benchmarks worth sharing."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Cold email by industry" },
      ]}
    >
      <JsonLd
        data={breadcrumbsSchema([
          { name: "Home", url: SITE.domain },
          {
            name: "Cold email by industry",
            url: `${SITE.domain}/cold-email-for`,
          },
        ])}
      />
      <ul className="grid gap-4 md:grid-cols-2">
        {RICH_INDUSTRIES.map((i) => (
          <li key={i.slug}>
            <Link
              href={`/cold-email-for/${i.slug}`}
              className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-lg">
                  Cold email for {i.nameLower}
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1"
                />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {i.hero.subtitle}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {i.benchmarks.slice(0, 3).map((b) => (
                  <span
                    key={b.label}
                    className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground"
                  >
                    {b.value} {b.label.toLowerCase()}
                  </span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}
