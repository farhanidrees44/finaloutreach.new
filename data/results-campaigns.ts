/**
 * Live proof campaigns for /results.
 *
 * Add only real, verified campaigns. Industry/stage labels only —
 * never invent company names, headshots, or quotes.
 * Metrics must match sources already published on the homepage
 * (ResultsBar / Smartlead proof screenshot).
 */

export type ResultsService =
  | "Cold email"
  | "LinkedIn"
  | "Appointment setting"

export type ResultsCampaign = {
  id: string
  service: ResultsService
  industry: string
  headline: string
  metricBadge: string
  strategy: string[]
  results: { label: string; value: string }[]
  proofHref?: string
}

/** Only services/industries that appear on at least one real campaign. */
export const RESULTS_SERVICE_OPTIONS = ["Cold email"] as const satisfies readonly ResultsService[]

export const RESULTS_INDUSTRY_OPTIONS = ["Property management"] as const

export const RESULTS_CAMPAIGNS: ResultsCampaign[] = [
  {
    id: "property-mgmt-cold-email",
    service: "Cold email",
    industry: "Property management",
    headline: "11.58% reply rate — property management vertical",
    metricBadge: "11.58% replies",
    strategy: [
      "Locked ICP around property-management decision makers — not a spray list.",
      "Cold email sequences on dedicated, warmed domains (not the client’s primary inbox).",
      "Three active sequences in the same program, iterated on copy and cadence.",
      "Reply handling aimed at qualified conversations — not lead dumps.",
    ],
    results: [
      { label: "Reply rate", value: "11.58%" },
      { label: "Unique replies", value: "145" },
      { label: "Leads in campaign", value: "1,258" },
      { label: "Active sequences", value: "3" },
    ],
    proofHref: "/#campaign-proof",
  },
]
