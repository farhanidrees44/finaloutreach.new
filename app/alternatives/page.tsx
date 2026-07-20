import type { Metadata } from "next"
import Link from "next/link"
import { PageShell } from "@/components/site/page-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbsSchema } from "@/lib/seo/schemas"
import { SITE } from "@/lib/site-data"
import { TOOL_ALTERNATIVE_PROFILES } from "@/lib/pseo/tools"

export const metadata: Metadata = {
  title: "Cold email tool alternatives",
  description:
    "Outgrowing Instantly, Smartlead, Apollo, Lemlist, or Outreach.io? Honest pages on where each tool shines — and when a done-for-you team is the real alternative.",
  alternates: { canonical: "/alternatives" },
}

export default function AlternativesIndex() {
  return (
    <PageShell
      eyebrow="Tool alternatives"
      title="Cold email tools: where they shine, and where you outgrow them."
      italicize="outgrow them"
      description="Unique write-ups for Instantly, Smartlead, Apollo, Lemlist, and Outreach.io — not the same four bullets with the logo swapped."
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
      <ul className="grid gap-4 md:grid-cols-2">
        {TOOL_ALTERNATIVE_PROFILES.map((t) => (
          <li key={t.slug}>
            <Link
              href={`/alternatives/${t.slug}`}
              className="group flex h-full flex-col rounded-3xl border border-ink-08 bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-[0_16px_48px_-28px_rgba(15,15,15,0.22)]"
            >
              <span className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-ink-40">
                {t.category}
              </span>
              <span className="mt-3 text-[18px] font-extrabold tracking-tight text-ink">
                Alternatives to {t.name}
              </span>
              <span className="mt-3 flex-1 text-[14.5px] font-medium leading-[1.6] text-ink-60">
                {t.verdict}
              </span>
              <span className="mt-5 text-[13.5px] font-semibold text-electric-blue">
                Read guide
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
