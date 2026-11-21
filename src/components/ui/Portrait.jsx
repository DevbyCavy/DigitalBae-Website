import { useState } from 'react'
import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'

/**
 * Displays a supplied brand photograph without altering it (object-cover cropping only).
 * Fades in on load. Shows an elegant branded frame if the file isn't in /public/images yet.
 */
export function Portrait({
  image,
  className = '',
  imgClassName = '',
  sizes = '(min-width: 1024px) 45vw, 100vw',
  priority = false,
  position = 'center top',
  reveal = true,
}) {
  const [status, setStatus] = useState('loading') // loading | loaded | error

  if (status === 'error' || !image?.src) {
    return <PortraitPlaceholder label={image?.label} className={className} />
  }

  const srcSet = image.srcSet

  return (
    <motion.div
      className={`relative overflow-hidden bg-blush/40 ${className}`}
      initial={reveal && !priority ? { clipPath: 'inset(100% 0 0 0)' } : false}
      whileInView={reveal && !priority ? { clipPath: 'inset(0% 0 0 0)' } : undefined}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* srcSet lists WebP sizes; src is the JPEG fallback */}
      {status === 'loading' && (
        <div aria-hidden="true" className="absolute inset-0 animate-pulse bg-gradient-to-b from-blush/50 to-mist" />
      )}
      <img
        src={image.src}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        style={{ objectPosition: position }}
        className={`h-full w-full object-cover transition-[opacity,transform] duration-[1400ms] ease-[var(--ease-editorial)] ${
          status === 'loaded' ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0'
        } ${imgClassName}`}
      />
    </motion.div>
  )
}

export function PortraitPlaceholder({ label = 'Brand photograph', className = '' }) {
  return (
    <div
      role="img"
      aria-label={`${label} placeholder: supplied photograph to be added`}
      className={`grain relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-blush to-rose/70 ${className}`}
    >
      <div aria-hidden="true" className="absolute inset-4 border border-ivory/60" />
      <div aria-hidden="true" className="absolute -bottom-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-plum/10 blur-2xl" />
      <div className="relative px-6 text-center">
        <Camera aria-hidden="true" strokeWidth={1} className="mx-auto mb-4 h-8 w-8 text-plum/75" />
        <p className="font-serif text-2xl italic text-plum">{label}</p>
        <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-plum/85">
          Supplied photograph goes here
        </p>
      </div>
    </div>
  )
}
