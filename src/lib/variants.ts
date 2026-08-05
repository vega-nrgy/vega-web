import type { Variants } from 'motion/react'

export const EASE_OUT = [0.22, 1, 0.36, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
}

/* Opacity-only twin of fadeUp for prefers-reduced-motion */
export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
}

export const staggerChildren = (delay = 0, stagger = 0.14): Variants => ({
  hidden: {},
  visible: { transition: { delayChildren: delay, staggerChildren: stagger } },
})

export const VIEWPORT = { once: true, amount: 0.25 } as const
