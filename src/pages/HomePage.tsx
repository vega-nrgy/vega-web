import { Hero } from '../components/hero/Hero'
import { ProblemStrip } from '../components/sections/ProblemStrip'
import { ValueProps } from '../components/sections/ValueProps'
import { NetworkMap } from '../components/sections/NetworkMap'
import { SolutionsIndex } from '../components/sections/SolutionsIndex'
import { StationExperience } from '../components/sections/StationExperience'
import { StatsStrip } from '../components/sections/StatsStrip'
// import { Testimonial } from '../components/sections/Testimonial'
import { FooterCta } from '../components/sections/FooterCta'
import { usePageMeta } from '../hooks/usePageMeta'

export function HomePage() {
  usePageMeta({
    title: "Vega Charge — India's Highway EV Fast-Charging Network",
    description:
      "Vega Charge is India's highway EV fast-charging network — 180 kW DC fast charging, multi-standard connectors, built for range, reliability, and the road ahead.",
    path: '/',
  })

  return (
    <>
      <Hero />
      <StatsStrip />
      <ProblemStrip />
      <ValueProps />
      <NetworkMap />
      <SolutionsIndex />
      <StationExperience />
      {/* <Testimonial /> */}
      <FooterCta />
    </>
  )
}
