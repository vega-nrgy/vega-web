import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { fadeOnly, fadeUp } from '../../lib/variants'
import { useReplayInView } from '../../hooks/useReplayInView'

type SectionProps = {
  id: string
  labelledBy: string
  className?: string
  children: ReactNode
}

/** Scroll-reveal wrapper: every section fades/slides up on entry, replaying
    each time it's scrolled back into view (see useReplayInView). */
export function Section({ id, labelledBy, className, children }: SectionProps) {
  const reduced = useReducedMotion()
  const { ref, inView } = useReplayInView<HTMLElement>()
  return (
    <motion.section
      ref={ref}
      id={id}
      aria-labelledby={labelledBy}
      className={className}
      variants={reduced ? fadeOnly : fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.section>
  )
}
