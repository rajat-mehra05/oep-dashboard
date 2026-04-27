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
}

const TABS: TabConfig[] = [
  { value: 'hunt', label: 'Hunt', icon: <Zap className="h-4 w-4" />, badgeVariant: 'hunt' },
  {
    value: 'activate',
    label: 'Activate',
    icon: <Sparkles className="h-4 w-4" />,
    badgeVariant: 'activate',
  },
  { value: 'inbox', label: 'Inbox', icon: <Mail className="h-4 w-4" />, badgeVariant: 'inbox' },
];

interface TabBarProps {
  huntPanel: ReactNode;
}

export function TabBar({ huntPanel }: TabBarProps) {
  const { data: counts } = useCounts();
  const activeTab = useProspectStore((s) => s.activeTab);
  const setActiveTab = useProspectStore((s) => s.setActiveTab);

  return (
    <TabsRoot value={activeTab} onValueChange={(v) => setActiveTab(v as ProspectTab)}>
      <TabsList className="px-6">
        {TABS.map(({ value, label, icon, badgeVariant }) => (
          <TabsTrigger key={value} value={value}>
            {icon}
            {label}
            {counts !== undefined ? <Badge variant={badgeVariant}>{counts[value]}</Badge> : null}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsPanel value="hunt" className="px-6 pt-4">
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
