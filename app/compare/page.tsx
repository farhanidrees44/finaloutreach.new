import type { Metadata } from "next"
import Link from "next/link"
import { PageShell } from "@/components/site/page-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbsSchema } from "@/lib/seo/schemas"
import { COMPETITORS, SITE } from "@/lib/site-data"

export const metadata: Metadata = {
  title: "Compare FinalOutreach to other cold email agencies",
  description:
    "Honest, side-by-side comparisons of FinalOutreach with Belkins, Martal, Cleverly, Leadium, Callbox, and CIENCE. Pricing, deliverables, and where each one fits.",
  alternates: { canonical: "/compare" },
}

export default function CompareIndex() {
  return (
    <PageShell
      eyebrow="Compare agencies"
      title="How FinalOutreach compares to other cold email agencies."
      description="No marketing fluff. Just side-by-side breakdowns of pricing, deliverables, ICP fit, and where each agency wins or loses. Pick a competitor below to see the full comparison."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Compare" },
      ]}
    >
      <JsonLd
        data={breadcrumbsSchema([
          { name: "Home", url: SITE.domain },
          { name: "Compare", url: `${SITE.domain}/compare` },
        ])}
      />
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {COMPETITORS.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/compare/${c.slug}`}
              className="group flex items-center justify-between rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
            >
              <span className="font-medium">FinalOutreach vs {c.name}</span>
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
