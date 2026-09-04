import { motion, useReducedMotion } from 'motion/react'
import { fadeOnly, fadeUp, staggerChildren, VIEWPORT } from '../../lib/variants'

const CARD_HOVER =
  'transition-[opacity,transform,box-shadow] duration-500 ease-out hover:-translate-y-0.5 hover:shadow-lift'

/* Animates in once when the section enters the viewport: chapter label,
   then the three cards stagger in on a fixed timer, with "Really fast."
   fading in on its own short delay inside the left card. No scroll-linked
   progress, no scroll lock. */
export function ValueProps() {
  const reduced = useReducedMotion()
  const item = reduced ? fadeOnly : fadeUp

  return (
    <motion.section
      id="why"
      aria-labelledby="why-heading"
      className="bg-paper"
      variants={reduced ? fadeOnly : staggerChildren(0, 0.15)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      <div className="mx-auto max-w-7xl px-6 py-30 lg:px-8">
        <motion.p variants={item} className="chapter-label border-t border-hairline pt-4.5">
          03 &mdash; WHY VEGA CHARGE
        </motion.p>
        <h2 id="why-heading" className="sr-only">
          Why Vega Charge?
        </h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.55fr_1fr]">
          <motion.div
            variants={item}
            className={`flex min-h-[340px] flex-col justify-between rounded-card bg-grey-soft p-10 ${CARD_HOVER}`}
          >
            <div>
              <h3 className="font-avapore text-3xl font-semibold tracking-[-0.025em] text-ink">
                <span className="inline-block">Fast.</span>{' '}
                <motion.span
                  className="inline-block text-mint-deep"
                  initial={reduced ? undefined : { opacity: 0 }}
                  whileInView={reduced ? undefined : { opacity: 1 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  Really fast.
                </motion.span>
              </h3>
              <p className="mt-4 max-w-[420px] leading-relaxed text-muted">
                120 kW and 240 kW DC fast chargers that take you up to 90% charge in
                around 45 minutes. Charge while you rest &mdash; and leave before your
                chai gets cold.
              </p>
            </div>
            <p className="flex items-baseline gap-2.5 tabular-nums">
              <span className="font-avapore text-6xl font-extrabold tracking-[-0.03em] text-mint-deep">
                90<span className="text-3xl">%</span>
              </span>
              <span className="font-sans text-sm font-semibold text-muted">charge in ~45 min</span>
            </p>
          </motion.div>
          <div className="flex flex-col gap-6">
            <motion.div variants={item} className={`flex-1 rounded-card border border-hairline bg-white p-7 ${CARD_HOVER}`}>
              <h3 className="font-avapore text-xl font-semibold tracking-[-0.015em] text-ink">Built for India&rsquo;s growing EV ecosystem.</h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">
                CCS2, CHAdeMO, and Bharat DC-001 support. One stop for every major EV on
                Indian roads today.
              </p>
            </motion.div>
            <motion.div variants={item} className={`flex-1 rounded-card border border-hairline bg-white p-7 ${CARD_HOVER}`}>
              <h3 className="font-avapore text-xl font-semibold tracking-[-0.015em] text-ink">Built for the highway.</h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">
                Not a parking-lot charger. Waiting lounge, clean washrooms, children&rsquo;s
                play area &mdash; because the driver matters too.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
