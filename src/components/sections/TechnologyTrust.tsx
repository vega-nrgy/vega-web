import { motion, useReducedMotion } from 'motion/react'
import { fadeOnly, fadeUp, staggerChildren, VIEWPORT } from '../../lib/variants'

/* Content ported from "Homepage Sections 07-11.dc.html" (design canvas,
   deleted after porting) — section 10, Technology & trust. The audit is
   explicit: only show verified partner/certification logos after written
   permission, and publish uptime methodology + a support SLA rather than
   broad "most reliable" claims once operational. Neither exists yet, so
   this keeps the capability points from the audit's "How we build" list
   (Section 4, About page rewrite) instead of logos or a reliability %.

   Images: the charger unit photo is the existing Charger_.png; the second
   is Narketpally render p24 (public/media/renders/, not committed — see
   the .gitignore entry from the earlier PDF extraction). Note p24 is
   actually the site-plan render, not a hardware detail shot as the design
   canvas's placeholder text suggested — used per explicit instruction. */

const CAPABILITIES = [
  { title: 'Connected monitoring', body: 'Chargers report status and diagnostics remotely, in real time.' },
  { title: 'Preventive maintenance', body: 'Scheduled upkeep and support to keep hardware operational.' },
  { title: 'Operational data', body: 'Uptime and site performance tracked, not assumed.' },
]

/* Animates in once when the section enters the viewport: chapter label,
   heading + copy, then the two hardware images and the capability points
   stagger in on a fixed timer. No scroll-linked progress, no scroll lock. */
export function TechnologyTrust() {
  const reduced = useReducedMotion()
  const item = reduced ? fadeOnly : fadeUp

  return (
    <motion.section
      id="technology"
      aria-labelledby="technology-heading"
      className="bg-paper"
      variants={reduced ? fadeOnly : staggerChildren(0, 0.15)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      <div className="mx-auto max-w-7xl px-6 py-30 lg:px-8">
        <motion.p variants={item} className="chapter-label border-t border-hairline pt-4.5">
          10 &mdash; TECHNOLOGY &amp; TRUST
        </motion.p>
        <motion.div variants={item} className="mt-7 max-w-2xl">
          <h2
            id="technology-heading"
            className="font-display text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl"
          >
            Infrastructure you can depend on.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">
            Vega Charge combines proven charging hardware, connected monitoring and
            operating processes to build a dependable highway charging experience.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          <motion.div variants={item} className="overflow-hidden rounded-media bg-grey-soft">
            <img
              src="/media/Charger_.png"
              alt="Vega Charge DC fast charger unit"
              className="h-[300px] w-full object-cover"
            />
          </motion.div>
          <motion.div variants={item} className="overflow-hidden rounded-media">
            <img
              src="/media/renders/narketpally-render-p24.jpeg"
              alt="Vega Charge station site plan render"
              className="h-[300px] w-full object-cover"
            />
          </motion.div>
        </div>

        <motion.ul variants={staggerChildren(0, 0.1)} className="mt-12 grid gap-6 sm:grid-cols-3">
          {CAPABILITIES.map(({ title, body }) => (
            <motion.li key={title} variants={item} className="border-t-2 border-mint pt-4">
              <span className="block font-display text-[15px] font-semibold text-ink">{title}</span>
              <span className="mt-1 block text-[13px] leading-relaxed text-muted">{body}</span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.p variants={item} className="mt-9 max-w-xl text-[11.5px] leading-relaxed text-muted-onink">
          Uptime methodology and support response times will be published here once
          stations are operational.
        </motion.p>
      </div>
    </motion.section>
  )
}
