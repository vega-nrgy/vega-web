import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { fadeOnly, fadeUp, staggerChildren, VIEWPORT } from '../../lib/variants'

function BoltIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-10 w-10 sm:h-11 sm:w-11"
      aria-hidden="true"
    >
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
  )
}

function SignalIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-10 w-10 sm:h-11 sm:w-11"
      aria-hidden="true"
    >
      <circle cx="12" cy="19" r="1.2" fill="currentColor" stroke="none" />
      <path d="M8 15.5a5.5 5.5 0 0 1 8 0" />
      <path d="M5 12a9 9 0 0 1 14 0" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-10 w-10 sm:h-11 sm:w-11"
      aria-hidden="true"
    >
      <path d="M12 21s7-7.58 7-12a7 7 0 1 0-14 0c0 4.42 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.3" />
    </svg>
  )
}

function FleetIcon() {
  return (
    <span className="flex items-center gap-1.5">
      <svg
        viewBox="0 0 24 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-9 w-9 sm:h-10 sm:w-10"
        aria-hidden="true"
      >
        <path d="M2 11.5 3.3 7A1.7 1.7 0 0 1 5 5.8h9.4A1.7 1.7 0 0 1 16 7l1.3 4.5" />
        <rect x="1.5" y="11.5" width="16" height="2.3" rx="0.8" />
        <circle cx="5.5" cy="14.5" r="1.3" />
        <circle cx="13.5" cy="14.5" r="1.3" />
      </svg>
      <svg
        viewBox="0 0 24 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-9 w-9 sm:h-10 sm:w-10"
        aria-hidden="true"
      >
        <rect x="1.5" y="4" width="10" height="8" rx="0.8" />
        <path d="M11.5 7h4l3.5 3v2h-7.5" />
        <circle cx="5" cy="14.3" r="1.3" />
        <circle cx="16" cy="14.3" r="1.3" />
      </svg>
    </span>
  )
}

/* Website audit §"Proof strip": until live operational metrics exist
   (Stations Live, Sessions, Energy Delivered, Uptime), use capability/status
   facts rather than animated vanity counters. Doc's own example — "High-power
   DC charging | 24×7 monitored operations | Highway-first locations |
   Passenger + fleet ready" — used near-verbatim below, with the first item
   made concrete using the finalized 120/240 kW charger config. */
const FACTS: { icon: ReactNode; label: string }[] = [
  { icon: <BoltIcon />, label: '120–240 kW DC charging' },
  { icon: <SignalIcon />, label: '24×7 monitored operations' },
  { icon: <PinIcon />, label: 'Highway-first locations' },
  { icon: <FleetIcon />, label: 'Passenger + fleet ready' },
]

export function StatsStrip() {
  const reduced = useReducedMotion()
  const item = reduced ? fadeOnly : fadeUp

  return (
    <motion.section
      id="stats"
      aria-label="Station capabilities"
      className="bg-grey-soft"
      variants={reduced ? fadeOnly : staggerChildren(0, 0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-4">
          {FACTS.map(({ icon, label }) => (
            <motion.div key={label} variants={item} className="flex flex-col items-center text-center">
              <span className="flex h-11 items-center justify-center text-mint-deep sm:h-12">{icon}</span>
              <p className="mt-4 max-w-[9.5rem] font-display text-sm font-semibold text-ink sm:text-base">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
