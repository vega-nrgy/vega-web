import type { Ref } from 'react'
import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

const INTRO_IN_AT = 0.02
const INTRO_OUT_AT = 0.28
const LEFT_CARD_AT = 0.4
const REALLY_FAST_AT = 0.5
const RIGHT1_AT = 0.58
const RIGHT2_AT = 0.72

const CARD_HOVER =
  'transition-[opacity,transform,box-shadow] duration-500 ease-out hover:-translate-y-0.5 hover:shadow-lift'

const LeftCardBody = ({ reallyFastRef }: { reallyFastRef?: Ref<HTMLSpanElement> }) => (
  <>
    <div>
      <h3 className="font-display text-3xl font-semibold tracking-[-0.025em] text-ink">
        <span className="inline-block">Fast.</span>{' '}
        <span ref={reallyFastRef} className="inline-block opacity-0 transition-opacity duration-500 ease-out">
          Really fast.
        </span>
      </h3>
      <p className="mt-4 max-w-[420px] leading-relaxed text-muted">
        180 kW DC fast chargers that add 100&ndash;150 km of range in under 30
        minutes. Charge while you rest &mdash; and leave before your chai gets
        cold.
      </p>
    </div>
    <p className="flex items-baseline gap-2.5 tabular-nums">
      <span className="font-sans text-6xl font-extrabold tracking-[-0.03em] text-ink">150</span>
      <span className="font-sans text-sm font-semibold text-muted">km of range in 30 min</span>
    </p>
  </>
)

/* Self-contained pinned/staged section, independent of Hero/ProblemStrip's
   own pins: "Why Vega Charge?" fades in then vanishes, then the existing
   grid reveals scroll-scrubbed — left card first (with "Fast." then "Really
   fast." staged within it), then the two right-hand cards. Reduced motion
   gets the plain static grid instead, no intro heading. */
export function ValueProps() {
  const reduced = useReducedMotion()
  const pinRef = useRef<HTMLElement>(null)
  const introRef = useRef<HTMLHeadingElement>(null)
  const leftCardRef = useRef<HTMLDivElement>(null)
  const reallyFastRef = useRef<HTMLSpanElement>(null)
  const rightCard1Ref = useRef<HTMLDivElement>(null)
  const rightCard2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduced) return

    function onScroll() {
      const pin = pinRef.current
      if (!pin) return

      const rect = pin.getBoundingClientRect()
      const total = pin.offsetHeight - window.innerHeight
      const scrolled = Math.min(Math.max(-rect.top, 0), total)
      const progress = total > 0 ? scrolled / total : 0

      if (introRef.current) {
        const shown = progress >= INTRO_IN_AT && progress < INTRO_OUT_AT
        introRef.current.style.opacity = shown ? '1' : '0'
      }

      if (leftCardRef.current) {
        const shown = progress >= LEFT_CARD_AT
        leftCardRef.current.style.opacity = shown ? '1' : '0'
        leftCardRef.current.style.transform = shown ? 'translateY(0)' : 'translateY(16px)'
      }

      if (reallyFastRef.current) {
        reallyFastRef.current.style.opacity = progress >= REALLY_FAST_AT ? '1' : '0'
      }

      if (rightCard1Ref.current) {
        const shown = progress >= RIGHT1_AT
        rightCard1Ref.current.style.opacity = shown ? '1' : '0'
        rightCard1Ref.current.style.transform = shown ? 'translateY(0)' : 'translateY(16px)'
      }

      if (rightCard2Ref.current) {
        const shown = progress >= RIGHT2_AT
        rightCard2Ref.current.style.opacity = shown ? '1' : '0'
        rightCard2Ref.current.style.transform = shown ? 'translateY(0)' : 'translateY(16px)'
      }
    }

    onScroll()
    document.addEventListener('scroll', onScroll, { passive: true })
    return () => document.removeEventListener('scroll', onScroll)
  }, [reduced])

  if (reduced) {
    return (
      <section id="why" aria-labelledby="why-heading" className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-30 lg:px-8">
          <p className="chapter-label border-t border-hairline pt-4.5">02 &mdash; WHY VEGA CHARGE</p>
          <h2 id="why-heading" className="sr-only">
            Why Vega Charge?
          </h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.55fr_1fr]">
            <div className={`flex min-h-[340px] flex-col justify-between rounded-card bg-grey-soft p-10 ${CARD_HOVER}`}>
              <div>
                <h3 className="font-display text-3xl font-semibold tracking-[-0.025em] text-ink">Fast. Really fast.</h3>
                <p className="mt-4 max-w-[420px] leading-relaxed text-muted">
                  180 kW DC fast chargers that add 100&ndash;150 km of range in under 30
                  minutes. Charge while you rest &mdash; and leave before your chai gets
                  cold.
                </p>
              </div>
              <p className="flex items-baseline gap-2.5 tabular-nums">
                <span className="font-sans text-6xl font-extrabold tracking-[-0.03em] text-ink">150</span>
                <span className="font-sans text-sm font-semibold text-muted">km of range in 30 min</span>
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className={`flex-1 rounded-card border border-hairline bg-white p-7 ${CARD_HOVER}`}>
                <h3 className="font-display text-xl font-semibold tracking-[-0.015em] text-ink">Every EV. Every time.</h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">
                  CCS2, CHAdeMO, and Bharat DC-001 support. One stop for every major EV on
                  Indian roads today.
                </p>
              </div>
              <div className={`flex-1 rounded-card border border-hairline bg-white p-7 ${CARD_HOVER}`}>
                <h3 className="font-display text-xl font-semibold tracking-[-0.015em] text-ink">Built for the highway.</h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">
                  Not a parking-lot charger. Waiting lounge, clean washrooms, children&rsquo;s
                  play area &mdash; because the driver matters too.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="why" ref={pinRef} aria-labelledby="why-heading" className="relative h-[280svh] bg-paper">
      <div className="sticky top-0 flex h-svh w-full flex-col overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-6 pt-20 lg:px-8 lg:pt-30">
          <p className="chapter-label border-t border-hairline pt-4.5">02 &mdash; WHY VEGA CHARGE</p>
        </div>

        <div className="mx-auto grid w-full max-w-7xl flex-1 items-start justify-items-center px-6 lg:items-center lg:px-8">
          <h2
            ref={introRef}
            id="why-heading"
            className="col-start-1 row-start-1 justify-self-start font-display text-4xl font-semibold tracking-[-0.03em] text-ink opacity-0 transition-opacity duration-500 ease-out sm:text-5xl"
          >
            Why Vega Charge?
          </h2>

          <div className="col-start-1 row-start-1 grid w-full gap-4 lg:gap-6 lg:grid-cols-[1.55fr_1fr]">
            <div
              ref={leftCardRef}
              className={`flex min-h-[300px] flex-col justify-between rounded-card bg-grey-soft p-7 opacity-0 lg:min-h-[340px] lg:p-10 ${CARD_HOVER}`}
            >
              <LeftCardBody reallyFastRef={reallyFastRef} />
            </div>

            <div className="flex flex-col gap-6">
              <div
                ref={rightCard1Ref}
                className={`flex-1 rounded-card border border-hairline bg-white p-7 opacity-0 ${CARD_HOVER}`}
              >
                <h3 className="font-display text-xl font-semibold tracking-[-0.015em] text-ink">Every EV. Every time.</h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">
                  CCS2, CHAdeMO, and Bharat DC-001 support. One stop for every major EV on
                  Indian roads today.
                </p>
              </div>
              <div
                ref={rightCard2Ref}
                className={`flex-1 rounded-card border border-hairline bg-white p-7 opacity-0 ${CARD_HOVER}`}
              >
                <h3 className="font-display text-xl font-semibold tracking-[-0.015em] text-ink">Built for the highway.</h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">
                  Not a parking-lot charger. Waiting lounge, clean washrooms, children&rsquo;s
                  play area &mdash; because the driver matters too.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
