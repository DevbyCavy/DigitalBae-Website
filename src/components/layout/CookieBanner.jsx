import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Cookie } from 'lucide-react'
import { getConsent, setConsent, onConsentEvent } from '../../lib/consent'
import { analyticsConfigured, loadAnalytics, trackPageview } from '../../lib/analytics'

/**
 * Consent banner + analytics bootstrapping.
 * Shown only when analytics is configured (otherwise the site sets no optional cookies,
 * so there is nothing to consent to). Equal-weight Accept / Decline buttons.
 */
export function CookieBanner() {
  const [open, setOpen] = useState(false)
  const { pathname, search } = useLocation()

  useEffect(() => {
    if (!analyticsConfigured) return
    const consent = getConsent()
    if (consent === 'granted') loadAnalytics()
    if (consent === null) setOpen(true)
    return onConsentEvent((e) => {
      if (e.type === 'open') setOpen(true)
      if (e.type === 'change') {
        if (e.value === 'granted') {
          loadAnalytics()
          trackPageview(window.location.pathname + window.location.search)
        } else if (e.value === 'denied') {
          // Withdrawing consent: the page reloads so any loaded analytics code is gone.
          if (window.gtag || window.plausible) window.location.reload()
        }
        setOpen(false)
      }
    })
  }, [])

  // Page views on route change (no-op until analytics has loaded with consent).
  useEffect(() => {
    trackPageview(pathname + search)
  }, [pathname, search])

  if (!analyticsConfigured) return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-desc"
          className="glass fixed inset-x-3 bottom-3 z-[45] rounded-[1.75rem] p-5 sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-md sm:p-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex gap-4">
            <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blush/70 text-berry sm:flex">
              <Cookie aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
            </span>
            <div>
              <p id="cookie-title" className="eyebrow text-berry">Your privacy</p>
              <p id="cookie-desc" className="mt-2 text-sm leading-relaxed text-charcoal/80">
                With your permission, we use analytics cookies to understand how this site is used. Nothing is tracked
                unless you accept. Read our{' '}
                <Link to="/privacy" className="font-semibold text-berry underline-offset-2 hover:underline">Privacy Policy</Link>.
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setConsent('granted')}
                  className="label-ui flex-1 rounded-full bg-plum px-5 py-3 text-[0.64rem] text-ivory transition-colors hover:bg-berry"
                >
                  Accept
                </button>
                <button
                  type="button"
                  onClick={() => setConsent('denied')}
                  className="label-ui flex-1 rounded-full border border-plum/30 bg-white/60 px-5 py-3 text-[0.64rem] text-plum transition-colors hover:border-plum"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
