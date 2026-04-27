import { Popover as BasePopover } from '@base-ui/react/popover';
import { cn } from '@/lib/utils';
import type { ComponentPropsWithoutRef } from 'react';

type PopoverRootProps = ComponentPropsWithoutRef<typeof BasePopover.Root>;
type PopoverTriggerProps = ComponentPropsWithoutRef<typeof BasePopover.Trigger>;
type PopoverContentProps = ComponentPropsWithoutRef<typeof BasePopover.Popup>;

export function PopoverRoot(props: PopoverRootProps) {
  return <BasePopover.Root {...props} />;
}

export function PopoverTrigger({ className, ...props }: PopoverTriggerProps) {
  return <BasePopover.Trigger className={cn('cursor-pointer', className)} {...props} />;
}

export function PopoverContent({ className, ...props }: PopoverContentProps) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner sideOffset={8}>
        <BasePopover.Popup
          className={cn(
            'border-border z-50 rounded-lg border bg-white p-3 shadow-lg',
            'outline-none',
            'data-[ending-style]:opacity-0 data-[starting-style]:opacity-0',
            'transition-opacity duration-150',
            className,
          )}
          {...props}
        />
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
}
