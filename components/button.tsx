"use client"

/**
 * MODERN BUTTON SYSTEM — FinalOutreach
 *
 * 4 variants with proper visual hierarchy:
 * - primary       → Main CTAs (emerald solid)
 * - primaryGlow   → Hero/conversion CTAs (with pulsing glow)
 * - secondary     → Alternative actions (transparent + border)
 * - ghost         → Tertiary text-style buttons
 *
 * 3 sizes: sm, md (default), lg
 *
 * Features:
 * - Framer Motion micro-interactions (scale on tap)
 * - Loading state with spinner
 * - Disabled state
 * - Optional icon support (left or right)
 * - Full TypeScript typing
 * - Forwards ref for form integration
 *
 * Drop-in replacement for components/site/cta-button.tsx
 *
 * Usage:
 *   <Button variant="primaryGlow" size="lg" icon={<ArrowRight />}>
 *     Book a strategy call
 *   </Button>
 */

import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base styles applied to all buttons
  "relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: [
          "bg-emerald-900 text-white shadow-[0_4px_14px_-4px_rgba(11,79,58,0.4)]",
          "hover:bg-emerald-800 hover:shadow-[0_8px_24px_-6px_rgba(11,79,58,0.5)] hover:-translate-y-0.5",
        ].join(" "),

        primaryGlow: [
          "bg-emerald-900 text-white shadow-[0_4px_14px_-4px_rgba(11,79,58,0.5)]",
          "hover:bg-emerald-800 hover:-translate-y-0.5",
          "before:absolute before:-inset-1 before:-z-10 before:rounded-full",
          "before:bg-gradient-to-r before:from-emerald-700 before:to-emerald-900",
          "before:opacity-50 before:blur-md before:animate-pulse-glow",
          "hover:before:opacity-80",
        ].join(" "),

        secondary: [
          "bg-white border border-zinc-200 text-zinc-900",
          "hover:border-emerald-900 hover:bg-zinc-50",
        ].join(" "),

        ghost: [
          "bg-transparent text-zinc-600",
          "hover:bg-zinc-100 hover:text-zinc-900",
        ].join(" "),

        amber: [
          "bg-amber-500 text-zinc-900 shadow-[0_4px_14px_-4px_rgba(212,175,55,0.5)]",
          "hover:bg-amber-400 hover:shadow-[0_8px_24px_-6px_rgba(212,175,55,0.6)] hover:-translate-y-0.5",
        ].join(" "),
      },
      size: {
        sm: "px-4 py-1.5 text-[13px]",
        md: "px-5 py-2.5 text-[14px]",
        lg: "px-6 py-3 text-[15px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    VariantProps<typeof buttonVariants> {
  children: ReactNode
  icon?: ReactNode
  iconPosition?: "left" | "right"
  isLoading?: boolean
  loadingText?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      icon,
      iconPosition = "right",
      isLoading = false,
      loadingText,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading

    return (
      <motion.button
        ref={ref}
        whileTap={isDisabled ? {} : { scale: 0.97 }}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={isDisabled}
        {...(props as any)}
      >
        {isLoading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            {loadingText || "Loading..."}
          </>
        ) : (
          <>
            {icon && iconPosition === "left" && (
              <span className="inline-flex shrink-0 transition-transform group-hover:-translate-x-0.5">
                {icon}
              </span>
            )}
            <span>{children}</span>
            {icon && iconPosition === "right" && (
              <span
                className={cn(
                  "inline-flex shrink-0 transition-transform",
                  variant === "primary" || variant === "primaryGlow"
                    ? "grid size-7 place-items-center rounded-full bg-white/15 group-hover:translate-x-0.5"
                    : "group-hover:translate-x-0.5"
                )}
              >
                {icon}
              </span>
            )}
          </>
        )}
      </motion.button>
    )
  }
)
Button.displayName = "Button"

/**
 * Add this to your globals.css for the pulsing glow animation:
 *
 * @keyframes pulse-glow {
 *   0%, 100% {
 *     opacity: 0.5;
 *     transform: scale(1);
 *   }
 *   50% {
 *     opacity: 0.8;
 *     transform: scale(1.05);
 *   }
 * }
 *
 * .animate-pulse-glow {
 *   animation: pulse-glow 3s ease-in-out infinite;
 * }
 */
