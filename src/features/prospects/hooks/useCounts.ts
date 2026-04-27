import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/apiFetch';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { queryKeys } from '@/features/prospects/hooks/queryKeys';
import type { Counts } from '@/features/prospects/types';

export function useCounts() {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: queryKeys.counts(),
    queryFn: () => apiFetch<Counts>('/api/prospects/counts'),
    enabled: token !== null,
  });
}
