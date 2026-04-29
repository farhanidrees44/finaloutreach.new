'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { ArrowRight, Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'

/**
 * Button system — 2026 hierarchy:
 *  - primary       : highest-priority CTA. Solid emerald, pill, hover lift.
 *  - primary-glow  : hero/main CTA. Adds animated glow ring + gradient sheen.
 *  - secondary     : medium priority. Outlined, hovers to cream + emerald border.
 *  - ghost         : low priority / tertiary. Transparent, hover to ink-04.
 *  - outline       : compatibility variant kept for sub-components.
 *  - destructive   : compatibility variant kept for sub-components.
 *  - link          : underline link variant.
 *  - default       : alias of `primary` (preserves existing call sites).
 *
 * Every variant is pill-shaped by default (rounded-full) with px-6 py-3.
 * Compact `sm` and `lg` sizes available; `icon` keeps a square footprint.
 *
 * Micro-interactions:
 *  - whileTap-equivalent CSS scale (active:scale-[0.97])
 *  - smooth color transitions (duration-200 ease-out)
 *  - focus-visible ring with offset
 *  - disabled: opacity-50 cursor-not-allowed
 *  - loading: spinner replaces icon, button keeps the same width
 */

const buttonVariants = cva(
  // base
  [
    "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-full text-sm font-medium tracking-tight isolate select-none",
    "transition-all duration-200 ease-out",
    "active:scale-[0.97]",
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
    "outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "aria-invalid:ring-destructive/30 aria-invalid:ring-2",
  ].join(' '),
  {
    variants: {
      variant: {
        primary: [
          'bg-emerald text-primary-foreground shadow-[0_4px_14px_-6px_rgba(11,79,58,0.45)]',
          'hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-10px_rgba(11,79,58,0.55)]',
          'hover:bg-gradient-to-b hover:from-emerald-light hover:to-emerald',
        ].join(' '),
        'primary-glow': [
          'cta-glow text-primary-foreground',
          'bg-gradient-to-br from-emerald-light via-emerald to-emerald-dark',
          'shine-overlay',
          'hover:-translate-y-0.5',
        ].join(' '),
        secondary: [
          'bg-transparent text-ink border border-ink-08',
          'hover:bg-cream hover:border-emerald/40',
        ].join(' '),
        ghost: [
          'bg-transparent text-ink-60',
          'hover:bg-ink-04 hover:text-ink',
        ].join(' '),
        outline: [
          'bg-background border border-ink-08 text-ink',
          'hover:bg-cream hover:border-emerald/40',
        ].join(' '),
        destructive: [
          'bg-destructive text-white',
          'hover:bg-destructive/90 focus-visible:ring-destructive/40',
        ].join(' '),
        link: [
          'text-emerald underline-offset-4 hover:underline rounded-none px-0 py-0 h-auto',
        ].join(' '),
        // Backwards-compatible alias (existing UI primitives import `default`)
        default: [
          'bg-emerald text-primary-foreground shadow-[0_4px_14px_-6px_rgba(11,79,58,0.45)]',
          'hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-10px_rgba(11,79,58,0.55)]',
          'hover:bg-gradient-to-b hover:from-emerald-light hover:to-emerald',
        ].join(' '),
      },
      size: {
        sm: 'h-9 px-4 text-[13px]',
        default: 'h-11 px-6 py-3 text-[14px]',
        lg: 'h-12 px-7 text-[15px]',
        icon: 'size-11 rounded-full',
        'icon-sm': 'size-9 rounded-full',
        'icon-lg': 'size-12 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    /** Show a spinner in place of children-icons. Width stays fixed. */
    loading?: boolean
    /** Append a right-arrow that translates on hover (skipped for ghost/link). */
    withArrow?: boolean
  }

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  withArrow = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  const showArrow =
    withArrow && variant !== 'link' && variant !== 'ghost' && !loading

  return (
    <Comp
      data-slot="button"
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {loading ? (
            <Loader2
              className="size-4 animate-spin"
              aria-hidden="true"
            />
          ) : null}
          <span
            className={cn(
              'inline-flex items-center gap-2',
              loading && 'opacity-0',
            )}
          >
            {children}
          </span>
          {showArrow && !loading ? (
            <ArrowRight
              className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
              aria-hidden="true"
            />
          ) : null}
        </>
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
