import { Section } from '../../ui/Section'
import { getStationBySlug } from '../../../lib/stations'

const NARKETPALLY = getStationBySlug('narketpally')!

const SPECS: [string, string | { label: string; href: string }][] = [
  ['Location', { label: 'NH-65, Narketpally, Nalgonda ↗', href: NARKETPALLY.mapUrl }],
  ['Station ID', NARKETPALLY.id],
  ['Site area', '2,200 sq. yards · 103 ft frontage'],
  ['Chargers', '3 × 120 kW DC Fast'],
  ['Corridor traffic', '>40,000 vehicles / day'],
  ['Standards', NARKETPALLY.standards.join(' · ')],
]

export function FlagshipStation() {
  return (
    <Section id="flagship" labelledBy="flagship-heading" className="mt-28 bg-grey-soft">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <p className="chapter-label">02 &mdash; FLAGSHIP STATION</p>
        <div className="mt-7 flex flex-wrap items-baseline justify-between gap-6">
          <h2 id="flagship-heading" className="font-display text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl">
            Narketpalle, NH-65
          </h2>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 animate-live-pulse rounded-full bg-mint" />
            <span className="text-[13px] font-bold text-mint-deep">Live soon</span>
          </span>
        </div>

        <div className="relative mt-9 overflow-hidden rounded-media">
          <img
            src="/design/station-render.jpg"
            alt="Narketpalle flagship station render"
            className="h-[460px] w-full object-cover"
          />
          <span className="absolute bottom-4 left-5 rounded-md bg-ink/55 px-2.5 py-1.5 font-mono text-[9.5px] tracking-[0.1em] text-white">
            STATION 01 &middot; NARKETPALLE &middot; NH-65 &middot; RENDER
          </span>
        </div>

        <div className="mt-11 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <p className="max-w-xl text-base leading-[1.7] text-ink-soft">
            Narketpalle sits on one of Telangana&rsquo;s busiest freight and passenger
            corridors &mdash; midway between Hyderabad and the AP border. It&rsquo;s the
            perfect first stop for India&rsquo;s growing EV highway network.
          </p>
          <dl className="rounded-card bg-white px-7 py-6.5">
            {SPECS.map(([label, value]) => (
              <div key={label} className="flex justify-between border-b border-hairline py-2.5 last:border-0">
                <dt className="text-[12.5px] text-muted">{label}</dt>
                {typeof value === 'string' ? (
                  <dd className="text-[12.5px] font-semibold text-ink">{value}</dd>
                ) : (
                  <dd>
                    <a href={value.href} target="_blank" rel="noreferrer" className="text-[12.5px] font-semibold text-mint-deep">
                      {value.label}
                    </a>
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  )
}
