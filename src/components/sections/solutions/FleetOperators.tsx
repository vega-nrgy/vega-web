import { Section } from '../../ui/Section'

const CHECKLIST = [
  'Dedicated fleet charging bays with priority access',
  'High-speed DC charging for minimum turnaround time',
  'Fleet management dashboard with real-time tracking',
  'Flexible billing — per unit, monthly, or contract-based',
  'Volume-based rates and ToD-optimised pricing',
  'Multi-vehicle simultaneous charging capability',
]

const AUDIENCE = ['Logistics & Delivery', 'Cab & Ride-share', 'Corporate Transport', 'Government & Municipal']

const BAYS: [string, number][] = [
  ['Bay 1', 82],
  ['Bay 2', 64],
  ['Bay 3', 41],
]

function FleetDashboardMock() {
  return (
    <div className="relative h-full min-h-[420px] overflow-hidden rounded-media bg-ink p-7">
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-mint to-transparent" aria-hidden="true" />
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9.5px] tracking-[0.14em] text-mint">FLEET DASHBOARD</span>
        <span className="font-mono text-[9.5px] tracking-[0.1em] text-muted">LIVE</span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="font-mono text-[9px] tracking-[0.1em] text-muted-onink">SESSIONS TODAY</p>
          <p className="mt-1.5 font-sans text-[26px] font-extrabold tabular-nums text-white">47</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="font-mono text-[9px] tracking-[0.1em] text-muted-onink">ENERGY DELIVERED</p>
          <p className="mt-1.5 font-sans text-[26px] font-extrabold tabular-nums text-white">
            2,140 <span className="text-[13px] font-semibold text-muted-onink">kWh</span>
          </p>
        </div>
      </div>
      <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="font-mono text-[9px] tracking-[0.1em] text-muted-onink">BAY UTILISATION &middot; NARKETPALLE</p>
        <div className="mt-3 flex flex-col gap-2">
          {BAYS.map(([label, pct]) => (
            <div key={label} className="flex items-center gap-2.5">
              <span className="w-10 font-sans text-[10px] font-semibold text-onink">{label}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-mint" style={{ width: `${pct}%` }} />
              </div>
              <span className="font-mono text-[9.5px] text-muted-onink">{pct}%</span>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-[10.5px] leading-relaxed text-muted">
        Track charging sessions, costs, and energy consumption in real time &mdash; per
        vehicle, per route, per month.
      </p>
    </div>
  )
}

export function FleetOperators() {
  return (
    <Section id="fleet" labelledBy="fleet-heading" className="scroll-mt-24 bg-paper">
      <div className="mx-auto max-w-7xl px-6 pt-28 lg:px-8">
        <p className="chapter-label border-t border-hairline pt-4.5">03 &mdash; FLEET OPERATORS</p>
        <div className="mt-7 grid gap-16 lg:grid-cols-[1fr_1.15fr] lg:items-stretch">
          <FleetDashboardMock />
          <div>
            <h2 id="fleet-heading" className="font-display text-[38px] font-semibold leading-[1.12] tracking-[-0.03em] text-ink">
              Keep your fleet moving. Always.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              For logistics companies, cab aggregators, and commercial fleet operators,
              downtime is cost. Our fleet solutions are built for high-utilisation,
              round-the-clock operations.
            </p>
            <ul className="mt-6 border-t border-hairline">
              {CHECKLIST.map((item) => (
                <li key={item} className="flex gap-3 border-b border-hairline py-3 text-[13.5px] font-medium leading-relaxed text-ink-soft">
                  <span className="font-extrabold text-mint-deep">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
            <ul className="mt-5 flex flex-wrap gap-2">
              {AUDIENCE.map((label) => (
                <li key={label} className="rounded-full bg-grey-soft px-3.5 py-2 text-[11.5px] font-semibold text-ink-soft">
                  {label}
                </li>
              ))}
            </ul>
            <div className="mt-6.5 rounded-card bg-grey-soft px-6.5 py-6">
              <p className="font-display text-base font-semibold text-ink">Let&rsquo;s build your charging plan.</p>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                Route coverage, volume pricing, and dedicated bay agreements on the NH-65
                corridor.
              </p>
              <a
                href="#enquiry"
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-mint px-5.5 py-3 font-sans text-[13.5px] font-bold text-ink transition-colors hover:bg-mint-bright"
              >
                Request a Fleet Proposal &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
