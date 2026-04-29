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
    n: "01",
    week: "Week 0",
    title: "Discovery and fit",
    body: "30-minute call to understand your ICP, goals, and constraints. We confirm mutual fit before anyone signs anything.",
  },
  {
    n: "02",
    week: "Week 1",
    title: "Kickoff and ICP workshop",
    body: "Deep dive on your buyer. We leave with a documented ICP, target personas, trigger criteria, and offer positioning.",
  },
  {
    n: "03",
    week: "Week 1–2",
    title: "Infrastructure and list build",
    body: "Domains registered, mailboxes configured, DNS locked in, and the first 2,000-lead list researched and verified.",
  },
  {
    n: "04",
    week: "Week 2–3",
    title: "Sequence writing",
    body: "Senior copywriter drafts the first 3-touch sequence. You review once, we finalize, we send you a test send from every mailbox.",
  },
  {
    n: "05",
    week: "Week 3",
    title: "Warm-up complete, first launch",
    body: "Infrastructure is warm, deliverability is verified at 90%+ inbox placement, and the first campaign goes live.",
  },
  {
    n: "06",
    week: "Week 4+",
    title: "Weekly iteration",
    body: "Every week: reply review, copy tweaks, list refresh, and a 20-minute call walking through what changed and why.",
  },
  {
    n: "07",
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

      <section className="border-t border-ink-08">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <ol className="flex flex-col gap-3">
            {STEPS.map((s) => (
              <li
                key={s.n}
                className="grid grid-cols-1 gap-6 rounded-2xl border border-ink-08 bg-card p-7 md:grid-cols-[120px_140px_1fr] md:items-center md:gap-10 md:p-10"
              >
                <span className="font-mono text-[14px] uppercase tracking-[0.18em] text-ink-40">
                  {s.n}
                </span>
                <span className="text-[12.5px] uppercase tracking-[0.18em] text-[oklch(0.55_0.13_78)]">
                  {s.week}
                </span>
                <div>
                  <h2 className="text-[22px] font-medium leading-[1.2] tracking-display text-ink sm:text-[26px]">
                    {s.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-[14.5px] leading-[1.6] text-ink-60">
                    {s.body}
                  </p>
                </div>
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
          { href: "/case-studies", label: "Case studies" },
          { href: "/about", label: "About" },
          { href: "/contact", label: "Contact" },
          { href: "/blog", label: "Blog" },
        ]}
      />
    </PageShell>
  )
}
