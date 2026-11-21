import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navigation } from '../../data/site'
import { socialLinks } from '../../data/social'
import { Button, Sparkle } from '../ui/primitives'
import { Logo } from '../ui/Logo'
import { SocialIcon } from '../ui/SocialIcon'

const ease = [0.22, 1, 0.36, 1]
// Routes whose opening section is dark (video/photo), so the header starts in its light-on-dark style.
const darkHeroRoutes = ['/']

export function Header() {
  const [scrolled, setScrolled] = useState(false) // past the dark hero
  const [atTop, setAtTop] = useState(true)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)
  const panelRef = useRef(null)
  const { pathname } = useLocation()

  // Always visible; switches to its light style once past the hero.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > window.innerHeight * 0.75)
      setAtTop(y < 24)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  // Mobile menu: lock scroll, close on Escape, keep focus inside, restore focus on close.
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusables = () => [toggleRef.current, ...(panelRef.current?.querySelectorAll('a, button') ?? [])].filter(Boolean)
    requestAnimationFrame(() => focusables()[1]?.focus())
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'Tab') {
        const els = focusables()
        const first = els[0]
        const last = els[els.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    const toggle = toggleRef.current
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
      toggle?.focus()
    }
  }, [open])

  const onDark = open || (darkHeroRoutes.includes(pathname) && !scrolled)
  // Transparent over the top of the page; a solid ivory bar with a hairline once the page scrolls.
  const solid = !open && !onDark && !atTop
  const barTone = open
    ? 'border-transparent bg-transparent'
    : solid
      ? 'border-plum/10 bg-ivory/92 shadow-[0_10px_30px_-24px_rgba(68,36,63,0.5)] backdrop-blur-md'
      : onDark
        ? 'border-white/15 bg-gradient-to-b from-black/35 to-transparent'
        : 'border-transparent bg-transparent'

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 border-b transition-[background-color,border-color,box-shadow] duration-700 ease-[var(--ease-editorial)] ${barTone} ${
          open ? 'z-[60]' : 'z-50'
        } ${onDark ? 'on-dark' : ''}`}
      >
        <div
          className={`mx-auto flex max-w-[82.5rem] items-center justify-between gap-6 px-5 transition-[height] duration-500 sm:px-8 lg:px-12 ${
            solid ? 'h-[68px]' : 'h-[84px]'
          }`}
        >
          <Logo tone={onDark ? 'light' : 'dark'} onClick={() => setOpen(false)} />

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-9">
              {navigation.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `label-ui relative block py-2 text-[0.68rem] transition-colors duration-300 ${
                        onDark
                          ? isActive ? 'text-ivory' : 'text-ivory/70 hover:text-ivory'
                          : isActive ? 'text-plum' : 'text-plum/70 hover:text-plum'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        {isActive && (
                          <motion.span
                            layoutId="nav-underline"
                            aria-hidden="true"
                            className={`absolute -bottom-0.5 left-0 right-0 mx-auto h-[2px] rounded-full ${onDark ? 'bg-blush' : 'bg-berry'}`}
                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <ul className={open ? 'hidden' : 'hidden items-center gap-2 sm:flex'} aria-label="Social media">
              {socialLinks.map((s) => (
                <li key={s.network}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${s.label} (opens in a new tab)`}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 ${
                      onDark
                        ? 'border-white/25 text-ivory/85 hover:border-ivory hover:bg-ivory hover:text-plum'
                        : 'border-plum/20 text-plum/80 hover:border-berry hover:bg-berry hover:text-ivory'
                    }`}
                  >
                    <SocialIcon network={s.network} className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className={`inline-flex h-11 w-11 items-center justify-center xl:hidden ${onDark ? 'text-ivory' : 'text-plum'}`}
            >
              {open ? <X strokeWidth={1.25} className="h-6 w-6" /> : <Menu strokeWidth={1.25} className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="on-dark grain fixed inset-0 z-[55] flex flex-col overflow-y-auto bg-plum-deep px-6 pb-10 pt-28 text-ivory xl:hidden"
            initial={{ clipPath: 'circle(0% at 92% 5%)' }}
            animate={{ clipPath: 'circle(150% at 92% 5%)' }}
            exit={{ clipPath: 'circle(0% at 92% 5%)' }}
            transition={{ duration: 0.8, ease }}
          >
            <div aria-hidden="true" className="absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-berry/40 blur-3xl" />
            <div aria-hidden="true" className="absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-rose/25 blur-3xl" />
            <nav aria-label="Mobile" className="relative">
              <ul className="space-y-1">
                {navigation.map((item, i) => (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.05, duration: 0.6, ease }}
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) => `flex items-baseline gap-4 py-2 ${isActive ? 'text-blush' : 'text-ivory'}`}
                    >
                      {({ isActive }) => (
                        <>
                          <span className="eyebrow text-berry-soft">0{i + 1}</span>
                          {isActive ? (
                            <span className="font-serif text-[2.6rem] italic leading-tight">{item.label}</span>
                          ) : (
                            <span className="display text-[clamp(1.3rem,6.4vw,1.75rem)] leading-tight">{item.label}</span>
                          )}
                        </>
                      )}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="relative mt-auto pt-12">
              <Sparkle className="mb-6 h-5 w-5 text-gold" />
              <Button to="/contact" variant="light" className="w-full">
                Work With Me
              </Button>
              <ul className="mt-8 flex gap-3">
                {socialLinks.map((s) => (
                  <li key={s.network}>
                    <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="glass-dark flex h-11 w-11 items-center justify-center rounded-full text-ivory/80 hover:text-ivory">
                      <SocialIcon network={s.network} className="h-5 w-5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
