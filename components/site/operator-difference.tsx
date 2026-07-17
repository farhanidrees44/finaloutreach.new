import { Check, X } from "lucide-react"
import { SectionEyebrow } from "./section-eyebrow"

/**
 * Side-by-side differentiators — every line is already claimed elsewhere
 * on the site (Process, FAQ, Hero, Services). No invented claims.
 */
const ROWS = [
  {
    us: "Hands-on operators who live in the tools",
    them: "Account manager you never talk to",
  },
  {
    us: "Real campaign dashboards on the strategy call",
    them: "Slide-deck reporting after the fact",
  },
  {
    us: "21-day proper domain warmup before volume",
    them: "Rushed sends that tank deliverability",
  },
  {
    us: "Custom sequences per persona — not templates",
    them: "Generic AI copy sprayed at a bought list",
  },
  {
    us: "Senior strategists · ~10 clients / quarter",
    them: "Junior pods stretched across dozens of accounts",
  },
  {
    us: "Meetings booked into your calendar",
    them: "Lead dumps you still have to chase",
  },
] as const

export function OperatorDifference() {
  return (
    <section
      id="difference"
      className="border-t border-ink-08 bg-cream"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24 lg:px-12">
        <div className="max-w-2xl">
          <SectionEyebrow number="05b" label="Difference" />
          <h2 className="mt-5 text-balance text-[clamp(1.85rem,3.5vw,3rem)] font-medium leading-[1.05] tracking-display text-ink">
            What you get — and what you&apos;re{" "}
            <span className="font-serif-italic text-ink-60">done with.</span>
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-60">
            Pulled from how we actually run engagements — Process, Services,
            and the FAQ — not a marketing wishlist.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-ink-08 bg-background">
          <div className="grid grid-cols-1 border-b border-ink-08 sm:grid-cols-2">
            <div className="border-b border-ink-08 bg-electric-blue/[0.04] px-5 py-3.5 sm:border-b-0 sm:border-r sm:border-ink-08">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-electric-blue">
                With FinalOutreach
              </p>
            </div>
            <div className="bg-ink/[0.02] px-5 py-3.5">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-40">
                Typical agency theatre
              </p>
            </div>
          </div>

          <ul className="divide-y divide-ink-08">
            {ROWS.map((row) => (
              <li
                key={row.us}
                className="grid grid-cols-1 sm:grid-cols-2"
              >
                <div className="flex items-start gap-3 border-b border-ink-08 px-5 py-4 sm:border-b-0 sm:border-r sm:border-ink-08">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-electric-blue"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                  <span className="text-[14.5px] leading-snug text-ink">
                    {row.us}
                  </span>
                </div>
                <div className="flex items-start gap-3 px-5 py-4">
                  <X
                    className="mt-0.5 size-4 shrink-0 text-ink-40"
                    strokeWidth={2.25}
                    aria-hidden
                  />
                  <span className="text-[14.5px] leading-snug text-ink-60">
                    {row.them}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
