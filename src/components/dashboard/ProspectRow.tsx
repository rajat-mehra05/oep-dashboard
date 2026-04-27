import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertDialog } from '@/components/ui/alert-dialog';
import { formatRelativeTime } from '@/lib/utils';
import type { Prospect } from '@/features/prospects/types';

interface ProspectRowProps {
  prospect: Prospect;
  isSelected: boolean;
  onToggle: () => void;
}

export function ProspectRow({ prospect: p, isSelected, onToggle }: ProspectRowProps) {
  const [dialog, setDialog] = useState<'review' | 'menu' | null>(null);

  return (
    <>
      <tr className="border-b border-gray-100 hover:bg-gray-50">
        <td className="w-10 px-4 py-4">
          <Checkbox
            checked={isSelected}
            onCheckedChange={onToggle}
            aria-label={`Select ${p.name}`}
          />
        </td>

        <td className="px-4 py-4">
          <div className="flex items-start gap-3">
            <Avatar initials={p.avatarInitials} color={p.avatarColor} size={32} name={p.name} />
            <div className="min-w-0">
              <p className="text-text-primary font-semibold">{p.name}</p>
              <p className="text-text-muted text-xs">{p.title}</p>
              <div className="mt-0.5 flex items-center gap-1">
                {/* backgroundColor is dynamic from data */}
                <span
                  className="inline-flex h-4 w-4 items-center justify-center rounded text-[9px] font-bold text-white"
                  style={{ backgroundColor: p.companyColor }}
                  aria-hidden="true"
                >
                  {p.companyInitial}
                </span>
                <span className="text-text-muted text-xs">{p.company}</span>
              </div>
            </div>
          </div>
        </td>

        <td className="text-text-primary px-4 py-4 text-sm font-semibold">{p.stage}</td>
        <td className="text-text-muted px-4 py-4 text-sm">{p.goal}</td>

        <td className="px-4 py-4">
          <Badge variant="signal">{p.signal.label}</Badge>
          <p className="text-text-muted mt-0.5 text-xs">
            {formatRelativeTime(p.signal.triggeredAt)}
          </p>
        </td>

        <td className="text-text-primary px-4 py-4 text-sm">{p.recommendedAction}</td>

        <td className="px-4 py-4">
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" onClick={() => setDialog('review')}>
              Review
            </Button>
            <button
              type="button"
              aria-label={`Open row menu for ${p.name}`}
              onClick={() => setDialog('menu')}
              className="text-text-muted focus-visible:ring-primary rounded p-1 hover:bg-gray-100 focus-visible:ring-2 focus-visible:outline-none"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </td>
      </tr>

      <AlertDialog
        open={dialog === 'review'}
        onOpenChange={() => setDialog(null)}
        title={`You clicked Review for ${p.name}.`}
      />
      <AlertDialog
        open={dialog === 'menu'}
        onOpenChange={() => setDialog(null)}
        title={`You opened the row menu for ${p.name}.`}
      />
    </>
  );
}
