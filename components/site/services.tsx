"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Linkedin, Database, CalendarCheck, Server, FileSearch } from "lucide-react"
import { SectionEyebrow } from "./section-eyebrow"
import { cn } from "@/lib/utils"
import { SITE } from "@/lib/site-data"

const SERVICES = [
  {
    title: "Done-for-you cold email",
    desc: "We handle everything: infrastructure, copy, lists, sending, replies. You just take the meetings.",
    price: "From $3,500/mo",
    featured: true,
    visual: "email-flow" as const,
  },
  {
    title: "LinkedIn outreach",
    desc: "Multi-touch sequences that get past the connection request and into real conversations.",
    price: "From $1,800/mo",
    Icon: Linkedin,
  },
  {
    title: "Lead list building",
    desc: "Hyper-targeted prospect lists with verified emails and enrichment data.",
    price: "From $0.40/lead",
    Icon: Database,
  },
  {
    title: "Appointment setting",
    desc: "Our SDRs work your inbox and book meetings directly into your calendar.",
    price: "From $4,200/mo",
    Icon: CalendarCheck,
  },
  {
    title: "Cold email infrastructure setup",
    desc: "Domains, SPF/DKIM/DMARC, warm-up, deliverability — done right from day one.",
    price: "One-time $1,500",
    Icon: Server,
  },
  {
    title: "Outreach audit",
    desc: "We tear down your current setup and show exactly what's broken.",
    price: "Free for qualified teams",
    Icon: FileSearch,
  },
]

function EmailFlowVisual() {
  return (
    <div className="relative h-[180px] w-full overflow-hidden rounded-xl border border-ink-08 bg-background">
      <svg
        viewBox="0 0 480 180"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {/* Connecting line */}
        <motion.path
          d="M 60 90 C 140 90, 140 50, 220 50 S 300 130, 380 130"
          fill="none"
          stroke="var(--ink-08)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
        {/* Nodes */}
        {[
          { cx: 60, cy: 90, label: "Send" },
          { cx: 220, cy: 50, label: "Reply" },
          { cx: 380, cy: 130, label: "Booked" },
        ].map((n, i) => (
          <g key={n.label}>
            <motion.circle
              cx={n.cx}
              cy={n.cy}
              r="5"
              fill="var(--primary)"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.3, duration: 0.4 }}
            />
            <motion.circle
              cx={n.cx}
              cy={n.cy}
              r="14"
              fill="none"
              stroke="var(--primary)"
              strokeOpacity="0.25"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.3, duration: 0.4 }}
            />
          </g>
        ))}
      </svg>
      <div className="absolute inset-x-0 bottom-3 flex justify-between px-6 text-[11px] uppercase tracking-[0.14em] text-ink-40">
        <span>Send</span>
        <span>Reply</span>
        <span>Booked</span>
      </div>
    </div>
  )
}

function ServiceCard({
  title,
  desc,
  price,
  featured,
  visual,
  Icon,
  className,
}: (typeof SERVICES)[number] & { className?: string }) {
  return (
    <motion.a
      href={SITE.calendly}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-ink-08 bg-card p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-electric-blue/40 hover:shadow-lg hover:shadow-electric-blue/20 card-flip sm:p-8",
        featured && "lg:p-10 bg-gradient-to-br from-white to-soft-peach dark:from-card dark:to-card border-electric-blue/30 shadow-lg shadow-electric-blue/10",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        {Icon && (
          <div className="grid size-10 place-items-center rounded-lg bg-gradient-to-br from-electric-blue/20 to-vibrant-purple/20 text-electric-blue group-hover:shadow-lg group-hover:shadow-electric-blue/30 transition-all duration-300">
            <Icon className="size-5" strokeWidth={1.6} />
          </div>
        )}
        <span className="rounded-full border border-electric-blue/30 bg-electric-blue/5 px-2.5 py-1 text-[11px] font-medium text-electric-blue">
          {price}
        </span>
      </div>

      {visual === "email-flow" && (
        <div className="mt-8">
          <EmailFlowVisual />
        </div>
      )}

      <div className={cn("mt-8", featured && "mt-10")}>
        <h3
          className={cn(
            "text-[22px] font-medium leading-[1.15] tracking-display text-ink",
            featured && "text-[28px] sm:text-[32px]",
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "mt-3 max-w-md text-[14.5px] leading-[1.6] text-ink-60",
            featured && "text-[16px]",
          )}
        >
          {desc}
        </p>
        <div className="mt-6 flex items-center gap-1.5 text-[13.5px] font-medium text-ink">
          <span className="border-b border-ink/30 pb-0.5 transition-colors group-hover:border-ink">
            Learn more
          </span>
          <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>
    </motion.a>
  )
}

export function Services() {
  const [featured, ...rest] = SERVICES
  return (
    <section id="services" className="border-t border-ink-08 bg-background">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12 py-24 md:py-32">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionEyebrow number="05" label="Services" />
            <h2 className="mt-5 text-balance text-[40px] font-medium leading-[1.05] tracking-display text-ink sm:text-[56px]">
              Services that{" "}
              <span className="font-serif-italic gradient-text-animated">
                fill
              </span>{" "}
              your pipeline.
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-ink-60">
            Pick what fits your stage. We handle the rest — infrastructure,
            copy, sending, follow-up, reporting.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          <ServiceCard {...featured} className="lg:col-span-2 lg:row-span-2" />
          {rest.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}
