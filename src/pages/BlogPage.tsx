import { Link } from 'react-router-dom'
import { PageIntro } from '../components/ui/PageIntro'
import { Section } from '../components/ui/Section'
import { usePageMeta } from '../hooks/usePageMeta'
import { getPublishedBlogPosts } from '../lib/blogPosts'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function BlogPage() {
  usePageMeta({
    title: 'Stories — Vega Charge',
    description: 'Notes on highway EV charging infrastructure, the NH-65 corridor, and building for India’s electric future.',
    path: '/blog',
  })

  const posts = getPublishedBlogPosts()

  return (
    <>
      <PageIntro eyebrow="STORIES" heading="Notes from the road ahead.">
        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted">
          Perspectives on highway charging infrastructure, the corridors we&rsquo;re building on, and
          what it takes to get India&rsquo;s highways EV-ready.
        </p>
      </PageIntro>

      <Section id="posts" labelledBy="posts-heading" className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 pb-28 pt-4 lg:px-8">
          <h2 id="posts-heading" className="sr-only">
            All posts
          </h2>
          {posts.length === 0 ? (
            <p className="border-t border-hairline pt-10 text-[15px] leading-relaxed text-muted">
              Nothing published yet — check back soon.
            </p>
          ) : (
            <div className="grid gap-8 border-t border-hairline pt-10 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-card border border-hairline bg-white transition-colors hover:border-ink"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-grey-soft">
                    <img
                      src={post.coverImage}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="font-mono text-[10px] tracking-[0.12em] text-mint-deep">{formatDate(post.date)}</p>
                    <h3 className="mt-2.5 font-display text-lg font-semibold leading-snug text-ink">{post.title}</h3>
                    <p className="mt-2.5 line-clamp-3 text-[13.5px] leading-relaxed text-muted">{post.excerpt}</p>
                    <span className="mt-4 text-[13px] font-semibold text-mint-deep">Read more &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Section>
    </>
  )
}
