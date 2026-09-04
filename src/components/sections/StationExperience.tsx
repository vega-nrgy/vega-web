import { motion, useReducedMotion } from 'motion/react'
import { fadeOnly, fadeUp, staggerChildren, VIEWPORT } from '../../lib/variants'

/* Doc's Section 7 amenity framework (Eat/Rest/Refresh/Shop/Family), used
   in place of the old flat pill labels — pairs with the body copy below,
   which frames this as "selected Vega Charge hubs" rather than a blanket
   "every station" claim, per the audit's amenities guidance. */
const AMENITIES = ['Eat', 'Rest', 'Refresh', 'Shop', 'Family']

/* Animates in once when the section enters the viewport: heading, copy,
   then the amenity pills stagger in one after another on a fixed timer,
   while the photo panel fades in alongside. No scroll-linked progress, no
   scroll lock. */
export function StationExperience() {
  const reduced = useReducedMotion()
  const item = reduced ? fadeOnly : fadeUp

  return (
    <motion.section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative mt-30 overflow-hidden bg-ink"
      variants={reduced ? fadeOnly : staggerChildren(0, 0.15)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-mint to-transparent" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <motion.p variants={item} className="font-mono text-[10px] tracking-[0.16em] text-mint">
          05 &mdash; THE STATION EXPERIENCE
        </motion.p>
        <div className="mt-7 grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <motion.h2
              variants={item}
              id="experience-heading"
              className="font-display text-4xl font-semibold leading-[1.12] tracking-[-0.03em] text-white sm:text-5xl"
            >
              Charge the vehicle.
              <br />Recharge yourself.
            </motion.h2>
            <motion.p variants={item} className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-onink">
              A highway charging stop should work for the people inside the vehicle
              too. Selected Vega Charge hubs are designed around a comfortable,
              useful break while the vehicle charges.
            </motion.p>
            <motion.ul variants={staggerChildren(0, 0.08)} className="mt-7 flex flex-wrap gap-2.5">
              {AMENITIES.map((label) => (
                <motion.li
                  key={label}
                  variants={item}
                  className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-onink"
                >
                  {label}
                </motion.li>
              ))}
            </motion.ul>
          </div>
          <motion.div variants={item} className="relative overflow-hidden rounded-media">
            <img
              src="/media/renders/narketpally-render-p18.jpeg"
              alt="Vega Charge station Café and hub, with waiting and play area"
              className="h-[280px] w-full object-cover sm:h-[340px] lg:h-[420px]"
            />
            <span className="absolute bottom-3.5 left-4 rounded-md bg-ink/55 px-2.5 py-1.5 font-mono text-[9px] tracking-[0.1em] text-white">
              NARKETPALLE &middot; STATION
            </span>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
