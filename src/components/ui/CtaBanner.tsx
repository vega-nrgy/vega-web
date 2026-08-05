import type { ReactNode } from 'react'
import { Button } from './Button'

type CtaButton = {
  href: string
  label: ReactNode
  variant?: 'mint' | 'ghost-onink'
}

type CtaBannerProps = {
  headingId: string
  heading: ReactNode
  body?: ReactNode
  buttons: CtaButton[]
}

/** Ink rounded banner with the top mint gradient line — the recurring end-of-page CTA. */
export function CtaBanner({ headingId, heading, body, buttons }: CtaBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-media bg-ink px-10 py-16 sm:px-16">
      <div
        className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-mint to-transparent"
        aria-hidden="true"
      />
      <div className="flex flex-wrap items-center justify-between gap-12">
        <div>
          <h2 id={headingId} className="max-w-[520px] font-display text-4xl font-semibold leading-[1.15] tracking-[-0.03em] text-white">
            {heading}
          </h2>
          {body && <p className="mt-3.5 max-w-[460px] text-[15px] leading-relaxed text-muted-onink">{body}</p>}
        </div>
        <div className="flex flex-wrap gap-3.5">
          {buttons.map(({ href, label, variant = 'mint' }) => (
            <Button key={href + String(label)} href={href} variant={variant}>
              {label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
