import type { ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"
import { SITE } from "@/lib/site-data"

export function ToolSectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-40">
      <span className="h-px w-8 bg-ink-08" aria-hidden="true" />
      <span>{children}</span>
    </div>
  )
}

export function ToolAuditCta({
  accent,
  title = "Want the full outbound system behind this tool?",
  body = `Free outreach audit — infrastructure, copy, lists, and reply handling reviewed by the ${SITE.name} team.`,
  cta = "Free outreach audit",
}: {
  accent: string
  title?: string
  body?: string
  cta?: string
}) {
  const parts = title.split(accent)
  return (
    <section className="relative overflow-hidden border-t border-ink-08">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 mesh-spectrum opacity-70"
      />
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-16 md:flex-row md:items-center md:py-20">
        <div className="max-w-xl">
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold leading-[1.15] tracking-tight text-ink">
            {parts.length === 2 ? (
              <>
                {parts[0]}
                <span className="font-serif-italic text-electric-blue">
                  {accent}
                </span>
                {parts[1]}
              </>
            ) : (
              title
            )}
          </h2>
          <p className="mt-3 text-[15px] font-semibold leading-[1.6] text-ink-60">
            {body}
          </p>
        </div>
        <a
          href={SITE.calendly}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-primary px-6 text-[14.5px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {cta}
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </section>
  )
}
