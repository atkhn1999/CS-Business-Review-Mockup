import React from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useSuccessPlanStore } from '../store'
import type { AgendaSlideType } from '../types'

function SlideRow({ id, title, type, onRemove }: { id: string; title?: string; type: AgendaSlideType; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  return (
    <div ref={setNodeRef} style={style} className="flex items-center justify-between gap-3 bg-white border rounded-md shadow-sm px-3 py-2">
      <div className="flex items-center gap-3">
        <button className="cursor-grab select-none text-slate-500" {...attributes} {...listeners}>≡</button>
        <div>
          <div className="font-medium text-ink">{title ?? type}</div>
          <div className="text-xs text-text-tertiary capitalize">{type}</div>
        </div>
      </div>
      <button onClick={onRemove} className="text-sm px-2 py-1 rounded bg-red-50 text-red-600">Remove</button>
    </div>
  )
}

export default function SlideList() {
  const slides = useSuccessPlanStore(s => s.plan.slides)
  const reorderSlides = useSuccessPlanStore(s => s.reorderSlides)
  const removeSlide = useSuccessPlanStore(s => s.removeSlide)
  const addSlide = useSuccessPlanStore(s => s.addSlide)
  const sensors = useSensors(useSensor(PointerSensor))

  function onDragEnd(event: any) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = slides.findIndex(s => s.id === active.id)
    const newIndex = slides.findIndex(s => s.id === over.id)
    if (oldIndex !== -1 && newIndex !== -1) {
      reorderSlides(oldIndex, newIndex)
    }
  }

  function add(type: AgendaSlideType) {
    addSlide(type)
  }

  return (
    <div className="space-y-3">
      <div className="font-semibold">Slides</div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={slides.map(s => s.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {slides.map(s => (
              <SlideRow key={s.id} id={s.id} title={s.title} type={s.type} onRemove={() => removeSlide(s.id)} />)
            )}
          </div>
        </SortableContext>
      </DndContext>

      <div className="pt-3">
        <div className="text-sm text-text-secondary mb-2">Add Slide</div>
        <div className="grid grid-cols-2 gap-2">
          {(['team','stakeholders','mission','goals','objectives','history','value'] as AgendaSlideType[]).map(t => (
            <button key={t} onClick={() => add(t)} className="px-2 py-2 rounded border text-sm capitalize">{t}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

