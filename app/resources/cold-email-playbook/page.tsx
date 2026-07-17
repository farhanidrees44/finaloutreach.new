import type { Metadata } from "next"
import { ArrowRight, Download } from "lucide-react"
import { Breadcrumbs, PageHeader, PageShell } from "@/components/site/page-shell"

export const metadata: Metadata = {
  title: "Cold email playbook — Free download",
  description:
    "Free cold email playbook covering deliverability, copy, sequencing, and measurement. Direct PDF download — no email gate.",
  alternates: { canonical: "/resources/cold-email-playbook" },
  openGraph: {
    title: "Cold email playbook — FinalOutreach",
    description:
      "Free cold email playbook covering deliverability, copy, sequencing, and measurement.",
  },
}

const CHAPTERS = [
  { n: "01", title: "Infrastructure that keeps you in the inbox" },
  { n: "02", title: "ICP, lists, and triggers" },
  { n: "03", title: "Subject lines, openers, and CTAs" },
  { n: "04", title: "Multi-touch sequencing without the spam smell" },
  { n: "05", title: "Reply handling, qualification, and handoff" },
  { n: "06", title: "Measurement that actually predicts pipeline" },
]

export default function PlaybookPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Resources", href: "/resources" },
    { name: "Cold email playbook", href: "/resources/cold-email-playbook" },
  ]
  return (
    <PageShell breadcrumbs={crumbs}>
      <Breadcrumbs items={crumbs} />
      <PageHeader
        eyebrow="Free playbook"
        title="The cold email playbook we wished we had in 2019."
        italicize="cold email playbook"
        description="Six chapters, zero theory. The systems we use with clients — open, free, no email required."
      />

      <section className="border-t border-ink-08">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 md:py-24 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col gap-8">
            <h2 className="text-[12px] uppercase tracking-[0.18em] text-ink-40">
              What is inside
            </h2>
            <ol className="flex flex-col gap-3">
              {CHAPTERS.map((c) => (
                <li
                  key={c.n}
                  className="flex items-center gap-6 rounded-2xl border border-ink-08 bg-card p-6"
                >
                  <span className="font-mono text-[14px] uppercase tracking-[0.18em] text-ink-40">
                    {c.n}
                  </span>
                  <span className="text-[18px] font-bold leading-[1.2] tracking-tight text-ink">
                    {c.title}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <aside className="flex h-fit flex-col gap-6 rounded-2xl border border-ink-08 bg-ink p-9 text-background sm:sticky sm:top-28">
            <Download className="size-5 text-amber" />
            <h3 className="text-[28px] font-bold leading-[1.05] tracking-tight">
              Download the playbook
            </h3>
            <p className="text-[14.5px] leading-[1.55] text-background/70">
              Free, no email required. Direct PDF download. Share it freely.
            </p>
            <a
              href="/final-outreach-cold-email-playbook.pdf"
              download="The-Cold-Email-Playbook-FinalOutreach.pdf"
              className="group mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-amber px-5 text-[14px] font-medium text-ink transition-all hover:bg-amber/90"
            >
              Download free PDF
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </aside>
        </div>
      </section>
    </PageShell>
  )
}
