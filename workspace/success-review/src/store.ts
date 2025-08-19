import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuid } from 'uuid'
import type { SuccessPlanData, AgendaSlideType, AgendaSlide, TeamMember, Stakeholder, Objective, ReviewHistoryItem, ValueRealizedItem } from './types'

type SuccessPlanState = {
  plan: SuccessPlanData
  setPlan: (plan: SuccessPlanData) => void
  updateField: <K extends keyof SuccessPlanData>(key: K, value: SuccessPlanData[K]) => void
  reorderSlides: (fromIndex: number, toIndex: number) => void
  addSlide: (type: AgendaSlideType) => void
  removeSlide: (slideId: string) => void
  // entity helpers
  addTeamMember: (member: Omit<TeamMember, 'id'>) => void
  updateTeamMember: (id: string, updates: Partial<TeamMember>) => void
  removeTeamMember: (id: string) => void
  addStakeholder: (stakeholder: Omit<Stakeholder, 'id'>) => void
  updateStakeholder: (id: string, updates: Partial<Stakeholder>) => void
  removeStakeholder: (id: string) => void
  addObjective: (objective: Omit<Objective, 'id'>) => void
  updateObjective: (id: string, updates: Partial<Objective>) => void
  removeObjective: (id: string) => void
  addHistoryItem: (item: Omit<ReviewHistoryItem, 'id'>) => void
  removeHistoryItem: (id: string) => void
  addValueItem: (item: Omit<ValueRealizedItem, 'id'>) => void
  removeValueItem: (id: string) => void
  reset: () => void
}

const defaultSlides: AgendaSlide[] = [
  { id: uuid(), type: 'team', title: 'Account Team' },
  { id: uuid(), type: 'stakeholders', title: 'Customer Stakeholders' },
  { id: uuid(), type: 'mission', title: 'Mission Alignment' },
  { id: uuid(), type: 'goals', title: 'Long-term Goals' },
  { id: uuid(), type: 'objectives', title: 'Objectives & KPIs' },
  { id: uuid(), type: 'history', title: 'Previously Achieved' },
  { id: uuid(), type: 'value', title: 'Value Realized' },
]

const initialPlan: SuccessPlanData = {
  accountName: 'Receptive AI Company',
  customerName: 'Customer Company',
  missionStatement: 'Align the platform with business outcomes to maximize value realization.',
  longTermGoals: [
    'Operational excellence with AI-assisted workflows',
    'Data-driven decision making',
  ],
  team: [],
  stakeholders: [],
  objectives: [],
  history: [],
  values: [],
  slides: defaultSlides,
  theme: 'light',
}

export const useSuccessPlanStore = create<SuccessPlanState>()(
  persist(
    (set, get) => ({
      plan: initialPlan,
      setPlan: (plan) => set({ plan }),
      updateField: (key, value) => set({ plan: { ...get().plan, [key]: value } }),
      reorderSlides: (fromIndex, toIndex) => {
        const slides = [...get().plan.slides]
        const [moved] = slides.splice(fromIndex, 1)
        slides.splice(toIndex, 0, moved)
        set({ plan: { ...get().plan, slides } })
      },
      addSlide: (type) => set({ plan: { ...get().plan, slides: [...get().plan.slides, { id: uuid(), type }] } }),
      removeSlide: (slideId) => set({ plan: { ...get().plan, slides: get().plan.slides.filter(s => s.id !== slideId) } }),

      addTeamMember: (member) => set({ plan: { ...get().plan, team: [...get().plan.team, { id: uuid(), ...member }] } }),
      updateTeamMember: (id, updates) => set({ plan: { ...get().plan, team: get().plan.team.map(m => m.id === id ? { ...m, ...updates } : m) } }),
      removeTeamMember: (id) => set({ plan: { ...get().plan, team: get().plan.team.filter(m => m.id !== id) } }),

      addStakeholder: (stakeholder) => set({ plan: { ...get().plan, stakeholders: [...get().plan.stakeholders, { id: uuid(), ...stakeholder }] } }),
      updateStakeholder: (id, updates) => set({ plan: { ...get().plan, stakeholders: get().plan.stakeholders.map(s => s.id === id ? { ...s, ...updates } : s) } }),
      removeStakeholder: (id) => set({ plan: { ...get().plan, stakeholders: get().plan.stakeholders.filter(s => s.id !== id) } }),

      addObjective: (objective) => set({ plan: { ...get().plan, objectives: [...get().plan.objectives, { id: uuid(), ...objective }] } }),
      updateObjective: (id, updates) => set({ plan: { ...get().plan, objectives: get().plan.objectives.map(o => o.id === id ? { ...o, ...updates } : o) } }),
      removeObjective: (id) => set({ plan: { ...get().plan, objectives: get().plan.objectives.filter(o => o.id !== id) } }),

      addHistoryItem: (item) => set({ plan: { ...get().plan, history: [...get().plan.history, { id: uuid(), ...item }] } }),
      removeHistoryItem: (id) => set({ plan: { ...get().plan, history: get().plan.history.filter(h => h.id !== id) } }),

      addValueItem: (item) => set({ plan: { ...get().plan, values: [...get().plan.values, { id: uuid(), ...item }] } }),
      removeValueItem: (id) => set({ plan: { ...get().plan, values: get().plan.values.filter(v => v.id !== id) } }),

      reset: () => set({ plan: initialPlan }),
    }),
    {
      name: 'success-plan-storage',
      version: 1,
      partialize: (state) => ({ plan: state.plan }),
    }
  )
)

