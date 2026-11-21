import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

/** Accessible image lightbox: Esc closes, arrow keys navigate, focus is trapped and restored. */
export function Lightbox({ items, index, onClose, onIndex }) {
  const open = index !== null && index !== undefined
  const closeRef = useRef(null)
  const dialogRef = useRef(null)
  const item = open ? items[index] : null

  useEffect(() => {
    if (!open) return
    const prevFocus = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onIndex((index + 1) % items.length)
      if (e.key === 'ArrowLeft') onIndex((index - 1 + items.length) % items.length)
      if (e.key === 'Tab') {
        const els = [...dialogRef.current.querySelectorAll('button')]
        const first = els[0]
        const last = els[els.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
      prevFocus?.focus?.()
    }
  }, [open, index, items.length, onClose, onIndex])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${index + 1} of ${items.length}: ${item.event}`}
          className="on-dark fixed inset-0 z-[80] flex flex-col bg-plum-deep/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <div className="flex items-center justify-between px-5 py-4 text-ivory sm:px-8">
            <p className="eyebrow text-berry-soft">{index + 1} / {items.length}</p>
            <button ref={closeRef} type="button" onClick={onClose} aria-label="Close photo viewer" className="glass-dark flex h-11 w-11 items-center justify-center rounded-full">
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <AnimatePresence mode="wait">
              <motion.img
                key={item.image.src}
                src={item.image.src}
                alt={item.image.alt}
                className="max-h-full max-w-full rounded-[1.5rem] object-contain shadow-2xl"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
            {items.length > 1 && (
              <>
                <button type="button" onClick={() => onIndex((index - 1 + items.length) % items.length)} aria-label="Previous photo" className="glass-dark absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-ivory sm:left-6">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button type="button" onClick={() => onIndex((index + 1) % items.length)} aria-label="Next photo" className="glass-dark absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-ivory sm:right-6">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          <div className="px-5 pb-6 pt-4 text-center text-ivory sm:pb-8">
            <p className="font-serif text-2xl">{item.event}</p>
            <p className="mt-1 text-sm text-ivory/70">{item.detail}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
