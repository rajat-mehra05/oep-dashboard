import { Link, useLocation } from 'react-router';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { useUIStore } from '@/features/ui/store/useUIStore';
import { SidebarTeam } from '@/components/layout/SidebarTeam';
import { SidebarResources } from '@/components/layout/SidebarResources';
import { SidebarFooter } from '@/components/layout/SidebarFooter';
import { Tooltip } from '@/components/ui/tooltip';
import { ROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const isSidebarCollapsed = useUIStore((s) => s.isSidebarCollapsed);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const { pathname } = useLocation();
  const isHome = pathname === ROUTES.HOME;

  const homeLink = (
    <Link
      to={ROUTES.HOME}
      aria-current={isHome ? 'page' : undefined}
      className={cn(
        'text-text-muted flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
        'hover:text-text-primary hover:bg-gray-100',
        'focus-visible:ring-primary focus-visible:ring-2 focus-visible:outline-none',
        isHome && 'bg-primary-light text-primary font-medium',
      )}
    >
      <Home className="h-4 w-4 shrink-0" />
      {!isSidebarCollapsed ? <span>Home</span> : null}
    </Link>
  );

  return (
    <nav
      className="bg-sidebar-bg flex flex-col transition-[width] duration-200 ease-out"
      aria-label="Main navigation"
    >
      {/* Header: NXL badge + collapse toggle */}
      <div className="flex items-center justify-between px-3 py-4">
        {!isSidebarCollapsed ? (
          <div className="flex items-center gap-2">
            <div className="bg-primary flex h-7 w-7 items-center justify-center rounded-md text-sm font-bold text-white">
              N
            </div>
            <span className="text-text-primary font-bold">NXL</span>
          </div>
        ) : (
          <div className="bg-primary flex h-7 w-7 items-center justify-center rounded-md text-sm font-bold text-white">
            N
          </div>
        )}
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!isSidebarCollapsed}
          className="text-text-muted focus-visible:ring-primary rounded-md p-1 hover:bg-gray-200 focus-visible:ring-2 focus-visible:outline-none"
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Home link */}
      <div className="px-2">
        {isSidebarCollapsed ? <Tooltip content="Home">{homeLink}</Tooltip> : homeLink}
      </div>

      {/* Team section */}
      <div className="mt-4 flex-1 overflow-y-auto px-2">
        {!isSidebarCollapsed ? (
          <p className="text-text-muted mb-2 px-3 text-[10px] font-semibold tracking-widest uppercase">
            AI RevenueOS GTM Team
          </p>
        ) : null}
        <SidebarTeam isCollapsed={isSidebarCollapsed} />

        {/* Resources section */}
        <div className="mt-6">
          {!isSidebarCollapsed ? (
            <p className="text-text-muted mb-2 px-3 text-[10px] font-semibold tracking-widest uppercase">
              Resources
            </p>
          ) : null}
          <SidebarResources isCollapsed={isSidebarCollapsed} />
        </div>
      </div>

      {/* Footer: user + logout */}
      <div className="border-border border-t px-2 py-3">
        <SidebarFooter isCollapsed={isSidebarCollapsed} />
      </div>
    </nav>
  );
}
