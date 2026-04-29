/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Allow the Replit preview iframe (and any *.replit.dev host) to reach the dev
  // server's HMR/devtools endpoints in development. No effect in production.
  allowedDevOrigins: [
    "*.replit.dev",
    "*.repl.co",
    "*.pike.replit.dev",
    "*.kirk.replit.dev",
    "*.spock.replit.dev",
    "*.sisko.replit.dev",
    "*.janeway.replit.dev",
    "*.picard.replit.dev",
    "*.riker.replit.dev",
  ],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  experimental: {
    // Note: lucide-react was removed from optimizePackageImports because the
    // Turbopack optimizer in Next.js 16 incorrectly cached old icon names
    // (e.g. `Search`) after we removed them from imports, causing
    // ReferenceError at runtime. Re-enable only if a fix lands upstream.
    optimizePackageImports: ["framer-motion"],
  },
  async headers() {
    const isDev = process.env.NODE_ENV !== "production"
    const baseHeaders = [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
        ],
      },
    ]

    if (isDev) {
      // In development, force browsers NOT to cache anything so HMR/Fast
      // Refresh always serves the latest compiled chunks. Without this, the
      // preview iframe may keep running a stale module and surface phantom
      // ReferenceErrors after we remove imports.
      return [
        ...baseHeaders,
        {
          source: "/(.*)",
          headers: [
            {
              key: "Cache-Control",
              value: "no-store, no-cache, must-revalidate, max-age=0",
            },
          ],
        },
      ]
    }

    return [
      ...baseHeaders,
      {
        // Long-cache immutable static assets emitted by Next.js (production only)
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ]
  },
}

export default nextConfig
