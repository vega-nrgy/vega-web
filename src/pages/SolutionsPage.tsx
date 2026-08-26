import { PageIntro } from '../components/ui/PageIntro'
import { Section } from '../components/ui/Section'
import { Button } from '../components/ui/Button'
import { HighwayCharging } from '../components/sections/solutions/HighwayCharging'
import { CommercialCharging } from '../components/sections/solutions/CommercialCharging'
import { FleetOperators } from '../components/sections/solutions/FleetOperators'
import { usePageMeta } from '../hooks/usePageMeta'

const QUICK_NAV = [
  { href: '#highway', index: '01', label: 'Highway Charging' },
  { href: '#commercial', index: '02', label: 'Commercial Charging' },
  { href: '#fleet', index: '03', label: 'Fleet Operators' },
]

export function SolutionsPage() {
  usePageMeta({
    title: 'Solutions — Highway, Commercial & Fleet EV Charging | Vega Charge',
    description:
      'Highway charging, commercial partnerships, and fleet solutions from Vega Charge — 180–240 kW DC fast chargers built for Indian highways and businesses.',
    path: '/solutions',
  })

  return (
    <>
      <PageIntro eyebrow="SOLUTIONS" heading="Powering every journey, for every need.">
        <div className="mt-9 flex flex-wrap gap-3">
          {QUICK_NAV.map(({ href, index, label }) => (
            <a
              key={href}
              href={href}
              className="rounded-full border border-border px-5 py-2.5 font-sans text-[13px] font-bold text-ink transition-colors hover:border-ink"
            >
              <span className="mr-2 font-mono text-[10px] tracking-[0.1em] text-mint-deep">{index}</span>
              {label}
            </a>
          ))}
        </div>
      </PageIntro>

      <HighwayCharging />
      <CommercialCharging />
      <FleetOperators />

      <Section id="enquiry" labelledBy="enquiry-heading" className="scroll-mt-24 bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
          <p className="chapter-label border-t border-hairline pt-4.5">04 &mdash; ENQUIRY</p>
          <div className="mt-7 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 id="enquiry-heading" className="font-display text-[38px] font-semibold leading-[1.12] tracking-[-0.03em] text-ink">
                Explore a partnership.
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
                Have a question or want to explore a partnership? Head over to our partner page —
                tell us a bit about your fleet, site, or investment interest, and our team will
                follow up directly.
              </p>
            </div>
            <Button href="/partner" variant="mint">
              Start a partnership &rarr;
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
