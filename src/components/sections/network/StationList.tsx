import { Section } from '../../ui/Section'

type StationRow = {
  id: string
  name: string
  corridor: string
  chargers: string
  area: string
  traffic: string
  launch: string
  status: 'PLANNING' | 'ACQUISITION'
  map: string
}

const STATIONS: StationRow[] = [
  {
    id: 'VC 001',
    name: 'Vega Narketpally',
    corridor: 'NH-65 · Hyderabad–Vijayawada · Nalgonda, TS',
    chargers: '3 × 180 kW DC',
    area: '2,200 sq. yd · 103 ft frontage',
    traffic: '>40,000 vehicles/day',
    launch: 'Opening Sep 2026',
    status: 'PLANNING',
    map: 'https://maps.app.goo.gl/HDpiyMm8LLJXU7eZ6',
  },
  {
    id: 'VC 002',
    name: 'Vega Tekmatla — Khammam Bypass',
    corridor: 'Hyderabad–Visakhapatnam · via Khammam',
    chargers: '3 × 180 + 1 × 240 kW DC',
    area: '3,630 sq. yd · 170 ft frontage',
    traffic: '>20,000 vehicles/day',
    launch: 'Opening Oct 2026',
    status: 'PLANNING',
    map: 'https://maps.app.goo.gl/nasBZ3A7f9DvudjX8',
  },
  {
    id: 'VC 003',
    name: 'Vega Pillalamarri',
    corridor: 'NH-65 · Hyderabad–Vijayawada',
    chargers: '4 × 180 + 2 × 240 kW DC',
    area: '3,270 sq. yd · 172 ft frontage',
    traffic: '>25,000 vehicles/day',
    launch: 'Opening Sep 2026',
    status: 'PLANNING',
    map: 'https://maps.app.goo.gl/4BNxu8rbfWQ7u2nB6',
  },
  {
    id: 'VC 004',
    name: 'Vega Tallampadu',
    corridor: 'Hyderabad–Visakhapatnam · via Khammam',
    chargers: '3 × 180 + 1 × 240 kW DC',
    area: '7,260 sq. yd · 316 ft frontage',
    traffic: '>20,000 vehicles/day',
    launch: 'Opening Oct 2026',
    status: 'PLANNING',
    map: 'https://maps.app.goo.gl/SudRLnPPe1KgZBaZ9',
  },
  {
    id: 'VC 005',
    name: 'Vega Tekmatla',
    corridor: 'Visakhapatnam–Hyderabad · via Khammam',
    chargers: '3 × 180 + 1 × 240 kW DC',
    area: '4,840 sq. yd · 120+ ft frontage',
    traffic: '>20,000 vehicles/day',
    launch: 'Launch date TBA',
    status: 'ACQUISITION',
    map: 'https://maps.app.goo.gl/wB7xSW9zF5Rfi5kT8',
  },
]

export function StationList() {
  return (
    <Section id="expansion" labelledBy="expansion-heading" className="bg-paper">
      <div className="mx-auto max-w-7xl px-6 pt-28 lg:px-8">
        <p className="chapter-label border-t border-hairline pt-4.5">03 &mdash; WHAT&rsquo;S NEXT</p>
        <div className="mt-7 flex flex-wrap items-baseline justify-between gap-6">
          <h2 id="expansion-heading" className="font-display text-4xl font-semibold tracking-[-0.03em] text-ink">
            Five stations. Two corridors.
          </h2>
          <span className="font-mono text-[11px] tracking-[0.1em] text-muted">
            ALL LOCATIONS OPEN IN GOOGLE MAPS &rarr;
          </span>
        </div>
        <ul className="mt-9 border-t border-hairline">
          {STATIONS.map((s) => (
            <li key={s.id} className="border-b border-hairline">
              <a
                href={s.map}
                target="_blank"
                rel="noreferrer"
                className="grid items-center gap-5 py-6 transition-colors hover:bg-grey-soft sm:grid-cols-[56px_1.5fr_1fr_1fr_auto]"
              >
                <span className="font-mono text-[11px] tracking-[0.1em] text-mint-deep">{s.id}</span>
                <span>
                  <span className="block font-display text-[18px] font-semibold tracking-[-0.01em] text-ink">
                    {s.name} <span className="font-sans text-[13px] font-semibold text-mint-deep">&rarr;</span>
                  </span>
                  <span className="mt-0.5 block text-[12.5px] text-muted">{s.corridor}</span>
                </span>
                <span>
                  <span className="block text-[13px] font-semibold text-ink-soft">{s.chargers}</span>
                  <span className="mt-0.5 block text-[11.5px] text-muted-onink">{s.area}</span>
                </span>
                <span>
                  <span className="block text-[13px] font-semibold text-ink-soft">{s.traffic}</span>
                  <span className="mt-0.5 block text-[11.5px] text-muted-onink">{s.launch}</span>
                </span>
                <span className="flex items-center gap-1.5 whitespace-nowrap justify-self-start sm:justify-self-end">
                  <span className={`h-2 w-2 rounded-full ${s.status === 'PLANNING' ? 'bg-mint' : 'bg-muted-onink'}`} />
                  <span className="font-mono text-[11px] tracking-[0.08em] text-muted">{s.status}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="py-5.5 text-[13.5px] leading-relaxed text-muted">
          Retail space at every station &middot; Follow corridor expansion updates on{' '}
          <a href="https://linkedin.com/company/veganrgy" className="font-bold text-mint-deep">
            LinkedIn &rarr;
          </a>
        </p>
      </div>
    </Section>
  )
}
