import { SITE } from "@/lib/site-data"

export const WALKTHROUGH_YOUTUBE_ID = "H4ddyQjC9As"
export const WALKTHROUGH_YOUTUBE_URL = `https://www.youtube.com/watch?v=${WALKTHROUGH_YOUTUBE_ID}`

export function walkthroughVideoSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "How FinalOutreach runs outbound for B2B teams",
    description:
      "A short walkthrough of FinalOutreach targeting, email infrastructure, sequencing, and appointment handoff for B2B teams.",
    thumbnailUrl: [`${SITE.domain}/proof/video-poster.jpg`],
    uploadDate: "2025-01-01",
    contentUrl: WALKTHROUGH_YOUTUBE_URL,
    embedUrl: `https://www.youtube.com/embed/${WALKTHROUGH_YOUTUBE_ID}`,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.domain,
    },
  }
}
