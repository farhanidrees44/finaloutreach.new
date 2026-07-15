/**
 * TESTIMONIALS
 *
 * BEFORE DEPLOY:
 * - [ ] Replace with real quotes from named people who gave written permission
 * - [ ] Company names only with logo/name usage rights
 * - [ ] Set isPlaceholder: false for every shipped quote
 *
 * Until then, SAMPLE ribbon shows in development builds only.
 */

export type Testimonial = {
  id: string
  name: string
  role: string
  company: string
  quote: string
  metric: string
  isPlaceholder: boolean
}

export const TESTIMONIALS: Testimonial[] = [
  // PLACEHOLDER — replace before deploy
  {
    id: "t1",
    name: "[Client name]",
    role: "VP Sales",
    company: "[Company]",
    quote:
      "Replace this with a real quote once you have written permission. Until then this stays marked SAMPLE in development.",
    metric: "[Metric]",
    isPlaceholder: true,
  },
  // PLACEHOLDER — replace before deploy
  {
    id: "t2",
    name: "[Client name]",
    role: "Founder",
    company: "[Company]",
    quote:
      "Placeholder testimonial — do not invent names, headshots, or companies to fill this slot.",
    metric: "[Metric]",
    isPlaceholder: true,
  },
  // PLACEHOLDER — replace before deploy
  {
    id: "t3",
    name: "[Client name]",
    role: "Head of GTM",
    company: "[Company]",
    quote:
      "Placeholder testimonial — swap via data/testimonials.ts without touching the component.",
    metric: "[Metric]",
    isPlaceholder: true,
  },
]
