/**
 * HOMEPAGE CASE STUDIES CAROUSEL
 *
 * Add entries only with written permission to name the client / person.
 * Set isPlaceholder: false for every shipped card.
 * Empty array = homepage shows LiveCampaignInvite CTA instead of placeholders.
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

/** Production: no permissioned homepage stories yet — keep empty. */
export const HOMEPAGE_CASE_STUDIES: HomepageCaseStudy[] = []
