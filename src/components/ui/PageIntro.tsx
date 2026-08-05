import type { ReactNode } from 'react'
import { Section } from './Section'

type PageIntroProps = {
  eyebrow: string
  heading: ReactNode
  children?: ReactNode
}

/** Shared page-head block: mono eyebrow + H1 + optional intro copy — used at the top of every non-Home page. */
export function PageIntro({ eyebrow, heading, children }: PageIntroProps) {
  return (
    <Section id="page-head" labelledBy="page-heading" className="bg-paper">
      <div className="mx-auto max-w-7xl px-6 pt-30 lg:px-8">
        <p className="font-mono text-[11px] font-normal tracking-[0.18em] text-mint-deep">{eyebrow}</p>
        <h1
          id="page-heading"
          className="mt-6 max-w-4xl text-balance font-display text-5xl font-semibold leading-[1.06] tracking-[-0.035em] text-ink sm:text-6xl"
        >
          {heading}
        </h1>
        {children}
      </div>
    </Section>
  )
}
