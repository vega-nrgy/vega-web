import { PageIntro } from "../components/ui/PageIntro";
import { CtaBanner } from "../components/ui/CtaBanner";
import { Section } from "../components/ui/Section";
import { StationMap } from "../components/sections/network/StationMap";
import { StationFeatures } from "../components/sections/network/StationFeatures";
import { FlagshipStation } from "../components/sections/network/FlagshipStation";
import { StationList } from "../components/sections/network/StationList";
import { usePageMeta } from "../hooks/usePageMeta";
import { buildStationSchema } from "../lib/seo";
import { getStationBySlug } from "../lib/stations";

const NARKETPALLY = getStationBySlug("narketpally")!;

export function NetworkPage() {
  usePageMeta({
    title: "Our Network — Highway EV Charging Stations | Vega Charge",
    description:
      "Explore Vega Charge's growing network of highway EV charging stations across Telangana and Andhra Pradesh, including the flagship Narketpalle station on NH-65.",
    path: "/network",
    jsonLd: buildStationSchema({
      name: "Narketpally",
      id: NARKETPALLY.id,
      addressLocality: "Narketpally",
      addressRegion: "Telangana",
      lat: NARKETPALLY.lat,
      lng: NARKETPALLY.lng,
      amenityFeature: [
        "Waiting lounge",
        "Washrooms",
        "Children's play area",
        "Café & retail",
        "24×7 staffed",
      ],
    }),
  });

  return (
    <>
      <PageIntro
        eyebrow="OUR NETWORK"
        heading="Charging stops built for the road — and the driver."
      >
        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted">
          Every Vega Charge station is more than a power socket on a highway.
          It&rsquo;s a rest stop, a service point, and a community hub &mdash;
          built to global standards, designed for Indian conditions.
        </p>
      </PageIntro>

      <Section id="map" labelledBy="map-heading" className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 pt-14 lg:px-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 id="map-heading" className="chapter-label">
              STATION LOCATIONS &middot; TAP A PIN
            </h2>
            <p className="font-mono text-[10px] tracking-[0.1em] text-muted-onink">
              PINS INDICATIVE &mdash; POPUPS LINK EXACT GOOGLE MAPS LOCATIONS
            </p>
          </div>
          <div className="mt-5">
            <StationMap />
          </div>
          <div className="mt-4 flex flex-wrap gap-6">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full border-2 border-white bg-mint shadow-[0_0_0_1px_rgba(0,217,165,0.9)]" />
              <span className="text-[11.5px] text-muted">
                Opening 2026 &mdash; site secured
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full border-2 border-white bg-muted-onink shadow-[0_0_0_1px_rgba(157,180,176,0.9)]" />
              <span className="text-[11.5px] text-muted">
                In land acquisition
              </span>
            </div>
          </div>
        </div>
      </Section>

      <StationFeatures />
      <FlagshipStation />
      <StationList />

      <Section
        id="network-cta"
        labelledBy="network-cta-heading"
        className="bg-paper"
      >
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
          <CtaBanner
            headingId="network-cta-heading"
            heading="Own highway-adjacent land?"
            body="Partner with us to host a Vega Charge station on your site."
            buttons={[
              { href: "/partner?type=site", label: "Host a Station", variant: "mint" },
            ]}
          />
        </div>
      </Section>
    </>
  );
}
