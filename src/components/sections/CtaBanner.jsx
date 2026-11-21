import { Container, Button, Ornament } from '../ui/primitives'
import { Reveal } from '../ui/Reveal'

/** Strong closing call-to-action used at the end of each page. */
export function CtaBanner({
  eyebrow = 'Let’s work together',
  title = (
    <>
      Ready to make your <em className="text-blush">next move</em> meaningful?
    </>
  ),
  text = 'Whether you are planning an event, building a team or shaping your own voice, let’s start a conversation.',
  primary = { label: 'Work With Me', to: '/contact' },
  secondary = { label: 'Explore Speaking', to: '/speaking' },
}) {
  return (
    <section className="on-dark grain relative overflow-hidden bg-plum py-24 text-ivory md:py-36">
      <div aria-hidden="true" className="absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-berry/40 blur-3xl" />
      <div aria-hidden="true" className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-rose/20 blur-3xl" />
      <Container className="relative">
        <Reveal className="mx-auto max-w-4xl text-center">
          <Ornament className="mb-8 justify-center" />
          <p className="eyebrow mb-6 text-berry-soft">{eyebrow}</p>
          <h2 className="text-headline !text-ivory">{title}</h2>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-ivory/75">{text}</p>
          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
            <Button to={primary.to} variant="light">{primary.label}</Button>
            {secondary && (
              <Button to={secondary.to} variant="glass">{secondary.label}</Button>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
