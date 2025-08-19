'use client';

import { useStore } from '@/lib/store/useStore';
import { Building2, Mail, Phone } from 'lucide-react';

export default function StakeholderSlide() {
  const { stakeholders, customerName } = useStore();

  if (stakeholders.length === 0) {
    return (
      <div className="text-white text-center">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
          Key Stakeholders
        </h2>
        <p className="text-xl text-gray-400 mt-8">
          No stakeholders have been added yet
        </p>
      </div>
    );
  }

  return (
    <div className="text-white">
      <h2 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
        {customerName} Key Stakeholders
      </h2>
      
      <p className="text-xl text-gray-300 text-center mb-12">
        Partnership champions driving success
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {stakeholders.map((stakeholder, index) => (
          <div
            key={stakeholder.id}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-transform"
            style={{
              animationDelay: `${index * 0.1}s`,
              animation: 'fadeIn 0.5s ease-out forwards',
            }}
          >
            <div className="flex items-start gap-4">
              {stakeholder.avatar ? (
                <img
                  src={stakeholder.avatar}
                  alt={stakeholder.name}
                  className="w-16 h-16 rounded-full"
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-xl font-bold text-white">
                  {stakeholder.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">{stakeholder.name}</h3>
                <p className="text-gray-400 text-sm mb-3 flex items-center gap-1">
                  <Building2 className="h-3 w-3" />
                  {stakeholder.title}
                </p>
                <div className="space-y-1">
                  <a
                    href={`mailto:${stakeholder.email}`}
                    className="flex items-center gap-2 text-xs text-teal-400 hover:text-teal-300"
                  >
                    <Mail className="h-3 w-3" />
                    {stakeholder.email}
                  </a>
                  {stakeholder.phone && (
                    <p className="flex items-center gap-2 text-xs text-gray-400">
                      <Phone className="h-3 w-3" />
                      {stakeholder.phone}
                    </p>
                  )}
                </div>
              </div>
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