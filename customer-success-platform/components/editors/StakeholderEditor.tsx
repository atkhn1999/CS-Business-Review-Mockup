'use client';

import * as React from 'react';
import { useStore } from '@/lib/store/useStore';
import { Stakeholder } from '@/lib/types';
import { Plus, Trash2, Edit2, Check, X, UserPlus } from 'lucide-react';
import { generateId } from '@/lib/utils';

export default function StakeholderEditor() {
  const { stakeholders, addStakeholder, updateStakeholder, removeStakeholder, removeAllStakeholders } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newStakeholder, setNewStakeholder] = useState<Partial<Stakeholder>>({
    name: '',
    title: '',
    email: '',
    phone: '',
  });

  const handleAdd = () => {
    if (newStakeholder.name && newStakeholder.title && newStakeholder.email) {
      addStakeholder({
        id: generateId(),
        name: newStakeholder.name,
        title: newStakeholder.title,
        email: newStakeholder.email,
        phone: newStakeholder.phone,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newStakeholder.name)}&background=14b8a6&color=fff`,
      });
      setNewStakeholder({ name: '', title: '', email: '', phone: '' });
      setIsAdding(false);
    }
  };

  const handleUpdate = (id: string, updates: Partial<Stakeholder>) => {
    updateStakeholder(id, updates);
    setEditingId(null);
  };

  const handleDeleteAll = () => {
    if (stakeholders.length === 0) return;
    
    if (confirm(`Are you sure you want to remove all ${stakeholders.length} stakeholders?`)) {
      removeAllStakeholders();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Customer Stakeholders</h3>
        <div className="flex gap-2">
          {stakeholders.length > 0 && (
            <button
              onClick={handleDeleteAll}
              className="btn btn-ghost btn-sm text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
              Delete All
            </button>
          )}
          <button
            onClick={() => setIsAdding(true)}
            className="btn btn-primary btn-sm"
          >
            <UserPlus className="h-4 w-4" />
            Add Stakeholder
          </button>
        </div>
      </div>

      {stakeholders.length === 0 && !isAdding && (
        <div className="text-center py-8 text-gray-500">
          <UserPlus className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p className="text-sm">No stakeholders added yet</p>
          <p className="text-xs mt-1">Click "Add Stakeholder" to get started</p>
        </div>
      )}

      <div className="grid gap-4">
        {stakeholders.map((stakeholder) => (
          <div key={stakeholder.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-all">
            {editingId === stakeholder.id ? (
              <div className="space-y-3">
                <input
                  type="text"
                  defaultValue={stakeholder.name}
                  className="input-field"
                  placeholder="Name"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUpdate(stakeholder.id, {
                        name: (e.target as HTMLInputElement).value,
                      });
                    }
                  }}
                />
                <input
                  type="text"
                  defaultValue={stakeholder.title}
                  className="input-field"
                  placeholder="Title"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUpdate(stakeholder.id, {
                        title: (e.target as HTMLInputElement).value,
                      });
                    }
                  }}
                />
                <input
                  type="email"
                  defaultValue={stakeholder.email}
                  className="input-field"
                  placeholder="Email"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUpdate(stakeholder.id, {
                        email: (e.target as HTMLInputElement).value,
                      });
                    }
                  }}
                />
                <input
                  type="tel"
                  defaultValue={stakeholder.phone}
                  className="input-field"
                  placeholder="Phone (optional)"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUpdate(stakeholder.id, {
                        phone: (e.target as HTMLInputElement).value,
                      });
                    }
                  }}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingId(null)}
                    className="btn btn-ghost btn-sm"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {stakeholder.avatar && (
                    <img
                      src={stakeholder.avatar}
                      alt={stakeholder.name}
                      className="w-12 h-12 rounded-full"
                    />
                  )}
                  <div>
                    <h4 className="font-semibold text-gray-800">{stakeholder.name}</h4>
                    <p className="text-sm text-gray-600">{stakeholder.title}</p>
                    <p className="text-sm text-gray-500">{stakeholder.email}</p>
                    {stakeholder.phone && (
                      <p className="text-sm text-gray-500">{stakeholder.phone}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingId(stakeholder.id)}
                    className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => removeStakeholder(stakeholder.id)}
                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {isAdding && (
          <div className="border-2 border-dashed border-teal-300 rounded-lg p-4 bg-teal-50">
            <div className="space-y-3">
              <input
                type="text"
                value={newStakeholder.name}
                onChange={(e) => setNewStakeholder({ ...newStakeholder, name: e.target.value })}
                className="input-field"
                placeholder="Name"
                autoFocus
              />
              <input
                type="text"
                value={newStakeholder.title}
                onChange={(e) => setNewStakeholder({ ...newStakeholder, title: e.target.value })}
                className="input-field"
                placeholder="Title (e.g., VP of Sales)"
              />
              <input
                type="email"
                value={newStakeholder.email}
                onChange={(e) => setNewStakeholder({ ...newStakeholder, email: e.target.value })}
                className="input-field"
                placeholder="Email"
              />
              <input
                type="tel"
                value={newStakeholder.phone}
                onChange={(e) => setNewStakeholder({ ...newStakeholder, phone: e.target.value })}
                className="input-field"
                placeholder="Phone (optional)"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAdd}
                  className="btn btn-primary btn-sm"
                >
                  <Check className="h-4 w-4" />
                  Add
                </button>
                <button
                  onClick={() => {
                    setIsAdding(false);
                    setNewStakeholder({ name: '', title: '', email: '', phone: '' });
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