'use client';

import { useStore } from '@/lib/store/useStore';
import { CheckCircle, Target, TrendingUp, Users } from 'lucide-react';

export default function SummarySlide() {
  const { customerName, objectives, valueRealized, pastObjectives, planHealth } = useStore();

  const activeObjectives = objectives.filter(obj => obj.status === 'In Progress').length;
  const completedObjectives = pastObjectives.length;
  const totalKPIs = objectives.reduce((sum, obj) => sum + obj.kpis.length, 0);

  return (
    <div className="text-white">
      <h2 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
        Summary & Next Steps
      </h2>
      
      <p className="text-xl text-gray-300 text-center mb-12">
        {customerName} Partnership Progress
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Target className="h-8 w-8 text-blue-400" />
          </div>
          <div className="text-2xl font-bold">{activeObjectives}</div>
          <div className="text-sm text-gray-400">Active Objectives</div>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
          <div className="text-2xl font-bold">{completedObjectives}</div>
          <div className="text-sm text-gray-400">Completed</div>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="h-8 w-8 text-purple-400" />
          </div>
          <div className="text-2xl font-bold">{totalKPIs}</div>
          <div className="text-sm text-gray-400">KPIs Tracked</div>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Users className="h-8 w-8 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold">{valueRealized.length}</div>
          <div className="text-sm text-gray-400">Value Wins</div>
        </div>
      </div>
      
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold mb-6 text-center">Next Steps</h3>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-sm font-bold">1</span>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Continue Current Initiatives</h4>
              <p className="text-gray-300 text-sm">Focus on {activeObjectives} active objectives to maintain momentum</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-sm font-bold">2</span>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Quarterly Business Review</h4>
              <p className="text-gray-300 text-sm">Schedule next QBR to review progress and align on new objectives</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-sm font-bold">3</span>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Expand Success Metrics</h4>
              <p className="text-gray-300 text-sm">Identify additional KPIs to track based on achieved value</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-12">
        <p className="text-2xl font-light text-gray-300">
          Thank you for your partnership!
        </p>
        <p className="text-lg text-gray-400 mt-2">
          Together, we're driving exceptional results
        </p>
      </div>
    </div>
  );
}