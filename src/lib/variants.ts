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

/* once: false — sections replay their entrance animation every time they
   re-enter the viewport (scrolling back up and down again), matching
   FeaturedStations' IntersectionObserver-driven repeat behavior, rather
   than animating in once and staying put.

   margin (not amount): a fixed trigger band near viewport center, rather
   than "% of the element visible". Sections taller than the viewport (e.g.
   FleetOperators) can hover right at an `amount` threshold for a long
   scroll range, so minor jitter flips the intersection back and forth and
   re-fires the animation mid-scroll — a margin band is crossed cleanly
   once per direction regardless of element height. */
export const VIEWPORT = { once: false, margin: '-35% 0px -35% 0px' } as const
