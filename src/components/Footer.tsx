import { Link } from 'react-router-dom'
import { Wordmark } from './Wordmark'

const YEAR = new Date().getFullYear()

const COMPANY_LINKS = [
  { href: '/about', label: 'About Us' },
  { href: '/network', label: 'Our Network' },
  { href: '/solutions', label: 'Solutions' },
]

const PARTNER_LINKS = [
  { href: '/solutions#fleet', label: 'Fleet Operators' },
  { href: '/solutions#commercial', label: 'Commercial Charging' },
  { href: '/contact', label: 'Site Partnerships' },
]

function FooterColumn({
  label,
  links,
}: {
  label: string
  links: { href: string; label: string }[]
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-mono text-[9.5px] font-normal uppercase tracking-[0.16em] text-muted">{label}</p>
      {links.map(({ href, label: linkLabel }) => (
        <Link key={linkLabel} to={href} className="text-[13px] font-medium text-onink transition-colors hover:text-white">
          {linkLabel}
        </Link>
      ))}
    </div>
  )
}

export function Footer() {
  return (
    <footer className="bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-18 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.3fr]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-[300px] text-[13px] leading-relaxed text-onink">
              Vega Charge is the highway brand of Vega Nrgy Private Limited &mdash; a
              technology-led EV charging infrastructure company.
            </p>
          </div>
          <FooterColumn label="Company" links={COMPANY_LINKS} />
          <FooterColumn label="Partner" links={PARTNER_LINKS} />
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[9.5px] font-normal uppercase tracking-[0.16em] text-muted">Contact</p>
            <a href="mailto:admin@vegacharge.in" className="text-[13px] font-medium text-onink transition-colors hover:text-white">
              admin@vegacharge.in
            </a>
            <a href="tel:+917995799957" className="text-[13px] font-medium text-onink transition-colors hover:text-white">
              Preetham: 7995 799 957
            </a>
            <a href="tel:+919705555556" className="text-[13px] font-medium text-onink transition-colors hover:text-white">
              Sai Kiran: 9705 555 556
            </a>
            {/* <a
              href="https://linkedin.com/company/veganrgy"
              className="text-[13px] font-medium text-onink transition-colors hover:text-white"
            >
              LinkedIn
            </a> */}
            <span className="text-xs leading-relaxed text-muted">Vega Nrgy Private Limited, Hyderabad</span>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6">
          <span className="text-[11.5px] text-muted">
            &copy; {YEAR} Vega Nrgy Private Limited. All rights reserved.
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            NH-65 &middot; Telangana &middot; Andhra Pradesh
          </span>
        </div>
      </div>
    </footer>
  )
}
