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
          className="font-medium text-[var(--ink-900)] underline decoration-[var(--accent-gold)]/40 underline-offset-2 hover:decoration-[var(--accent-gold)]"
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
          className="font-medium text-[var(--ink-900)] underline decoration-[var(--accent-gold)]/40 underline-offset-2 hover:decoration-[var(--accent-gold)]"
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

export function SubjectLineTesterSeo() {
  return (
    <>
      {/* Open-rate benchmarks */}
      <section className="border-t border-[var(--border-hairline)]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-[var(--ink-400)]">
            <span className="h-px w-8 bg-[var(--border-hairline)]" />
            <span>Benchmarks</span>
          </div>
          <h2 className="mt-6 max-w-3xl text-balance font-serif text-[28px] font-medium leading-[1.15] tracking-[-0.01em] text-[var(--ink-900)] sm:text-[36px]">
            What counts as a good cold email open rate in 2026
          </h2>
          <div className="mt-8 max-w-3xl space-y-4 text-[16px] leading-[1.65] text-[var(--ink-600)]">
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
                className="font-medium text-[var(--ink-900)] underline decoration-[var(--accent-gold)]/40 underline-offset-2 hover:decoration-[var(--accent-gold)]"
              >
                Cold Email Playbook
              </Link>
              .
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--surface-card)] shadow-[var(--shadow-card)]">
            <table className="w-full text-left text-[14px]">
              <caption className="border-b border-[var(--border-hairline)] bg-[var(--surface-card-sunk)] px-5 py-3 text-left text-[12px] font-medium uppercase tracking-[0.14em] text-[var(--ink-400)]">
                Typical cold open-rate ranges by industry (public studies)
              </caption>
              <thead>
                <tr className="border-b border-[var(--border-hairline)] text-[12px] uppercase tracking-[0.12em] text-[var(--ink-400)]">
                  <th className="px-5 py-3 font-medium">Industry</th>
                  <th className="px-5 py-3 font-medium">Relative range</th>
                </tr>
              </thead>
              <tbody>
                {BENCHMARK_ROWS.map((row) => (
                  <tr
                    key={row.industry}
                    className="border-b border-[var(--border-hairline)] last:border-0"
                  >
                    <td className="px-5 py-3.5 font-medium text-[var(--ink-900)]">
                      {row.industry}
                    </td>
                    <td className="px-5 py-3.5 text-[var(--ink-600)]">
                      {row.range}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Factor explainers */}
      <section className="border-t border-[var(--border-hairline)] bg-[var(--surface-base)]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-[var(--ink-400)]">
            <span className="h-px w-8 bg-[var(--border-hairline)]" />
            <span>How the grader works</span>
          </div>
          <h2 className="mt-6 max-w-3xl text-balance font-serif text-[28px] font-medium leading-[1.15] tracking-[-0.01em] text-[var(--ink-900)] sm:text-[36px]">
            15-factor breakdown — why each check matters on cold email
          </h2>
          <p className="mt-4 max-w-2xl text-[16px] leading-[1.6] text-[var(--ink-600)]">
            Newsletter testers score for opted-in lists. These factors are
            weighted for first-touch outbound — spam sensitivity, trust, and
            reply orientation.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {FACTOR_EXPLAINERS.map((f) => (
              <article
                key={f.title}
                className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--surface-card)] p-6 shadow-[var(--shadow-card)]"
              >
                <h3 className="text-[17px] font-medium text-[var(--ink-900)]">
                  {f.title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-[1.6] text-[var(--ink-600)]">
                  {f.body}
                </p>
                <dl className="mt-4 space-y-2 border-t border-[var(--border-hairline)] pt-4 text-[13px]">
                  <div>
                    <dt className="font-medium uppercase tracking-[0.12em] text-[var(--signal-pass)]">
                      Works
                    </dt>
                    <dd className="mt-0.5 font-mono text-[var(--ink-900)]">
                      {f.good}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium uppercase tracking-[0.12em] text-[var(--signal-fail)]">
                      Avoid
                    </dt>
                    <dd className="mt-0.5 font-mono text-[var(--ink-600)]">
                      {f.bad}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="border-t border-[var(--border-hairline)]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-[var(--ink-400)]">
            <span className="h-px w-8 bg-[var(--border-hairline)]" />
            <span>Examples</span>
          </div>
          <h2 className="mt-6 max-w-3xl text-balance font-serif text-[28px] font-medium leading-[1.15] tracking-[-0.01em] text-[var(--ink-900)] sm:text-[36px]">
            Cold email subject line examples that work in 2026
          </h2>
          <p className="mt-4 max-w-2xl text-[16px] leading-[1.6] text-[var(--ink-600)]">
            Steal the structure, not the words — swap in your prospect’s company,
            trigger, or metric.
          </p>
          <div className="mt-10 space-y-10">
            {EXAMPLES.map((group) => (
              <div key={group.format}>
                <h3 className="text-[14px] font-medium uppercase tracking-[0.16em] text-[var(--accent-gold)]">
                  {group.format}
                </h3>
                <ul className="mt-4 divide-y divide-[var(--border-hairline)] border-y border-[var(--border-hairline)]">
                  {group.lines.map((line) => (
                    <li key={line.subject} className="py-4">
                      <p className="font-mono text-[15px] text-[var(--ink-900)]">
                        {line.subject}
                      </p>
                      <p className="mt-1.5 text-[14px] leading-[1.55] text-[var(--ink-600)]">
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

      {/* Differentiation */}
      <section className="border-t border-[var(--border-hairline)] bg-[var(--surface-base)]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="max-w-3xl rounded-2xl border border-[var(--border-hairline)] bg-[var(--surface-card)] p-8 shadow-[var(--shadow-card)] md:p-10">
            <h2 className="font-serif text-[26px] font-medium leading-[1.2] tracking-[-0.01em] text-[var(--ink-900)] sm:text-[30px]">
              Built for cold outbound, not newsletters
            </h2>
            <p className="mt-4 text-[16px] leading-[1.65] text-[var(--ink-600)]">
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
    <section className="border-t border-[var(--border-hairline)] bg-[var(--surface-card)]">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-12 md:flex-row md:items-center md:py-14">
        <div className="max-w-xl">
          <h2 className="font-serif text-[22px] font-medium tracking-[-0.01em] text-[var(--ink-900)] sm:text-[26px]">
            Want your whole sequence audited, not just the subject line?
          </h2>
          <p className="mt-2 text-[15px] leading-[1.55] text-[var(--ink-600)]">
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
