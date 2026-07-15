/**
 * HOMEPAGE CASE STUDIES CAROUSEL
 *
 * BEFORE DEPLOY:
 * - [ ] Replace with real clients who gave written permission to name them
 * - [ ] Set isPlaceholder: false for every shipped card
 * - [ ] Never invent company names, people, or pipeline numbers
 */

export type HomepageCaseStudy = {
  id: string
  slug: string
  client: string
  industry: string
  role: string
  personName: string
  headline: string
  quote: string
  metricPrimary: string
  metricSecondary: string
  timeframe: string
  isPlaceholder: boolean
}

export const HOMEPAGE_CASE_STUDIES: HomepageCaseStudy[] = [
  // PLACEHOLDER — replace before deploy
  {
    id: "cs-1",
    slug: "placeholder-saas",
    client: "[Company]",
    industry: "B2B SaaS · Series A",
    role: "[Title]",
    personName: "[Client name]",
    headline: "[Outcome headline — e.g. pipeline result with permission]",
    quote:
      "Replace with a real quote once you have written permission. Until then this stays marked SAMPLE in development.",
    metricPrimary: "[Metric]",
    metricSecondary: "[Metric]",
    timeframe: "[Timeframe]",
    isPlaceholder: true,
  },
  // PLACEHOLDER — replace before deploy
  {
    id: "cs-2",
    slug: "placeholder-agency",
    client: "[Company]",
    industry: "Agency · 40–80 seats",
    role: "[Title]",
    personName: "[Client name]",
    headline: "[Outcome headline pending client permission]",
    quote:
      "Placeholder case study — do not invent names, headshots, or companies to fill this slot.",
    metricPrimary: "[Metric]",
    metricSecondary: "[Metric]",
    timeframe: "[Timeframe]",
    isPlaceholder: true,
  },
  // PLACEHOLDER — replace before deploy
  {
    id: "cs-3",
    slug: "placeholder-fintech",
    client: "[Company]",
    industry: "Fintech · Series B",
    role: "[Title]",
    personName: "[Client name]",
    headline: "[Outcome headline pending client permission]",
    quote:
      "Placeholder case study — swap via data/homepage-case-studies.ts without touching component code.",
    metricPrimary: "[Metric]",
    metricSecondary: "[Metric]",
    timeframe: "[Timeframe]",
    isPlaceholder: true,
  },
]
