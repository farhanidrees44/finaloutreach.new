"use client"

import { motion, useReducedMotion } from "framer-motion"
import {
  ArrowUpRight,
  Linkedin,
  Database,
  CalendarCheck,
  Server,
  FileSearch,
} from "lucide-react"
import { SectionEyebrow } from "./section-eyebrow"
import { cn } from "@/lib/utils"
import { SITE } from "@/lib/site-data"
import {
  fadeUp,
  staggerContainer,
  viewportOnce,
  motionSafe,
  springSnappy,
} from "@/lib/motion"
import type { ReactNode } from "react"

type Service = {
  title: string
  desc: ReactNode
  price: string
  featured?: boolean
  wide?: boolean
  visual?: "email-flow"
  Icon?: typeof Linkedin
}

const SERVICES: Service[] = [
  {
    title: "Done-for-you cold email",
    desc: (
      <>
        We handle everything: infrastructure, copy, lists, sending, replies. You
        just take the <span className="proof">meetings</span>.
      </>
    ),
    price: "From $3,500/mo",
    featured: true,
    wide: true,
    visual: "email-flow",
  },
  {
    title: "Appointment setting",
    desc: (
      <>
        Our SDRs work your inbox and book meetings{" "}
        <span className="proof">directly into your calendar</span>.
      </>
    ),
    price: "From $4,200/mo",
    featured: true,
    Icon: CalendarCheck,
  },
  {
    title: "LinkedIn outreach",
    desc: (
      <>
        Multi-touch sequences that get past the connection request and into{" "}
        <span className="proof">real conversations</span>.
      </>
    ),
    price: "From $1,800/mo",
    Icon: Linkedin,
  },
  {
    title: "Lead list building",
    desc: (
      <>
        Hyper-targeted prospect lists with{" "}
        <span className="proof">verified emails</span> and enrichment data.
      </>
    ),
    price: "From $0.40/lead",
    Icon: Database,
  },
  {
    title: "Cold email infrastructure setup",
    desc: (
      <>
        Domains, SPF/DKIM/DMARC, warm-up, deliverability — done right from{" "}
        <span className="proof">day one</span>.
      </>
    ),
    price: "One-time $1,500",
    Icon: Server,
  },
  {
    title: "Outreach audit",
    desc: (
      <>
        We tear down your current setup and show exactly{" "}
        <span className="proof">what&apos;s broken</span>.
      </>
    ),
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
        <motion.path
          d="M 60 90 C 140 90, 140 50, 220 50 S 300 130, 380 130"
          fill="none"
          stroke="var(--ink-08)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
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
              fill="var(--electric-blue)"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 + i * 0.25, duration: 0.35 }}
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
}: Service & { className?: string }) {
  const reduced = useReducedMotion()

  return (
    <motion.a
      href={SITE.calendly}
      target="_blank"
      rel="noopener noreferrer"
      variants={motionSafe(reduced, fadeUp)}
      whileHover={reduced ? undefined : { scale: 1.015, transition: springSnappy }}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-ink-08 bg-card p-7 transition-shadow duration-300 hover:border-electric-blue/40 hover:shadow-lg hover:shadow-electric-blue/15 sm:p-8",
        featured &&
          "border-electric-blue/30 bg-gradient-to-br from-white to-soft-peach/60 shadow-lg shadow-electric-blue/10 lg:p-10",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        {Icon && (
          <div className="grid size-10 place-items-center rounded-lg bg-electric-blue/10 text-electric-blue transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <Icon className="size-5" strokeWidth={1.6} />
          </div>
        )}
        <span className="rounded-full border border-electric-blue/30 bg-electric-blue/5 px-2.5 py-1 text-[11px] font-semibold text-electric-blue">
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
            "type-h3 text-ink",
            featured && "text-[28px] sm:text-[32px]",
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "type-body mt-3 max-w-md text-ink-60",
            featured && "text-[16px]",
          )}
        >
          {desc}
        </p>
        <div className="mt-6 flex items-center gap-1.5 text-[13.5px] font-semibold text-ink">
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
  const reduced = useReducedMotion()
  const container = motionSafe(reduced, staggerContainer)
  const [flagship, appointment, ...rest] = SERVICES

  return (
    <section id="services" className="border-t border-ink-08 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24 lg:px-12">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionEyebrow number="05" label="Services" />
            <h2 className="type-h2 mt-5 text-balance text-ink">
              Services that{" "}
              <span className="font-serif-italic font-normal gradient-text-animated">
                fill
              </span>{" "}
              your pipeline.
            </h2>
          </div>
          <p className="type-body max-w-sm text-ink-60">
            Pick what fits your stage. We handle the rest — infrastructure,
            copy, sending, follow-up, reporting.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6 lg:auto-rows-fr"
        >
          <ServiceCard {...flagship} className="lg:col-span-4 lg:row-span-2" />
          <ServiceCard {...appointment} className="lg:col-span-2 lg:row-span-2" />
          {rest.map((s) => (
            <ServiceCard key={s.title} {...s} className="lg:col-span-2" />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
