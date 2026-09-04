import { motion, useReducedMotion } from 'motion/react'
import { fadeOnly, fadeUp, staggerChildren, VIEWPORT } from '../../lib/variants'

/* Content ported from "Homepage Sections 07-11.dc.html" (design canvas,
   deleted after porting) — section 07, Expansion vision. The ambition stat
   ("Our ambition: 50 highway charging locations...") was modeled there as
   an opt-in block defaulting to hidden; left out here too, per the audit's
   guidance to only show it once formally approved (see the P0 kW/status
   "source of truth" backlog note in FeaturedStations.tsx). */

const PHASES = [
  {
    phase: 'PHASE 01',
    corridor: 'NH-65 · Hyderabad ⟷ Vijayawada',
    description: "Our first corridor — two sites secured on one of Telangana's busiest freight and passenger routes.",
    statusDetail: 'Sites secured',
    sites: 'Narketpalle · Pillalamarri',
    status: 'IN DEVELOPMENT',
    pipeline: false,
  },
  {
    phase: 'PHASE 02',
    corridor: 'Hyderabad ⟷ Visakhapatnam · via Khammam',
    description: 'Extending the model east — the long freight and passenger haul to the coast.',
    statusDetail: 'Sites secured',
    sites: 'Tallampadu · Tekmatla',
    status: 'IN DEVELOPMENT',
    pipeline: false,
  },
  {
    phase: 'PHASE 03',
    corridor: "India's national highway corridors",
    description: 'Corridor selection driven by traffic density, grid capacity and site frontage — the same criteria, applied route by route.',
    statusDetail: 'Under evaluation',
    sites: null as string | null,
    status: 'PIPELINE',
    pipeline: true,
  },
]

/* Animates in once when the section enters the viewport: chapter label,
   heading + copy, then the three phase rows stagger in on a fixed timer.
   No scroll-linked progress, no scroll lock. */
export function ExpansionVision() {
  const reduced = useReducedMotion()
  const item = reduced ? fadeOnly : fadeUp

  return (
    <motion.section
      id="expansion"
      aria-labelledby="expansion-heading"
      className="bg-paper"
      variants={reduced ? fadeOnly : staggerChildren(0, 0.15)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      <div className="mx-auto max-w-7xl px-6 py-30 lg:px-8">
        <motion.p variants={item} className="chapter-label border-t border-hairline pt-4.5">
          07 &mdash; EXPANSION VISION
        </motion.p>
        <motion.div variants={item} className="mt-7 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <h2
            id="expansion-heading"
            className="font-display text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl"
          >
            From key corridors to a connected network.
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted">
            Vega Charge&rsquo;s expansion strategy is to build repeatable, high-power
            charging hubs across high-demand highway corridors &mdash; beginning in
            Telangana and Andhra Pradesh and expanding as site, power and corridor
            economics are validated.
          </p>
        </motion.div>

        <motion.div variants={staggerChildren(0, 0.1)} className="mt-14 border-t border-hairline">
          {PHASES.map(({ phase, corridor, description, statusDetail, sites, status, pipeline }) => (
            <motion.div
              key={phase}
              variants={item}
              className="grid gap-3 border-b border-hairline py-6 lg:grid-cols-[72px_1.4fr_1fr_190px] lg:items-baseline lg:gap-6"
            >
              <span className={`font-mono text-[11px] tracking-[0.12em] ${pipeline ? 'text-muted-onink' : 'text-mint-deep'}`}>
                {phase}
              </span>
              <div>
                <div
                  className={`font-display text-xl font-semibold tracking-[-0.015em] ${pipeline ? 'text-muted' : 'text-ink'}`}
                >
                  {corridor}
                </div>
                <div className={`mt-1.5 text-[13px] leading-relaxed ${pipeline ? 'text-muted-onink' : 'text-muted'}`}>
                  {description}
                </div>
              </div>
              <div className={`text-[13px] font-semibold ${pipeline ? 'text-muted-onink' : 'text-ink-soft'}`}>
                {statusDetail}
                {sites && <div className="mt-1 text-[11.5px] font-normal text-muted-onink">{sites}</div>}
              </div>
              <span className="inline-flex items-center gap-2 lg:justify-self-end">
                {pipeline ? (
                  <span className="h-2 w-2 rounded-full border-2 border-muted-onink" />
                ) : (
                  <span className="h-2 w-2 rounded-full bg-mint" />
                )}
                <span className={`font-mono text-[11px] tracking-[0.1em] ${pipeline ? 'text-muted-onink' : 'text-mint-deep'}`}>
                  {status}
                </span>
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
