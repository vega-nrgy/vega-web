import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { useIsDesktop } from '../../hooks/useIsDesktop'

const AMENITIES = [
  'Waiting lounge',
  'Clean washrooms',
  "Children's play area",
  'Café & retail',
  '24×7 staffed',
]

const STRIPE_STYLE = {
  backgroundImage: 'repeating-linear-gradient(-45deg, #0a2426 0 16px, #0d2a2c 16px 32px)',
} as const

const HEADING_AT = 0.05
const PARA_AT = 0.2
const AMENITY_AT = [0.32, 0.39, 0.46, 0.53, 0.6]
const IMAGE_AT = 0.4
const TRANSITION = 'transition-all duration-500 ease-out'

/* Self-contained pinned/staged section: heading, then copy, then the
   amenity pills stagger in one after another, while the photo panel fades
   in on the right. */
export function StationExperience() {
  const reduced = useReducedMotion()
  const isDesktop = useIsDesktop()
  const pinRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const paraRef = useRef<HTMLParagraphElement>(null)
  const amenityRefs = useRef<(HTMLLIElement | null)[]>([])
  const imageRef = useRef<HTMLDivElement>(null)

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

      if (paraRef.current) {
        const shown = progress >= PARA_AT
        paraRef.current.style.opacity = shown ? '1' : '0'
        paraRef.current.style.transform = shown ? 'translateY(0)' : 'translateY(12px)'
      }

      amenityRefs.current.forEach((el, i) => {
        if (!el) return
        const shown = progress >= AMENITY_AT[i]
        el.style.opacity = shown ? '1' : '0'
        el.style.transform = shown ? 'translateY(0)' : 'translateY(10px)'
      })

      if (imageRef.current) {
        const shown = progress >= IMAGE_AT
        imageRef.current.style.opacity = shown ? '1' : '0'
        imageRef.current.style.transform = shown ? 'translateY(0)' : 'translateY(16px)'
      }
    }

    onScroll()
    document.addEventListener('scroll', onScroll, { passive: true })
    return () => document.removeEventListener('scroll', onScroll)
  }, [reduced, isDesktop])

  const imagePanel = (heightClass: string) => (
    <div className="relative overflow-hidden rounded-media">
      <div style={STRIPE_STYLE} className={`flex ${heightClass} items-center justify-center`}>
        <span className="text-center font-mono text-[10.5px] tracking-[0.1em] text-mint-bright/70">
          [ premium waiting lounge photo
          <br />
          &middot; dusk interior &middot; family ]
        </span>
      </div>
      <span className="absolute bottom-3.5 left-4 rounded-md bg-ink/55 px-2.5 py-1.5 font-mono text-[9px] tracking-[0.1em] text-white">
        NARKETPALLE &middot; LOUNGE
      </span>
    </div>
  )

  if (reduced || !isDesktop) {
    return (
      <section id="experience" aria-labelledby="experience-heading" className="relative mt-30 overflow-hidden bg-ink">
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-mint to-transparent" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <p className="font-mono text-[10px] tracking-[0.16em] text-mint">05 &mdash; THE STATION EXPERIENCE</p>
          <div className="mt-7 grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <h2
                id="experience-heading"
                className="font-display text-4xl font-semibold leading-[1.12] tracking-[-0.03em] text-white sm:text-5xl"
              >
                More than a charge.
                <br />A promise.
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-onink">
                Every Vega Charge station is a rest stop, a service point, and a
                community hub &mdash; built to global standards, designed for
                Indian conditions.
              </p>
              <ul className="mt-7 flex flex-wrap gap-2.5">
                {AMENITIES.map((label) => (
                  <li key={label} className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-onink">
                    {label}
                  </li>
                ))}
              </ul>
            </div>
            {imagePanel('h-[340px]')}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="experience" ref={pinRef} className="relative h-[240svh] bg-ink">
      <div className="sticky top-0 flex h-svh w-full flex-col justify-center overflow-hidden pt-24 pb-10">
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-mint to-transparent" aria-hidden="true" />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <p className="font-mono text-[10px] tracking-[0.16em] text-mint">05 &mdash; THE STATION EXPERIENCE</p>
          <div className="mt-7 grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <h2
                ref={headingRef}
                id="experience-heading"
                className={`opacity-0 font-display text-4xl font-semibold leading-[1.12] tracking-[-0.03em] text-white sm:text-5xl ${TRANSITION}`}
              >
                More than a charge.
                <br />A promise.
              </h2>
              <p ref={paraRef} className={`mt-5 max-w-md text-[15px] leading-relaxed text-muted-onink opacity-0 ${TRANSITION}`}>
                Every Vega Charge station is a rest stop, a service point, and a
                community hub &mdash; built to global standards, designed for
                Indian conditions.
              </p>
              <ul className="mt-7 flex flex-wrap gap-2.5">
                {AMENITIES.map((label, i) => (
                  <li
                    key={label}
                    ref={(el) => {
                      amenityRefs.current[i] = el
                    }}
                    className={`rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-onink opacity-0 ${TRANSITION}`}
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </div>
            <div ref={imageRef} className={`opacity-0 ${TRANSITION}`}>
              {imagePanel('h-[220px]')}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
