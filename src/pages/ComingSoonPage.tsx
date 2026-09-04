import { PageIntro } from '../components/ui/PageIntro'
import { Button } from '../components/ui/Button'
import { usePageMeta } from '../hooks/usePageMeta'

type ComingSoonPageProps = {
  /** Used as both the page H1 and the browser title, e.g. "Careers". */
  title: string
  /** Current route, for canonical/OG tags — e.g. "/careers". */
  path: string
}

/** Placeholder for routes the audit doc calls for (Careers, Privacy, Terms,
 *  ...) that don't have real content yet. Wired up so those links resolve
 *  to something instead of a 404 or being left out of the footer entirely
 *  — swap each one out for a real page as that content gets built. */
export function ComingSoonPage({ title, path }: ComingSoonPageProps) {
  usePageMeta({
    title: `${title} — Coming Soon | Vega Charge`,
    description: `The ${title} page is on its way. In the meantime, get in touch and we'll point you in the right direction.`,
    path,
  })

  return (
    <PageIntro eyebrow="COMING SOON" heading={title}>
      <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted">
        This page is still being built. Check back soon &mdash; or get in touch if
        you need this information sooner.
      </p>
      <div className="mt-9 flex flex-wrap gap-3.5 pb-30">
        <Button href="/" variant="mint">
          Back to Home
        </Button>
        <Button href="/contact" variant="outline">
          Contact Us
        </Button>
      </div>
    </PageIntro>
  )
}
