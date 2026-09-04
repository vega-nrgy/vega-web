import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { fadeOnly, fadeUp, staggerChildren, VIEWPORT } from "../../lib/variants";

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

/* Doc's Section 4 "three pillars" — Strategic Locations / High-Power
   Charging / Reliable Operations — used verbatim. This also removes the
   old kW-figure mention (doc's own copy doesn't cite a number here). */
const POINTS: { icon: ReactNode; title: string; body: string }[] = [
  {
    icon: <HighwayIcon />,
    title: "Strategic Locations",
    body: "Selected around corridor demand, accessibility and power feasibility.",
  },
  {
    icon: <BoltShieldIcon />,
    title: "High-Power Charging",
    body: "Scalable DC infrastructure for shorter highway stops.",
  },
  {
    icon: <ConnectorIcon />,
    title: "Reliable Operations",
    body: "Monitored stations with on-ground and remote support.",
  },
];

const HEADING_CLASS =
  "font-display text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl";

const Copy = () => (
  <>
    <p className="text-base leading-relaxed">
      India&rsquo;s EV ecosystem is growing rapidly, but inter-city travel still
      depends on finding charging that is correctly located, powerful enough,
      available and supported.
    </p>
    <p className="mt-4 text-base leading-relaxed">
      Vega Charge is building highway hubs around the journey &mdash; not simply
      installing chargers wherever space is available.
    </p>
  </>
);

/* Animates in once when the section enters the viewport: chapter label,
   heading + copy, then the three points stagger in one after another on a
   fixed timer (no scroll-linked progress, no scroll lock). */
export function ProblemStrip() {
  const reduced = useReducedMotion();
  const item = reduced ? fadeOnly : fadeUp;

  return (
    <motion.section
      id="problem"
      aria-labelledby="problem-heading"
      className="bg-paper"
      variants={reduced ? fadeOnly : staggerChildren(0, 0.15)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      <div className="mx-auto max-w-7xl px-6 py-30 lg:px-8">
        <motion.p variants={item} className="chapter-label border-t border-hairline pt-4.5">
          02 &mdash; THE PROBLEM
        </motion.p>
        <motion.div variants={item} className="mt-7 max-w-3xl">
          <h2 id="problem-heading" className={HEADING_CLASS}>
            Long-distance EV travel needs dependable infrastructure.
          </h2>
          <div className="mt-7 max-w-2xl">
            <Copy />
          </div>
        </motion.div>
        <motion.ul variants={staggerChildren(0, 0.12)} className="mt-14 grid gap-6 sm:grid-cols-3">
          {POINTS.map(({ icon, title, body }) => (
            <motion.li
              key={title}
              variants={item}
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
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.section>
  );
}
