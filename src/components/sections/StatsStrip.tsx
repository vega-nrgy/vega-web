import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'motion/react'

function CountUp({ to, reduced, inView }: { to: number; reduced: boolean; inView: boolean }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))

  useEffect(() => {
    if (reduced || !inView) return
    count.set(0)
    const controls = animate(count, to, { duration: 0.7, ease: 'easeOut' })
    return () => controls.stop()
  }, [inView, reduced, to, count])

  if (reduced) return <span>{to}</span>
  return <motion.span>{rounded}</motion.span>
}

const valueClass = 'font-sans text-5xl font-extrabold tabular-nums tracking-[-0.03em] text-ink sm:text-6xl'
const labelClass = 'mt-2.5 text-[13px] text-muted'

export function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion() ?? false
  const inView = useInView(ref, { amount: 0.4 })

  return (
    <section id="stats" aria-label="Station capabilities" className="bg-paper">
      <div ref={ref} className="mx-auto max-w-7xl px-6 pb-26 pt-26 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-4">
          <div className="border-t border-hairline pt-5">
            <p className={valueClass}>
              <CountUp to={3} reduced={reduced} inView={inView} />
              <span className="text-mint-deep">&times;</span>
              <CountUp to={180} reduced={reduced} inView={inView} />
            </p>
            <p className={labelClass}>kW DC fast chargers per station</p>
          </div>
          <div className="border-t border-hairline pt-5">
            <p className={valueClass}>
              <CountUp to={30} reduced={reduced} inView={inView} />
              <span className="text-2xl text-muted">min</span>
            </p>
            <p className={labelClass}>for 100&ndash;150 km of range</p>
          </div>
          <div className="border-t border-hairline pt-5">
            <p className={valueClass}>
              <CountUp to={3} reduced={reduced} inView={inView} />
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
