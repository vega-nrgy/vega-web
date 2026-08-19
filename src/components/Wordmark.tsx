/** The official lockup (mark + stacked VEGA/CHARGE wordmark) — always sits on ink (nav bar, footer, dark CTA bands). */
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <img
      src="/media/vega-charge-lockup.svg"
      alt="Vega Charge"
      className={`h-10 w-auto ${className}`}
    />
  )
}
