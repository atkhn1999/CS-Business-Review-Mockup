'use client';

import { useStore } from '@/lib/store/useStore';
import { Target } from 'lucide-react';

export default function MissionSlide() {
  const { missionSummary, customerName } = useStore();

  return (
    <div className="text-white">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full mb-6">
          <Target className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
          Our Mission
        </h2>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
          {missionSummary ? (
            <p className="text-xl md:text-2xl leading-relaxed text-gray-100">
              {missionSummary}
            </p>
          ) : (
            <p className="text-xl md:text-2xl leading-relaxed text-gray-400 italic">
              Partner with {customerName} to achieve transformative business outcomes through strategic implementation of our platform.
            </p>
          )}
        </div>
        
        <div className="mt-8 flex justify-center gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-teal-400">Transform</div>
            <div className="text-sm text-gray-400 mt-1">Operations</div>
          </div>
          <div className="w-px h-16 bg-gray-700 self-center" />
          <div>
            <div className="text-3xl font-bold text-emerald-400">Accelerate</div>
            <div className="text-sm text-gray-400 mt-1">Growth</div>
          </div>
          <div className="w-px h-16 bg-gray-700 self-center" />
          <div>
            <div className="text-3xl font-bold text-teal-400">Maximize</div>
            <div className="text-sm text-gray-400 mt-1">Value</div>
          </div>
        </div>
      </div>
    </div>
  );
}