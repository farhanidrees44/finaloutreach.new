/**
 * Initials-based avatar.
 *
 * We do NOT inline a placeholder image. Instead we render a deterministic
 * monogram using the person's name. This avoids cumulative layout shift, has
 * zero network cost, and works in dark/light themes.
 *
 * The background is derived from a hash of the name so each person gets a
 * stable, unique tint inside the brand palette.
 */

const TINTS = [
  "from-primary/15 to-primary/30 text-primary",
  "from-foreground/10 to-foreground/20 text-foreground",
  "from-emerald-500/15 to-emerald-500/30 text-emerald-700 dark:text-emerald-300",
  "from-amber-500/15 to-amber-500/30 text-amber-700 dark:text-amber-300",
  "from-rose-500/15 to-rose-500/30 text-rose-700 dark:text-rose-300",
  "from-sky-500/15 to-sky-500/30 text-sky-700 dark:text-sky-300",
]

function hash(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "?"
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function Avatar({
  name,
  size = 40,
  className = "",
}: {
  name: string
  size?: number
  className?: string
}) {
  const tint = TINTS[hash(name) % TINTS.length]
  const initials = initialsOf(name)
  const fontSize = Math.round(size * 0.4)
  return (
    <span
      role="img"
      aria-label={`${name} avatar`}
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-semibold ring-1 ring-border ${tint} ${className}`}
      style={{ width: size, height: size, fontSize }}
    >
      {initials}
    </span>
  )
}
