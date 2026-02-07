export type TeamMember = {
  id: string;
  name: string;
  role: string;
  email?: string;
  avatarUrl?: string;
};

export type Stakeholder = {
  id: string;
  name: string;
  role: string;
  influence?: 'low' | 'medium' | 'high';
  email?: string;
  notes?: string;
  muted?: boolean;
};

export type Kpi = {
  id: string;
  name: string;
  target?: string;
  current?: string;
  status?: 'on_track' | 'at_risk' | 'off_track' | 'unknown';
};

export type Objective = {
  id: string;
  title: string;
  timeframe: 'short' | 'medium' | 'long';
  description?: string;
  kpis: Kpi[];
  status?: 'not_started' | 'in_progress' | 'completed' | 'paused';
};

export type ReviewHistoryItem = {
  id: string;
  dateIso: string;
  objectiveTitle: string;
  summary: string;
};

export type ValueRealizedItem = {
  id: string;
  title: string;
  description?: string;
  impact?: string; // e.g., hours saved, cost reduced, revenue impacted
};

export type AgendaSlideType =
  | 'team'
  | 'stakeholders'
  | 'mission'
  | 'goals'
  | 'objectives'
  | 'history'
  | 'value';

export type BrandColor = 'teal' | 'emerald' | 'blue' | 'indigo' | 'purple' | 'pink' | 'orange';

export type AgendaSlide = {
  id: string;
  type: AgendaSlideType;
  title?: string;
  hidden?: boolean;
  accent?: BrandColor; // optional per-slide accent override
};

export type SuccessPlanData = {
  accountName: string;
  customerName: string;
  missionStatement: string;
  longTermGoals: string[];
  team: TeamMember[];
  stakeholders: Stakeholder[];
  objectives: Objective[];
  history: ReviewHistoryItem[];
  values: ValueRealizedItem[];
  slides: AgendaSlide[];
  theme?: 'light' | 'dark';
  brandColor?: BrandColor;
};

export type ExportBundle = {
  version: 1;
  exportedAtIso: string;
  data: SuccessPlanData;
};

