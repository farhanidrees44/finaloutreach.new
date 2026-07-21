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
import { ArrowRight, ChevronDown, Menu, X, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "./logo"
import { CAL, CAL_BUTTON_PROPS, openCalPopup } from "@/lib/cal"
import {
  MEGA_FREE_TOOLS,
  MEGA_INDUSTRIES,
  MEGA_RESULTS,
  MEGA_SERVICES,
  type MegaLink,
  type MegaTool,
} from "@/data/nav-mega"

type MegaTab = "Services" | "Industries" | "Tools" | "Results"

const MEGA_TABS: MegaTab[] = ["Services", "Industries", "Tools", "Results"]

const OPEN_DELAY_MS = 150
const CLOSE_DELAY_MS = 150

const spring = { type: "spring" as const, stiffness: 320, damping: 32 }

const navLinkClass =
  "inline-flex items-center gap-1 rounded-full px-4 py-2 text-[16px] font-bold tracking-tight transition-colors duration-200 lg:text-[17px]"

/** Shared trigger styles — Cleverly-style bold labels + solid accent pill when open */
function navTriggerClass(active: boolean) {
  return cn(
    navLinkClass,
    active
      ? "bg-primary text-primary-foreground shadow-sm"
      : "text-ink hover:text-ink",
  )
}

/**
 * Cleverly-style mega panel — lavender tint + solid brand border (static, always visible).
 */
function NavDropdownPanel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border-2 border-primary p-6 shadow-lg sm:p-7",
        "bg-[color-mix(in_oklch,var(--primary)_7%,white)]",
        className,
      )}
    >
      {children}
    </div>
  )
}

/** Icon + label row — accent icon, semibold label, soft highlight on hover */
function NavDropdownItem({
  href,
  title,
  subtitle,
  icon: Icon,
  onNavigate,
}: {
  href: string
  title: string
  subtitle?: string
  icon?: LucideIcon
  onNavigate?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "group -mx-3 flex items-center gap-3 rounded-lg px-3 py-2 transition-colors duration-200",
        "hover:bg-white/60 focus-visible:bg-white/60 focus-visible:outline-none",
      )}
    >
      {Icon ? (
        <Icon
          className="size-5 shrink-0 text-primary transition-colors group-hover:text-primary"
          strokeWidth={1.75}
          aria-hidden
        />
      ) : null}
      <span className="min-w-0">
        <span className="block text-base font-bold leading-snug text-ink transition-colors group-hover:text-primary">
          {title}
        </span>
        {subtitle ? (
          <span className="mt-0.5 block text-[12.5px] leading-snug text-ink-40">
            {subtitle}
          </span>
        ) : null}
      </span>
    </Link>
  )
}

type NavItem = {
  href: string
  title: string
  subtitle?: string
  icon?: LucideIcon
}

function NavDropdownGrid({
  items,
  onNavigate,
}: {
  items: NavItem[]
  onNavigate?: () => void
}) {
  const twoCol = items.length >= 4
  return (
    <div
      className={cn(
        "grid gap-x-10 gap-y-1",
        twoCol ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1",
      )}
    >
      {items.map((item) => (
        <NavDropdownItem
          key={item.href + item.title}
          href={item.href}
          title={item.title}
          subtitle={item.subtitle}
          icon={item.icon}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  )
}

function megaLinksToItems(links: MegaLink[]): NavItem[] {
  return links.map((l) => ({
    href: l.href,
    title: l.title,
    subtitle: l.subtitle,
    icon: l.icon,
  }))
}

function toolsToItems(tools: MegaTool[]): NavItem[] {
  return tools.map((t) => ({
    href: t.href,
    title: t.title,
    subtitle: t.subtitle,
    icon: t.icon,
  }))
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
      openTimer.current = setTimeout(() => setActiveTab(tab), OPEN_DELAY_MS)
    },
    [clearTimers],
  )

  const closeMegaDelayed = useCallback(() => {
    clearTimers()
    closeTimer.current = setTimeout(() => setActiveTab(null), CLOSE_DELAY_MS)
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
    const onPointer = (e: MouseEvent) => {
      const t = e.target as Node
      if (navRef.current && !navRef.current.contains(t)) closeMegaNow()
    }
    window.addEventListener("keydown", onKey)
    document.addEventListener("mousedown", onPointer)
    return () => {
      window.removeEventListener("keydown", onKey)
      document.removeEventListener("mousedown", onPointer)
    }
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
    "mt-4 inline-flex items-center gap-1 px-1 py-1 text-[13px] font-semibold text-ink-60 transition-colors hover:text-primary"

  const panelBody = (tab: MegaTab) => {
    if (tab === "Services") {
      return (
        <>
          <NavDropdownGrid
            items={megaLinksToItems(MEGA_SERVICES)}
            onNavigate={closeMegaNow}
          />
          <Link
            href="/services"
            onClick={closeMegaNow}
            className={footerLinkClass}
          >
            All services
            <ArrowRight className="size-3.5" />
          </Link>
        </>
      )
    }
    if (tab === "Industries") {
      return (
        <>
          <NavDropdownGrid
            items={megaLinksToItems(MEGA_INDUSTRIES)}
            onNavigate={closeMegaNow}
          />
          <Link
            href="/industries"
            onClick={closeMegaNow}
            className={footerLinkClass}
          >
            View all industries
            <ArrowRight className="size-3.5" />
          </Link>
        </>
      )
    }
    if (tab === "Results") {
      return (
        <>
          <NavDropdownGrid
            items={megaLinksToItems(MEGA_RESULTS)}
            onNavigate={closeMegaNow}
          />
          <Link
            href="/results"
            onClick={closeMegaNow}
            className={footerLinkClass}
          >
            Jump to live proof
            <ArrowRight className="size-3.5" />
          </Link>
        </>
      )
    }
    return (
      <>
        <NavDropdownGrid
          items={toolsToItems(MEGA_FREE_TOOLS)}
          onNavigate={closeMegaNow}
        />
        <Link href="/tools" onClick={closeMegaNow} className={footerLinkClass}>
          See all free tools
          <ArrowRight className="size-3.5" />
        </Link>
      </>
    )
  }

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
              ? "border border-primary/15 bg-background/85 shadow-[0_4px_20px_-8px_oklch(0.55_0.24_295_/_0.18)] backdrop-blur-xl"
              : "border border-transparent bg-background/50 backdrop-blur-md",
          )}
          onMouseLeave={closeMegaDelayed}
        >
          <div className="ml-1.5 shrink-0">
            <Logo />
          </div>

          <ul className="hidden items-center gap-1 lg:flex">
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
                  className={navTriggerClass(activeTab === tab)}
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
                      "size-3.5 transition-opacity duration-200",
                      activeTab === tab ? "opacity-90" : "opacity-45",
                    )}
                    aria-hidden
                  />
                </button>

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
                          ? "left-1/2 w-[min(40rem,calc(100vw-2rem))] -translate-x-1/2"
                          : tab === "Results"
                            ? "left-0 w-[min(28rem,calc(100vw-2rem))]"
                            : "left-0 w-[min(36rem,calc(100vw-2rem))]",
                      )}
                      onMouseEnter={clearTimers}
                      onMouseLeave={closeMegaDelayed}
                      onKeyDown={onPanelKeyDown}
                    >
                      <NavDropdownPanel>{panelBody(tab)}</NavDropdownPanel>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
            <li>
              <Link
                href="/blog"
                className={cn(navLinkClass, "text-ink hover:text-ink")}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className={cn(navLinkClass, "text-ink hover:text-ink")}
              >
                Pricing
              </Link>
            </li>
          </ul>

          <div className="flex shrink-0 items-center gap-1.5">
            <a
              href={CAL.url}
              {...CAL_BUTTON_PROPS}
              onClick={(e) => {
                e.preventDefault()
                void openCalPopup("nav")
              }}
              className={cn(
                "group hidden h-10 items-center justify-center rounded-full px-4 text-[14px] font-semibold text-white transition-all duration-200 active:scale-[0.98] lg:inline-flex",
                "bg-primary hover:brightness-110",
                "shadow-[0_4px_16px_-4px_oklch(0.55_0.24_295_/_0.4)]",
              )}
            >
              Free Consultation
            </a>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="grid size-11 place-items-center rounded-full border border-ink-08 text-ink transition-colors duration-200 hover:border-primary/40 hover:bg-primary/[0.04] lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile: accordion with icons (single column) */}
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
                className="grid size-11 place-items-center rounded-full border border-ink-08 text-ink transition-colors duration-200 hover:bg-cream"
              >
                <X className="size-5" />
              </button>
            </div>
            <nav className="flex flex-col px-6 pb-24 pt-8">
              {(
                [
                  {
                    label: "Services" as const,
                    items: megaLinksToItems(MEGA_SERVICES).concat({
                      href: "/services",
                      title: "All services",
                    }),
                  },
                  {
                    label: "Industries" as const,
                    items: megaLinksToItems(MEGA_INDUSTRIES).concat({
                      href: "/industries",
                      title: "View all",
                    }),
                  },
                  {
                    label: "Tools" as const,
                    items: toolsToItems(MEGA_FREE_TOOLS).concat({
                      href: "/tools",
                      title: "See all free tools",
                    }),
                  },
                  {
                    label: "Results" as const,
                    items: megaLinksToItems(MEGA_RESULTS).concat({
                      href: "/results",
                      title: "Jump to live proof",
                    }),
                  },
                ] as const
              ).map((group, i) => {
                const isOpen = mobileGroup === group.label
                return (
                  <motion.div
                    key={group.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.35 }}
                    className="border-b border-ink-08"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setMobileGroup(isOpen ? null : group.label)
                      }
                      className="flex w-full items-center justify-between py-5 text-2xl font-semibold tracking-display text-ink"
                      aria-expanded={isOpen}
                    >
                      {group.label}
                      <ChevronDown
                        className={cn(
                          "size-5 transition-opacity",
                          isOpen ? "opacity-90" : "opacity-40",
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
                          <div className="space-y-0.5 pb-4">
                            {group.items.map((c) => {
                              const Icon = c.icon
                              return (
                                <li key={c.href + c.title}>
                                  <Link
                                    href={c.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="-mx-2 flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-primary/[0.06]"
                                  >
                                    {Icon ? (
                                      <Icon
                                        className="size-5 shrink-0 text-primary"
                                        strokeWidth={1.75}
                                        aria-hidden
                                      />
                                    ) : (
                                      <span className="size-5 shrink-0" />
                                    )}
                                    <span className="text-[16px] font-semibold text-ink">
                                      {c.title}
                                    </span>
                                  </Link>
                                </li>
                              )
                            })}
                          </div>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}

              {[
                { href: "/blog", label: "Blog" },
                { href: "/pricing", label: "Pricing" },
              ].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.04, duration: 0.35 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block border-b border-ink-08 py-5 text-2xl font-semibold tracking-display text-ink"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <a
                href={CAL.url}
                {...CAL_BUTTON_PROPS}
                onClick={(e) => {
                  e.preventDefault()
                  setMobileOpen(false)
                  void openCalPopup("nav-mobile")
                }}
                className={cn(
                  "group mt-10 inline-flex h-14 items-center justify-center rounded-full px-6 text-[15px] font-semibold text-white transition-all duration-200",
                  "bg-primary shadow-[0_8px_24px_-8px_oklch(0.55_0.24_295_/_0.5)] hover:brightness-110",
                )}
              >
                Free Consultation
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
