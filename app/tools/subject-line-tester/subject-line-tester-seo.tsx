import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { SITE } from "@/lib/site-data"

const BENCHMARK_ROWS = [
  { industry: "SaaS / software", range: "Often highest among B2B cold" },
  { industry: "Professional services", range: "Typically mid-range" },
  { industry: "Banking / financial services", range: "Often lower (trust + filters)" },
  { industry: "Consumer goods / retail", range: "Often among the lowest" },
]

const EXAMPLES: { format: string; lines: { subject: string; why: string }[] }[] =
  [
    {
      format: "Curiosity gap",
      lines: [
        {
          subject: "noticed something on your pricing page",
          why: "Specific observation without revealing the ask — invites an open.",
        },
        {
          subject: "your competitor's outbound angle",
          why: "Peer comparison creates a curiosity gap without spam urgency.",
        },
      ],
    },
    {
      format: "Direct benefit",
      lines: [
        {
          subject: "cut SDR ramp time by 3 weeks",
          why: "Concrete outcome + number — specificity over hype.",
        },
        {
          subject: "fewer no-shows on discovery calls",
          why: "Names a pain operators already feel.",
        },
      ],
    },
    {
      format: "Question / reply-bait",
      lines: [
        {
          subject: "wrong person for outbound at Acme?",
          why: "Easy yes/no reply — optimized for response rate, not vanity opens.",
        },
        {
          subject: "still owning pipeline at Series B?",
          why: "Role + stage personalization baked into a short question.",
        },
      ],
    },
    {
      format: "Number-led",
      lines: [
        {
          subject: "32% lower CAC after list cleanup",
          why: "Lead with the number; skip the marketing adjectives.",
        },
        {
          subject: "14 meetings from 1 sequence",
          why: "Outcome-first framing that stays under the mobile cut.",
        },
      ],
    },
    {
      format: "Pattern interrupt",
      lines: [
        {
          subject: "not another demo request",
          why: "Breaks the expected sales pattern without ALL CAPS or emoji.",
        },
        {
          subject: "permission to send one idea?",
          why: "Low-pressure ask that feels human on first touch.",
        },
      ],
    },
  ]

const FACTOR_EXPLAINERS = [
  {
    title: "Length & word count",
    body: "Cold first-touch has low trust. Subjects past ~55 characters get truncated on mobile; past 7 words they start reading like newsletter marketing. Aim for 2–7 words when you can.",
    good: "Acme pricing — quick question",
    bad: "I wanted to reach out about a potential partnership opportunity",
  },
  {
    title: "Spam triggers",
    body: (
      <>
        Words like “free,” “urgent,” and “limited time” are weighted harder when
        you are not on a permission list. For a full body scan, use the{" "}
        <Link
          href="/tools/spam-word-checker"
          className="font-bold text-ink underline decoration-electric-blue/40 underline-offset-2 hover:decoration-electric-blue"
        >
          Spam Word Checker
        </Link>
        .
      </>
    ),
    good: "Saw your Series B announcement",
    bad: "FREE limited-time offer — act now!!!",
  },
  {
    title: "ALL-CAPS & punctuation",
    body: "ALL CAPS and stacked exclamation marks are classic spam-filter signals and suppress cold opens. Sentence case wins.",
    good: "quick note on your hiring page",
    bad: "URGENT PARTNERSHIP OPPORTUNITY!!!",
  },
  {
    title: "Emoji & merge-tag risk",
    body: "Emoji raise filter risk more on cold than on newsletters. Unresolved {{first_name}} or [[Company]] tokens destroy trust instantly — a check newsletter testers rarely prioritize.",
    good: "Jordan — note on Acme’s hiring",
    bad: "Hi {{first_name}} 🔥 {{company}} deal",
  },
  {
    title: "Personalization quality",
    body: "First name alone is weak. Company, role, or trigger-event detail is what lifts cold opens and replies in recent industry studies and live outbound practice.",
    good: "Your new VP Sales hire — timing?",
    bad: "{{first_name}} — checking in",
  },
  {
    title: "Reply-bait, specificity, curiosity",
    body: "Cold KPI is reply rate. Questions invite a response; numbers add credibility; a light curiosity gap earns the open without sounding like clickbait.",
    good: "How Acme cut CAC by 32%?",
    bad: "Exciting opportunity inside",
  },
  {
    title: "Generic openers & human tone",
    body: (
      <>
        “Checking in” and “following up” get archived. Lowercase starts and
        conversational phrasing read like a real note. Domain reputation still
        matters — check{" "}
        <Link
          href="/tools/domain-health-checker"
          className="font-bold text-ink underline decoration-electric-blue/40 underline-offset-2 hover:decoration-electric-blue"
        >
          Domain Health
        </Link>{" "}
        before you scale volume.
      </>
    ),
    good: "saw the new pricing page",
    bad: "Following up on my last email",
  },
]

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-4 text-[12px] uppercase tracking-[0.2em]">
      <span className="h-px w-10 bg-gradient-to-r from-ink-20 to-ink-08" />
      <span className="font-medium text-ink-40">{children}</span>
    </div>
  )
}

export function SubjectLineTesterSeo() {
  return (
    <>
      <section className="border-t border-ink-08 bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
          <SectionLabel>Benchmarks</SectionLabel>
          <h2 className="mt-6 max-w-3xl text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold leading-[1.08] tracking-tight text-ink">
            What counts as a good cold email open rate in{" "}
            <span className="font-serif-italic text-electric-blue">2026</span>
          </h2>
          <div className="mt-8 max-w-3xl space-y-4 text-[16px] font-medium leading-[1.7] text-ink-60">
            <p>
              Aggregated public industry studies put average cold email open
              rates in the low-to-mid 20s% as of 2026. A genuinely strong subject
              line — paired with clean infrastructure — can push toward 45%+ on
              a warmed domain. Treat those as typical ranges, not guarantees.
            </p>
            <p>
              Apple Mail Privacy Protection pre-loads tracking pixels for a large
              share of opens, which inflates reported rates. Reply rate and
              click-to-open are more reliable signals than raw open rate alone.
            </p>
            <p>
              Personalized subject lines with real company-specific detail (not
              just a merge tag for first name) show materially higher open and
              reply rates than generic ones across recent studies. Subject lines
              in the 2–7 word range consistently outperform longer ones;
              all-lowercase / sentence case beats Title Case and especially ALL
              CAPS.
            </p>
            <p>
              For the full outbound system behind these numbers — ICP, warmup,
              sequencing — see the{" "}
              <Link
                href="/resources/cold-email-playbook"
                className="font-bold text-ink underline decoration-electric-blue/40 underline-offset-2 hover:decoration-electric-blue"
              >
                Cold Email Playbook
              </Link>
              .
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-3xl border border-ink-08 bg-card shadow-[0_16px_48px_-28px_rgba(15,15,15,0.22)]">
            <table className="w-full text-left text-[14px]">
              <caption className="border-b border-ink-08 bg-cream/50 px-5 py-3.5 text-left text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-40">
                Typical cold open-rate ranges by industry (public studies)
              </caption>
              <thead>
                <tr className="border-b border-ink-08 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-40">
                  <th className="px-5 py-3">Industry</th>
                  <th className="px-5 py-3">Relative range</th>
                </tr>
              </thead>
              <tbody>
                {BENCHMARK_ROWS.map((row) => (
                  <tr
                    key={row.industry}
                    className="border-b border-ink-08 last:border-0"
                  >
                    <td className="px-5 py-3.5 font-bold text-ink">
                      {row.industry}
                    </td>
                    <td className="px-5 py-3.5 font-medium text-ink-60">
                      {row.range}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-t border-ink-08 bg-cream/40">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
          <SectionLabel>How the grader works</SectionLabel>
          <h2 className="mt-6 max-w-3xl text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold leading-[1.08] tracking-tight text-ink">
            15-factor breakdown — why each check matters on{" "}
            <span className="font-serif-italic text-electric-blue">cold email</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[16px] font-semibold leading-[1.65] text-ink-60">
            Newsletter testers score for opted-in lists. These factors are
            weighted for first-touch outbound — spam sensitivity, trust, and
            reply orientation.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {FACTOR_EXPLAINERS.map((f) => (
              <article
                key={f.title}
                className="rounded-3xl border border-ink-08 bg-card p-7 shadow-[0_12px_40px_-24px_rgba(15,15,15,0.18)]"
              >
                <h3 className="text-[17px] font-bold tracking-tight text-ink">
                  {f.title}
                </h3>
                <p className="mt-2 text-[14.5px] font-medium leading-[1.65] text-ink-60">
                  {f.body}
                </p>
                <dl className="mt-5 space-y-3 border-t border-ink-08 pt-5 text-[13px]">
                  <div>
                    <dt className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-emerald-dark">
                      Works
                    </dt>
                    <dd className="mt-1 font-mono text-[13.5px] text-ink">
                      {f.good}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-destructive">
                      Avoid
                    </dt>
                    <dd className="mt-1 font-mono text-[13.5px] text-ink-60">
                      {f.bad}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink-08 bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
          <SectionLabel>Examples</SectionLabel>
          <h2 className="mt-6 max-w-3xl text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold leading-[1.08] tracking-tight text-ink">
            Cold email subject line examples that work in{" "}
            <span className="font-serif-italic text-electric-blue">2026</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[16px] font-semibold leading-[1.65] text-ink-60">
            Steal the structure, not the words — swap in your prospect’s company,
            trigger, or metric.
          </p>
          <div className="mt-12 space-y-12">
            {EXAMPLES.map((group) => (
              <div key={group.format}>
                <h3 className="inline-flex items-center gap-2 rounded-full border border-vibrant-purple/20 bg-vibrant-purple/[0.04] px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-vibrant-purple">
                  {group.format}
                </h3>
                <ul className="mt-4 divide-y divide-ink-08 border-y border-ink-08">
                  {group.lines.map((line) => (
                    <li key={line.subject} className="py-5">
                      <p className="font-mono text-[15px] font-medium text-ink">
                        {line.subject}
                      </p>
                      <p className="mt-1.5 text-[14.5px] font-medium leading-[1.55] text-ink-60">
                        {line.why}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink-08 bg-cream/40">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="max-w-3xl rounded-3xl border border-ink-08 bg-card p-8 shadow-[0_16px_48px_-28px_rgba(15,15,15,0.22)] md:p-10">
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold leading-[1.15] tracking-tight text-ink">
              Built for cold outbound,{" "}
              <span className="font-serif-italic text-electric-blue">
                not newsletters
              </span>
            </h2>
            <p className="mt-4 text-[16px] font-medium leading-[1.7] text-ink-60">
              Generic email subject line testers (Omnisend, MailerLite,
              Mailmeteor-style tools) optimize for opted-in lists. Cold outbound
              fails differently: spam filters are less forgiving when you are not
              on a permission list, broken merge tags are catastrophic, and the
              real KPI is reply rate — not vanity opens. This grader weights
              those cold-specific risks on purpose.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export function SubjectLineTesterCta() {
  return (
    <section className="relative overflow-hidden border-t border-ink-08">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 mesh-spectrum opacity-70"
      />
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-16 md:flex-row md:items-center md:py-20">
        <div className="max-w-xl">
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold leading-[1.15] tracking-tight text-ink">
            Want your whole sequence audited, not just the{" "}
            <span className="font-serif-italic text-electric-blue">
              subject line?
            </span>
          </h2>
          <p className="mt-3 text-[15px] font-semibold leading-[1.6] text-ink-60">
            Free outreach audit — infrastructure, copy, and targeting reviewed by
            the {SITE.name} team.
          </p>
        </div>
        <a
          href={SITE.calendly}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-[14.5px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Free outreach audit
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </section>
  )
}
