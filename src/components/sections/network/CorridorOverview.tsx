type Stop = {
  pct: number
  name: string
  sub: string
  tone: 'flagship' | 'live' | 'pending'
}

type CorridorRowProps = {
  label: string
  filledPct: number
  left: string
  right: string
  stops: Stop[]
}

function CorridorRow({ label, filledPct, left, right, stops }: CorridorRowProps) {
  return (
    <div className="mt-9">
      <p className="font-mono text-[9.5px] tracking-[0.14em] text-muted-onink">{label}</p>
      <div className="relative mt-5 h-16">
        <div className="absolute inset-x-0 top-[9px] h-[3px] rounded-full bg-white/14" />
        <div className="absolute left-0 top-[9px] h-[3px] rounded-full bg-mint/50" style={{ width: `${filledPct}%` }} />

        <div className="absolute left-0 top-1 h-[13px] w-[13px] rounded-full bg-white" />
        <p className="absolute left-0 top-7 font-sans text-[13px] font-semibold text-white">{left}</p>

        {stops.map((s) => (
          <div key={s.name} className="absolute -translate-x-1/2" style={{ left: `${s.pct}%` }}>
            <span
              className={`absolute -top-1.5 left-1/2 -translate-x-1/2 rounded-full border-2 border-ink ${
                s.tone === 'flagship' ? 'h-[17px] w-[17px] animate-live-pulse bg-mint' : 'h-[13px] w-[13px] bg-mint'
              } ${s.tone === 'pending' ? 'bg-muted-onink' : ''}`}
            />
            <div className="pt-6 text-center">
              <p className={`font-sans text-[13px] font-semibold ${s.tone === 'flagship' ? 'text-mint' : 'text-onink'}`}>
                {s.name}
              </p>
              <p className="mt-0.5 font-mono text-[8.5px] tracking-[0.08em] text-muted-onink">{s.sub}</p>
            </div>
          </div>
        ))}

        <div className="absolute right-0 top-1 h-[13px] w-[13px] rounded-full bg-white" />
        <p className="absolute right-0 top-7 text-right font-sans text-[13px] font-semibold text-white">{right}</p>
      </div>
    </div>
  )
}

export function CorridorOverview() {
  return (
    <div className="relative mt-14 overflow-hidden rounded-media bg-ink px-9 py-12 sm:px-13">
      <div
        className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-mint to-transparent"
        aria-hidden="true"
      />
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="font-mono text-[10px] tracking-[0.16em] text-mint">
          2 CORRIDORS &middot; 5 STATIONS &middot; TELANGANA &amp; ANDHRA PRADESH
        </p>
        <p className="font-mono text-[10px] tracking-[0.12em] text-muted-onink">INDIA&rsquo;S HIGHWAY CHARGING BACKBONE</p>
      </div>

      <CorridorRow
        label="NH-65 · HYDERABAD ⟷ VIJAYAWADA · 275 KM"
        filledPct={58}
        left="Hyderabad"
        right="Vijayawada"
        stops={[
          { pct: 38, name: 'Narketpally', sub: 'VC 001 · FLAGSHIP', tone: 'flagship' },
          { pct: 56, name: 'Pillalamarri', sub: 'VC 003', tone: 'live' },
        ]}
      />
      <CorridorRow
        label="HYDERABAD ⟷ VISAKHAPATNAM · VIA KHAMMAM"
        filledPct={52}
        left="Hyderabad"
        right="Visakhapatnam"
        stops={[
          { pct: 30, name: 'Tekmatla', sub: 'VC 005 · VC 002', tone: 'live' },
          { pct: 52, name: 'Tallampadu', sub: 'VC 004', tone: 'live' },
        ]}
      />

      <div className="mt-8 flex flex-wrap gap-6 border-t border-white/10 pt-4.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 animate-live-pulse rounded-full bg-mint" />
          <span className="text-[11.5px] text-muted-onink">Flagship &mdash; live soon</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-mint" />
          <span className="text-[11.5px] text-muted-onink">Site secured &mdash; permissions &amp; planning</span>
        </div>
      </div>
    </div>
  )
}
