import { motion } from 'framer-motion'
import { Container, Eyebrow, Glow } from '../ui/primitives'

const ease = [0.22, 1, 0.36, 1]

/** Editorial page opener for inner pages. */
export function PageHero({ eyebrow, title, intro, children, aside }) {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 md:pb-24 md:pt-48">
      <Glow />
      <Container className="relative grid gap-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
            <Eyebrow tone="gold" className="mb-8">{eyebrow}</Eyebrow>
          </motion.div>
          <motion.h1
            className="text-display"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.1 }}
          >
            {title}
          </motion.h1>
        </div>
        {(intro || aside) && (
          <motion.div
            className="lg:col-span-4 lg:pb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.3 }}
          >
            {intro && <p className="text-lg leading-relaxed text-charcoal/75">{intro}</p>}
            {aside}
          </motion.div>
        )}
      </Container>
      {children}
    </section>
  )
}
