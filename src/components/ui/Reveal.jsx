import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

/** Subtle entrance animation when the element scrolls into view. Honours reduced-motion via MotionConfig. */
export function Reveal({ as = 'div', delay = 0, y = 24, className = '', children, ...rest }) {
  const Tag = motion[as] ?? motion.div
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, ease, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Staggered children reveal. Wrap items in <RevealItem>. */
export function RevealGroup({ as = 'div', className = '', stagger = 0.1, children, ...rest }) {
  const Tag = motion[as] ?? motion.div
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function RevealItem({ as = 'div', className = '', children, ...rest }) {
  const Tag = motion[as] ?? motion.div
  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
