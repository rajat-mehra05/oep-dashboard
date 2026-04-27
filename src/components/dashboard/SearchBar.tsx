import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useProspectStore } from '@/features/prospects/store/useProspectStore';
import { useDebouncedValue } from '@/lib/utils';
import { SEARCH_DEBOUNCE_MS } from '@/lib/constants';

export function SearchBar() {
  const searchQuery = useProspectStore((s) => s.searchQuery);
  const setSearchQuery = useProspectStore((s) => s.setSearchQuery);
  const [localValue, setLocalValue] = useState(searchQuery);
  const debouncedValue = useDebouncedValue(localValue, SEARCH_DEBOUNCE_MS);

  useEffect(() => {
    if (debouncedValue !== searchQuery) {
      setSearchQuery(debouncedValue);
    }
  }, [debouncedValue, searchQuery, setSearchQuery]);

  return (
    <Input
      leftIcon={<Search className="h-4 w-4" />}
      placeholder="Search by prospect, signal, account..."
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
    />
  );
}
