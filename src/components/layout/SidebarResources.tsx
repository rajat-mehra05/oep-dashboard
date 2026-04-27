import { Link, useLocation } from 'react-router';
import { BarChart2, BookOpen, Calendar } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';
import { ROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { ReactElement } from 'react';

interface NavItem {
  label: string;
  icon: ReactElement;
  to: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Analytics', icon: <BarChart2 className="h-4 w-4" />, to: ROUTES.ANALYTICS },
  { label: 'Knowledge Base', icon: <BookOpen className="h-4 w-4" />, to: ROUTES.KNOWLEDGE_BASE },
  {
    label: 'Marketing Events',
    icon: <Calendar className="h-4 w-4" />,
    to: ROUTES.MARKETING_EVENTS,
  },
];

interface SidebarResourcesProps {
  isCollapsed: boolean;
}

export function SidebarResources({ isCollapsed }: SidebarResourcesProps) {
  const { pathname } = useLocation();

  return (
    <ul className="space-y-0.5">
      {NAV_ITEMS.map(({ label, icon, to }) => {
        const isActive = pathname === to;
        const link = (
          <li key={label}>
            <Link
              to={to}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'text-text-muted flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                'hover:text-text-primary hover:bg-gray-100',
                'focus-visible:ring-primary focus-visible:ring-2 focus-visible:outline-none',
                isActive && 'bg-primary-light text-primary font-medium',
              )}
            >
              {icon}
              {!isCollapsed ? <span>{label}</span> : null}
            </Link>
          </li>
        );

        return isCollapsed ? (
          <Tooltip key={label} content={label}>
            {link as ReactElement}
          </Tooltip>
        ) : (
          link
        );
      })}
    </ul>
  );
}
