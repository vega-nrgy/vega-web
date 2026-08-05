const STRIPE_STYLE = {
  backgroundImage: 'repeating-linear-gradient(-45deg, #edf2f3 0 14px, #f3f6f5 14px 28px)',
} as const

export function ContactDetails() {
  return (
    <div className="grid gap-12 border-t border-hairline pt-10 sm:grid-cols-3">
      <div>
        <p className="font-mono text-[9.5px] tracking-[0.16em] text-muted">EMAIL</p>
        <a href="mailto:info@vegacharge.in" className="mt-2.5 block font-display text-lg font-semibold text-ink hover:text-mint-deep">
          info@vegacharge.in
        </a>
        <p className="mt-7 font-mono text-[9.5px] tracking-[0.16em] text-muted">PHONE</p>
        <p className="mt-2 text-[15px] font-semibold text-muted-onink">[ to be added ]</p>
      </div>
      <div>
        <p className="font-mono text-[9.5px] tracking-[0.16em] text-muted">REGISTERED OFFICE</p>
        <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft">
          Vega Nrgy Private Limited
          <br />
          Hyderabad, Telangana
          <br />
          <span className="text-muted-onink">[ full address to be added ]</span>
        </p>
        <a href="https://linkedin.com/company/veganrgy" className="mt-3.5 inline-block text-[13px] font-semibold text-mint-deep">
          linkedin.com/company/veganrgy &rarr;
        </a>
      </div>
      <div style={STRIPE_STYLE} className="flex h-[180px] items-center justify-center rounded-card">
        <span className="font-mono text-[10px] tracking-[0.08em] text-muted">[ office location map ]</span>
      </div>
    </div>
  )
}
