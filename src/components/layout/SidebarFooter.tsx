import { useState } from 'react';
import { useNavigate } from 'react-router';
import { LogOut, User } from 'lucide-react';
import { useMe } from '@/features/auth/hooks/useMe';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { queryClient } from '@/lib/queryClient';
import { Avatar } from '@/components/ui/avatar';
import { PopoverRoot, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { AlertDialog } from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip } from '@/components/ui/tooltip';

interface SidebarFooterProps {
  isCollapsed: boolean;
}

export function SidebarFooter({ isCollapsed }: SidebarFooterProps) {
  const { data: user, isLoading } = useMe();
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);

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
    <>
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
        <PopoverContent className="w-44 p-1">
          <button
            type="button"
            onClick={() => setProfileDialogOpen(true)}
            className="text-text-primary flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm hover:bg-gray-50 focus-visible:bg-gray-50 focus-visible:outline-none"
          >
            <User className="h-4 w-4" />
            My profile
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="text-text-primary flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm hover:bg-gray-50 focus-visible:bg-gray-50 focus-visible:outline-none"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </PopoverContent>
      </PopoverRoot>

      <AlertDialog
        open={profileDialogOpen}
        onOpenChange={setProfileDialogOpen}
        title="Profile coming soon"
        description="The profile screen is cosmetic in v1 and not wired up yet."
      />
    </>
  );
}
