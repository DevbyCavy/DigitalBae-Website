import { useRef, useState } from 'react'
import { Play } from 'lucide-react'

/** Poster-first video: nothing downloads until the visitor presses play. */
export function VideoCard({ video, tone = 'dark', className = '' }) {
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)
  const ref = useRef(null)
  const light = tone === 'light'

  return (
    <figure className={`group ${className}`}>
      <div className="relative aspect-video overflow-hidden rounded-[1.75rem] bg-charcoal">
        {playing ? (
          <video
            ref={ref}
            src={video.src}
            poster={video.poster}
            controls
            autoPlay
            playsInline
            preload="metadata"
            onError={() => setFailed(true)}
            className="h-full w-full bg-black object-contain"
          >
            Your browser does not support embedded video.
          </video>
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${video.title} (${video.duration})`}
            className="absolute inset-0 h-full w-full"
          >
            <img
              src={video.poster}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-editorial)] group-hover:scale-[1.03]"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-plum-deep/70 via-plum-deep/10 to-transparent" />
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/70 bg-ivory/15 text-ivory backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-ivory group-hover:text-plum md:h-20 md:w-20"
            >
              <Play className="ml-1 h-6 w-6" strokeWidth={1.25} fill="currentColor" />
            </span>
            <span aria-hidden="true" className="glass-dark absolute bottom-4 right-4 rounded-full px-3 py-1 text-xs font-semibold tracking-[0.1em] text-ivory">
              {video.duration}
            </span>
          </button>
        )}
        {failed && (
          <p role="alert" className="absolute inset-x-0 bottom-0 bg-plum p-3 text-center text-sm text-ivory">
            This video could not be loaded. <a className="underline" href={video.src}>Open it directly</a>.
          </p>
        )}
      </div>
      <figcaption className="mt-5">
        <p className={`eyebrow ${light ? 'text-berry-soft' : 'text-berry'}`}>{video.kind}</p>
        <p className={`mt-2 font-serif text-2xl leading-snug ${light ? 'text-ivory' : 'text-plum'}`}>{video.title}</p>
        <p className={`mt-1 text-sm ${light ? 'text-ivory/60' : 'text-charcoal/70'}`}>{video.source}</p>
      </figcaption>
    </figure>
  )
}
