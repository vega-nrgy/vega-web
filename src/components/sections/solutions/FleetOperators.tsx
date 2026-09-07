import { Section } from "../../ui/Section";

// Doc's Section 6 "Fleet Charging" checklist, used verbatim — replaces the
// old list, which claimed a "real-time tracking dashboard" as a standing
// capability (it doesn't exist as a live product yet).
const CHECKLIST = [
  "Route and energy-demand assessment",
  "Dedicated or contracted charging arrangements where feasible",
  "High-power charging for reduced turnaround time",
  "Session and energy reporting",
  "Commercial plans based on volume and operating requirements",
];

const AUDIENCE = [
  "Logistics & Delivery",
  "Cab & Ride-share",
  "Corporate Transport",
  "Government & Municipal",
];

export function FleetOperators() {
  return (
    <Section
      id="fleet"
      labelledBy="fleet-heading"
      className="scroll-mt-24 bg-paper"
    >
      <div className="mx-auto max-w-7xl px-6 pt-28 lg:px-8">
        {/* <p className="chapter-label border-t border-hairline pt-4.5">03 &mdash; FLEET OPERATORS</p> */}
        <h2
          id="story-heading"
          className="font-display text-4xl font-semibold tracking-[-0.03em] text-ink"
        >
          Fleet Operators.
        </h2>
        <div className="mt-7 grid gap-16 lg:grid-cols-[1fr_1.15fr] lg:items-stretch">
          <div className="relative min-h-[420px] overflow-hidden rounded-media">
            <img
              src="/media/renders/narketpally-render-p06.jpeg"
              alt="Vega Charge station forecourt with multiple vehicles charging"
              className="h-full w-full object-cover"
            />
            <span className="absolute bottom-4 left-5 rounded-md bg-ink/55 px-2.5 py-1.5 font-mono text-[9.5px] tracking-[0.1em] text-white">
              NH-65 &middot; NARKETPALLE
            </span>
          </div>
          <div>
            <h2
              id="fleet-heading"
              className="font-display text-[38px] font-semibold leading-[1.12] tracking-[-0.03em] text-ink"
            >
              Charging designed around utilisation, routes and turnaround time.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              Vega Charge works with logistics, mobility, corporate and
              commercial fleets to plan charging around route coverage, vehicle
              schedules, energy requirements and operational uptime.
            </p>
            <ul className="mt-6 border-t border-hairline">
              {CHECKLIST.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 border-b border-hairline py-3 text-[13.5px] font-medium leading-relaxed text-ink-soft"
                >
                  <span className="font-extrabold text-mint-deep">
                    &#10003;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <ul className="mt-5 flex flex-wrap gap-2">
              {AUDIENCE.map((label) => (
                <li
                  key={label}
                  className="rounded-full bg-grey-soft px-3.5 py-2 text-[11.5px] font-semibold text-ink-soft"
                >
                  {label}
                </li>
              ))}
            </ul>
            <div className="mt-6.5 rounded-card bg-grey-soft px-6.5 py-6">
              <p className="font-display text-base font-semibold text-ink">
                Let&rsquo;s build your charging plan.
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                Route coverage, volume pricing, and dedicated bay agreements on
                the NH-65 corridor.
              </p>
              <a
                href="#enquiry"
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-mint px-5.5 py-3 font-sans text-[13.5px] font-bold text-ink transition-colors hover:bg-mint-bright"
              >
                Request a Fleet Discussion &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
