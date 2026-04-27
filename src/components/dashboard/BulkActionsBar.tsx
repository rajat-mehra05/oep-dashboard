import { useState } from 'react';
import { useProspectStore } from '@/features/prospects/store/useProspectStore';
import { Button } from '@/components/ui/button';
import { AlertDialog } from '@/components/ui/alert-dialog';

type BulkAction = 'Mark Reviewed' | 'Assign' | 'Export';
const ACTIONS: BulkAction[] = ['Mark Reviewed', 'Assign', 'Export'];

export function BulkActionsBar() {
  const selectedRowIds = useProspectStore((s) => s.selectedRowIds);
  const clearSelection = useProspectStore((s) => s.clearSelection);
  const [pendingAction, setPendingAction] = useState<BulkAction | null>(null);

  if (selectedRowIds.length === 0) return null;

  const count = selectedRowIds.length;

  return (
    <>
      <div className="border-border bg-primary-light sticky top-0 z-10 flex items-center justify-between rounded-lg border px-4 py-2.5 shadow-sm">
        <p className="text-primary text-sm font-semibold">{count} selected</p>
        <div className="flex items-center gap-2">
          {ACTIONS.map((action) => (
            <Button
              key={action}
              variant="outline"
              size="sm"
              onClick={() => setPendingAction(action)}
            >
              {action}
            </Button>
          ))}
          <button
            type="button"
            onClick={clearSelection}
            className="text-text-muted hover:text-text-primary focus-visible:ring-primary text-sm focus-visible:ring-2 focus-visible:outline-none"
          >
            Clear
          </button>
        </div>
      </div>

      <AlertDialog
        open={pendingAction !== null}
        onOpenChange={() => setPendingAction(null)}
        title={`${pendingAction ?? ''} triggered for ${count} prospect${count !== 1 ? 's' : ''}. (Stub.)`}
      />
    </>
  );
}
