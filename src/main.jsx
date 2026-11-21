import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
// Self-hosted fonts (no render-blocking request to Google; no visitor data sent to third parties)
import '@fontsource-variable/archivo/wdth.css'
import '@fontsource-variable/manrope'
import '@fontsource/cormorant-garamond/400.css'
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/600.css'
import '@fontsource/cormorant-garamond/400-italic.css'
import '@fontsource/cormorant-garamond/500-italic.css'
import '@fontsource/cormorant-garamond/600-italic.css'
import './index.css'

// index.html carries default SEO tags for crawlers that don't run JavaScript. Once the app runs,
// each page renders its own, so remove the defaults to avoid duplicate/conflicting tags.
document.querySelectorAll('[data-default-seo]').forEach((el) => el.remove())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
