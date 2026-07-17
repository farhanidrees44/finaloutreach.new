import type { Config } from "tailwindcss"

/**
 * Tailwind v4 resolves the design tokens from `app/globals.css` `@theme inline`.
 * This file documents the site sans stack for tooling that still expects a config:
 *   sans → var(--font-jakarta) / Plus Jakarta Sans
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-jakarta)", "sans-serif"],
      },
    },
  },
  plugins: [],
}

export default config
