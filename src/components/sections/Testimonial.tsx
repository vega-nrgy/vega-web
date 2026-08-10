import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { useIsDesktop } from '../../hooks/useIsDesktop'

const LABEL_AT = 0.08
const QUOTE_AT = 0.32
const CAPTION_AT = 0.62
const TRANSITION = 'transition-all duration-500 ease-out'

/* Self-contained pinned/staged section: the "FROM THE ROAD" label appears,
   then the quote, then the attribution.
   Placeholder layout — swap the copy below for a real quote when available. */
export function Testimonial() {
  const reduced = useReducedMotion()
  const isDesktop = useIsDesktop()
  const pinRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLParagraphElement>(null)
  const quoteRef = useRef<HTMLQuoteElement>(null)
  const captionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reduced || !isDesktop) return

    function onScroll() {
      const pin = pinRef.current
      if (!pin) return

      const rect = pin.getBoundingClientRect()
      const total = pin.offsetHeight - window.innerHeight
      const scrolled = Math.min(Math.max(-rect.top, 0), total)
      const progress = total > 0 ? scrolled / total : 0

      if (labelRef.current) {
        const shown = progress >= LABEL_AT
        labelRef.current.style.opacity = shown ? '1' : '0'
      }
      if (quoteRef.current) {
        const shown = progress >= QUOTE_AT
        quoteRef.current.style.opacity = shown ? '1' : '0'
        quoteRef.current.style.transform = shown ? 'translateY(0)' : 'translateY(12px)'
      }
      if (captionRef.current) {
        const shown = progress >= CAPTION_AT
        captionRef.current.style.opacity = shown ? '1' : '0'
        captionRef.current.style.transform = shown ? 'translateY(0)' : 'translateY(10px)'
      }
    }

    onScroll()
    document.addEventListener('scroll', onScroll, { passive: true })
    return () => document.removeEventListener('scroll', onScroll)
  }, [reduced, isDesktop])

  if (reduced || !isDesktop) {
    return (
      <section id="voices" aria-labelledby="voices-heading" className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 id="voices-heading" className="sr-only">
            What drivers say
          </h2>
          <div className="grid gap-10 border-y border-hairline py-14 lg:grid-cols-[1fr_4fr]">
            <p className="chapter-label pt-2">FROM THE ROAD</p>
            <figure>
              <blockquote className="text-pretty font-display text-2xl font-medium leading-[1.4] tracking-[-0.015em] text-ink-soft sm:text-[28px]">
                &ldquo;[ Placeholder &mdash; fleet operator or EV driver quote, added once
                available. ]&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3.5">
                <span className="h-11 w-11 shrink-0 rounded-full border border-hairline bg-grey-soft" aria-hidden="true" />
                <span>
                  <span className="block text-sm font-bold text-ink">Name</span>
                  <span className="block text-xs text-muted">Company / vehicle</span>
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="voices" ref={pinRef} aria-labelledby="voices-heading" className="relative h-[180svh] bg-paper">
      <div className="sticky top-0 flex h-svh w-full flex-col justify-center overflow-hidden pt-24 pb-10">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <h2 id="voices-heading" className="sr-only">
            What drivers say
          </h2>
          <div className="grid gap-10 border-y border-hairline py-14 lg:grid-cols-[1fr_4fr]">
            <p ref={labelRef} className={`chapter-label pt-2 opacity-0 ${TRANSITION}`}>
              FROM THE ROAD
            </p>
            <figure>
              <blockquote
                ref={quoteRef}
                className={`text-pretty font-display text-2xl font-medium leading-[1.4] tracking-[-0.015em] text-ink-soft opacity-0 sm:text-[28px] ${TRANSITION}`}
              >
                &ldquo;[ Placeholder &mdash; fleet operator or EV driver quote, added once
                available. ]&rdquo;
              </blockquote>
              <figcaption ref={captionRef} className={`mt-6 flex items-center gap-3.5 opacity-0 ${TRANSITION}`}>
                <span className="h-11 w-11 shrink-0 rounded-full border border-hairline bg-grey-soft" aria-hidden="true" />
                <span>
                  <span className="block text-sm font-bold text-ink">Name</span>
                  <span className="block text-xs text-muted">Company / vehicle</span>
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
