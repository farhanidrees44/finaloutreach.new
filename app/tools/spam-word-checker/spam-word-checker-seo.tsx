import Link from "next/link"
import {
  ToolAuditCta,
  ToolSectionLabel,
} from "@/components/tools/tool-seo-primitives"

const CATEGORIES = [
  {
    title: "Spam / promo phrases",
    body: "Words and phrases filters associate with bulk marketing and scams — “free,” “act now,” “click here,” “guaranteed.” On cold email they are weighted harder because you are not on a permission list.",
    good: "Saw your Series B — one idea on outbound",
    bad: "FREE limited-time offer — click here now!!!",
  },
  {
    title: "Money & deal language",
    body: "Dollar hype, “cash bonus,” and “lowest price” patterns look like affiliate spam. Lead with a business outcome in plain language instead of sounding like a clearance email.",
    good: "cut SDR ramp by ~3 weeks for teams like yours",
    bad: "earn extra cash / double your revenue guaranteed",
  },
  {
    title: "Urgency theater",
    body: "“Last chance,” “expires soon,” and stacked deadlines train filters and buyers to ignore you. Cold first-touch should feel calm and specific — not countdown-clock marketing.",
    good: "quick question on your hiring page",
    bad: "URGENT — last chance, ending tonight",
  },
  {
    title: "ALL CAPS & punctuation",
    body: "ALL CAPS runs and !!! stacks are classic spam signals. Sentence case with one period (or a question mark for reply-bait) is the cold default.",
    good: "wrong person for pipeline at Acme?",
    bad: "PARTNERSHIP OPPORTUNITY!!!",
  },
  {
    title: "Link density",
    body: "Too many links in a first touch looks like a blast. Prefer one clear CTA — calendar link or a single resource — and put secondary links after a reply thread starts.",
    good: "Happy to send the one-pager if useful",
    bad: "5 tracking links + banner URLs in email one",
  },
]

const REWRITES = [
  {
    before: "FREE strategy call — act now, limited time!!!",
    after: "15-min look at your outbound reply rate?",
    why: "Removed promo + urgency + punctuation spam; kept a low-friction ask.",
  },
  {
    before: "Click here to double your sales guaranteed",
    after: "noticed your team is hiring SDRs — one idea",
    why: "Swapped money hype for a trigger observation buyers can verify.",
  },
  {
    before: "CONGRATULATIONS you've been selected",
    after: "quick note on Acme’s pricing page",
    why: "Contest/scam pattern → specific peer observation.",
  },
]

export function SpamWordCheckerSeo() {
  return (
    <>
      <section className="border-t border-ink-08 bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
          <ToolSectionLabel>Why content risk matters</ToolSectionLabel>
          <h2 className="mt-6 max-w-3xl text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold leading-[1.08] tracking-tight text-ink">
            Spam words will not sink you alone — but they make every other{" "}
            <span className="font-serif-italic text-electric-blue">
              deliverability problem worse
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-[16px] font-semibold leading-[1.65] text-ink-60">
            Filters score content, reputation, authentication, and engagement
            together. Cleaning cheap spam signals will not fix a burned domain —
            but leaving them in makes recovery slower. Use this checker before
            you send; pair it with the{" "}
            <Link
              href="/tools/domain-health-checker"
              className="font-bold text-ink underline decoration-electric-blue/40 underline-offset-2"
            >
              Domain Health Checker
            </Link>{" "}
            and{" "}
            <Link
              href="/tools/subject-line-tester"
              className="font-bold text-ink underline decoration-electric-blue/40 underline-offset-2"
            >
              Subject Line Tester
            </Link>
            .
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              {
                k: "Content",
                v: "Trigger phrases, CAPS, punctuation, link clutter",
              },
              {
                k: "Identity",
                v: "SPF / DKIM / DMARC and dedicated sending domains",
              },
              {
                k: "Behavior",
                v: "List quality, reply rates, complaint & bounce rates",
              },
            ].map((card) => (
              <div
                key={card.k}
                className="rounded-3xl border border-ink-08 bg-card p-6 shadow-[0_12px_40px_-24px_rgba(15,15,15,0.18)]"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-40">
                  {card.k}
                </p>
                <p className="mt-3 text-[14.5px] font-medium leading-[1.55] text-ink-60">
                  {card.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink-08 bg-cream/40">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
          <ToolSectionLabel>Categories we flag</ToolSectionLabel>
          <h2 className="mt-6 max-w-3xl text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold leading-[1.08] tracking-tight text-ink">
            What the highlighter is actually{" "}
            <span className="font-serif-italic text-electric-blue">looking for</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[16px] font-semibold leading-[1.65] text-ink-60">
            Rules-based and transparent — not a black-box “AI spam score.” Each
            category maps to patterns filters and humans both distrust on cold
            first-touch.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {CATEGORIES.map((c) => (
              <article
                key={c.title}
                className="rounded-3xl border border-ink-08 bg-card p-7 shadow-[0_12px_40px_-24px_rgba(15,15,15,0.18)]"
              >
                <h3 className="text-[17px] font-bold tracking-tight text-ink">
                  {c.title}
                </h3>
                <p className="mt-2 text-[14.5px] font-medium leading-[1.65] text-ink-60">
                  {c.body}
                </p>
                <dl className="mt-5 space-y-3 border-t border-ink-08 pt-5 text-[13px]">
                  <div>
                    <dt className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-emerald-dark">
                      Works
                    </dt>
                    <dd className="mt-1 font-mono text-[13.5px] text-ink">
                      {c.good}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-destructive">
                      Avoid
                    </dt>
                    <dd className="mt-1 font-mono text-[13.5px] text-ink-60">
                      {c.bad}
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
          <ToolSectionLabel>Rewrite examples</ToolSectionLabel>
          <h2 className="mt-6 max-w-3xl text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold leading-[1.08] tracking-tight text-ink">
            Same intent — without looking like{" "}
            <span className="font-serif-italic text-electric-blue">spam</span>
          </h2>
          <ul className="mt-12 divide-y divide-ink-08 border-y border-ink-08">
            {REWRITES.map((r) => (
              <li key={r.before} className="grid gap-4 py-8 md:grid-cols-2">
                <div>
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-destructive">
                    Before
                  </p>
                  <p className="mt-2 font-mono text-[14.5px] text-ink-60 line-through decoration-ink-20">
                    {r.before}
                  </p>
                </div>
                <div>
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-emerald-dark">
                    After
                  </p>
                  <p className="mt-2 font-mono text-[14.5px] font-medium text-ink">
                    {r.after}
                  </p>
                  <p className="mt-2 text-[14px] font-medium leading-[1.55] text-ink-60">
                    {r.why}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-ink-08 bg-cream/40">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="max-w-3xl rounded-3xl border border-ink-08 bg-card p-8 shadow-[0_16px_48px_-28px_rgba(15,15,15,0.22)] md:p-10">
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold leading-[1.15] tracking-tight text-ink">
              Content check first.{" "}
              <span className="font-serif-italic text-electric-blue">
                Then prove delivery.
              </span>
            </h2>
            <p className="mt-4 text-[16px] font-medium leading-[1.7] text-ink-60">
              This tool is a pre-send content pass — not a full Mail-Tester
              substitute. After you clean the copy, validate DNS and warmup, then
              send a real seed test. For the operator playbook, see our{" "}
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

export function SpamWordCheckerCta() {
  return (
    <ToolAuditCta
      accent="spam words"
      title="Want copy that clears filters without sounding like it was scrubbed of spam words?"
      body="Free outreach audit — we review trigger language, subject lines, and sending reputation together."
    />
  )
}
