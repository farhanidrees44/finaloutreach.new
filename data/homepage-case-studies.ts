/**
 * HOMEPAGE CASE STUDIES
 *
 * Add entries only with written permission to name the client / person.
 * Set isPlaceholder: false for every shipped card.
 * Not currently rendered on the homepage — kept for when permissioned stories ship.
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
