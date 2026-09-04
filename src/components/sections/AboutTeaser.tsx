import { motion, useReducedMotion } from 'motion/react'
import { fadeOnly, fadeUp, staggerChildren, VIEWPORT } from '../../lib/variants'
import { Button } from '../ui/Button'

/* Content ported from "Homepage Sections 07-11.dc.html" (design canvas,
   deleted after porting) — section 11, About Vega. That mockup also settled
   the background as grey-soft (alternating with the paper/ink rhythm of
   sections 07-10), matched here. */

export function AboutTeaser() {
  const reduced = useReducedMotion()
  const item = reduced ? fadeOnly : fadeUp

  return (
    <motion.section
      id="about"
      aria-labelledby="about-heading"
      className="bg-grey-soft"
      variants={reduced ? fadeOnly : staggerChildren(0, 0.15)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
        <motion.p variants={item} className="chapter-label border-t border-hairline pt-4.5">
          11 &mdash; ABOUT VEGA
        </motion.p>
        <motion.div variants={item} className="mt-7 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <h2
            id="about-heading"
            className="font-display text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl"
          >
            Building the highway infrastructure electric mobility needs.
          </h2>
          <div className="max-w-xl">
            <p className="text-base leading-relaxed text-muted">
              Vega Charge is a technology-led EV charging infrastructure company
              developing high-power charging hubs along India&rsquo;s highway corridors
              &mdash; starting with routes in Telangana and Andhra Pradesh and building a
              repeatable model for reliable inter-city charging.
            </p>
            <Button href="/about" variant="outline" className="mt-7">
              About Vega Charge &rarr;
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
