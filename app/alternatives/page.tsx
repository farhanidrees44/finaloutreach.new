import type { Metadata } from "next"
import Link from "next/link"
import { PageShell } from "@/components/site/page-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbsSchema } from "@/lib/seo/schemas"
import { TOOL_ALTERNATIVES, SITE } from "@/lib/site-data"

export const metadata: Metadata = {
  title: "Cold email tool alternatives",
  description:
    "Looking for an alternative to Instantly, Smartlead, Apollo, Lemlist, or Outreach.io? See where the tools fall short and when a done-for-you team beats them.",
  alternates: { canonical: "/alternatives" },
}

export default function AlternativesIndex() {
  return (
    <PageShell
      eyebrow="Tool alternatives"
      title="Cold email tools: where they shine, and where you outgrow them."
      description="If you have hit the limits of a tool — deliverability problems, copy fatigue, no time to manage replies — here is where a done-for-you team beats DIY software."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Tool alternatives" },
      ]}
    >
      <JsonLd
        data={breadcrumbsSchema([
          { name: "Home", url: SITE.domain },
          { name: "Tool alternatives", url: `${SITE.domain}/alternatives` },
        ])}
      />
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {TOOL_ALTERNATIVES.map((t) => (
          <li key={t.slug}>
            <Link
              href={`/alternatives/${t.slug}`}
              className="group flex items-center justify-between rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
            >
              <span className="font-medium">Alternatives to {t.name}</span>
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
