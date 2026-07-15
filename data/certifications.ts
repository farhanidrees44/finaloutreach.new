/**
 * CERTIFICATIONS / CREDENTIALS
 *
 * BEFORE DEPLOY — confirm for each entry:
 * - [ ] certificateImage points to a real badge file in /public/certifications
 * - [ ] verifyUrl is a live public verification page (or null if the issuer has none)
 * - [ ] dateEarned matches the credential
 * - [ ] isPlaceholder is false for every shipped credential
 *
 * Entries with isPlaceholder: true show a SAMPLE ribbon in non-production builds.
 */

export type Certification = {
  id: string
  title: string
  issuer: string
  tool: string
  certificateImage: string
  verifyUrl: string | null
  dateEarned: string
  /** When true, SAMPLE ribbon shows in development only */
  isPlaceholder: boolean
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: "instantly-certified-expert",
    title: "Instantly Certified Expert",
    issuer: "Instantly.ai",
    tool: "Instantly",
    certificateImage: "/certifications/instantly-certified-expert.png",
    verifyUrl: null, // TODO: add public Instantly verification URL if available
    dateEarned: "2025",
    isPlaceholder: false,
  },
  {
    id: "heyreach-expert",
    title: "HeyReach Expert",
    issuer: "HeyReach",
    tool: "HeyReach",
    certificateImage: "/certifications/heyreach-expert.png",
    verifyUrl: null, // TODO: add public HeyReach verification URL if available
    dateEarned: "2025",
    isPlaceholder: false,
  },
  {
    id: "clay-enterprise-partner",
    title: "Clay Enterprise Partner",
    issuer: "Clay",
    tool: "Clay",
    certificateImage: "/certifications/clay-enterprise-partner.png",
    verifyUrl: null, // TODO: add Clay partner directory URL if public
    dateEarned: "2025",
    isPlaceholder: false,
  },
  {
    id: "ghl-certified-admin",
    title: "HighLevel Certified Admin",
    issuer: "GoHighLevel",
    tool: "GoHighLevel",
    certificateImage: "/certifications/gohighlevel-certified-admin.png",
    verifyUrl: null, // TODO: add GHL academy verification URL if available
    dateEarned: "2025",
    isPlaceholder: false,
  },
  {
    id: "ghl-local-hero",
    title: "Local Hero — Skills Badge",
    issuer: "GoHighLevel",
    tool: "GoHighLevel",
    certificateImage: "/certifications/gohighlevel-local-hero.png",
    verifyUrl: null,
    dateEarned: "2025",
    isPlaceholder: false,
  },
  {
    id: "ghl-a2p",
    title: "A2P — Skills Badge",
    issuer: "GoHighLevel",
    tool: "GoHighLevel",
    certificateImage: "/certifications/gohighlevel-a2p.png",
    verifyUrl: null,
    dateEarned: "2025",
    isPlaceholder: false,
  },
]
