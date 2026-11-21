import { Link } from 'react-router-dom'
import { Seo } from '../components/ui/Seo'
import { Container, SampleBadge } from '../components/ui/primitives'
import { PageHero } from '../components/sections/PageHero'
import { legalMeta, privacyPolicy, termsOfUse } from '../data/legal'
import { openCookieSettings } from '../lib/consent'
import { slugify } from '../lib/format'

function LegalPage({ title, eyebrow, description, sections, children }) {
  return (
    <>
      <Seo title={title} description={description} />
      <PageHero
        eyebrow={eyebrow}
        title={title}
        intro={`Last updated: ${legalMeta.lastUpdated}`}
        aside={<SampleBadge className="mt-5">Template, pending legal review</SampleBadge>}
      />
      <section className="pb-24 md:pb-32">
        <Container className="grid gap-12 lg:grid-cols-12">
          <nav aria-label="On this page" className="lg:col-span-3">
            <div className="glass rounded-[1.75rem] p-6 lg:sticky lg:top-28">
              <p className="eyebrow mb-4 text-berry">On this page</p>
              <ol className="space-y-2 text-sm">
                {sections.map((s) => (
                  <li key={s.heading}>
                    <a href={`#${slugify(s.heading)}`} className="link-underline text-plum/80 hover:text-plum">{s.heading}</a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
          <div className="prose-editorial max-w-3xl lg:col-span-8 lg:col-start-5">
            {children}
            {sections.map((s) => (
              <section key={s.heading} id={slugify(s.heading)} className="scroll-mt-28">
                <h2>{s.heading}</h2>
                {s.body.map((p) => <p key={p}>{p}</p>)}
              </section>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}

export function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      eyebrow="Legal"
      description="How Digital Bae collects, uses and protects personal information submitted through this website."
      sections={privacyPolicy}
    >
      <p>
        You can review or change your cookie choice at any time:{' '}
        <button type="button" onClick={openCookieSettings} className="link-underline font-semibold text-berry">
          open cookie settings
        </button>
        . See also our <Link to="/terms" className="link-underline font-semibold text-berry">Terms of Use</Link>.
      </p>
    </LegalPage>
  )
}

export function Terms() {
  return (
    <LegalPage
      title="Terms of Use"
      eyebrow="Legal"
      description="The terms that govern use of the Digital Bae website, its content and enquiry forms."
      sections={termsOfUse}
    />
  )
}

export default Privacy
