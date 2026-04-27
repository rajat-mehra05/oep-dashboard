import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { apiFetch } from '@/lib/apiFetch';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import type { LoginResponse } from '@/features/auth/types';

export function useGuestLogin() {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => apiFetch<LoginResponse>('/api/auth/guest', { method: 'POST' }),
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      navigate('/', { replace: true });
    },
  });
}
