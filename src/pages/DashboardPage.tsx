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
      <Sidebar />
      <main className="flex flex-col overflow-y-auto bg-white">
        <GreetingHeader />
        <div className="flex-1 px-0 pb-8">
          <TabBar huntPanel={<HuntPanel />} />
        </div>
      </main>
    </AppShell>
  );
}
