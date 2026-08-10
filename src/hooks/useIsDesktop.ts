import { useEffect, useState } from 'react'

const QUERY = '(min-width: 1024px)'

/* Matches Tailwind's `lg` breakpoint. Used to gate the pinned/scroll-scrubbed
   section animations to desktop only — on phones those sections fall back to
   the same static stacked layout used for prefers-reduced-motion, since a
   fixed 100svh pin box crops/overflows once mobile text wraps to more lines. */
export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(QUERY)
    const onChange = () => setIsDesktop(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return isDesktop
}
