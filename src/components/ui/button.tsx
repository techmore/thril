import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/utils'

const sharedClassName =
  'inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)]'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'primary' | 'secondary'
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
  variant?: 'primary' | 'secondary'
}

export function Button({
  children,
  className,
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        sharedClassName,
        variant === 'primary'
          ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] shadow-[0_18px_40px_rgba(15,23,42,0.16)] hover:-translate-y-0.5 hover:bg-[var(--ink-soft)]'
          : 'border-[var(--line)] bg-white/70 text-[var(--ink)] hover:-translate-y-0.5 hover:bg-white',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function ButtonLink({
  children,
  className,
  variant = 'primary',
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={cn(
        sharedClassName,
        variant === 'primary'
          ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] shadow-[0_18px_40px_rgba(15,23,42,0.16)] hover:-translate-y-0.5 hover:bg-[var(--ink-soft)]'
          : 'border-[var(--line)] bg-white/70 text-[var(--ink)] hover:-translate-y-0.5 hover:bg-white',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  )
}
