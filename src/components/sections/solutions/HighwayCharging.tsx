import { Button } from '../../ui/Button'
import { Section } from '../../ui/Section'

const CHECKLIST = [
  '180–240 kW DC fast chargers — charge in minutes, not hours',
  'Multi-standard: CCS2, CHAdeMO, Bharat DC-001, AC Type 2',
  "Pitstop amenities — lounge, washrooms, children's play area",
  'Retail & refreshments at select stations',
  '24/7 operations with technology-enabled support',
  'Real-time station availability via app / website',
]

export function HighwayCharging() {
  return (
    <Section id="highway" labelledBy="highway-heading" className="scroll-mt-24 bg-paper">
      <div className="mx-auto max-w-7xl px-6 pt-28 lg:px-8">
        <p className="chapter-label border-t border-hairline pt-4.5">01 &mdash; HIGHWAY CHARGING</p>
        <div className="mt-7 grid gap-16 lg:grid-cols-[1fr_1.15fr] lg:items-stretch">
          <div className="relative overflow-hidden rounded-media">
            <img
              src="/design/station-render.jpg"
              alt="Highway charging station on NH-65"
              className="h-full min-h-[420px] w-full object-cover"
            />
            <span className="absolute bottom-3.5 left-4 rounded-md bg-ink/55 px-2.5 py-1.5 font-mono text-[9px] tracking-[0.1em] text-white">
              NH-65 &middot; NARKETPALLE
            </span>
          </div>
          <div>
            <h2 id="highway-heading" className="text-balance font-display text-[38px] font-semibold leading-[1.12] tracking-[-0.03em] text-ink">
              Drive without doubt. Every highway. Every time.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              Our flagship offering &mdash; fast charging stations strategically located
              along India&rsquo;s national highway corridors, designed to eliminate range
              anxiety and make long-distance EV travel truly seamless.
            </p>
            <ul className="mt-6 border-t border-hairline">
              {CHECKLIST.map((item) => (
                <li key={item} className="flex gap-3 border-b border-hairline py-3 text-[13.5px] font-medium leading-relaxed text-ink-soft">
                  <span className="font-extrabold text-mint-deep">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4.5 text-[12.5px] leading-relaxed text-muted">
              <strong className="text-ink">Where we are:</strong> NH-65 (Vijayawada&ndash;Hyderabad
              corridor), with rapid expansion underway across India&rsquo;s national highway
              network.
            </p>
            <Button href="/network" variant="ink" className="mt-6">
              Find a Charging Station &rarr;
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}
