export function PageLoader() {
  return (
    <div role="status" aria-live="polite" className="flex min-h-[100svh] items-center justify-center">
      <div className="text-center">
        <span className="block font-serif text-3xl italic text-plum">Digital Bae</span>
        <span aria-hidden="true" className="mx-auto mt-4 block h-px w-24 overflow-hidden bg-plum/10">
          <span className="block h-full w-1/3 animate-[loader_1.2s_ease-in-out_infinite] bg-gold" />
        </span>
        <span className="sr-only">Loading page</span>
      </div>
      <style>{'@keyframes loader{0%{transform:translateX(-100%)}100%{transform:translateX(300%)}}'}</style>
    </div>
  )
}
