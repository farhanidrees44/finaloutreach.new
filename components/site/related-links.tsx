import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

type Item = {
  href: string
  label: string
  meta?: string
  description?: string
}

export function RelatedLinks({
  title,
  items,
  links,
}: {
  title: string
  items?: Item[]
  links?: Item[]
}) {
  const list = (items ?? links ?? []).map((i) => ({
    href: i.href,
    label: i.label,
    meta: i.meta ?? i.description,
  }))

  if (list.length === 0) return null

  return (
    <section className="border-t border-ink-08 bg-background">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12 py-20 md:py-24">
        <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-ink-40">
          <span className="h-px w-8 bg-ink-08" />
          <span>{title}</span>
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {list.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex items-start justify-between gap-4 rounded-2xl border border-ink-08 bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/25"
              >
                <span className="flex flex-col gap-1">
                  <span className="text-[15px] font-medium text-ink">
                    {item.label}
                  </span>
                  {item.meta && (
                    <span className="text-[12.5px] leading-[1.5] text-ink-40">
                      {item.meta}
                    </span>
                  )}
                </span>
                <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-ink-40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
