import { Section } from '../../ui/Section'

export function BrandDistinction() {
  return (
    <Section id="brand" labelledBy="brand-heading" className="bg-paper">
      <div className="mx-auto max-w-7xl px-6 pt-28 lg:px-8">
        <h2 id="brand-heading" className="chapter-label border-t border-hairline pt-4.5">
          03 &mdash; TWO NAMES, ONE PROMISE
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-card border border-border p-9">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-xl font-bold tracking-[0.1em] text-ink">VEGA</span>
              <span className="font-mono text-xs font-medium tracking-[0.24em] text-muted">NRGY</span>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              The parent company &mdash; our infrastructure, investment, and B2B identity.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-card bg-ink p-9">
            <div
              className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-mint to-transparent"
              aria-hidden="true"
            />
            <div className="flex items-baseline gap-2">
              <span className="font-display text-xl font-bold tracking-[0.1em] text-white">VEGA</span>
              <span className="font-mono text-xs font-medium tracking-[0.24em] text-mint">CHARGE</span>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-onink">
              What you see on the highway &mdash; the stations, the experience, the brand
              drivers trust.
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
