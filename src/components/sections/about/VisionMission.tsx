import { Section } from "../../ui/Section";

const CARDS = [
  {
    label: "VISION",
    body: "To be India's No.1 technology-led EV charging network — making sustainable mobility seamless, accessible, and available to all.",
    emphasis: true,
  },
  {
    label: "MISSION",
    body: "To build India's most trusted EV charging network, empowering every driver to travel without doubt, across every road in India.",
    emphasis: true,
  },
  {
    label: "HOW WE DO IT",
    body: "By delivering transformative, affordable, and seamless charging solutions backed by trust and reliability — empowering every driver, every business, and every community to make the shift to electric mobility.",
    emphasis: false,
  },
  {
    label: "WHY WE DO IT",
    body: "This is beyond charging — it's a complete EV ecosystem rooted in global standards with real local impact, across urban and rural India alike. We're powering not just vehicles but a more sustainable future for generations to come.",
    emphasis: false,
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
          {CARDS.map(({ label, body, emphasis }) => (
            <div
              key={label}
              className="rounded-card bg-white p-9 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift"
            >
              <p className="font-mono text-[9.5px] tracking-[0.14em] text-mint-deep">
                {label}
              </p>
              <p
                className={
                  emphasis
                    ? "mt-3.5 font-display text-[19px] font-medium leading-[1.55] tracking-[-0.01em] text-ink"
                    : "mt-3.5 text-[15px] leading-relaxed text-ink-soft"
                }
              >
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
