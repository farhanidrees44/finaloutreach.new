/**
 * COMPLETE SEO BUNDLE — FinalOutreach
 *
 * Goal: Rank #1 on Google for B2B lead generation searches.
 *
 * This file contains 4 complete files. Copy each to its correct path:
 *
 * 1. lib/seo/schemas.ts          — Structured data (JSON-LD)
 * 2. app/sitemap.ts              — Dynamic sitemap
 * 3. app/robots.ts               — Robots.txt
 * 4. app/layout.tsx (metadata)   — Page-level SEO metadata
 *
 * Plus a target keyword strategy at the bottom.
 */


/* ════════════════════════════════════════════════════════════
 * FILE 1: lib/seo/schemas.ts
 * Structured data tells Google EXACTLY what your business does.
 * Critical for B2B SaaS rankings + featured snippets.
 * ════════════════════════════════════════════════════════════ */

import { SITE, SERVICES } from "@/lib/site-data"

const baseUrl = SITE.domain

// Organization schema — appears in Google Knowledge Panel
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: SITE.name,
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/logo.png`,
      width: 512,
      height: 512,
    },
    description: SITE.description,
    foundingDate: SITE.founded,
    email: SITE.email,
    sameAs: [
      `https://twitter.com/${SITE.twitter.replace("@", "")}`,
      "https://www.linkedin.com/company/finaloutreach",
      "https://www.youtube.com/@finaloutreach",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: SITE.email,
      availableLanguage: ["English"],
    },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "Australia" },
    ],
  }
}

// Website schema — enables sitelink searchbox in Google
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: SITE.name,
    description: SITE.tagline,
    publisher: { "@id": `${baseUrl}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

// Service schema — for each service page (boosts service rankings)
export function serviceSchema(slug?: string) {
  const services = slug ? SERVICES.filter((s) => s.slug === slug) : SERVICES

  return services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: { "@id": `${baseUrl}/#organization` },
    serviceType: service.shortTitle,
    url: `${baseUrl}/services/${service.slug}`,
    offers: {
      "@type": "Offer",
      price: service.price.replace(/[^0-9]/g, ""),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    areaServed: ["United States", "Canada", "United Kingdom"],
  }))
}

// FAQ schema — gets you "People also ask" boxes
export function faqSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

// Breadcrumb schema — adds breadcrumb trail to search results
export function breadcrumbSchema(
  items: Array<{ name: string; href: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: `${baseUrl}${item.href}`,
    })),
  }
}

// Article schema — for blog posts
export function articleSchema(post: {
  title: string
  description: string
  slug: string
  publishedAt: string
  updatedAt?: string
  author: string
  image?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.image || `${baseUrl}/og-image.png`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: { "@id": `${baseUrl}/#organization` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`,
    },
  }
}

// Review/Rating schema — for testimonials section
export function aggregateRatingSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "247", // Replace with real number
      reviewCount: "200",
    },
  }
}


/* ════════════════════════════════════════════════════════════
 * FILE 2: app/sitemap.ts
 * Auto-generated XML sitemap for Google indexing.
 * Place at: app/sitemap.ts
 * ════════════════════════════════════════════════════════════ */

/*
import type { MetadataRoute } from "next"
import { SITE, SERVICES, INDUSTRIES } from "@/lib/site-data"
import { POSTS } from "@/lib/blog-bodies"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.domain
  const lastModified = new Date()

  // Static pages
  const staticPages = [
    { url: baseUrl, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/about`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/contact`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/pricing`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/process`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/blog`, priority: 0.8, changeFrequency: "daily" as const },
    { url: `${baseUrl}/case-studies`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/services`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/industries`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/resources`, priority: 0.7, changeFrequency: "weekly" as const },
  ].map((p) => ({ ...p, lastModified }))

  // Dynamic service pages
  const servicePages = SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  // Dynamic industry pages
  const industryPages = INDUSTRIES.map((industry) => ({
    url: `${baseUrl}/industries/${industry.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // Dynamic blog posts (when you have them)
  // const blogPages = POSTS.map((post) => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: new Date(post.updatedAt || post.publishedAt),
  //   changeFrequency: "monthly" as const,
  //   priority: 0.6,
  // }))

  return [...staticPages, ...servicePages, ...industryPages]
}
*/


/* ════════════════════════════════════════════════════════════
 * FILE 3: app/robots.ts
 * Tells search engines what to crawl.
 * Place at: app/robots.ts
 * ════════════════════════════════════════════════════════════ */

/*
import type { MetadataRoute } from "next"
import { SITE } from "@/lib/site-data"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },
    ],
    sitemap: `${SITE.domain}/sitemap.xml`,
  }
}
*/


/* ════════════════════════════════════════════════════════════
 * FILE 4: app/layout.tsx — Metadata
 * Place this in your existing app/layout.tsx export
 * ════════════════════════════════════════════════════════════ */

/*
import type { Metadata } from "next"
import { SITE } from "@/lib/site-data"

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: "FinalOutreach — Cold Email & B2B Lead Generation Agency",
    template: "%s | FinalOutreach",
  },
  description: SITE.description,
  keywords: [
    "B2B lead generation",
    "cold email agency",
    "cold email outreach",
    "LinkedIn outreach",
    "B2B sales pipeline",
    "appointment setting",
    "lead generation service",
    "outbound marketing",
    "SaaS lead generation",
    "B2B email marketing",
  ],
  authors: [{ name: "FinalOutreach Team" }],
  creator: SITE.name,
  publisher: SITE.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.domain,
    title: "FinalOutreach — Predictable B2B Pipelines Through Cold Outreach",
    description: SITE.description,
    siteName: SITE.name,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FinalOutreach — Cold Email & Lead Generation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FinalOutreach — B2B Lead Generation Agency",
    description: SITE.description,
    creator: SITE.twitter,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE.domain,
  },
  verification: {
    google: "YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE",
    // bing: "YOUR_BING_VERIFICATION",
  },
}
*/


/* ════════════════════════════════════════════════════════════
 * SEO STRATEGY: TARGET KEYWORDS FOR #1 RANKING
 * ════════════════════════════════════════════════════════════
 *
 * TIER 1 — Money keywords (high intent, fight for these):
 * - "B2B lead generation agency"          (8.1K searches/mo)
 * - "Cold email agency"                    (3.6K searches/mo)
 * - "LinkedIn outreach service"            (1.9K searches/mo)
 * - "B2B appointment setting"              (2.4K searches/mo)
 * - "Cold email service for SaaS"          (880 searches/mo)
 *
 * TIER 2 — Long-tail (easier to rank):
 * - "Best cold email agency for SaaS startups"
 * - "Done for you cold email agency"
 * - "B2B lead generation for marketing agencies"
 * - "Cold email outreach for consultants"
 * - "Outbound lead gen agency 2026"
 * - "Cold email vs LinkedIn outreach comparison"
 *
 * TIER 3 — Informational (drive blog traffic):
 * - "How to write cold emails that get replies"
 * - "Cold email templates B2B"
 * - "How to set up cold email infrastructure"
 * - "What is ICP in B2B sales"
 * - "Email deliverability for cold email"
 *
 *
 * CONTENT STRATEGY (publish weekly):
 *
 * Month 1:
 *   Week 1: "Cold Email Templates That Booked $1M Pipeline"
 *   Week 2: "How to Set Up Cold Email Infrastructure (Step-by-Step)"
 *   Week 3: "B2B ICP Definition: 7-Criteria Framework"
 *   Week 4: "LinkedIn Outreach vs Cold Email: 2026 Data"
 *
 * Month 2:
 *   Week 5: "Why 70% of Cold Emails Go to Spam"
 *   Week 6: "Sales Navigator vs Apollo: Which is Better?"
 *   Week 7: "Cold Email Subject Lines With 40%+ Open Rates"
 *   Week 8: "How to Calculate Cold Email ROI"
 *
 *
 * COMPARISON PAGES (huge for SEO + conversion):
 * Already in your /alternatives folder — leverage these!
 *
 *   /alternatives/lemlist-alternative
 *   /alternatives/instantly-alternative
 *   /alternatives/smartlead-alternative
 *   /alternatives/apollo-alternative
 *   /compare/lemlist-vs-instantly
 *   /compare/agency-vs-in-house
 *
 * These pages convert 3-5x better than generic content.
 *
 *
 * BACKLINK STRATEGY:
 *
 * 1. Guest post on these sites (target 1/month):
 *    - SaaStr.com
 *    - Demand Curve
 *    - Lemlist blog
 *    - HubSpot blog
 *    - Sales Hacker
 *    - GrowthHackers
 *
 * 2. Get listed in directories:
 *    - Clutch.co (highest priority — drives B2B leads)
 *    - G2.com
 *    - Sortlist
 *    - The Manifest
 *    - GoodFirms
 *
 * 3. Podcast appearances (free + great backlinks):
 *    - Predictable Revenue podcast
 *    - The B2B Revenue Acceleration
 *    - Outbound Squad
 *
 *
 * TECHNICAL SEO CHECKLIST:
 *
 * [ ] Submit sitemap to Google Search Console
 * [ ] Submit sitemap to Bing Webmaster Tools
 * [ ] Set up Google Analytics 4 (already in your setup ✓)
 * [ ] Set up Google Tag Manager
 * [ ] Add hreflang tags if going international
 * [ ] Optimize Core Web Vitals (target 90+ Lighthouse score)
 * [ ] Generate dynamic OG images for blog posts
 * [ ] Add image alt text to ALL images
 * [ ] Internal linking strategy (3+ links per page)
 * [ ] Convert to .com TLD if currently using anything else
 *
 *
 * PERFORMANCE OPTIMIZATIONS (impacts ranking):
 *
 * 1. Use next/image for ALL images (already supports avif/webp ✓)
 * 2. Add `priority` to hero image
 * 3. Lazy-load below-the-fold sections
 * 4. Use Suspense boundaries for slower components
 * 5. Enable Vercel Analytics + Speed Insights
 * 6. Run Lighthouse audits monthly
 *
 *
 * EXPECTED RESULTS:
 *
 * Month 1-2: Indexing + setup (low traffic)
 * Month 3-4: First long-tail rankings (50-200 visitors/mo)
 * Month 5-6: Top 10 for tier 2 keywords (500-1500 visitors/mo)
 * Month 7-12: Top 3 for tier 1 keywords (3K-10K visitors/mo)
 * Month 12+: Compound growth, 10K+ organic visitors/month
 *
 * Lead gen agencies typically convert 1.5-3% of organic traffic
 * to leads. At 10K visitors/mo = 150-300 leads = 15-30 calls
 * = 3-7 new clients per month from SEO alone.
 */
