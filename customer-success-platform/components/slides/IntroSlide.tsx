'use client';

import { useStore } from '@/lib/store/useStore';
import { formatDate } from '@/lib/utils';

export default function IntroSlide() {
  const { customerName, planHealth } = useStore();

  const healthColors = {
    green: 'text-green-400 bg-green-400/20',
    yellow: 'text-yellow-400 bg-yellow-400/20',
    red: 'text-red-400 bg-red-400/20',
  };

  const healthLabels = {
    green: '🟢 On Track',
    yellow: '🟡 Needs Attention',
    red: '🔴 At Risk',
  };

  return (
    <div className="text-center text-white">
      <div className="mb-8">
        <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-medium ${healthColors[planHealth]}`}>
          {healthLabels[planHealth]}
        </div>
      </div>
      
      <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
        {customerName}
      </h1>
      
      <h2 className="text-4xl font-light mb-12 text-gray-300">
        Customer Success Plan
      </h2>
      
      <div className="text-xl text-gray-400">
        Business Review • {formatDate(new Date())}
      </div>
      
      <div className="mt-16 flex items-center justify-center gap-8 text-gray-500">
        <div className="text-center">
          <div className="text-3xl font-bold text-teal-400">Q4 2024</div>
          <div className="text-sm mt-1">Review Period</div>
        </div>
        <div className="w-px h-16 bg-gray-700" />
        <div className="text-center">
          <div className="text-3xl font-bold text-teal-400">Strategic</div>
          <div className="text-sm mt-1">Partnership Level</div>
        </div>
      </div>
    </div>
  );
}