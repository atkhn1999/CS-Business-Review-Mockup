'use client';

import { useStore } from '@/lib/store/useStore';

export default function MissionEditor() {
  const { missionSummary, setMissionSummary } = useStore();

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Executive Summary
        </label>
        <textarea
          value={missionSummary}
          onChange={(e) => setMissionSummary(e.target.value)}
          className="textarea-field min-h-[200px]"
          placeholder="Describe the partnership mission and high-level objectives..."
        />
        <p className="text-xs text-gray-500 mt-2">
          This should be a compelling summary of your partnership goals and expected outcomes.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-blue-800 mb-2">Writing Tips</h4>
        <ul className="space-y-1 text-sm text-blue-700">
          <li>• Start with the customer's name and industry context</li>
          <li>• Highlight key transformation goals</li>
          <li>• Include measurable outcomes (percentages, timeframes)</li>
          <li>• Keep it concise but impactful (2-3 sentences)</li>
        </ul>
      </div>

      <div className="border-t pt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Example Mission Statement</h4>
        <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 italic">
          "Partner with [Customer Name] to revolutionize their global sales operations through 
          Receptive's AI-powered revenue enablement platform. Our mission is to empower 500+ 
          sales professionals across 12 regions to deliver personalized, data-driven customer 
          experiences that accelerate deal velocity by 45% and increase average contract values 
          by 30% within the next 12 months."
        </div>
      </div>
    </div>
  );
}