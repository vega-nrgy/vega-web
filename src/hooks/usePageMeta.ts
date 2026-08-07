import { useEffect } from 'react'
import { DEFAULT_OG_IMAGE, SITE_URL } from '../lib/seo'

type PageMetaInput = {
  title: string
  description: string
  path: string
  image?: string
  jsonLd?: object | object[]
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/** Sets document.title, meta description, canonical, OG, and Twitter card
 *  tags for the current page, plus optional per-page JSON-LD. Same
 *  useEffect + useLocation-adjacent pattern as ScrollToTop — no SSR here,
 *  so this only takes effect once JS hydrates. */
export function usePageMeta({ title, description, path, image, jsonLd }: PageMetaInput) {
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : undefined

  useEffect(() => {
    const url = `${SITE_URL}${path}`
    const ogImage = `${SITE_URL}${image ?? DEFAULT_OG_IMAGE}`

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)

    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', 'Vega Charge')
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:image', ogImage)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', ogImage)

    let script: HTMLScriptElement | null = null
    if (jsonLdKey) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-page-schema', '')
      script.textContent = jsonLdKey
      document.head.appendChild(script)
    }

    return () => {
      script?.remove()
    }
  }, [title, description, path, image, jsonLdKey])
}
