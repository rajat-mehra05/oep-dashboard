import { cn } from '@/lib/utils';

export type SkeletonVariant = 'text' | 'circle' | 'rect';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string;
  height?: string;
  className?: string;
}

export function Skeleton({ variant = 'rect', width, height, className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'skeleton',
        variant === 'circle' && 'rounded-full',
        variant === 'text' && 'rounded',
        variant === 'rect' && 'rounded-md',
        className,
      )}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}
