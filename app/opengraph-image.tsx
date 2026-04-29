import { ImageResponse } from "next/og"
import { SITE } from "@/lib/site-data"

export const runtime = "edge"
export const alt = `${SITE.name} — ${SITE.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(ellipse at 20% 20%, #8b5cf6 0%, transparent 50%), radial-gradient(ellipse at 80% 30%, #3b82f6 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, #06b6d4 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, #f59e0b 0%, transparent 60%), #0f0f10",
          color: "#FAFAF7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 24px rgba(139,92,246,0.4)",
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                background: "#FAFAF7",
                borderRadius: 3,
              }}
            />
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "#FAFAF7",
            }}
          >
            {SITE.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 78,
              fontWeight: 600,
              letterSpacing: "-0.035em",
              lineHeight: 1.02,
              maxWidth: 1000,
              color: "#FAFAF7",
            }}
          >
            We book qualified sales meetings for B2B teams that actually want to
            grow.
          </div>
          <div
            style={{
              fontSize: 26,
              color: "rgba(250,250,247,0.65)",
              maxWidth: 900,
            }}
          >
            $47M+ pipeline · 12,400+ meetings · 200+ companies trust us.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "rgba(250,250,247,0.55)",
          }}
        >
          <div>finaloutreach.com</div>
          <div
            style={{
              background: "linear-gradient(120deg, #8b5cf6, #3b82f6)",
              color: "#FAFAF7",
              padding: "14px 28px",
              borderRadius: 999,
              fontSize: 22,
              fontWeight: 500,
              boxShadow: "0 12px 32px rgba(139,92,246,0.45)",
            }}
          >
            Book a strategy call →
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
