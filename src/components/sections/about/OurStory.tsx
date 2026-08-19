import { Section } from "../../ui/Section";

const STRIPE_STYLE = {
  backgroundImage:
    "repeating-linear-gradient(-45deg, #edf2f3 0 16px, #f3f6f5 16px 32px)",
} as const;

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
                Drive an EV on a national highway in India today, and somewhere
                around the 150 km mark, a familiar fear kicks in.{" "}
                <em>
                  Is there a charger ahead? Will it work? What if I get stuck?
                </em>
              </p>
              <p>
                That question is what&rsquo;s holding back EV adoption &mdash;
                not the cars, not the prices, but the infrastructure gap on
                India&rsquo;s highways.
              </p>
              <p>
                We saw that gap on NH-65. Hundreds of kilometres. Almost no
                reliable fast-charging options. And a massive, growing fleet of
                EV drivers with nowhere to stop.
              </p>
            </div>
            <p className="mt-7 border-l-2 border-mint pl-5 font-display text-2xl font-semibold leading-[1.3] tracking-[-0.015em] text-ink">
              So we decided to build the stops.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-media">
            <div
              style={STRIPE_STYLE}
              className="flex h-[400px] items-center justify-center"
            >
              <span className="text-center font-mono text-[10.5px] tracking-[0.1em] text-muted">
                [ NH-65 highway photo
                <br />
                &middot; dusk &middot; desaturated ]
              </span>
            </div>
            <span className="absolute bottom-3.5 left-4 rounded-md bg-ink/55 px-2.5 py-1.5 font-mono text-[9px] tracking-[0.1em] text-white">
              NH-65 &middot; KM 128
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}
