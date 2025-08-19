import React, { useMemo } from 'react'
import SlideCanvas from './SlideCanvas'
import { SlideShell } from './SlideShell'
import { useSuccessPlanStore } from '../store'
import type { AgendaSlide } from '../types'

function TeamSlide() {
  const plan = useSuccessPlanStore(s => s.plan)
  return (
    <SlideShell title="Account Team" subtitle={plan.accountName}>
      <div className="grid grid-cols-2 gap-6">
        {plan.team.length === 0 && (
          <div className="text-text-secondary">No team members added yet.</div>
        )}
        {plan.team.map(member => (
          <div key={member.id} className="bg-white rounded-lg border shadow-sm p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold">
              {member.name.split(' ').map(p => p[0]).slice(0,2).join('')}
            </div>
            <div>
              <div className="font-semibold text-ink">{member.name}</div>
              <div className="text-sm text-text-secondary">{member.role}</div>
              {member.email && (
                <div className="text-sm text-text-tertiary">{member.email}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </SlideShell>
  )
}

function StakeholdersSlide() {
  const plan = useSuccessPlanStore(s => s.plan)
  return (
    <SlideShell title="Customer Stakeholders" subtitle={plan.customerName}>
      <div className="grid grid-cols-2 gap-6">
        {plan.stakeholders.length === 0 && (
          <div className="text-text-secondary">No stakeholders added yet.</div>
        )}
        {plan.stakeholders.filter(s => !s.muted).map(s => (
          <div key={s.id} className="bg-white rounded-lg border shadow-sm p-4">
            <div className="font-semibold text-ink">{s.name}</div>
            <div className="text-sm text-text-secondary">{s.role}</div>
            <div className="text-xs mt-1 inline-flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">{s.influence ?? 'unknown'}</span>
            </div>
            {s.notes && (
              <div className="text-sm text-text-tertiary mt-2">{s.notes}</div>
            )}
          </div>
        ))}
      </div>
    </SlideShell>
  )
}

function MissionSlide() {
  const plan = useSuccessPlanStore(s => s.plan)
  return (
    <SlideShell title="Mission Alignment" subtitle={`${plan.customerName} x ${plan.accountName}`}>
      <div className="bg-white rounded-lg border shadow p-6">
        <div className="text-lg font-semibold text-ink mb-3">Our shared mission</div>
        <p className="text-text-secondary leading-7">{plan.missionStatement}</p>
      </div>
    </SlideShell>
  )
}

function GoalsSlide() {
  const plan = useSuccessPlanStore(s => s.plan)
  return (
    <SlideShell title="Long-term Goals" subtitle="Enduring outcomes">
      <ul className="space-y-3">
        {plan.longTermGoals.length === 0 && (
          <li className="text-text-secondary">No long-term goals added yet.</li>
        )}
        {plan.longTermGoals.map((g, idx) => (
          <li key={idx} className="bg-white rounded-lg border shadow-sm p-4">{g}</li>
        ))}
      </ul>
    </SlideShell>
  )
}

function ObjectivesSlide() {
  const plan = useSuccessPlanStore(s => s.plan)
  return (
    <SlideShell title="Objectives & KPIs" subtitle="Near-term objectives">
      <div className="space-y-4">
        {plan.objectives.length === 0 && (
          <div className="text-text-secondary">No objectives added yet.</div>
        )}
        {plan.objectives.map(obj => (
          <div key={obj.id} className="bg-white rounded-lg border shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-ink">{obj.title}</div>
                {obj.description && (
                  <div className="text-sm text-text-secondary">{obj.description}</div>
                )}
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 capitalize">{obj.timeframe}</span>
            </div>
            {obj.kpis?.length ? (
              <div className="grid grid-cols-3 gap-3 mt-3">
                {obj.kpis.map(kpi => (
                  <div key={kpi.id} className="bg-slate-50 border rounded p-3">
                    <div className="text-sm font-semibold text-ink">{kpi.name}</div>
                    <div className="text-xs text-text-secondary">Target: {kpi.target ?? '—'}</div>
                    <div className="text-xs text-text-secondary">Current: {kpi.current ?? '—'}</div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </SlideShell>
  )
}

function HistorySlide() {
  const plan = useSuccessPlanStore(s => s.plan)
  return (
    <SlideShell title="Previously Achieved" subtitle="Recent wins">
      <div className="space-y-3">
        {plan.history.length === 0 && (
          <div className="text-text-secondary">No previous objectives reviewed.</div>
        )}
        {plan.history.map(item => (
          <div key={item.id} className="bg-white rounded-lg border shadow-sm p-4">
            <div className="font-semibold text-ink">{item.objectiveTitle}</div>
            <div className="text-xs text-text-tertiary">{new Date(item.dateIso).toLocaleDateString()}</div>
            <div className="text-sm text-text-secondary mt-1">{item.summary}</div>
          </div>
        ))}
      </div>
    </SlideShell>
  )
}

function ValueSlide() {
  const plan = useSuccessPlanStore(s => s.plan)
  return (
    <SlideShell title="Value Realized" subtitle="Impact delivered">
      <div className="grid grid-cols-2 gap-4">
        {plan.values.length === 0 && (
          <div className="text-text-secondary">No value items yet.</div>
        )}
        {plan.values.map(v => (
          <div key={v.id} className="bg-white rounded-lg border shadow-sm p-4">
            <div className="font-semibold text-ink">{v.title}</div>
            {v.description && (
              <div className="text-sm text-text-secondary mt-1">{v.description}</div>
            )}
            {v.impact && (
              <div className="mt-2 text-xs inline-flex px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {v.impact}
              </div>
            )}
          </div>
        ))}
      </div>
    </SlideShell>
  )
}

export function renderSlide(slide: AgendaSlide): React.ReactNode {
  switch (slide.type) {
    case 'team':
      return <TeamSlide />
    case 'stakeholders':
      return <StakeholdersSlide />
    case 'mission':
      return <MissionSlide />
    case 'goals':
      return <GoalsSlide />
    case 'objectives':
      return <ObjectivesSlide />
    case 'history':
      return <HistorySlide />
    case 'value':
      return <ValueSlide />
    default:
      return null
  }
}

export function SlidesDeck() {
  const slides = useSuccessPlanStore(s => s.plan.slides)
  const canvases = useMemo(() => slides.map(() => React.createRef<HTMLDivElement>()), [slides])
  return (
    <div className="space-y-8">
      {slides.map((slide, idx) => (
        <SlideCanvas key={slide.id} ref={canvases[idx]}>
          {renderSlide(slide)}
        </SlideCanvas>
      ))}
    </div>
  )
}

