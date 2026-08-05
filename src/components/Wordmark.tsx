/** Text-based lockup — always sits on ink (nav bar, footer, dark CTA bands). */
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`}>
      <span className="font-display text-lg font-bold tracking-[0.12em] text-white">VEGA</span>
      <span className="font-mono text-[11px] font-medium tracking-[0.3em] text-mint">CHARGE</span>
    </span>
  )
}
