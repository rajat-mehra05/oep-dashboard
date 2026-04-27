import { AppShell } from '@/components/layout/AppShell';
import { MobileGate } from '@/components/layout/MobileGate';
import { Sidebar } from '@/components/layout/Sidebar';
import { GreetingHeader } from '@/components/dashboard/GreetingHeader';
import { TabBar } from '@/components/dashboard/TabBar';
import { HuntPanel } from '@/components/dashboard/HuntPanel';
import { useMediaQuery } from '@/lib/utils';
import { BREAKPOINTS } from '@/lib/constants';

export function DashboardPage() {
  const isMobile = !useMediaQuery(`(min-width: ${BREAKPOINTS.TABLET}px)`);

  if (isMobile) return <MobileGate />;

  return (
    <AppShell>
      <a
        href="#main-content"
        className="bg-primary focus-visible:ring-primary sr-only z-50 rounded-md px-3 py-2 text-sm font-medium text-white focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus-visible:ring-2 focus-visible:outline-none"
      >
        Skip to main content
      </a>
      <Sidebar />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex flex-col overflow-y-auto bg-white [scrollbar-gutter:stable] focus:outline-none"
      >
        <GreetingHeader />
        <div className="flex-1 px-0 pb-8">
          <TabBar huntPanel={<HuntPanel />} />
        </div>
      </main>
    </AppShell>
  );
}
