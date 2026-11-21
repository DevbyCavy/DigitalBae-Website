// Cookie-consent state. Stored in localStorage (wrapped in try/catch so private
// browsing or blocked storage simply means "not decided yet").
const KEY = 'db-consent-v1'
const listeners = new Set()

export function getConsent() {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    return null
  }
}

export function setConsent(value) {
  try {
    localStorage.setItem(KEY, value)
  } catch {
    /* storage unavailable: the choice lasts for this page view only */
  }
  listeners.forEach((fn) => fn({ type: 'change', value }))
}

/** Re-open the banner (footer "Cookie settings" link). */
export function openCookieSettings() {
  listeners.forEach((fn) => fn({ type: 'open' }))
}

export function onConsentEvent(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}
