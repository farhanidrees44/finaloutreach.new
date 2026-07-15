/**
 * CAMPAIGN PROOF SCREENSHOTS
 *
 * BEFORE DEPLOY — for each entry:
 * - [ ] Replace src with a real redacted campaign dashboard screenshot
 * - [ ] Caption states what is proven (rate/metric + industry + stage + period)
 * - [ ] Never include client legal names unless written permission exists
 * - [ ] Set isPlaceholder: false once real assets are live
 *
 * Until then, SAMPLE ribbon shows in development builds only.
 */

export type CampaignProof = {
  id: string
  src: string
  alt: string
  caption: string
  /** Industry + stage only — no client name without permission */
  context: string
  isPlaceholder: boolean
}

export const CAMPAIGN_PROOF: CampaignProof[] = [
  // PLACEHOLDER — replace before deploy
  {
    id: "proof-reply-fintech",
    src: "/proof/placeholder-dashboard-1.svg",
    alt: "Campaign dashboard showing combined reply-rate metrics for a fintech outbound sequence",
    caption: "38.4% combined reply rate — Series B fintech client, Q1 2026",
    context: "Series B fintech · cold email + LinkedIn",
    isPlaceholder: true,
  },
  // PLACEHOLDER — replace before deploy
  {
    id: "proof-meetings-saas",
    src: "/proof/placeholder-dashboard-2.svg",
    alt: "Campaign dashboard showing 47 qualified meetings booked in 60 days",
    caption: "47 qualified meetings booked in 60 days — B2B SaaS, Series A",
    context: "Series A B2B SaaS · appointment setting",
    isPlaceholder: true,
  },
  // PLACEHOLDER — replace before deploy
  {
    id: "proof-inbox-agency",
    src: "/proof/placeholder-dashboard-3.svg",
    alt: "Deliverability report showing primary inbox placement after infrastructure rebuild",
    caption: "97.2% primary inbox rate after infrastructure rebuild — agency client",
    context: "Marketing agency · email infrastructure",
    isPlaceholder: true,
  },
  // PLACEHOLDER — replace before deploy
  {
    id: "proof-linkedin-consulting",
    src: "/proof/placeholder-dashboard-4.svg",
    alt: "LinkedIn campaign metrics showing connection acceptance and reply rates",
    caption: "61% connection acceptance · 18% reply — consulting firm, Q4 2025",
    context: "Consulting · LinkedIn outreach",
    isPlaceholder: true,
  },
]
