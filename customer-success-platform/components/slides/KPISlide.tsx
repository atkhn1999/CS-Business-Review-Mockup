'use client';

import { useStore } from '@/lib/store/useStore';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { PRODUCT_KPIS, calculateDelta } from '@/lib/utils';

export default function KPISlide() {
  const { objectives, products } = useStore();

  // Collect all KPIs from objectives
  const allKPIs = objectives.flatMap(obj => 
    obj.kpis.map(kpi => ({ ...kpi, objectiveName: obj.name }))
  );

  const getKPIType = (typeKey: string) => {
    for (const product of products) {
      const types = PRODUCT_KPIS[product] || [];
      const type = types.find(t => t.key === typeKey);
      if (type) return type;
    }
    return null;
  };

  if (allKPIs.length === 0) {
    return (
      <div className="text-white text-center">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
          Key Performance Indicators
        </h2>
        <p className="text-xl text-gray-400 mt-8">
          No KPIs are currently being tracked
        </p>
      </div>
    );
  }

  return (
    <div className="text-white">
      <h2 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
        Key Performance Indicators
      </h2>
      
      <p className="text-xl text-gray-300 text-center mb-12">
        Tracking progress across all objectives
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {allKPIs.map((kpi, index) => {
          const kpiType = getKPIType(kpi.typeKey);
          if (!kpiType) return null;
          
          const delta = calculateDelta(kpi.currentValue, kpi.previousValue);
          const isPositive = kpiType.higherIsBetter ? delta >= 0 : delta <= 0;
          
          return (
            <div
              key={kpi.id}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: 'fadeIn 0.5s ease-out forwards',
              }}
            >
              <div className="text-sm text-gray-400 mb-2">{kpi.objectiveName}</div>
              <h3 className="text-lg font-medium mb-3">{kpiType.label}</h3>
              
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold">{kpi.currentValue}</span>
                <span className="text-lg text-gray-400">{kpiType.unit}</span>
              </div>
              
              {kpi.comparePrevious && kpi.previousValue !== 0 && (
                <div className={`flex items-center gap-2 text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {isPositive ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span>
                    {delta > 0 && '+'}{delta.toFixed(1)}% from {kpi.previousValue}{kpiType.unit}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}