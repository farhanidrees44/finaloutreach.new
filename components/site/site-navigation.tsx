"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "./logo"
import { SERVICES, INDUSTRIES, SITE } from "@/lib/site-data"

type Link = { href: string; label: string }
type NavItem =
  | (Link & { children?: undefined })
  | { label: string; children: Link[] }

const NAV: NavItem[] = [
  {
    label: "Services",
    children: [
      { href: "/services", label: "All services" },
      ...SERVICES.map((s) => ({
        href: `/services/${s.slug}`,
        label: s.shortTitle,
      })),
    ],
  },
  {
    label: "Industries",
    children: [
      { href: "/industries", label: "All industries" },
      ...INDUSTRIES.slice(0, 6).map((i) => ({
        href: `/industries/${i.slug}`,
        label: i.name,
      })),
    ],
  },
  {
    label: "Tools",
    children: [
      { href: "/tools", label: "All free tools" },
      { href: "/tools/subject-line-tester", label: "Subject line tester" },
      { href: "/tools/spam-word-checker", label: "Spam word checker" },
      { href: "/tools/domain-health-checker", label: "Domain health checker" },
      { href: "/tools/cold-email-generator", label: "Cold email generator" },
      { href: "/tools/roi-calculator", label: "ROI calculator" },
      { href: "/tools/warmup-calculator", label: "Warmup calculator" },
    ],
  },
  { href: "/case-studies", label: "Case studies" },
  { href: "/blog", label: "Blog" },
  { href: "/pricing", label: "Pricing" },
]

export function SiteNavigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileGroup, setMobileGroup] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header className="pointer-events-none sticky top-0 z-50 flex justify-center px-4">
      <motion.nav
        initial={false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
        className={cn(
          "pointer-events-auto mt-3 flex w-full max-w-6xl items-center justify-between rounded-full px-3 py-2 transition-[border-color,background-color,box-shadow] duration-300",
          scrolled
            ? "border border-vibrant-purple/15 bg-background/85 shadow-[0_4px_20px_-8px_oklch(0.55_0.24_295_/_0.18)] backdrop-blur-xl"
            : "border border-transparent bg-background/50 backdrop-blur-md",
        )}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <div className="ml-1.5">
          <Logo />
        </div>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) =>
            "children" in item ? (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
              >
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-[13.5px] font-medium text-ink-60 transition-colors duration-200 hover:text-ink"
                  aria-expanded={activeDropdown === item.label}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "size-3 transition-transform",
                      activeDropdown === item.label && "rotate-180",
                    )}
                  />
                </button>
                <AnimatePresence>
                  {activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] as const }}
                      className="absolute left-1/2 top-full min-w-[260px] -translate-x-1/2 pt-3"
                    >
                      <div className="overflow-hidden rounded-2xl glass-purple p-2 shadow-premium-xl">
                        {item.children?.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-[13.5px] text-ink transition-all duration-200 hover:bg-gradient-to-r hover:from-vibrant-purple/10 hover:to-electric-blue/10"
                          >
                            <span>{c.label}</span>
                            <ArrowRight className="size-3 text-vibrant-purple opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3 py-2 text-[13.5px] font-medium text-ink-60 transition-colors duration-200 hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        <div className="flex items-center gap-1.5">
          <a
            href={SITE.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group hidden h-10 items-center gap-1.5 rounded-full px-4 text-[14px] font-medium text-white transition-all duration-200 active:scale-[0.98] lg:inline-flex",
              "bg-[linear-gradient(120deg,oklch(0.55_0.24_295),oklch(0.58_0.22_250)_50%,oklch(0.50_0.22_270))]",
              "hover:bg-[linear-gradient(120deg,oklch(0.50_0.24_295),oklch(0.52_0.22_250)_50%,oklch(0.46_0.22_270))]",
              "shadow-[0_4px_16px_-4px_oklch(0.55_0.24_295_/_0.4)] hover:shadow-[0_6px_20px_-4px_oklch(0.55_0.24_295_/_0.55)]",
            )}
          >
            Book a call
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="grid size-10 place-items-center rounded-full border border-ink-08 text-ink transition-colors duration-200 hover:border-vibrant-purple/40 hover:bg-vibrant-purple/[0.04] lg:hidden"
          >
            <Menu className="size-4" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto fixed inset-0 z-50 overflow-y-auto bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center justify-between px-6 pt-6">
              <Logo />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="grid size-10 place-items-center rounded-full border border-ink-08 text-ink transition-colors duration-200 hover:bg-cream"
              >
                <X className="size-4" />
              </button>
            </div>
            <nav className="flex flex-col px-6 pb-24 pt-8">
              {NAV.map((item, i) => {
                if (!("children" in item)) {
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + i * 0.04, duration: 0.4 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block border-b border-ink-08 py-5 text-2xl font-medium tracking-display text-ink"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  )
                }
                const isOpen = mobileGroup === item.label
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.4 }}
                    className="border-b border-ink-08"
                  >
                    <button
                      type="button"
                      onClick={() => setMobileGroup(isOpen ? null : item.label)}
                      className="flex w-full items-center justify-between py-5 text-2xl font-medium tracking-display text-ink"
                      aria-expanded={isOpen}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "size-5 transition-transform",
                          isOpen && "rotate-180",
                        )}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="pb-4 pl-1">
                            {item.children?.map((c) => (
                              <li key={c.href}>
                                <Link
                                  href={c.href}
                                  onClick={() => setOpen(false)}
                                  className="block py-2.5 text-[15px] text-ink-60"
                                >
                                  {c.label}
                                </Link>
                              </li>
                            ))}
                          </div>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
              <a
                href={SITE.calendly}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className={cn(
                  "group mt-10 inline-flex h-14 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-medium text-white transition-all duration-200",
                  "bg-[linear-gradient(120deg,oklch(0.55_0.24_295),oklch(0.58_0.22_250)_50%,oklch(0.50_0.22_270))]",
                  "shadow-[0_8px_24px_-8px_oklch(0.55_0.24_295_/_0.5)]",
                )}
              >
                Book a call{" "}
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
