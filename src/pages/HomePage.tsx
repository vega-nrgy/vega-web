import { Hero } from '../components/hero/Hero'
import { ProblemStrip } from '../components/sections/ProblemStrip'
import { ValueProps } from '../components/sections/ValueProps'
import { NetworkMap } from '../components/sections/NetworkMap'
import { SolutionsIndex } from '../components/sections/SolutionsIndex'
import { StationExperience } from '../components/sections/StationExperience'
import { StatsStrip } from '../components/sections/StatsStrip'
// import { Testimonial } from '../components/sections/Testimonial'
import { FooterCta } from '../components/sections/FooterCta'

export function HomePage() {
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
