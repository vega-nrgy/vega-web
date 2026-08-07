import { PageIntro } from '../components/ui/PageIntro'
import { CtaBanner } from '../components/ui/CtaBanner'
import { Section } from '../components/ui/Section'
import { OurStory } from '../components/sections/about/OurStory'
import { VisionMission } from '../components/sections/about/VisionMission'
import { BrandDistinction } from '../components/sections/about/BrandDistinction'
import { Team } from '../components/sections/about/Team'
import { usePageMeta } from '../hooks/usePageMeta'

export function AboutPage() {
  usePageMeta({
    title: "About Us — Vega Nrgy Private Limited | Vega Charge",
    description:
      "Vega Nrgy Private Limited is building Vega Charge, India's highway EV fast-charging network — solving range anxiety across Telangana, Andhra Pradesh, and beyond.",
    path: '/about',
  })

  return (
    <>
      <PageIntro eyebrow="ABOUT US · VEGA NRGY PRIVATE LIMITED" heading="We're building the roads India's EVs deserve.">
        <div className="mt-9 grid max-w-5xl gap-12 sm:grid-cols-2">
          <p className="text-[17px] leading-relaxed text-ink-soft">
            Vega Nrgy Private Limited is a technology-led EV charging infrastructure company
            with a simple belief: that range anxiety on Indian highways is a solvable
            problem.
          </p>
          <p className="text-[17px] leading-relaxed text-muted">
            We&rsquo;re solving it with Vega Charge &mdash; a network of premium,
            multi-standard fast-charging stations designed for highway corridors across
            Telangana, Andhra Pradesh, and beyond.
          </p>
        </div>
      </PageIntro>

      <OurStory />
      <VisionMission />
      <BrandDistinction />
      <Team />

      <Section id="about-cta" labelledBy="about-cta-heading" className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
          <CtaBanner
            headingId="about-cta-heading"
            heading="Join us in building India's highway charging backbone."
            buttons={[{ href: '/contact', label: 'Partner with Us', variant: 'mint' }]}
          />
        </div>
      </Section>
    </>
  )
}
