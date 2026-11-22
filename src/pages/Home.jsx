import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Play } from 'lucide-react'
import { Seo, personJsonLd } from '../components/ui/Seo'
import { Container, Button, Eyebrow, SectionHeading, Sparkle, Glow } from '../components/ui/primitives'
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { Portrait } from '../components/ui/Portrait'
import { ArticleCard } from '../components/sections/ArticleCard'
import { MasterclassCard } from '../components/sections/MasterclassCard'
import { CtaBanner } from '../components/sections/CtaBanner'
import { EventPhoto } from '../components/sections/EventPhoto'
import { VideoCard } from '../components/sections/VideoCard'
import { portraits, owner } from '../data/site'
import { eventPhotos, videos, heroVideo, seenAt } from '../data/media'
import { expertise, positioning } from '../data/expertise'
import { speakingTopics } from '../data/speaking'
import { articles } from '../data/articles'
import { masterclasses } from '../data/masterclasses'

const ease = [0.22, 1, 0.36, 1]

/* ---------- Hero: full-screen stage video with glass details ---------- */

function useHeroVideo() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  // Only download the background video on larger screens without data-saver; others get the poster.
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const saveData = navigator.connection?.saveData
    const small = window.matchMedia('(max-width: 767px)').matches
    if (reduce || saveData || small) return setAllowed(false)
    // Wait until the page has loaded so the video never competes with first paint.
    const go = () => setAllowed(true)
    if (document.readyState === 'complete') { const t = setTimeout(go, 300); return () => clearTimeout(t) }
    window.addEventListener('load', go, { once: true })
    return () => window.removeEventListener('load', go)
  }, [reduce])

  useEffect(() => {
    const v = ref.current
    if (!v || !allowed) return
    v.play().catch(() => {})
  }, [allowed])

  return { ref, allowed }
}

function Hero() {
  const video = useHeroVideo()
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.22])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const lines = [
    <>Bold ideas.</>,
    <>Digital influence.</>,
    <>Meaningful <em>impact.</em></>,
  ]

  return (
    <section ref={sectionRef} className="on-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#141113] text-ivory" aria-label="Introduction">
      {/* Background video (muted, decorative). Poster shows instantly and for reduced-motion visitors. */}
      <motion.video
        ref={video.ref}
        style={{ y: videoY, scale: videoScale }}
        className="absolute inset-0 -z-20 h-full w-full object-cover blur-[6px]"
        src={video.allowed ? heroVideo.src : undefined}
        poster={heroVideo.poster}
        muted
        loop
        playsInline
        preload={video.allowed ? 'auto' : 'none'}
        aria-hidden="true"
        tabIndex={-1}
      />
      {/* Neutral shading for legibility; the footage keeps its own colour. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/45 to-black/35" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />
      <div aria-hidden="true" className="grain absolute inset-0 -z-10" />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="flex flex-1 flex-col">
      <Container className="relative flex flex-1 flex-col justify-center pb-10 pt-28 md:pb-12 md:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.05 }}>
              <Eyebrow tone="light" className="mb-6">
                <Sparkle className="twinkle h-3 w-3 text-gold" />
                {owner.name}
              </Eyebrow>
            </motion.div>

            <h1 className="!text-ivory text-[clamp(1.9rem,4.5vw,4.35rem)] leading-[0.94]">
              {lines.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.1em]">
                  <motion.span
                    className="block"
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease, delay: 0.1 + i * 0.1 }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.div initial={{ opacity: 0.001, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.3 }}>
              <p className="mt-7 max-w-lg text-base leading-relaxed text-ivory/80 md:text-[1.075rem]">
                <span className="font-semibold text-ivory">{positioning.line}</span> Helping people and organisations
                build relevance, command visibility, cultivate influence and turn intelligence and relationships into opportunity.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button to="/contact" variant="light">Work With Me</Button>
                <Button to="/about" variant="glass">Discover My Story</Button>
              </div>
            </motion.div>
          </div>

          {/* Glass profile card */}
          <motion.aside
            className="hidden lg:col-span-4 lg:block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease, delay: 0.6 }}
            aria-label="Profile"
          >
            <div className="glass-dark float-slow ml-auto max-w-[22rem] rounded-[2rem] p-3">
              <Portrait
                image={portraits.seated}
                priority
                className="aspect-[4/4.4] rounded-t-full rounded-b-[1.5rem]"
                sizes="22rem"
              />
              <div className="px-3 pb-3 pt-5">
                <p className="eyebrow text-berry-soft">The voice behind the brand</p>
                <p className="mt-2 font-serif text-[1.65rem] italic leading-tight text-ivory">{owner.name}</p>
                <p className="mt-1 text-sm leading-snug text-ivory/70">{owner.credentials}</p>
                <a href="#media" className="label-ui mt-5 inline-flex items-center gap-2 text-[0.65rem] text-blush hover:text-ivory">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                    <Play aria-hidden="true" className="ml-0.5 h-3 w-3" fill="currentColor" />
                  </span>
                  Watch the interview
                </a>
              </div>
            </div>
          </motion.aside>
        </div>

      </Container>

      {/* "As seen at": open, full-width scrolling strip along the bottom of the hero */}
      <motion.div
        className="relative border-t border-white/15"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
      >
        <div className="mx-auto flex max-w-[82.5rem] items-center gap-6 px-5 py-6 sm:px-8 lg:px-12">
          <span className="eyebrow shrink-0 text-blush/90">As seen at</span>
          <span aria-hidden="true" className="h-4 w-px shrink-0 bg-white/25" />
          <div className="min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
            <ul className="marquee flex w-max items-center" aria-label="Events and media appearances">
              {[...seenAt, ...seenAt].map((name, i) => (
                <li
                  key={i}
                  aria-hidden={i >= seenAt.length}
                  className="flex items-center gap-8 pr-8 font-serif text-xl italic text-ivory/85 md:text-2xl"
                >
                  {name}
                  <Sparkle className="h-3 w-3 shrink-0 text-gold" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
      </motion.div>
    </section>
  )
}

/* ---------- Introduction with full-length portrait ---------- */

function Introduction() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const portraitY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])
  return (
    <section ref={ref} className="relative overflow-hidden py-24 md:py-36">
      <Glow />
      <Container className="relative grid items-center gap-16 lg:grid-cols-12">
        <motion.div style={{ y: portraitY }} className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
          <div aria-hidden="true" className="absolute -inset-3 rounded-t-full rounded-b-[2.5rem] border border-gold/60" />
          <Portrait image={portraits.full} className="aspect-[3/4] rounded-t-full rounded-b-[2rem]" position="center 15%" sizes="(min-width: 1024px) 40vw, 90vw" />
          <div className="glass float-slower absolute -bottom-8 -right-2 max-w-[16rem] rounded-[1.75rem] p-6 sm:-right-8">
            <Sparkle className="twinkle mb-3 h-4 w-4 text-berry" />
            <p className="font-serif text-xl italic leading-snug text-plum">&ldquo;Elegance and authority are not opposites.&rdquo;</p>
          </div>
        </motion.div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <Eyebrow className="mb-6">The Brand</Eyebrow>
            <h2 className="text-headline">
              Influence, <em>with impact</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1} as="p" className="mt-8 font-serif text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.25] text-plum">
            Visibility without strategy is simply noise. Digital Bae turns <em className="text-berry">expertise into influence</em>,
            connections into opportunities and ideas into measurable outcomes.
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl leading-relaxed text-charcoal/75">
              Digital Bae is the platform of <strong className="font-semibold text-plum">{owner.name}</strong>: {owner.credentials.toLowerCase()}.
              Through executive advisory, speaking, corporate training and strategic partnerships, she helps individuals,
              brands and organisations strengthen their positioning, build credibility and unlock opportunities.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button to="/about" variant="outline">Read the full story</Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

/* ---------- Expertise: glass cards ---------- */

function Expertise() {
  return (
    <section className="relative overflow-hidden bg-mist py-24 md:py-32" aria-labelledby="expertise-title">
      <Glow className="opacity-80" />
      <Container className="relative">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow="Areas of Influence" title={<span id="expertise-title">The six <em>pillars</em></span>} intro={positioning.line} />
          <Button to="/influence" variant="text" className="self-start md:self-auto">Explore the pillars</Button>
        </div>
        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {expertise.map((item) => (
            <RevealItem
              key={item.id}
              className="glass group relative flex flex-col overflow-hidden rounded-[2rem] p-8 transition-transform duration-700 ease-[var(--ease-editorial)] hover:-translate-y-1.5"
            >
              <span aria-hidden="true" className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-berry/0 blur-2xl transition-colors duration-700 group-hover:bg-berry/25" />
              <span className="display text-3xl text-berry/90">{item.number}</span>
              <h3 className="mt-10 text-[1.45rem] leading-tight">{item.title}</h3>
              {item.signature && <p className="eyebrow mt-4 self-start rounded-full bg-plum px-3 py-1.5 !text-[0.58rem] text-blush">{item.signature}</p>}
              <p className="mt-3 leading-relaxed text-charcoal/70">{item.summary}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  )
}

/* ---------- Speaking topics ---------- */

function FeaturedSpeaking() {
  return (
    <section className="py-24 md:py-36" aria-labelledby="speaking-title">
      <Container className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Signature Speaking Topics"
            title={<span id="speaking-title">On stage, with <em>intention</em></span>}
            intro="Led by the flagship keynote and masterclass, The Social Capital Method™: building visibility, relationships and influence that move you forward."
          />
          <Reveal delay={0.1} className="mt-10">
            <Button to="/speaking" variant="outline">Speaking topics &amp; formats</Button>
          </Reveal>
        </div>

        <ul className="lg:col-span-7">
          {speakingTopics.slice(0, 5).map((topic, i) => (
            <Reveal as="li" key={topic.id} delay={i * 0.05} className="border-b border-plum/10 first:border-t">
              <Link to="/speaking" className="group flex items-center justify-between gap-6 rounded-2xl px-2 py-6 transition-colors duration-500 hover:bg-mist md:px-4">
                <span className="flex items-baseline gap-5">
                  <span className="eyebrow text-berry">0{i + 1}</span>
                  <span className="transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:translate-x-2">
                    <span className="block font-serif text-2xl text-plum md:text-[2rem]">{topic.title}</span>
                    <span className="mt-1 block text-sm text-charcoal/70">{topic.subtitle}</span>
                  </span>
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-plum/15 text-plum transition-all duration-500 group-hover:border-berry group-hover:bg-berry group-hover:text-ivory">
                  <ArrowUpRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}

/* ---------- Stage photography ---------- */

function OnStage() {
  const [lead, ...rest] = eventPhotos
  return (
    <section className="pb-24 md:pb-36" aria-labelledby="onstage-title">
      <Container>
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="From the stage" title={<span id="onstage-title">Rooms across <em>the region</em></span>} />
          <Button to="/speaking" variant="text" className="self-start md:self-auto">See all engagements</Button>
        </div>
        <div className="grid gap-10 md:grid-cols-12 md:gap-6">
          <Reveal className="md:col-span-7">
            <EventPhoto item={lead} aspect="aspect-[3/2]" sizes="(min-width: 768px) 58vw, 100vw" />
          </Reveal>
          <div className="grid gap-10 sm:grid-cols-2 md:col-span-5 md:grid-cols-1 md:gap-6">
            {rest.slice(0, 2).map((item, i) => (
              <Reveal key={item.id} delay={0.1 * (i + 1)}>
                <EventPhoto item={item} aspect="aspect-[16/10]" sizes="(min-width: 768px) 40vw, 50vw" position="center 30%" />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ---------- Media ---------- */

function InTheMedia() {
  return (
    <section id="media" className="on-dark grain relative scroll-mt-24 overflow-hidden bg-plum py-24 text-ivory md:py-32" aria-labelledby="media-title">
      <div aria-hidden="true" className="absolute -right-32 top-0 h-[30rem] w-[30rem] rounded-full bg-berry/35 blur-3xl" />
      <div aria-hidden="true" className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-rose/20 blur-3xl" />
      <Container className="relative">
        <SectionHeading
          tone="light"
          eyebrow="In the Media"
          title={<span id="media-title">Watch &amp; <em>listen</em></span>}
          intro="Conversations and moments on stage, on screen and in the spotlight."
        />
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {videos.map((v, i) => (
            <Reveal key={v.id} delay={i * 0.1}>
              <VideoCard video={v} tone="light" />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ---------- Masterclass promo ---------- */

function MasterclassPromo() {
  const featured = masterclasses.find((m) => m.featured) ?? masterclasses[0]
  return (
    <section className="relative overflow-hidden bg-blush/40 py-24 md:py-32" aria-labelledby="masterclass-title">
      <Glow />
      <Container className="relative grid items-center gap-14 xl:grid-cols-12">
        <div className="xl:col-span-6">
          <SectionHeading
            eyebrow="Masterclasses"
            title={<span id="masterclass-title">Lead the <em>digital</em> conversation</span>}
            intro="Premium, practical learning experiences designed for professionals ready to grow their influence, with clarity and confidence."
          />
          <Reveal delay={0.1} className="mt-10">
            <Button to="/masterclasses" variant="outline">View Masterclasses</Button>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="xl:col-span-6 xl:col-start-7">
          <MasterclassCard course={featured} variant="feature" />
        </Reveal>
      </Container>
    </section>
  )
}

/* ---------- Insights ---------- */

function SelectedInsights() {
  return (
    <section className="py-24 md:py-32" aria-labelledby="insights-title">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow="Insights" title={<span id="insights-title">Selected <em>writing</em></span>} />
          <Button to="/insights" variant="text" className="self-start md:self-auto">All insights</Button>
        </div>
        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {articles.slice(0, 3).map((a, i) => (
            <RevealItem key={a.slug}>
              <ArticleCard article={a} index={i} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Seo
        title="Taffy L. Gotora, Strategist, Speaker & Author"
        description="Digital Bae, the platform of Taffy L. Gotora: where digital intelligence meets strategic influence. Speaking, executive advisory, corporate training and The Social Capital Method™."
        jsonLd={personJsonLd()}
      />
      <Hero />
      <Introduction />
      <Expertise />
      <FeaturedSpeaking />
      <OnStage />
      <InTheMedia />
      <MasterclassPromo />
      <SelectedInsights />
      <CtaBanner />
    </>
  )
}
