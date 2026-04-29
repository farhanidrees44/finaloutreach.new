import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, BookOpen, Calculator, FileText, Mail } from "lucide-react"
import { Breadcrumbs, PageCta, PageHeader, PageShell } from "@/components/site/page-shell"
import { NewsletterForm } from "@/components/site/newsletter-form"

export const metadata: Metadata = {
  title: "Resources — Free outbound playbooks and tools",
  description:
    "Free playbooks, email templates, ROI calculators, and an outbound glossary — built from the same systems we use with clients.",
  alternates: { canonical: "/resources" },
}

const RESOURCES = [
  {
    href: "/resources/cold-email-playbook",
    icon: BookOpen,
    label: "Cold email playbook",
    desc: "60-page playbook covering deliverability, copy, sequencing, and measurement.",
    cta: "Download free",
  },
  {
    href: "/resources/email-templates",
    icon: FileText,
    label: "Email templates library",
    desc: "10 of our highest-performing cold email templates, with reply rate data.",
    cta: "Get the templates",
  },
  {
    href: "#calculator",
    icon: Calculator,
    label: "Outbound ROI calculator",
    desc: "Estimate the pipeline you should expect from outbound at your stage.",
    cta: "Open calculator",
  },
  {
    href: "#glossary",
    icon: BookOpen,
    label: "Outbound glossary",
    desc: "100+ terms decoded — from SPF to ICP to MQL.",
    cta: "Browse glossary",
  },
]

export default function ResourcesPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Resources", href: "/resources" },
  ]
  return (
    <PageShell breadcrumbs={crumbs}>
      <Breadcrumbs items={crumbs} />
      <PageHeader
        eyebrow="Resources"
        title="Free playbooks. No email gates on the good ones."
        italicize="No email gates"
        description="The same playbooks, templates, and frameworks we use with clients. Open them, use them, share them."
      />

      <section className="border-t border-ink-08">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 py-16 md:grid-cols-2 md:py-24">
          {RESOURCES.map((r) => (
            <Link
              key={r.label}
              href={r.href}
              className="group flex flex-col justify-between gap-8 rounded-2xl border border-ink-08 bg-card p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/25 sm:p-9"
            >
              <div className="flex items-start justify-between">
                <div className="grid size-10 place-items-center rounded-lg bg-cream text-ink">
                  <r.icon className="size-5" strokeWidth={1.6} />
                </div>
                <ArrowUpRight className="size-4 text-ink-40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
              </div>
              <div>
                <h2 className="text-[24px] font-medium leading-[1.15] tracking-display text-ink">
                  {r.label}
                </h2>
                <p className="mt-3 max-w-md text-[14.5px] leading-[1.6] text-ink-60">
                  {r.desc}
                </p>
                <div className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink">
                  <span className="border-b border-ink/30 pb-0.5 transition-colors group-hover:border-ink">
                    {r.cta}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="newsletter" className="border-t border-ink-08 bg-cream">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-20 md:py-28 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-ink-40">
              <Mail className="size-3.5" />
              <span>Newsletter</span>
            </div>
            <h2 className="mt-6 text-balance text-[36px] font-medium leading-[1.05] tracking-display sm:text-[44px]">
              One tactical outbound idea per week.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-[1.65] text-ink-60">
              No fluff, no roundups. One specific tactic from a campaign we
              ran that week, why it worked, and how to copy it.
            </p>
          </div>
          <NewsletterForm source="resources" className="self-end" />
        </div>
      </section>

      <PageCta />
    </PageShell>
  )
}
