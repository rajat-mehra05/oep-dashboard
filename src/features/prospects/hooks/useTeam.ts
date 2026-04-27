import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/apiFetch';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { queryKeys } from '@/features/prospects/hooks/queryKeys';
import type { TeamMember } from '@/features/prospects/types';

export function useTeam() {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: queryKeys.team(),
    queryFn: () => apiFetch<TeamMember[]>('/api/team'),
    enabled: token !== null,
  });
}
