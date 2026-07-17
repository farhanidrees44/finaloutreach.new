import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { Breadcrumbs, PageCta, PageHeader, PageShell } from "@/components/site/page-shell"

export const metadata: Metadata = {
  title: "Cold email templates — structures that get replies",
  description:
    "Ten cold email template angles with the win conditions for each — the same structures we use in live B2B outbound campaigns.",
  alternates: { canonical: "/resources/email-templates" },
}

const TEMPLATES = [
  { name: "Specific-problem opener", reply: "18–24%", condition: "Strong trigger event in last 30 days" },
  { name: "Peer-proof intro", reply: "14–19%", condition: "Recognizable proof company in same vertical" },
  { name: "Audit offer", reply: "16–22%", condition: "Audit produces real value, not a sales pitch" },
  { name: "Competitor-switch angle", reply: "11–15%", condition: "Crowded category with clear differentiator" },
  { name: "Why-now trigger follow-up", reply: "22–30%", condition: "Sent 4–7 days after a real trigger" },
  { name: "Second-chance reopen", reply: "9–14%", condition: "Genuinely new info from prior touch" },
  { name: "Loom video opener", reply: "12–18%", condition: "Higher-ACV offers, decision-maker target" },
  { name: "Industry-report tease", reply: "10–16%", condition: "You can deliver the report, not just promise it" },
  { name: "Reverse-pitch question", reply: "13–20%", condition: "Buyer wants to challenge their assumptions" },
  { name: "Break-up email", reply: "8–13%", condition: "Sent only after 4–5 prior touches" },
]

export default function TemplatesPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Resources", href: "/resources" },
    { name: "Email templates", href: "/resources/email-templates" },
  ]
  return (
    <PageShell breadcrumbs={crumbs}>
      <Breadcrumbs items={crumbs} />
      <PageHeader
        eyebrow="Templates"
        title="Cold email structures we actually ship."
        italicize="actually ship"
        description="Ten template angles with the conditions they need to work. Steal the structure, rewrite for your offer, then test."
      />

      <section className="border-t border-ink-08">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <ul className="flex flex-col gap-3">
            {TEMPLATES.map((t, idx) => (
              <li
                key={t.name}
                className="grid grid-cols-1 gap-4 rounded-2xl border border-ink-08 bg-card p-6 md:grid-cols-[80px_1fr_auto_140px] md:items-center md:gap-8"
              >
                <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink-40">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="text-[18px] font-bold tracking-tight text-ink">
                    {t.name}
                  </h2>
                  <p className="mt-1 text-[13.5px] leading-[1.55] text-ink-60">
                    Win condition: {t.condition}
                  </p>
                </div>
                <div className="md:text-right">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-40">
                    Typical range
                  </p>
                  <span className="text-[26px] font-bold leading-none tabular tracking-tight">
                    {t.reply}
                  </span>
                </div>
                <a
                  href="/#final-cta"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-ink-08 px-4 text-[13px] font-medium text-ink transition-all hover:border-ink/30"
                >
                  Get full copy <ArrowRight className="size-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PageCta />
    </PageShell>
  )
}
