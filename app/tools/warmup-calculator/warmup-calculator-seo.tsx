import Link from "next/link"
import {
  ToolAuditCta,
  ToolSectionLabel,
} from "@/components/tools/tool-seo-primitives"

const PHASES = [
  {
    title: "Foundation (days 1–14)",
    body: "Authenticate DNS, start automated warmup, keep real cold volume near zero. Goal: look human to ESPs with positive engagement patterns.",
  },
  {
    title: "Ramp (growth rule)",
    body: "Increase daily sends ~30% day-over-day from a low base (we start around 5/day). Jumping too fast is how new domains get throttled.",
  },
  {
    title: "Graduate to cold",
    body: "At the milestone, shift from warmup-tool traffic to real ICP sends — still restrained. Keep warmup light as a reputation buffer if needed.",
  },
]

const MISTAKES = [
  {
    bad: "Blasting 200/day on day three",
    good: "Follow the ramp; protect the domain for months of pipeline",
  },
  {
    bad: "Warming from the primary brand domain",
    good: "Dedicated cold domains — check them in the Domain Health Checker",
  },
  {
    bad: "Skipping SPF/DKIM/DMARC until “later”",
    good: "Authenticate first — warmup without identity is theater",
  },
]

export function WarmupCalculatorSeo() {
  return (
    <>
      <section className="border-t border-ink-08 bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
          <ToolSectionLabel>Why warmup exists</ToolSectionLabel>
          <h2 className="mt-6 max-w-3xl text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold leading-[1.08] tracking-tight text-ink">
            New domains do not get the benefit of the{" "}
            <span className="font-serif-italic text-electric-blue">doubt</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[16px] font-semibold leading-[1.65] text-ink-60">
            Receivers treat brand-new sending domains as risky until they see
            consistent, human-looking behavior. Warmup is how you earn that
            reputation without nuking deliverability on week one. Verify
            authentication with the{" "}
            <Link
              href="/tools/domain-health-checker"
              className="font-bold text-ink underline decoration-electric-blue/40 underline-offset-2"
            >
              Domain Health Checker
            </Link>{" "}
            before you start the calendar.
          </p>
        </div>
      </section>

      <section className="border-t border-ink-08 bg-cream/40">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
          <ToolSectionLabel>The ramp</ToolSectionLabel>
          <h2 className="mt-6 max-w-3xl text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold leading-[1.08] tracking-tight text-ink">
            30% day-over-day — the consensus{" "}
            <span className="font-serif-italic text-electric-blue">growth rule</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[16px] font-semibold leading-[1.65] text-ink-60">
            Aggressive enough to reach useful volume in weeks, not quarters —
            conservative enough to avoid looking like a botnet. Numbers are
            per-inbox; multiply by parallel inboxes for total domain volume.
          </p>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {PHASES.map((p) => (
              <article
                key={p.title}
                className="rounded-3xl border border-ink-08 bg-card p-7 shadow-[0_12px_40px_-24px_rgba(15,15,15,0.18)]"
              >
                <h3 className="text-[16px] font-bold tracking-tight text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 text-[14.5px] font-medium leading-[1.65] text-ink-60">
                  {p.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink-08 bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
          <ToolSectionLabel>Common mistakes</ToolSectionLabel>
          <h2 className="mt-6 max-w-3xl text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold leading-[1.08] tracking-tight text-ink">
            How teams burn domains in the{" "}
            <span className="font-serif-italic text-electric-blue">first month</span>
          </h2>
          <ul className="mt-12 divide-y divide-ink-08 border-y border-ink-08">
            {MISTAKES.map((m) => (
              <li
                key={m.bad}
                className="grid gap-4 py-7 md:grid-cols-2"
              >
                <div>
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-destructive">
                    Mistake
                  </p>
                  <p className="mt-2 text-[15px] font-medium text-ink-60">
                    {m.bad}
                  </p>
                </div>
                <div>
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-emerald-dark">
                    Do this instead
                  </p>
                  <p className="mt-2 text-[15px] font-medium text-ink">{m.good}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-ink-08 bg-cream/40">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="max-w-3xl rounded-3xl border border-ink-08 bg-card p-8 md:p-10">
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold leading-[1.15] tracking-tight text-ink">
              Warmup is a calendar.{" "}
              <span className="font-serif-italic text-electric-blue">
                Reputation is the asset.
              </span>
            </h2>
            <p className="mt-4 text-[16px] font-medium leading-[1.7] text-ink-60">
              Follow the day-by-day plan, keep complaint rates near zero, and do
              not confuse “tool says warmed” with “ready for aggressive cold.”
              When you graduate, keep copy clean and lists tight — see the{" "}
              <Link
                href="/resources/cold-email-playbook"
                className="font-bold text-ink underline decoration-electric-blue/40 underline-offset-2"
              >
                cold email playbook
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export function WarmupCalculatorCta() {
  return (
    <ToolAuditCta
      accent="warmup"
      title="Want domains purchased, authenticated, and warmed for you?"
      body="Free outreach audit — we review your current domains and map a safe ramp into live campaigns."
    />
  )
}
