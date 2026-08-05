import { PageIntro } from '../components/ui/PageIntro'
import { Section } from '../components/ui/Section'
import { ContactForm } from '../components/sections/contact/ContactForm'
import { ContactDetails } from '../components/sections/contact/ContactDetails'
import { WhyVegaNrgy } from '../components/sections/contact/WhyVegaNrgy'

export function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="CONTACT" heading="Let's talk.">
        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted">
          Whether you&rsquo;re a fleet operator, a potential site partner, an investor, or
          an EV driver with a question &mdash; we&rsquo;d love to hear from you.
        </p>
      </PageIntro>

      <Section id="contact-form" labelledBy="page-heading" className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 pt-18 lg:px-8">
          <ContactForm />
        </div>
      </Section>

      <Section id="contact-details" labelledBy="contact-details-heading" className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 pt-26 lg:px-8">
          <h2 id="contact-details-heading" className="sr-only">
            Contact details
          </h2>
          <ContactDetails />
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
