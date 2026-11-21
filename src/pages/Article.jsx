import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowLeft, Link2, Check } from 'lucide-react'
import { Seo } from '../components/ui/Seo'
import { Container, Eyebrow, SampleBadge, Ornament } from '../components/ui/primitives'
import { SocialIcon } from '../components/ui/SocialIcon'
import { ArticleCard } from '../components/sections/ArticleCard'
import { getArticle, articles } from '../data/articles'
import { formatDate, slugify } from '../lib/format'
import NotFound from './NotFound'

const ease = [0.22, 1, 0.36, 1]

function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2>{block.text}</h2>
    case 'quote':
      return <blockquote>{block.text}</blockquote>
    case 'list':
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )
    default:
      return <p>{block.text}</p>
  }
}

function ShareLinks({ title }) {
  const [copied, setCopied] = useState(false)
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const u = encodeURIComponent(url)
  const t = encodeURIComponent(title)
  const links = [
    { network: 'linkedin', label: 'Share on LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { network: 'x', label: 'Share on X', href: `https://x.com/intent/post?url=${u}&text=${t}` },
    { network: 'facebook', label: 'Share on Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { network: 'mail', label: 'Share by email', href: `mailto:?subject=${t}&body=${u}` },
  ]
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }
  const cls = 'flex h-11 w-11 items-center justify-center rounded-full border border-plum/20 text-plum transition-colors duration-500 hover:border-plum hover:bg-plum hover:text-ivory'
  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="eyebrow text-plum/75">Share</span>
      <ul className="flex gap-2">
        {links.map((l) => (
          <li key={l.network}>
            <a href={l.href} target={l.network === 'mail' ? undefined : '_blank'} rel="noreferrer" aria-label={l.label} className={cls}>
              <SocialIcon network={l.network} />
            </a>
          </li>
        ))}
        <li>
          <button type="button" onClick={copy} aria-label="Copy link" className={cls}>
            {copied ? <Check aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} /> : <Link2 aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />}
          </button>
        </li>
      </ul>
      <span role="status" className="text-sm text-plum/85">{copied ? 'Link copied' : ''}</span>
    </div>
  )
}

export default function Article() {
  const { slug } = useParams()
  const article = getArticle(slug)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  if (!article) return <NotFound />

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3)

  return (
    <>
      <Seo
        title={article.title}
        description={article.excerpt}
        type="article"
        noindex={article.sample}
        article={{ publishedTime: article.date, section: article.category }}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.excerpt,
          datePublished: article.date,
          articleSection: article.category,
          author: { '@type': 'Person', name: 'Tafadzwa L. Gotora' },
          publisher: { '@type': 'Organization', name: 'Digital Bae' },
        }}
      />
      <motion.div aria-hidden="true" style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gold" />

      <article>
        <header className="pb-14 pt-36 md:pt-44">
          <Container className="max-w-4xl">
            <Link to="/insights" className="group mb-12 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-plum/85 hover:text-plum">
              <ArrowLeft aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1" />
              All insights
            </Link>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
              <Link to={`/insights?category=${slugify(article.category)}`}>
                <Eyebrow tone="gold">{article.category}</Eyebrow>
              </Link>
            </motion.div>
            <motion.h1
              className="mt-8 text-[clamp(2rem,4.4vw,3.9rem)] leading-[0.98]"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 0.1 }}
            >
              {article.title}
            </motion.h1>
            <motion.p
              className="mt-8 max-w-2xl font-serif text-2xl italic leading-snug text-plum/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {article.excerpt}
            </motion.p>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-plum/15 py-5 text-sm text-charcoal/70">
              <span className="font-semibold text-plum">Digital Bae</span>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span>{article.readingTime} min read</span>
              {article.sample && <SampleBadge>Sample article</SampleBadge>}
            </div>
          </Container>
        </header>

        <Container className="max-w-3xl pb-20">
          <div className="prose-editorial">
            {article.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
          <Ornament className="my-14" />
          <ShareLinks title={article.title} />
        </Container>
      </article>

      <section className="border-t border-plum/10 bg-mist py-20 md:py-28" aria-labelledby="related-title">
        <Container>
          <h2 id="related-title" className="text-headline">Keep <em>reading</em></h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
