import { createBrowserRouter } from 'react-router';
import { ROUTES } from '@/lib/constants';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { ComingSoonPage } from '@/pages/ComingSoonPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const router = createBrowserRouter([
  { path: ROUTES.LOGIN, element: <LoginPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      { path: ROUTES.HOME, element: <DashboardPage /> },
      { path: ROUTES.ANALYTICS, element: <ComingSoonPage title="Analytics" /> },
      { path: ROUTES.KNOWLEDGE_BASE, element: <ComingSoonPage title="Knowledge Base" /> },
      { path: ROUTES.MARKETING_EVENTS, element: <ComingSoonPage title="Marketing Events" /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);
