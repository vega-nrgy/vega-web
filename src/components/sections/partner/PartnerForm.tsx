import { useRef, useState, type FormEvent, type KeyboardEvent, type ReactElement, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'

type PartnerType = 'Fleet' | 'Site' | 'Investor'

const CATEGORIES: { index: string; type: PartnerType; title: string; body: string }[] = [
  {
    index: '01',
    type: 'Fleet',
    title: 'Fleet & Commercial',
    body: 'Dedicated bay agreements, fleet pricing, and OCPP integration.',
  },
  {
    index: '02',
    type: 'Site',
    title: 'Site & Land Partnerships',
    body: 'Own highway-adjacent land? Tell us where — we’ll take it from there.',
  },
  {
    index: '03',
    type: 'Investor',
    title: 'Investor Relations',
    body: 'Our expansion plans and investment opportunities.',
  },
]

const TYPE_PARAM: Record<string, PartnerType> = {
  fleet: 'Fleet',
  site: 'Site',
  investor: 'Investor',
}

const VEHICLE_TYPES = ['Two-wheelers', 'Three-wheelers', 'Cars & SUVs', 'Vans / LCVs', 'Buses', 'Trucks']

const INDIA_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
  'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu', 'Delhi (NCT)', 'Jammu and Kashmir', 'Ladakh',
  'Lakshadweep', 'Puducherry',
]

const fieldClass =
  'w-full rounded-input border border-border bg-paper px-3.5 py-3 font-sans text-sm text-ink outline-none transition-shadow placeholder:text-muted-onink focus:border-mint focus:shadow-[0_0_0_3px_rgba(0,217,165,0.15)]'
const labelClass = 'mb-1.5 block text-[11.5px] font-semibold text-ink-soft'
const hintClass = 'mt-1.5 text-[11px] text-muted-onink'

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string
  label: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <div>
      <label className={labelClass} htmlFor={id}>
        {label}
        {required && <span className="text-mint-deep"> *</span>}
      </label>
      {children}
    </div>
  )
}

function ShareMoreField({ id }: { id: string }) {
  return (
    <div className="mt-4.5">
      <Field id={id} label="Anything else you'd like to share?">
        <textarea id={id} rows={3} placeholder="Type your answer here…" className={`${fieldClass} resize-y leading-relaxed`} />
      </Field>
      <p className={hintClass}>Shift &#8679; + Enter &#8629; to make a line break</p>
    </div>
  )
}

function ContactField({ id }: { id: string }) {
  return (
    <div className="mt-4.5">
      <Field id={id} label="What's your email and/or phone number?" required>
        <input id={id} required placeholder="you@company.in or +91 98765 43210" className={fieldClass} />
      </Field>
    </div>
  )
}

function SubmitButton() {
  return (
    <div className="mt-6">
      <button
        type="submit"
        className="rounded-full bg-mint px-7 py-3.5 font-sans text-sm font-bold text-ink transition-colors hover:bg-mint-bright"
      >
        Submit
      </button>
      <p className={hintClass}>press Ctrl + Enter &#8629;</p>
    </div>
  )
}

function FleetFields() {
  return (
    <>
      <div className="grid gap-4.5 sm:grid-cols-2">
        <Field id="p-company" label="Company / fleet name" required>
          <input id="p-company" required placeholder="Your company" className={fieldClass} />
        </Field>
        <Field id="p-fleet-size" label="How many vehicles are in your fleet?" required>
          <input id="p-fleet-size" type="number" min={1} required placeholder="e.g. 25" className={fieldClass} />
        </Field>
      </div>

      <div className="mt-4.5">
        <span className={labelClass}>
          What do you run? <span className="font-normal text-muted-onink">(select all that apply)</span>
        </span>
        <div className="flex flex-wrap gap-2">
          {VEHICLE_TYPES.map((v) => (
            <label
              key={v}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-border bg-paper px-3.5 py-2 text-[12.5px] font-semibold text-ink-soft transition-colors has-checked:border-mint has-checked:bg-mint/10 has-checked:text-ink"
            >
              <input type="checkbox" name="vehicle-type" value={v} className="sr-only" />
              {v}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-4.5 grid gap-4.5 sm:grid-cols-2">
        <Field id="p-route" label="Primary route or corridor">
          <input id="p-route" placeholder="e.g. Hyderabad ⟷ Vijayawada, NH-65" className={fieldClass} />
        </Field>
        <Field id="p-timeline" label="When do you need charging live?" required>
          <select id="p-timeline" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Select one
            </option>
            <option>Immediately</option>
            <option>Within 3 months</option>
            <option>Within 6 months</option>
            <option>Just exploring</option>
          </select>
        </Field>
      </div>

      <ShareMoreField id="p-fleet-more" />
      <ContactField id="p-fleet-contact" />
    </>
  )
}

function SiteFields() {
  return (
    <>
      <Field id="p-location" label="Suggest a location" required>
        <input id="p-location" required placeholder="e.g. Narketpalle, near NH-65" className={fieldClass} />
      </Field>

      <div className="mt-4.5">
        <Field id="p-state" label="Which state is the location in?" required>
          <input
            id="p-state"
            list="p-states"
            required
            placeholder="Type or select a state"
            className={fieldClass}
          />
          <datalist id="p-states">
            {INDIA_STATES.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
        </Field>
      </div>

      <div className="mt-4.5">
        <Field id="p-address" label="Location address or Google Maps link">
          <input id="p-address" placeholder="Paste a Google Maps link, or type the full address" className={fieldClass} />
        </Field>
      </div>

      <div className="mt-4.5">
        <Field id="p-ownership" label="Do you own this land, or represent the owner?" required>
          <select id="p-ownership" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Select one
            </option>
            <option>I own the land</option>
            <option>I represent the owner</option>
            <option>I'm a broker / agent</option>
            <option>Just exploring on the owner's behalf</option>
          </select>
        </Field>
      </div>

      <ShareMoreField id="p-site-more" />
      <ContactField id="p-site-contact" />
    </>
  )
}

function InvestorFields() {
  return (
    <>
      <Field id="p-investor-name" label="Your name or fund name" required>
        <input id="p-investor-name" required placeholder="Name or fund" className={fieldClass} />
      </Field>

      <div className="mt-4.5 grid gap-4.5 sm:grid-cols-2">
        <Field id="p-investor-type" label="What kind of investor are you?" required>
          <select id="p-investor-type" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Select one
            </option>
            <option>Angel / individual</option>
            <option>Venture capital</option>
            <option>Family office</option>
            <option>Corporate / strategic</option>
            <option>Other</option>
          </select>
        </Field>
        <Field id="p-ticket-size" label="Typical ticket size" required>
          <select id="p-ticket-size" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Select one
            </option>
            <option>Under ₹50 lakh</option>
            <option>₹50 lakh – ₹2 crore</option>
            <option>₹2 – 10 crore</option>
            <option>₹10 crore+</option>
          </select>
        </Field>
      </div>

      <ShareMoreField id="p-investor-more" />
      <ContactField id="p-investor-contact" />
    </>
  )
}

const FIELD_SETS: Record<PartnerType, () => ReactElement> = {
  Fleet: FleetFields,
  Site: SiteFields,
  Investor: InvestorFields,
}

export function PartnerForm() {
  const [searchParams] = useSearchParams()
  const initial = TYPE_PARAM[searchParams.get('type') ?? ''] ?? 'Site'
  const [type, setType] = useState<PartnerType>(initial)
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLFormElement>) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      formRef.current?.requestSubmit()
    }
  }

  const Fields = FIELD_SETS[type]

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
          A few extra questions up front means our team can respond with something more useful than
          &ldquo;thanks, we&rsquo;ll be in touch.&rdquo;
        </p>
      </div>

      {submitted ? (
        <div className="rounded-card border border-hairline bg-white p-16 text-center">
          <div className="mx-auto flex h-13 w-13 items-center justify-center rounded-full bg-mint/12">
            <span className="text-xl font-extrabold text-mint-deep">&#10003;</span>
          </div>
          <p className="mt-5 font-display text-xl font-semibold text-ink">Thank you for reaching out.</p>
          <p className="mt-2.5 text-sm leading-relaxed text-muted">Our team will review this and get back to you within 24 hours.</p>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="rounded-card border border-hairline bg-white p-9">
          <Fields />
          <SubmitButton />
        </form>
      )}
    </div>
  )
}
