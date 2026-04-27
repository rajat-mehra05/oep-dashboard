import { useMe } from '@/features/auth/hooks/useMe';
import { useCounts } from '@/features/prospects/hooks/useCounts';
import { Avatar } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { getTimeOfDayGreeting } from '@/lib/utils';

const GREETING: Record<ReturnType<typeof getTimeOfDayGreeting>, string> = {
  morning: 'Good morning',
  afternoon: 'Good afternoon',
  evening: 'Good evening',
};

export function GreetingHeader() {
  const { data: user, isLoading: userLoading } = useMe();
  const { data: counts, isLoading: countsLoading } = useCounts();
  const isLoading = userLoading || countsLoading;

  if (isLoading || !user || !counts) {
    return (
      <div className="flex items-start gap-4 px-6 pt-6 pb-4">
        <Skeleton variant="circle" width="3rem" height="3rem" />
        <div className="flex-1 space-y-2 pt-1">
          <Skeleton variant="text" height="1.25rem" width="40%" />
          <Skeleton variant="text" height="0.875rem" width="70%" />
        </div>
      </div>
    );
  }

  const greeting = GREETING[getTimeOfDayGreeting()];

  return (
    <header className="flex items-start gap-4 px-6 pt-6 pb-4">
      <Avatar
        initials={user.initials}
        color={user.avatarColor}
        size={48}
        showOnlineDot
        name={user.name}
      />
      <div>
        <h1 className="text-text-primary text-xl font-bold">
          {greeting}, {user.name}!
        </h1>
        <p className="text-text-muted mt-0.5 text-sm">
          I have{' '}
          <strong className="text-text-primary font-semibold">{counts.hunt} prospects</strong> to
          hunt,{' '}
          <strong className="text-text-primary font-semibold">{counts.activate} contacts</strong> to
          nurture, and{' '}
          <strong className="text-text-primary font-semibold">{counts.inbox} replies</strong>{' '}
          waiting.
        </p>
      </div>
    </header>
  );
}
