import Link from "next/link"
import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 text-ink transition-all duration-300",
        className,
      )}
      aria-label="FinalOutreach home"
    >
      {/* Modern animated logo mark */}
      <div aria-hidden="true" className="relative h-8 w-8">
        {/* Outer gradient ring */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-electric-blue to-vibrant-purple p-0.5 group-hover:shadow-lg group-hover:shadow-electric-blue/40 transition-all duration-500">
          {/* Inner dark background */}
          <div className="h-full w-full rounded-[6px] bg-gradient-to-br from-ink to-ink/95 flex items-center justify-center">
            {/* Animated center dot */}
            <span className="block h-2.5 w-2.5 rounded-full bg-gradient-to-r from-gold to-amber group-hover:scale-110 transition-transform duration-500 shimmer" />
          </div>
        </div>
      </div>
      
      <span className="font-medium tracking-display text-[15px] group-hover:text-electric-blue transition-colors duration-300">
        FinalOutreach
      </span>
    </Link>
  )
}
