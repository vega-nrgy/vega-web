import { useState, type FormEvent } from 'react'

const fieldClass =
  'w-full rounded-input border border-border bg-paper px-3.5 py-3 font-sans text-sm text-ink outline-none transition-shadow placeholder:text-muted-onink focus:border-mint focus:shadow-[0_0_0_3px_rgba(0,217,165,0.15)]'
const labelClass = 'mb-1.5 block text-[11.5px] font-semibold text-ink-soft'

type Status = 'idle' | 'sending' | 'sent' | 'error'

/** General-enquiries-only form — driver support, press, or anything that
   isn't a fleet/site/investor lead (those go to PartnerForm on /partner). */
export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [values, setValues] = useState({ name: '', email: '', phone: '', message: '' })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error('request failed')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const mailtoHref = `mailto:admin@vegacharge.in?subject=${encodeURIComponent(
    `Enquiry from ${values.name || 'website'}`,
  )}&body=${encodeURIComponent(
    `Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}\n\n${values.message}`,
  )}`

  return (
    <div className="mx-auto max-w-2xl">
      {status === 'sent' ? (
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
              <input
                id="c-name"
                required
                placeholder="Your name"
                className={fieldClass}
                value={values.name}
                onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="c-email">
                Email
              </label>
              <input
                id="c-email"
                type="email"
                required
                placeholder="you@example.in"
                className={fieldClass}
                value={values.email}
                onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
              />
            </div>
          </div>
          <div className="mt-4.5">
            <label className={labelClass} htmlFor="c-phone">
              Phone <span className="font-normal text-muted-onink">(optional)</span>
            </label>
            <input
              id="c-phone"
              type="tel"
              placeholder="+91"
              className={fieldClass}
              value={values.phone}
              onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
            />
          </div>
          <div className="mt-4.5">
            <label className={labelClass} htmlFor="c-message">
              Message
            </label>
            <textarea
              id="c-message"
              required
              rows={5}
              placeholder="How can we help?"
              className={`${fieldClass} resize-y leading-relaxed`}
              value={values.message}
              onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
            />
          </div>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="mt-5.5 rounded-full bg-mint px-7 py-3.5 font-sans text-sm font-bold text-ink transition-colors hover:bg-mint-bright disabled:opacity-60"
          >
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
          {status === 'error' && (
            <p className="mt-3.5 text-[13px] leading-relaxed text-ink-soft">
              Something went wrong sending that.{' '}
              <a href={mailtoHref} className="font-semibold text-mint-deep hover:text-mint">
                Email us directly
              </a>{' '}
              instead.
            </p>
          )}
        </form>
      )}
    </div>
  )
}
