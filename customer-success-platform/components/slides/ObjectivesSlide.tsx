'use client';

import { useStore } from '@/lib/store/useStore';
import { Calendar, AlertCircle, TrendingUp } from 'lucide-react';

export default function ObjectivesSlide() {
  const { objectives } = useStore();

  const statusColors = {
    'Not Started': 'bg-gray-500/20 text-gray-300',
    'In Progress': 'bg-blue-500/20 text-blue-300',
    'At Risk': 'bg-yellow-500/20 text-yellow-300',
    'Completed': 'bg-green-500/20 text-green-300',
  };

  if (objectives.length === 0) {
    return (
      <div className="text-white text-center">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
          Current Objectives
        </h2>
        <p className="text-xl text-gray-400 mt-8">
          No active objectives at this time
        </p>
      </div>
    );
  }

  return (
    <div className="text-white">
      <h2 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
        Current Objectives
      </h2>
      
      <p className="text-xl text-gray-300 text-center mb-12">
        Key initiatives for the next quarter
      </p>
      
      <div className="space-y-4 max-w-5xl mx-auto">
        {objectives.map((objective, index) => (
          <div
            key={objective.id}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            style={{
              animationDelay: `${index * 0.1}s`,
              animation: 'fadeIn 0.5s ease-out forwards',
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-semibold">{objective.name}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[objective.status]}`}>
                {objective.status}
              </span>
            </div>
            
            <p className="text-gray-300 text-sm mb-4">{objective.description}</p>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              {objective.targetDate && (
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span>Target: {new Date(objective.targetDate).toLocaleDateString()}</span>
                </div>
              )}
              {objective.challenges && (
                <div className="flex items-center gap-2 text-yellow-400">
                  <AlertCircle className="h-4 w-4" />
                  <span>Has Challenges</span>
                </div>
              )}
              {objective.kpis.length > 0 && (
                <div className="flex items-center gap-2 text-teal-400">
                  <TrendingUp className="h-4 w-4" />
                  <span>{objective.kpis.length} KPIs tracked</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}