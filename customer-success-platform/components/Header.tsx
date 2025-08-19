'use client';

import { useStore } from '@/lib/store/useStore';
import { Download, Upload, Save, Settings } from 'lucide-react';
import { downloadFile, readFileAsText } from '@/lib/utils';
import * as React from 'react';

export default function Header() {
  const { customerName, setCustomerName, exportData, importData } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = exportData();
    const json = JSON.stringify(data, null, 2);
    const filename = `${customerName.replace(/\s+/g, '-').toLowerCase()}-success-plan-${new Date().toISOString().split('T')[0]}.json`;
    downloadFile(json, filename);
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const content = await readFileAsText(file);
      const data = JSON.parse(content);
      importData(data);
      alert('Data imported successfully!');
    } catch (error) {
      alert('Error importing data. Please check the file format.');
    }
  };

  return (
    <header className="bg-gradient-to-r from-teal-950 via-teal-800 to-emerald-600 text-white shadow-xl relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)',
            animation: 'slide 20s linear infinite',
          }}
        />
      </div>
      
      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent transform rotate-45 translate-x-16 -translate-y-16" />
      </div>
      
      <div className="relative z-10 max-w-screen-2xl mx-auto p-6 md:p-8 lg:p-10">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg flex flex-wrap items-baseline gap-3 justify-center lg:justify-start">
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="bg-transparent border-b-2 border-white/50 hover:border-white focus:border-white outline-none transition-all cursor-pointer hover:opacity-80"
                style={{ width: `${customerName.length + 1}ch` }}
              />
              <span>Success Plan</span>
            </h1>
            <p className="text-white/80 mt-2 text-lg">Strategic objectives and performance tracking</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <p className="text-teal-50/90 text-sm font-light whitespace-nowrap">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleExport}
                className="btn bg-white/10 text-white border border-white/30 hover:bg-white/20"
              >
                <Download className="h-4 w-4" />
                Export
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn bg-white/10 text-white border border-white/30 hover:bg-white/20"
              >
                <Upload className="h-4 w-4" />
                Import
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes slide {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(70px);
          }
        }
      `}</style>
    </header>
  );
}