export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  image?: string;
}

export interface Stakeholder {
  id: string;
  name: string;
  title: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface CustomField {
  id: string;
  label: string;
  value: string;
}

export interface MissionGoal {
  id: string;
  title: string;
  description: string;
  customFields?: CustomField[];
}

export interface KPI {
  id: string;
  typeKey: string;
  currentValue: number;
  previousValue: number;
  period: 'Month' | 'Quarter' | 'Year';
  comparePrevious: boolean;
}

export interface Objective {
  id: string;
  name: string;
  targetDate: string;
  status: 'Not Started' | 'In Progress' | 'At Risk' | 'Completed';
  description: string;
  challenges: string;
  nextSteps: string;
  kpis: KPI[];
}

export interface ValueRealized {
  id: string;
  type: string;
  description: string;
  date: string;
  link?: string;
}

export interface Slide {
  id: string;
  type: 'intro' | 'team' | 'stakeholders' | 'mission' | 'goals' | 'objectives' | 'kpis' | 'value' | 'summary';
  title: string;
  order: number;
  visible: boolean;
  content?: any;
}

export interface Presentation {
  id: string;
  customerName: string;
  lastUpdated: string;
  slides: Slide[];
  settings: {
    theme: 'light' | 'dark';
    primaryColor: string;
    showPageNumbers: boolean;
  };
}

export interface AppState {
  // Company Info
  customerName: string;
  teamMembers: TeamMember[];
  stakeholders: Stakeholder[];
  
  // Mission & Goals
  missionSummary: string;
  missionGoals: MissionGoal[];
  
  // Objectives
  objectives: Objective[];
  pastObjectives: Objective[];
  
  // Value & Health
  valueRealized: ValueRealized[];
  planHealth: 'green' | 'yellow' | 'red';
  
  // Products
  products: string[];
  
  // Presentation
  presentation: Presentation;
  
  // UI State
  editModes: {
    [key: string]: boolean;
  };
  selectedItems: {
    [key: string]: Set<string>;
  };
}

export interface KPIType {
  key: string;
  label: string;
  unit: string;
  higherIsBetter: boolean;
}

export interface ExportOptions {
  format: 'pdf' | 'pptx' | 'json';
  includeNotes: boolean;
  quality: 'low' | 'medium' | 'high';
}