import type { Metadata } from "next"
import { Breadcrumbs, PageCta, PageHeader, PageShell } from "@/components/site/page-shell"
import { RelatedLinks } from "@/components/site/related-links"

export const metadata: Metadata = {
  title: "Process — How an engagement actually runs",
  description:
    "A clear, step-by-step breakdown of how we build, launch, and iterate outbound campaigns for our clients.",
  alternates: { canonical: "/process" },
}

const STEPS = [
  {
    week: "Week 0",
    title: "Discovery and fit",
    body: "30-minute call to understand your ICP, goals, and constraints. We confirm mutual fit before anyone signs anything.",
  },
  {
    week: "Week 1",
    title: "Kickoff and ICP workshop",
    body: "Deep dive on your buyer. We leave with a documented ICP, target personas, trigger criteria, and offer positioning.",
  },
  {
    week: "Week 1–2",
    title: "Infrastructure and list build",
    body: "Domains registered, mailboxes configured, DNS locked in, and the first 2,000-lead list researched and verified.",
  },
  {
    week: "Week 2–3",
    title: "Sequence writing",
    body: "Senior copywriter drafts the first 3-touch sequence. You review once, we finalize, we send you a test send from every mailbox.",
  },
  {
    week: "Week 3",
    title: "Warm-up complete, first launch",
    body: "Infrastructure is warm, deliverability is verified at 90%+ inbox placement, and the first campaign goes live.",
  },
  {
    week: "Week 4+",
    title: "Weekly iteration",
    body: "Every week: reply review, copy tweaks, list refresh, and a 20-minute call walking through what changed and why.",
  },
  {
    week: "Month 3",
    title: "Quarterly review",
    body: "We step back. What is working, what is not, what we are removing, what we are adding. Transparent, documented, signed off.",
  },
]

export default function ProcessPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Process", href: "/process" },
  ]
  return (
    <PageShell breadcrumbs={crumbs}>
      <Breadcrumbs items={crumbs} />
      <PageHeader
        eyebrow="Process"
        title="Exactly how your first 90 days go."
        italicize="90 days"
        description="No black boxes. Here is every week from kickoff through your first quarterly review."
      />

      <section className="border-t border-ink-08 bg-cream/40">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
          <ol className="flex flex-col items-center gap-8 sm:gap-10">
            {STEPS.map((s) => (
              <li
                key={s.title}
                className="flex w-full max-w-xl flex-col items-center text-center"
              >
                <span
                  className={[
                    "inline-flex items-center justify-center rounded-full bg-white px-4 py-1.5 sm:px-5 sm:py-2",
                    "text-[11px] font-semibold uppercase tracking-[0.18em] text-electric-blue sm:text-[12px]",
                    "shadow-[0_4px_16px_-4px_oklch(0.58_0.22_250_/_0.28),0_1px_2px_oklch(0.156_0_0_/_0.04)]",
                    "ring-1 ring-ink-08/60",
                  ].join(" ")}
                >
                  {s.week}
                </span>
                <h2 className="mt-5 text-balance text-[22px] font-extrabold leading-[1.2] tracking-tight text-ink sm:text-[26px]">
                  {s.title}
                </h2>
                <p className="mt-3 max-w-md text-pretty text-[14.5px] leading-[1.65] text-ink-60 sm:text-[15px]">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <PageCta />
      <RelatedLinks
        title="Related"
        items={[
          { href: "/services", label: "Services" },
          { href: "/pricing", label: "Pricing" },
          { href: "/results", label: "Live results" },
          { href: "/about", label: "About" },
          { href: "/contact", label: "Contact" },
          { href: "/blog", label: "Blog" },
        ]}
      />
    </PageShell>
  )
}
