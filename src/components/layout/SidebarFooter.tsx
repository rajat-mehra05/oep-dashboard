import { useNavigate } from 'react-router';
import { useMe } from '@/features/auth/hooks/useMe';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { queryClient } from '@/lib/queryClient';
import { Avatar } from '@/components/ui/avatar';
import { PopoverRoot, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip } from '@/components/ui/tooltip';

interface SidebarFooterProps {
  isCollapsed: boolean;
}

export function SidebarFooter({ isCollapsed }: SidebarFooterProps) {
  const { data: user, isLoading } = useMe();
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    queryClient.clear();
    void navigate('/login', { replace: true });
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 px-3 py-2">
        <Skeleton variant="circle" width="2rem" height="2rem" />
        {!isCollapsed ? <Skeleton variant="text" height="0.75rem" width="60%" /> : null}
      </div>
    );
  }

  if (!user) return null;

  const avatarEl = (
    <Avatar initials={user.initials} color={user.avatarColor} size={32} name={user.name} />
  );

  return (
    <PopoverRoot>
      <PopoverTrigger
        render={
          <button
            type="button"
            className="focus-visible:ring-primary flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-gray-100 focus-visible:ring-2 focus-visible:outline-none"
            aria-label={`${user.name} — account menu`}
          >
            {isCollapsed ? <Tooltip content={user.name}>{avatarEl}</Tooltip> : avatarEl}
            {!isCollapsed ? (
              <span className="text-text-primary truncate text-sm font-medium">{user.name}</span>
            ) : null}
          </button>
        }
      />
      <PopoverContent>
        <Button variant="ghost" size="sm" className="w-full justify-start" onClick={handleLogout}>
          Log out
        </Button>
      </PopoverContent>
    </PopoverRoot>
  );
}
