'use client';

import * as React from 'react';
import { useStore } from '@/lib/store/useStore';
import { Slide } from '@/lib/types';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import IntroSlide from './slides/IntroSlide';
import TeamSlide from './slides/TeamSlide';
import StakeholderSlide from './slides/StakeholderSlide';
import MissionSlide from './slides/MissionSlide';
import GoalsSlide from './slides/GoalsSlide';
import ObjectivesSlide from './slides/ObjectivesSlide';
import KPISlide from './slides/KPISlide';
import ValueSlide from './slides/ValueSlide';
import SummarySlide from './slides/SummarySlide';

interface PresentationViewProps {
  onExit: () => void;
}

export default function PresentationView({ onExit }: PresentationViewProps) {
  const { presentation } = useStore();
  const visibleSlides = presentation.slides.filter(s => s.visible);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const currentSlide = visibleSlides[currentSlideIndex];

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'Escape') {
        onExit();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlideIndex]);

  const goToNext = () => {
    if (currentSlideIndex < visibleSlides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const renderSlide = () => {
    if (!currentSlide) return null;

    switch (currentSlide.type) {
      case 'intro':
        return <IntroSlide />;
      case 'team':
        return <TeamSlide />;
      case 'stakeholders':
        return <StakeholderSlide />;
      case 'mission':
        return <MissionSlide />;
      case 'goals':
        return <GoalsSlide />;
      case 'objectives':
        return <ObjectivesSlide />;
      case 'kpis':
        return <KPISlide />;
      case 'value':
        return <ValueSlide />;
      case 'summary':
        return <SummarySlide />;
      default:
        return <div>Slide not implemented</div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 flex items-center justify-between bg-gradient-to-b from-gray-900 to-transparent">
        <div className="text-white">
          <span className="text-sm opacity-75">
            {currentSlideIndex + 1} / {visibleSlides.length}
          </span>
        </div>
        <button
          onClick={onExit}
          className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Slide Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-6xl mx-auto">
          {renderSlide()}
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-4 flex items-center justify-between">
        <button
          onClick={goToPrevious}
          disabled={currentSlideIndex === 0}
          className="p-3 text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <div className="flex gap-2">
          {visibleSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlideIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlideIndex
                  ? 'bg-white w-8'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          disabled={currentSlideIndex === visibleSlides.length - 1}
          className="p-3 text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}