import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type ButtonVariant = 'ink' | 'mint' | 'outline' | 'ghost-onink' | 'link'

type ButtonProps = {
  href: string
  variant?: ButtonVariant
  size?: 'md' | 'sm'
  className?: string
  children: ReactNode
}

const base = 'inline-flex items-center justify-center gap-2 font-sans font-bold transition-all duration-200'

const sizes = {
  md: 'rounded-full px-7 py-3.5 text-sm',
  sm: 'rounded-full px-5 py-2.5 text-xs',
}

const variants: Record<ButtonVariant, string> = {
  ink: 'bg-ink text-white hover:bg-ink/90',
  mint: 'bg-mint text-ink hover:-translate-y-px hover:bg-mint-bright',
  outline: 'border border-border text-ink hover:bg-grey-soft',
  'ghost-onink': 'border border-white/35 text-white hover:border-white',
  link: 'font-semibold text-mint-deep hover:text-mint',
}

/** Internal routes (leading "/") render a router Link; everything else (mailto:, https:, #hash) stays a plain <a>. */
export function Button({ href, variant = 'ink', size = 'md', className = '', children }: ButtonProps) {
  const sizeClass = variant === 'link' ? '' : sizes[size]
  const classes = `${base} ${sizeClass} ${variants[variant]} ${className}`

  if (href.startsWith('/')) {
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} className={classes}>
      {children}
    </a>
  )
}
