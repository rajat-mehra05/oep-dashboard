import type { Stage, Signal } from '@/lib/constants';
import type { ProspectTab } from '@/features/prospects/types';

export interface ProspectsQueryParams {
  tab: ProspectTab;
  view: 'contacts' | 'accounts';
  search: string;
  page: number;
  limit: number;
  stages: Stage[];
  signals: Signal[];
}

export const queryKeys = {
  me: () => ['me'] as const,
  team: () => ['team'] as const,
  counts: () => ['counts'] as const,
  prospects: (params: ProspectsQueryParams) => ['prospects', params] as const,
} as const;
