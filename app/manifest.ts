import type { MetadataRoute } from "next"
import { SITE } from "@/lib/site-data"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAF7",
    theme_color: "#0372EA",
    icons: [
      { src: "/favicon-16x16.png", sizes: "16x16", type: "image/png", purpose: "any" },
      { src: "/icon.png", sizes: "32x32", type: "image/png", purpose: "any" },
      { src: "/favicon-48x48.png", sizes: "48x48", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  }
}
