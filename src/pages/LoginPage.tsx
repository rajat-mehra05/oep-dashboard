import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { LoginForm } from '@/components/auth/LoginForm';

export function LoginPage() {
  const token = useAuthStore((s) => s.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate('/', { replace: true });
  }, [token, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="border-border w-full max-w-sm rounded-xl border bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-2">
          <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold text-white">
            N
          </div>
          <span className="text-text-primary text-lg font-bold">NXL</span>
        </div>
        <h1 className="text-text-primary mb-6 text-xl font-semibold">Sign in to Outbound Engine</h1>
        <LoginForm />
      </div>
    </div>
  );
}
