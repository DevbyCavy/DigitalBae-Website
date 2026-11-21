// Generates public/sitemap.xml and public/robots.txt from the site's routes and articles.
// Runs automatically before `npm run build` (see "prebuild" in package.json).
// Uses VITE_SITE_URL from the environment or .env / .env.production.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { articles } from '../src/data/articles.js'

const root = process.cwd()
function readEnv(key) {
  if (process.env[key]) return process.env[key]
  for (const f of ['.env.production.local', '.env.production', '.env.local', '.env']) {
    const p = join(root, f)
    if (!existsSync(p)) continue
    const m = readFileSync(p, 'utf8').match(new RegExp(`^${key}=(.*)$`, 'm'))
    if (m && m[1].trim()) return m[1].trim().replace(/^['"]|['"]$/g, '')
  }
  return ''
}

const siteUrl = (readEnv('VITE_SITE_URL') || 'https://www.example.com').replace(/\/$/, '')
const today = new Date().toISOString().slice(0, 10)

const pages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.9', changefreq: 'monthly' },
  { path: '/speaking', priority: '0.9', changefreq: 'monthly' },
  { path: '/masterclasses', priority: '0.8', changefreq: 'monthly' },
  { path: '/insights', priority: '0.8', changefreq: 'weekly' },
  { path: '/contact', priority: '0.7', changefreq: 'yearly' },
  { path: '/privacy', priority: '0.2', changefreq: 'yearly' },
  { path: '/terms', priority: '0.2', changefreq: 'yearly' },
  // Sample articles are noindexed, so they are left out until replaced with real writing.
  ...articles.filter((a) => !a.sample).map((a) => ({ path: `/insights/${a.slug}`, priority: '0.6', changefreq: 'yearly', lastmod: a.date })),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${siteUrl}${p.path}</loc>
    <lastmod>${p.lastmod || today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`

writeFileSync(join(root, 'public', 'sitemap.xml'), xml)
writeFileSync(join(root, 'public', 'robots.txt'), robots)
console.log(`sitemap.xml (${pages.length} URLs) and robots.txt written for ${siteUrl}`)
if (/example.com|localhost|127.0.0.1/.test(siteUrl)) console.warn('! Set VITE_SITE_URL in .env to your real domain before deploying.')
