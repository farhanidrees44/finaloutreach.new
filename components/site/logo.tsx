import Link from "next/link"
import { cn } from "@/lib/utils"

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
        src="/logo.svg"
        alt="FinalOutreach.com — Reach further. Convert smarter."
        width={472}
        height={160}
        className="h-10 w-auto sm:h-11 md:h-12"
        decoding="async"
      />
    </Link>
  )
}
