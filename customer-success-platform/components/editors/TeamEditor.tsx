'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store/useStore';
import { TeamMember } from '@/lib/types';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import { generateId } from '@/lib/utils';

export default function TeamEditor() {
  const { teamMembers, addTeamMember, updateTeamMember, removeTeamMember } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newMember, setNewMember] = useState<Partial<TeamMember>>({
    name: '',
    role: '',
    email: '',
  });

  const handleAdd = () => {
    if (newMember.name && newMember.role && newMember.email) {
      addTeamMember({
        id: generateId(),
        name: newMember.name,
        role: newMember.role,
        email: newMember.email,
      });
      setNewMember({ name: '', role: '', email: '' });
      setIsAdding(false);
    }
  };

  const handleUpdate = (id: string, updates: Partial<TeamMember>) => {
    updateTeamMember(id, updates);
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Receptive AI Team Members</h3>
        <button
          onClick={() => setIsAdding(true)}
          className="btn btn-primary btn-sm"
        >
          <Plus className="h-4 w-4" />
          Add Member
        </button>
      </div>

      <div className="grid gap-4">
        {teamMembers.map((member) => (
          <div key={member.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-all">
            {editingId === member.id ? (
              <div className="space-y-3">
                <input
                  type="text"
                  defaultValue={member.name}
                  className="input-field"
                  placeholder="Name"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUpdate(member.id, {
                        name: (e.target as HTMLInputElement).value,
                      });
                    }
                  }}
                />
                <input
                  type="text"
                  defaultValue={member.role}
                  className="input-field"
                  placeholder="Role"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUpdate(member.id, {
                        role: (e.target as HTMLInputElement).value,
                      });
                    }
                  }}
                />
                <input
                  type="email"
                  defaultValue={member.email}
                  className="input-field"
                  placeholder="Email"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUpdate(member.id, {
                        email: (e.target as HTMLInputElement).value,
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
                <div>
                  <h4 className="font-semibold text-gray-800">{member.name}</h4>
                  <p className="text-sm text-gray-600">{member.role}</p>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingId(member.id)}
                    className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => removeTeamMember(member.id)}
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
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                className="input-field"
                placeholder="Name"
                autoFocus
              />
              <input
                type="text"
                value={newMember.role}
                onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                className="input-field"
                placeholder="Role (e.g., Customer Success Manager)"
              />
              <input
                type="email"
                value={newMember.email}
                onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                className="input-field"
                placeholder="Email"
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
                    setNewMember({ name: '', role: '', email: '' });
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