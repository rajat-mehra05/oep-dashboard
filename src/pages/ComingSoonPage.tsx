import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { Button } from '@/components/ui/button';

interface ComingSoonPageProps {
  title?: string;
}

export function ComingSoonPage({ title }: ComingSoonPageProps) {
  const navigate = useNavigate();
  const label = title ?? 'This page';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-md text-lg font-bold text-white">
        N
      </div>
      <h1 className="text-text-primary text-xl font-semibold">{label} is coming soon</h1>
      <p className="text-text-muted text-sm">Check back later for updates.</p>
      <Button variant="primary" onClick={() => void navigate(ROUTES.HOME)} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Button>
    </div>
  );
}
