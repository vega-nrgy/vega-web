import { Link, Navigate, useParams } from 'react-router-dom'
import { Section } from '../components/ui/Section'
import { usePageMeta } from '../hooks/usePageMeta'
import { getBlogPost } from '../lib/blogPosts'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getBlogPost(slug) : undefined

  usePageMeta({
    title: post ? `${post.title} — Vega Charge` : 'Story not found — Vega Charge',
    description: post?.excerpt ?? '',
    path: `/blog/${slug ?? ''}`,
    image: post?.coverImage,
  })

  if (!post) return <Navigate to="/blog" replace />

  return (
    <>
      <Section id="post-head" labelledBy="post-heading" className="bg-paper">
        <div className="mx-auto max-w-3xl px-6 pt-30 lg:px-8">
          <Link to="/blog" className="font-mono text-[11px] font-normal tracking-[0.18em] text-mint-deep">
            &larr; STORIES
          </Link>
          <h1
            id="post-heading"
            className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.12] tracking-[-0.03em] text-ink sm:text-5xl"
          >
            {post.title}
          </h1>
          <div className="mt-5 flex items-center gap-3 text-[13px] text-muted">
            <span>{post.author}</span>
            <span aria-hidden="true">&middot;</span>
            <span>{formatDate(post.date)}</span>
          </div>
        </div>
      </Section>

      <Section id="post-body" labelledBy="post-heading" className="bg-paper">
        <div className="mx-auto max-w-3xl px-6 pb-28 pt-10 lg:px-8">
          <div className="overflow-hidden rounded-media">
            <img src={post.coverImage} alt="" className="aspect-[16/9] w-full object-cover" />
          </div>
          <div className="mt-12 space-y-9">
            {post.sections.map((section, i) => (
              <div key={i}>
                {section.heading && (
                  <h2 className="font-display text-2xl font-semibold tracking-[-0.015em] text-ink">{section.heading}</h2>
                )}
                <div className="mt-3.5 space-y-4 text-base leading-[1.75] text-ink-soft">
                  {section.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}
