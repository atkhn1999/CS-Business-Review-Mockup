'use client';

import * as React from 'react';
import { useStore } from '@/lib/store/useStore';
import { ValueRealized } from '@/lib/types';
import { Plus, Trash2, Edit2, Check, X, TrendingUp, DollarSign, Calendar, Link } from 'lucide-react';
import { generateId, formatDate } from '@/lib/utils';

export default function ValueEditor() {
  const { valueRealized, addValueRealized, updateValueRealized, removeValueRealized } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newValue, setNewValue] = useState<Partial<ValueRealized>>({
    type: 'Time Savings',
    description: '',
    date: new Date().toISOString().split('T')[0],
    link: '',
  });

  const valueTypes = [
    'Time Savings',
    'Cost Reduction',
    'Revenue Growth',
    'Productivity Gain',
    'Risk Mitigation',
    'Quality Improvement',
    'Customer Satisfaction',
    'Process Efficiency',
    'Market Expansion',
    'Compliance Achievement',
  ];

  const handleAdd = () => {
    if (newValue.type && newValue.description) {
      addValueRealized({
        id: generateId(),
        type: newValue.type,
        description: newValue.description,
        date: newValue.date || new Date().toISOString().split('T')[0],
        link: newValue.link,
      });
      setNewValue({
        type: 'Time Savings',
        description: '',
        date: new Date().toISOString().split('T')[0],
        link: '',
      });
      setIsAdding(false);
    }
  };

  const getValueIcon = (type: string) => {
    switch (type) {
      case 'Time Savings':
        return <TrendingUp className="h-5 w-5 text-blue-600" />;
      case 'Cost Reduction':
      case 'Revenue Growth':
        return <DollarSign className="h-5 w-5 text-green-600" />;
      default:
        return <TrendingUp className="h-5 w-5 text-teal-600" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Value Realized</h3>
        <button
          onClick={() => setIsAdding(true)}
          className="btn btn-success btn-sm"
        >
          <Plus className="h-4 w-4" />
          Add Value
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Document the tangible value and benefits achieved through your partnership.
      </p>

      {valueRealized.length === 0 && !isAdding && (
        <div className="text-center py-8 text-gray-500">
          <TrendingUp className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p className="text-sm">No value realized items yet</p>
          <p className="text-xs mt-1">Click "Add Value" to document achievements</p>
        </div>
      )}

      <div className="grid gap-4">
        {valueRealized.map((value) => (
          <div key={value.id} className="card p-4 border-l-4 border-green-500">
            {editingId === value.id ? (
              <div className="space-y-3">
                <select
                  defaultValue={value.type}
                  className="input-field"
                  onChange={(e) => updateValueRealized(value.id, { type: e.target.value })}
                >
                  {valueTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <textarea
                  defaultValue={value.description}
                  className="textarea-field"
                  placeholder="Describe the value realized..."
                  rows={3}
                  onBlur={(e) => updateValueRealized(value.id, { description: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    defaultValue={value.date}
                    className="input-field"
                    onBlur={(e) => updateValueRealized(value.id, { date: e.target.value })}
                  />
                  <input
                    type="url"
                    defaultValue={value.link}
                    className="input-field"
                    placeholder="Reference link (optional)"
                    onBlur={(e) => updateValueRealized(value.id, { link: e.target.value })}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingId(null)}
                    className="btn btn-primary btn-sm"
                  >
                    <Check className="h-4 w-4" />
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start gap-3">
                    {getValueIcon(value.type)}
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{value.type}</h4>
                      <p className="text-sm text-gray-600 mt-1">{value.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(value.date)}
                        </span>
                        {value.link && (
                          <a
                            href={value.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-teal-600 hover:text-teal-700"
                          >
                            <Link className="h-3 w-3" />
                            View Details
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingId(value.id)}
                      className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => removeValueRealized(value.id)}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {isAdding && (
          <div className="border-2 border-dashed border-green-300 rounded-lg p-4 bg-green-50">
            <div className="space-y-3">
              <select
                value={newValue.type}
                onChange={(e) => setNewValue({ ...newValue, type: e.target.value })}
                className="input-field"
              >
                {valueTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <textarea
                value={newValue.description}
                onChange={(e) => setNewValue({ ...newValue, description: e.target.value })}
                className="textarea-field"
                placeholder="Describe the value realized and its impact..."
                rows={3}
                autoFocus
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  value={newValue.date}
                  onChange={(e) => setNewValue({ ...newValue, date: e.target.value })}
                  className="input-field"
                />
                <input
                  type="url"
                  value={newValue.link}
                  onChange={(e) => setNewValue({ ...newValue, link: e.target.value })}
                  className="input-field"
                  placeholder="Reference link (optional)"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAdd}
                  className="btn btn-success btn-sm"
                >
                  <Check className="h-4 w-4" />
                  Add Value
                </button>
                <button
                  onClick={() => {
                    setIsAdding(false);
                    setNewValue({
                      type: 'Time Savings',
                      description: '',
                      date: new Date().toISOString().split('T')[0],
                      link: '',
                    });
                  }}
                  className="btn btn-ghost btn-sm"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {valueRealized.length > 0 && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <h4 className="text-sm font-semibold text-green-800 mb-2">Impact Summary</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-700">{valueRealized.length}</p>
              <p className="text-xs text-green-600">Total Achievements</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-700">
                {valueRealized.filter(v => v.type === 'Revenue Growth' || v.type === 'Cost Reduction').length}
              </p>
              <p className="text-xs text-green-600">Financial Impact</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-700">
                {valueRealized.filter(v => new Date(v.date) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)).length}
              </p>
              <p className="text-xs text-green-600">Last 90 Days</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}