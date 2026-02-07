import { forwardRef } from 'react'

type SlideCanvasProps = {
  children: React.ReactNode
  className?: string
}

const SlideCanvas = forwardRef<HTMLDivElement, SlideCanvasProps>(function SlideCanvas(
  { children, className },
  ref
) {
  return (
    <div
      ref={ref}
      className={
        'w-[1280px] h-[720px] bg-white rounded-xl shadow-brandLg border border-gray-200 overflow-hidden relative ' +
        (className ?? '')
      }
      data-slide
      style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}
    >
      {children}
    </div>
  )
})

export default SlideCanvas

