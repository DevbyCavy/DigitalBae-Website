// Consent-gated analytics. Nothing loads unless BOTH an ID is configured in .env
// AND the visitor has clicked "Accept" on the cookie banner.
//
//   VITE_GA_MEASUREMENT_ID=G-XXXXXXX     -> Google Analytics 4
//   VITE_PLAUSIBLE_DOMAIN=yourdomain.com -> Plausible (cookieless; you may choose to skip the banner)

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID
const PLAUSIBLE_DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN

export const analyticsConfigured = Boolean(GA_ID || PLAUSIBLE_DOMAIN)

let loaded = false

function addScript(src, attrs = {}) {
  const s = document.createElement('script')
  s.async = true
  s.src = src
  Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v))
  document.head.appendChild(s)
}

export function loadAnalytics() {
  if (loaded || !analyticsConfigured || typeof window === 'undefined') return
  loaded = true
  if (GA_ID) {
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    // Page views are sent manually on route change (single-page app).
    window.gtag('config', GA_ID, { send_page_view: false, anonymize_ip: true })
    addScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`)
  }
  if (PLAUSIBLE_DOMAIN) {
    window.plausible = window.plausible || function plausible() {
      ;(window.plausible.q = window.plausible.q || []).push(arguments)
    }
    addScript('https://plausible.io/js/script.manual.js', { 'data-domain': PLAUSIBLE_DOMAIN })
  }
}

export function trackPageview(path) {
  if (!loaded) return
  if (GA_ID && window.gtag) window.gtag('event', 'page_view', { page_path: path, page_location: window.location.href, page_title: document.title })
  if (PLAUSIBLE_DOMAIN && window.plausible) window.plausible('pageview', { u: window.location.href })
}

/** Optional custom events, e.g. trackEvent('enquiry_submitted', { category: 'speaking' }). */
export function trackEvent(name, params = {}) {
  if (!loaded) return
  if (GA_ID && window.gtag) window.gtag('event', name, params)
  if (PLAUSIBLE_DOMAIN && window.plausible) window.plausible(name, { props: params })
}
