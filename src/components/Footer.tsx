import { Link } from 'react-router-dom'
import { Wordmark } from './Wordmark'

const YEAR = new Date().getFullYear()

const COMPANY_LINKS = [
  { href: '/about', label: 'About Us' },
  { href: '/network', label: 'Our Network' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/blog', label: 'Blog' },
  // Careers/Privacy/Terms point at ComingSoonPage until real content exists
  // for each — see src/pages/ComingSoonPage.tsx.
  { href: '/careers', label: 'Careers' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
]

const PARTNER_LINKS = [
  { href: '/partner?type=fleet', label: 'Fleet Operators' },
  { href: '/solutions#commercial', label: 'Commercial Charging' },
  { href: '/partner?type=site', label: 'Site Partnerships' },
  { href: '/partner?type=investor', label: 'Investor Relations' },
]

const SOCIAL_LINKS = [
  {
    href: 'https://linkedin.com/company/veganrgy',
    label: 'LinkedIn',
    icon: (
      <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3.5a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92zM20.44 20h-3.37v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V20H9.68V8.5h3.24v1.57h.05c.45-.85 1.56-1.75 3.2-1.75 3.42 0 4.06 2.25 4.06 5.18V20z" />
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
        <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr]">
          <div>
            <Wordmark />
            <p className="mt-5 max-w-[300px] text-[13.5px] leading-relaxed text-onink">
              Vega Charge is a technology-led EV charging infrastructure company,
              building highway-fast-charging corridors across India.
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
          <FooterColumn label="Company" links={COMPANY_LINKS} />
          <FooterColumn label="Partner With Us" links={PARTNER_LINKS} />
          <div className="flex flex-col gap-3.5">
            <p className="font-mono text-[9.5px] font-normal uppercase tracking-[0.16em] text-muted">Contact</p>
            <a href="mailto:admin@vegacharge.in" className="text-[13.5px] font-medium text-onink transition-colors hover:text-white">
              admin@vegacharge.in
            </a>
            <a href="tel:+917995799957" className="text-[13.5px] font-medium text-onink transition-colors hover:text-white">
              Preetham: 7995 799 957
            </a>
            <a href="tel:+919705555556" className="text-[13.5px] font-medium text-onink transition-colors hover:text-white">
              Sai Kiran: 9705 555 556
            </a>
            <span className="mt-1 text-xs leading-relaxed text-muted">Vega Charge, Hyderabad</span>
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
