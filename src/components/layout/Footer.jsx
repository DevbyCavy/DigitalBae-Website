import { Link } from 'react-router-dom'
import { navigation, contact, site } from '../../data/site'
import { socialLinks } from '../../data/social'
import { Container, Ornament } from '../ui/primitives'
import { Logo } from '../ui/Logo'
import { Newsletter } from '../sections/Newsletter'
import { openCookieSettings } from '../../lib/consent'
import { analyticsConfigured } from '../../lib/analytics'
import { SocialIcon } from '../ui/SocialIcon'

export function Footer() {
  return (
    <footer className="on-dark grain relative overflow-hidden border-t border-ivory/10 bg-plum-deep text-ivory">
      <div aria-hidden="true" className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-berry/25 blur-3xl" />
      <Container className="relative pb-10 pt-16 md:pt-24">
        <Newsletter />
        <div className="mt-16 grid gap-14 md:mt-20 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm font-serif text-2xl italic leading-snug text-blush">{site.tagline}</p>
            <Ornament className="mt-8" />
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="eyebrow mb-5 text-berry-soft">Explore</p>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="link-underline text-sm text-ivory/80 hover:text-ivory">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="eyebrow mb-5 text-berry-soft">Connect</p>
            <a href={`mailto:${contact.email}`} className="link-underline text-sm text-ivory/80 hover:text-ivory">
              {contact.email}
            </a>
            {contact.location && <p className="mt-2 text-sm text-ivory/60">{contact.location}</p>}
            <ul className="mt-6 flex gap-3">
              {socialLinks.map((s) => (
                <li key={s.network}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${s.label} (opens in a new tab)`}
                    className="glass-dark flex h-11 w-11 items-center justify-center rounded-full text-ivory/80 transition-colors duration-500 hover:border-blush hover:bg-blush hover:text-plum"
                  >
                    <SocialIcon network={s.network} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p aria-hidden="true" className="display pointer-events-none mt-20 select-none whitespace-nowrap text-[8.6vw] leading-[0.85] text-ivory/[0.06]">
          Digital Bae
        </p>

        <div className="mt-6 flex flex-col gap-4 border-t border-ivory/10 pt-8 text-xs text-ivory/60 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} Digital Bae. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><Link to="/privacy" className="link-underline hover:text-ivory">Privacy Policy</Link></li>
            <li><Link to="/terms" className="link-underline hover:text-ivory">Terms of Use</Link></li>
            {analyticsConfigured && (
              <li><button type="button" onClick={openCookieSettings} className="link-underline hover:text-ivory">Cookie settings</button></li>
            )}
          </ul>
        </div>
      </Container>
    </footer>
  )
}
