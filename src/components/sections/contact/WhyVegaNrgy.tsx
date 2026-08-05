const ITEMS = [
  {
    index: '01',
    title: 'Reliable & well-connected network',
    body: 'Always on, always connected — a network you can count on, every journey.',
  },
  {
    index: '02',
    title: 'Built for sustainability',
    body: 'Charging today, preserving tomorrow — building a cleaner legacy for generations.',
  },
  {
    index: '03',
    title: 'Built for highways — the complete pitstop',
    body: 'Not just a charge point — a complete stop to recharge your vehicle and yourself.',
  },
  {
    index: '04',
    title: 'Technology-led operations',
    body: 'Smart, connected stations delivering real-time monitoring and seamless charging experiences.',
  },
  {
    index: '05',
    title: 'High-ROI partnerships',
    body: "Partner with India's EV growth story — strong, sustainable returns from day one.",
  },
]

export function WhyVegaNrgy() {
  return (
    <div className="mt-7 grid gap-16 lg:grid-cols-[1fr_1.6fr] lg:items-start">
      <h2 id="why-heading" className="text-balance font-display text-4xl font-semibold leading-[1.15] tracking-[-0.03em] text-ink">
        More than a charge.
        <br />A promise.
      </h2>
      <ul className="border-t border-hairline">
        {ITEMS.map(({ index, title, body }) => (
          <li key={index} className="flex gap-6 border-b border-hairline py-5.5">
            <span className="font-mono text-[11px] tracking-[0.12em] text-mint-deep">{index}</span>
            <div>
              <p className="font-display text-lg font-semibold text-ink">{title}</p>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
