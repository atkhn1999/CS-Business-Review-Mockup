'use client';

import { useStore } from '@/lib/store/useStore';
import { Mail } from 'lucide-react';

export default function TeamSlide() {
  const { teamMembers } = useStore();

  return (
    <div className="text-white">
      <h2 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
        Your Receptive AI Team
      </h2>
      
      <p className="text-xl text-gray-300 text-center mb-12">
        Dedicated professionals committed to your success
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {teamMembers.map((member, index) => (
          <div
            key={member.id}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center transform hover:scale-105 transition-transform"
            style={{
              animationDelay: `${index * 0.1}s`,
              animation: 'fadeIn 0.5s ease-out forwards',
            }}
          >
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full flex items-center justify-center text-3xl font-bold text-white">
              {member.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
            <p className="text-gray-400 mb-3">{member.role}</p>
            <a
              href={`mailto:${member.email}`}
              className="inline-flex items-center gap-2 text-sm text-teal-400 hover:text-teal-300"
            >
              <Mail className="h-4 w-4" />
              {member.email}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}