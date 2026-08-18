import { PageIntro } from '../components/ui/PageIntro'
import { Section } from '../components/ui/Section'
import { Button } from '../components/ui/Button'
import { ContactForm } from '../components/sections/contact/ContactForm'
import { ContactDetails } from '../components/sections/contact/ContactDetails'
import { usePageMeta } from '../hooks/usePageMeta'

export function ContactPage() {
  usePageMeta({
    title: 'Contact Us — Vega Charge',
    description:
      'Questions about Vega Charge stations, driver support, or the press? Get in touch — we respond within 24 hours.',
    path: '/contact',
  })

  return (
    <>
      <PageIntro eyebrow="CONTACT" heading="Let's talk.">
        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted">
          Driver support, press, or a general question &mdash; we&rsquo;d love to hear from you.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-between gap-6 rounded-card border border-hairline bg-white p-7">
          <div>
            <p className="font-display text-lg font-semibold text-ink">
              Fleet, site, or investor enquiry?
            </p>
            <p className="mt-1.5 max-w-md text-[13.5px] leading-relaxed text-muted">
              Those go through a dedicated form so our team can follow up with something more
              useful than &ldquo;thanks, we&rsquo;ll be in touch.&rdquo;
            </p>
          </div>
          <Button href="/partner" variant="mint" size="sm">
            Join the Charge &rarr;
          </Button>
        </div>
      </PageIntro>

      <Section id="contact-details" labelledBy="contact-details-heading" className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 pt-18 lg:px-8">
          <h2 id="contact-details-heading" className="sr-only">
            Contact details
          </h2>
          <ContactDetails />
        </div>
      </Section>

      <Section id="contact-form" labelledBy="contact-form-heading" className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
          <h2 id="contact-form-heading" className="sr-only">
            Send a general enquiry
          </h2>
          <p className="chapter-label border-t border-hairline pt-4.5">GENERAL ENQUIRIES</p>
          <div className="mt-7">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  )
}
