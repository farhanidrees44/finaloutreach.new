import Link from "next/link"
import {
  ToolAuditCta,
  ToolSectionLabel,
} from "@/components/tools/tool-seo-primitives"

const ANATOMY = [
  {
    title: "Email 1 — problem-led opener",
    body: "Lead with a specific observation about their world. State the problem in their language. Offer a micro next step — not a demo dump.",
  },
  {
    title: "Email 2 — value nudge",
    body: "Add one concrete proof point or angle they have not seen. Stay short. Reference the first note without guilt-tripping.",
  },
  {
    title: "Email 3 — graceful break-up",
    body: "Give them an easy out and a clear last ask. Break-ups often unlock honest replies (“wrong person” / “not now”) you can route.",
  },
]

const TONES = [
  {
    name: "Direct",
    when: "Consultative B2B, mid-market ops buyers, short attention spans",
  },
  {
    name: "Warm",
    when: "Founder-to-founder, services firms, relationship-led categories",
  },
  {
    name: "Playful",
    when: "Early-stage SaaS and creative ICPs — still specific, never silly",
  },
]

export function ColdEmailGeneratorSeo() {
  return (
    <>
      <section className="border-t border-ink-08 bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
          <ToolSectionLabel>Sequence design</ToolSectionLabel>
          <h2 className="mt-6 max-w-3xl text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold leading-[1.08] tracking-tight text-ink">
            A 3-touch frame that carries most of the{" "}
            <span className="font-serif-italic text-electric-blue">
              reply weight
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-[16px] font-semibold leading-[1.65] text-ink-60">
            This generator is structured, not “creative AI soup.” It forces
            relevance → problem → micro-offer → soft CTA on every touch. Steal
            the skeleton, then personalize with triggers. Score your subjects
            with the{" "}
            <Link
              href="/tools/subject-line-tester"
              className="font-bold text-ink underline decoration-electric-blue/40 underline-offset-2"
            >
              Subject Line Tester
            </Link>{" "}
            and scrub the body with the{" "}
            <Link
              href="/tools/spam-word-checker"
              className="font-bold text-ink underline decoration-electric-blue/40 underline-offset-2"
            >
              Spam Word Checker
            </Link>
            .
          </p>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {ANATOMY.map((a, i) => (
              <article
                key={a.title}
                className="rounded-3xl border border-ink-08 bg-card p-7 shadow-[0_12px_40px_-24px_rgba(15,15,15,0.18)]"
              >
                <span className="font-mono text-[12px] font-bold text-ink-40">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-[16px] font-bold tracking-tight text-ink">
                  {a.title}
                </h3>
                <p className="mt-2 text-[14.5px] font-medium leading-[1.6] text-ink-60">
                  {a.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink-08 bg-cream/40">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
          <ToolSectionLabel>Tone</ToolSectionLabel>
          <h2 className="mt-6 max-w-3xl text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold leading-[1.08] tracking-tight text-ink">
            Pick a voice that matches how your buyers{" "}
            <span className="font-serif-italic text-electric-blue">actually buy</span>
          </h2>
          <ul className="mt-12 divide-y divide-ink-08 border-y border-ink-08">
            {TONES.map((t) => (
              <li
                key={t.name}
                className="flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <h3 className="text-[17px] font-bold text-ink">{t.name}</h3>
                <p className="max-w-xl text-[15px] font-medium leading-[1.55] text-ink-60">
                  {t.when}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-ink-08 bg-background">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="max-w-3xl rounded-3xl border border-ink-08 bg-card p-8 md:p-10">
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold leading-[1.15] tracking-tight text-ink">
              Templates are 20%.{" "}
              <span className="font-serif-italic text-electric-blue">
                The system is the rest.
              </span>
            </h2>
            <p className="mt-4 text-[16px] font-medium leading-[1.7] text-ink-60">
              List quality, infrastructure, deliverability, and reply handling
              decide whether a good frame becomes pipeline. Use this generator to
              ship a strong draft fast — then operate the stack (or let us). More
              frames live in our{" "}
              <Link
                href="/resources/email-templates"
                className="font-bold text-ink underline decoration-electric-blue/40 underline-offset-2"
              >
                email templates
              </Link>{" "}
              library.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export function ColdEmailGeneratorCta() {
  return (
    <ToolAuditCta
      accent="sequence"
      title="Want sequences written and run by operators — not just a sequence generator?"
      body="Free outreach audit — we review your offer, ICP, and first three touches against live outbound standards."
    />
  )
}
