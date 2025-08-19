'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Slide } from '@/lib/types';
import { GripVertical, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SortableSlideProps {
  slide: Slide;
  isSelected: boolean;
  onSelect: () => void;
  onToggleVisibility: () => void;
}

export function SortableSlide({ slide, isSelected, onSelect, onToggleVisibility }: SortableSlideProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: slide.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'group relative p-3 rounded-lg border-2 transition-all',
        isDragging && 'opacity-50 z-50',
        isSelected
          ? 'border-teal-500 bg-teal-50 shadow-md'
          : 'border-gray-200 hover:border-gray-300 bg-white',
        !slide.visible && 'opacity-60'
      )}
    >
      <div className="flex items-center gap-2">
        <button
          className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>
        
        <div
          onClick={onSelect}
          className="flex-1 cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500">
              {slide.order}
            </span>
            <h3 className={cn(
              'font-medium text-sm',
              slide.visible ? 'text-gray-800' : 'text-gray-400'
            )}>
              {slide.title}
            </h3>
          </div>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleVisibility();
          }}
          className="p-1 rounded hover:bg-gray-100"
          title={slide.visible ? 'Hide slide' : 'Show slide'}
        >
          {slide.visible ? (
            <Eye className="h-4 w-4 text-gray-600" />
          ) : (
            <EyeOff className="h-4 w-4 text-gray-400" />
          )}
        </button>
      </div>
    </div>
  );
}