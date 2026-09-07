import { Section } from "../../ui/Section";

const CARDS = [
  {
    label: "VISION",
    body: "To build one of India's most trusted highway EV charging networks, enabling electric mobility to move confidently between cities.",
  },
  {
    label: "MISSION",
    body: "To develop strategically located, high-power charging hubs with dependable operations, driver amenities and scalable infrastructure for passenger and commercial EVs.",
  },
];

// Doc's Section 4 "How we build" list, used verbatim.
const HOW_WE_BUILD = [
  {
    title: "Corridor analysis",
    body: "Traffic, EV adoption, route gaps and competitive supply.",
  },
  {
    title: "Site selection",
    body: "Access, visibility, frontage, turning movement and expansion potential.",
  },
  {
    title: "Power planning",
    body: "Sanctioned load, HT feasibility, charger mix and future capacity.",
  },
  {
    title: "Hub design",
    body: "Charging circulation, safety, waiting, washrooms, food/retail and commercial-vehicle needs.",
  },
  {
    title: "Technology",
    body: "Connected chargers, monitoring, payment systems and operational data.",
  },
  {
    title: "Operations",
    body: "Preventive maintenance, support, uptime measurement and site management.",
  },
];

export function VisionMission() {
  return (
    <Section
      id="drives-us"
      labelledBy="drives-us-heading"
      className="mt-28 bg-grey-soft"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        {/* <h2 id="drives-us-heading" className="chapter-label">
          02 &mdash; WHAT DRIVES US
        </h2> */}
        <h2
          id="story-heading"
          className="font-display text-4xl font-semibold tracking-[-0.03em] text-ink"
        >
          What Drives Us.
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {CARDS.map(({ label, body }) => (
            <div
              key={label}
              className="rounded-card bg-white p-9 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift"
            >
              <p className="font-mono text-[9.5px] tracking-[0.14em] text-mint-deep">
                {label}
              </p>
              <p className="mt-3.5 font-display text-[19px] font-medium leading-[1.55] tracking-[-0.01em] text-ink">
                {body}
              </p>
            </div>
          ))}
        </div>

        <h3 className="mt-16 font-display text-2xl font-semibold tracking-[-0.02em] text-ink">
          How we build.
        </h3>
        <ul className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HOW_WE_BUILD.map(({ title, body }) => (
            <li key={title} className="border-t-2 border-mint pt-4">
              <span className="block font-display text-[15px] font-semibold text-ink">
                {title}
              </span>
              <span className="mt-1 block text-[13px] leading-relaxed text-muted">
                {body}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
