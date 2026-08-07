import { Section } from '../../ui/Section'
import { STATIONS } from '../../../lib/stations'

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
                href={s.mapUrl}
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
          Retail space at every station
          {/* &middot; Follow corridor expansion updates on{' '}
          <a href="https://linkedin.com/company/veganrgy" className="font-bold text-mint-deep">
            LinkedIn &rarr;
          </a> */}
        </p>
      </div>
    </Section>
  )
}
