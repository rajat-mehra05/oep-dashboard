import { Zap, Sparkles, Mail } from 'lucide-react';
import { TabsRoot, TabsList, TabsTrigger, TabsPanel } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useCounts } from '@/features/prospects/hooks/useCounts';
import { useProspectStore } from '@/features/prospects/store/useProspectStore';
import type { ProspectTab } from '@/features/prospects/types';
import type { ReactNode } from 'react';

interface TabConfig {
  value: ProspectTab;
  label: string;
  icon: ReactNode;
  badgeVariant: 'hunt' | 'activate' | 'inbox';
  selectedTab: string;
  selectedBadge: string;
}

const TABS: TabConfig[] = [
  {
    value: 'hunt',
    label: 'Hunt',
    icon: <Zap className="h-4 w-4" />,
    badgeVariant: 'hunt',
    selectedTab: 'rounded-2xl bg-hunt-badge text-text-primary hover:bg-hunt-badge',
    selectedBadge: 'bg-hunt-badge-strong text-hunt-badge-text',
  },
  {
    value: 'activate',
    label: 'Activate',
    icon: <Sparkles className="h-4 w-4" />,
    badgeVariant: 'activate',
    selectedTab: 'rounded-2xl bg-activate-badge text-text-primary hover:bg-activate-badge',
    selectedBadge: 'bg-activate-badge-strong text-activate-badge-text',
  },
  {
    value: 'inbox',
    label: 'Inbox',
    icon: <Mail className="h-4 w-4" />,
    badgeVariant: 'inbox',
    selectedTab: 'rounded-2xl bg-inbox-badge text-text-primary hover:bg-inbox-badge',
    selectedBadge: 'bg-inbox-badge-strong text-inbox-badge-text',
  },
];

interface TabBarProps {
  huntPanel: ReactNode;
}

function isProspectTab(value: unknown): value is ProspectTab {
  return value === 'hunt' || value === 'activate' || value === 'inbox';
}

export function TabBar({ huntPanel }: TabBarProps) {
  const { data: counts } = useCounts();
  const activeTab = useProspectStore((s) => s.activeTab);
  const setActiveTab = useProspectStore((s) => s.setActiveTab);

  return (
    <TabsRoot
      value={activeTab}
      onValueChange={(v) => {
        if (isProspectTab(v)) setActiveTab(v);
      }}
    >
      <div className="pl-16">
        <TabsList>
          {TABS.map(({ value, label, icon, badgeVariant, selectedTab, selectedBadge }) => {
            const isActive = activeTab === value;
            return (
              <TabsTrigger key={value} value={value} className={isActive ? selectedTab : undefined}>
                {icon}
                {label}
                {counts !== undefined ? (
                  <Badge variant={badgeVariant} className={isActive ? selectedBadge : undefined}>
                    {counts[value]}
                  </Badge>
                ) : null}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>

      <TabsPanel value="hunt" className="px-6 pl-16">
        {huntPanel}
      </TabsPanel>
      <TabsPanel value="activate" className="flex flex-col items-center justify-center gap-2 py-16">
        <h2 className="text-text-primary text-lg font-semibold">Activate</h2>
        <p className="text-text-muted text-sm">This is the Activate tab.</p>
      </TabsPanel>
      <TabsPanel value="inbox" className="flex flex-col items-center justify-center gap-2 py-16">
        <h2 className="text-text-primary text-lg font-semibold">Inbox</h2>
        <p className="text-text-muted text-sm">This is the Inbox tab.</p>
      </TabsPanel>
    </TabsRoot>
  );
}
