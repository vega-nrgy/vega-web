import { useState, type FormEvent } from 'react'

const fieldClass =
  'w-full rounded-input border border-border bg-paper px-3.5 py-3 font-sans text-sm text-ink outline-none transition-shadow placeholder:text-muted-onink focus:border-mint focus:shadow-[0_0_0_3px_rgba(0,217,165,0.15)]'
const labelClass = 'mb-1.5 block text-[11.5px] font-semibold text-ink-soft'

/** General-enquiries-only form — driver support, press, or anything that
   isn't a fleet/site/investor lead (those go to PartnerForm on /partner). */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="mx-auto max-w-2xl">
      {submitted ? (
        <div className="rounded-card border border-hairline bg-white p-16 text-center">
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
              <label className={labelClass} htmlFor="c-name">
                Name
              </label>
              <input id="c-name" required placeholder="Your name" className={fieldClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="c-email">
                Email
              </label>
              <input id="c-email" type="email" required placeholder="you@example.in" className={fieldClass} />
            </div>
          </div>
          <div className="mt-4.5">
            <label className={labelClass} htmlFor="c-phone">
              Phone <span className="font-normal text-muted-onink">(optional)</span>
            </label>
            <input id="c-phone" type="tel" placeholder="+91" className={fieldClass} />
          </div>
          <div className="mt-4.5">
            <label className={labelClass} htmlFor="c-message">
              Message
            </label>
            <textarea id="c-message" required rows={5} placeholder="How can we help?" className={`${fieldClass} resize-y leading-relaxed`} />
          </div>
          <button
            type="submit"
            className="mt-5.5 rounded-full bg-mint px-7 py-3.5 font-sans text-sm font-bold text-ink transition-colors hover:bg-mint-bright"
          >
            Send message
          </button>
        </form>
      )}
    </div>
  )
}
