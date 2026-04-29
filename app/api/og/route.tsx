import { ImageResponse } from "next/og"
import { SITE } from "@/lib/site-data"

export const runtime = "edge"
export const contentType = "image/png"
export const size = { width: 1200, height: 630 }

/**
 * Dynamic Open Graph image generator.
 *
 * Usage: /api/og?title=...&kicker=...&stat=...
 *
 * Renders a brand-consistent 1200x630 image at the edge using `next/og`,
 * so every post / industry / author page gets a unique social preview
 * without us having to hand-design 50 images.
 */
export async function GET(req: Request) {
  const url = new URL(req.url)
  const title = (url.searchParams.get("title") ?? SITE.name).slice(0, 140)
  const kicker = (url.searchParams.get("kicker") ?? SITE.tagline).slice(0, 60)
  const stat = (url.searchParams.get("stat") ?? "$47M+ pipeline · 12,400+ meetings").slice(0, 80)

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "70px 80px",
        background:
          "linear-gradient(135deg, #FAFAF7 0%, #F4F1EA 100%)",
        color: "#0F0F0F",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 22,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "rgba(15,15,15,0.55)",
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: 9999,
            background: "#1B45D7",
          }}
        />
        <div>{SITE.name.toLowerCase()}</div>
        <div style={{ flex: 1 }} />
        <div>{kicker}</div>
      </div>

      {/* Title */}
      <div
        style={{
          display: "flex",
          fontSize: title.length > 80 ? 60 : 76,
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          fontWeight: 600,
          maxWidth: 1040,
        }}
      >
        {title}
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 22,
          color: "rgba(15,15,15,0.6)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              padding: "10px 18px",
              borderRadius: 9999,
              background: "#1B45D7",
              color: "#FAFAF7",
              fontSize: 20,
              fontWeight: 500,
              display: "flex",
            }}
          >
            {stat}
          </div>
        </div>
        <div style={{ display: "flex" }}>finaloutreach.com</div>
      </div>
    </div>,
    { ...size },
  )
}
