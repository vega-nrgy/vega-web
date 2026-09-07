import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

const SLIDES = [
  '/media/renders/narketpally-render-p05.jpeg',
  '/media/renders/narketpally-render-p14.jpeg',
  '/media/renders/narketpally-render-p11.jpeg',
]

const SLIDE_MS = 6000
const FADE_S = 1.2
const PAN_PCT = 4

/* Ken Burns-style crossfade slideshow: each slide pans left -> right at a
   fixed zoom (enough overscan to pan without exposing edges) while the next
   slide fades in underneath. Static first frame for prefers-reduced-motion. */
export function HeroKenBurns() {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    SLIDES.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  useEffect(() => {
    if (reduced) return
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length)
    }, SLIDE_MS)
    return () => clearInterval(timer)
  }, [reduced])

  if (reduced) {
    return (
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${SLIDES[0]})` }}
        aria-hidden="true"
      />
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${SLIDES[index]})`, scale: 1.12 }}
          initial={{ opacity: 0, x: `-${PAN_PCT}%` }}
          animate={{
            opacity: 1,
            x: `${PAN_PCT}%`,
            transition: {
              opacity: { duration: FADE_S, ease: 'easeInOut' },
              x: { duration: (SLIDE_MS + FADE_S * 1000) / 1000, ease: 'linear' },
            },
          }}
          exit={{ opacity: 0, transition: { duration: FADE_S, ease: 'easeInOut' } }}
        />
      </AnimatePresence>
    </div>
  )
}
