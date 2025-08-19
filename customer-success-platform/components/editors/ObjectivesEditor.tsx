'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store/useStore';
import { Objective, KPI } from '@/lib/types';
import { Plus, Trash2, Edit2, Check, X, Target, TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import { generateId, PRODUCT_KPIS, calculateDelta } from '@/lib/utils';

export default function ObjectivesEditor() {
  const { objectives, pastObjectives, products, addObjective, updateObjective, removeObjective, moveObjectiveToPast } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showPast, setShowPast] = useState(false);
  const [newObjective, setNewObjective] = useState<Partial<Objective>>({
    name: '',
    description: '',
    targetDate: '',
    status: 'Not Started',
    challenges: '',
    nextSteps: '',
    kpis: [],
  });

  const handleAdd = () => {
    if (newObjective.name && newObjective.description) {
      addObjective({
        id: generateId(),
        name: newObjective.name,
        description: newObjective.description,
        targetDate: newObjective.targetDate || '',
        status: newObjective.status as Objective['status'],
        challenges: newObjective.challenges || '',
        nextSteps: newObjective.nextSteps || '',
        kpis: [],
      });
      setNewObjective({
        name: '',
        description: '',
        targetDate: '',
        status: 'Not Started',
        challenges: '',
        nextSteps: '',
        kpis: [],
      });
      setIsAdding(false);
    }
  };

  const getAvailableKPITypes = () => {
    const types: any[] = [];
    products.forEach(product => {
      if (PRODUCT_KPIS[product]) {
        types.push(...PRODUCT_KPIS[product]);
      }
    });
    return types;
  };

  const addKPI = (objectiveId: string) => {
    const objective = objectives.find(o => o.id === objectiveId);
    if (!objective) return;

    const availableTypes = getAvailableKPITypes();
    if (availableTypes.length === 0) {
      alert('Please select products first to see available KPIs');
      return;
    }

    const newKPI: KPI = {
      id: generateId(),
      typeKey: availableTypes[0].key,
      currentValue: 0,
      previousValue: 0,
      period: 'Quarter',
      comparePrevious: true,
    };

    updateObjective(objectiveId, {
      kpis: [...objective.kpis, newKPI],
    });
  };

  const updateKPI = (objectiveId: string, kpiId: string, updates: Partial<KPI>) => {
    const objective = objectives.find(o => o.id === objectiveId);
    if (!objective) return;

    const updatedKPIs = objective.kpis.map(kpi =>
      kpi.id === kpiId ? { ...kpi, ...updates } : kpi
    );

    updateObjective(objectiveId, { kpis: updatedKPIs });
  };

  const removeKPI = (objectiveId: string, kpiId: string) => {
    const objective = objectives.find(o => o.id === objectiveId);
    if (!objective) return;

    const updatedKPIs = objective.kpis.filter(kpi => kpi.id !== kpiId);
    updateObjective(objectiveId, { kpis: updatedKPIs });
  };

  const renderKPI = (kpi: KPI, objectiveId: string) => {
    const kpiType = getAvailableKPITypes().find(t => t.key === kpi.typeKey);
    if (!kpiType) return null;

    const delta = calculateDelta(kpi.currentValue, kpi.previousValue);
    const isPositive = kpiType.higherIsBetter ? delta >= 0 : delta <= 0;

    return (
      <div key={kpi.id} className="bg-gray-50 rounded-lg p-3 space-y-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700">{kpiType.label}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-gray-900">{kpi.currentValue}</span>
              <span className="text-sm text-gray-500">{kpiType.unit}</span>
              {kpi.comparePrevious && kpi.previousValue !== 0 && (
                <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {delta > 0 && '+'}{delta.toFixed(1)}%
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => removeKPI(objectiveId, kpi.id)}
            className="p-1 text-gray-400 hover:text-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          <select
            value={kpi.typeKey}
            onChange={(e) => updateKPI(objectiveId, kpi.id, { typeKey: e.target.value })}
            className="input-field text-xs"
          >
            {getAvailableKPITypes().map(type => (
              <option key={type.key} value={type.key}>{type.label}</option>
            ))}
          </select>
          <input
            type="number"
            value={kpi.currentValue}
            onChange={(e) => updateKPI(objectiveId, kpi.id, { currentValue: parseFloat(e.target.value) || 0 })}
            className="input-field text-xs"
            placeholder="Current"
          />
          <input
            type="number"
            value={kpi.previousValue}
            onChange={(e) => updateKPI(objectiveId, kpi.id, { previousValue: parseFloat(e.target.value) || 0 })}
            className="input-field text-xs"
            placeholder="Previous"
          />
        </div>
      </div>
    );
  };

  const renderObjective = (objective: Objective, isPast: boolean = false) => {
    const statusColors = {
      'Not Started': 'bg-gray-100 text-gray-700',
      'In Progress': 'bg-blue-100 text-blue-700',
      'At Risk': 'bg-yellow-100 text-yellow-700',
      'Completed': 'bg-green-100 text-green-700',
    };

    return (
      <div key={objective.id} className="card p-4">
        {editingId === objective.id ? (
          <div className="space-y-3">
            <input
              type="text"
              defaultValue={objective.name}
              className="input-field font-semibold"
              placeholder="Objective Name"
              onBlur={(e) => updateObjective(objective.id, { name: e.target.value })}
            />
            <textarea
              defaultValue={objective.description}
              className="textarea-field"
              placeholder="Description"
              rows={2}
              onBlur={(e) => updateObjective(objective.id, { description: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-600">Target Date</label>
                <input
                  type="date"
                  defaultValue={objective.targetDate}
                  className="input-field"
                  onBlur={(e) => updateObjective(objective.id, { targetDate: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600">Status</label>
                <select
                  defaultValue={objective.status}
                  className="input-field"
                  onChange={(e) => updateObjective(objective.id, { status: e.target.value as Objective['status'] })}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="At Risk">At Risk</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            <textarea
              defaultValue={objective.challenges}
              className="textarea-field"
              placeholder="Challenges"
              rows={2}
              onBlur={(e) => updateObjective(objective.id, { challenges: e.target.value })}
            />
            <textarea
              defaultValue={objective.nextSteps}
              className="textarea-field"
              placeholder="Next Steps"
              rows={2}
              onBlur={(e) => updateObjective(objective.id, { nextSteps: e.target.value })}
            />
            
            {/* KPIs */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h5 className="text-sm font-medium text-gray-700">Key Performance Indicators</h5>
                <button
                  onClick={() => addKPI(objective.id)}
                  className="text-xs text-teal-600 hover:text-teal-700 font-medium"
                >
                  + Add KPI
                </button>
              </div>
              {objective.kpis.map(kpi => renderKPI(kpi, objective.id))}
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
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{objective.name}</h4>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`status-pill text-xs ${statusColors[objective.status]}`}>
                    {objective.status}
                  </span>
                  {objective.targetDate && (
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(objective.targetDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingId(objective.id)}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                {!isPast && objective.status === 'Completed' && (
                  <button
                    onClick={() => moveObjectiveToPast(objective.id)}
                    className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded"
                    title="Move to past objectives"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={() => removeObjective(objective.id)}
                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">{objective.description}</p>
            
            {objective.kpis.length > 0 && (
              <div className="mb-3">
                <h5 className="text-xs font-medium text-gray-700 mb-2">KPIs</h5>
                <div className="grid grid-cols-2 gap-2">
                  {objective.kpis.map(kpi => {
                    const kpiType = getAvailableKPITypes().find(t => t.key === kpi.typeKey);
                    if (!kpiType) return null;
                    
                    const delta = calculateDelta(kpi.currentValue, kpi.previousValue);
                    const isPositive = kpiType.higherIsBetter ? delta >= 0 : delta <= 0;
                    
                    return (
                      <div key={kpi.id} className="bg-gray-50 rounded p-2">
                        <p className="text-xs text-gray-600">{kpiType.label}</p>
                        <p className="text-lg font-semibold">
                          {kpi.currentValue}{kpiType.unit}
                          {kpi.comparePrevious && kpi.previousValue !== 0 && (
                            <span className={`text-xs ml-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                              {delta > 0 && '+'}{delta.toFixed(1)}%
                            </span>
                          )}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4 text-xs">
              {objective.challenges && (
                <div>
                  <p className="font-medium text-gray-600 flex items-center gap-1 mb-1">
                    <AlertCircle className="h-3 w-3" />
                    Challenges
                  </p>
                  <p className="text-gray-700">{objective.challenges}</p>
                </div>
              )}
              {objective.nextSteps && (
                <div>
                  <p className="font-medium text-gray-600 flex items-center gap-1 mb-1">
                    <TrendingUp className="h-3 w-3" />
                    Next Steps
                  </p>
                  <p className="text-gray-700">{objective.nextSteps}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {showPast ? 'Past Objectives' : 'Current Objectives'}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setShowPast(!showPast)}
            className="btn btn-ghost btn-sm"
          >
            {showPast ? 'Show Current' : 'Show Past'}
          </button>
          {!showPast && (
            <button
              onClick={() => setIsAdding(true)}
              className="btn btn-primary btn-sm"
            >
              <Plus className="h-4 w-4" />
              Add Objective
            </button>
          )}
        </div>
      </div>

      {!showPast ? (
        <>
          {objectives.length === 0 && !isAdding && (
            <div className="text-center py-8 text-gray-500">
              <Target className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">No active objectives</p>
              <p className="text-xs mt-1">Click "Add Objective" to create one</p>
            </div>
          )}

          <div className="grid gap-4">
            {objectives.map(obj => renderObjective(obj))}

            {isAdding && (
              <div className="border-2 border-dashed border-teal-300 rounded-lg p-4 bg-teal-50">
                <div className="space-y-3">
                  <input
                    type="text"
                    value={newObjective.name}
                    onChange={(e) => setNewObjective({ ...newObjective, name: e.target.value })}
                    className="input-field font-semibold"
                    placeholder="Objective Name"
                    autoFocus
                  />
                  <textarea
                    value={newObjective.description}
                    onChange={(e) => setNewObjective({ ...newObjective, description: e.target.value })}
                    className="textarea-field"
                    placeholder="Description"
                    rows={2}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      value={newObjective.targetDate}
                      onChange={(e) => setNewObjective({ ...newObjective, targetDate: e.target.value })}
                      className="input-field"
                    />
                    <select
                      value={newObjective.status}
                      onChange={(e) => setNewObjective({ ...newObjective, status: e.target.value as Objective['status'] })}
                      className="input-field"
                    >
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="At Risk">At Risk</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleAdd}
                      className="btn btn-primary btn-sm"
                    >
                      <Check className="h-4 w-4" />
                      Add Objective
                    </button>
                    <button
                      onClick={() => {
                        setIsAdding(false);
                        setNewObjective({
                          name: '',
                          description: '',
                          targetDate: '',
                          status: 'Not Started',
                          challenges: '',
                          nextSteps: '',
                          kpis: [],
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
        </>
      ) : (
        <>
          {pastObjectives.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Check className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">No completed objectives yet</p>
              <p className="text-xs mt-1">Completed objectives will appear here</p>
            </div>
          )}

          <div className="grid gap-4">
            {pastObjectives.map(obj => renderObjective(obj, true))}
          </div>
        </>
      )}
    </div>
  );
}