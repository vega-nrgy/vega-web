import { Hero } from '../components/hero/Hero'
import { StatsStrip } from '../components/sections/StatsStrip'
import { NetworkMap } from '../components/sections/NetworkMap'
import { ProblemStrip } from '../components/sections/ProblemStrip'
import { ValueProps } from '../components/sections/ValueProps'
import { FeaturedStations } from '../components/sections/FeaturedStations'
import { StationExperience } from '../components/sections/StationExperience'
import { SolutionsIndex } from '../components/sections/SolutionsIndex'
import { ExpansionVision } from '../components/sections/ExpansionVision'
import { SitePartnership } from '../components/sections/SitePartnership'
import { FleetPartnership } from '../components/sections/FleetPartnership'
import { TechnologyTrust } from '../components/sections/TechnologyTrust'
import { AboutTeaser } from '../components/sections/AboutTeaser'
// import { Testimonial } from '../components/sections/Testimonial'
import { FooterCta } from '../components/sections/FooterCta'
import { usePageMeta } from '../hooks/usePageMeta'

export function HomePage() {
  usePageMeta({
    title: "Vega Charge — India's Highway EV Fast-Charging Network",
    description:
      "Vega Charge is India's highway EV fast-charging network — 120 kW and 240 kW DC fast charging, multi-standard connectors, built for range, reliability, and the road ahead.",
    path: '/',
  })

  return (
    <>
      <Hero />
      <StatsStrip />
      <NetworkMap />
      <ProblemStrip />
      <ValueProps />
      <FeaturedStations />
      <StationExperience />
      <SolutionsIndex />
      <ExpansionVision />
      <SitePartnership />
      <FleetPartnership />
      <TechnologyTrust />
      <AboutTeaser />
      {/* <Testimonial /> */}
      <FooterCta />
    </>
  )
}
