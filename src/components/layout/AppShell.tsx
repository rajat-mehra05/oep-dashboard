import type { ReactNode } from 'react';
import { useUIStore } from '@/features/ui/store/useUIStore';
import { useMediaQuery } from '@/lib/utils';
import { BREAKPOINTS } from '@/lib/constants';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const isSidebarCollapsed = useUIStore((s) => s.isSidebarCollapsed);
  const isLaptop = useMediaQuery(`(max-width: ${BREAKPOINTS.LAPTOP - 1}px)`);

  const sidebarW = isSidebarCollapsed ? '4rem' : isLaptop ? '14rem' : '18rem';

  return (
    <div className="grid min-h-screen" style={{ gridTemplateColumns: `${sidebarW} 1fr` }}>
      {children}
    </div>
  );
}
