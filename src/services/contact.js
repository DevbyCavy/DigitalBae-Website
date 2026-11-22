// Contact submission service.
// In production the form is delivered by Web3Forms (https://web3forms.com), which emails every enquiry to
// hello@digitalbae.online. The access key (VITE_WEB3FORMS_KEY in .env.production) is designed to be public.
// Alternatively, VITE_CONTACT_ENDPOINT can point at any service that accepts a JSON POST.
// With neither set (e.g. `npm run dev`), submitEnquiry throws NotConfiguredError and the UI is honest that
// nothing was sent.

const WEB3FORMS_URL = 'https://api.web3forms.com/submit'
const web3formsKey = import.meta.env.VITE_WEB3FORMS_KEY
const customEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT

export class NotConfiguredError extends Error {
  constructor() {
    super('Contact form endpoint is not configured')
    this.name = 'NotConfiguredError'
  }
}

export const isContactConfigured = () => Boolean(web3formsKey || customEndpoint)

function toWeb3Forms({ name, email, category, subject, message, hpField }) {
  return {
    access_key: web3formsKey,
    subject: `[Digital Bae] ${category}: ${subject}`,
    from_name: 'Digital Bae Website',
    replyto: email, // "Reply" in the inbox answers the visitor directly
    name,
    email,
    'Enquiry type': category,
    Subject: subject,
    message,
    botcheck: hpField || '', // honeypot: Web3Forms rejects submissions where this is filled
  }
}

export async function submitEnquiry(payload) {
  if (!isContactConfigured()) throw new NotConfiguredError()

  const url = web3formsKey ? WEB3FORMS_URL : customEndpoint
  const body = web3formsKey ? toWeb3Forms(payload) : payload

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 15000)
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok || data.success === false) throw new Error(data.message || `Request failed with status ${res.status}`)
    return true
  } finally {
    clearTimeout(timer)
  }
}

export function buildMailto(to, { name, email, category, subject, message }) {
  const body = `${message}\n\n---\nName: ${name}\nEmail: ${email}\nEnquiry type: ${category}`
  return `mailto:${to}?subject=${encodeURIComponent(`[${category}] ${subject}`)}&body=${encodeURIComponent(body)}`
}
