import { Link } from 'react-router-dom'
import { Wordmark } from './Wordmark'

const YEAR = new Date().getFullYear()

// Footer structure below follows the website audit doc §2.6 "Recommended
// Footer Structure" verbatim (Network / Partner / Company columns, General
// Enquiries + Corporate Office) rather than the site's earlier ad hoc list.
const NETWORK_LINKS = [
  { href: '/network#expansion', label: 'Stations' },
  { href: '/network#map', label: 'Corridors' },
  { href: '/network', label: 'Find a Charger' },
]

const PARTNER_LINKS = [
  { href: '/partner?type=fleet', label: 'Fleets' },
  { href: '/partner?type=site', label: 'Site & Land Partners' },
  { href: '/partner?type=commercial', label: 'Commercial Hosts' },
  { href: '/partner?type=investor', label: 'Strategic/Investor Enquiries' },
]

const COMPANY_LINKS = [
  { href: '/about', label: 'About' },
  // Careers still points at ComingSoonPage until real content exists — see
  // src/pages/ComingSoonPage.tsx. Privacy/Terms now have real (draft, pending
  // legal review) pages — see src/pages/PrivacyPage.tsx and TermsPage.tsx.
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
]

const SOCIAL_LINKS = [
  {
    href: 'https://linkedin.com/company/veganrgy',
    label: 'LinkedIn',
    icon: (
      <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3.5a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92zM20.44 20h-3.37v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V20H9.68V8.5h3.24v1.57h.05c.45-.85 1.56-1.75 3.2-1.75 3.42 0 4.06 2.25 4.06 5.18V20z" />
    ),
  },
  {
    href: 'https://www.instagram.com/vegacharge/',
    label: 'Instagram',
    icon: (
      <path d="M12 3.5c2.72 0 3.05.01 4.12.06 1.07.05 1.79.22 2.43.46.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.24.64.41 1.36.46 2.43.05 1.07.06 1.4.06 4.13s-.01 3.06-.06 4.13c-.05 1.07-.22 1.79-.46 2.43-.26.66-.6 1.22-1.15 1.77-.55.55-1.11.9-1.77 1.15-.64.24-1.36.41-2.43.46-1.07.05-1.4.06-4.12.06-2.72 0-3.05-.01-4.12-.06-1.07-.05-1.79-.22-2.43-.46a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.24-.64-.41-1.36-.46-2.43C1.99 15.06 1.98 14.73 1.98 12s.01-3.06.06-4.13c.05-1.07.22-1.79.46-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 0 1 5.42 2.5c.64-.24 1.36-.41 2.43-.46C8.92 2 9.25 2 11.97 2H12zm0 1.8c-2.67 0-2.99.01-4.04.06-.98.04-1.51.2-1.86.34-.47.18-.8.4-1.15.75-.35.35-.57.68-.75 1.15-.14.35-.3.88-.34 1.86-.05 1.05-.06 1.37-.06 4.04s.01 2.99.06 4.04c.04.98.2 1.51.34 1.86.18.47.4.8.75 1.15.35.35.68.57 1.15.75.35.14.88.3 1.86.34 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.98-.04 1.51-.2 1.86-.34.47-.18.8-.4 1.15-.75.35-.35.57-.68.75-1.15.14-.35.3-.88.34-1.86.05-1.05.06-1.37.06-4.04s-.01-2.99-.06-4.04c-.04-.98-.2-1.51-.34-1.86a3.1 3.1 0 0 0-.75-1.15 3.1 3.1 0 0 0-1.15-.75c-.35-.14-.88-.3-1.86-.34-1.05-.05-1.37-.06-4.04-.06zm0 3.06a4.14 4.14 0 1 1 0 8.28 4.14 4.14 0 0 1 0-8.28zm0 1.8a2.34 2.34 0 1 0 0 4.68 2.34 2.34 0 0 0 0-4.68zm4.3-2.98a.97.97 0 1 1 0 1.94.97.97 0 0 1 0-1.94z" />
    ),
  },
]

function FooterColumn({
  label,
  links,
}: {
  label: string
  links: { href: string; label: string }[]
}) {
  return (
    <div className="flex flex-col gap-3.5">
      <p className="font-mono text-[9.5px] font-normal uppercase tracking-[0.16em] text-muted">{label}</p>
      {links.map(({ href, label: linkLabel }) => (
        <Link key={linkLabel} to={href} className="text-[13.5px] font-medium text-onink transition-colors hover:text-white">
          {linkLabel}
        </Link>
      ))}
    </div>
  )
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink">
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-mint to-transparent" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.85fr_0.85fr_0.85fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-5 max-w-[300px] text-[13.5px] leading-relaxed text-onink">
              Vega Charge &mdash; Building high-power EV charging infrastructure along
              India&rsquo;s highway corridors.
            </p>
            <div className="mt-7 flex gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-onink transition-colors hover:border-mint hover:text-mint"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <FooterColumn label="Network" links={NETWORK_LINKS} />
          <FooterColumn label="Partner" links={PARTNER_LINKS} />
          <FooterColumn label="Company" links={COMPANY_LINKS} />
          <div className="flex flex-col gap-3.5">
            <div>
              <p className="font-mono text-[9.5px] font-normal uppercase tracking-[0.16em] text-muted">General Enquiries</p>
              <a href="mailto:admin@vegacharge.in" className="mt-3.5 block text-[13.5px] font-medium text-onink transition-colors hover:text-white">
                admin@vegacharge.in
              </a>
            </div>
            <div className="mt-3.5">
              <p className="font-mono text-[9.5px] font-normal uppercase tracking-[0.16em] text-muted">Corporate Office</p>
              <span className="mt-3.5 block text-[13.5px] leading-relaxed text-onink">Hyderabad, Telangana, India</span>
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6">
          <span className="text-[11.5px] text-muted">
            &copy; {YEAR} Vega Charge. All rights reserved.
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            NH-65 &middot; Telangana &middot; Andhra Pradesh
          </span>
        </div>
      </div>
    </footer>
  )
}
