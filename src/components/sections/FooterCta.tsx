import { CtaBanner } from '../ui/CtaBanner'
import { Section } from '../ui/Section'

export function FooterCta() {
  return (
    <Section id="contact" labelledBy="contact-heading" className="bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-26 lg:px-8">
        <CtaBanner
          headingId="contact-heading"
          heading="Ready to charge smarter?"
          body="Whether you're a fleet operator, a highway business, or an EV driver — Vega Charge is built for you."
          buttons={[
            { href: '/network', label: 'Find a Station', variant: 'mint' },
            { href: '/contact', label: 'Partner with Us', variant: 'ghost-onink' },
          ]}
        />
      </div>
    </Section>
  )
}
