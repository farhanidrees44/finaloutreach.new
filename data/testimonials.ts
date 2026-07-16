/**
 * TESTIMONIALS
 *
 * Add only real quotes with written permission.
 * Empty array = homepage does not render a testimonials strip.
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

/** Production: no permissioned quotes yet — keep empty. */
export const TESTIMONIALS: Testimonial[] = []
