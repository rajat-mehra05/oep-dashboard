import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import { cn } from '@/lib/utils';
import type { ReactElement, ReactNode } from 'react';

interface TooltipProps {
  content: ReactNode;
  children: ReactElement;
  delayMs?: number;
}

export function Tooltip({ content, children, delayMs = 200 }: TooltipProps) {
  return (
    <BaseTooltip.Provider delay={delayMs}>
      <BaseTooltip.Root>
        <BaseTooltip.Trigger render={children} />
        <BaseTooltip.Portal>
          <BaseTooltip.Positioner sideOffset={6}>
            <BaseTooltip.Popup
              className={cn(
                'z-50 rounded-md bg-gray-900 px-2.5 py-1.5 text-xs text-white shadow-md',
                'data-[ending-style]:opacity-0 data-[starting-style]:opacity-0',
                'transition-opacity duration-100',
              )}
            >
              {content}
            </BaseTooltip.Popup>
          </BaseTooltip.Positioner>
        </BaseTooltip.Portal>
      </BaseTooltip.Root>
    </BaseTooltip.Provider>
  );
}
