import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/apiFetch';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { useProspectStore } from '@/features/prospects/store/useProspectStore';
import { PAGE_SIZE } from '@/lib/constants';
import { queryKeys } from '@/features/prospects/hooks/queryKeys';
import type { ProspectPage } from '@/features/prospects/types';

export function useProspects() {
  const token = useAuthStore((s) => s.token);
  const { activeTab, activeView, searchQuery, filters, currentPage } = useProspectStore();

  const params = {
    tab: activeTab,
    view: activeView,
    search: searchQuery,
    page: currentPage,
    limit: PAGE_SIZE,
    stages: filters.stages,
    signals: filters.signals,
  };

  return useQuery({
    queryKey: queryKeys.prospects(params),
    queryFn: () => {
      const url = new URL('/api/prospects', window.location.origin);
      url.searchParams.set('tab', params.tab);
      url.searchParams.set('view', params.view);
      url.searchParams.set('search', params.search);
      url.searchParams.set('page', String(params.page));
      url.searchParams.set('limit', String(params.limit));
      if (params.stages.length > 0) url.searchParams.set('stages', params.stages.join(','));
      if (params.signals.length > 0) url.searchParams.set('signals', params.signals.join(','));
      return apiFetch<ProspectPage>(url.pathname + url.search);
    },
    enabled: token !== null && activeTab === 'hunt',
  });
}
