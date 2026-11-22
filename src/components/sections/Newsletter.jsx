import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Loader2, Mail } from 'lucide-react'
import { subscribe } from '../../services/newsletter'
import { NotConfiguredError } from '../../services/contact'
import { contact } from '../../data/site'
import { checkSubmission, markSubmitted, startTimer } from '../../lib/spam'
import { trackEvent } from '../../lib/analytics'
import { Sparkle } from '../ui/primitives'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Newsletter sign-up ("The Digital Bae Letter"). Dark glass card for the footer. */
export function Newsletter() {
  const [email, setEmail] = useState('')
  const [hp, setHp] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle') // idle | submitting | success | not-configured | error | blocked
  const startedAt = useRef(startTimer())

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!EMAIL_RE.test(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    const spam = checkSubmission({ honeypot: hp, startedAt: startedAt.current, formKey: 'newsletter' })
    if (spam === 'bot') return
    if (spam) {
      setStatus('blocked')
      return
    }
    setStatus('submitting')
    try {
      await subscribe({ email: email.trim() })
      markSubmitted('newsletter')
      trackEvent('newsletter_signup')
      setStatus('success')
      setEmail('')
    } catch (err) {
      setStatus(err instanceof NotConfiguredError ? 'not-configured' : 'error')
    }
  }

  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent('Newsletter sign-up')}&body=${encodeURIComponent(`Please add ${email || 'my email'} to The Digital Bae Letter.`)}`

  return (
    <div className="glass-dark relative overflow-hidden rounded-[2rem] p-7 md:p-10">
      <div aria-hidden="true" className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-berry/35 blur-3xl" />
      <div className="relative grid gap-8 lg:grid-cols-2 lg:items-end">
        <div>
          <p className="eyebrow flex items-center gap-2 text-berry-soft">
            <Sparkle className="twinkle h-3 w-3 text-gold" /> The Digital Bae Letter
          </p>
          <h2 className="mt-4 text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[0.98] !text-ivory">
            Ideas worth <em>keeping</em>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/70">
            Occasional notes on digital influence, leadership and growth, plus first access to new masterclasses. No spam;
            unsubscribe anytime.
          </p>
        </div>

        <form onSubmit={onSubmit} noValidate aria-label="Newsletter sign-up">
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <div className={`flex items-center gap-2 rounded-full border bg-white/10 p-1.5 pl-5 transition-colors focus-within:border-blush ${error ? 'border-[#F19BB5]' : 'border-white/20'}`}>
            <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-ivory/60" strokeWidth={1.5} />
            <input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (status !== 'submitting') setStatus('idle') }}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'newsletter-error' : 'newsletter-note'}
              placeholder="you@example.com"
              className="min-w-0 flex-1 bg-transparent py-2.5 text-ivory placeholder:text-ivory/45 focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="label-ui flex shrink-0 items-center gap-2 rounded-full bg-ivory px-5 py-3 text-[0.62rem] text-plum transition-colors hover:bg-blush disabled:opacity-60"
            >
              {status === 'submitting' ? <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" /> : <>Subscribe <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" /></>}
            </button>
          </div>
          {/* honeypot */}
          <div aria-hidden="true" className="absolute left-[-9999px]">
            <label htmlFor="newsletter-hp-field">Leave this field empty</label>
            <input id="newsletter-hp-field" name="hp_field" type="text" tabIndex={-1} autoComplete="new-password" data-lpignore="true" data-1p-ignore value={hp} onChange={(e) => setHp(e.target.value)} />
          </div>
          {error && <p id="newsletter-error" className="mt-2 pl-5 text-sm text-[#F7B8CB]">{error}</p>}
          <p id="newsletter-note" className="mt-3 pl-5 text-xs text-ivory/55">
            By subscribing you agree to our <Link to="/privacy" className="underline underline-offset-2 hover:text-ivory">Privacy Policy</Link>.
          </p>
          <div role="status" aria-live="polite">
            <AnimatePresence>
              {status !== 'idle' && status !== 'submitting' && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-3 rounded-2xl bg-white/10 px-5 py-3 text-sm text-ivory/90"
                >
                  {status === 'success' && 'Thank you, you’re on the list.'}
                  {status === 'blocked' && 'You’ve just signed up. Please wait a moment before trying again.'}
                  {status === 'error' && <>Something went wrong and you were not subscribed. <a href={mailto} className="underline">Email us instead</a>.</>}
                  {status === 'not-configured' && <>Online sign-up isn&rsquo;t connected yet, so you have <strong>not</strong> been subscribed. <a href={mailto} className="font-semibold underline">Request to join by email</a>.</>}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </div>
  )
}
