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
        alt="FinalOutreach — Reach further. Convert smarter."
        width={294}
        height={92}
        className="h-14 w-auto sm:h-16 md:h-[4.25rem]"
        decoding="async"
      />
    </Link>
  )
}
