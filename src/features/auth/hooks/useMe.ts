import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/apiFetch';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { queryKeys } from '@/features/prospects/hooks/queryKeys';
import type { User } from '@/features/auth/types';

export function useMe() {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: queryKeys.me(),
    queryFn: () => apiFetch<User>('/api/me'),
    enabled: token !== null,
  });
}
