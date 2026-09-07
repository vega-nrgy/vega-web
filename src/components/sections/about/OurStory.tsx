import { Section } from "../../ui/Section";

export function OurStory() {
  return (
    <Section id="story" labelledBy="story-heading" className="bg-paper">
      <div className="mx-auto max-w-7xl px-6 pt-28 lg:px-8">
        {/* <p className="chapter-label border-t border-hairline pt-4.5">01 &mdash; OUR STORY</p> */}
        <div className="mt-7 grid gap-16 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <div>
            <h2
              id="story-heading"
              className="font-display text-4xl font-semibold tracking-[-0.03em] text-ink"
            >
              Why we started.
            </h2>
            <div className="mt-5 max-w-xl space-y-4.5 text-base leading-[1.7] text-ink-soft">
              <p>
                For long-distance EV travel, the question is not simply whether a
                charger exists on a map.
              </p>
              <p>
                Drivers need the right charger in the right location, with
                dependable power, working equipment, support and a place to stop
                comfortably.
              </p>
            </div>
            <p className="mt-7 border-l-2 border-mint pl-5 font-display text-2xl font-semibold leading-[1.3] tracking-[-0.015em] text-ink">
              We started Vega Charge to build that complete highway charging
              experience.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-media">
            <img
              src="/media/Charger_.png"
              alt="Vega Charge fast-charging unit"
              className="h-[400px] w-full object-cover"
            />
            <span className="absolute bottom-3.5 left-4 rounded-md bg-ink/55 px-2.5 py-1.5 font-mono text-[9px] tracking-[0.1em] text-white">
              NH-65 &middot; KM 128
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}
