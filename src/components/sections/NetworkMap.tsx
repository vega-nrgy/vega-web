import { motion, useReducedMotion } from 'motion/react'
import { fadeOnly, fadeUp, staggerChildren, VIEWPORT } from '../../lib/variants'
import { Button } from '../ui/Button'
import { StationMap } from './network/StationMap'

/* Content sourced from the website audit doc, Section 3 ("Network map") —
   the audit's "centerpiece of the brand" map: corridor lines, station pins,
   status legend, click-through station cards. The map itself reuses the
   real Leaflet StationMap component from the Network page (same pins,
   popups and Google Maps links) rather than a bespoke homepage map, nested
   in a narrower column here via StationMap's heightClass prop.

   Note: StationMap's pins currently only distinguish two visual states
   (live vs. pending), not the four-label taxonomy below (LIVE / UNDER
   CONSTRUCTION / COMING SOON / PLANNED) — reconciling that is part of the
   station "source of truth" backlog item, not addressed here.

   (What used to live at this file path is the station-card carousel, which
   is actually the audit's Section 6 "Featured stations" — see
   FeaturedStations.tsx.) */

const STATUS_LEGEND = [
  { label: 'Live', dot: 'bg-mint', body: 'Open to public charging.' },
  { label: 'Under construction', dot: 'bg-mint-deep', body: 'Civil/electrical works underway.' },
  { label: 'Coming soon', dot: 'bg-ink-soft', body: 'Site secured and launch planned.' },
  { label: 'Planned', dot: 'bg-muted', body: 'Corridor/site under development or acquisition.' },
]

/* Animates in once when the section enters the viewport: chapter label,
   then the map and the content column stagger in side by side, with the
   status legend rows staggering in on their own fixed timer underneath.
   No scroll-linked progress, no scroll lock — matches the rest of the
   homepage's entrance animation convention. */
export function NetworkMap() {
  const reduced = useReducedMotion()
  const item = reduced ? fadeOnly : fadeUp

  return (
    <motion.section
      id="network"
      aria-labelledby="network-heading"
      className="bg-paper"
      variants={reduced ? fadeOnly : staggerChildren(0, 0.15)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      <div className="mx-auto max-w-7xl px-6 py-30 lg:px-8">
        <motion.p variants={item} className="chapter-label border-t border-hairline pt-4.5">
          01 &mdash; THE NETWORK
        </motion.p>

        <div className="mt-7 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
          <motion.div variants={item} className="order-2 lg:order-1">
            <StationMap heightClass="h-[420px]" />
          </motion.div>

          <motion.div variants={item} className="order-1 flex flex-col lg:order-2 lg:min-h-[420px] lg:justify-between">
            <div>
              <h2
                id="network-heading"
                className="font-display text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl"
              >
                A highway network, not isolated charge points.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
                Vega Charge is developing strategically spaced charging hubs across major
                inter-city corridors, beginning in Telangana and Andhra Pradesh.
              </p>

              <motion.ul variants={staggerChildren(0, 0.08)} className="mt-8 flex flex-col gap-3.5">
                {STATUS_LEGEND.map(({ label, dot, body }) => (
                  <motion.li key={label} variants={item} className="flex items-start gap-3">
                    <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dot}`} />
                    <span>
                      <span className="font-display text-sm font-semibold text-ink">{label}</span>
                      <span className="ml-2 text-[13px] text-muted">{body}</span>
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            <Button href="/network" variant="mint" className="mt-9 self-start">
              View the Full Network &rarr;
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
