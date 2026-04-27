import { useProspectStore } from '@/features/prospects/store/useProspectStore';
import { cn } from '@/lib/utils';

interface ContactsAccountsToggleProps {
  total: number;
}

export function ContactsAccountsToggle({ total }: ContactsAccountsToggleProps) {
  const activeView = useProspectStore((s) => s.activeView);
  const setActiveView = useProspectStore((s) => s.setActiveView);

  return (
    <div className="flex items-center gap-2">
      {(['contacts', 'accounts'] as const).map((view) => (
        <button
          key={view}
          type="button"
          onClick={() => setActiveView(view)}
          className={cn(
            'rounded-lg px-4 py-1.5 text-sm capitalize transition-colors',
            'focus-visible:ring-primary focus-visible:ring-2 focus-visible:outline-none',
            activeView === view
              ? 'border-border text-text-primary border font-semibold'
              : 'text-text-muted hover:text-text-primary',
          )}
          aria-pressed={activeView === view}
        >
          {view} ({total})
        </button>
      ))}
    </div>
  );
}
