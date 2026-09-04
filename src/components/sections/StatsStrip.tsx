import { motion, useReducedMotion } from 'motion/react'
import { fadeOnly, fadeUp, staggerChildren, VIEWPORT } from '../../lib/variants'

/* Website audit §"Proof strip": until live operational metrics exist
   (Stations Live, Sessions, Energy Delivered, Uptime), use capability/status
   facts rather than animated vanity counters. Doc's own example — "High-power
   DC charging | 24×7 monitored operations | Highway-first locations |
   Passenger + fleet ready" — used near-verbatim below, with the first item
   made concrete using the finalized 120/240 kW charger config. */
const FACTS = ['120–240 kW DC charging', '24×7 monitored operations', 'Highway-first locations', 'Passenger + fleet ready']

export function StatsStrip() {
  const reduced = useReducedMotion()
  const item = reduced ? fadeOnly : fadeUp

  return (
    <motion.section
      id="stats"
      aria-label="Station capabilities"
      className="bg-paper"
      variants={reduced ? fadeOnly : staggerChildren(0, 0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-4">
          {FACTS.map((fact) => (
            <motion.div key={fact} variants={item} className="border-t border-hairline pt-5">
              <p className="font-display text-base font-semibold text-ink sm:text-lg">{fact}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
