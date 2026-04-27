import type { ReactElement } from 'react';
import { useTeam } from '@/features/prospects/hooks/useTeam';
import { useProspectStore } from '@/features/prospects/store/useProspectStore';
import { Avatar } from '@/components/ui/avatar';
import { Tooltip } from '@/components/ui/tooltip';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface SidebarTeamProps {
  isCollapsed: boolean;
}

export function SidebarTeam({ isCollapsed }: SidebarTeamProps) {
  const { data: team, isLoading, isError, refetch } = useTeam();
  const activeTeamMemberId = useProspectStore((s) => s.activeTeamMemberId);
  const setActiveTeamMember = useProspectStore((s) => s.setActiveTeamMember);

  if (isLoading) {
    return (
      <div className="space-y-2 px-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3 py-1">
            <Skeleton variant="circle" width="2rem" height="2rem" />
            {!isCollapsed ? (
              <div className="flex-1 space-y-1">
                <Skeleton variant="text" height="0.75rem" width="60%" />
                <Skeleton variant="text" height="0.625rem" width="40%" />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="px-3 text-xs text-red-500">
        Failed to load team.{' '}
        <button type="button" onClick={() => void refetch()} className="underline">
          Retry
        </button>
      </div>
    );
  }

  return (
    <ul className="space-y-0.5">
      {team?.map((member) => {
        const isActive = member.id === activeTeamMemberId;
        const item = (
          <li key={member.id}>
            <button
              type="button"
              onClick={() => setActiveTeamMember(member.id)}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg bg-white px-3 py-2 text-left transition-colors',
                'focus-visible:ring-primary hover:bg-gray-100 focus-visible:ring-2 focus-visible:outline-none',
                isActive && 'bg-gray-100 hover:bg-gray-100',
              )}
            >
              <Avatar
                initials={member.initials}
                color={member.avatarColor}
                size={32}
                name={member.name}
              />
              {!isCollapsed ? (
                <div className="min-w-0 flex-1">
                  <p className="text-text-primary truncate text-sm font-medium">{member.name}</p>
                  <p className="text-text-muted truncate text-xs">{member.role}</p>
                </div>
              ) : null}
            </button>
          </li>
        );

        return isCollapsed ? (
          <Tooltip key={member.id} content={member.name}>
            {item as ReactElement}
          </Tooltip>
        ) : (
          item
        );
      })}
    </ul>
  );
}
