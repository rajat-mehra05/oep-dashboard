import { useProspects } from '@/features/prospects/hooks/useProspects';
import { ContactsAccountsToggle } from '@/components/dashboard/ContactsAccountsToggle';
import { SearchBar } from '@/components/dashboard/SearchBar';
import { FiltersPopover } from '@/components/dashboard/FiltersPopover';
import { UploadButton } from '@/components/dashboard/UploadButton';
import { BulkActionsBar } from '@/components/dashboard/BulkActionsBar';
import { HuntQueueTable } from '@/components/dashboard/HuntQueueTable';
import { Pagination } from '@/components/dashboard/Pagination';

export function HuntPanel() {
  const { data } = useProspects();
  const total = data?.total ?? 0;

  return (
    <div className="space-y-4">
      <ContactsAccountsToggle total={total} />
      <SearchBar />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-text-primary inline text-base font-semibold">Hunt Queue</h2>
          <span className="text-text-muted ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium">
            {total} pending
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FiltersPopover />
          <UploadButton />
        </div>
      </div>

      <BulkActionsBar />
      <HuntQueueTable />
      <Pagination />
    </div>
  );
}
