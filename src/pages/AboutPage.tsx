import { PageIntro } from "../components/ui/PageIntro";
import { CtaBanner } from "../components/ui/CtaBanner";
import { Section } from "../components/ui/Section";
import { OurStory } from "../components/sections/about/OurStory";
import { VisionMission } from "../components/sections/about/VisionMission";
// import { BrandDistinction } from "../components/sections/about/BrandDistinction";
import { Team } from "../components/sections/about/Team";
import { usePageMeta } from "../hooks/usePageMeta";

export function AboutPage() {
  usePageMeta({
    title: "About Vega Charge | Building Highway EV Infrastructure",
    description:
      "Learn how Vega Charge is building high-power EV charging infrastructure across India's highway corridors.",
    path: "/about",
  });

  return (
    <>
      <PageIntro
        eyebrow=""
        // eyebrow="ABOUT US · VEGA CHARGE PRIVATE LIMITED"
        heading="Building the highway infrastructure electric mobility needs."
      >
        <div className="mt-9 grid max-w-5xl gap-12 sm:grid-cols-2">
          <p className="text-[17px] leading-relaxed text-ink-soft">
            Vega Charge is a technology-led EV charging infrastructure company
            developing high-power charging hubs along India&rsquo;s highway
            corridors.
          </p>
          <p className="text-[17px] leading-relaxed text-muted">
            We are starting with routes in Telangana and Andhra Pradesh and
            building a repeatable model for reliable inter-city charging.
          </p>
        </div>
      </PageIntro>

      <OurStory />
      <VisionMission />
      {/* <BrandDistinction /> */}
      <Team />

      <Section
        id="about-cta"
        labelledBy="about-cta-heading"
        className="bg-paper"
      >
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
          <CtaBanner
            headingId="about-cta-heading"
            heading="Building a site, operating a fleet or exploring a strategic partnership? Let’s talk."
            buttons={[
              {
                href: "/partner",
                label: "Partner With Vega Charge",
                variant: "mint",
              },
            ]}
          />
        </div>
      </Section>
    </>
  );
}
