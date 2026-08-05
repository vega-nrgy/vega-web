import { Section } from '../../ui/Section'

const STRIPE_STYLE = {
  backgroundImage: 'repeating-linear-gradient(-45deg, #edf2f3 0 14px, #f3f6f5 14px 28px)',
} as const

function FounderCard() {
  return (
    <div className="overflow-hidden rounded-card border border-hairline">
      <div style={STRIPE_STYLE} className="flex h-60 items-center justify-center">
        <span className="font-mono text-[10px] tracking-[0.08em] text-muted">[ founder portrait ]</span>
      </div>
      <div className="p-6">
        <p className="font-display text-[17px] font-semibold text-ink">Name</p>
        <p className="mt-1 text-[12.5px] text-muted">Title &middot; two-line background</p>
        <p className="mt-2.5 text-[12.5px] font-semibold text-mint-deep">LinkedIn &rarr;</p>
      </div>
    </div>
  )
}

export function Team() {
  return (
    <Section id="team" labelledBy="team-heading" className="bg-paper">
      <div className="mx-auto max-w-7xl px-6 pt-28 lg:px-8">
        <p className="chapter-label border-t border-hairline pt-4.5">04 &mdash; THE TEAM</p>
        <div className="mt-7 flex flex-wrap items-baseline justify-between gap-8">
          <h2 id="team-heading" className="font-display text-4xl font-semibold tracking-[-0.03em] text-ink">
            The people building the stops.
          </h2>
          <span className="font-mono text-xs tracking-[0.08em] text-muted">[ FOUNDER BIOS TO FOLLOW ]</span>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FounderCard />
          <FounderCard />
          <div className="flex min-h-[200px] items-center justify-center rounded-card border border-dashed border-border">
            <span className="text-[13px] text-muted">More team members to come</span>
          </div>
        </div>
      </div>
    </Section>
  )
}
