import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'

export function Container({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag className={`mx-auto w-full max-w-[82.5rem] px-5 sm:px-8 lg:px-12 ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

/** Bold coloured label that sits above a statement headline. */
export function Eyebrow({ children, tone = 'berry', className = '' }) {
  const tones = {
    berry: 'text-berry',
    plum: 'text-plum/85',
    gold: 'text-berry', // legacy alias
    light: 'text-berry-soft',
  }
  return <p className={`eyebrow flex items-center gap-2.5 ${tones[tone] ?? tones.berry} ${className}`}>{children}</p>
}

const buttonBase =
  'btn-shine label-ui group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-7 py-4 text-[0.72rem] transition-[background-color,color,border-color,box-shadow,transform] duration-500 ease-[var(--ease-editorial)] hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60'

const buttonVariants = {
  primary: 'bg-plum text-ivory shadow-[0_14px_30px_-14px_rgba(68,36,63,0.7)] hover:bg-berry',
  berry: 'bg-berry text-ivory shadow-[0_14px_30px_-14px_rgba(163,58,99,0.75)] hover:bg-plum',
  outline: 'border border-plum/30 text-plum hover:border-plum hover:bg-plum hover:text-ivory',
  light: 'bg-ivory text-plum hover:bg-blush',
  glass: 'glass-dark text-ivory hover:bg-white/25',
  'glass-light': 'glass text-plum hover:bg-white/80',
  'outline-light': 'border border-ivory/40 text-ivory hover:border-ivory hover:bg-ivory hover:text-plum',
  text: '!rounded-none !px-0 !py-1 text-plum hover:!translate-y-0',
}

/** Button renders a router Link (to), an anchor (href) or a <button>. */
export function Button({ to, href, variant = 'primary', icon = 'arrow', className = '', children, ...rest }) {
  const Icon = icon === 'external' ? ArrowUpRight : icon === 'arrow' ? ArrowRight : null
  const classes = `${buttonBase} ${buttonVariants[variant]} ${className}`
  const content = (
    <>
      <span className={variant === 'text' ? 'link-underline' : ''}>{children}</span>
      {Icon && (
        <Icon
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:translate-x-1"
          strokeWidth={1.75}
        />
      )}
    </>
  )
  if (to) return <Link to={to} className={classes} {...rest}>{content}</Link>
  if (href) return <a href={href} className={classes} {...rest}>{content}</a>
  return <button className={classes} {...rest}>{content}</button>
}

/** Small label flagging content that still needs real information from the brand owner. */
export function SampleBadge({ children = 'Sample content', tone = 'light', className = '' }) {
  const tones = {
    light: 'border-berry/40 text-berry bg-white/60',
    dark: 'border-blush/40 text-blush bg-white/5',
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-dashed px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] ${tones[tone]} ${className}`}
    >
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-current" />
      {children}
    </span>
  )
}

const revealEase = [0.22, 1, 0.36, 1]

export function SectionHeading({ eyebrow, title, intro, align = 'left', tone = 'dark', className = '' }) {
  const isCenter = align === 'center'
  return (
    <div className={`${isCenter ? 'mx-auto text-center' : ''} max-w-3xl ${tone === 'light' ? 'on-dark' : ''} ${className}`}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.7, ease: revealEase }}
        >
          <Eyebrow tone={tone === 'light' ? 'light' : 'berry'} className={`mb-5 ${isCenter ? 'justify-center' : ''}`}>
            {eyebrow}
          </Eyebrow>
        </motion.div>
      )}
      <motion.h2
        className={`text-headline ${tone === 'light' ? '!text-ivory' : ''}`}
        initial={{ opacity: 0, y: '0.6em', clipPath: 'inset(0 -50% 100% -50%)' }}
        whileInView={{ opacity: 1, y: 0, clipPath: 'inset(-20% -50% -20% -50%)' }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1, ease: revealEase, delay: 0.08 }}
      >
        {title}
      </motion.h2>
      {intro && (
        <motion.p
          className={`mt-6 text-lg leading-relaxed ${tone === 'light' ? 'text-ivory/75' : 'text-charcoal/75'}`}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.9, ease: revealEase, delay: 0.2 }}
        >
          {intro}
        </motion.p>
      )}
    </div>
  )
}

/** Four-point sparkle: a small glamorous accent, used sparingly. */
export function Sparkle({ className = 'h-4 w-4 text-gold' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 0c.6 5.6 2.4 9.4 12 12-9.6 2.6-11.4 6.4-12 12-.6-5.6-2.4-9.4-12-12C9.6 9.4 11.4 5.6 12 0z" />
    </svg>
  )
}

/** Decorative divider: hairlines framing a sparkle. */
export function Ornament({ className = '' }) {
  return (
    <span aria-hidden="true" className={`flex items-center gap-3 text-gold ${className}`}>
      <span className="h-px w-10 bg-current opacity-70" />
      <Sparkle className="twinkle h-3 w-3" />
      <span className="h-px w-10 bg-current opacity-70" />
    </span>
  )
}

/** Soft blurred colour fields that give glass surfaces something to refract. */
export function Glow({ className = '' }) {
  return (
    <div aria-hidden="true" className={`glow-drift pointer-events-none absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_14%,#000_80%,transparent)] ${className}`}>
      <div className="absolute -left-24 top-[10%] h-[26rem] w-[26rem] rounded-full bg-blush/70 blur-3xl" />
      <div className="absolute -right-20 bottom-[5%] h-[22rem] w-[22rem] rounded-full bg-rose/50 blur-3xl" />
      <div className="absolute left-[45%] top-[40%] h-56 w-56 rounded-full bg-berry/10 blur-3xl" />
    </div>
  )
}
