import { PageIntro } from '../components/ui/PageIntro'
import { HighwayCharging } from '../components/sections/solutions/HighwayCharging'
import { CommercialCharging } from '../components/sections/solutions/CommercialCharging'
import { FleetOperators } from '../components/sections/solutions/FleetOperators'
import { EnquiryForm } from '../components/sections/solutions/EnquiryForm'

const QUICK_NAV = [
  { href: '#highway', index: '01', label: 'Highway Charging' },
  { href: '#commercial', index: '02', label: 'Commercial Charging' },
  { href: '#fleet', index: '03', label: 'Fleet Operators' },
]

export function SolutionsPage() {
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
      <EnquiryForm />
    </>
  )
}
