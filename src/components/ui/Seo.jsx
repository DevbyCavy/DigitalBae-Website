import { useLocation } from 'react-router-dom'
import { site, owner } from '../../data/site'
import { socialLinks } from '../../data/social'

const base = () => site.url.replace(/\/$/, '')

/** Structured data describing the person behind the brand (used on Home and About). */
export const personJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: owner.name,
  alternateName: site.name,
  jobTitle: 'Author, Digital Marketer and Speaker',
  description: site.description,
  url: base(),
  image: `${base()}/images/portrait-seated.jpg`,
  sameAs: socialLinks.map((s) => s.href),
})

/**
 * Per-page SEO + Open Graph. React 19 hoists <title>/<meta>/<link> into <head>.
 * Keep titles under ~60 characters and descriptions around 120-160.
 * Social crawlers that don't run JavaScript read the defaults in index.html.
 */
export function Seo({
  title,
  description = site.description,
  image = site.defaultOgImage,
  imageAlt = 'Digital Bae: Taffy L. Gotora, author, digital marketer and speaker',
  type = 'website',
  noindex = false,
  article, // { publishedTime, section }
  jsonLd,
}) {
  const { pathname } = useLocation()
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | ${site.tagline}`
  const url = `${base()}${pathname}`
  const imageUrl = image?.startsWith('http') ? image : `${base()}${image}`

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {article?.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
      {article?.section && <meta property="article:section" content={article.section} />}
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </>
  )
}
