/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter } from 'react-router';
import { ROUTES } from '@/lib/constants';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';

const LoginPage = lazy(() => import('@/pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const DashboardPage = lazy(() =>
  import('@/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })),
);
const ComingSoonPage = lazy(() =>
  import('@/pages/ComingSoonPage').then((m) => ({ default: m.ComingSoonPage })),
);
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
);

function withSuspense(node: ReactNode): ReactNode {
  return <Suspense fallback={null}>{node}</Suspense>;
}

const COMING_SOON_ROUTES: Array<readonly [string, string]> = [
  [ROUTES.ANALYTICS, 'Analytics'],
  [ROUTES.KNOWLEDGE_BASE, 'Knowledge Base'],
  [ROUTES.MARKETING_EVENTS, 'Marketing Events'],
  [ROUTES.TEMPLATES, 'Templates'],
  [ROUTES.WEBINARS, 'Webinars'],
  [ROUTES.REPORTS, 'Industry Reports'],
  [ROUTES.PLAYBOOKS, 'Playbooks'],
  [ROUTES.CASE_STUDIES, 'Case Studies'],
  [ROUTES.ROADMAP, 'Roadmap'],
  [ROUTES.CHANGELOG, 'Changelog'],
  [ROUTES.INTEGRATIONS, 'Integrations'],
  [ROUTES.COMMUNITY, 'Community'],
  [ROUTES.SUPPORT, 'Support'],
  [ROUTES.ACADEMY, 'Academy'],
  [ROUTES.PARTNERS, 'Partners'],
  [ROUTES.SECURITY, 'Security'],
];

export const router = createBrowserRouter([
  { path: ROUTES.LOGIN, element: withSuspense(<LoginPage />) },
  {
    element: <ProtectedRoute />,
    children: [
      { path: ROUTES.HOME, element: withSuspense(<DashboardPage />) },
      ...COMING_SOON_ROUTES.map(([path, title]) => ({
        path,
        element: withSuspense(<ComingSoonPage title={title} />),
      })),
    ],
  },
  { path: '*', element: withSuspense(<NotFoundPage />) },
]);
