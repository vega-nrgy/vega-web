import { PageIntro } from '../components/ui/PageIntro'
import { Section } from '../components/ui/Section'
import { PartnerForm } from '../components/sections/partner/PartnerForm'
import { WhyVegaNrgy } from '../components/sections/contact/WhyVegaNrgy'
import { usePageMeta } from '../hooks/usePageMeta'

export function PartnerPage() {
  usePageMeta({
    title: 'Partner With Us — Fleet, Site & Investor Partnerships | Vega Charge',
    description:
      "Host a Vega Charge station on your land, bring your fleet onto our network, or explore investing in India's highway EV charging infrastructure.",
    path: '/partner',
  })

  return (
    <>
      <PageIntro eyebrow="PARTNER WITH US" heading="Build the next highway charging corridor with us.">
        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted">
          Whether you operate a fleet, own a strategic site, run a commercial destination or want
          to explore a strategic relationship, choose the path that best describes you.
        </p>
      </PageIntro>

      <Section id="partner-form" labelledBy="page-heading" className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 pt-18 lg:px-8">
          <PartnerForm />
        </div>
      </Section>

      <Section id="why-vega-nrgy" labelledBy="why-heading" className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
          <p className="chapter-label border-t border-hairline pt-4.5">WHY VEGA CHARGE</p>
          <WhyVegaNrgy />
        </div>
      </Section>
    </>
  )
}
