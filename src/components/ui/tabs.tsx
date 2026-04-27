import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import { cn } from '@/lib/utils';
import type { ComponentPropsWithoutRef } from 'react';

type TabsRootProps = ComponentPropsWithoutRef<typeof BaseTabs.Root>;
type TabsListProps = ComponentPropsWithoutRef<typeof BaseTabs.List>;
type TabsTriggerProps = ComponentPropsWithoutRef<typeof BaseTabs.Tab>;
type TabsPanelProps = ComponentPropsWithoutRef<typeof BaseTabs.Panel>;

export function TabsRoot({ className, ...props }: TabsRootProps) {
  return <BaseTabs.Root className={cn('flex flex-col', className)} {...props} />;
}

export function TabsList({ className, ...props }: TabsListProps) {
  return (
    <BaseTabs.List
      className={cn(
        'border-border inline-flex items-center gap-1 rounded-lg border bg-gray-100 p-1',
        className,
      )}
      {...props}
    />
  );
}

export function TabsTrigger({ className, ...props }: TabsTriggerProps) {
  return (
    <BaseTabs.Tab
      className={cn(
        'inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium',
        'text-text-muted transition-colors',
        'hover:text-text-primary hover:bg-gray-50',
        'focus-visible:ring-primary focus-visible:ring-2 focus-visible:outline-none',
        // Selected color is provided by the consumer via className for per-tab tinting
        className,
      )}
      {...props}
    />
  );
}

export function TabsPanel({ className, ...props }: TabsPanelProps) {
  return <BaseTabs.Panel className={cn('mt-4 outline-none', className)} {...props} />;
}
