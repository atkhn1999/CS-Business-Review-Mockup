'use client';

import { useStore } from '@/lib/store/useStore';
import { Slide } from '@/lib/types';
import TeamEditor from './editors/TeamEditor';
import StakeholderEditor from './editors/StakeholderEditor';
import MissionEditor from './editors/MissionEditor';
import GoalsEditor from './editors/GoalsEditor';
import ObjectivesEditor from './editors/ObjectivesEditor';
import ValueEditor from './editors/ValueEditor';
import IntroEditor from './editors/IntroEditor';

interface EditPanelProps {
  selectedSlideId: string | null;
  onSlideUpdate: () => void;
}

export default function EditPanel({ selectedSlideId, onSlideUpdate }: EditPanelProps) {
  const { presentation } = useStore();
  
  const selectedSlide = presentation.slides.find(s => s.id === selectedSlideId);
  
  if (!selectedSlide) {
    return (
      <div className="card p-8">
        <div className="text-center text-gray-500">
          <p className="text-lg font-medium mb-2">No slide selected</p>
          <p className="text-sm">Select a slide from the list to start editing</p>
        </div>
      </div>
    );
  }

  const renderEditor = () => {
    switch (selectedSlide.type) {
      case 'intro':
        return <IntroEditor />;
      case 'team':
        return <TeamEditor />;
      case 'stakeholders':
        return <StakeholderEditor />;
      case 'mission':
        return <MissionEditor />;
      case 'goals':
        return <GoalsEditor />;
      case 'objectives':
        return <ObjectivesEditor />;
      case 'value':
        return <ValueEditor />;
      case 'kpis':
        return (
          <div className="text-center text-gray-500 py-8">
            <p>KPIs are managed within individual objectives</p>
          </div>
        );
      case 'summary':
        return (
          <div className="text-center text-gray-500 py-8">
            <p>Summary is automatically generated from your data</p>
          </div>
        );
      default:
        return (
          <div className="text-center text-gray-500 py-8">
            <p>Editor not available for this slide type</p>
          </div>
        );
    }
  };

  return (
    <div className="card p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{selectedSlide.title}</h2>
        <p className="text-sm text-gray-500 mt-1">Edit the content for this slide</p>
      </div>
      
      <div className="min-h-[400px]">
        {renderEditor()}
      </div>
    </div>
  );
}