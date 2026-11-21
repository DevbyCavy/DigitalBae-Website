import { testimonials } from '../../data/testimonials'
import { Container, SectionHeading, SampleBadge, Glow } from '../ui/primitives'
import { RevealGroup, RevealItem } from '../ui/Reveal'

export function Testimonials({ eyebrow = 'Kind words', title = 'In their words' }) {
  if (!testimonials.length) return null
  return (
    <section className="relative overflow-hidden bg-mist py-24 md:py-32">
      <Glow />
      <Container className="relative">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2">
          {testimonials.map((t) => (
            <RevealItem key={t.id} as="figure" className="glass flex flex-col rounded-[2rem] p-8 md:p-12">
              <span aria-hidden="true" className="font-serif text-7xl leading-none text-berry/60">&ldquo;</span>
              <blockquote className="-mt-4 flex-1 font-serif text-2xl italic leading-snug text-plum md:text-3xl">
                {t.quote}
              </blockquote>
              <figcaption className="mt-10 flex flex-wrap items-center justify-between gap-4">
                <span>
                  <span className="block text-sm font-semibold text-plum">{t.name}</span>
                  <span className="block text-sm text-charcoal/70">{t.role}</span>
                </span>
                {t.placeholder && <SampleBadge>Placeholder testimonial</SampleBadge>}
              </figcaption>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  )
}
