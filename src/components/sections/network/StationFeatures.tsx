import type { ReactNode } from 'react'
import { Section } from '../../ui/Section'

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#001819" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
      <path d="M13 2 5 13h6l-1 9 8-11h-6z" />
    </svg>
  )
}

function LoungeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#001819" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
      <path d="M3 18v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4M3 18h18M6 12V8a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v4" />
    </svg>
  )
}

function WashroomIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#001819" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
      <path d="M12 3c3 4 5 6.5 5 9.5a5 5 0 0 1-10 0C7 9.5 9 7 12 3z" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#001819" strokeWidth="1.5" strokeLinecap="round" className="h-6 w-6" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.5" />
    </svg>
  )
}

function RetailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#001819" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
      <path d="M4 8h13a3 3 0 0 1 0 6H4zM4 8v10M8 4v4M13 4v4" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#001819" strokeWidth="1.5" strokeLinecap="round" className="h-6 w-6" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  )
}

const FEATURES: { icon: ReactNode; title: string; body: string }[] = [
  {
    icon: <BoltIcon />,
    title: 'Fast DC charging',
    body: '120–240 kW DC fast chargers · CCS2, CHAdeMO, Bharat DC-001 · 100–150 km of range in 30 minutes.',
  },
  {
    icon: <LoungeIcon />,
    title: 'Waiting lounge',
    body: 'Climate-controlled, with seating and wi-fi — designed for a comfortable 20–30 minute break.',
  },
  {
    icon: <WashroomIcon />,
    title: 'Clean washrooms',
    body: 'Maintained 24×7 and separately managed — driver and family-friendly.',
  },
  {
    icon: <PlayIcon />,
    title: "Children's play area",
    body: 'Safe and enclosed — so the whole family travels without stress.',
  },
  {
    icon: <RetailIcon />,
    title: 'Commercial zone',
    body: 'Café, snacks, or partner retail — amenities that make the stop worthwhile.',
  },
  {
    icon: <ClockIcon />,
    title: '24×7 operation',
    body: 'Staffed and monitored round the clock, with remote support available.',
  },
]

export function StationFeatures() {
  return (
    <Section id="features" labelledBy="features-heading" className="bg-paper">
      <div className="mx-auto max-w-7xl px-6 pt-28 lg:px-8">
        <p className="chapter-label border-t border-hairline pt-4.5">01 &mdash; AT EVERY STATION</p>
        <h2 id="features-heading" className="mt-7 font-display text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl">
          What&rsquo;s at every Vega Charge station.
        </h2>
        <ul className="mt-11 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon, title, body }) => (
            <li
              key={title}
              className="rounded-card border border-hairline bg-white p-7 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift"
            >
              {icon}
              <p className="mt-4 font-display text-[17px] font-semibold text-ink">{title}</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
