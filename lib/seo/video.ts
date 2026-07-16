import { SITE } from "@/lib/site-data"

export const WALKTHROUGH_VIMEO_ID = "1210546084"
export const WALKTHROUGH_VIMEO_URL = `https://vimeo.com/${WALKTHROUGH_VIMEO_ID}`
export const WALKTHROUGH_VIMEO_EMBED_URL = `https://player.vimeo.com/video/${WALKTHROUGH_VIMEO_ID}?badge=0&autopause=0&player_id=0&app_id=58479`

export function walkthroughVideoSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "How FinalOutreach runs outbound for B2B teams",
    description:
      "A short walkthrough of FinalOutreach targeting, email infrastructure, sequencing, and appointment handoff for B2B teams.",
    thumbnailUrl: [`${SITE.domain}/proof/video-poster.jpg`],
    uploadDate: "2025-01-01",
    contentUrl: WALKTHROUGH_VIMEO_URL,
    embedUrl: WALKTHROUGH_VIMEO_EMBED_URL,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.domain,
    },
  }
}
