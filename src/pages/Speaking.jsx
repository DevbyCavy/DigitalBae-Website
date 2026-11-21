import { useState } from 'react'
import { Mic, Building2, Users, Presentation } from 'lucide-react'
import { Lightbox } from '../components/sections/Lightbox'
import { Seo } from '../components/ui/Seo'
import { Container, Button, SectionHeading, Glow } from '../components/ui/primitives'
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { Portrait } from '../components/ui/Portrait'
import { PageHero } from '../components/sections/PageHero'
import { Testimonials } from '../components/sections/Testimonials'
import { CtaBanner } from '../components/sections/CtaBanner'
import { portraits } from '../data/site'
import { speakingTopics, speakingFormats, featuredEngagements } from '../data/speaking'
import { eventPhotos, videos } from '../data/media'
import { EventPhoto } from '../components/sections/EventPhoto'
import { VideoCard } from '../components/sections/VideoCard'

const formatIcons = { keynote: Mic, corporate: Building2, panels: Users, workshops: Presentation }
const [flagship, ...otherTopics] = speakingTopics

export default function Speaking() {
  const [photoIndex, setPhotoIndex] = useState(null)
  return (
    <>
      <Lightbox items={eventPhotos} index={photoIndex} onClose={() => setPhotoIndex(null)} onIndex={setPhotoIndex} />
      <Seo
        title="Speaking"
        description="Book Taffy L. Gotora (Digital Bae) for keynotes, masterclasses, panels and corporate training: The Social Capital Method™, visibility, relational intelligence and the digital advantage."
      />

      <PageHero
        eyebrow="Speaking"
        title={<>Ideas that <em>move</em> rooms.</>}
        intro="Keynotes, masterclasses and moderation on social capital, strategic influence and digital intelligence, for rooms that want clarity and results."
        aside={
          <div className="mt-8">
            <Button to="/contact?category=speaking">Enquire About Booking</Button>
          </div>
        }
      />

      {/* Signature topics */}
      <section className="relative pb-24 md:pb-32" aria-labelledby="topics-title">
        <Container className="relative">
          <SectionHeading eyebrow="Signature speaking topics" title={<span id="topics-title">Signature <em>conversations</em></span>} />
          <Reveal className="on-dark grain relative mt-14 overflow-hidden rounded-[2.25rem] bg-plum p-8 text-ivory md:p-14">
            <div aria-hidden="true" className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-berry/45 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <p className="eyebrow text-berry-soft">Flagship masterclass &amp; keynote</p>
                <h3 className="mt-6 text-[clamp(1.9rem,4.2vw,3.6rem)] leading-[1] !text-ivory">{flagship.title}</h3>
                <p className="mt-5 max-w-2xl font-serif text-2xl italic leading-snug text-blush md:text-3xl">{flagship.subtitle}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-end">
                <Button to="/contact?category=speaking" variant="light">Book this keynote</Button>
                <Button to="/influence" variant="glass">The six pillars</Button>
              </div>
            </div>
          </Reveal>
          <RevealGroup className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {otherTopics.map((t, i) => (
              <RevealItem key={t.id} className={`group relative overflow-hidden rounded-[2rem] ${i === otherTopics.length - 1 && otherTopics.length % 3 === 1 ? 'md:col-span-2 lg:col-span-3' : ''} border border-plum/10 bg-white/60 p-8 transition-colors duration-700 hover:border-plum hover:bg-plum md:p-10`}>
                <span className="display text-2xl text-berry/80 transition-colors duration-700 group-hover:text-berry-soft">
                  {String(i + 2).padStart(2, '0')}
                </span>
                <h3 className="mt-10 text-[1.65rem] leading-tight transition-colors duration-700 group-hover:text-ivory">{t.title}</h3>
                <p className="mt-4 font-serif text-xl italic leading-snug text-berry transition-colors duration-700 group-hover:text-blush">{t.subtitle}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Formats with portrait */}
      <section className="relative overflow-hidden bg-mist py-24 md:py-32" aria-labelledby="formats-title">
        <Glow />
        <Container className="relative grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:sticky lg:top-28 lg:max-w-none">
              <Portrait image={portraits.black} className="aspect-[4/5] rounded-t-full rounded-b-[2rem]" position="center 30%" sizes="(min-width: 1024px) 38vw, 90vw" />
              <div aria-hidden="true" className="absolute -inset-3 -z-0 rounded-t-full rounded-b-[2.5rem] border border-gold/60" />
            </div>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHeading eyebrow="Formats" title={<span id="formats-title">Ways to <em>work together</em></span>} />
            <div className="mt-12 space-y-4">
              {speakingFormats.map((f, i) => {
                const Icon = formatIcons[f.id]
                return (
                  <Reveal key={f.id} delay={i * 0.05} className="glass grid gap-4 rounded-[1.75rem] p-7 sm:grid-cols-[3.25rem_1fr]">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blush/60 text-berry"><Icon aria-hidden="true" strokeWidth={1.25} className="h-5 w-5" /></span>
                    <div>
                      <h3 className="text-3xl">{f.title}</h3>
                      <p className="mt-3 leading-relaxed text-charcoal/75">{f.description}</p>
                      <p className="mt-3 text-sm text-berry">{f.detail}</p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Engagements */}
      <section className="py-24 md:py-32" aria-labelledby="engagements-title">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Engagements" title={<span id="engagements-title">Featured <em>appearances</em></span>} />
          </div>
          <div className="glass mt-12 overflow-x-auto rounded-[2rem] px-6 md:px-10" tabIndex={0} role="region" aria-label="Featured appearances table (scrolls sideways on small screens)">
            <table className="w-full min-w-[560px] text-left">
              <thead>
                <tr className="border-b border-plum/20 text-[0.68rem] uppercase tracking-[0.2em] text-plum/75">
                  <th scope="col" className="py-4 font-semibold">Event</th>
                  <th scope="col" className="py-4 font-semibold">Format</th>
                  <th scope="col" className="py-4 font-semibold">Topic</th>
                  <th scope="col" className="py-4 text-right font-semibold">Date &middot; Location</th>
                </tr>
              </thead>
              <tbody>
                {featuredEngagements.map((e) => (
                  <tr key={e.id} className="border-b border-plum/10 transition-colors last:border-0 hover:bg-blush/25">
                    <td className="py-6 pr-4 font-serif text-2xl text-plum">{e.event}</td>
                    <td className="py-6 pr-4 text-sm text-charcoal/75">{e.role}</td>
                    <td className="py-6 pr-4 text-sm text-charcoal/75">{e.topic}</td>
                    <td className="py-6 text-right text-sm text-charcoal/70">{[e.date, e.location].filter(Boolean).join(' · ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Event photography */}
          <div className="mt-24">
            <p className="eyebrow mb-8 text-plum/85">From the stage</p>
            <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {eventPhotos.map((item, i) => (
                <Reveal key={item.id} delay={(i % 3) * 0.08}>
                  <EventPhoto item={item} onOpen={() => setPhotoIndex(i)} aspect="aspect-[4/5]" position="center 30%" sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw" />
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="on-dark grain relative overflow-hidden bg-plum py-24 text-ivory md:py-32" aria-labelledby="watch-title">
        <Container className="relative">
          <SectionHeading tone="light" eyebrow="Watch" title={<span id="watch-title">See her <em className="text-blush">in action</em></span>} />
          <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-10">
            {videos.map((v, i) => (
              <Reveal key={v.id} delay={i * 0.1}>
                <VideoCard video={v} tone="light" />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Testimonials eyebrow="Testimonials" title={<>What organisers <em>say</em></>} />

      <CtaBanner
        eyebrow="Booking Enquiries"
        title={<>Bring <em className="text-blush">bold ideas</em> to your next event</>}
        text="Share your event date, audience and objectives, and we will shape a session around them."
        primary={{ label: 'Work With Me', to: '/contact?category=speaking' }}
        secondary={{ label: 'About Digital Bae', to: '/about' }}
      />
    </>
  )
}
