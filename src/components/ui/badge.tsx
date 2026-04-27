import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export type BadgeVariant = 'hunt' | 'activate' | 'inbox' | 'signal' | 'plain';

export interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  hunt: 'bg-hunt-badge text-hunt-badge-text',
  activate: 'bg-activate-badge text-activate-badge-text',
  inbox: 'bg-inbox-badge text-inbox-badge-text',
  signal: 'bg-signal-bg text-signal-text',
  plain: 'bg-gray-100 text-text-muted',
};

export function Badge({ variant = 'plain', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
