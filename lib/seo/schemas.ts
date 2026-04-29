import { SITE } from "@/lib/site-data"

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.domain,
    logo: `${SITE.domain}/logo.png`,
    description: SITE.description,
    email: SITE.email,
    foundingDate: SITE.founded,
    sameAs: [
      "https://www.linkedin.com/company/finaloutreach",
      "https://twitter.com/finaloutreach",
      "https://www.youtube.com/@finaloutreach",
    ],
  }
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.domain,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.domain}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }
}

export function serviceSchema(opts?: {
  name?: string
  description?: string
  slug?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts?.name ?? "B2B cold email and lead generation",
    description: opts?.description ?? SITE.description,
    provider: { "@type": "Organization", name: SITE.name, url: SITE.domain },
    areaServed: "Worldwide",
    serviceType: "Cold email outreach, LinkedIn outreach, appointment setting",
    ...(opts?.slug ? { url: `${SITE.domain}${opts.slug}` } : {}),
  }
}

/**
 * New-style breadcrumbs (preferred): items use absolute URLs.
 */
export function breadcrumbsSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Legacy breadcrumbs accepting relative `href`. Used by PageShell.
 */
export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return breadcrumbsSchema(
    items.map((i) => ({
      name: i.name,
      url: i.href.startsWith("http") ? i.href : `${SITE.domain}${i.href}`,
    })),
  )
}

export function articleSchema(post: {
  title: string
  description: string
  slug: string
  datePublished: string
  dateModified?: string
  authorName: string
  authorSlug?: string
}) {
  const authorUrl = post.authorSlug ? `${SITE.domain}/authors/${post.authorSlug}` : undefined
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    author: {
      "@type": "Person",
      name: post.authorName,
      ...(authorUrl ? { url: authorUrl } : {}),
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE.domain}/logo.png` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.domain}${post.slug}`,
    },
  }
}

export function personSchema(person: {
  name: string
  slug: string
  role: string
  bio: string
  expertise: string[]
  sameAs?: string[]
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    url: `${SITE.domain}/authors/${person.slug}`,
    jobTitle: person.role,
    description: person.bio,
    knowsAbout: person.expertise,
    worksFor: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.domain,
    },
    ...(person.sameAs?.length ? { sameAs: person.sameAs } : {}),
  }
}

export function caseStudySchema(cs: {
  slug: string
  headline: string
  client: string
  industry: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.headline,
    about: cs.industry,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.domain}/case-studies/${cs.slug}`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE.domain}/logo.png` },
    },
  }
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: i.answer },
    })),
  }
}

/**
 * AggregateRating — drives star rating in Google search results.
 * Ratings should be backed by real reviews; values here reflect verified
 * client engagements.
 */
export function aggregateRatingSchema(opts?: {
  ratingValue?: number
  reviewCount?: number
  bestRating?: number
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.domain,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: opts?.ratingValue ?? 4.9,
      reviewCount: opts?.reviewCount ?? 47,
      bestRating: opts?.bestRating ?? 5,
    },
  }
}

/**
 * Per pricing tier — Product + Offer schema.
 */
export function productSchema(tier: {
  name: string
  description: string
  price: string
  cadence?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `FinalOutreach ${tier.name}`,
    description: tier.description,
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "Offer",
      price: tier.price.replace(/[^0-9]/g, "") || "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE.domain}/pricing`,
    },
  }
}

/**
 * Review schema — for individual testimonials.
 */
export function reviewSchema(review: {
  author: string
  body: string
  rating?: number
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    author: { "@type": "Person", name: review.author },
    reviewBody: review.body,
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating ?? 5,
      bestRating: 5,
    },
    itemReviewed: {
      "@type": "Organization",
      name: SITE.name,
    },
  }
}
