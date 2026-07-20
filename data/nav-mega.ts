/**
 * Mega-menu content for SiteNavigation — Services / Industries / Tools.
 * Keep copy here so the nav component stays presentation-only.
 */

import type { LucideIcon } from "lucide-react"
import {
  Mail,
  Linkedin,
  ListFilter,
  CalendarCheck,
  Server,
  ClipboardCheck,
  Building2,
  Briefcase,
  Landmark,
  HeartPulse,
  LineChart,
  MailSearch,
  ShieldAlert,
  Globe,
  Sparkles,
  Calculator,
  Flame,
  Images,
  Scale,
  LayoutDashboard,
  Handshake,
  Factory,
  Building,
} from "lucide-react"
import { INDUSTRY_PAGE_PROFILES } from "@/lib/pseo/industry-pages"

export type MegaLink = {
  href: string
  title: string
  subtitle: string
  icon?: LucideIcon
  featured?: boolean
}

export type MegaTool = {
  href: string
  title: string
  subtitle: string
  category: string
  speed: string
  icon: LucideIcon
}

export const MEGA_SERVICES: MegaLink[] = [
  {
    href: "/services/cold-email",
    title: "Cold email outreach",
    subtitle: "Flagship — inbox infrastructure, copy, and reply handling end-to-end.",
    icon: Mail,
    featured: true,
  },
  {
    href: "/services/linkedin-outreach",
    title: "LinkedIn outreach",
    subtitle: "Human-sounding multi-touch sequences for high-ACV buyers.",
    icon: Linkedin,
  },
  {
    href: "/services/lead-list-building",
    title: "Lead list building",
    subtitle: "Verified ICP lists from funding, tech, and hiring signals.",
    icon: ListFilter,
  },
  {
    href: "/services/appointment-setting",
    title: "Appointment setting",
    subtitle: "SDR reply handling that books qualified meetings on your calendar.",
    icon: CalendarCheck,
  },
  {
    href: "/services/email-infrastructure",
    title: "Email infrastructure",
    subtitle: "Domains, warm-up, and deliverability setup before you send.",
    icon: Server,
  },
  {
    href: "/services/outreach-audit",
    title: "Outreach audit (free)",
    subtitle: "A teardown of your current stack, copy, and reply rates.",
    icon: ClipboardCheck,
  },
]

/** Keep in sync with INDUSTRY_PAGE_PROFILES — every published industry must appear here. */
const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  saas: LineChart,
  agencies: Briefcase,
  consulting: Building2,
  fintech: Landmark,
  healthtech: HeartPulse,
  "b2b-services": Handshake,
  manufacturing: Factory,
  "real-estate": Building,
}

export const MEGA_INDUSTRIES: MegaLink[] = INDUSTRY_PAGE_PROFILES.map((p) => {
  const icon = INDUSTRY_ICONS[p.slug]
  if (!icon) {
    throw new Error(
      `Missing mega-nav icon for industry "${p.slug}". Add it to INDUSTRY_ICONS in data/nav-mega.ts.`,
    )
  }
  return {
    href: `/industries/${p.slug}`,
    title: p.navTitle,
    subtitle: p.navSubtitle,
    icon,
  }
})

if (MEGA_INDUSTRIES.length !== INDUSTRY_PAGE_PROFILES.length) {
  throw new Error(
    "MEGA_INDUSTRIES is out of sync with INDUSTRY_PAGE_PROFILES — every industry page must appear in the mega-nav.",
  )
}

/** Live free tools at /tools — Tools nav panel only (not vendor stack). */
export const MEGA_FREE_TOOLS: MegaTool[] = [
  {
    href: "/tools/subject-line-tester",
    title: "Subject Line Tester",
    subtitle:
      "Score any subject line against 14 deliverability and open-rate factors.",
    category: "Copy",
    speed: "<2s",
    icon: MailSearch,
  },
  {
    href: "/tools/spam-word-checker",
    title: "Spam Word Checker",
    subtitle:
      "Highlight every spam-trigger word, all-caps run, and risky phrase before you hit send.",
    category: "Deliverability",
    speed: "<1s",
    icon: ShieldAlert,
  },
  {
    href: "/tools/domain-health-checker",
    title: "Domain Health Checker",
    subtitle: "Check SPF, DKIM, DMARC, and MX records on any domain in seconds.",
    category: "Deliverability",
    speed: "~3s",
    icon: Globe,
  },
  {
    href: "/tools/cold-email-generator",
    title: "Cold Email Generator",
    subtitle:
      "Generate a 3-step cold email sequence built around your offer and persona.",
    category: "Copy",
    speed: "<5s",
    icon: Sparkles,
  },
  {
    href: "/tools/roi-calculator",
    title: "ROI Calculator",
    subtitle:
      "Model the revenue, payback, and ROI of a cold outbound program in seconds.",
    category: "Strategy",
    speed: "<1s",
    icon: Calculator,
  },
  {
    href: "/tools/warmup-calculator",
    title: "Warmup Calculator",
    subtitle: "Day-by-day warmup schedule for a brand-new sending domain.",
    category: "Deliverability",
    speed: "<1s",
    icon: Flame,
  },
]

/**
 * Results mega — only destinations with real, non-fabricated proof on the site.
 * Reviews / permissioned testimonials omitted until content exists.
 */
export const MEGA_RESULTS: MegaLink[] = [
  {
    href: "/results",
    title: "Live proof",
    subtitle:
      "Real campaign metrics by industry — filterable proof, no invented case studies.",
    icon: Images,
  },
  {
    href: "/compare",
    title: "Compare agencies",
    subtitle:
      "Side-by-side breakdowns vs Belkins, Cleverly, Leadium, and other outbound shops.",
    icon: Scale,
  },
  {
    href: "/#live-data",
    title: "See it live on a call",
    subtitle:
      "Named case studies only with permission — until then we walk real dashboards live.",
    icon: LayoutDashboard,
  },
]
