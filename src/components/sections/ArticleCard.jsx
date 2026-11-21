import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { formatDate } from '../../lib/format'
import { SampleBadge } from '../ui/primitives'

/** Typographic article card (no stock imagery). */
export function ArticleCard({ article, index }) {
  return (
    <article className="group relative flex h-full flex-col rounded-[1.75rem] border border-plum/10 bg-white/55 p-7 transition-[transform,box-shadow,background-color] duration-700 ease-[var(--ease-editorial)] hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_30px_60px_-35px_rgba(68,36,63,0.45)]">
      <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-plum/75">
        {index != null && <span className="display text-base tracking-normal text-berry">{String(index + 1).padStart(2, '0')}</span>}
        <span className="rounded-full bg-blush/50 px-2.5 py-1 text-plum">{article.category}</span>
        <span aria-hidden="true">&middot;</span>
        <span>{article.readingTime} min read</span>
      </div>
      <h3 className="text-[1.85rem] leading-tight transition-colors duration-500 group-hover:text-berry">
        <Link to={`/insights/${article.slug}`} className="after:absolute after:inset-0">
          {article.title}
        </Link>
      </h3>
      <p className="mt-4 flex-1 leading-relaxed text-charcoal/70">{article.excerpt}</p>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <time dateTime={article.date} className="text-sm text-charcoal/70">{formatDate(article.date)}</time>
        <div className="flex items-center gap-3">
          {article.sample && <SampleBadge />}
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-plum/15 text-plum transition-all duration-500 group-hover:border-berry group-hover:bg-berry group-hover:text-ivory">
            <ArrowUpRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
          </span>
        </div>
      </div>
    </article>
  )
}
