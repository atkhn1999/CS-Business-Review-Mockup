'use client';

import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableSlide } from './SortableSlide';
import { useStore } from '@/lib/store/useStore';
import { Plus, Eye, EyeOff } from 'lucide-react';
import { Slide } from '@/lib/types';

interface SlideManagerProps {
  selectedSlideId: string | null;
  onSelectSlide: (id: string) => void;
  viewMode: 'edit' | 'preview' | 'present';
}

export default function SlideManager({ selectedSlideId, onSelectSlide, viewMode }: SlideManagerProps) {
  const { presentation, reorderSlides, toggleSlideVisibility } = useStore();
  const slides = presentation.slides;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = slides.findIndex((slide) => slide.id === active.id);
      const newIndex = slides.findIndex((slide) => slide.id === over?.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const newSlides = arrayMove(slides, oldIndex, newIndex);
        reorderSlides(newSlides);
      }
    }
  };

  const visibleSlides = slides.filter(slide => slide.visible);

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Slides</h2>
        <span className="text-sm text-gray-500">
          {visibleSlides.length} of {slides.length} visible
        </span>
      </div>

      {viewMode === 'edit' ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={slides}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {slides.map((slide) => (
                <SortableSlide
                  key={slide.id}
                  slide={slide}
                  isSelected={slide.id === selectedSlideId}
                  onSelect={() => onSelectSlide(slide.id)}
                  onToggleVisibility={() => toggleSlideVisibility(slide.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div className="space-y-2">
          {visibleSlides.map((slide, index) => (
            <div
              key={slide.id}
              onClick={() => onSelectSlide(slide.id)}
              className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                slide.id === selectedSlideId
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-500">
                    {index + 1}
                  </span>
                  <h3 className="font-medium text-sm text-gray-800">{slide.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}