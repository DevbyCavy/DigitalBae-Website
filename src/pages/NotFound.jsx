import { Seo } from '../components/ui/Seo'
import { Container, Button, Ornament } from '../components/ui/primitives'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="The page you were looking for could not be found." noindex />
      <section className="relative flex min-h-[88vh] items-center overflow-hidden pt-28">
        <span aria-hidden="true" className="pointer-events-none absolute -right-6 bottom-0 select-none font-serif text-[42vw] italic leading-[0.75] text-blush/60 md:text-[30vw] before:content-['404']" />
        <Container className="relative">
          <Ornament className="mb-8" />
          <p className="eyebrow mb-6 text-berry">Error 404</p>
          <h1 className="max-w-3xl text-display">
            This page has taken a <em>different path.</em>
          </h1>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-charcoal/75">
            The page you are looking for may have moved or no longer exists. Let&rsquo;s get you back somewhere meaningful.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button to="/">Return Home</Button>
            <Button to="/insights" variant="outline">Read Insights</Button>
          </div>
        </Container>
      </section>
    </>
  )
}
