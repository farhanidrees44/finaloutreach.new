/**
 * Author registry.
 *
 * Used by /authors/[slug] pages, blog post bylines, and JSON-LD `author`
 * fields. Adding richer author detail (E-A-T signals) helps Google
 * understand who is writing the content.
 */

export type Author = {
  slug: string
  name: string
  role: string
  bio: string
  expertise: string[]
  yearsExperience: number
  links: { label: string; href: string }[]
}

export function authorSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

export const AUTHORS: Author[] = [
  {
    slug: "jordan-hale",
    name: "Jordan Hale",
    role: "Founder, FinalOutreach",
    bio:
      "Jordan founded FinalOutreach in 2019 after a decade running outbound and demand generation at Series-B+ B2B SaaS companies. She has personally written and tested over 4,200 cold email sequences, and has hands-on experience configuring sending infrastructure across Google Workspace and Microsoft 365 at scale. Her writing focuses on the parts of cold email that most operators skip: list quality, deliverability mechanics, and offer clarity.",
    expertise: [
      "Cold email strategy and copywriting",
      "Email deliverability and sending infrastructure",
      "B2B ICP definition and list building",
      "Outbound sales operations",
    ],
    yearsExperience: 12,
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/jordan-hale-finaloutreach" },
      { label: "Email Jordan", href: "mailto:jordan@finaloutreach.com" },
    ],
  },
]

export function findAuthor(slug: string): Author | undefined {
  return AUTHORS.find((a) => a.slug === slug)
}

export function findAuthorByName(name: string): Author | undefined {
  return AUTHORS.find((a) => a.name === name) || AUTHORS.find((a) => a.slug === authorSlug(name))
}
