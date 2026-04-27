import { useParams } from 'react-router';
import { ROUTES } from '@/lib/constants';

const TITLES: Record<string, string> = {
  [ROUTES.ANALYTICS]: 'Analytics',
  [ROUTES.KNOWLEDGE_BASE]: 'Knowledge Base',
  [ROUTES.MARKETING_EVENTS]: 'Marketing Events',
};

interface ComingSoonPageProps {
  title?: string;
}

export function ComingSoonPage({ title }: ComingSoonPageProps) {
  const { pathname } = useParams();
  const label = title ?? (pathname !== undefined ? TITLES[pathname] : undefined) ?? 'This page';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-md text-lg font-bold text-white">
        N
      </div>
      <h1 className="text-text-primary text-xl font-semibold">{label} is coming soon</h1>
      <p className="text-text-muted text-sm">Check back later for updates.</p>
    </div>
  );
}
