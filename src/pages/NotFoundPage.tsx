import { useNavigate } from 'react-router';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { Button } from '@/components/ui/button';

export function NotFoundPage() {
  const navigate = useNavigate();
  const token = useAuthStore((s) => s.token);

  function goHome() {
    navigate(token ? '/' : '/login', { replace: true });
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4 text-center">
      <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-md text-lg font-bold text-white">
        N
      </div>
      <h1 className="text-text-primary text-2xl font-semibold">Page not found</h1>
      <p className="text-text-muted text-sm">
        The page you tried to reach does not exist or has moved.
      </p>
      <Button variant="primary" onClick={goHome}>
        Go home
      </Button>
    </div>
  );
}
