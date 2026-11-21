import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion'
import { ArrowUp, CalendarHeart, GraduationCap, Mail, MessageCircleHeart, X } from 'lucide-react'
import { contact } from '../../data/site'

const ease = [0.22, 1, 0.36, 1]

const actions = [
  { label: 'Book a talk', hint: 'Keynotes, panels & events', to: '/contact?category=speaking', icon: CalendarHeart },
  { label: 'Masterclass interest', hint: 'Be first to know', to: '/contact?category=masterclasses', icon: GraduationCap },
  { label: 'Send a message', hint: 'Partnerships, media & more', to: '/contact', icon: MessageCircleHeart },
]

/** Floating quick-contact button with a scroll-progress ring. */
export function FloatingAction() {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })

  useMotionValueEvent(scrollY, 'change', (y) => setVisible(y > Math.min(window.innerHeight * 0.6, 520)))
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onClick = (e) => !rootRef.current?.contains(e.target) && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onClick)
    }
  }, [open])

  if (pathname === '/contact') return null

  return (
    <div ref={rootRef} className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      <AnimatePresence>
        {open && (
          <motion.div
            id="quick-actions"
            role="menu"
            aria-label="Quick contact"
            className="glass w-[17.5rem] origin-bottom-right rounded-[1.75rem] p-2.5"
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.4, ease }}
          >
            <p className="eyebrow px-3 pb-2 pt-2 text-berry">How can I help?</p>
            {actions.map((a, i) => (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 + i * 0.05, duration: 0.4, ease }}
              >
                <Link
                  role="menuitem"
                  to={a.to}
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-3 rounded-2xl p-3 transition-colors duration-300 hover:bg-white/80"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blush/70 text-berry transition-colors duration-300 group-hover:bg-berry group-hover:text-ivory">
                    <a.icon aria-hidden="true" className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.5} />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-plum">{a.label}</span>
                    <span className="block text-xs text-charcoal/70">{a.hint}</span>
                  </span>
                </Link>
              </motion.div>
            ))}
            <div className="mt-1 flex gap-2 border-t border-plum/10 px-1 pt-2.5">
              <a
                role="menuitem"
                href={`mailto:${contact.email}`}
                className="label-ui flex flex-1 items-center justify-center gap-2 rounded-full bg-white/70 py-2.5 text-[0.6rem] text-plum hover:bg-white"
              >
                <Mail aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.75} /> Email
              </a>
              <button
                role="menuitem"
                type="button"
                onClick={() => { setOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                className="label-ui flex flex-1 items-center justify-center gap-2 rounded-full bg-white/70 py-2.5 text-[0.6rem] text-plum hover:bg-white"
              >
                <ArrowUp aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.75} /> Top
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(visible || open) && (
          <motion.button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="quick-actions"
            aria-label={open ? 'Close quick contact menu' : 'Open quick contact menu'}
            className={`group relative flex h-16 items-center rounded-full bg-berry p-2 text-ivory shadow-[0_18px_40px_-14px_rgba(163,58,99,0.8)] transition-[background-color,padding] duration-500 ease-[var(--ease-editorial)] hover:bg-plum hover:pr-6 focus-visible:pr-6 ${open ? 'pr-6' : ''}`}
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.8 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.5, ease }}
          >
            {/* Soft pulse halo (disabled for reduced motion via CSS) */}
            {!open && <span aria-hidden="true" className="fab-pulse absolute inset-0 rounded-full bg-berry" />}
            <span className="relative flex h-12 w-12 items-center justify-center">
              <svg aria-hidden="true" viewBox="0 0 48 48" className="absolute inset-0 -rotate-90">
                <circle cx="24" cy="24" r="21" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="2" />
                <motion.circle cx="24" cy="24" r="21" fill="none" stroke="#EBC6D0" strokeWidth="2" strokeLinecap="round" style={{ pathLength: progress }} />
              </svg>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? 'x' : 'chat'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {open ? <X className="h-5 w-5" strokeWidth={1.75} /> : <MessageCircleHeart className="h-5 w-5" strokeWidth={1.5} />}
                </motion.span>
              </AnimatePresence>
            </span>
            {/* Label: collapsed to a circle at rest, slides open on hover / keyboard focus / while the menu is open */}
            <span
              aria-hidden="true"
              className={`relative grid transition-[grid-template-columns] duration-500 ease-[var(--ease-editorial)] group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] ${
                open ? 'grid-cols-[1fr]' : 'grid-cols-[0fr]'
              }`}
            >
              <span className="overflow-hidden">
                <span className="label-ui block whitespace-nowrap pl-3 text-[0.68rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:delay-150 group-focus-visible:opacity-100 group-[[aria-expanded=true]]:opacity-100">
                  {open ? 'Close' : 'Work with me'}
                </span>
              </span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
