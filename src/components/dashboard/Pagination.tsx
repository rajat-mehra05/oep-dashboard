import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useProspects } from '@/features/prospects/hooks/useProspects';
import { useProspectStore } from '@/features/prospects/store/useProspectStore';
import { PAGE_SIZE } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Pagination() {
  const { data } = useProspects();
  const currentPage = useProspectStore((s) => s.currentPage);
  const setCurrentPage = useProspectStore((s) => s.setCurrentPage);

  if (!data || data.total <= PAGE_SIZE) return null;

  const totalPages = Math.ceil(data.total / PAGE_SIZE);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1 py-4">
      <button
        type="button"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        aria-disabled={currentPage === 1}
        className="text-text-muted focus-visible:ring-primary rounded-md p-1.5 hover:bg-gray-100 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => setCurrentPage(page)}
          aria-label={`Page ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
          className={cn(
            'h-8 w-8 rounded-md text-sm font-medium transition-colors',
            'focus-visible:ring-primary focus-visible:ring-2 focus-visible:outline-none',
            page === currentPage ? 'bg-primary text-white' : 'text-text-muted hover:bg-gray-100',
          )}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        aria-disabled={currentPage === totalPages}
        className="text-text-muted focus-visible:ring-primary rounded-md p-1.5 hover:bg-gray-100 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
