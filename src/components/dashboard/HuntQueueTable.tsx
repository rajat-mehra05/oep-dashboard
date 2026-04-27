import { useProspects } from '@/features/prospects/hooks/useProspects';
import { useProspectStore } from '@/features/prospects/store/useProspectStore';
import { ProspectRow } from '@/components/dashboard/ProspectRow';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

const COLUMNS = ['Prospect', 'Stage', 'Goal', 'Signal', 'Recommended Action', 'Actions'] as const;

export function HuntQueueTable() {
  const { data, isLoading, isError, refetch } = useProspects();
  const { selectedRowIds, toggleRowSelection, selectPage } = useProspectStore();

  const rows = data?.data ?? [];
  const rowIds = rows.map((r) => r.id);
  const allSelected = rowIds.length > 0 && rowIds.every((id) => selectedRowIds.includes(id));
  const someSelected = rowIds.some((id) => selectedRowIds.includes(id)) && !allSelected;

  if (isError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
        Failed to load prospects.{' '}
        <Button variant="ghost" size="sm" onClick={() => void refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto" aria-busy={isLoading}>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-50">
            <th className="w-10 px-4 py-3">
              <Checkbox
                checked={allSelected ? true : someSelected ? 'indeterminate' : false}
                onCheckedChange={() => selectPage(rowIds)}
                aria-label="Select all"
              />
            </th>
            {COLUMNS.map((col) => (
              <th
                key={col}
                className="text-text-muted px-4 py-3 text-xs font-semibold tracking-wider uppercase"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="px-4 py-4">
                    <Skeleton variant="circle" width="1rem" height="1rem" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <Skeleton variant="circle" width="2rem" height="2rem" />
                      <div className="space-y-1">
                        <Skeleton variant="text" width="8rem" height="0.75rem" />
                        <Skeleton variant="text" width="5rem" height="0.625rem" />
                      </div>
                    </div>
                  </td>
                  {[3, 4, 5, 6, 7].map((j) => (
                    <td key={j} className="px-4 py-4">
                      <Skeleton variant="text" width="5rem" height="0.75rem" />
                    </td>
                  ))}
                </tr>
              ))
            : rows.map((prospect) => (
                <ProspectRow
                  key={prospect.id}
                  prospect={prospect}
                  isSelected={selectedRowIds.includes(prospect.id)}
                  onToggle={() => toggleRowSelection(prospect.id)}
                />
              ))}
        </tbody>
      </table>
    </div>
  );
}
