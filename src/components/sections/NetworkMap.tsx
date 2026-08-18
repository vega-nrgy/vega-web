import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { Button } from '../ui/Button'
import { useIsDesktop } from '../../hooks/useIsDesktop'

/* Corridor-preview and flagship-station card designs — commented out in
   favour of the big-image station list below, kept here in case we want to
   bring the interactive corridor bars back.

type Pin = {
  pct: number
  labelPct: number
  name: string
  sub: string
  map: string
  flagship?: boolean
  labelClass: string
}

type CorridorRowProps = {
  label: string
  filledPct: number
  left: string
  right: string
  pins: Pin[]
}

function CorridorRow({ label, filledPct, left, right, pins }: CorridorRowProps) {
  return (
    <div className="mt-6.5 first:mt-0">
      <p className="font-mono text-[9px] tracking-[0.12em] text-muted-onink">{label}</p>
      <div className="relative mt-4 h-[62px]">
        <div className="absolute inset-x-0 top-[9px] h-[3px] rounded-full bg-hairline" />
        <div className="absolute left-0 top-[9px] h-[3px] rounded-full bg-ink" style={{ width: `${filledPct}%` }} />

        <div className="absolute left-0 top-1 h-[13px] w-[13px] rounded-full bg-ink" />
        <p className="absolute left-0 top-7 text-[12px] font-semibold text-ink">{left}</p>

        {pins.map((p) => (
          <a
            key={p.name}
            href={p.map}
            target="_blank"
            rel="noreferrer"
            title={`${p.name} — open in Google Maps`}
            style={{ left: `${p.pct}%` }}
            className={`absolute top-0.5 -translate-x-1/2 rounded-full border-white bg-mint shadow-[0_0_0_1px_rgba(0,217,165,0.9)] transition-transform hover:scale-125 ${
              p.flagship ? 'h-[17px] w-[17px] border-[3px] animate-live-pulse' : 'h-[13px] w-[13px] border-2'
            }`}
          />
        ))}
        {pins.map((p) => (
          <a
            key={`${p.name}-label`}
            href={p.map}
            target="_blank"
            rel="noreferrer"
            style={{ left: `${p.labelPct}%` }}
            className="absolute top-7 -translate-x-0 no-underline"
          >
            <span className={`block text-[12px] font-semibold ${p.labelClass}`}>{p.name} &#8599;</span>
            <span className="mt-0.5 block font-mono text-[8.5px] tracking-[0.08em] text-muted">{p.sub}</span>
          </a>
        ))}

        <div className="absolute right-0 top-1 h-[13px] w-[13px] rounded-full bg-ink" />
        <p className="absolute right-0 top-7 text-right text-[12px] font-semibold text-ink">{right}</p>
      </div>
    </div>
  )
}

function HomeCorridorPreview() {
  return (
    <div className="rounded-card border border-border bg-white p-8 pb-7">
      <p className="font-mono text-[9.5px] tracking-[0.14em] text-muted">2 CORRIDORS &middot; 5 STATIONS PLANNED</p>
      <p className="mt-1.5 font-mono text-[9px] tracking-[0.1em] text-muted-onink">
        TAP A PIN OR LABEL TO OPEN GOOGLE MAPS &#8599;
      </p>

      <div className="mt-6.5">
        <CorridorRow
          label="NH-65 · HYDERABAD ⟷ VIJAYAWADA"
          filledPct={58}
          left="Hyderabad"
          right="Vijayawada"
          pins={[
            {
              pct: 36,
              labelPct: 30,
              name: 'Narketpally',
              sub: 'VC 001 · FLAGSHIP',
              map: 'https://maps.app.goo.gl/HDpiyMm8LLJXU7eZ6',
              flagship: true,
              labelClass: 'text-mint-deep',
            },
            {
              pct: 62,
              labelPct: 57,
              name: 'Pillalamarri',
              sub: 'VC 003',
              map: 'https://maps.app.goo.gl/4BNxu8rbfWQ7u2nB6',
              labelClass: 'text-ink-soft',
            },
          ]}
        />
        <CorridorRow
          label="HYDERABAD ⟷ VISAKHAPATNAM · VIA KHAMMAM"
          filledPct={52}
          left="Hyderabad"
          right="Visakhapatnam"
          pins={[
            {
              pct: 26,
              labelPct: 19,
              name: 'Tekmatla',
              sub: 'VC 005 · VC 002',
              map: 'https://maps.app.goo.gl/wB7xSW9zF5Rfi5kT8',
              labelClass: 'text-ink-soft',
            },
            {
              pct: 52,
              labelPct: 46,
              name: 'Tallampadu',
              sub: 'VC 004',
              map: 'https://maps.app.goo.gl/SudRLnPPe1KgZBaZ9',
              labelClass: 'text-ink-soft',
            },
          ]}
        />
      </div>

      <div className="mt-5.5 flex flex-wrap gap-5 border-t border-hairline pt-3.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 animate-live-pulse rounded-full bg-mint" />
          <span className="text-[10.5px] text-muted">Flagship &mdash; live soon</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-mint" />
          <span className="text-[10.5px] text-muted">Coming soon &mdash; site secured</span>
        </div>
      </div>
    </div>
  )
}

const SPECS: [string, string | { label: string; href: string }][] = [
  ['Site area', '2,200 sq. yards'],
  ['Chargers', '3 × 180 kW DC'],
  ['Location', { label: 'Google Maps ↗', href: 'https://maps.app.goo.gl/HDpiyMm8LLJXU7eZ6' }],
  ['Standards', 'CCS2 · CHAdeMO · DC-001'],
]

function FlagshipCard() {
  return (
    <div className="relative overflow-hidden rounded-card bg-ink p-8">
      <div
        className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-mint to-transparent"
        aria-hidden="true"
      />
      <p className="font-mono text-[9.5px] tracking-[0.14em] text-mint">FLAGSHIP STATION</p>
      <h3 className="mt-3.5 font-display text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] text-white">
        Narketpalle,
        <br />
        NH-65
      </h3>
      <p className="mt-3.5 text-[13.5px] leading-relaxed text-muted-onink">
        Midway between Hyderabad and the AP border, on one of Telangana&rsquo;s busiest
        freight and passenger corridors.
      </p>
      <dl className="mt-6 flex flex-col gap-2.5">
        {SPECS.map(([label, value]) => (
          <div key={label} className="flex justify-between border-b border-white/10 pb-2.5">
            <dt className="text-xs text-muted-onink">{label}</dt>
            {typeof value === 'string' ? (
              <dd className="text-xs font-semibold text-white">{value}</dd>
            ) : (
              <dd>
                <a href={value.href} target="_blank" rel="noreferrer" className="text-xs font-semibold text-mint hover:text-mint-bright">
                  {value.label}
                </a>
              </dd>
            )}
          </div>
        ))}
        <div className="flex justify-between">
          <dt className="text-xs text-muted-onink">Status</dt>
          <dd className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-mint" />
            <span className="text-xs font-semibold text-mint">Live soon</span>
          </dd>
        </div>
      </dl>
      <Button href="/network" variant="mint" size="sm" className="mt-6">
        Explore the network &rarr;
      </Button>
    </div>
  )
}

*/

type Station = {
  name: string
  corridor: string
  description: string
  specs: string
  status: string
  flagship?: boolean
  image: string
}

/* NOTE: specs below are this homepage teaser's own editorial copy (shorter
   corridor phrasing + a trimmed charger count) and intentionally aren't
   pulled from src/lib/stations.ts. Narketpalle's numbers already agree with
   the full station data, but Pillalamarri and Tallampadu currently show
   fewer chargers here (2 × 180 kW DC) than the real station list/map
   (4 × 180 + 2 × 240, and 3 × 180 + 1 × 240 respectively) — flagging this
   pre-existing mismatch to resolve once the real per-station charger config
   comes in, rather than silently picking one number over the other. */
const STATIONS: Station[] = [
  {
    name: 'Narketpalle',
    corridor: 'NH-65 · Hyderabad ⟷ Vijayawada',
    description:
      'Midway between Hyderabad and the AP border, on one of Telangana’s busiest freight and passenger corridors.',
    specs: '3 × 180 kW DC · CCS2 · CHAdeMO · Bharat DC-001',
    status: 'Live soon',
    flagship: true,
    image: '/media/station-narketpalle.jpg',
  },
  {
    name: 'Pillalamarri',
    corridor: 'NH-65 · Hyderabad ⟷ Vijayawada',
    description: 'The Vijayawada-bound leg of the NH-65 corridor, serving inter-city freight and passenger traffic.',
    specs: '2 × 180 kW DC · CCS2 · CHAdeMO',
    status: 'Coming soon — site secured',
    image: '/media/station-pillalamarri.jpg',
  },
  {
    name: 'Tallampadu',
    corridor: 'Hyderabad ⟷ Visakhapatnam · via Khammam',
    description: 'Roughly midway on the Khammam corridor, built for the long freight and passenger haul to Vizag.',
    specs: '2 × 180 kW DC · CCS2 · Bharat DC-001',
    status: 'Coming soon — site secured',
    image: '/media/station-tallampadu.jpg',
  },
]

const PANEL_COUNT = STATIONS.length + 2

/* Self-contained pinned/horizontal-scroll section, inspired by trionn.com's
   pin + reveal pattern: vertical scroll drives a horizontal pan across a
   title panel, three station cards (big image + subtitle, charger config,
   status), and a closing stat/CTA card. When the last card finishes panning
   in, the pin releases and normal vertical scroll resumes straight into
   SolutionsIndex — which slides up to cover the frame, reading as a reveal
   underneath the last card. Reduced motion gets everything stacked
   statically instead. */
export function NetworkMap() {
  const reduced = useReducedMotion()
  const isDesktop = useIsDesktop()
  const pinRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    if (reduced || !isDesktop) return

    function onScroll() {
      const pin = pinRef.current
      const track = trackRef.current
      if (!pin || !track) return

      const rect = pin.getBoundingClientRect()
      const total = pin.offsetHeight - window.innerHeight
      const scrolled = Math.min(Math.max(-rect.top, 0), total)
      const progress = total > 0 ? scrolled / total : 0

      track.style.transform = `translate3d(-${progress * (PANEL_COUNT - 1) * 100}vw, 0, 0)`

      const active = Math.round(progress * (PANEL_COUNT - 1))
      dotRefs.current.forEach((el, i) => {
        if (!el) return
        el.style.opacity = i === active ? '1' : '0.35'
        el.style.transform = i === active ? 'scale(1.3)' : 'scale(1)'
      })
    }

    onScroll()
    document.addEventListener('scroll', onScroll, { passive: true })
    return () => document.removeEventListener('scroll', onScroll)
  }, [reduced, isDesktop])

  const header = (
    <>
      <p className="chapter-label border-t border-hairline pt-4.5">03 &mdash; THE NETWORK</p>
      <h2 id="network-heading" className="mt-7 font-display text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl">
        Our growing network.
      </h2>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
        India&rsquo;s most reliable highway EV charging corridor &mdash; starting with
        Telangana and Andhra Pradesh.
      </p>
    </>
  )

  const stationCard = (s: Station) => (
    <div className="w-full max-w-2xl">
      <div className="relative overflow-hidden rounded-media">
        <img
          src={s.image}
          alt={`${s.name} charging station canopy render`}
          className="aspect-[670/460] w-full object-cover"
        />
        {s.flagship && (
          <span className="absolute left-4 top-4 rounded-full bg-mint px-3 py-1 font-mono text-[9px] font-semibold tracking-[0.1em] text-ink">
            FLAGSHIP
          </span>
        )}
      </div>
      <div className="mt-6 flex items-center justify-between gap-4">
        <h3 className="font-display text-2xl font-semibold text-ink">{s.name}</h3>
        <span className="flex shrink-0 items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full bg-mint ${s.flagship ? 'animate-live-pulse' : ''}`} />
          <span className="font-mono text-[10px] tracking-[0.08em] text-mint-deep">{s.status}</span>
        </span>
      </div>
      <p className="mt-1 font-mono text-[10px] tracking-[0.1em] text-muted-onink">{s.corridor}</p>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">{s.description}</p>
      <p className="mt-2 font-mono text-[11px] tracking-[0.08em] text-mint-deep">{s.specs}</p>
    </div>
  )

  const ctaCard = (
    <div className="relative w-full max-w-md overflow-hidden rounded-card bg-ink p-10 text-center">
      <div
        className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-mint to-transparent"
        aria-hidden="true"
      />
      <p className="font-mono text-[9.5px] tracking-[0.14em] text-mint">2 CORRIDORS &middot; 5 STATIONS PLANNED</p>
      <p className="mt-5 font-display text-3xl font-semibold leading-[1.15] tracking-[-0.02em] text-white">
        One growing network, built one corridor at a time.
      </p>
      <p className="mt-4 text-[13.5px] leading-relaxed text-muted-onink">
        Telangana and Andhra Pradesh today &mdash; India&rsquo;s highway corridors next.
      </p>
      <Button href="/network" variant="mint" className="mt-7">
        Explore the network &rarr;
      </Button>
    </div>
  )

  if (reduced || !isDesktop) {
    return (
      <section id="network" aria-labelledby="network-heading" className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-30 lg:px-8">
          <div>{header}</div>
          <div className="mt-9 flex flex-col gap-16">
            {STATIONS.map((s) => (
              <div key={s.name}>{stationCard(s)}</div>
            ))}
          </div>
          <div className="mt-16 flex justify-center">{ctaCard}</div>
        </div>
      </section>
    )
  }

  return (
    <section id="network" ref={pinRef} aria-labelledby="network-heading" className="relative h-[500svh] bg-paper">
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        <div ref={trackRef} className="flex h-full will-change-transform">
          <div className="flex h-full w-screen shrink-0 flex-col items-center justify-center px-6 pb-16 pt-24 text-center lg:px-8">
            <div className="max-w-xl">{header}</div>
            <p className="mt-10 font-mono text-[10px] tracking-[0.2em] text-muted-onink">
              SCROLL TO EXPLORE THE NETWORK &rarr;
            </p>
          </div>

          {STATIONS.map((s) => (
            <div key={s.name} className="flex h-full w-screen shrink-0 items-center justify-center px-6 pb-16 pt-24 lg:px-8">
              {stationCard(s)}
            </div>
          ))}

          <div className="flex h-full w-screen shrink-0 items-center justify-center px-6 pb-16 pt-24 lg:px-8">
            {ctaCard}
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-8 z-10 flex items-center justify-center gap-2.5" aria-hidden="true">
          {Array.from({ length: PANEL_COUNT }).map((_, i) => (
            <span
              key={i}
              ref={(el) => {
                dotRefs.current[i] = el
              }}
              className="h-1.5 w-1.5 rounded-full bg-ink opacity-35 transition-all duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
