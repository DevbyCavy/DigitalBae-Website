import { Link } from 'react-router-dom'

export function Logo({ tone = 'dark', onClick }) {
  const light = tone === 'light'
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="Digital Bae, home"
      className={`group inline-flex items-baseline gap-1 leading-none transition-colors duration-500 ${light ? 'text-ivory' : 'text-plum'}`}
    >
      <span className="display text-[1.05rem] sm:text-[1.15rem]">Digital</span>
      <span className={`font-serif text-[1.55rem] italic sm:text-[1.7rem] ${light ? 'text-blush' : 'text-berry'}`}>Bae</span>
      <span
        aria-hidden="true"
        className="ml-0.5 h-1.5 w-1.5 rounded-full bg-gold transition-transform duration-500 group-hover:scale-150"
      />
    </Link>
  )
}
