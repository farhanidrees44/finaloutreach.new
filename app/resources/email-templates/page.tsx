import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { Breadcrumbs, PageCta, PageHeader, PageShell } from "@/components/site/page-shell"

export const metadata: Metadata = {
  title: "Email templates library — 10 cold emails that worked",
  description:
    "Ten of our highest-performing cold email templates, with the reply rates we saw and the win conditions for each.",
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
        title="10 cold email templates that booked $1M+ in pipeline."
        italicize="$1M+ in pipeline"
        description="Each one with the real reply rate range and the conditions you need to hit for it to work. Steal them, change them, ship them."
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
                  <h2 className="text-[18px] font-medium tracking-display text-ink">
                    {t.name}
                  </h2>
                  <p className="mt-1 text-[13.5px] leading-[1.55] text-ink-60">
                    Win condition: {t.condition}
                  </p>
                </div>
                <span className="text-[26px] font-medium leading-none tabular tracking-display">
                  {t.reply}
                </span>
                <a
                  href="#"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-ink-08 px-4 text-[13px] font-medium text-ink transition-all hover:border-ink/30"
                >
                  View template <ArrowRight className="size-3.5" />
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
