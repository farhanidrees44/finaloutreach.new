"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Linkedin, Database, CalendarCheck, Server, FileSearch } from "lucide-react"
import { SectionEyebrow } from "./section-eyebrow"
import { cn } from "@/lib/utils"
import { CAL, openCalPopup } from "@/lib/cal"
import { channelFromPrice } from "@/data/pricing-channels"

/**
 * Channel package prices (cold email / LinkedIn) come from data/pricing-channels.ts —
 * same source as Outbound-by-channel and /pricing. Do not hardcode those numbers here.
 *
 * Appointment setting is a separate offer (inbox reply handling → calendar booking),
 * not the Cold Call Outreach dialing program.
 */
const SERVICES = [
  {
    title: "Cold email outreach",
    desc: "We handle everything: infrastructure, copy, lists, sending, replies. You just take the meetings.",
    price: channelFromPrice("coldEmail"),
    featured: true,
    visual: "email-flow" as const,
  },
  {
    title: "LinkedIn outreach",
    desc: "Multi-touch sequences that get past the connection request and into real conversations.",
    price: channelFromPrice("linkedin"),
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
    desc: "Inbox reply handling only — our SDRs qualify conversations and book meetings on your calendar. Not a dialing program (see Cold Call Outreach for that).",
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
    <div className="relative h-[180px] w-full overflow-hidden rounded-xl border border-ink-08 bg-cream/40">
      <svg
        viewBox="0 0 480 180"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Abstract funnel — illustrative only, no metrics */}
        <motion.path
          d="M 48 36 L 160 36 L 148 144 L 60 144 Z"
          fill="none"
          stroke="var(--brand)"
          strokeWidth="1.25"
          strokeOpacity="0.35"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
        <motion.path
          d="M 176 52 L 304 52 L 288 144 L 192 144 Z"
          fill="none"
          stroke="var(--brand)"
          strokeWidth="1.25"
          strokeOpacity="0.55"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.12, ease: "easeOut" }}
        />
        <motion.path
          d="M 320 68 L 432 68 L 412 144 L 340 144 Z"
          fill="none"
          stroke="var(--brand)"
          strokeWidth="1.5"
          strokeOpacity="0.85"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.24, ease: "easeOut" }}
        />
        {/* Stage nodes */}
        {[
          { cx: 104, cy: 90 },
          { cx: 240, cy: 98 },
          { cx: 376, cy: 106 },
        ].map((n, i) => (
          <motion.circle
            key={n.cx}
            cx={n.cx}
            cy={n.cy}
            r="4"
            fill="var(--brand)"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 + i * 0.12, duration: 0.35, ease: "easeOut" }}
          />
        ))}
        {/* Connector sparkline */}
        <motion.path
          d="M 112 90 C 160 78, 184 110, 232 98 S 320 88, 368 106"
          fill="none"
          stroke="var(--brand)"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeDasharray="3 5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.35, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-3 flex justify-between px-6 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-40">
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
      href={CAL.url}
      onClick={(e) => {
        e.preventDefault()
        void openCalPopup("services")
      }}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-xl border border-ink-08 bg-card p-7 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-ink-20 hover:shadow-[var(--shadow-lg)] sm:p-8",
        featured && "lg:p-10",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        {Icon && (
          <div className="grid size-10 place-items-center rounded-lg bg-primary/8 text-primary">
            <Icon className="size-5" strokeWidth={1.6} />
          </div>
        )}
        <span className="rounded-full border border-ink-08 bg-cream px-2.5 py-1 text-[11px] font-medium text-ink-60">
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
            "text-[22px] font-bold leading-[1.15] tracking-tight text-ink",
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
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12 py-28 md:py-36">
        <div className="flex flex-col gap-5 text-center md:mx-auto md:max-w-3xl">
          <div>
            <SectionEyebrow label="Services" className="justify-center" />
            <h2 className="mt-6 text-balance text-[clamp(2.1rem,4.2vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-ink">
              Services that{" "}
              <span className="font-serif-italic text-electric-blue">fill</span>{" "}
              your pipeline.
            </h2>
          </div>
          <p className="mx-auto max-w-xl text-[16px] font-bold leading-[1.6] text-ink sm:text-[17px]">
            Pick what fits your stage. We handle the rest — infrastructure,
            copy, sending, follow-up, reporting.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          <ServiceCard {...featured} className="lg:col-span-2 lg:row-span-2" />
          {rest.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}
