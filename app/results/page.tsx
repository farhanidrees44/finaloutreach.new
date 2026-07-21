import type { Metadata } from "next"
import {
  Breadcrumbs,
  PageShell,
} from "@/components/site/page-shell"
import {
  ResultsClosingCta,
  ResultsPageContent,
} from "@/components/site/results-page-content"
import { SITE } from "@/lib/site-data"

const PAGE_TITLE = "Live proof — real outbound campaigns"
const PAGE_DESCRIPTION =
  "Inspect real campaign metrics by industry and stage. No invented case counts, no fabricated client quotes — named logos only with written permission."

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/results" },
  openGraph: {
    title: `Live proof — ${SITE.name}`,
    description: PAGE_DESCRIPTION,
    url: `${SITE.domain}/results`,
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
}

export default function ResultsPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Results", href: "/results" },
  ]

  return (
    <PageShell>
      <Breadcrumbs items={crumbs} />

      <section className="mx-auto max-w-7xl px-6 pb-10 pt-10 md:px-10 md:pb-14 md:pt-14 lg:px-12">
        <div className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.18em] text-ink-40">
          <span className="h-px w-8 bg-ink-08" />
          <span>Results · Live proof</span>
        </div>
        <h1 className="mt-6 max-w-4xl text-balance text-[40px] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[56px] md:text-[64px]">
          How we book meetings,{" "}
          <span className="font-serif-italic text-electric-blue">
            week by week.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-[17px] font-bold leading-[1.65] text-ink-60 sm:text-[18px]">
          Industry and stage only. Named clients and quotes appear only with
          written permission. Every number on this page matches live dashboard
          proof — no agency theatre, no endless decks.
        </p>
      </section>

      <ResultsPageContent />
      <ResultsClosingCta />
    </PageShell>
  )
}
