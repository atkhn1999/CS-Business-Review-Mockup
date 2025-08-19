'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store/useStore';
import SlideManager from '@/components/SlideManager';
import EditPanel from '@/components/EditPanel';
import Header from '@/components/Header';
import PresentationView from '@/components/PresentationView';
import { FileDown, FileUp, Play, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Home() {
  const [view, setView] = useState<'edit' | 'preview' | 'present'>('edit');
  const [selectedSlideId, setSelectedSlideId] = useState<string | null>(null);
  const { customerName } = useStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {view === 'present' ? (
        <PresentationView onExit={() => setView('edit')} />
      ) : (
        <>
          <Header />
          
          <div className="max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8">
            {/* Toolbar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setView('edit')}
                  className={cn(
                    'px-4 py-2 rounded-lg font-medium transition-all',
                    view === 'edit'
                      ? 'bg-teal-500 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  )}
                >
                  Edit Mode
                </button>
                <button
                  onClick={() => setView('preview')}
                  className={cn(
                    'px-4 py-2 rounded-lg font-medium transition-all',
                    view === 'preview'
                      ? 'bg-teal-500 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  )}
                >
                  Preview
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setView('present')}
                  className="btn btn-primary"
                >
                  <Play className="h-4 w-4" />
                  Present
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Slide Manager */}
              <div className="lg:col-span-1">
                <SlideManager
                  selectedSlideId={selectedSlideId}
                  onSelectSlide={setSelectedSlideId}
                  viewMode={view}
                />
              </div>

              {/* Edit Panel */}
              <div className="lg:col-span-2">
                {view === 'edit' ? (
                  <EditPanel
                    selectedSlideId={selectedSlideId}
                    onSlideUpdate={() => {
                      // Trigger any necessary updates
                    }}
                  />
                ) : (
                  <div className="card p-8">
                    <div className="aspect-[16/9] bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                          {customerName} Success Plan
                        </h2>
                        <p className="text-gray-600">
                          Preview mode - Switch to edit mode to make changes
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}