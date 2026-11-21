// Lightweight client-side spam friction. This deters simple bots; real protection must also
// happen server-side (e.g. Formspree's built-in spam filtering / reCAPTCHA, or your API).

const MIN_FILL_MS = 3000 // humans rarely complete a form in under 3 seconds
const COOLDOWN_MS = 60_000 // one submission per form per minute from the same browser

export function startTimer() {
  return Date.now()
}

/** Returns a reason string if the submission looks automated, otherwise null. */
export function checkSubmission({ honeypot, startedAt, formKey }) {
  if (honeypot) return 'bot'
  if (Date.now() - startedAt < MIN_FILL_MS) return 'too-fast'
  try {
    const last = Number(localStorage.getItem(`db-sent-${formKey}`) || 0)
    if (Date.now() - last < COOLDOWN_MS) return 'cooldown'
  } catch {
    /* storage unavailable: skip cooldown */
  }
  return null
}

export function markSubmitted(formKey) {
  try {
    localStorage.setItem(`db-sent-${formKey}`, String(Date.now()))
  } catch {
    /* ignore */
  }
}
