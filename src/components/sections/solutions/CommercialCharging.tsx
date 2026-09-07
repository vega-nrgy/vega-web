import { Section } from "../../ui/Section";

// Doc's Section 6 "Commercial Charging" checklist, used verbatim. Revenue
// share is explicitly a per-project commercial term in the doc, not a
// standing offer — dropped rather than promised to every host.
const CHECKLIST = [
  "Site and demand assessment",
  "AC/DC charger mix recommendation",
  "Installation and commissioning",
  "Monitoring and operations options",
  "Commercial models based on project structure",
];

const AUDIENCE = [
  "Hotels & Resorts",
  "Fuel Stations",
  "Shopping Centres",
  "Highway Dhabas & Rest Stops",
  "Commercial Complexes",
];

export function CommercialCharging() {
  return (
    <Section
      id="commercial"
      labelledBy="commercial-heading"
      className="mt-28 scroll-mt-24 bg-grey-soft"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        {/* <p className="chapter-label">02 &mdash; COMMERCIAL CHARGING</p> */}
        <h2
          id="story-heading"
          className="font-display text-4xl font-semibold tracking-[-0.03em] text-ink"
        >
          Commercial Charging.
        </h2>
        <div className="mt-7 grid gap-16 lg:grid-cols-[1.15fr_1fr] lg:items-stretch">
          <div>
            <h2
              id="commercial-heading"
              className="font-display text-[38px] font-semibold leading-[1.12] tracking-[-0.03em] text-ink"
            >
              Turn the right destination into a charging destination.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              For hotels, restaurants, commercial properties, fuel/energy sites and
              highway businesses, Vega Charge can evaluate the charging opportunity
              and structure a solution around dwell time, traffic, power availability
              and commercial objectives.
            </p>
            <ul className="mt-6 border-t border-[#dce4e3]">
              {CHECKLIST.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 border-b border-[#dce4e3] py-3 text-[13.5px] font-medium leading-relaxed text-ink-soft"
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
                  className="rounded-full bg-white px-3.5 py-2 text-[11.5px] font-semibold text-ink-soft"
                >
                  {label}
                </li>
              ))}
            </ul>
            <a
              href="#enquiry"
              className="mt-6.5 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 font-sans text-sm font-bold text-white transition-colors hover:bg-ink/90"
            >
              Discuss a Commercial Site &rarr;
            </a>
          </div>
          <div className="relative overflow-hidden rounded-media">
            <img
              src="/media/Charger_.png"
              alt="Vega Charge commercial charging unit at a partner site"
              className="h-full min-h-[420px] w-full object-cover"
            />
            <span className="absolute bottom-3.5 left-4 rounded-md bg-ink/55 px-2.5 py-1.5 font-mono text-[9px] tracking-[0.1em] text-white">
              PARTNER SITE
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}
