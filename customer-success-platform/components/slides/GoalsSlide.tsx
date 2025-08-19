'use client';

import { useStore } from '@/lib/store/useStore';
import { Target, Link } from 'lucide-react';

export default function GoalsSlide() {
  const { missionGoals } = useStore();

  if (missionGoals.length === 0) {
    return (
      <div className="text-white text-center">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
          Strategic Goals
        </h2>
        <p className="text-xl text-gray-400 mt-8">
          No strategic goals have been defined yet
        </p>
      </div>
    );
  }

  return (
    <div className="text-white">
      <h2 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
        Strategic Goals
      </h2>
      
      <p className="text-xl text-gray-300 text-center mb-12">
        Long-term vision for our partnership
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {missionGoals.map((goal, index) => (
          <div
            key={goal.id}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-transform"
            style={{
              animationDelay: `${index * 0.1}s`,
              animation: 'fadeIn 0.5s ease-out forwards',
            }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{goal.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  {goal.description}
                </p>
                {goal.customFields && goal.customFields.length > 0 && (
                  <div className="space-y-1 pt-3 border-t border-white/10">
                    {goal.customFields.map((field) => (
                      <div key={field.id} className="text-xs">
                        <span className="text-gray-400">{field.label}:</span>
                        {field.value.startsWith('http') ? (
                          <a
                            href={field.value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-1 text-teal-400 hover:text-teal-300 inline-flex items-center gap-1"
                          >
                            View
                            <Link className="h-3 w-3" />
                          </a>
                        ) : (
                          <span className="ml-1 text-gray-300">{field.value}</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}