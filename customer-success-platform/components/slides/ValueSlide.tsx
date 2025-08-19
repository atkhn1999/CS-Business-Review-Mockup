'use client';

import { useStore } from '@/lib/store/useStore';
import { TrendingUp, DollarSign, Clock, Shield } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function ValueSlide() {
  const { valueRealized } = useStore();

  const getValueIcon = (type: string) => {
    if (type.includes('Time')) return <Clock className="h-6 w-6" />;
    if (type.includes('Cost') || type.includes('Revenue')) return <DollarSign className="h-6 w-6" />;
    if (type.includes('Risk')) return <Shield className="h-6 w-6" />;
    return <TrendingUp className="h-6 w-6" />;
  };

  if (valueRealized.length === 0) {
    return (
      <div className="text-white text-center">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
          Value Realized
        </h2>
        <p className="text-xl text-gray-400 mt-8">
          Value achievements will be displayed here
        </p>
      </div>
    );
  }

  return (
    <div className="text-white">
      <h2 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
        Value Realized
      </h2>
      
      <p className="text-xl text-gray-300 text-center mb-12">
        Tangible benefits achieved through our partnership
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {valueRealized.map((value, index) => (
          <div
            key={value.id}
            className="bg-gradient-to-br from-green-500/20 to-emerald-500/10 backdrop-blur-sm rounded-xl p-6 border border-green-500/20"
            style={{
              animationDelay: `${index * 0.1}s`,
              animation: 'fadeIn 0.5s ease-out forwards',
            }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400">
                {getValueIcon(value.type)}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-green-400 mb-2">{value.type}</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  {value.description}
                </p>
                <p className="text-xs text-gray-500">
                  Realized: {formatDate(value.date)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-8 bg-white/10 backdrop-blur-sm rounded-xl px-8 py-4">
          <div>
            <div className="text-3xl font-bold text-green-400">{valueRealized.length}</div>
            <div className="text-sm text-gray-400">Total Wins</div>
          </div>
          <div className="w-px h-12 bg-gray-700" />
          <div>
            <div className="text-3xl font-bold text-green-400">
              {valueRealized.filter(v => v.type.includes('Revenue') || v.type.includes('Cost')).length}
            </div>
            <div className="text-sm text-gray-400">Financial Impact</div>
          </div>
        </div>
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