import Link from "next/link"
import { cn } from "@/lib/utils"

/**
 * Header logo — explicit pixel heights so flex layout cannot shrink it.
 * Aspect ratio preserved via w-auto + object-contain.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex shrink-0 items-center transition-opacity duration-300 hover:opacity-90",
        className,
      )}
      aria-label="FinalOutreach home"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="FinalOutreach — Reach further. Convert smarter."
        width={631}
        height={200}
        className="h-[48px] w-auto max-w-none shrink-0 object-contain object-left sm:h-[52px] lg:h-[60px]"
        decoding="async"
      />
    </Link>
  )
}
