import { motion, useReducedMotion } from 'motion/react'
import { fadeOnly, fadeUp, staggerChildren, VIEWPORT } from '../../lib/variants'
import { Button } from '../ui/Button'

/* Content ported from "Homepage Sections 07-11.dc.html" (design canvas,
   deleted after porting) — section 09, Fleet partnerships. CTA target
   updated to /partner?type=fleet to match the lead-type query-param
   convention (SitePartnership.tsx uses ?type=site the same way). Fleet
   photo is Narketpally render p15 (public/media/renders/, not committed —
   see the .gitignore entry from the earlier PDF extraction). */

const FLEET_POINTS = [
  {
    title: 'Corridor access',
    body: 'Charging positioned along the routes your vehicles already run, so range planning fits the schedule.',
  },
  {
    title: 'Charging plans',
    body: 'Session profiles built around turnaround windows and vehicle utilisation, not one-size-fits-all pricing.',
  },
  {
    title: 'Commercial arrangements',
    body: 'Contract structures and billing terms agreed with your operations team ahead of rollout.',
  },
]

/* Animates in once when the section enters the viewport: chapter label,
   heading + copy + CTA, then the fleet photo and the three capability
   points stagger in on a fixed timer. No scroll-linked progress, no
   scroll lock. */
export function FleetPartnership() {
  const reduced = useReducedMotion()
  const item = reduced ? fadeOnly : fadeUp

  return (
    <motion.section
      id="fleet-partners"
      aria-labelledby="fleet-partners-heading"
      className="relative bg-ink"
      variants={reduced ? fadeOnly : staggerChildren(0, 0.15)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-mint to-transparent" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
        <motion.p variants={item} className="chapter-label border-t border-white/15 pt-4.5 text-mint">
          09 &mdash; FLEET PARTNERSHIPS
        </motion.p>
        <motion.div variants={item} className="mt-7 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <h2
            id="fleet-partners-heading"
            className="font-display text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl"
          >
            Charging designed around your routes.
          </h2>
          <div className="max-w-xl">
            <p className="text-base leading-relaxed text-muted-onink">
              For logistics, mobility and corporate fleets, charging infrastructure has
              to work with route schedules and vehicle utilisation. Vega Charge can
              structure corridor access, charging plans and commercial arrangements
              around fleet requirements.
            </p>
            <Button href="/partner?type=fleet" variant="mint" className="mt-7">
              Request a Fleet Discussion &rarr;
            </Button>
          </div>
        </motion.div>

        <motion.div variants={item} className="mt-14 overflow-hidden rounded-media">
          <img
            src="/media/renders/narketpally-render-p15.jpeg"
            alt="Vega Charge station render, fleet and commercial vehicle charging"
            className="h-[320px] w-full object-cover"
          />
        </motion.div>

        <motion.div variants={staggerChildren(0, 0.1)} className="mt-12 grid gap-6 sm:grid-cols-3">
          {FLEET_POINTS.map(({ title, body }) => (
            <motion.div key={title} variants={item} className="border-t-2 border-mint pt-4.5">
              <div className="font-display text-[17px] font-semibold text-white">{title}</div>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted-onink">{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
