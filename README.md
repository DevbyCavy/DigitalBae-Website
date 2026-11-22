# Digital Bae: Personal Brand Website

A premium, editorial, multi-page personal brand website built with **React 19, Vite 6, Tailwind CSS 4, Framer Motion, React Router 7 and Lucide**.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # serve the production build locally
```

Requires Node 18+ (tested on Node 24).

## Before launch: replace the placeholders

Everything still waiting on the client is marked in the code with `placeholder: true`, `sample: true` or `[square brackets]`, and on the site with a dashed gold **Sample content / Placeholder** badge.

| What | Where |
| --- | --- |
| **Photos** (portraits, events, awards) | originals in `source-media/images/` → run `npm run optimize-images` |
| **Videos** | `public/media/*.mp4` + poster frames; listed in `src/data/media.js` |
| Photo captions, event names | `src/data/media.js` |
| Biography, journey, milestones | `src/data/about.js` |
| Contact emails, location | `src/data/site.js` → `contact` |
| Social profile URLs | `src/data/social.js` |
| Speaking topics (proposed), engagements, event photos | `src/data/speaking.js` |
| Testimonials | `src/data/testimonials.js` |
| Masterclasses (all "Coming soon") | `src/data/masterclasses.js` |
| Articles (all sample) | `src/data/articles.js` |
| Areas of expertise | `src/data/expertise.js` |

### Photos and video

Original photos live in `source-media/images/` with clean kebab-case names (e.g. `portrait-seated.jpg`, `event-ad-day-zambia.jpg`). After adding or replacing one, run:

```bash
npm run optimize-images
```

This writes a 1600px JPEG plus 800/1600px WebP copies of each photo to `public/images/`, a 1200x630 `og-image.jpg`, and `src/data/media-manifest.json` with real image sizes. Photos are only resized, never altered. Reference a photo in `src/data/media.js` with `photo('<name>', '<alt text>')`.

Videos are served as-is from `public/media/` and only download when a visitor presses play. Originals are kept in `source-media/videos/`. To add one, put the `.mp4` and a poster `.jpg` in `public/media/` and add an entry to `videos` in `src/data/media.js`.

Name and credential line (`owner` in `src/data/site.js`) were taken from the supplied ZTN Prime interview caption. Confirm them with the client.

Remove a placeholder badge by setting its `placeholder`/`sample` flag to `false` (or deleting it) once real content is in.

## Contact form

Enquiries are delivered by [Web3Forms](https://web3forms.com) to **hello@digitalbae.online**. No server code is needed, so it works with Hostinger's static Vite deployment.

- The access key is **not stored in the repository**. Set `VITE_WEB3FORMS_KEY` (and `VITE_SITE_URL`) in Hostinger: Websites > digitalbae.online > Deployments > Environment variables, then redeploy. For local production builds, put them in a git-ignored `.env.production`. To change the receiving address, update it in the Web3Forms dashboard.
- The email subject reads `[Digital Bae] <Enquiry type>: <Subject>`, and **Reply** goes straight to the visitor.
- A success message is shown only when Web3Forms confirms delivery; failures show an error with a one-click "email us directly" fallback.
- Spam protection: a honeypot field (also passed to Web3Forms as `botcheck`), a 3-second time trap and a 60-second cooldown.
- In `npm run dev` the key isn't loaded, so the form honestly says nothing was sent and offers the email fallback. Use `npm run build && npm run preview` to test real sending.
- Alternatively, set `VITE_CONTACT_ENDPOINT` to any service that accepts a JSON POST.

Links like `/contact?category=speaking` pre-select the enquiry type.

## Project structure

```
src/
  data/            ← all editable content (CMS-ready: swap these for API calls later)
  components/
    layout/        Header (sticky, hide-on-scroll, accessible mobile menu), Footer, Layout (page transitions)
    ui/            Button, Container, Eyebrow, SectionHeading, SampleBadge, Ornament, Reveal, Portrait, Seo, Logo, SocialIcon, PageLoader
    sections/      PageHero, CtaBanner, ArticleCard, MasterclassCard, Testimonials
  pages/           Home, About, Speaking, Masterclasses, Insights, Article, Contact, NotFound, RouteError
  services/        contact.js (form submission, ready for an API)
  lib/             formatting helpers
  index.css        design tokens (Tailwind @theme) + base styles
```

### Design system

- **Colour tokens** (`src/index.css`): `blush #EBC6D0`, `rose #D9A5B5`, `plum #44243F`, `ivory #FAF7F3`, `gold #C6A46A`, `charcoal #242124`, plus `plum-deep`, `mist` (soft section background) and `gold-deep` (an accessible gold for small text on light backgrounds).
- **Type:** Archivo (extended, black, uppercase statement headlines), Cormorant Garamond italic (rose accent words and editorial text), Manrope (body/UI). All self-hosted via @fontsource; no Google Fonts request.
- **Motion:** subtle reveal-on-scroll, masked headline entrance, gentle hero parallax, page cross-fades. All of it respects the visitor's `prefers-reduced-motion` setting.
- **Accessibility:** skip link, visible focus styles, a focus-trapped mobile menu that closes on Esc, labelled form fields with `aria-invalid` and error descriptions, live regions for form status.

### Adding content

- **New article:** add an object to `articles` in `src/data/articles.js`. Its page at `/insights/<slug>` is created automatically. Body blocks: `p`, `h2`, `quote`, `list`.
- **New masterclass:** add to `masterclasses`; set `status` to `coming-soon`, `open` or `waitlist`. There is no payment flow; registration goes through the contact form.
- **New page:** create it in `src/pages/`, add a route in `src/App.jsx` and a nav item in `src/data/site.js`.

## SEO

Each page sets its own `<title>`, description, canonical URL, Open Graph and Twitter tags (React 19 places them in `<head>`). Set `VITE_SITE_URL` in `.env` so canonical and OG URLs are absolute.

Note: social crawlers (LinkedIn, Facebook, X) don't run JavaScript, so link previews use the defaults in `index.html`. If per-page previews matter, add pre-rendering (e.g. `vite-plugin-prerender` or move to a static-generation setup) at a later stage.

## Deployment

Run `npm run build` and upload the `dist/` folder. Because this is a single-page app, the host must send unknown paths to `index.html`. That is already set up for:

- **Netlify:** `public/_redirects` (included)
- **Vercel:** `vercel.json` (included)
- **Apache / cPanel / XAMPP:** `public/.htaccess` (included; needs `mod_rewrite`)

For a sub-folder deployment (e.g. `http://localhost/digitalbae/`), set `base: '/digitalbae/'` in `vite.config.js` and `RewriteBase /digitalbae/` in `.htaccess`, then rebuild. Point React Router at the same base by adding `{ basename: '/digitalbae' }` to `createBrowserRouter` in `src/App.jsx`.

## Launch checklist

| Item | Status | What you still need to do |
| --- | --- | --- |
| Privacy Policy `/privacy` & Terms `/terms` | Template pages built | Fill every `[bracket]` in `src/data/legal.js` and have them legally reviewed |
| Secrets | Audited: only public `VITE_*` values are used | Never put API keys or passwords in `.env`; anything `VITE_*` is public |
| HTTPS | Forced in `.htaccess` (+ HSTS, security headers); Netlify/Vercel are HTTPS by default | Install an SSL certificate on Apache/cPanel hosting |
| Cookie consent | Built; shown only when analytics is configured; analytics loads only after "Accept" | — |
| Analytics | Consent-gated GA4 or Plausible | Set `VITE_GA_MEASUREMENT_ID` **or** `VITE_PLAUSIBLE_DOMAIN` |
| Meta titles/descriptions, canonical, structured data | Per page | — |
| Social preview | `public/images/og-image.jpg` (1200x630, branded) | — |
| Favicon / app icons | `favicon-16/32.png`, `apple-touch-icon.png`, `icon-192/512.png`, `site.webmanifest` | — |
| Sitemap & robots.txt | Generated on every build (`npm run seo`) | Set `VITE_SITE_URL` to the real domain before building |
| Alt text, colour contrast, keyboard access | axe-core: 0 violations on every page (desktop + mobile) | Write alt text for any new photos in `src/data/media.js` |
| Images | WebP + responsive sizes; videos load on demand; hero video skipped on mobile/data-saver | — |
| Forms | Validation, honeypot, 3-second time-trap, 60-second resubmit cooldown | Contact: Web3Forms key set. Newsletter: set `VITE_NEWSLETTER_ENDPOINT`, enable the provider's server-side spam filter |
| Newsletter | Footer sign-up | Connect a provider (see `.env.example`) |
| Social links | Placeholder URLs | Replace in `src/data/social.js` |
| Primary call to action | "Work With Me" → `/contact` everywhere | — |

Production build checks run before handover: Lighthouse SEO 100, Accessibility 100 and Best Practices 100 on every page tested; Performance 99 on desktop and roughly 67–83 on Lighthouse's throttled mobile profile.
