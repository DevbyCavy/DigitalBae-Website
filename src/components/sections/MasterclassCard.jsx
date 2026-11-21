import { Link } from 'react-router-dom'
import { Check, ArrowRight } from 'lucide-react'
import { masterclassStatus } from '../../data/masterclasses'
import { SampleBadge } from '../ui/primitives'

/** Editorial masterclass card. Enquiry only: no payments are taken on this site. */
export function MasterclassCard({ course, index = 0, variant = 'default' }) {
  const isFeature = variant === 'feature'
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-[2rem] transition-transform duration-700 ease-[var(--ease-editorial)] hover:-translate-y-1 ${
        isFeature
          ? 'on-dark bg-plum p-8 text-ivory shadow-[0_40px_80px_-40px_rgba(46,23,41,0.8)] md:p-12'
          : 'glass p-8 md:p-10'
      }`}
    >
      {isFeature && (
        <>
          <div aria-hidden="true" className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-berry/45 blur-3xl" />
          <div aria-hidden="true" className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-rose/25 blur-3xl" />
        </>
      )}
      <div className="relative mb-10 flex items-start justify-between gap-6">
        <span className={`display text-4xl leading-none ${isFeature ? 'text-blush' : 'text-berry/80'}`}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="flex flex-col items-end gap-2">
          <span
            className={`rounded-full border px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] ${
              isFeature ? 'border-blush/50 text-blush' : 'border-berry/40 text-berry'
            }`}
          >
            {masterclassStatus[course.status]}
          </span>
          <SampleBadge tone={isFeature ? 'dark' : 'light'}>Placeholder course</SampleBadge>
        </div>
      </div>

      <p className={`eyebrow relative mb-4 ${isFeature ? 'text-berry-soft' : 'text-berry'}`}>{course.category}</p>
      <h3 className={`relative leading-[1.02] ${isFeature ? 'text-[2.6rem] !text-ivory md:text-[3.4rem]' : 'text-3xl md:text-[2.3rem]'}`}>{course.title}</h3>
      <p className={`relative mt-5 max-w-xl leading-relaxed ${isFeature ? 'text-lg text-ivory/75' : 'text-charcoal/70'}`}>{course.summary}</p>

      <dl className={`relative mt-8 grid grid-cols-2 gap-4 rounded-2xl p-5 text-sm ${isFeature ? 'glass-dark' : 'bg-white/60'}`}>
        <div>
          <dt className={`eyebrow mb-1 !text-[0.6rem] ${isFeature ? 'text-ivory/60' : 'text-plum/75'}`}>Format</dt>
          <dd>{course.format}</dd>
        </div>
        <div>
          <dt className={`eyebrow mb-1 !text-[0.6rem] ${isFeature ? 'text-ivory/60' : 'text-plum/75'}`}>Duration</dt>
          <dd>{course.duration}</dd>
        </div>
      </dl>

      <div className="relative mt-8 flex-1">
        <p className={`eyebrow mb-4 ${isFeature ? 'text-berry-soft' : 'text-berry'}`}>You will</p>
        <ul className="space-y-3">
          {course.outcomes.map((o) => (
            <li key={o} className={`flex gap-3 leading-snug ${isFeature ? 'text-ivory/85' : 'text-charcoal/80'}`}>
              <Check aria-hidden="true" strokeWidth={1.5} className={`mt-0.5 h-4 w-4 shrink-0 ${isFeature ? 'text-gold' : 'text-berry'}`} />
              {o}
            </li>
          ))}
        </ul>
      </div>

      <Link
        to={`/contact?category=masterclasses&course=${course.id}`}
        className={`label-ui relative mt-10 inline-flex items-center gap-3 self-start rounded-full px-6 py-3.5 text-[0.7rem] transition-colors duration-500 ${
          isFeature ? 'bg-ivory text-plum hover:bg-blush' : 'bg-plum text-ivory hover:bg-berry'
        }`}
      >
        <span>Register interest</span>
        <ArrowRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
      </Link>
    </article>
  )
}
