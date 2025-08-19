import React, { useMemo, useRef } from 'react'
import { useSuccessPlanStore } from '../store'
import { renderSlide } from '../components/Slides'
import SlideCanvas from '../components/SlideCanvas'
import { exportSlidesToPdf, exportSlidesToPptx } from '../utils/exporters'

export default function Presenter() {
  const slides = useSuccessPlanStore(s => s.plan.slides)
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRefs = useMemo(() => slides.map(() => React.createRef<HTMLDivElement>()), [slides])

  async function exportPdf() {
    const nodes = canvasRefs.map(r => r.current!).filter(Boolean)
    await exportSlidesToPdf(nodes, 'success-review.pdf')
  }
  async function exportPptx() {
    const nodes = canvasRefs.map(r => r.current!).filter(Boolean)
    await exportSlidesToPptx(nodes, 'success-review.pptx')
  }

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
      <div className="max-w-6xl mx-auto px-4 pb-16 space-y-10">
        {slides.map((slide, idx) => (
          <div key={slide.id} className="flex justify-center">
            <SlideCanvas ref={canvasRefs[idx]}>
              {renderSlide(slide)}
            </SlideCanvas>
          </div>
        ))}
      </div>
    </div>
  )
}

