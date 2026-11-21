import { useRouteError } from 'react-router-dom'

/** Branded fallback for unexpected errors (e.g. a failed chunk load after a deploy). */
export function RouteError() {
  const error = useRouteError()
  if (import.meta.env.DEV) console.error(error)
  return (
    <main className="flex min-h-screen items-center justify-center bg-ivory px-6 text-center">
      <div className="max-w-lg">
        <p className="eyebrow mb-6 text-berry">Something went wrong</p>
        <h1 className="text-headline">We hit an <em>unexpected</em> pause.</h1>
        <p className="mt-6 text-lg text-charcoal/75">Please refresh the page. If the problem continues, try again a little later.</p>
        <div className="mt-10 flex justify-center gap-4">
          <button type="button" onClick={() => window.location.reload()} className="bg-plum px-7 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-ivory hover:bg-plum-deep">
            Refresh
          </button>
          <a href="/" className="border border-plum/40 px-7 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-plum hover:border-plum">
            Home
          </a>
        </div>
      </div>
    </main>
  )
}
