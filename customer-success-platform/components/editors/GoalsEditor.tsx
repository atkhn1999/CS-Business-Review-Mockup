'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store/useStore';
import { MissionGoal, CustomField } from '@/lib/types';
import { Plus, Trash2, Edit2, Check, X, Target } from 'lucide-react';
import { generateId } from '@/lib/utils';

export default function GoalsEditor() {
  const { missionGoals, addMissionGoal, updateMissionGoal, removeMissionGoal } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newGoal, setNewGoal] = useState<Partial<MissionGoal>>({
    title: '',
    description: '',
    customFields: [],
  });

  const handleAdd = () => {
    if (newGoal.title && newGoal.description) {
      addMissionGoal({
        id: generateId(),
        title: newGoal.title,
        description: newGoal.description,
        customFields: newGoal.customFields || [],
      });
      setNewGoal({ title: '', description: '', customFields: [] });
      setIsAdding(false);
    }
  };

  const handleUpdate = (id: string, updates: Partial<MissionGoal>) => {
    updateMissionGoal(id, updates);
    setEditingId(null);
  };

  const addCustomField = (goalId: string) => {
    const goal = missionGoals.find(g => g.id === goalId);
    if (!goal) return;

    const newField: CustomField = {
      id: generateId(),
      label: 'New Field',
      value: '',
    };

    updateMissionGoal(goalId, {
      customFields: [...(goal.customFields || []), newField],
    });
  };

  const updateCustomField = (goalId: string, fieldId: string, updates: Partial<CustomField>) => {
    const goal = missionGoals.find(g => g.id === goalId);
    if (!goal) return;

    const updatedFields = (goal.customFields || []).map(field =>
      field.id === fieldId ? { ...field, ...updates } : field
    );

    updateMissionGoal(goalId, { customFields: updatedFields });
  };

  const removeCustomField = (goalId: string, fieldId: string) => {
    const goal = missionGoals.find(g => g.id === goalId);
    if (!goal) return;

    const updatedFields = (goal.customFields || []).filter(field => field.id !== fieldId);
    updateMissionGoal(goalId, { customFields: updatedFields });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Long-term Mission Goals</h3>
        <button
          onClick={() => setIsAdding(true)}
          className="btn btn-primary btn-sm"
        >
          <Target className="h-4 w-4" />
          Add Goal
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Define high-level goals that represent the long-term vision of your partnership.
      </p>

      {missionGoals.length === 0 && !isAdding && (
        <div className="text-center py-8 text-gray-500">
          <Target className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p className="text-sm">No mission goals defined yet</p>
          <p className="text-xs mt-1">Click "Add Goal" to get started</p>
        </div>
      )}

      <div className="grid gap-4">
        {missionGoals.map((goal) => (
          <div key={goal.id} className="card p-4">
            {editingId === goal.id ? (
              <div className="space-y-3">
                <input
                  type="text"
                  defaultValue={goal.title}
                  className="input-field font-semibold"
                  placeholder="Goal Title"
                  onBlur={(e) => updateMissionGoal(goal.id, { title: e.target.value })}
                />
                <textarea
                  defaultValue={goal.description}
                  className="textarea-field"
                  placeholder="Goal Description"
                  rows={3}
                  onBlur={(e) => updateMissionGoal(goal.id, { description: e.target.value })}
                />
                
                {/* Custom Fields */}
                <div className="space-y-2">
                  {goal.customFields?.map((field) => (
                    <div key={field.id} className="flex gap-2">
                      <input
                        type="text"
                        defaultValue={field.label}
                        className="input-field text-sm w-1/3"
                        placeholder="Field Label"
                        onBlur={(e) => updateCustomField(goal.id, field.id, { label: e.target.value })}
                      />
                      <input
                        type="text"
                        defaultValue={field.value}
                        className="input-field text-sm flex-1"
                        placeholder="Field Value"
                        onBlur={(e) => updateCustomField(goal.id, field.id, { value: e.target.value })}
                      />
                      <button
                        onClick={() => removeCustomField(goal.id, field.id)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addCustomField(goal.id)}
                    className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                  >
                    + Add Custom Field
                  </button>
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
                  <h4 className="font-semibold text-gray-800">{goal.title}</h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingId(goal.id)}
                      className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => removeMissionGoal(goal.id)}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
                {goal.customFields && goal.customFields.length > 0 && (
                  <div className="space-y-1 pt-2 border-t">
                    {goal.customFields.map((field) => (
                      <div key={field.id} className="text-xs">
                        <span className="font-medium text-gray-700">{field.label}:</span>
                        {field.value.startsWith('http') ? (
                          <a
                            href={field.value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-1 text-teal-600 hover:text-teal-700 underline"
                          >
                            {field.value}
                          </a>
                        ) : (
                          <span className="ml-1 text-gray-600">{field.value}</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {isAdding && (
          <div className="border-2 border-dashed border-teal-300 rounded-lg p-4 bg-teal-50">
            <div className="space-y-3">
              <input
                type="text"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                className="input-field font-semibold"
                placeholder="Goal Title"
                autoFocus
              />
              <textarea
                value={newGoal.description}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                className="textarea-field"
                placeholder="Describe this goal and what success looks like..."
                rows={3}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAdd}
                  className="btn btn-primary btn-sm"
                >
                  <Check className="h-4 w-4" />
                  Add Goal
                </button>
                <button
                  onClick={() => {
                    setIsAdding(false);
                    setNewGoal({ title: '', description: '', customFields: [] });
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
    </div>
  );
}