import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Check } from "lucide-react"
import { Breadcrumbs, PageCta, PageHeader, PageShell } from "@/components/site/page-shell"
import { RelatedLinks } from "@/components/site/related-links"
import { SERVICES, SITE } from "@/lib/site-data"

export const metadata: Metadata = {
  title: "Services — B2B cold email and lead generation",
  description:
    "Six outbound services built for B2B teams: done-for-you cold email, LinkedIn outreach, lead list building, appointment setting, infrastructure setup, and a free audit.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: `Services — ${SITE.name}`,
    description:
      "Done-for-you outbound services for B2B teams: cold email, LinkedIn, lists, appointment setting, and infrastructure.",
    url: `${SITE.domain}/services`,
  },
}

export default function ServicesPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
  ]
  return (
    <PageShell breadcrumbs={crumbs}>
      <Breadcrumbs items={crumbs} />
      <PageHeader
        eyebrow="Services"
        title="Everything it takes to fill your pipeline."
        italicize="fill"
        description="Six interlocking services. Use one or run them together as a complete outbound engine. Senior operators on every account, never juniors."
      />

      <section className="border-t border-ink-08">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 py-16 md:grid-cols-2 md:py-24">
          {SERVICES.map((s, idx) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group flex flex-col justify-between gap-8 rounded-2xl border border-ink-08 bg-card p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/25 sm:p-9"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-40">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="rounded-full border border-ink-08 px-2.5 py-1 text-[11px] font-medium text-ink-60">
                  {s.price}
                </span>
              </div>
              <div>
                <h2 className="text-[26px] font-medium leading-[1.1] tracking-display text-ink sm:text-[30px]">
                  {s.title}
                </h2>
                <p className="mt-3 max-w-md text-[14.5px] leading-[1.6] text-ink-60">
                  {s.tagline}
                </p>
                <div className="mt-6 flex items-center gap-1.5 text-[13.5px] font-medium text-ink">
                  <span className="border-b border-ink/30 pb-0.5 transition-colors group-hover:border-ink">
                    View service
                  </span>
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-ink-08 bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-ink-40">
                <span className="h-px w-8 bg-ink-08" />
                <span>Our belief</span>
              </div>
              <h2 className="mt-6 text-balance text-[36px] font-medium leading-[1.05] tracking-display sm:text-[44px]">
                Outbound is not a funnel. It is an operating system.
              </h2>
            </div>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                "Copy that sounds like a human, not a template",
                "Lists that cut off the bottom 80%, not the top 80%",
                "Infrastructure that lands in the inbox, not in spam",
                "Weekly iteration, not set-and-forget",
                "Senior operators on every account, never juniors",
                "Transparent reporting you can share with leadership",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl border border-ink-08 bg-background p-5">
                  <Check className="mt-0.5 size-4 shrink-0 text-[oklch(0.55_0.13_78)]" />
                  <span className="text-[14.5px] leading-[1.5] text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <PageCta
        title="Not sure which service you need?"
        subtitle="Book a 30-minute call. We will walk you through a custom recommendation — no commitment."
      />
      <RelatedLinks
        title="Related"
        items={[
          { href: "/industries", label: "Industries we serve", meta: "Specialized playbooks per vertical" },
          { href: "/case-studies", label: "Case studies", meta: "Real results, real numbers" },
          { href: "/process", label: "Our process", meta: "How an engagement actually runs" },
          { href: "/pricing", label: "Pricing", meta: "Transparent, no lock-in" },
          { href: "/about", label: "About us", meta: "Team and story" },
          { href: "/blog", label: "Blog", meta: "Tactical outbound playbooks" },
        ]}
      />
    </PageShell>
  )
}
