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
} from "lucide-react"

export type MegaLink = {
  href: string
  title: string
  subtitle: string
  icon?: LucideIcon
  /** Raster mark for Tools column (stack logos) */
  logoSrc?: string
  featured?: boolean
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

export const MEGA_INDUSTRIES: MegaLink[] = [
  {
    href: "/industries/saas",
    title: "B2B SaaS",
    subtitle: "Pipeline for teams racing the next funding milestone.",
    icon: LineChart,
  },
  {
    href: "/industries/agencies",
    title: "Marketing agencies",
    subtitle: "Retainer growth without hiring another biz-dev lead.",
    icon: Briefcase,
  },
  {
    href: "/industries/consulting",
    title: "Consulting firms",
    subtitle: "Senior-voice outreach to decision-makers, not gatekeepers.",
    icon: Building2,
  },
  {
    href: "/industries/fintech",
    title: "Fintech",
    subtitle: "Compliance-friendly outbound for trust-first buyers.",
    icon: Landmark,
  },
  {
    href: "/industries/healthtech",
    title: "Healthtech",
    subtitle: "Pilot-first sequences for provider and payer committees.",
    icon: HeartPulse,
  },
]

/** Free tools — listed under Tools column footer / mobile accordion */
export const MEGA_FREE_TOOLS: MegaLink[] = [
  {
    href: "/tools/subject-line-tester",
    title: "Subject line tester",
    subtitle: "Score clarity, spam risk, and open potential.",
  },
  {
    href: "/tools/spam-word-checker",
    title: "Spam word checker",
    subtitle: "Flag phrases that tank deliverability.",
  },
  {
    href: "/tools/domain-health-checker",
    title: "Domain health checker",
    subtitle: "SPF, DKIM, and DMARC at a glance.",
  },
  {
    href: "/tools/cold-email-generator",
    title: "Cold email generator",
    subtitle: "Draft a first-touch angle in minutes.",
  },
  {
    href: "/tools/roi-calculator",
    title: "ROI calculator",
    subtitle: "Model meetings and pipeline from outbound spend.",
  },
  {
    href: "/tools/warmup-calculator",
    title: "Warmup calculator",
    subtitle: "Plan safe daily send volume while warming.",
  },
]
