import { Section } from "../../ui/Section";

const CHECKLIST = [
  "AC & DC fast chargers tailored to your location and footfall",
  "End-to-end installation, operation, and maintenance",
  "Real-time monitoring and remote diagnostics",
  "Revenue-sharing models for host businesses",
  "Branded charging experience aligned to your establishment",
];

const AUDIENCE = [
  "Hotels & Resorts",
  "Fuel Stations",
  "Shopping Centres",
  "Highway Dhabas & Rest Stops",
  "Commercial Complexes",
];

const STRIPE_STYLE = {
  backgroundImage:
    "repeating-linear-gradient(-45deg, #e2eae9 0 16px, #e8efee 16px 32px)",
} as const;

export function CommercialCharging() {
  return (
    <Section
      id="commercial"
      labelledBy="commercial-heading"
      className="mt-28 scroll-mt-24 bg-grey-soft"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <p className="chapter-label">02 &mdash; COMMERCIAL CHARGING</p>
        <div className="mt-7 grid gap-16 lg:grid-cols-[1.15fr_1fr] lg:items-stretch">
          <div>
            <h2
              id="commercial-heading"
              className="font-display text-[38px] font-semibold leading-[1.12] tracking-[-0.03em] text-ink"
            >
              Power your business. Charge smarter.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              For businesses looking to offer EV charging as a value-added
              service &mdash; whether you own a hotel, restaurant, mall, fuel
              station, or any commercial establishment along a highway corridor.
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
              Let's Grow Together &rarr;
            </a>
          </div>
          <div className="relative overflow-hidden rounded-media">
            <div
              style={STRIPE_STYLE}
              className="flex h-full min-h-[420px] items-center justify-center"
            >
              <span className="text-center font-mono text-[10.5px] tracking-[0.1em] text-muted">
                [ hotel / highway dhaba photo
                <br />
                &middot; charger in forecourt &middot; evening ]
              </span>
            </div>
            <span className="absolute bottom-3.5 left-4 rounded-md bg-ink/55 px-2.5 py-1.5 font-mono text-[9px] tracking-[0.1em] text-white">
              PARTNER SITE
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}
