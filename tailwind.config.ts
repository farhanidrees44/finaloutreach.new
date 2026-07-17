/**
 * Tailwind v4 resolves design tokens from `app/globals.css` `@theme inline`.
 * Sans stack mirrors Cleverly-style geometric clarity (Outfit ≈ Geomanist).
 */
import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-outfit)", "sans-serif"],
      },
    },
  },
  plugins: [],
}

export default config
