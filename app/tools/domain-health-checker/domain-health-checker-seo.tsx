import Link from "next/link"
import {
  ToolAuditCta,
  ToolSectionLabel,
} from "@/components/tools/tool-seo-primitives"

const RECORDS = [
  {
    title: "MX",
    body: "Mail exchangers tell the world where to deliver mail for your domain. Missing or odd MX is a red flag for both inbound and outbound trust.",
    tip: "Confirm MX points at your real provider (Google, Microsoft, etc.) before you warm cold domains.",
  },
  {
    title: "SPF",
    body: "Sender Policy Framework lists which servers may send as your domain. Broken SPF is one of the fastest ways cold volume lands in spam.",
    tip: "Keep one SPF record. Too many includes and you hit the 10-lookup limit.",
  },
  {
    title: "DKIM",
    body: "DomainKeys Identified Mail cryptographically signs messages. Providers use selectors — if we cannot find a common selector, check your ESP docs.",
    tip: "Rotate keys carefully. A missing selector is not always a failure if your ESP uses a custom name.",
  },
  {
    title: "DMARC",
    body: "DMARC tells receivers what to do when SPF/DKIM fail and where to send reports. Start with p=none, then move to quarantine/reject once aligned.",
    tip: "Publish a rua address so you can see spoofing and misalignment before you tighten policy.",
  },
]

const PLAYBOOK = [
  {
    step: "01",
    title: "Separate brand from cold volume",
    body: "Never blast cold from your primary corporate domain. Use dedicated sending domains so customer and investor mail stay clean.",
  },
  {
    step: "02",
    title: "Authenticate every sending domain",
    body: "SPF + DKIM + DMARC on each cold domain before warmup. This checker is the five-minute sanity pass.",
  },
  {
    step: "03",
    title: "Warm, then send",
    body: "Authentication without warmup still fails. Use the ",
    link: { href: "/tools/warmup-calculator", label: "Warmup Calculator" },
    after: " to plan the ramp, then graduate to real ICP volume.",
  },
]

export function DomainHealthCheckerSeo() {
  return (
    <>
      <section className="border-t border-ink-08 bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
          <ToolSectionLabel>Deliverability foundation</ToolSectionLabel>
          <h2 className="mt-6 max-w-3xl text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold leading-[1.08] tracking-tight text-ink">
            Great copy cannot save a domain that fails{" "}
            <span className="font-serif-italic text-electric-blue">
              authentication
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-[16px] font-semibold leading-[1.65] text-ink-60">
            Inbox placement is a stack: DNS identity, reputation, list quality,
            and content. This tool does a live, read-only DNS check so you can
            see what receivers see — before you burn a week of warmup. Pair it
            with the{" "}
            <Link
              href="/tools/spam-word-checker"
              className="font-bold text-ink underline decoration-electric-blue/40 underline-offset-2"
            >
              Spam Word Checker
            </Link>{" "}
            for the content layer.
          </p>
        </div>
      </section>

      <section className="border-t border-ink-08 bg-cream/40">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
          <ToolSectionLabel>Records explained</ToolSectionLabel>
          <h2 className="mt-6 max-w-3xl text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold leading-[1.08] tracking-tight text-ink">
            What SPF, DKIM, DMARC, and MX actually{" "}
            <span className="font-serif-italic text-electric-blue">do</span>
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {RECORDS.map((r) => (
              <article
                key={r.title}
                className="rounded-3xl border border-ink-08 bg-card p-7 shadow-[0_12px_40px_-24px_rgba(15,15,15,0.18)]"
              >
                <h3 className="font-mono text-[15px] font-bold tracking-tight text-electric-blue">
                  {r.title}
                </h3>
                <p className="mt-3 text-[14.5px] font-medium leading-[1.65] text-ink-60">
                  {r.body}
                </p>
                <p className="mt-4 border-t border-ink-08 pt-4 text-[13.5px] font-semibold leading-[1.55] text-ink">
                  {r.tip}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink-08 bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
          <ToolSectionLabel>Operator playbook</ToolSectionLabel>
          <h2 className="mt-6 max-w-3xl text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold leading-[1.08] tracking-tight text-ink">
            How we set up domains for{" "}
            <span className="font-serif-italic text-electric-blue">
              cold outbound
            </span>
          </h2>
          <ol className="mt-12 space-y-5">
            {PLAYBOOK.map((p) => (
              <li
                key={p.step}
                className="flex gap-5 rounded-3xl border border-ink-08 bg-card p-7 shadow-[0_12px_40px_-24px_rgba(15,15,15,0.18)]"
              >
                <span className="font-mono text-[13px] font-bold tabular-nums text-ink-40">
                  {p.step}
                </span>
                <div>
                  <h3 className="text-[17px] font-bold tracking-tight text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[15px] font-medium leading-[1.65] text-ink-60">
                    {p.body}
                    {p.link && (
                      <Link
                        href={p.link.href}
                        className="font-bold text-ink underline decoration-electric-blue/40 underline-offset-2"
                      >
                        {p.link.label}
                      </Link>
                    )}
                    {p.after}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-ink-08 bg-cream/40">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="max-w-3xl rounded-3xl border border-ink-08 bg-card p-8 md:p-10">
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold leading-[1.15] tracking-tight text-ink">
              A green score is necessary —{" "}
              <span className="font-serif-italic text-electric-blue">
                not sufficient
              </span>
            </h2>
            <p className="mt-4 text-[16px] font-medium leading-[1.7] text-ink-60">
              Passing DNS does not mean Google or Microsoft will love your cold
              volume tomorrow. Reputation still needs warmup, clean lists, and
              restrained content. Use this checker as the gate before ramp — then
              operate the rest of the system.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export function DomainHealthCheckerCta() {
  return (
    <ToolAuditCta
      accent="domains"
      title="Want us to stand up and warm your sending domains?"
      body="Free outreach audit — DNS, warmup plan, and first-campaign readiness in one pass."
    />
  )
}
