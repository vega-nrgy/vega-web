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
      <PageIntro eyebrow="PARTNER WITH US" heading="Let's build this together.">
        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted">
          Whether you own highway-adjacent land, run a fleet that needs reliable charging, or want
          to back India&rsquo;s highway EV infrastructure &mdash; tell us a bit more below, and
          our team will follow up directly.
        </p>
      </PageIntro>

      <Section id="partner-form" labelledBy="page-heading" className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 pt-18 lg:px-8">
          <PartnerForm />
        </div>
      </Section>

      <Section id="why-vega-nrgy" labelledBy="why-heading" className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
          <p className="chapter-label border-t border-hairline pt-4.5">WHY VEGA NRGY</p>
          <WhyVegaNrgy />
        </div>
      </Section>
    </>
  )
}
