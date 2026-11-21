import { Expand } from 'lucide-react'
import { Portrait } from '../ui/Portrait'

/** Captioned event photograph with a slow hover zoom. Pass onOpen to make it open a lightbox. */
export function EventPhoto({ item, className = '', aspect = 'aspect-[4/3]', sizes = '(min-width: 1024px) 33vw, 100vw', position = 'center', onOpen }) {
  const image = (
    <Portrait image={item.image} className={`${aspect} w-full`} imgClassName="group-hover:scale-[1.04]" sizes={sizes} position={position} />
  )
  return (
    <figure className={`group ${className}`}>
      <div className="relative overflow-hidden rounded-[1.75rem]">
        {onOpen ? (
          <button type="button" onClick={onOpen} aria-label={`View larger: ${item.event}`} className="block w-full cursor-zoom-in">
            {image}
            <span aria-hidden="true" className="glass-dark absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-ivory opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
              <Expand className="h-4 w-4" strokeWidth={1.5} />
            </span>
          </button>
        ) : (
          image
        )}
      </div>
      <figcaption className="mt-4 flex items-start justify-between gap-4">
        <span>
          <span className="block font-serif text-xl leading-snug text-plum">{item.event}</span>
          <span className="mt-0.5 block text-sm text-charcoal/70">{item.detail}</span>
        </span>
        <span className="eyebrow shrink-0 rounded-full bg-blush/50 px-3 py-1.5 !text-[0.58rem] text-berry">{item.role}</span>
      </figcaption>
    </figure>
  )
}
