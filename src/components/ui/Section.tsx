import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { fadeOnly, fadeUp, VIEWPORT } from '../../lib/variants'

type SectionProps = {
  id: string
  labelledBy: string
  className?: string
  children: ReactNode
}

/** Scroll-reveal wrapper: every section fades/slides up once on entry. */
export function Section({ id, labelledBy, className, children }: SectionProps) {
  const reduced = useReducedMotion()
  return (
    <motion.section
      id={id}
      aria-labelledby={labelledBy}
      className={className}
      variants={reduced ? fadeOnly : fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </motion.section>
  )
}
