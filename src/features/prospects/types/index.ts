import type { Goal, Signal, Stage } from '@/lib/constants';

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  role: string;
}

export interface ProspectSignal {
  label: Signal;
  triggeredAt: string;
}

export interface Prospect {
  id: string;
  name: string;
  title: string;
  company: string;
  companyInitial: string;
  companyColor: string;
  avatarInitials: string;
  avatarColor: string;
  stage: Stage;
  goal: Goal;
  signal: ProspectSignal;
  recommendedAction: string;
  tab: 'hunt' | 'activate' | 'inbox';
}

export interface ProspectPage {
  data: Prospect[];
  total: number;
  page: number;
  limit: number;
}

export interface Counts {
  hunt: number;
  activate: number;
  inbox: number;
}
