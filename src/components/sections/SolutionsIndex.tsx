import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { fadeOnly, fadeUp, staggerChildren, VIEWPORT } from '../../lib/variants'

const SOLUTIONS = [
  {
    index: '01',
    title: 'Passenger EVs',
    body: 'Reliable high-power charging for confident inter-city travel.',
    cta: 'Explore the Network',
    href: '/network',
  },
  {
    index: '02',
    title: 'Fleets',
    body: 'Route-based charging, dedicated commercial arrangements and operational visibility for high-utilisation fleets.',
    cta: 'Talk to Fleet Solutions',
    href: '/partner?type=fleet',
  },
  {
    index: '03',
    title: 'Commercial EVs',
    body: 'Selected hubs designed to support the space, access and power requirements of electric trucks and buses.',
    cta: 'Discuss Commercial Vehicle Charging',
    href: '/solutions',
  },
]

/* Animates in once when the section enters the viewport: chapter label +
   intro first, then the three rows stagger in one after another on a fixed
   timer. No scroll-linked progress, no scroll lock. */
export function SolutionsIndex() {
  const reduced = useReducedMotion()
  const item = reduced ? fadeOnly : fadeUp

  return (
    <motion.section
      id="solutions"
      aria-labelledby="solutions-heading"
      className="bg-paper"
      variants={reduced ? fadeOnly : staggerChildren(0, 0.15)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      <div className="mx-auto max-w-7xl px-6 py-30 lg:px-8">
        <motion.p variants={item} className="chapter-label border-t border-hairline pt-4.5">
          06 &mdash; WHO WE SERVE
        </motion.p>
        <div className="mt-7 grid gap-14 lg:grid-cols-[1fr_1.6fr]">
          <motion.div variants={item}>
            <h2 id="solutions-heading" className="font-display text-4xl font-semibold tracking-[-0.03em] text-ink">
              Built for who&rsquo;s on the highway.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              Passenger EVs, fleets, and commercial vehicles &mdash; each with different
              needs on the road.
            </p>
          </motion.div>

          <motion.ul variants={staggerChildren(0, 0.12)} className="border-t border-hairline">
            {SOLUTIONS.map(({ index, title, body, cta, href }) => (
              <motion.li key={index} variants={item} className="border-b border-hairline">
                <Link
                  to={href}
                  className="flex items-center justify-between gap-6 py-6 transition-colors hover:bg-grey-soft"
                >
                  <span className="flex items-baseline gap-5">
                    <span className="font-mono text-[11px] tracking-[0.12em] text-mint-deep">{index}</span>
                    <span>
                      <span className="block font-display text-[22px] font-semibold tracking-[-0.015em] text-ink">
                        {title}
                      </span>
                      <span className="mt-1 block text-[13px] text-muted">{body}</span>
                    </span>
                  </span>
                  <span className="hidden shrink-0 items-center gap-2 font-mono text-[11px] tracking-[0.08em] text-mint-deep sm:flex">
                    {cta}
                    <span className="font-sans text-lg">&rarr;</span>
                  </span>
                  <span className="font-sans text-lg text-mint-deep sm:hidden">&rarr;</span>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </motion.section>
  )
}
