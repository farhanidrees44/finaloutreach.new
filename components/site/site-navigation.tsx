"use client"

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "./logo"
import { SITE } from "@/lib/site-data"
import {
  MEGA_FREE_TOOLS,
  MEGA_INDUSTRIES,
  MEGA_SERVICES,
  type MegaLink,
  type MegaTool,
} from "@/data/nav-mega"

type MegaTab = "Services" | "Industries" | "Tools"

const MEGA_TABS: MegaTab[] = ["Services", "Industries", "Tools"]

const spring = { type: "spring" as const, stiffness: 300, damping: 30 }

function MegaItem({
  item,
  onNavigate,
}: {
  item: MegaLink
  onNavigate?: () => void
}) {
  const Icon = item.icon
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "group flex gap-3 rounded-xl p-2.5 transition-colors duration-200",
        "hover:bg-accent-warm-muted focus-visible:bg-accent-warm-muted focus-visible:outline-none",
        item.featured && "bg-primary/[0.04] ring-1 ring-primary/10",
      )}
    >
      {Icon ? (
        <span
          className={cn(
            "grid size-10 shrink-0 place-items-center rounded-xl",
            "bg-accent-warm-muted text-ink",
            item.featured && "bg-primary/10 text-primary",
          )}
        >
          <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden />
        </span>
      ) : null}
      <span className="min-w-0 pt-0.5">
        <span className="block text-[14.5px] font-medium leading-snug text-ink">
          {item.title}
        </span>
        <span className="mt-0.5 block text-[12.5px] leading-snug text-ink-40">
          {item.subtitle}
        </span>
      </span>
    </Link>
  )
}

function ToolTile({
  tool,
  onNavigate,
}: {
  tool: MegaTool
  onNavigate?: () => void
}) {
  const Icon = tool.icon
  return (
    <Link
      href={tool.href}
      onClick={onNavigate}
      className="group flex gap-3 rounded-xl border border-ink-08 bg-card p-3 transition-all duration-200 hover:border-ink-20 hover:bg-accent-warm-muted/60 hover:shadow-[var(--shadow-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-warm-muted text-ink">
        <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="mb-1.5 flex flex-wrap items-center gap-1.5">
          <span className="rounded-full bg-ink-04 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] text-ink-40">
            {tool.category}
          </span>
          <span className="rounded-full bg-accent-warm-muted px-2 py-0.5 text-[10px] font-semibold tabular text-ink">
            {tool.speed}
          </span>
        </span>
        <span className="block text-[14.5px] font-medium leading-snug text-ink">
          {tool.title}
        </span>
        <span className="mt-0.5 block text-[12.5px] leading-snug text-ink-40">
          {tool.subtitle}
        </span>
      </span>
    </Link>
  )
}

function PanelChrome({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-ink-08 bg-card shadow-[var(--shadow-xl)]",
        className,
      )}
    >
      {children}
    </div>
  )
}

export function SiteNavigation() {
  const panelId = useId()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileGroup, setMobileGroup] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<MegaTab | null>(null)

  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const clearTimers = useCallback(() => {
    if (openTimer.current) clearTimeout(openTimer.current)
    if (closeTimer.current) clearTimeout(closeTimer.current)
    openTimer.current = null
    closeTimer.current = null
  }, [])

  const openMega = useCallback(
    (tab: MegaTab) => {
      clearTimers()
      openTimer.current = setTimeout(() => setActiveTab(tab), 110)
    },
    [clearTimers],
  )

  const closeMegaDelayed = useCallback(() => {
    clearTimers()
    closeTimer.current = setTimeout(() => setActiveTab(null), 200)
  }, [clearTimers])

  const closeMegaNow = useCallback(() => {
    clearTimers()
    setActiveTab(null)
  }, [clearTimers])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  useEffect(() => {
    if (!activeTab) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMegaNow()
        ;(
          navRef.current?.querySelector(
            `[data-mega-trigger="${activeTab}"]`,
          ) as HTMLElement | null
        )?.focus()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [activeTab, closeMegaNow])

  useEffect(() => () => clearTimers(), [clearTimers])

  const onTriggerKeyDown = (tab: MegaTab, e: ReactKeyboardEvent) => {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
      e.preventDefault()
      clearTimers()
      setActiveTab(tab)
      requestAnimationFrame(() => {
        panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus()
      })
    }
  }

  const onPanelKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === "Tab" && panelRef.current) {
      const links = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        ),
      )
      if (!links.length) return
      const first = links[0]
      const last = links[links.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
      return
    }
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return
    const links = Array.from(
      panelRef.current?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? [],
    )
    if (!links.length) return
    const idx = links.indexOf(document.activeElement as HTMLAnchorElement)
    e.preventDefault()
    if (e.key === "ArrowDown") {
      links[(idx + 1) % links.length]?.focus()
    } else {
      links[(idx - 1 + links.length) % links.length]?.focus()
    }
  }

  const footerLinkClass =
    "mt-2 inline-flex items-center gap-1 px-2.5 py-2 text-[13px] font-medium text-ink-60 transition-colors hover:text-ink"

  return (
    <header className="pointer-events-none sticky top-0 z-50">
      <div className="pointer-events-none flex justify-center px-4">
        <motion.nav
          ref={navRef}
          initial={false}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
          className={cn(
            "pointer-events-auto relative mt-3 flex w-full max-w-6xl items-center justify-between rounded-full px-3 py-2 transition-[border-color,background-color,box-shadow] duration-300",
            scrolled
              ? "border border-vibrant-purple/15 bg-background/85 shadow-[0_4px_20px_-8px_oklch(0.55_0.24_295_/_0.18)] backdrop-blur-xl"
              : "border border-transparent bg-background/50 backdrop-blur-md",
          )}
          onMouseLeave={closeMegaDelayed}
        >
          <div className="ml-1.5">
            <Logo />
          </div>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {MEGA_TABS.map((tab) => (
              <li
                key={tab}
                className="relative"
                onMouseEnter={() => openMega(tab)}
                onMouseLeave={closeMegaDelayed}
              >
                <button
                  type="button"
                  data-mega-trigger={tab}
                  aria-expanded={activeTab === tab}
                  aria-controls={activeTab === tab ? panelId : undefined}
                  aria-haspopup="true"
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-3 py-2 text-[13.5px] font-medium transition-colors duration-200",
                    activeTab === tab
                      ? "text-ink"
                      : "text-ink-60 hover:text-ink",
                  )}
                  onFocus={() => openMega(tab)}
                  onClick={() => {
                    clearTimers()
                    if (activeTab === tab) closeMegaNow()
                    else setActiveTab(tab)
                  }}
                  onKeyDown={(e) => onTriggerKeyDown(tab, e)}
                >
                  {tab}
                  <ChevronDown
                    className={cn(
                      "size-3 transition-transform",
                      activeTab === tab && "rotate-180",
                    )}
                  />
                </button>

                {/* Isolated panel â€” only the active triggerâ€™s content */}
                <AnimatePresence>
                  {activeTab === tab && (
                    <motion.div
                      id={panelId}
                      ref={panelRef}
                      role="region"
                      aria-label={`${tab} menu`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={spring}
                      className={cn(
                        "absolute top-full z-50 hidden pt-3 lg:block",
                        tab === "Tools"
                          ? "left-1/2 w-[min(36rem,calc(100vw-2rem))] -translate-x-1/2"
                          : "left-0 w-[min(22rem,calc(100vw-2rem))]",
                      )}
                      onMouseEnter={clearTimers}
                      onMouseLeave={closeMegaDelayed}
                      onKeyDown={onPanelKeyDown}
                    >
                      <PanelChrome>
                        {tab === "Services" && (
                          <div className="p-4">
                            <p className="mb-3 px-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-40">
                              Services
                            </p>
                            <div className="flex flex-col gap-0.5">
                              {MEGA_SERVICES.map((item) => (
                                <MegaItem
                                  key={item.href}
                                  item={item}
                                  onNavigate={closeMegaNow}
                                />
                              ))}
                            </div>
                            <Link
                              href="/services"
                              onClick={closeMegaNow}
                              className={footerLinkClass}
                            >
                              All services
                              <ArrowRight className="size-3.5" />
                            </Link>
                          </div>
                        )}

                        {tab === "Industries" && (
                          <div className="p-4">
                            <p className="mb-3 px-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-40">
                              Industries
                            </p>
                            <div className="flex flex-col gap-0.5">
                              {MEGA_INDUSTRIES.map((item) => (
                                <MegaItem
                                  key={item.href}
                                  item={item}
                                  onNavigate={closeMegaNow}
                                />
                              ))}
                            </div>
                            <Link
                              href="/industries"
                              onClick={closeMegaNow}
                              className={footerLinkClass}
                            >
                              View all industries
                              <ArrowRight className="size-3.5" />
                            </Link>
                          </div>
                        )}

                        {tab === "Tools" && (
                          <div className="p-4">
                            <p className="mb-3 px-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-40">
                              Free tools
                            </p>
                            <div className="grid grid-cols-2 gap-2.5">
                              {MEGA_FREE_TOOLS.map((tool) => (
                                <ToolTile
                                  key={tool.href}
                                  tool={tool}
                                  onNavigate={closeMegaNow}
                                />
                              ))}
                            </div>
                            <Link
                              href="/tools"
                              onClick={closeMegaNow}
                              className={footerLinkClass}
                            >
                              See all free tools
                              <ArrowRight className="size-3.5" />
                            </Link>
                          </div>
                        )}
                      </PanelChrome>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
            <li>
              <Link
                href="/case-studies"
                className="rounded-full px-3 py-2 text-[13.5px] font-medium text-ink-60 transition-colors duration-200 hover:text-ink"
              >
                Case studies
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="rounded-full px-3 py-2 text-[13.5px] font-medium text-ink-60 transition-colors duration-200 hover:text-ink"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className="rounded-full px-3 py-2 text-[13.5px] font-medium text-ink-60 transition-colors duration-200 hover:text-ink"
              >
                Pricing
              </Link>
            </li>
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
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="grid size-10 place-items-center rounded-full border border-ink-08 text-ink transition-colors duration-200 hover:border-vibrant-purple/40 hover:bg-vibrant-purple/[0.04] lg:hidden"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile accordion */}
      <AnimatePresence>
        {mobileOpen && (
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
                onClick={() => setMobileOpen(false)}
                className="grid size-10 place-items-center rounded-full border border-ink-08 text-ink transition-colors duration-200 hover:bg-cream"
              >
                <X className="size-4" />
              </button>
            </div>
            <nav className="flex flex-col px-6 pb-24 pt-8">
              {(
                [
                  {
                    label: "Services",
                    items: [
                      ...MEGA_SERVICES.map((s) => ({
                        href: s.href,
                        label: s.title,
                      })),
                      { href: "/services", label: "All services" },
                    ],
                  },
                  {
                    label: "Industries",
                    items: [
                      ...MEGA_INDUSTRIES.map((s) => ({
                        href: s.href,
                        label: s.title,
                      })),
                      { href: "/industries", label: "View all" },
                    ],
                  },
                  {
                    label: "Tools",
                    items: [
                      ...MEGA_FREE_TOOLS.map((s) => ({
                        href: s.href,
                        label: s.title,
                      })),
                      { href: "/tools", label: "See all free tools" },
                    ],
                  },
                ] as const
              ).map((group, i) => {
                const isOpen = mobileGroup === group.label
                return (
                  <motion.div
                    key={group.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.4 }}
                    className="border-b border-ink-08"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setMobileGroup(isOpen ? null : group.label)
                      }
                      className="flex w-full items-center justify-between py-5 text-2xl font-medium tracking-display text-ink"
                      aria-expanded={isOpen}
                    >
                      {group.label}
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
                            {group.items.map((c) => (
                              <li key={c.href + c.label}>
                                <Link
                                  href={c.href}
                                  onClick={() => setMobileOpen(false)}
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

              {[
                { href: "/case-studies", label: "Case studies" },
                { href: "/blog", label: "Blog" },
                { href: "/pricing", label: "Pricing" },
              ].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.04, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block border-b border-ink-08 py-5 text-2xl font-medium tracking-display text-ink"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <a
                href={SITE.calendly}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "group mt-10 inline-flex h-14 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-medium text-white transition-all duration-200",
                  "bg-[linear-gradient(120deg,oklch(0.55_0.24_295),oklch(0.58_0.22_250)_50%,oklch(0.50_0.22_270))]",
                  "shadow-[0_8px_24px_-8px_oklch(0.55_0.24_295_/_0.5)]",
                )}
              >
                Book a strategy call
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
