import { Check } from 'lucide-react'
import { Seo } from '../components/ui/Seo'
import { Container, Button, SectionHeading, Sparkle, Glow } from '../components/ui/primitives'
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { PageHero } from '../components/sections/PageHero'
import { CtaBanner } from '../components/sections/CtaBanner'
import { expertise, positioning } from '../data/expertise'

const socialCapital = expertise.find((p) => p.signature)

export default function Influence() {
  const prominent = expertise.filter((p) => p.prominent)
  return (
    <>
      <Seo
        title="Areas of Influence"
        description="The six pillars of Digital Bae: digital intelligence and AI, strategic marketing, social capital, personal branding, leadership and entrepreneurship."
      />

      <PageHero
        eyebrow="Areas of Influence"
        titleClassName="text-[clamp(1.45rem,4.6vw,4.4rem)] leading-[0.95]"
        title={<>Digital intelligence, <em>strategic influence.</em></>}
        intro={positioning.statement}
      />

      {/* The three lead pillars */}
      <section className="pb-20" aria-label="Lead pillars">
        <Container>
          <RevealGroup className="grid gap-5 md:grid-cols-3">
            {prominent.map((p) => (
              <RevealItem key={p.id} className="glass rounded-[2rem] p-8 md:p-10">
                <Sparkle className="twinkle h-4 w-4 text-berry" />
                <p className="mt-6 font-serif text-3xl italic leading-tight text-plum">{p.short}</p>
                <p className="mt-3 leading-relaxed text-charcoal/70">{p.summary}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* The six pillars */}
      <section className="relative overflow-hidden bg-mist py-24 md:py-32" aria-labelledby="pillars-title">
        <Glow />
        <Container className="relative">
          <SectionHeading eyebrow="The six pillars" title={<span id="pillars-title">The pillars of <em>Digital Bae</em></span>} intro={positioning.line} />
          <ol className="mt-16">
            {expertise.map((p, i) => (
              <Reveal as="li" key={p.id} delay={i * 0.03} className="grid gap-6 border-t border-plum/15 py-12 last:border-b md:grid-cols-12 md:gap-x-10">
                <span className="display text-3xl text-berry/85 md:col-span-12 xl:col-span-1">{p.number}</span>
                <div className="md:col-span-6 xl:col-span-5">
                  <h3 className="text-[1.6rem] leading-tight md:text-3xl">{p.title}</h3>
                  {p.signature && (
                    <p className="eyebrow mt-4 inline-flex rounded-full bg-plum px-3 py-1.5 !text-[0.6rem] text-blush">Signature IP · {p.signature}</p>
                  )}
                  <p className="mt-4 leading-relaxed text-charcoal/75">{p.summary}</p>
                </div>
                <div className="md:col-span-6">
                  <p className="eyebrow mb-4 text-berry">Focus areas</p>
                  <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                    {p.focus.map((f) => (
                      <li key={f} className="flex gap-3 leading-snug text-charcoal/80">
                        <Check aria-hidden="true" strokeWidth={1.5} className="mt-0.5 h-4 w-4 shrink-0 text-berry" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Signature IP */}
      <section className="on-dark grain relative overflow-hidden bg-plum py-24 text-ivory md:py-32" aria-labelledby="method-title">
        <div aria-hidden="true" className="absolute -right-32 top-10 h-[30rem] w-[30rem] rounded-full bg-berry/35 blur-3xl" />
        <div aria-hidden="true" className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-rose/20 blur-3xl" />
        <Container className="relative grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading
              tone="light"
              eyebrow="Signature intellectual property"
              title={<span id="method-title">The Social Capital <em className="text-blush">Method&trade;</em></span>}
              intro={socialCapital.summary}
            />
            <Reveal delay={0.1} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button to="/contact?category=speaking" variant="light">Book the keynote</Button>
              <Button to="/masterclasses" variant="glass">The masterclass</Button>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="glass-dark rounded-[2rem] p-8 md:p-10 lg:col-span-5 lg:col-start-8">
            <p className="eyebrow mb-6 text-berry-soft">Focus areas</p>
            <ul className="space-y-4">
              {socialCapital.focus.map((f) => (
                <li key={f} className="flex gap-3 font-serif text-xl leading-snug text-ivory md:text-2xl">
                  <Sparkle className="mt-2 h-3 w-3 shrink-0 text-gold" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <CtaBanner
        eyebrow="Work With Me"
        title={<>Turn intelligence and relationships <em className="text-blush">into opportunity</em></>}
        text="Speaking, executive advisory, corporate training and strategic partnerships."
        primary={{ label: 'Work With Me', to: '/contact' }}
        secondary={{ label: 'Speaking topics', to: '/speaking' }}
      />
    </>
  )
}
