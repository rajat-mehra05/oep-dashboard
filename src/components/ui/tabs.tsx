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
      className={cn('border-border flex items-center gap-1 border-b', className)}
      {...props}
    />
  );
}

export function TabsTrigger({ className, ...props }: TabsTriggerProps) {
  return (
    <BaseTabs.Tab
      className={cn(
        'inline-flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium',
        'text-text-muted transition-colors',
        'hover:text-text-primary hover:bg-gray-50',
        'focus-visible:ring-primary focus-visible:ring-2 focus-visible:outline-none',
        'data-[selected]:bg-primary-light data-[selected]:text-primary',
        className,
      )}
      {...props}
    />
  );
}

export function TabsPanel({ className, ...props }: TabsPanelProps) {
  return <BaseTabs.Panel className={cn('outline-none', className)} {...props} />;
}
