import { Button } from "../../ui/Button";
import { Section } from "../../ui/Section";

// Doc's Section 6 "Highway Charging" checklist, used verbatim.
const CHECKLIST = [
  "High-power DC charging with site-specific configurations",
  "Multi-vehicle charging capability",
  "Connected monitoring and remote diagnostics",
  "Driver amenities at selected hub formats",
  "Scalable electrical and civil design for future demand",
];

export function HighwayCharging() {
  return (
    <Section
      id="highway"
      labelledBy="highway-heading"
      className="scroll-mt-24 bg-paper"
    >
      <div className="mx-auto max-w-7xl px-6 pt-28 lg:px-8">
        {/* <p className="chapter-label border-t border-hairline pt-4.5">01 &mdash; HIGHWAY CHARGING</p> */}
        <h2
          id="story-heading"
          className="font-display text-4xl font-semibold tracking-[-0.03em] text-ink"
        >
          Highway Charging.
        </h2>
        <div className="mt-7 grid gap-16 lg:grid-cols-[1fr_1.15fr] lg:items-stretch">
          <div className="relative overflow-hidden rounded-media">
            <img
              src="/media/renders/narketpally-render-p17.jpeg"
              alt="Highway charging station on NH-65"
              className="h-full min-h-[420px] w-full object-cover"
            />
            <span className="absolute bottom-3.5 left-4 rounded-md bg-ink/55 px-2.5 py-1.5 font-mono text-[9px] tracking-[0.1em] text-white">
              NH-65 &middot; NARKETPALLE
            </span>
          </div>
          <div>
            <h2
              id="highway-heading"
              className="text-balance font-display text-[38px] font-semibold leading-[1.12] tracking-[-0.03em] text-ink"
            >
              High-power charging where long-distance journeys need it.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              Our highway hubs combine strategically located DC charging with the
              operating support and amenities needed for dependable inter-city EV
              travel.
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
            <p className="mt-4.5 text-[12.5px] leading-relaxed text-muted">
              <strong className="text-ink">Where we are:</strong> NH-65
              (Vijayawada&ndash;Hyderabad corridor), with expansion planned
              across additional national highway corridors.
            </p>
            <Button href="/network" variant="ink" className="mt-6">
              Explore Our Network &rarr;
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
