/**
 * "Trusted by teams at" — premium client-logo marquee.
 *
 * Renders authentic, recognisable B2B SaaS brand logos as inline SVGs
 * (Slack, Notion, Stripe, Linear, Figma, HubSpot, Atlassian, Shopify,
 * Intercom, Asana, Zoom, Atlassian) and scrolls them right → left in
 * a seamless infinite loop.
 *
 * UX conventions follow what Stripe, Linear and Vercel use on their
 * trust strips:
 *   - Logos render monochrome (ink-60) at rest with a subtle opacity,
 *   - Lift to full brand colour on hover with a soft scale,
 *   - The whole track pauses on hover so users can read individual marks,
 *   - Edge fades feather the marquee in/out of the viewport.
 *
 * The track is duplicated (and the duplicate marked aria-hidden) so
 * the CSS `translateX(-50%)` keyframe creates a perfectly seamless loop.
 */

import * as React from "react"
import {
  AsanaLogo,
  AtlassianLogo,
  FigmaLogo,
  HubSpotLogo,
  IntercomLogo,
  LinearLogo,
  NotionLogo,
  ShopifyLogo,
  SlackLogo,
  StripeLogo,
  ZoomLogo,
} from "./brand-logos"

type BrandLogo = {
  name: string
  // The brand-logos.tsx exports accept `title?` (for accessible <title>)
  // in addition to the standard SVG props.
  Component: React.ComponentType<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >
  /** Tailwind height — tuned per logo so optical sizing matches across the row. */
  heightClass: string
}

/**
 * Curated list of ultra-premium, instantly-recognisable B2B SaaS brands.
 * Order is intentional — denser/colourful marks are interleaved with
 * cleaner wordmarks so no two visually-similar logos sit next to each other.
 */
// Per-logo heights tuned so each mark has roughly the same optical weight
// across the row. Wordmark-only logos (Stripe, Linear, Atlassian) get a touch
// extra height; logos with a separate icon + text get slightly less since
// the icon already adds visual mass.
const BRANDS: readonly BrandLogo[] = [
  { name: "Stripe", Component: StripeLogo, heightClass: "h-9 sm:h-10 md:h-11" },
  { name: "Slack", Component: SlackLogo, heightClass: "h-8 sm:h-9 md:h-10" },
  { name: "Notion", Component: NotionLogo, heightClass: "h-8 sm:h-9 md:h-10" },
  { name: "Linear", Component: LinearLogo, heightClass: "h-9 sm:h-10 md:h-11" },
  { name: "Figma", Component: FigmaLogo, heightClass: "h-8 sm:h-9 md:h-10" },
  { name: "HubSpot", Component: HubSpotLogo, heightClass: "h-8 sm:h-9 md:h-10" },
  { name: "Shopify", Component: ShopifyLogo, heightClass: "h-8 sm:h-9 md:h-10" },
  { name: "Atlassian", Component: AtlassianLogo, heightClass: "h-9 sm:h-10 md:h-11" },
  { name: "Intercom", Component: IntercomLogo, heightClass: "h-8 sm:h-9 md:h-10" },
  { name: "Asana", Component: AsanaLogo, heightClass: "h-8 sm:h-9 md:h-10" },
  { name: "Zoom", Component: ZoomLogo, heightClass: "h-8 sm:h-9 md:h-10" },
] as const

export function ClientLogosMarquee() {
  // Two copies of the same list — the second is aria-hidden so screen
  // readers don't read every brand twice. The CSS keyframe translates
  // the whole track by -50%, which lines the duplicate up exactly where
  // the original started → seamless loop.
  const trackItems = [...BRANDS, ...BRANDS]

  return (
    <section
      aria-label="Trusted by teams at leading companies"
      className="relative overflow-x-clip overflow-y-visible border-y border-ink-08 py-12 sm:py-14 md:py-16"
    >
      {/* Soft neutral wash — the chips themselves carry the visual weight,
          so the background stays subtle and lets each logo "float". */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-cream/40 to-background"
      />

      {/*
        Single centered column. Heading + marquee form one tightly-grouped
        unit — the gap between them is intentionally small so the eye reads
        "Trusted by → these brands" as one visual phrase.
      */}
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 md:px-10 lg:px-12">
        <p className="mb-7 text-center text-[11.5px] font-medium uppercase leading-none tracking-[0.2em] text-ink-60 sm:mb-9">
          <span className="gradient-text font-semibold">Trusted by</span>
          <span className="mx-1.5 text-ink-30" aria-hidden="true">·</span>
          <span className="text-ink-40">teams at</span>
        </p>

        {/*
          `overflow-x-clip` clips the carousel horizontally (so off-screen
          chips don't add scroll) WITHOUT clipping vertically — chip drop
          shadows can breathe up/down for the 3D-real effect. The mask-x-160
          handles the horizontal soft fade visually; overflow-x-clip is
          the perf safety net.
          Inner `py-3` reserves vertical room for the shadow stack so
          nothing in the surrounding section visually crops it.
        */}
        <div className="marquee-track marquee-track--logos relative w-full overflow-x-clip overflow-y-visible mask-fade-x-160">
          {/*
            The track's `w-max` width + the keyframe's -50% translate
            require both copies to render — never collapse this to one
            list, or the loop will visibly snap back. The animation is
            defined in globals.css and runs right → left on a slow,
            steady linear timing for a premium "always on" feel.
          */}
          {/* Slightly wider gap between chips so each one reads as a
              distinct "slide" gliding past, not a continuous strip. */}
          <div className="marquee flex w-max items-center gap-5 py-3 sm:gap-6 md:gap-7">
            {trackItems.map((brand, idx) => (
              <BrandMark
                key={`${brand.name}-${idx}`}
                brand={brand}
                ariaHide={idx >= BRANDS.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * BrandMark — each logo is rendered inside a translucent glass card
 * "chip" with a layered shadow stack that gives the trust strip its
 * premium 3D feel:
 *
 *   - inset top-highlight (1px white) simulates a curved upper edge,
 *   - a tight 1-2px ambient shadow grounds the chip on the surface,
 *   - a longer 14-32px diffused shadow projects beneath for depth.
 *
 * On hover, the chip lifts (-1px) and the shadow expands, mimicking
 * how a physical card would respond to a finger / cursor approach.
 * The logo itself is rendered in full brand colour (no grayscale
 * filter) so the marks read as authentic high-fidelity assets.
 */
function BrandMark({
  brand,
  ariaHide,
}: {
  brand: BrandLogo
  ariaHide: boolean
}) {
  const { Component, name, heightClass } = brand

  return (
    <div
      className={[
        "group relative flex shrink-0 items-center justify-center",
        // FIXED uniform chip dimensions — every chip is the same "button"
        // shape regardless of the brand mark inside. This was the user's
        // explicit ask: chips should look real and consistent, not auto-
        // sized by each logo's intrinsic SVG width. The logo is centered
        // inside whatever empty space remains.
        "h-[60px] w-[170px] sm:h-[68px] sm:w-[200px] md:h-[72px] md:w-[230px]",
        "rounded-2xl",
        // Solid white chip — drops the backdrop-blur cost (22 chips × blur
        // is heavy and the chip is opaque enough you can't see through it).
        "bg-white",
        "ring-1 ring-ink-08",
        // Layered shadow stack → "3D real" depth.
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_1px_2px_rgba(15,23,42,0.04),0_4px_14px_-4px_rgba(15,23,42,0.06),0_16px_32px_-16px_rgba(15,23,42,0.10)]",
        "transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-1 hover:ring-ink-15",
        "hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),0_2px_4px_rgba(15,23,42,0.06),0_12px_24px_-8px_rgba(15,23,42,0.10),0_28px_56px_-24px_rgba(15,23,42,0.18)]",
      ].join(" ")}
      aria-hidden={ariaHide ? "true" : undefined}
    >
      <Component
        title={ariaHide ? undefined : name}
        aria-hidden={ariaHide ? "true" : undefined}
        className={[
          heightClass,
          "w-auto select-none",
          // Subtle drop-shadow on the SVG itself emphasises the "lifted
          // mark on a card" effect (the chip already has its own shadow,
          // so we keep this very light to avoid haloing).
          "[filter:drop-shadow(0_1px_1px_rgba(15,23,42,0.04))]",
          "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "group-hover:scale-[1.04]",
        ].join(" ")}
      />
    </div>
  )
}
