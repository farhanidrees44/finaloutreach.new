import Link from "next/link"
import {
  ToolAuditCta,
  ToolSectionLabel,
} from "@/components/tools/tool-seo-primitives"

const LEVERS = [
  {
    title: "List size / month",
    body: "Volume without ICP is vanity. Model the slice you can actually personalize and reply-handle — not the biggest CSV you can buy.",
  },
  {
    title: "Reply rate",
    body: "Healthy cold reply rates on tight ICPs often land roughly in the low single digits. Treat double-digit “benchmarks” with skepticism unless your list is surgical.",
  },
  {
    title: "Reply → meeting",
    body: "This is where qualification lives. Soft positives that never become meetings inflate optimism and hide weak offer clarity.",
  },
  {
    title: "Meeting → close & ACV",
    body: "Outbound ROI is dominated by deal size and win rate. A mediocre reply rate can still pencil if ACV is high and meetings are real.",
  },
]

const ASSUMPTIONS = [
  { label: "Reply rate (tight ICP)", value: "~1.5–4%" },
  { label: "Reply → meeting", value: "~25–40%" },
  { label: "Meeting → close (SaaS)", value: "~15–25%" },
  { label: "Program cost", value: "Agency + SDR + tools (all-in)" },
]

export function RoiCalculatorSeo() {
  return (
    <>
      <section className="border-t border-ink-08 bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
          <ToolSectionLabel>Model honesty</ToolSectionLabel>
          <h2 className="mt-6 max-w-3xl text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold leading-[1.08] tracking-tight text-ink">
            Outbound ROI is a story you tell with{" "}
            <span className="font-serif-italic text-electric-blue">
              conservative math
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-[16px] font-semibold leading-[1.65] text-ink-60">
            This calculator is for planning conversations with founders and
            finance — not for inventing a miracle. Stress-test reply and close
            rates in the sensitivity table before you commit budget. For live
            campaign proof we can publish, see{" "}
            <Link
              href="/results"
              className="font-bold text-ink underline decoration-electric-blue/40 underline-offset-2"
            >
              /results
            </Link>
            .
          </p>
          <div className="mt-12 overflow-hidden rounded-3xl border border-ink-08 bg-card shadow-[0_16px_48px_-28px_rgba(15,15,15,0.22)]">
            <table className="w-full text-left text-[14px]">
              <caption className="border-b border-ink-08 bg-cream/50 px-5 py-3.5 text-left text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-40">
                Conservative planning ranges (B2B cold outbound)
              </caption>
              <tbody>
                {ASSUMPTIONS.map((row) => (
                  <tr
                    key={row.label}
                    className="border-b border-ink-08 last:border-0"
                  >
                    <td className="px-5 py-3.5 font-bold text-ink">
                      {row.label}
                    </td>
                    <td className="px-5 py-3.5 font-medium text-ink-60">
                      {row.value}
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
          <ToolSectionLabel>Levers</ToolSectionLabel>
          <h2 className="mt-6 max-w-3xl text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold leading-[1.08] tracking-tight text-ink">
            What each slider is really{" "}
            <span className="font-serif-italic text-electric-blue">saying</span>
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {LEVERS.map((l) => (
              <article
                key={l.title}
                className="rounded-3xl border border-ink-08 bg-card p-7 shadow-[0_12px_40px_-24px_rgba(15,15,15,0.18)]"
              >
                <h3 className="text-[17px] font-bold tracking-tight text-ink">
                  {l.title}
                </h3>
                <p className="mt-2 text-[14.5px] font-medium leading-[1.65] text-ink-60">
                  {l.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink-08 bg-background">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="max-w-3xl rounded-3xl border border-ink-08 bg-card p-8 md:p-10">
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold leading-[1.15] tracking-tight text-ink">
              Share the model.{" "}
              <span className="font-serif-italic text-electric-blue">
                Argue about assumptions — not vibes.
              </span>
            </h2>
            <p className="mt-4 text-[16px] font-medium leading-[1.7] text-ink-60">
              The URL captures your inputs so finance and GTM can review the same
              case. If the math only works at heroic reply rates, fix the offer
              or ICP before you buy more volume. Pricing for done-for-you
              outbound starts on our{" "}
              <Link
                href="/pricing"
                className="font-bold text-ink underline decoration-electric-blue/40 underline-offset-2"
              >
                pricing page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export function RoiCalculatorCta() {
  return (
    <ToolAuditCta
      accent="ROI"
      title="Want a 90-day outbound plan with ROI targets in writing?"
      body="Free strategy call — we map list size, reply assumptions, and meeting targets to a miss clause you can take to your team."
    />
  )
}
