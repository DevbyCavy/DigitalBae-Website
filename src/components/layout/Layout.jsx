import { Suspense } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Header } from './Header'
import { Footer } from './Footer'
import { FloatingAction } from './FloatingAction'
import { CookieBanner } from './CookieBanner'
import { PageLoader } from '../ui/PageLoader'

export function Layout() {
  const location = useLocation()
  const outlet = useOutlet() // captured per page so the exiting page keeps its content while fading out
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
        <motion.main
          id="main"
          key={location.pathname}
          tabIndex={-1}
          className="outline-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Suspense fallback={<PageLoader />}>
            {outlet}
          </Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <FloatingAction />
      <CookieBanner />
    </>
  )
}
