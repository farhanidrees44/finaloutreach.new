"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { motion } from "framer-motion"
import Link from "next/link"
import { Linkedin, Twitter, Youtube } from "lucide-react"
import Image from "next/image"
import { Logo } from "./logo"
import { NewsletterForm } from "./newsletter-form"
import { SITE } from "@/lib/site-data"
import { CERTIFICATIONS } from "@/data/certifications"

type FooterLink = { label: string; href: string }

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Cold email outreach", href: "/services/cold-email" },
      { label: "LinkedIn outreach", href: "/services/linkedin-outreach" },
      { label: "Lead list building", href: "/services/lead-list-building" },
      { label: "Appointment setting", href: "/services/appointment-setting" },
      { label: "Email infrastructure", href: "/services/email-infrastructure" },
      { label: "Outreach audit (free)", href: "/services/outreach-audit" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "B2B SaaS", href: "/industries/saas" },
      { label: "Marketing agencies", href: "/industries/agencies" },
      { label: "Consulting firms", href: "/industries/consulting" },
      { label: "Fintech", href: "/industries/fintech" },
      { label: "Healthtech", href: "/industries/healthtech" },
      { label: "View all →", href: "/industries" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Live proof", href: "/results" },
      { label: "Process", href: "/process" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/about#careers" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Cold email playbook", href: "/resources/cold-email-playbook" },
      { label: "Email templates library", href: "/resources/email-templates" },
      { label: "ROI calculator", href: "/tools/roi-calculator" },
      { label: "Outbound blog", href: "/blog" },
      { label: "Newsletter", href: "/resources#newsletter" },
    ],
  },
]

export function Footer() {
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  }

  return (
    <footer
      ref={footerRef}
      id="site-footer"
      className="relative overflow-hidden border-t border-ink-08 bg-background"
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12 py-20"
      >
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          {/* Brand section */}
          <motion.div variants={itemVariants} className="flex flex-col gap-8">
            <Logo />
            
            <p className="max-w-sm text-[15px] leading-[1.7] text-ink-60">
              Done-for-you cold email, LinkedIn outreach, and appointment
              setting — run by operators who live in the tools, not slide decks.
            </p>

            {/* Newsletter */}
            <div className="flex flex-col gap-3">
              <label className="text-[12px] font-medium uppercase tracking-[0.1em] text-ink-40">
                Get weekly outbound insights
              </label>
              <NewsletterForm
                source="footer"
                size="sm"
                placeholder="your@email.com"
                className="bg-cream border-ink-08 hover:border-electric-blue/30 transition-all duration-300"
              />
              <p className="text-[11px] text-ink-40">
                One tactic per week. Unsubscribe anytime.
              </p>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 pt-4">
              <span className="text-[11px] uppercase tracking-[0.1em] text-ink-40">Follow</span>
              <div className="flex items-center gap-2">
                <Link
                  href="https://linkedin.com/company/finaloutreach"
                  aria-label="LinkedIn"
                  className="group grid size-9 place-items-center rounded-full border border-ink-08 text-ink-60 transition-all duration-300 hover:border-electric-blue hover:text-electric-blue hover:shadow-lg hover:shadow-electric-blue/20"
                >
                  <Linkedin className="size-4 group-hover:scale-110 transition-transform duration-300" />
                </Link>
                <Link
                  href="https://twitter.com/finaloutreach"
                  aria-label="Twitter"
                  className="group grid size-9 place-items-center rounded-full border border-ink-08 text-ink-60 transition-all duration-300 hover:border-vibrant-purple hover:text-vibrant-purple hover:shadow-lg hover:shadow-vibrant-purple/20"
                >
                  <Twitter className="size-4 group-hover:scale-110 transition-transform duration-300" />
                </Link>
                <Link
                  href="https://youtube.com/@finaloutreach"
                  aria-label="YouTube"
                  className="group grid size-9 place-items-center rounded-full border border-ink-08 text-ink-60 transition-all duration-300 hover:border-bright-cyan hover:text-bright-cyan hover:shadow-lg hover:shadow-bright-cyan/20"
                >
                  <Youtube className="size-4 group-hover:scale-110 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Links grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-8 sm:grid-cols-4"
          >
            {COLUMNS.map((col) => (
              <div key={col.title} className="flex flex-col gap-4">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-40">
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[13.5px] text-ink/75 transition-all duration-300 hover:text-electric-blue hover:translate-x-0.5 inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Credential strip — secondary trust touchpoint */}
        <motion.div variants={itemVariants} className="my-10">
          <p className="mb-4 text-[11px] uppercase tracking-[0.16em] text-ink-40">
            Credentials
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {CERTIFICATIONS.map((c) => (
              <div
                key={c.id}
                className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-ink-08 bg-cream/60"
                title={`${c.title} · ${c.issuer}`}
              >
                <Image
                  src={c.certificateImage}
                  alt={`${c.title} badge from ${c.issuer}`}
                  fill
                  className="object-contain p-1"
                  sizes="48px"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div variants={itemVariants} className="mb-12 h-px bg-ink-08" />

        {/* Bottom bar */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex flex-col gap-1">
            <p className="text-[12px] text-ink-40">
              © {new Date().getFullYear()} {SITE.name}. All rights reserved.
            </p>
            <p className="text-[11px] text-ink-40">
              Made with rigor — {SITE.location}
            </p>
          </div>

          <div className="flex items-center gap-6 text-[12px] text-ink-60">
            <Link
              href="/legal/privacy"
              className="transition-colors duration-300 hover:text-electric-blue"
            >
              Privacy
            </Link>
            <Link
              href="/legal/terms"
              className="transition-colors duration-300 hover:text-electric-blue"
            >
              Terms
            </Link>
            <Link
              href="/legal/cookies"
              className="transition-colors duration-300 hover:text-electric-blue"
            >
              Cookies
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}
