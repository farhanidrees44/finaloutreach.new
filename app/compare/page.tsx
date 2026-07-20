import type { Metadata } from "next"
import Link from "next/link"
import { PageShell } from "@/components/site/page-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbsSchema } from "@/lib/seo/schemas"
import { SITE } from "@/lib/site-data"
import { COMPETITOR_PROFILES } from "@/lib/pseo/competitors"

export const metadata: Metadata = {
  title: "Compare FinalOutreach to other cold email agencies",
  description:
    "Honest, side-by-side comparisons of FinalOutreach with Belkins, Martal, Cleverly, Leadium, Callbox, and CIENCE — unique write-ups, not name-swap templates.",
  alternates: { canonical: "/compare" },
}

export default function CompareIndex() {
  return (
    <PageShell
      eyebrow="Compare agencies"
      title="How FinalOutreach compares to other cold email agencies."
      italicize="compares"
      description="Side-by-side breakdowns of model, fit, and where each agency honestly wins. Pick a competitor for the full comparison — written uniquely, not swapped names."
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
      <ul className="grid gap-4 md:grid-cols-2">
        {COMPETITOR_PROFILES.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/compare/${c.slug}`}
              className="group flex h-full flex-col rounded-3xl border border-ink-08 bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-[0_16px_48px_-28px_rgba(15,15,15,0.22)]"
            >
              <span className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-ink-40">
                Comparison
              </span>
              <span className="mt-3 text-[18px] font-extrabold tracking-tight text-ink">
                FinalOutreach vs {c.name}
              </span>
              <span className="mt-3 flex-1 text-[14.5px] font-medium leading-[1.6] text-ink-60">
                {c.verdict}
              </span>
              <span className="mt-5 text-[13.5px] font-semibold text-electric-blue">
                Read comparison
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
