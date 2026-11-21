import { motion } from 'framer-motion'
import { Seo, personJsonLd } from '../components/ui/Seo'
import { Container, Eyebrow, SectionHeading, SampleBadge, Ornament, Glow } from '../components/ui/primitives'
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { Portrait } from '../components/ui/Portrait'
import { CtaBanner } from '../components/sections/CtaBanner'
import { portraits, owner } from '../data/site'
import { recognition } from '../data/media'
import { about } from '../data/about'
import { expertise } from '../data/expertise'

const ease = [0.22, 1, 0.36, 1]

export default function About() {
  return (
    <>
      <Seo
        title="About"
        description="Meet Tafadzwa L. Gotora, the author, multi-award-winning digital marketer and speaker behind Digital Bae: her story, values and recognition."
        jsonLd={personJsonLd()}
      />

      {/* Opening: full-length portrait + introduction */}
      <section className="relative overflow-hidden pb-24 pt-32 md:pt-40">
        <Glow />
        <Container className="relative grid gap-14 lg:grid-cols-12 lg:gap-16">
          <motion.div
            className="relative lg:col-span-5"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease }}
          >
            <div className="relative mx-auto max-w-sm lg:sticky lg:top-28 lg:max-w-none">
              <div className="relative">
                <div aria-hidden="true" className="absolute -right-4 -top-4 h-full w-full rounded-t-full rounded-b-[2.5rem] border border-gold/70" />
                <Portrait image={portraits.full} priority className="relative aspect-[5/8] rounded-t-full rounded-b-[2rem]" sizes="(min-width: 1024px) 38vw, 90vw" />
              </div>
              <p className="mt-6 text-xs uppercase tracking-[0.2em] text-plum/75">{owner.name} &mdash; Founder, Digital Bae</p>
            </div>
          </motion.div>

          <div className="lg:col-span-7 lg:pt-10">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.1 }}>
              <Eyebrow tone="gold" className="mb-8">About</Eyebrow>
            </motion.div>
            <motion.h1
              className="text-display"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 0.2 }}
            >
              The woman behind <em>the voice.</em>
            </motion.h1>
            <motion.p
              className="eyebrow mt-6 text-berry"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {owner.name} &middot; {owner.credentials}
            </motion.p>
            <motion.p
              className="mt-10 font-serif text-2xl leading-snug text-plum md:text-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 0.35 }}
            >
              {about.intro}
            </motion.p>

            <Reveal className="mt-16">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-2xl">Biography</h2>
                <SampleBadge>Biography in progress</SampleBadge>
              </div>
              <div className="space-y-5 text-[1.075rem] leading-[1.85] text-charcoal/80">
                {about.biography.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal className="glass mt-16 rounded-[2rem] p-8 md:p-10">
              <p className="eyebrow mb-4 text-berry">Philosophy</p>
              <p className="font-serif text-2xl italic leading-snug text-plum md:text-3xl">{about.philosophy}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="relative overflow-hidden bg-mist py-24 md:py-32">
        <Glow />
        <Container className="relative">
          <SectionHeading eyebrow="Values" title={<>What guides <em>the work</em></>} />
          <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((v, i) => (
              <RevealItem key={v.title} className="glass rounded-[2rem] p-8 md:p-10">
                <span className="display text-2xl text-berry/80">0{i + 1}</span>
                <h3 className="mt-6 text-3xl">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-charcoal/70">{v.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Career journey */}
      <section className="py-24 md:py-32">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Career Journey" title={<>The path <em>so far</em></>} />
            <SampleBadge className="mt-8">Placeholder timeline</SampleBadge>
          </div>
          <ol className="relative lg:col-span-7 lg:col-start-6">
            <span aria-hidden="true" className="absolute bottom-2 left-[5px] top-2 w-px bg-plum/15" />
            {about.journey.map((step, i) => (
              <Reveal as="li" key={i} delay={i * 0.05} className="relative pb-12 pl-12 last:pb-0">
                <span aria-hidden="true" className="absolute left-0 top-2 h-[11px] w-[11px] rounded-full border border-berry bg-blush" />
                <p className="eyebrow text-berry">{step.period}</p>
                <h3 className="mt-2 text-3xl">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-charcoal/70">{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Expertise + milestones */}
      <section className="on-dark grain relative overflow-hidden bg-plum py-24 text-ivory md:py-32">
        <div aria-hidden="true" className="absolute -right-32 top-20 h-[30rem] w-[30rem] rounded-full bg-berry/35 blur-3xl" />
        <div aria-hidden="true" className="absolute -left-32 bottom-20 h-96 w-96 rounded-full bg-rose/20 blur-3xl" />
        <Container className="relative">
          <SectionHeading tone="light" eyebrow="Areas of Expertise" title={<>Fluent in <em className="text-blush">change</em></>} />
          <RevealGroup className="mt-14 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {expertise.map((e) => (
              <RevealItem key={e.id} className="glass-dark flex gap-6 rounded-[1.75rem] p-7">
                <span className="display text-lg text-berry-soft">{e.number}</span>
                <div>
                  <h3 className="text-2xl text-ivory">{e.title}</h3>
                  <p className="mt-2 leading-relaxed text-ivory/70">{e.summary}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-24 grid gap-6 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <figure>
                <Portrait image={recognition.evening} className="aspect-[4/5] rounded-[2rem]" position="center 25%" sizes="(min-width: 768px) 40vw, 100vw" />
                <figcaption className="mt-3 text-sm text-ivory/60">Recognised at an awards evening [event to confirm]</figcaption>
              </figure>
            </Reveal>
            <Reveal delay={0.1} className="flex flex-col justify-end md:col-span-7">
              <p className="eyebrow mb-4 text-berry-soft">Recognition</p>
              <p className="font-serif text-3xl leading-snug text-ivory md:text-4xl">
                A multi-award-winning digital marketer, with work recognised by peers across the industry.
              </p>
              <figure className="mt-10">
                <Portrait image={recognition.shelf} className="aspect-[1152/532] rounded-[1.5rem]" sizes="(min-width: 768px) 55vw, 100vw" />
                <figcaption className="mt-3 text-sm text-ivory/60">Certificates and awards [names to confirm]</figcaption>
              </figure>
            </Reveal>
          </div>

          <div className="mt-24">
            <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
              <p className="eyebrow text-berry-soft">Achievements &amp; Milestones</p>
              <SampleBadge tone="dark">Awaiting confirmed milestones</SampleBadge>
            </div>
            <RevealGroup as="dl" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {about.milestones.map((m, i) => (
                <RevealItem key={i} className="glass-dark rounded-[1.75rem] p-6 md:p-8">
                  <dt className="sr-only">{m.label}</dt>
                  <dd className="display text-3xl text-blush md:text-[2.6rem]">{m.figure}</dd>
                  <dd className="mt-3 text-sm leading-snug text-ivory/70">{m.label}</dd>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </section>

      {/* What I Believe */}
      <section className="py-24 md:py-36" aria-labelledby="beliefs-title">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <Ornament className="mb-8 justify-center" />
            <h2 id="beliefs-title" className="text-headline">What I <em>Believe</em></h2>
          </div>
          <ol className="mx-auto mt-16 max-w-4xl">
            {about.beliefs.map((b, i) => (
              <Reveal as="li" key={b} delay={i * 0.04} className="group flex gap-6 border-t border-plum/15 py-8 last:border-b md:gap-10">
                <span className="eyebrow pt-3 text-berry">0{i + 1}</span>
                <p className="font-serif text-2xl leading-snug text-plum transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:translate-x-2 md:text-4xl">
                  {b}
                </p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBanner
        eyebrow="Collaborate"
        title={<>Let&rsquo;s create something <em className="text-blush">worth talking about</em></>}
        text="For speaking, partnerships, media and collaborations, I would love to hear what you are building."
        primary={{ label: 'Work With Me', to: '/contact' }}
        secondary={{ label: 'View Masterclasses', to: '/masterclasses' }}
      />
    </>
  )
}
