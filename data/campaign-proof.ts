/**
 * CAMPAIGN / BOOKINGS PROOF SCREENSHOTS
 *
 * Real assets live under /public/proof.
 * Captions use industry + stage only — no client legal names without permission.
 * Calendar screenshots illustrate booking density (third-party UI chrome may appear;
 * they are shown as evidence of calendar volume, not as named client endorsements).
 */

export type CampaignProof = {
  id: string
  src: string
  alt: string
  caption: string
  context: string
  isPlaceholder: boolean
}

export const CAMPAIGN_PROOF: CampaignProof[] = [
  {
    id: "proof-smartlead-replies",
    src: "/proof/smartlead-campaign-dashboard.png",
    alt: "Smartlead campaign analytics dashboard for a property management outbound program",
    caption: "Smartlead dashboard — property management vertical",
    context: "Cold email campaign · live reply and send metrics",
    isPlaceholder: false,
  },
  {
    id: "proof-calendar-density-1",
    src: "/proof/calendar-proof-1.png",
    alt: "Week view calendar densely filled with booked meetings and calls",
    caption: "Appointment-density week view — anonymized booking volume evidence",
    context: "Calendar density · anonymized",
    isPlaceholder: false,
  },
  {
    id: "proof-calendar-density-2",
    src: "/proof/calendar-proof-2.png",
    alt: "Week view calendar showing recurring work blocks and multiple 1:1 meetings",
    caption: "Stacked meetings across a work week — anonymized calendar density",
    context: "Calendar density · anonymized",
    isPlaceholder: false,
  },
]
