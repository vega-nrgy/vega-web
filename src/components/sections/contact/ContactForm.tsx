import { useState, type FormEvent } from 'react'

type EnquiryType = 'Fleet' | 'Site Partnership' | 'Investor' | 'General'

const CATEGORIES: { index: string; type: EnquiryType; title: string; body: string }[] = [
  {
    index: '01',
    type: 'Fleet',
    title: 'Fleet & Commercial Enquiries',
    body: 'Dedicated bay agreements, fleet pricing, and OCPP integration.',
  },
  {
    index: '02',
    type: 'Site Partnership',
    title: 'Site & Land Partnerships',
    body: 'Own highway-adjacent land? Partner with us to host a Vega Charge station.',
  },
  {
    index: '03',
    type: 'Investor',
    title: 'Investor Relations',
    body: 'Learn about our expansion plans and investment opportunities.',
  },
  {
    index: '04',
    type: 'General',
    title: 'General Enquiries',
    body: 'Driver support, press, or anything else.',
  },
]

const fieldClass =
  'w-full rounded-input border border-border bg-paper px-3.5 py-3 font-sans text-sm text-ink outline-none transition-shadow placeholder:text-muted-onink focus:border-mint focus:shadow-[0_0_0_3px_rgba(0,217,165,0.15)]'
const labelClass = 'mb-1.5 block text-[11.5px] font-semibold text-ink-soft'

export function ContactForm() {
  const [type, setType] = useState<EnquiryType>('General')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="mt-7 grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:items-start">
      <div className="flex flex-col gap-3.5">
        {CATEGORIES.map((c) => {
          const active = type === c.type
          return (
            <button
              key={c.type}
              type="button"
              onClick={() => {
                setType(c.type)
                setSubmitted(false)
              }}
              className={`rounded-card border bg-white p-6.5 text-left transition-colors ${
                active ? 'border-ink' : 'border-hairline hover:border-ink'
              }`}
            >
              <div className="flex items-baseline justify-between">
                <p className="font-display text-[17px] font-semibold text-ink">{c.title}</p>
                <span className="font-mono text-[10px] text-mint-deep">{c.index}</span>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">{c.body}</p>
            </button>
          )
        })}
        <p className="px-1.5 text-[11px] leading-relaxed text-muted-onink">
          Selecting a category pre-fills the enquiry type &rarr;
        </p>
      </div>

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
            <div>
              <label className={labelClass} htmlFor="c-phone">
                Phone
              </label>
              <input id="c-phone" type="tel" placeholder="+91" className={fieldClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="c-type">
                Enquiry type
              </label>
              <select id="c-type" value={type} onChange={(e) => setType(e.target.value as EnquiryType)} className={fieldClass}>
                <option>Fleet</option>
                <option>Site Partnership</option>
                <option>Investor</option>
                <option>General</option>
              </select>
            </div>
          </div>
          <div className="mt-4.5">
            <label className={labelClass} htmlFor="c-message">
              Message
            </label>
            <textarea id="c-message" rows={5} placeholder="How can we help?" className={`${fieldClass} resize-y leading-relaxed`} />
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
