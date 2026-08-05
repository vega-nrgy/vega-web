import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'

function CountUp({ progress, to, reduced }: { progress: MotionValue<number>; to: number; reduced: boolean }) {
  const value = useTransform(progress, [0, 1], [0, to])
  const rounded = useTransform(value, (v) => Math.round(v))
  if (reduced) return <span>{to}</span>
  return <motion.span>{rounded}</motion.span>
}

const valueClass = 'font-sans text-5xl font-extrabold tabular-nums tracking-[-0.03em] text-ink sm:text-6xl'
const labelClass = 'mt-2.5 text-[13px] text-muted'

export function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion() ?? false
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'start 0.45'] })

  return (
    <section id="stats" aria-label="Station capabilities" className="bg-paper">
      <div ref={ref} className="mx-auto max-w-7xl px-6 pb-26 pt-26 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-4">
          <div className="border-t border-hairline pt-5">
            <p className={valueClass}>
              <CountUp progress={scrollYProgress} to={3} reduced={reduced} />
              <span className="text-mint-deep">&times;</span>
              <CountUp progress={scrollYProgress} to={180} reduced={reduced} />
            </p>
            <p className={labelClass}>kW DC fast chargers per station</p>
          </div>
          <div className="border-t border-hairline pt-5">
            <p className={valueClass}>
              <CountUp progress={scrollYProgress} to={30} reduced={reduced} />
              <span className="text-2xl text-muted">min</span>
            </p>
            <p className={labelClass}>for 100&ndash;150 km of range</p>
          </div>
          <div className="border-t border-hairline pt-5">
            <p className={valueClass}>
              <CountUp progress={scrollYProgress} to={3} reduced={reduced} />
            </p>
            <p className={labelClass}>charging standards supported</p>
          </div>
          <div className="border-t border-hairline pt-5">
            <p className={valueClass}>
              24<span className="text-mint-deep">&times;</span>7
            </p>
            <p className={labelClass}>staffed &amp; monitored operation</p>
          </div>
        </div>
      </div>
    </section>
  )
}
