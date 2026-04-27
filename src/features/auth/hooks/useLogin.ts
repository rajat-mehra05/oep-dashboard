import { useMutation } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router';
import { apiFetch } from '@/lib/apiFetch';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import type { LoginRequest, LoginResponse } from '@/features/auth/types';

export function useLogin() {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? '/';

  return useMutation({
    mutationFn: (body: LoginRequest) =>
      apiFetch<LoginResponse>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      navigate(from, { replace: true });
    },
  });
}
