import { useEffect, useRef, useState } from 'react'

const ENTER_AMOUNT = 0.25

/* Hysteresis viewport trigger — replaces Framer Motion's `whileInView`,
   which ties hidden/visible directly to one intersection boundary in both
   directions. A section's multi-child stagger entrance (up to ~1.5s) could
   get interrupted and snapped back to hidden by ordinary scroll speed
   before it finished, then restart — measured as 100+ opacity resets
   across a single scroll-through of the homepage before this existed.

   Entering the viewport at ENTER_AMOUNT visible flips `inView` true;
   flipping back to false waits until the element is fully out of view
   (0% visible) rather than the same boundary in reverse. That gives every
   entrance animation a wide dead zone to finish in — normal scrolling
   can't interrupt it — while still resetting for a genuine replay once
   the element has actually scrolled well away. */
export function useReplayInView<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  const inViewRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!inViewRef.current && entry.intersectionRatio >= ENTER_AMOUNT) {
          inViewRef.current = true
          setInView(true)
        } else if (inViewRef.current && !entry.isIntersecting) {
          inViewRef.current = false
          setInView(false)
        }
      },
      { threshold: [0, ENTER_AMOUNT] },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}
