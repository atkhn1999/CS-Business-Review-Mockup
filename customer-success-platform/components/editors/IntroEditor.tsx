'use client';

import { useStore } from '@/lib/store/useStore';
import { formatDate } from '@/lib/utils';

export default function IntroEditor() {
  const { customerName, setCustomerName, planHealth, setPlanHealth } = useStore();

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Customer Name
        </label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="input-field text-lg font-semibold"
          placeholder="Enter customer name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Overall Health Score
        </label>
        <select
          value={planHealth}
          onChange={(e) => setPlanHealth(e.target.value as 'green' | 'yellow' | 'red')}
          className="input-field"
        >
          <option value="green">🟢 On Track</option>
          <option value="yellow">🟡 Needs Attention</option>
          <option value="red">🔴 At Risk</option>
        </select>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Presentation Details</h4>
        <div className="space-y-1 text-sm text-gray-600">
          <p>Last Updated: {formatDate(new Date())}</p>
          <p>Created by: Receptive AI Team</p>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Presentation Tips</h4>
        <ul className="space-y-1 text-sm text-gray-600">
          <li>• Use the Present button to start the slideshow</li>
          <li>• Reorder slides by dragging them in the sidebar</li>
          <li>• Hide slides you don't need for this review</li>
          <li>• Export your presentation as PDF when ready</li>
        </ul>
      </div>
    </div>
  );
}