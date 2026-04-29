import type { Metadata } from "next"
import { Breadcrumbs, PageCta, PageHeader, PageShell } from "@/components/site/page-shell"
import { RelatedLinks } from "@/components/site/related-links"
import { SITE } from "@/lib/site-data"

export const metadata: Metadata = {
  title: "About — The team behind FinalOutreach",
  description:
    "FinalOutreach is a senior operator team that runs outbound the way you would run it in-house — if you had time and a bigger budget.",
  alternates: { canonical: "/about" },
}

const VALUES = [
  {
    title: "Senior operators only",
    body: "Everyone on your account has run outbound at a company, not just at an agency. No SDR-mills, no offshore copy farms.",
  },
  {
    title: "Pipeline, not activity",
    body: "We report on meetings booked and pipeline sourced. Open rates and 'sent volume' are not our product.",
  },
  {
    title: "Honest audits",
    body: "If we cannot help, we will tell you in the first call. We pass on more business than we take.",
  },
  {
    title: "Weekly iteration",
    body: "Every campaign is reviewed weekly. Every reply, rewrite, and A/B test is documented and shared.",
  },
]

const TEAM = [
  { name: "Jordan Hale", role: "Founder & CEO", bio: "Previously VP Sales at 2 SaaS exits. Obsessed with pipeline efficiency." },
  { name: "Priya Narayanan", role: "Head of Strategy", bio: "10 years across B2B agencies. Built outbound orgs at scale." },
  { name: "Marcus Webb", role: "Head of Copy", bio: "Writer turned strategist. The voice behind our top-performing sequences." },
  { name: "Alina Kowalski", role: "Head of Deliverability", bio: "Infrastructure nerd. The reason our clients land in the inbox." },
  { name: "Tomás Rivera", role: "Head of Accounts", bio: "Ran 40+ campaigns. Translates results into leadership updates." },
  { name: "Fatima Abara", role: "Head of Data", bio: "ICP whisperer. Builds the lists that make our sequences work." },
]

export default function AboutPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
  ]
  return (
    <PageShell breadcrumbs={crumbs}>
      <Breadcrumbs items={crumbs} />
      <PageHeader
        eyebrow="About"
        title="An outbound team that acts like operators."
        italicize="operators"
        description={`${SITE.name} started in ${SITE.founded} with a simple belief: B2B companies should not have to choose between burning out their SDRs and outsourcing to a spam factory.`}
      />

      <section className="border-t border-ink-08">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 md:py-28 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-ink-40">
              <span className="h-px w-8 bg-ink-08" />
              <span>Our story</span>
            </div>
            <h2 className="mt-6 text-balance text-[36px] font-medium leading-[1.05] tracking-display sm:text-[44px]">
              We built the outbound team we wished we could hire.
            </h2>
          </div>
          <div className="flex flex-col gap-5 text-[16px] leading-[1.7] text-ink-60">
            <p>
              FinalOutreach was founded by Jordan Hale after running sales at
              two SaaS exits and watching every outbound agency underdeliver
              on what looked like a solvable problem.
            </p>
            <p>
              Seven years later, we are a team of senior operators running
              pipeline for 200+ B2B companies — from Series A startups to
              billion-dollar enterprises. We have generated $47M+ in attributed
              pipeline and booked 12,400+ meetings.
            </p>
            <p>
              The rules have not changed since day one: senior operators on
              every account, weekly iteration, honest reporting, and a bias
              toward being small and excellent rather than big and average.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-ink-08 bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-ink-40">
            <span className="h-px w-8 bg-ink-08" />
            <span>Values</span>
          </div>
          <h2 className="mt-6 max-w-3xl text-balance text-[36px] font-medium leading-[1.05] tracking-display sm:text-[44px]">
            Four things we will never compromise on.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            {VALUES.map((v, idx) => (
              <div key={v.title} className="rounded-2xl border border-ink-08 bg-background p-7">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-40">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-8 text-[22px] font-medium leading-[1.15] tracking-display text-ink">
                  {v.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-60">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="border-t border-ink-08">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-ink-40">
            <span className="h-px w-8 bg-ink-08" />
            <span>Team</span>
          </div>
          <h2 className="mt-6 max-w-3xl text-balance text-[36px] font-medium leading-[1.05] tracking-display sm:text-[44px]">
            The people actually running your campaigns.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((t) => (
              <div key={t.name} className="rounded-2xl border border-ink-08 bg-card p-6">
                <div className="grid size-12 place-items-center rounded-full bg-cream text-[15px] font-medium text-ink">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="mt-5 text-[18px] font-medium text-ink">{t.name}</h3>
                <p className="text-[12.5px] uppercase tracking-[0.14em] text-ink-40">{t.role}</p>
                <p className="mt-3 text-[14px] leading-[1.55] text-ink-60">{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="careers" className="border-t border-ink-08 bg-ink text-background">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-background/50">
            <span className="h-px w-8 bg-background/20" />
            <span>Careers</span>
          </div>
          <h2 className="mt-6 max-w-3xl text-balance text-[36px] font-medium leading-[1.05] tracking-display sm:text-[44px]">
            We hire operators, not agency lifers.
          </h2>
          <p className="mt-5 max-w-2xl text-[16px] leading-[1.65] text-background/70">
            We are small and selective. If you have run outbound inside a
            company and want to run it for many — we should talk. Email careers@finaloutreach.com.
          </p>
        </div>
      </section>

      <PageCta />
      <RelatedLinks
        title="Learn more"
        items={[
          { href: "/process", label: "Our process", meta: "How engagements actually run" },
          { href: "/case-studies", label: "Case studies", meta: "Real results" },
          { href: "/services", label: "Services", meta: "Six offerings" },
          { href: "/contact", label: "Contact", meta: "Book a strategy call" },
          { href: "/pricing", label: "Pricing", meta: "Transparent packages" },
          { href: "/blog", label: "Blog", meta: "Free outbound playbooks" },
        ]}
      />
    </PageShell>
  )
}
