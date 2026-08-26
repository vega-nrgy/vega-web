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
        <textarea id={id} name={id} rows={3} placeholder="Type your answer here…" className={`${fieldClass} resize-y leading-relaxed`} />
      </Field>
      <p className={hintClass}>Shift &#8679; + Enter &#8629; to make a line break</p>
    </div>
  )
}

/** Explicit email + phone inputs (email is `name="email"` across all three
 *  field sets so the OTP step can always find it via FormData, regardless
 *  of which partner type is active). */
function ContactFields({ idPrefix }: { idPrefix: string }) {
  return (
    <div className="mt-4.5 grid gap-4.5 sm:grid-cols-2">
      <Field id={`${idPrefix}-email`} label="Email" required>
        <input
          id={`${idPrefix}-email`}
          name="email"
          type="email"
          required
          placeholder="you@company.in"
          className={fieldClass}
        />
      </Field>
      <Field id={`${idPrefix}-phone`} label="Phone">
        <input id={`${idPrefix}-phone`} name="phone" type="tel" placeholder="+91 98765 43210" className={fieldClass} />
      </Field>
    </div>
  )
}

function SubmitButton({ label, disabled }: { label: string; disabled?: boolean }) {
  return (
    <div className="mt-6">
      <button
        type="submit"
        disabled={disabled}
        className="rounded-full bg-mint px-7 py-3.5 font-sans text-sm font-bold text-ink transition-colors hover:bg-mint-bright disabled:opacity-60"
      >
        {label}
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
          <input id="p-company" name="p-company" required placeholder="Your company" className={fieldClass} />
        </Field>
        <Field id="p-fleet-size" label="How many vehicles are in your fleet?" required>
          <input id="p-fleet-size" name="p-fleet-size" type="number" min={1} required placeholder="e.g. 25" className={fieldClass} />
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
          <input id="p-route" name="p-route" placeholder="e.g. Hyderabad ⟷ Vijayawada, NH-65" className={fieldClass} />
        </Field>
        <Field id="p-timeline" label="When do you need charging live?" required>
          <select id="p-timeline" name="p-timeline" required defaultValue="" className={fieldClass}>
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
      <ContactFields idPrefix="p-fleet" />
    </>
  )
}

function SiteFields() {
  return (
    <>
      <Field id="p-location" label="Suggest a location" required>
        <input id="p-location" name="p-location" required placeholder="e.g. Narketpalle, near NH-65" className={fieldClass} />
      </Field>

      <div className="mt-4.5">
        <Field id="p-state" label="Which state is the location in?" required>
          <input
            id="p-state"
            name="p-state"
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
          <input id="p-address" name="p-address" placeholder="Paste a Google Maps link, or type the full address" className={fieldClass} />
        </Field>
      </div>

      <div className="mt-4.5">
        <Field id="p-ownership" label="Do you own this land, or represent the owner?" required>
          <select id="p-ownership" name="p-ownership" required defaultValue="" className={fieldClass}>
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
      <ContactFields idPrefix="p-site" />
    </>
  )
}

function InvestorFields() {
  return (
    <>
      <Field id="p-investor-name" label="Your name or fund name" required>
        <input id="p-investor-name" name="p-investor-name" required placeholder="Name or fund" className={fieldClass} />
      </Field>

      <div className="mt-4.5 grid gap-4.5 sm:grid-cols-2">
        <Field id="p-investor-type" label="What kind of investor are you?" required>
          <select id="p-investor-type" name="p-investor-type" required defaultValue="" className={fieldClass}>
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
          <select id="p-ticket-size" name="p-ticket-size" required defaultValue="" className={fieldClass}>
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
      <ContactFields idPrefix="p-investor" />
    </>
  )
}

const FIELD_SETS: Record<PartnerType, () => ReactElement> = {
  Fleet: FleetFields,
  Site: SiteFields,
  Investor: InvestorFields,
}

function formDataToObject(fd: FormData): Record<string, string> {
  const out: Record<string, string> = {}
  for (const key of new Set(fd.keys())) {
    const all = fd.getAll(key).map(String).filter(Boolean)
    if (all.length) out[key] = all.join(', ')
  }
  return out
}

type Phase = 'form' | 'otp' | 'done'

export function PartnerForm() {
  const [searchParams] = useSearchParams()
  const initial = TYPE_PARAM[searchParams.get('type') ?? ''] ?? 'Site'
  const [type, setType] = useState<PartnerType>(initial)
  const [phase, setPhase] = useState<Phase>('form')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [code, setCode] = useState('')

  const formRef = useRef<HTMLFormElement>(null)
  const otpFormRef = useRef<HTMLFormElement>(null)
  const pendingRef = useRef<{ email: string; token: string; fields: Record<string, string> } | null>(null)

  async function handleSendCode(e: FormEvent) {
    e.preventDefault()
    const fd = new FormData(formRef.current ?? undefined)
    const fields = formDataToObject(fd)
    const email = fields.email

    setSending(true)
    setError(null)
    try {
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error('failed')
      const { token } = await res.json()
      pendingRef.current = { email, token, fields }
      setPhase('otp')
    } catch {
      setError('otp-send')
    } finally {
      setSending(false)
    }
  }

  async function handleVerify(e: FormEvent) {
    e.preventDefault()
    const pending = pendingRef.current
    if (!pending) return

    setSending(true)
    setError(null)
    try {
      const res = await fetch('/api/verify-and-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: pending.token, code, email: pending.email, type, fields: pending.fields }),
      })
      if (!res.ok) throw new Error('failed')
      setPhase('done')
    } catch {
      setError('verify')
    } finally {
      setSending(false)
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLFormElement>) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      formRef.current?.requestSubmit()
      otpFormRef.current?.requestSubmit()
    }
  }

  function mailtoFallback() {
    const pending = pendingRef.current
    const lines = pending
      ? [`Type: ${type}`, `Email: ${pending.email}`, ...Object.entries(pending.fields).map(([k, v]) => `${k}: ${v}`)]
      : [`Type: ${type}`]
    return `mailto:admin@vegacharge.in?subject=${encodeURIComponent(
      `${type} partnership enquiry`,
    )}&body=${encodeURIComponent(lines.join('\n'))}`
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
              disabled={phase !== 'form'}
              onClick={() => setType(c.type)}
              className={`rounded-card border bg-white p-6.5 text-left transition-colors disabled:opacity-60 ${
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

      {phase === 'done' ? (
        <div className="rounded-card border border-hairline bg-white p-16 text-center">
          <div className="mx-auto flex h-13 w-13 items-center justify-center rounded-full bg-mint/12">
            <span className="text-xl font-extrabold text-mint-deep">&#10003;</span>
          </div>
          <p className="mt-5 font-display text-xl font-semibold text-ink">Thank you for reaching out.</p>
          <p className="mt-2.5 text-sm leading-relaxed text-muted">Our team will review this and get back to you within 24 hours.</p>
        </div>
      ) : phase === 'otp' ? (
        <form
          ref={otpFormRef}
          onSubmit={handleVerify}
          onKeyDown={handleKeyDown}
          className="rounded-card border border-hairline bg-white p-9"
        >
          <p className="font-display text-lg font-semibold text-ink">Verify your email</p>
          <p className="mt-2 text-[13px] leading-relaxed text-muted">
            We sent a 6-digit code to <span className="font-semibold text-ink-soft">{pendingRef.current?.email}</span>. Enter
            it below to submit your enquiry.
          </p>
          <div className="mt-4.5">
            <Field id="p-otp-code" label="Verification code" required>
              <input
                id="p-otp-code"
                required
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                autoFocus
                placeholder="123456"
                className={`${fieldClass} tracking-[0.3em]`}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              />
            </Field>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <button
              type="submit"
              disabled={sending || code.length !== 6}
              className="rounded-full bg-mint px-7 py-3.5 font-sans text-sm font-bold text-ink transition-colors hover:bg-mint-bright disabled:opacity-60"
            >
              {sending ? 'Verifying…' : 'Verify & submit'}
            </button>
            <button
              type="button"
              onClick={() => {
                setPhase('form')
                setCode('')
                setError(null)
              }}
              className="text-[13px] font-semibold text-muted transition-colors hover:text-ink"
            >
              Back
            </button>
          </div>
          {error && (
            <p className="mt-3.5 text-[13px] leading-relaxed text-ink-soft">
              {error === 'otp-send' ? "Couldn't send a code." : "That code didn't verify."}{' '}
              <a href={mailtoFallback()} className="font-semibold text-mint-deep hover:text-mint">
                Email us directly
              </a>{' '}
              instead.
            </p>
          )}
        </form>
      ) : (
        <form ref={formRef} onSubmit={handleSendCode} onKeyDown={handleKeyDown} className="rounded-card border border-hairline bg-white p-9">
          <Fields />
          <SubmitButton label={sending ? 'Sending code…' : 'Send verification code'} disabled={sending} />
          {error === 'otp-send' && (
            <p className="mt-3.5 text-[13px] leading-relaxed text-ink-soft">
              Couldn&rsquo;t send a verification code.{' '}
              <a href={mailtoFallback()} className="font-semibold text-mint-deep hover:text-mint">
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
