// Contact submission service. No backend ships with this site.
// Set VITE_CONTACT_ENDPOINT (e.g. a Formspree/Basin form URL or your own API) to enable real sending.
// Without it, submitEnquiry throws NotConfiguredError and the UI is honest that nothing was sent.

export class NotConfiguredError extends Error {
  constructor() {
    super('Contact form endpoint is not configured')
    this.name = 'NotConfiguredError'
  }
}

export const isContactConfigured = () => Boolean(import.meta.env.VITE_CONTACT_ENDPOINT)

export async function submitEnquiry(payload) {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT
  if (!endpoint) throw new NotConfiguredError()

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 15000)
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
    return true
  } finally {
    clearTimeout(timer)
  }
}

export function buildMailto(to, { name, email, category, subject, message }) {
  const body = `${message}\n\n---\nName: ${name}\nEmail: ${email}\nEnquiry type: ${category}`
  return `mailto:${to}?subject=${encodeURIComponent(`[${category}] ${subject}`)}&body=${encodeURIComponent(body)}`
}
