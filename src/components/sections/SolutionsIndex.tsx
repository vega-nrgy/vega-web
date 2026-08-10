import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useReducedMotion } from 'motion/react'
import { useIsDesktop } from '../../hooks/useIsDesktop'

const SOLUTIONS = [
  { index: '01', title: 'Highway Charging', body: 'Drive without doubt. Every highway. Every time.' },
  { index: '02', title: 'Commercial Charging', body: 'Power your business. Charge smarter.' },
  { index: '03', title: 'Fleet Operators', body: 'Keep your fleet moving. Always.' },
]

const HEADING_AT = 0.05
const ITEM_AT = [0.32, 0.54, 0.76]
const ITEM_TRANSITION = 'transition-all duration-500 ease-out'

/* Self-contained pinned/staged section: heading + intro appear first, then
   the three solution rows stagger in one after another. */
export function SolutionsIndex() {
  const reduced = useReducedMotion()
  const isDesktop = useIsDesktop()
  const pinRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    if (reduced || !isDesktop) return

    function onScroll() {
      const pin = pinRef.current
      if (!pin) return

      const rect = pin.getBoundingClientRect()
      const total = pin.offsetHeight - window.innerHeight
      const scrolled = Math.min(Math.max(-rect.top, 0), total)
      const progress = total > 0 ? scrolled / total : 0

      if (headingRef.current) {
        const shown = progress >= HEADING_AT
        headingRef.current.style.opacity = shown ? '1' : '0'
        headingRef.current.style.transform = shown ? 'translateY(0)' : 'translateY(12px)'
      }

      itemRefs.current.forEach((el, i) => {
        if (!el) return
        const shown = progress >= ITEM_AT[i]
        el.style.opacity = shown ? '1' : '0'
        el.style.transform = shown ? 'translateY(0)' : 'translateY(16px)'
      })
    }

    onScroll()
    document.addEventListener('scroll', onScroll, { passive: true })
    return () => document.removeEventListener('scroll', onScroll)
  }, [reduced, isDesktop])

  const staticMode = reduced || !isDesktop

  const list = (
    <ul className="border-t border-hairline">
      {SOLUTIONS.map(({ index, title, body }, i) => (
        <li
          key={index}
          ref={staticMode ? undefined : (el) => { itemRefs.current[i] = el }}
          className={`border-b border-hairline ${staticMode ? '' : `opacity-0 ${ITEM_TRANSITION}`}`}
        >
          <Link
            to="/solutions"
            className="flex items-center justify-between gap-6 py-6 transition-colors hover:bg-grey-soft"
          >
            <span className="flex items-baseline gap-5">
              <span className="font-mono text-[11px] tracking-[0.12em] text-mint-deep">{index}</span>
              <span>
                <span className="block font-display text-[22px] font-semibold tracking-[-0.015em] text-ink">
                  {title}
                </span>
                <span className="mt-1 block text-[13px] text-muted">{body}</span>
              </span>
            </span>
            <span className="font-sans text-lg text-mint-deep">&rarr;</span>
          </Link>
        </li>
      ))}
    </ul>
  )

  const intro = (
    <div>
      <h2 id="solutions-heading" className="font-display text-4xl font-semibold tracking-[-0.03em] text-ink">
        Powering every journey, for every need.
      </h2>
      <p className="mt-4 text-[15px] leading-relaxed text-muted">
        Whether you drive the highway, run a fleet, or own the land beside it.
      </p>
    </div>
  )

  if (staticMode) {
    return (
      <section id="solutions" aria-labelledby="solutions-heading" className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-30 lg:px-8">
          <p className="chapter-label border-t border-hairline pt-4.5">04 &mdash; SOLUTIONS</p>
          <div className="mt-7 grid gap-14 lg:grid-cols-[1fr_1.6fr]">
            {intro}
            {list}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="solutions" ref={pinRef} aria-labelledby="solutions-heading" className="relative h-[240svh] bg-paper">
      <div className="sticky top-0 flex h-svh w-full flex-col justify-center overflow-hidden pt-24 pb-10">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <p className="chapter-label border-t border-hairline pt-4.5">04 &mdash; SOLUTIONS</p>
          <div className="mt-7 grid gap-14 lg:grid-cols-[1fr_1.6fr]">
            <div ref={headingRef} className={`opacity-0 ${ITEM_TRANSITION}`}>
              {intro}
            </div>
            {list}
          </div>
        </div>
      </div>
    </section>
  )
}
