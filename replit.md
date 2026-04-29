# FinalOutreach — replit.md

## Overview

FinalOutreach is a B2B lead generation agency marketing website built with Next.js (App Router) to serve as the primary web presence for a cold email and outbound sales agency. It showcases services, case studies, pricing, blog content, and industry-specific landing pages. The site is highly optimized for SEO through programmatic page generation across various categories (industries, cities, competitor comparisons, tool alternatives) and utilizes ISR (Incremental Static Regeneration) for performance. Key features include an animated hero section, client logo marquee, ROI calculator, testimonials, FAQ, a suite of six free interactive tools, a contact form, and an admin panel for managing client logos. The site also incorporates advanced UI/UX elements like WebGL fragment shaders and Framer Motion animations. The business vision is to provide a comprehensive, high-performance, and SEO-driven platform to attract and convert B2B leads.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework:** Next.js with the App Router, prioritizing React Server Components (RSC). Interactive elements use client components explicitly.

**Styling:** Tailwind CSS v4, utilizing a custom design system defined in `app/globals.css` with OKLCH color space for a primary, secondary, and tertiary brand palette. Custom CSS variables are used for all design tokens.

**Fonts:** Geist Sans (body), Geist Mono (code/labels), Instrument Serif (editorial italics), and Bricolage Grotesque (display headlines), all loaded via `next/font/google`.

**Component Structure:** Components are organized into `components/site/` for page-level and reusable site components, `components/ui/` for shadcn/ui primitives, `components/seo/` for JSON-LD structured data, and `components/animations/` for scroll-reveal and stagger wrappers.

**Animation:** Framer Motion is used for scroll-triggered reveals, stagger effects, magnetic button interactions, and `AnimatePresence` transitions, with full respect for `useReducedMotion`. A custom `useInView` hook handles lightweight entrance animations.

**Key UI Patterns:**
- WebGL fragment shader hero gradient with CSS fallback for compatibility.
- Click-to-load hero video card (Vimeo or YouTube).
- Count-up number animations triggered by viewport entry.
- Magnetic buttons with spring physics.
- Pinned card-stack scroll for the "How we book meetings" process section on desktop, featuring dynamic backdrop gradients and progress indicators.

### Backend Architecture

**API Routes:** Located in `app/api/`, handling contact form submissions (`/api/contact`), client logo listings (`/api/logos/list`), and admin functions (`/api/admin/`). The domain health tool uses a Node runtime API route for DNS lookups.

**Data Layer:** Content for services, industries, case studies, blog posts, authors, competitors, and cities is statically defined in TypeScript files (`lib/site-data.ts`, `lib/industries-data.ts`, etc.) and imported at build time. There is no traditional database ORM for core content.

**ISR:** Incremental Static Regeneration is configured for the homepage (1-hour revalidation) and other pages are mostly statically generated.

**SEO Infrastructure:**
- Dynamic XML sitemap generation (`app/sitemap.ts`).
- Robots exclusion protocol (`app/robots.ts`).
- Edge-generated Open Graph and Twitter images using `@vercel/og`.
- PWA manifest (`app/manifest.ts`).
- `llms.txt` endpoint for LLM crawlers.
- Comprehensive JSON-LD schemas (`lib/seo/schemas.ts`) for rich search results.

### Data Storage

**Primary Storage:** No primary database. All core site content is code-defined in TypeScript files.

**Client Logos:** Stored using **Vercel Blob** (`@vercel/blob`).

**Optional Metadata:** **Supabase** can be optionally used for storing metadata (company name, URL, sort order) related to uploaded logos. The system is designed to function without Supabase.

### Authentication

**Admin Panel:** Access is secured via a simple password gate using an `ADMIN_PASSWORD` environment variable. No comprehensive user authentication or session management system is present.

### Analytics & Tracking

- **Google Analytics 4 (GA4):** Integrated via `next/script` with environment variable gating, providing tracking for CTA clicks, form submissions, and other user interactions.
- **Microsoft Clarity:** Integrated via a script tag with environment variable gating for session recording and heatmaps.
- **Vercel Analytics:** Built-in analytics solution from Vercel.

### Theme

A single, light theme based on the defined brand palette in OKLCH color space. Dark mode and a global command palette were intentionally removed to maintain a focused product experience.

## External Dependencies

### Core Framework
- **Next.js** (App Router, RSC, ISR, Edge runtime)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4** with `tw-animate-css`

### UI Components
- **shadcn/ui** (New York style, Radix UI base)
- **Radix UI** (headless primitives)
- **Framer Motion**
- **Lucide React** (icons)
- **Embla Carousel**
- **class-variance-authority, clsx, tailwind-merge** (class management)

### Storage & Media
- **@vercel/blob**
- **@vercel/og**

### Analytics
- **@vercel/analytics**
- **Google Analytics 4**
- **Microsoft Clarity**

### Email
- **Resend** (for contact form submissions)

### Optional Backend
- **Supabase** (optional for logo metadata)