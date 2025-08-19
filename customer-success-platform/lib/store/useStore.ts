import { create } from 'zustand';
import { AppState, TeamMember, Stakeholder, MissionGoal, Objective, ValueRealized, Slide } from '@/lib/types';

const defaultSlides: Slide[] = [
  { id: '1', type: 'intro', title: 'Introduction', order: 1, visible: true },
  { id: '2', type: 'team', title: 'Account Team', order: 2, visible: true },
  { id: '3', type: 'stakeholders', title: 'Key Stakeholders', order: 3, visible: true },
  { id: '4', type: 'mission', title: 'Mission Summary', order: 4, visible: true },
  { id: '5', type: 'goals', title: 'Mission Goals', order: 5, visible: true },
  { id: '6', type: 'objectives', title: 'Current Objectives', order: 6, visible: true },
  { id: '7', type: 'kpis', title: 'Key Performance Indicators', order: 7, visible: true },
  { id: '8', type: 'value', title: 'Value Realized', order: 8, visible: true },
  { id: '9', type: 'summary', title: 'Summary & Next Steps', order: 9, visible: true },
];

interface StoreActions {
  // Customer & Team
  setCustomerName: (name: string) => void;
  addTeamMember: (member: TeamMember) => void;
  updateTeamMember: (id: string, member: Partial<TeamMember>) => void;
  removeTeamMember: (id: string) => void;
  
  // Stakeholders
  addStakeholder: (stakeholder: Stakeholder) => void;
  updateStakeholder: (id: string, stakeholder: Partial<Stakeholder>) => void;
  removeStakeholder: (id: string) => void;
  removeAllStakeholders: () => void;
  
  // Mission & Goals
  setMissionSummary: (summary: string) => void;
  addMissionGoal: (goal: MissionGoal) => void;
  updateMissionGoal: (id: string, goal: Partial<MissionGoal>) => void;
  removeMissionGoal: (id: string) => void;
  
  // Objectives
  addObjective: (objective: Objective) => void;
  updateObjective: (id: string, objective: Partial<Objective>) => void;
  removeObjective: (id: string) => void;
  moveObjectiveToPast: (id: string) => void;
  
  // Value Realized
  addValueRealized: (value: ValueRealized) => void;
  updateValueRealized: (id: string, value: Partial<ValueRealized>) => void;
  removeValueRealized: (id: string) => void;
  
  // Products
  setProducts: (products: string[]) => void;
  
  // Health Score
  setPlanHealth: (health: 'green' | 'yellow' | 'red') => void;
  
  // Slides
  reorderSlides: (slides: Slide[]) => void;
  toggleSlideVisibility: (id: string) => void;
  updateSlide: (id: string, slide: Partial<Slide>) => void;
  
  // Import/Export
  importData: (data: Partial<AppState>) => void;
  exportData: () => AppState;
  resetData: () => void;
}

export const useStore = create<AppState & StoreActions>()((set, get) => ({
      // Initial state
      customerName: '[Customer Name]',
      teamMembers: [
        { id: '1', name: 'Sarah Chen', role: 'Customer Success Manager', email: 'sarah.chen@receptive.ai' },
        { id: '2', name: 'Michael Rodriguez', role: 'Solution Engineer', email: 'michael.r@receptive.ai' },
        { id: '3', name: 'Jennifer Park', role: 'Account Executive', email: 'jennifer.p@receptive.ai' },
      ],
      stakeholders: [],
      missionSummary: '',
      missionGoals: [],
      objectives: [],
      pastObjectives: [],
      valueRealized: [],
      planHealth: 'green',
      products: ['Content Library', 'AI', 'Projects'],
      presentation: {
        id: '1',
        customerName: '[Customer Name]',
        lastUpdated: new Date().toISOString(),
        slides: defaultSlides,
        settings: {
          theme: 'light',
          primaryColor: '#14b8a6',
          showPageNumbers: true,
        },
      },
      editModes: {},
      selectedItems: {},

      // Actions
      setCustomerName: (name) => set({ customerName: name }),
      
      addTeamMember: (member) => 
        set((state) => ({ teamMembers: [...state.teamMembers, member] })),
      
      updateTeamMember: (id, updates) =>
        set((state) => ({
          teamMembers: state.teamMembers.map((m) => (m.id === id ? { ...m, ...updates } : m)),
        })),
      
      removeTeamMember: (id) =>
        set((state) => ({ teamMembers: state.teamMembers.filter((m) => m.id !== id) })),
      
      addStakeholder: (stakeholder) =>
        set((state) => ({ stakeholders: [...state.stakeholders, stakeholder] })),
      
      updateStakeholder: (id, updates) =>
        set((state) => ({
          stakeholders: state.stakeholders.map((s) => (s.id === id ? { ...s, ...updates } : s)),
        })),
      
      removeStakeholder: (id) =>
        set((state) => ({ stakeholders: state.stakeholders.filter((s) => s.id !== id) })),
      
      removeAllStakeholders: () => set({ stakeholders: [] }),
      
      setMissionSummary: (summary) => set({ missionSummary: summary }),
      
      addMissionGoal: (goal) =>
        set((state) => ({ missionGoals: [...state.missionGoals, goal] })),
      
      updateMissionGoal: (id, updates) =>
        set((state) => ({
          missionGoals: state.missionGoals.map((g) => (g.id === id ? { ...g, ...updates } : g)),
        })),
      
      removeMissionGoal: (id) =>
        set((state) => ({ missionGoals: state.missionGoals.filter((g) => g.id !== id) })),
      
      addObjective: (objective) =>
        set((state) => ({ objectives: [...state.objectives, objective] })),
      
      updateObjective: (id, updates) =>
        set((state) => ({
          objectives: state.objectives.map((o) => (o.id === id ? { ...o, ...updates } : o)),
        })),
      
      removeObjective: (id) =>
        set((state) => ({ objectives: state.objectives.filter((o) => o.id !== id) })),
      
      moveObjectiveToPast: (id) =>
        set((state) => {
          const objective = state.objectives.find((o) => o.id === id);
          if (!objective) return state;
          
          return {
            objectives: state.objectives.filter((o) => o.id !== id),
            pastObjectives: [...state.pastObjectives, { ...objective, status: 'Completed' as const }],
          };
        }),
      
      addValueRealized: (value) =>
        set((state) => ({ valueRealized: [...state.valueRealized, value] })),
      
      updateValueRealized: (id, updates) =>
        set((state) => ({
          valueRealized: state.valueRealized.map((v) => (v.id === id ? { ...v, ...updates } : v)),
        })),
      
      removeValueRealized: (id) =>
        set((state) => ({ valueRealized: state.valueRealized.filter((v) => v.id !== id) })),
      
      setProducts: (products) => set({ products }),
      
      setPlanHealth: (health) => set({ planHealth: health }),
      
      reorderSlides: (slides) =>
        set((state) => ({
          presentation: {
            ...state.presentation,
            slides: slides.map((slide, index) => ({ ...slide, order: index + 1 })),
          },
        })),
      
      toggleSlideVisibility: (id) =>
        set((state) => ({
          presentation: {
            ...state.presentation,
            slides: state.presentation.slides.map((s) =>
              s.id === id ? { ...s, visible: !s.visible } : s
            ),
          },
        })),
      
      updateSlide: (id, updates) =>
        set((state) => ({
          presentation: {
            ...state.presentation,
            slides: state.presentation.slides.map((s) =>
              s.id === id ? { ...s, ...updates } : s
            ),
          },
        })),
      
      importData: (data) => set((state) => ({ ...state, ...data })),
      
      exportData: () => get(),
      
      resetData: () =>
        set({
          customerName: '[Customer Name]',
          teamMembers: [],
          stakeholders: [],
          missionSummary: '',
          missionGoals: [],
          objectives: [],
          pastObjectives: [],
          valueRealized: [],
          planHealth: 'green',
          products: [],
          presentation: {
            id: '1',
            customerName: '[Customer Name]',
            lastUpdated: new Date().toISOString(),
            slides: defaultSlides,
            settings: {
              theme: 'light',
              primaryColor: '#14b8a6',
              showPageNumbers: true,
            },
          },
          editModes: {},
          selectedItems: {},
        }),
    }));