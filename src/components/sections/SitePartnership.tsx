import { motion, useReducedMotion } from 'motion/react'
import { fadeOnly, fadeUp, staggerChildren, VIEWPORT } from '../../lib/variants'
import { Button } from '../ui/Button'

/* Content ported from "Homepage Sections 07-11.dc.html" (design canvas,
   deleted after porting) — section 08, Site & land partnerships. CTA target
   updated to /partner?type=site to match the existing lead-type query-param
   convention already used by NetworkPage's own "Host a Station" CTA.
   Forecourt photo is Narketpally render p17 (public/media/renders/, not
   committed — see the .gitignore entry and PDF extraction from earlier). */

const SITE_CRITERIA = [
  {
    index: '01',
    title: 'Highway frontage',
    body: 'Direct, unobstructed access from the carriageway, with safe entry and exit at highway speeds.',
  },
  {
    index: '02',
    title: 'Usable site area',
    body: 'Room for charging bays, turning circles for heavy vehicles, and driver amenities.',
  },
  {
    index: '03',
    title: 'Corridor traffic',
    body: 'Sustained inter-city freight and passenger volume, not seasonal or local-only movement.',
  },
  {
    index: '04',
    title: 'Power potential',
    body: 'Proximity to adequate grid capacity for high-power DC charging, or a viable route to it.',
  },
]

/* Animates in once when the section enters the viewport: chapter label,
   heading + copy + CTA, then the four site-criteria cards stagger in on a
   fixed timer. No scroll-linked progress, no scroll lock. */
export function SitePartnership() {
  const reduced = useReducedMotion()
  const item = reduced ? fadeOnly : fadeUp

  return (
    <motion.section
      id="site-partners"
      aria-labelledby="site-partners-heading"
      className="bg-grey-soft"
      variants={reduced ? fadeOnly : staggerChildren(0, 0.15)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
        <motion.p variants={item} className="chapter-label border-t border-hairline pt-4.5">
          08 &mdash; SITE &amp; LAND PARTNERSHIPS
        </motion.p>
        <motion.div variants={item} className="mt-7 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <h2
            id="site-partners-heading"
            className="font-display text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl"
          >
            Own land on a high-traffic highway corridor?
          </h2>
          <div className="max-w-xl">
            <p className="text-base leading-relaxed text-muted">
              Vega Charge partners with landowners and highway businesses to develop
              strategically located EV charging hubs. If your property has strong
              access, frontage and power potential, we want to hear from you.
            </p>
            <Button href="/partner?type=site" variant="mint" className="mt-7">
              Submit Your Site &rarr;
            </Button>
          </div>
        </motion.div>

        <motion.div variants={item} className="mt-14 overflow-hidden rounded-media">
          <img
            src="/media/renders/narketpally-render-p17.jpeg"
            alt="Vega Charge station forecourt render"
            className="h-[340px] w-full object-cover"
          />
        </motion.div>

        <motion.div variants={staggerChildren(0, 0.1)} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SITE_CRITERIA.map(({ index, title, body }) => (
            <motion.div
              key={index}
              variants={item}
              className="rounded-card bg-white p-6.5 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lift"
            >
              <span className="font-mono text-[9.5px] tracking-[0.14em] text-mint-deep">{index}</span>
              <div className="mt-3 font-display text-base font-semibold text-ink">{title}</div>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
