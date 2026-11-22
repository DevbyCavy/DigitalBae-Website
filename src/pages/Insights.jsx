import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Seo } from '../components/ui/Seo'
import { Container, SampleBadge, Ornament } from '../components/ui/primitives'
import { Reveal } from '../components/ui/Reveal'
import { PageHero } from '../components/sections/PageHero'
import { ArticleCard } from '../components/sections/ArticleCard'
import { CtaBanner } from '../components/sections/CtaBanner'
import { articles, categories, getFeaturedArticle } from '../data/articles'
import { formatDate, slugify } from '../lib/format'

export default function Insights() {
  const [params, setParams] = useSearchParams()
  const activeSlug = params.get('category')
  const active = categories.find((c) => slugify(c) === activeSlug) ?? null
  const featured = getFeaturedArticle()
  const list = articles.filter((a) => (active ? a.category === active : a !== featured))

  const choose = (cat) => {
    const next = new URLSearchParams(params)
    if (cat) next.set('category', slugify(cat))
    else next.delete('category')
    setParams(next, { replace: true, preventScrollReset: true })
  }

  return (
    <>
      <Seo
        title="Insights"
        description="Thought leadership from Taffy L. Gotora (Digital Bae) on leadership, innovation, personal branding and entrepreneurship."
      />

      <PageHero
        eyebrow="Insights"
        title={<>Notes on a <em>changing</em> world.</>}
        intro="Professional reflections, opinions and industry commentary, written to help you think clearly and act boldly."
      />

      {/* Featured article */}
      {!active && featured && (
        <section className="pb-20" aria-label="Featured article">
          <Container>
            <Reveal>
              <article className="group relative grid overflow-hidden rounded-[2rem] bg-plum text-ivory on-dark md:grid-cols-12">
                <div className="grain relative flex min-h-64 items-end bg-blush p-8 md:col-span-5 md:min-h-[28rem] md:p-12">
                  <span aria-hidden="true" className="absolute right-8 top-6 font-serif text-[9rem] italic leading-none text-plum/15 md:text-[12rem]">&ldquo;</span>
                  <div className="relative">
                    <p className="eyebrow text-berry">Featured &middot; {featured.category}</p>
                    <Ornament className="mt-6 !text-plum/75" />
                  </div>
                </div>
                <div className="flex flex-col justify-between p-8 md:col-span-7 md:p-14">
                  <div>
                    <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-ivory/60">
                      {featured.date && (
                        <>
                          <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                          <span aria-hidden="true">&middot;</span>
                        </>
                      )}
                      <span>{featured.readingTime} min read</span>
                      {featured.sample && <SampleBadge tone="dark">Sample</SampleBadge>}
                    </div>
                    <h2 className="text-headline !text-ivory">
                      <Link to={`/insights/${featured.slug}`} className="after:absolute after:inset-0">
                        {featured.title}
                      </Link>
                    </h2>
                    <p className="mt-6 max-w-xl text-lg leading-relaxed text-ivory/75">{featured.excerpt}</p>
                  </div>
                  <span className="mt-10 inline-flex items-center gap-3 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-blush">
                    Read article
                    <ArrowRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </span>
                </div>
              </article>
            </Reveal>
          </Container>
        </section>
      )}

      {/* Filters + list */}
      <section className="pb-24 md:pb-32" aria-labelledby="articles-title">
        <Container>
          <div className="flex flex-col gap-6 border-b border-plum/15 pb-6 lg:flex-row lg:items-center lg:justify-between">
            <h2 id="articles-title" className="text-3xl">{active ?? 'Latest articles'}</h2>
            <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
              {[null, ...categories].map((cat) => {
                const isActive = cat === active
                return (
                  <button
                    key={cat ?? 'all'}
                    type="button"
                    onClick={() => choose(cat)}
                    aria-pressed={isActive}
                    className={`label-ui rounded-full border px-4 py-2.5 text-[0.62rem] transition-colors duration-500 ${
                      isActive ? 'border-plum bg-plum text-ivory' : 'border-plum/20 text-plum hover:border-plum'
                    }`}
                  >
                    {cat ?? 'All'}
                  </button>
                )
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active ?? 'all'}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              aria-live="polite"
            >
              {list.length ? (
                <div className="mt-12 grid gap-14 md:grid-cols-2 lg:grid-cols-3">
                  {list.map((a, i) => (
                    <ArticleCard key={a.slug} article={a} index={i} />
                  ))}
                </div>
              ) : (
                <div className="py-24 text-center">
                  <p className="font-serif text-3xl italic text-plum">New writing on {active} is on its way.</p>
                  <button type="button" onClick={() => choose(null)} className="link-underline mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-plum">
                    View all articles
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </Container>
      </section>

      <CtaBanner
        eyebrow="Media & Commentary"
        title={<>Looking for a voice on <em className="text-blush">digital change?</em></>}
        text="For interviews, guest articles and expert commentary, get in touch."
        primary={{ label: 'Media Enquiries', to: '/contact?category=media' }}
        secondary={null}
      />
    </>
  )
}
