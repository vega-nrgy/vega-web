import { useState, type FormEvent } from 'react'
import { Section } from '../../ui/Section'

const ENQUIRY_TYPES = [
  'Commercial Charging Partnership',
  'Fleet Charging Solutions',
  'Highway Charging — General Query',
  'Site / Land Partnership',
  'Investor Relations',
  'Media & Press',
  'Other',
]

const fieldClass =
  'w-full rounded-input border border-border bg-paper px-3.5 py-3 font-sans text-sm text-ink outline-none transition-shadow placeholder:text-muted-onink focus:border-mint focus:shadow-[0_0_0_3px_rgba(0,217,165,0.15)]'
const labelClass = 'mb-1.5 block text-[11.5px] font-semibold text-ink-soft'

export function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <Section id="enquiry" labelledBy="enquiry-heading" className="scroll-mt-24 bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
        <p className="chapter-label border-t border-hairline pt-4.5">04 &mdash; ENQUIRY</p>
        <div className="mt-7 grid gap-16 lg:grid-cols-[1fr_1.5fr] lg:items-start">
          <div>
            <h2 id="enquiry-heading" className="font-display text-[38px] font-semibold leading-[1.12] tracking-[-0.03em] text-ink">
              Explore a partnership.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              Have a question or want to explore a partnership? We&rsquo;d love to hear from
              you &mdash; our team responds within 24 hours.
            </p>
          </div>

          {submitted ? (
            <div className="rounded-card border border-hairline bg-white p-14 text-center">
              <div className="mx-auto flex h-13 w-13 items-center justify-center rounded-full bg-mint/12">
                <span className="text-xl font-extrabold text-mint-deep">&#10003;</span>
              </div>
              <p className="mt-5 font-display text-xl font-semibold text-ink">Thank you for reaching out.</p>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">Our team will get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-card border border-hairline bg-white p-9">
              <div className="grid gap-4.5 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="sol-name">
                    Full name
                  </label>
                  <input id="sol-name" required placeholder="Your name" className={fieldClass} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="sol-company">
                    Company name <span className="font-normal text-muted-onink">(optional)</span>
                  </label>
                  <input id="sol-company" placeholder="Company" className={fieldClass} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="sol-email">
                    Email address
                  </label>
                  <input id="sol-email" type="email" required placeholder="you@company.in" className={fieldClass} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="sol-phone">
                    Phone number
                  </label>
                  <input id="sol-phone" type="tel" placeholder="+91" className={fieldClass} />
                </div>
              </div>
              <div className="mt-4.5">
                <label className={labelClass} htmlFor="sol-type">
                  Enquiry type
                </label>
                <select id="sol-type" defaultValue={ENQUIRY_TYPES[0]} className={fieldClass}>
                  {ENQUIRY_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="mt-4.5">
                <label className={labelClass} htmlFor="sol-message">
                  Message
                </label>
                <textarea
                  id="sol-message"
                  rows={4}
                  placeholder="Tell us about your routes, site, or requirements…"
                  className={`${fieldClass} resize-y leading-relaxed`}
                />
              </div>
              <button
                type="submit"
                className="mt-5.5 rounded-full bg-ink px-7 py-3.5 font-sans text-sm font-bold text-white transition-colors hover:bg-ink/90"
              >
                Submit enquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </Section>
  )
}
