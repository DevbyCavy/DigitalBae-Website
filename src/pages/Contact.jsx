import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Info, Loader2, Mail, MapPin, Clock } from 'lucide-react'
import { Seo } from '../components/ui/Seo'
import { Container, Button, Glow } from '../components/ui/primitives'
import { Reveal } from '../components/ui/Reveal'
import { PageHero } from '../components/sections/PageHero'
import { SocialIcon } from '../components/ui/SocialIcon'
import { contact, enquiryCategories } from '../data/site'
import { socialLinks } from '../data/social'
import { masterclasses } from '../data/masterclasses'
import { submitEnquiry, NotConfiguredError, buildMailto, isContactConfigured } from '../services/contact'
import { checkSubmission, markSubmitted, startTimer } from '../lib/spam'
import { trackEvent } from '../lib/analytics'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(values) {
  const errors = {}
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (!values.category) errors.category = 'Please choose an enquiry type.'
  if (values.subject.trim().length < 3) errors.subject = 'Please add a short subject.'
  if (values.message.trim().length < 20) errors.message = 'Please share a little more detail (at least 20 characters).'
  if (values.message.length > 3000) errors.message = 'Please keep your message under 3,000 characters.'
  return errors
}

function Field({ id, label, error, children, hint }) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow mb-3 block !tracking-[0.2em] text-plum/80">
        {label} <span aria-hidden="true" className="text-berry">*</span>
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-2 text-xs text-charcoal/70">{hint}</p>}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 flex items-center gap-1.5 text-sm text-[#9B2C4B]"
          >
            <AlertCircle aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.75} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

const inputCls = (hasError) =>
  `w-full border-0 border-b bg-transparent px-0 py-3 text-lg text-charcoal placeholder:text-charcoal/50 focus:outline-none focus:ring-0 focus-visible:outline-none transition-colors duration-300 ${
    hasError ? 'border-[#9B2C4B]' : 'border-plum/25 focus:border-plum'
  }`

export default function Contact() {
  const [params] = useSearchParams()
  const initialCategory = enquiryCategories.some((c) => c.value === params.get('category')) ? params.get('category') : ''
  const course = masterclasses.find((m) => m.id === params.get('course'))

  const [values, setValues] = useState({
    name: '',
    email: '',
    category: initialCategory,
    subject: course ? `Interest in: ${course.title}` : '',
    message: '',
    hpField: '', // honeypot (deliberately not named like anything browsers autofill)
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | invalid | submitting | success | not-configured | error | blocked
  const formRef = useRef(null)
  const startedAt = useRef(startTimer())

  const update = (field) => (e) => {
    const next = { ...values, [field]: e.target.value }
    setValues(next)
    if (touched[field]) setErrors(validate(next))
    if (status !== 'idle' && status !== 'submitting') setStatus('idle')
  }
  const blur = (field) => () => {
    setTouched((t) => ({ ...t, [field]: true }))
    setErrors(validate(values))
  }

  const categoryLabel = enquiryCategories.find((c) => c.value === values.category)?.label ?? 'General Enquiries'
  const mailto = buildMailto(contact.email, {
    ...values,
    category: categoryLabel,
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    setTouched({ name: true, email: true, category: true, subject: true, message: true })
    if (Object.keys(found).length) {
      setStatus('invalid')
      const first = Object.keys(found)[0]
      const el = formRef.current?.querySelector(`[name="${first}"]`)
      // Bring the first problem into view (the enquiry-type radios are visually hidden, so scroll their group).
      ;(first === 'category' ? el?.closest('fieldset') : el)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el?.focus({ preventScroll: true })
      return
    }
    const spam = checkSubmission({ honeypot: values.hpField, startedAt: startedAt.current, formKey: 'contact' })
    if (spam === 'bot') return
    if (spam) {
      setStatus('blocked')
      return
    }

    setStatus('submitting')
    try {
      await submitEnquiry({ ...values, category: categoryLabel })
      markSubmitted('contact')
      trackEvent('enquiry_submitted', { category: values.category })
      setStatus('success')
    } catch (err) {
      setStatus(err instanceof NotConfiguredError ? 'not-configured' : 'error')
    }
  }

  const describedBy = (f) => (errors[f] && touched[f] ? `${f}-error` : undefined)
  const err = (f) => (touched[f] ? errors[f] : undefined)

  return (
    <>
      <Seo
        title="Contact"
        description="Work with Taffy L. Gotora (Digital Bae): speaking bookings, partnerships, masterclasses, media and general enquiries."
      />

      <PageHero
        eyebrow="Contact"
        title={<>Let&rsquo;s <em>connect.</em></>}
        intro="Every meaningful collaboration starts with a conversation. Tell me a little about what you have in mind."
      />

      <section className="relative overflow-hidden pb-24 md:pb-36">
        <Glow />
        <Container className="relative grid gap-16 lg:grid-cols-12">
          {/* Details */}
          <Reveal as="aside" className="lg:col-span-4">
            <div className="border-t border-plum/15 pt-8">
              <div className="mb-6 flex items-center justify-between gap-4">
                <h2 className="text-2xl">Details</h2>
              </div>
              <ul className="space-y-6 text-charcoal/80">
                <li className="flex gap-4">
                  <Mail aria-hidden="true" strokeWidth={1.25} className="mt-0.5 h-5 w-5 shrink-0 text-berry" />
                  <div className="space-y-1 text-sm">
                    <p><a className="link-underline text-base text-plum" href={`mailto:${contact.email}`}>{contact.email}</a></p>
                    <p className="text-charcoal/70">Speaking, advisory, training, media and partnerships</p>
                  </div>
                </li>
                {contact.location && (
                  <li className="flex gap-4 text-sm">
                    <MapPin aria-hidden="true" strokeWidth={1.25} className="h-5 w-5 shrink-0 text-berry" />
                    {contact.location}
                  </li>
                )}
                {contact.responseTime && (
                  <li className="flex gap-4 text-sm">
                    <Clock aria-hidden="true" strokeWidth={1.25} className="h-5 w-5 shrink-0 text-berry" />
                    {contact.responseTime}
                  </li>
                )}
              </ul>
              {contact.representation && <p className="mt-8 text-sm text-charcoal/70">{contact.representation}</p>}

              <div className="mt-12 border-t border-plum/15 pt-8">
                <p className="eyebrow mb-5 text-plum/85">Follow</p>
                <ul className="space-y-3">
                  {socialLinks.map((s) => (
                    <li key={s.network}>
                      <a href={s.href} target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-plum">
                        <SocialIcon network={s.network} />
                        <span className="link-underline text-sm">{s.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
            <div className="glass rounded-[2rem] p-6 sm:p-10 md:p-14">
              {!isContactConfigured() && (
                <p className="mb-10 flex gap-3 rounded-2xl bg-white/70 p-4 text-sm leading-relaxed text-charcoal/75">
                  <Info aria-hidden="true" strokeWidth={1.5} className="mt-0.5 h-4 w-4 shrink-0 text-berry" />
                  Online sending is not connected yet. Your message will be checked here, then you can send it by email in one click.
                </p>
              )}

              <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-10" aria-describedby="form-status">
                <fieldset>
                  <legend className="eyebrow mb-4 !tracking-[0.2em] text-plum/80">
                    Enquiry type <span aria-hidden="true" className="text-berry">*</span>
                  </legend>
                  <div className="flex flex-wrap gap-2" onBlur={blur('category')}>
                    {enquiryCategories.map((c) => (
                      <label key={c.value} className="cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={c.value}
                          checked={values.category === c.value}
                          onChange={update('category')}
                          aria-describedby={describedBy('category')}
                          className="peer sr-only"
                        />
                        <span className="label-ui inline-block rounded-full border border-plum/20 bg-white/50 px-4 py-2.5 text-[0.62rem] text-plum transition-colors duration-300 hover:border-plum peer-checked:border-plum peer-checked:bg-plum peer-checked:text-ivory peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-plum">
                          {c.label}
                        </span>
                      </label>
                    ))}
                  </div>
                  {err('category') && (
                    <p id="category-error" className="mt-2 flex items-center gap-1.5 text-sm text-[#9B2C4B]">
                      <AlertCircle aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.75} />
                      {errors.category}
                    </p>
                  )}
                </fieldset>

                <div className="grid gap-10 md:grid-cols-2">
                  <Field id="name" label="Name" error={err('name')}>
                    <input id="name" name="name" autoComplete="name" value={values.name} onChange={update('name')} onBlur={blur('name')}
                      aria-invalid={Boolean(err('name'))} aria-describedby={describedBy('name')} aria-required="true" className={inputCls(err('name'))} placeholder="Your full name" />
                  </Field>
                  <Field id="email" label="Email" error={err('email')}>
                    <input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={update('email')} onBlur={blur('email')}
                      aria-invalid={Boolean(err('email'))} aria-describedby={describedBy('email')} aria-required="true" className={inputCls(err('email'))} placeholder="you@example.com" />
                  </Field>
                </div>

                <Field id="subject" label="Subject" error={err('subject')}>
                  <input id="subject" name="subject" value={values.subject} onChange={update('subject')} onBlur={blur('subject')}
                    aria-invalid={Boolean(err('subject'))} aria-describedby={describedBy('subject')} aria-required="true" className={inputCls(err('subject'))} placeholder="What is this about?" />
                </Field>

                <Field id="message" label="Message" error={err('message')} hint={`${values.message.length}/3000`}>
                  <textarea id="message" name="message" rows={6} value={values.message} onChange={update('message')} onBlur={blur('message')}
                    aria-invalid={Boolean(err('message'))} aria-describedby={describedBy('message') ?? 'message-hint'} aria-required="true"
                    className={`${inputCls(err('message'))} resize-y`} placeholder="Share dates, audience, goals or anything else helpful." />
                </Field>

                {/* Honeypot: hidden from people, tempting to bots */}
                <div aria-hidden="true" className="absolute left-[-9999px]">
                  <label htmlFor="contact-hp-field">Leave this field empty</label>
                  <input id="contact-hp-field" name="hp_field" type="text" tabIndex={-1} autoComplete="new-password" data-lpignore="true" data-1p-ignore value={values.hpField} onChange={update('hpField')} />
                </div>

                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <Button type="submit" disabled={status === 'submitting'} icon={status === 'submitting' ? null : 'arrow'}>
                    {status === 'submitting' ? (
                      <span className="flex items-center gap-2"><Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" /> Checking&hellip;</span>
                    ) : isContactConfigured() ? 'Send Message' : 'Review & Send by Email'}
                  </Button>
                  <p className="text-xs text-charcoal/70">All fields are required.</p>
                </div>

                <div id="form-status" role="status" aria-live="polite">
                  <AnimatePresence mode="wait">
                    {status === 'success' && (
                      <motion.div key="s" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="flex gap-3 rounded-2xl border-l-4 border-plum bg-white p-5 text-sm leading-relaxed text-charcoal/80">
                        <CheckCircle2 aria-hidden="true" strokeWidth={1.5} className="h-5 w-5 shrink-0 text-plum" />
                        Thank you, your message has been sent. We will be in touch soon.
                      </motion.div>
                    )}
                    {status === 'not-configured' && (
                      <motion.div key="n" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="rounded-2xl border-l-4 border-berry bg-white p-5 text-sm leading-relaxed text-charcoal/80">
                        <p className="font-semibold text-plum">Your message looks good, but it has not been sent yet.</p>
                        <p className="mt-1">Online sending is not set up on this site. Open it in your email app to send it, with everything already filled in:</p>
                        <Button href={mailto} variant="outline" className="mt-4 !px-5 !py-3" icon="external">Open in Email</Button>
                      </motion.div>
                    )}
                    {status === 'invalid' && Object.keys(errors).length > 0 && (
                      <motion.div key="i" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="flex gap-3 rounded-2xl border-l-4 border-[#9B2C4B] bg-white p-5 text-sm leading-relaxed text-charcoal/80">
                        <AlertCircle aria-hidden="true" strokeWidth={1.5} className="h-5 w-5 shrink-0 text-[#9B2C4B]" />
                        <span>Please check the highlighted {Object.keys(errors).length === 1 ? 'field' : 'fields'}: {Object.values(errors).join(' ')}</span>
                      </motion.div>
                    )}
                    {status === 'blocked' && (
                      <motion.div key="b" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="rounded-2xl border-l-4 border-berry bg-white p-5 text-sm leading-relaxed text-charcoal/80">
                        That was a little quick. Please take a moment to check your message, then send it again.
                      </motion.div>
                    )}
                    {status === 'error' && (
                      <motion.div key="e" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="rounded-2xl border-l-4 border-[#9B2C4B] bg-white p-5 text-sm leading-relaxed text-charcoal/80">
                        <p className="font-semibold text-[#9B2C4B]">Something went wrong and your message was not sent.</p>
                        <p className="mt-1">Please try again in a moment, or send it by email instead.</p>
                        <Button href={mailto} variant="outline" className="mt-4 !px-5 !py-3" icon="external">Send by Email</Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
