import { Seo } from '../components/ui/Seo'
import { Container, Button, SectionHeading, SampleBadge, Glow } from '../components/ui/primitives'
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { Portrait } from '../components/ui/Portrait'
import { PageHero } from '../components/sections/PageHero'
import { MasterclassCard } from '../components/sections/MasterclassCard'
import { CtaBanner } from '../components/sections/CtaBanner'
import { masterclasses } from '../data/masterclasses'
import { portraits, owner } from '../data/site'

const pillars = [
  { title: 'Practical', text: 'Frameworks you can apply the very next working day.' },
  { title: 'Intimate', text: 'Small, focused groups where every voice is heard.' },
  { title: 'Elevated', text: 'Considered, beautifully designed learning experiences.' },
]

export default function Masterclasses() {
  const featured = masterclasses.find((m) => m.featured) ?? masterclasses[0]
  const rest = masterclasses.filter((m) => m !== featured)

  return (
    <>
      <Seo
        title="Masterclasses"
        description="Premium masterclasses from Digital Bae on personal branding, leadership through digital change, the future of work and entrepreneurship."
      />

      <PageHero
        eyebrow="Masterclasses"
        title={<>Learning, <em>elevated.</em></>}
        intro="Premium, practical learning for professionals ready to grow their influence and lead with confidence in a digital world."
        aside={<SampleBadge className="mt-6">Courses are placeholders, coming soon</SampleBadge>}
      />

      {/* Overview */}
      <section className="pb-20">
        <Container>
          <RevealGroup className="grid gap-5 md:grid-cols-3">
            {pillars.map((p, i) => (
              <RevealItem key={p.title} className="glass rounded-[2rem] p-8 md:p-10">
                <span className="display text-2xl text-berry/80">0{i + 1}</span>
                <h2 className="mt-6 text-2xl">{p.title}</h2>
                <p className="mt-2 leading-relaxed text-charcoal/70">{p.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Featured */}
      <section className="pb-24 md:pb-32" aria-labelledby="featured-course">
        <Container>
          <h2 id="featured-course" className="sr-only">Featured masterclass</h2>
          <Reveal>
            <MasterclassCard course={featured} index={0} variant="feature" />
          </Reveal>
        </Container>
      </section>

      {/* All courses */}
      <section className="relative overflow-hidden bg-mist py-24 md:py-32" aria-labelledby="all-courses">
        <Glow />
        <Container className="relative">
          <SectionHeading
            eyebrow="The Collection"
            title={<span id="all-courses">Upcoming <em>masterclasses</em></span>}
            intro="Registration is by enquiry while courses are in development. Register your interest to be the first to know."
          />
          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((course, i) => (
              <RevealItem key={course.id}>
                <MasterclassCard course={course} index={i + 1} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Instructor */}
      <section className="py-24 md:py-32" aria-labelledby="instructor-title">
        <Container className="grid items-center gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <Portrait image={portraits.black} className="aspect-[4/5] rounded-t-full" position="center 25%" sizes="(min-width: 1024px) 38vw, 90vw" />
            </div>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHeading eyebrow="Your Instructor" title={<span id="instructor-title">Taught by <em>Digital Bae</em></span>} />
            <Reveal delay={0.1}>
              <p className="mt-8 text-lg leading-relaxed text-charcoal/75">
                Every masterclass is designed and led by {owner.name}, author, multi-award-winning digital marketer and speaker, bringing together a perspective on digital
                transformation, leadership and personal branding with a warm, direct teaching style.
              </p>
              <p className="mt-5 leading-relaxed text-charcoal/70">
                [Instructor introduction: teaching experience, approach and the kind of results participants can expect. To be supplied by the brand owner.]
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button to="/contact?category=masterclasses">Register Interest</Button>
                <Button to="/about" variant="outline">About Digital Bae</Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaBanner
        eyebrow="Private & Corporate Cohorts"
        title={<>Bring a masterclass to <em className="text-blush">your team</em></>}
        text="Each programme can be adapted for organisations, leadership teams and communities."
        primary={{ label: 'Register Interest', to: '/contact?category=masterclasses' }}
        secondary={null}
      />
    </>
  )
}
