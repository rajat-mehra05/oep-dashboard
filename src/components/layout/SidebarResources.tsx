import { Link, useLocation } from 'react-router';
import {
  BarChart2,
  BookOpen,
  Calendar,
  FileText,
  Video,
  TrendingUp,
  ClipboardList,
  Award,
  Map,
  GitCommitVertical,
  Plug,
  Users,
  LifeBuoy,
  GraduationCap,
  Handshake,
  ShieldCheck,
} from 'lucide-react';
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
  { label: 'Templates', icon: <FileText className="h-4 w-4" />, to: ROUTES.TEMPLATES },
  { label: 'Webinars', icon: <Video className="h-4 w-4" />, to: ROUTES.WEBINARS },
  { label: 'Industry Reports', icon: <TrendingUp className="h-4 w-4" />, to: ROUTES.REPORTS },
  { label: 'Playbooks', icon: <ClipboardList className="h-4 w-4" />, to: ROUTES.PLAYBOOKS },
  { label: 'Case Studies', icon: <Award className="h-4 w-4" />, to: ROUTES.CASE_STUDIES },
  { label: 'Roadmap', icon: <Map className="h-4 w-4" />, to: ROUTES.ROADMAP },
  {
    label: 'Changelog',
    icon: <GitCommitVertical className="h-4 w-4" />,
    to: ROUTES.CHANGELOG,
  },
  { label: 'Integrations', icon: <Plug className="h-4 w-4" />, to: ROUTES.INTEGRATIONS },
  { label: 'Community', icon: <Users className="h-4 w-4" />, to: ROUTES.COMMUNITY },
  { label: 'Support', icon: <LifeBuoy className="h-4 w-4" />, to: ROUTES.SUPPORT },
  { label: 'Academy', icon: <GraduationCap className="h-4 w-4" />, to: ROUTES.ACADEMY },
  { label: 'Partners', icon: <Handshake className="h-4 w-4" />, to: ROUTES.PARTNERS },
  { label: 'Security', icon: <ShieldCheck className="h-4 w-4" />, to: ROUTES.SECURITY },
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
