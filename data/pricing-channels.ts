import { CAL } from "@/lib/cal"

export interface PricingPlan {
  name: string
  subtitle: string
  /** Numeric monthly price for count-up animation */
  price: number
  volumeLine: string
  features: string[]
  isPopular?: boolean
  ctaHref: string
}

/** Stable keys for looking up channel packages without duplicating numbers. */
export type PricingChannelId = "linkedin" | "coldEmail" | "coldCall"

export const PRICING_CHANNELS: PricingPlan[] = [
  {
    name: "LinkedIn Outreach",
    subtitle: "LinkedIn outreach + dedicated account manager",
    price: 329,
    volumeLine: "600+ prospects per month",
    ctaHref: CAL.url,
    features: [
      "Proven done-for-you campaigns",
      "Personalized outreach copy, written for your ICP",
      "Qualified prospect lists built and verified",
      "Hundreds of follow-up messages per month",
      "Up to 800 open InMails",
      "1,000+ connection & event messages",
      "Proactive campaign optimization",
      "Real-time lead management inbox",
      "LinkedIn profile & headline recommendations",
      "1st-degree nurture campaigns",
      "A/B testing across openers and CTAs",
      "Easy-to-use client dashboard",
      "Advanced campaign metrics",
      "Smart & custom inbox chat handling",
      "Direct CRM integration",
      "Dedicated account manager",
      "Email, chat, and phone support",
      "Weekly strategy calls",
      "Profile privacy & safety protection",
    ],
  },
  {
    name: "Cold Email Outreach",
    subtitle: "Cold email + go-to-market expert",
    price: 1895,
    volumeLine: "10,000+ emails per month",
    isPopular: true,
    ctaHref: CAL.url,
    features: [
      "Unlimited email campaigns",
      "10+ intent signal layers",
      "Done-for-you email campaigns end to end",
      "Email outreach copy crafted per persona",
      "Ideal decision-makers identified and mapped",
      "Qualified lead list built (triple-verified, ≤2% bounce)",
      "Ongoing campaign optimization",
      "1-on-1 onboarding & support",
      "Email inbox warmup (SPF/DKIM/DMARC/BIMI configured)",
      "AI-powered personalization at scale",
      "A/B/C testing on subject lines and openers",
      "Easy-to-use client dashboard",
      "Advanced campaign metrics",
      "CRM integration & tracking",
      "Advanced guides and tutorials",
      "Deliverability management",
      "Weekly strategy calls",
      "Dedicated account manager",
      "Email, chat, and phone support",
    ],
  },
  {
    name: "Cold Call Outreach",
    subtitle: "Cold calling + SDR manager",
    price: 3400,
    volumeLine: "5,000+ calls per month",
    ctaHref: CAL.url,
    features: [
      "Dedicated SDR assigned to your account",
      "Pre-trained by a senior SDR manager",
      "Breakthrough call scripts, built per objection",
      "Direct phone number sourcing & verification",
      "Done-for-you meetings booked into your calendar",
      "300 dials/day minimum",
      "Transparent live campaign dashboard",
      "Qualified prospect lists built",
      "Real-time lead notifications",
      "Power dialer included",
      "AI roleplay training for the SDR before launch",
      "Proactive campaign optimization",
      "Ongoing coaching & call reviews",
      "A/B testing on scripts and cadence",
      "Easy-to-use client dashboard",
      "Advanced campaign metrics",
      "Call recordings included",
      "Direct CRM integration",
    ],
  },
]

/** Index aligned with PRICING_CHANNELS order — LinkedIn, Cold Email, Cold Call. */
export const PRICING_CHANNEL_BY_ID: Record<PricingChannelId, PricingPlan> = {
  linkedin: PRICING_CHANNELS[0],
  coldEmail: PRICING_CHANNELS[1],
  coldCall: PRICING_CHANNELS[2],
}

/** Display helper — always format from the numeric source of truth. */
export function formatFromMonthly(price: number): string {
  return `From $${price.toLocaleString("en-US")}/mo`
}

export function channelFromPrice(id: PricingChannelId): string {
  return formatFromMonthly(PRICING_CHANNEL_BY_ID[id].price)
}
