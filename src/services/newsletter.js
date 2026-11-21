// Newsletter sign-up. Set VITE_NEWSLETTER_ENDPOINT to a provider endpoint that accepts a JSON POST
// with { email, name } (e.g. Buttondown, ConvertKit/Kit form API, Mailchimp via a small serverless
// function, or a Formspree form). Without it, the UI says plainly that sign-up isn't connected.
import { NotConfiguredError } from './contact'

export const isNewsletterConfigured = () => Boolean(import.meta.env.VITE_NEWSLETTER_ENDPOINT)

export async function subscribe({ email, name = '' }) {
  const endpoint = import.meta.env.VITE_NEWSLETTER_ENDPOINT
  if (!endpoint) throw new NotConfiguredError()
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 15000)
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ email, name, source: 'website-footer' }),
      signal: controller.signal,
    })
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
    return true
  } finally {
    clearTimeout(timer)
  }
}
