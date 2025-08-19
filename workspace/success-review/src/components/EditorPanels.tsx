import { useSuccessPlanStore } from '../store'
import type { BrandColor } from '../types'

export function TeamEditor() {
  const team = useSuccessPlanStore(s => s.plan.team)
  const add = useSuccessPlanStore(s => s.addTeamMember)
  const update = useSuccessPlanStore(s => s.updateTeamMember)
  const remove = useSuccessPlanStore(s => s.removeTeamMember)
  return (
    <div className="space-y-2">
      {team.map(m => (
        <div key={m.id} className="grid grid-cols-3 gap-2 items-center">
          <input value={m.name} onChange={e => update(m.id, { name: e.target.value })} className="text-zone" placeholder="Name" />
          <input value={m.role} onChange={e => update(m.id, { role: e.target.value })} className="text-zone" placeholder="Role" />
          <div className="flex gap-2">
            <input value={m.email ?? ''} onChange={e => update(m.id, { email: e.target.value })} className="text-zone" placeholder="Email" />
            <button onClick={() => remove(m.id)} className="px-2 py-2 rounded bg-red-50 text-red-600">✕</button>
          </div>
        </div>
      ))}
      <button onClick={() => add({ name: 'New Member', role: 'CSM' })} className="px-3 py-2 rounded bg-slate-100">Add Member</button>
    </div>
  )
}

export function StakeholdersEditor() {
  const stakeholders = useSuccessPlanStore(s => s.plan.stakeholders)
  const add = useSuccessPlanStore(s => s.addStakeholder)
  const update = useSuccessPlanStore(s => s.updateStakeholder)
  const remove = useSuccessPlanStore(s => s.removeStakeholder)
  return (
    <div className="space-y-2">
      {stakeholders.map(s => (
        <div key={s.id} className="grid grid-cols-5 gap-2 items-center">
          <input value={s.name} onChange={e => update(s.id, { name: e.target.value })} className="text-zone" placeholder="Name" />
          <input value={s.role} onChange={e => update(s.id, { role: e.target.value })} className="text-zone" placeholder="Role" />
          <select value={s.influence ?? 'medium'} onChange={e => update(s.id, { influence: e.target.value as any })} className="text-zone">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input value={s.email ?? ''} onChange={e => update(s.id, { email: e.target.value })} className="text-zone" placeholder="Email" />
          <div className="flex gap-2 items-center">
            <label className="text-xs text-text-secondary flex items-center gap-1">
              <input type="checkbox" checked={!!s.muted} onChange={e => update(s.id, { muted: e.target.checked })} /> Hide
            </label>
            <button onClick={() => remove(s.id)} className="px-2 py-2 rounded bg-red-50 text-red-600">✕</button>
          </div>
        </div>
      ))}
      <button onClick={() => add({ name: 'New Stakeholder', role: 'VP' })} className="px-3 py-2 rounded bg-slate-100">Add Stakeholder</button>
    </div>
  )
}

export function ObjectivesEditor() {
  const objectives = useSuccessPlanStore(s => s.plan.objectives)
  const add = useSuccessPlanStore(s => s.addObjective)
  const update = useSuccessPlanStore(s => s.updateObjective)
  const remove = useSuccessPlanStore(s => s.removeObjective)
  return (
    <div className="space-y-3">
      {objectives.map(o => (
        <div key={o.id} className="border rounded-md p-3 space-y-2">
          <div className="grid grid-cols-5 gap-2 items-center">
            <input value={o.title} onChange={e => update(o.id, { title: e.target.value })} className="text-zone col-span-2" placeholder="Objective title" />
            <select value={o.timeframe} onChange={e => update(o.id, { timeframe: e.target.value as any })} className="text-zone">
              <option value="short">Short</option>
              <option value="medium">Medium</option>
              <option value="long">Long</option>
            </select>
            <input value={o.description ?? ''} onChange={e => update(o.id, { description: e.target.value })} className="text-zone col-span-2" placeholder="Description" />
          </div>
          <KpisEditor objectiveId={o.id} />
          <div className="flex justify-end">
            <button onClick={() => remove(o.id)} className="px-2 py-2 rounded bg-red-50 text-red-600">Remove Objective</button>
          </div>
        </div>
      ))}
      <button onClick={() => add({ title: 'New Objective', timeframe: 'short', kpis: [] })} className="px-3 py-2 rounded bg-slate-100">Add Objective</button>
    </div>
  )
}

function KpisEditor({ objectiveId }: { objectiveId: string }) {
  const plan = useSuccessPlanStore(s => s.plan)
  const updateObjective = useSuccessPlanStore(s => s.updateObjective)
  const objective = plan.objectives.find(o => o.id === objectiveId)!
  if (!objective) return null
  function addKpi() {
    updateObjective(objectiveId, { kpis: [...(objective?.kpis ?? []), { id: crypto.randomUUID(), name: 'KPI' }] })
  }
  function updateKpi(kpiId: string, updates: any) {
    const next = (objective?.kpis ?? []).map(k => (k.id === kpiId ? { ...k, ...updates } : k))
    updateObjective(objectiveId, { kpis: next })
  }
  function removeKpi(kpiId: string) {
    updateObjective(objectiveId, { kpis: (objective?.kpis ?? []).filter(k => k.id !== kpiId) })
  }
  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold">KPIs</div>
      {objective.kpis.map(k => (
        <div key={k.id} className="grid grid-cols-4 gap-2 items-center">
          <input value={k.name} onChange={e => updateKpi(k.id, { name: e.target.value })} className="text-zone" placeholder="KPI name" />
          <input value={k.target ?? ''} onChange={e => updateKpi(k.id, { target: e.target.value })} className="text-zone" placeholder="Target" />
          <input value={k.current ?? ''} onChange={e => updateKpi(k.id, { current: e.target.value })} className="text-zone" placeholder="Current" />
          <select value={k.status ?? 'unknown'} onChange={e => updateKpi(k.id, { status: e.target.value as any })} className="text-zone">
            <option value="on_track">On Track</option>
            <option value="at_risk">At Risk</option>
            <option value="off_track">Off Track</option>
            <option value="unknown">Unknown</option>
          </select>
          <button onClick={() => removeKpi(k.id)} className="px-2 py-2 rounded bg-red-50 text-red-600">✕</button>
        </div>
      ))}
      <button onClick={addKpi} className="px-3 py-2 rounded bg-slate-100">Add KPI</button>
    </div>
  )
}

export function HistoryEditor() {
  const history = useSuccessPlanStore(s => s.plan.history)
  const add = useSuccessPlanStore(s => s.addHistoryItem)
  const remove = useSuccessPlanStore(s => s.removeHistoryItem)
  return (
    <div className="space-y-2">
      {history.map(h => (
        <div key={h.id} className="grid grid-cols-3 gap-2 items-center">
          <input value={h.objectiveTitle} onChange={e => useSuccessPlanStore.getState().setPlan({ ...useSuccessPlanStore.getState().plan, history: history.map(x => x.id === h.id ? { ...h, objectiveTitle: e.target.value } : x) })} className="text-zone" placeholder="Objective" />
          <input value={h.dateIso} onChange={e => useSuccessPlanStore.getState().setPlan({ ...useSuccessPlanStore.getState().plan, history: history.map(x => x.id === h.id ? { ...h, dateIso: e.target.value } : x) })} className="text-zone" placeholder="Date ISO" />
          <input value={h.summary} onChange={e => useSuccessPlanStore.getState().setPlan({ ...useSuccessPlanStore.getState().plan, history: history.map(x => x.id === h.id ? { ...h, summary: e.target.value } : x) })} className="text-zone" placeholder="Summary" />
          <button onClick={() => remove(h.id)} className="px-2 py-2 rounded bg-red-50 text-red-600">✕</button>
        </div>
      ))}
      <button onClick={() => add({ dateIso: new Date().toISOString(), objectiveTitle: 'Completed Objective', summary: 'Result' })} className="px-3 py-2 rounded bg-slate-100">Add History</button>
    </div>
  )
}

export function ValueEditor() {
  const values = useSuccessPlanStore(s => s.plan.values)
  const add = useSuccessPlanStore(s => s.addValueItem)
  const remove = useSuccessPlanStore(s => s.removeValueItem)
  return (
    <div className="space-y-2">
      {values.map(v => (
        <div key={v.id} className="grid grid-cols-3 gap-2 items-center">
          <input value={v.title} onChange={e => useSuccessPlanStore.getState().setPlan({ ...useSuccessPlanStore.getState().plan, values: values.map(x => x.id === v.id ? { ...v, title: e.target.value } : x) })} className="text-zone" placeholder="Title" />
          <input value={v.description ?? ''} onChange={e => useSuccessPlanStore.getState().setPlan({ ...useSuccessPlanStore.getState().plan, values: values.map(x => x.id === v.id ? { ...v, description: e.target.value } : x) })} className="text-zone" placeholder="Description" />
          <input value={v.impact ?? ''} onChange={e => useSuccessPlanStore.getState().setPlan({ ...useSuccessPlanStore.getState().plan, values: values.map(x => x.id === v.id ? { ...v, impact: e.target.value } : x) })} className="text-zone" placeholder="Impact" />
          <button onClick={() => remove(v.id)} className="px-2 py-2 rounded bg-red-50 text-red-600">✕</button>
        </div>
      ))}
      <button onClick={() => add({ title: 'Value', description: 'Benefit', impact: 'Time saved' })} className="px-3 py-2 rounded bg-slate-100">Add Value</button>
    </div>
  )
}

export function BrandSettings() {
  const plan = useSuccessPlanStore(s => s.plan)
  const updateField = useSuccessPlanStore(s => s.updateField)
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <select className="text-zone" value={plan.brandColor ?? 'teal'} onChange={e => updateField('brandColor', e.target.value as BrandColor)}>
          {['teal','emerald','blue','indigo','purple','pink','orange'].map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select className="text-zone" value={plan.theme ?? 'light'} onChange={e => updateField('theme', e.target.value as any)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
    </div>
  )
}

