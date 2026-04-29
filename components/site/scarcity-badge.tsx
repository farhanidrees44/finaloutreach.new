import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export function ScarcityBadge({
  children = "Now booking — limited spots this quarter",
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[13px] font-medium",
        "border border-vibrant-purple/20 bg-gradient-to-r from-vibrant-purple/[0.06] via-electric-blue/[0.06] to-bright-cyan/[0.06]",
        "backdrop-blur-md shadow-premium-sm",
        "transition-all duration-300 hover:border-vibrant-purple/40 hover:shadow-premium-md",
        className,
      )}
    >
      <Sparkles
        aria-hidden="true"
        className="size-3.5 text-vibrant-purple"
        strokeWidth={2.2}
      />
      <span className="tracking-tight text-ink">{children}</span>
      <span
        aria-hidden="true"
        className="pulse-dot ml-0.5 size-1.5 rounded-full bg-[oklch(0.7_0.18_145)]"
      />
    </div>
  )
}
