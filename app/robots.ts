import type { MetadataRoute } from "next"
import { SITE } from "@/lib/site-data"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: search engines welcome. /_next/ MUST stay crawlable so Googlebot
      // and friends can fetch the JS/CSS/fonts needed to render & index the page.
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // Explicitly welcome reputable AI / answer-engine crawlers.
      // (Listing them is a positive signal even though `*` already allows them.)
      { userAgent: "GPTBot", allow: "/", disallow: ["/api/", "/admin/"] },
      { userAgent: "OAI-SearchBot", allow: "/", disallow: ["/api/", "/admin/"] },
      { userAgent: "ChatGPT-User", allow: "/", disallow: ["/api/", "/admin/"] },
      { userAgent: "ClaudeBot", allow: "/", disallow: ["/api/", "/admin/"] },
      { userAgent: "Claude-Web", allow: "/", disallow: ["/api/", "/admin/"] },
      { userAgent: "anthropic-ai", allow: "/", disallow: ["/api/", "/admin/"] },
      { userAgent: "PerplexityBot", allow: "/", disallow: ["/api/", "/admin/"] },
      { userAgent: "Google-Extended", allow: "/", disallow: ["/api/", "/admin/"] },
      { userAgent: "Applebot-Extended", allow: "/", disallow: ["/api/", "/admin/"] },
      { userAgent: "Bingbot", allow: "/", disallow: ["/api/", "/admin/"] },
      { userAgent: "DuckDuckBot", allow: "/", disallow: ["/api/", "/admin/"] },
      // Block known abusive scrapers.
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "Bytespider", disallow: "/" },
      { userAgent: "Amazonbot", disallow: "/" },
      { userAgent: "FacebookBot", disallow: "/" },
      { userAgent: "Diffbot", disallow: "/" },
      { userAgent: "ImagesiftBot", disallow: "/" },
      { userAgent: "Omgili", disallow: "/" },
      { userAgent: "Omgilibot", disallow: "/" },
      { userAgent: "PetalBot", disallow: "/" },
      { userAgent: "MJ12bot", disallow: "/" },
      { userAgent: "DotBot", disallow: "/" },
    ],
    sitemap: `${SITE.domain}/sitemap.xml`,
    host: SITE.domain,
  }
}
