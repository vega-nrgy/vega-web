import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { useIsDesktop } from "../../hooks/useIsDesktop";

function BoltShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[22px] w-[22px]"
      aria-hidden="true"
    >
      <path d="M12 2 4.5 5v6c0 4.6 3.2 8.9 7.5 10 4.3-1.1 7.5-5.4 7.5-10V5L12 2z" />
      <path d="m13 7-3.5 5H12l-1 5 3.5-5H12l1-5z" />
    </svg>
  );
}

function ConnectorIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[22px] w-[22px]"
      aria-hidden="true"
    >
      <rect x="6" y="8" width="12" height="11" rx="3" />
      <path d="M9 8V4.5M15 8V4.5M12 19v3" />
      <circle cx="9.5" cy="12" r="0.8" fill="currentColor" />
      <circle cx="14.5" cy="12" r="0.8" fill="currentColor" />
      <circle cx="12" cy="15.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

function HighwayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[22px] w-[22px]"
      aria-hidden="true"
    >
      <path d="M4 20 10 4M20 20 14 4M9 12h6" />
    </svg>
  );
}

const POINTS: { icon: ReactNode; title: string; body: string }[] = [
  {
    icon: <BoltShieldIcon />,
    title: "Reliable fast charging",
    body: "180–240 kW DC, monitored and maintained 24×7.",
  },
  {
    icon: <ConnectorIcon />,
    title: "Multi-standard connectors",
    body: "One stop for every major EV on Indian roads.",
  },
  {
    icon: <HighwayIcon />,
    title: "Designed for Indian highways",
    body: "Sited on real corridors, built for real journeys.",
  },
];

const HEADING_IN_AT = 0.02;
const COPY_IN_AT = 0.18;
const SWAP_AT = 0.45;
const LIFT_AT = 0.5;
const CARD_AT = [0.55, 0.75, 0.85];

const HEADING_CLASS =
  "font-display text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl";

const Copy = () => (
  <>
    <p className="text-base leading-relaxed">
      Range anxiety is the #1 reason India&rsquo;s EV adoption lags on highways.
      Not the cars. Not the cost.{" "}
      <strong className="text-ink">The infrastructure.</strong>
    </p>
    <p className="mt-4 text-base leading-relaxed">
      Vega Charge is fixing that &mdash; one corridor at a time.
    </p>
  </>
);

/* Self-contained pinned/staged section, independent of the Hero's own pin:
   heading reads "The Problem", the copy appears below it, the heading then
   swaps in place to "Drive without doubt.", the whole text block lifts to
   make room, and the three points stagger in one after another underneath.
   Reduced motion gets a plain static stack instead. */
export function ProblemStrip() {
  const reduced = useReducedMotion();
  const isDesktop = useIsDesktop();
  const pinRef = useRef<HTMLElement>(null);
  const textWrapRef = useRef<HTMLDivElement>(null);
  const headingARef = useRef<HTMLHeadingElement>(null);
  const headingBRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const pointRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (reduced || !isDesktop) return;

    function onScroll() {
      const pin = pinRef.current;
      if (!pin) return;

      const rect = pin.getBoundingClientRect();
      const total = pin.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = total > 0 ? scrolled / total : 0;

      const swapped = progress >= SWAP_AT;
      if (headingARef.current)
        headingARef.current.style.opacity =
          progress >= HEADING_IN_AT && !swapped ? "1" : "0";
      if (headingBRef.current)
        headingBRef.current.style.opacity = swapped ? "1" : "0";

      if (copyRef.current) {
        const shown = progress >= COPY_IN_AT;
        copyRef.current.style.opacity = shown ? "1" : "0";
        copyRef.current.style.transform = shown
          ? "translateY(0)"
          : "translateY(10px)";
      }

      if (textWrapRef.current) {
        textWrapRef.current.style.transform =
          progress >= LIFT_AT ? "translateY(-44px)" : "translateY(0)";
      }

      pointRefs.current.forEach((el, i) => {
        if (!el) return;
        const shown = progress >= CARD_AT[i];
        el.style.opacity = shown ? "1" : "0";
        el.style.transform = shown ? "translateY(0)" : "translateY(16px)";
      });
    }

    onScroll();
    document.addEventListener("scroll", onScroll, { passive: true });
    return () => document.removeEventListener("scroll", onScroll);
  }, [reduced, isDesktop]);

  if (reduced || !isDesktop) {
    return (
      <section
        id="problem"
        aria-labelledby="problem-heading"
        className="bg-paper"
      >
        <div className="mx-auto max-w-7xl px-6 py-30 lg:px-8">
          <p className="chapter-label border-t border-hairline pt-4.5">
            01 &mdash; THE PROBLEM
          </p>
          <div className="mt-7 max-w-3xl">
            <h2 id="problem-heading" className={HEADING_CLASS}>
              Drive without doubt.
            </h2>
            <div className="mt-7 max-w-2xl">
              <Copy />
            </div>
          </div>
          <ul className="mt-14 grid gap-6 sm:grid-cols-3">
            {POINTS.map(({ icon, title, body }) => (
              <li
                key={title}
                className="flex items-start gap-3.5 border-t-2 border-mint pt-4"
              >
                <span className="mt-0.5 shrink-0 text-ink">{icon}</span>
                <span>
                  <span className="block font-display text-[15px] font-semibold text-ink">
                    {title}
                  </span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-muted">
                    {body}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section
      id="problem"
      ref={pinRef}
      aria-labelledby="problem-heading"
      className="relative h-[320svh] bg-paper"
    >
      <div className="sticky top-0 flex h-svh w-full flex-col overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-6 pt-30 lg:px-8">
          <p className="chapter-label border-t border-hairline pt-4.5">
            01 &mdash; THE PROBLEM
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 lg:px-8">
          <div
            ref={textWrapRef}
            className="max-w-3xl transition-transform duration-700 ease-out"
          >
            <div className="grid">
              <h2
                id="problem-heading"
                ref={headingARef}
                className={`col-start-1 row-start-1 opacity-0 transition-opacity duration-500 ease-out ${HEADING_CLASS}`}
              >
                The Problem
              </h2>
              <h2
                aria-hidden="true"
                ref={headingBRef}
                className={`col-start-1 row-start-1 opacity-0 transition-opacity duration-500 ease-out ${HEADING_CLASS}`}
              >
                Drive without doubt.
              </h2>
            </div>

            <div
              ref={copyRef}
              className="mt-7 max-w-2xl opacity-0 transition-all duration-500 ease-out"
            >
              <Copy />
            </div>
          </div>

          <ul className="mt-14 grid w-full gap-6 sm:grid-cols-3">
            {POINTS.map(({ icon, title, body }, i) => (
              <li
                key={title}
                ref={(el) => {
                  pointRefs.current[i] = el;
                }}
                className="flex items-start gap-3.5 border-t-2 border-mint pt-4 opacity-0 transition-all duration-500 ease-out"
              >
                <span className="mt-0.5 shrink-0 text-ink">{icon}</span>
                <span>
                  <span className="block font-display text-[15px] font-semibold text-ink">
                    {title}
                  </span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-muted">
                    {body}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
