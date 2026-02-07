import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSuccessPlanStore } from '../store'
import { renderSlide } from '../components/Slides'
import SlideCanvas from '../components/SlideCanvas'
import { exportSlidesToPdf, exportSlidesToPptx } from '../utils/exporters'

export default function Presenter() {
  const slides = useSuccessPlanStore(s => s.plan.slides)
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRefs = useMemo(() => slides.map(() => React.createRef<HTMLDivElement>()), [slides])
  const [activeIndex, setActiveIndex] = useState(0)
  const visibleSlides = slides.filter(s => !s.hidden)

  async function exportPdf() {
    const nodes = canvasRefs.map(r => r.current!).filter(Boolean)
    await exportSlidesToPdf(nodes, 'success-review.pdf')
  }
  async function exportPptx() {
    const nodes = canvasRefs.map(r => r.current!).filter(Boolean)
    await exportSlidesToPptx(nodes, 'success-review.pptx')
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === ' ') setActiveIndex(i => Math.min(i + 1, visibleSlides.length - 1))
      if (e.key === 'ArrowLeft') setActiveIndex(i => Math.max(i - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [visibleSlides.length])

  return (
    <div ref={containerRef} className="min-h-screen bg-light-bg text-ink font-inter">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="font-bold">Presenter</div>
        <div className="flex items-center gap-2">
          <a href="/" className="px-3 py-2 rounded border text-sm">Editor</a>
          <button onClick={exportPdf} className="px-3 py-2 rounded bg-teal-600 text-white text-sm">Export PDF</button>
          <button onClick={exportPptx} className="px-3 py-2 rounded bg-indigo-600 text-white text-sm">Export PPTX</button>
        </div>
      </div>
      <div className="w-full flex justify-center pb-16">
        <div className="relative w-full max-w-[1280px]">
          <div className="flex justify-center">
            {visibleSlides[activeIndex] && (
              <SlideCanvas ref={canvasRefs[activeIndex]}>
                {renderSlide(visibleSlides[activeIndex])}
              </SlideCanvas>
            )}
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-text-secondary">
            <button disabled={activeIndex === 0} onClick={() => setActiveIndex(i => Math.max(0, i - 1))} className="px-3 py-2 rounded border disabled:opacity-50">Prev</button>
            <div>{activeIndex + 1} / {visibleSlides.length}</div>
            <button disabled={activeIndex >= visibleSlides.length - 1} onClick={() => setActiveIndex(i => Math.min(visibleSlides.length - 1, i + 1))} className="px-3 py-2 rounded border disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

