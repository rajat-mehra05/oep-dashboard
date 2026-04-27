import { cn } from '@/lib/utils';

export type AvatarSize = 24 | 32 | 48;

export interface AvatarProps {
  initials: string;
  color: string;
  size?: AvatarSize;
  showOnlineDot?: boolean;
  /** Accessible name exposed to screen readers. Falls back to initials when omitted. */
  name?: string;
  className?: string;
}

const sizeClasses: Record<AvatarSize, string> = {
  24: 'h-6 w-6 text-[10px]',
  32: 'h-8 w-8 text-xs',
  48: 'h-12 w-12 text-sm',
};

export function Avatar({
  initials,
  color,
  size = 32,
  showOnlineDot = false,
  name,
  className,
}: AvatarProps) {
  return (
    <div
      className={cn('relative inline-flex shrink-0', className)}
      role="img"
      aria-label={name ?? initials}
    >
      {/* backgroundColor is dynamic from data; CSS variable approach not viable without style */}
      <div
        className={cn(
          'flex items-center justify-center rounded-full font-semibold text-white',
          sizeClasses[size],
        )}
        style={{ backgroundColor: color }}
        aria-hidden="true"
      >
        {initials.slice(0, 2).toUpperCase()}
      </div>
      {showOnlineDot ? (
        <>
          <span
            className="absolute right-0 bottom-0 block h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400"
            aria-hidden="true"
          />
          <span className="sr-only">Online</span>
        </>
      ) : null}
    </div>
  );
}
