import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { TabsRoot, TabsList, TabsTrigger, TabsPanel } from '@/components/ui/tabs';
import { PopoverRoot, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Tooltip } from '@/components/ui/tooltip';
import { AlertDialog } from '@/components/ui/alert-dialog';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export function PrimitiveSandbox() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-8">
      <h1 className="text-text-primary text-2xl font-semibold">Phase 2: Primitive Sandbox</h1>

      <section className="space-y-2">
        <h2 className="text-text-muted text-sm font-medium tracking-wide uppercase">Buttons</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="outline" size="sm">
            Small
          </Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-text-muted text-sm font-medium tracking-wide uppercase">Input</h2>
        <Input
          leftIcon={<Search className="h-4 w-4" />}
          placeholder="Search by prospect, signal, account..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Input placeholder="With error" error="This field is required" />
      </section>

      <section className="space-y-2">
        <h2 className="text-text-muted text-sm font-medium tracking-wide uppercase">Checkbox</h2>
        <div className="flex items-center gap-4">
          <Checkbox checked={checked} onCheckedChange={setChecked} aria-label="Toggle item" />
          <Checkbox checked={true} aria-label="Checked" />
          <Checkbox checked="indeterminate" aria-label="Indeterminate" />
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-text-muted text-sm font-medium tracking-wide uppercase">Tabs</h2>
        <TabsRoot defaultValue="hunt">
          <TabsList>
            <TabsTrigger value="hunt">Hunt</TabsTrigger>
            <TabsTrigger value="activate">Activate</TabsTrigger>
            <TabsTrigger value="inbox">Inbox</TabsTrigger>
          </TabsList>
          <TabsPanel value="hunt" className="text-text-muted pt-4 text-sm">
            Hunt panel
          </TabsPanel>
          <TabsPanel value="activate" className="text-text-muted pt-4 text-sm">
            Activate panel
          </TabsPanel>
          <TabsPanel value="inbox" className="text-text-muted pt-4 text-sm">
            Inbox panel
          </TabsPanel>
        </TabsRoot>
      </section>

      <section className="space-y-2">
        <h2 className="text-text-muted text-sm font-medium tracking-wide uppercase">Overlays</h2>
        <div className="flex gap-3">
          <PopoverRoot>
            <PopoverTrigger render={<Button variant="outline">Open Popover</Button>} />
            <PopoverContent>
              <p className="text-text-primary text-sm">Popover content here.</p>
            </PopoverContent>
          </PopoverRoot>
          <Tooltip content="Tooltip text">
            <Button variant="outline">Hover me</Button>
          </Tooltip>
          <Button variant="outline" onClick={() => setDialogOpen(true)}>
            Open Dialog
          </Button>
        </div>
        <AlertDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title="Alert dialog"
          description="This is an informational alert dialog."
        />
      </section>

      <section className="space-y-2">
        <h2 className="text-text-muted text-sm font-medium tracking-wide uppercase">
          Avatar + Badge
        </h2>
        <div className="flex items-center gap-4">
          <Avatar initials="MC" color="#7C3AED" size={48} showOnlineDot />
          <Avatar initials="SA" color="#EC4899" size={32} />
          <Avatar initials="LE" color="#10B981" size={24} />
          <Badge variant="hunt">Hunt 12</Badge>
          <Badge variant="activate">Activate 8</Badge>
          <Badge variant="inbox">Inbox 4</Badge>
          <Badge variant="signal">Series B Funding</Badge>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-text-muted text-sm font-medium tracking-wide uppercase">Skeleton</h2>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Skeleton variant="circle" width="2rem" height="2rem" />
            <div className="flex-1 space-y-1">
              <Skeleton variant="text" height="0.875rem" width="40%" />
              <Skeleton variant="text" height="0.75rem" width="60%" />
            </div>
          </div>
          <Skeleton variant="rect" height="2.5rem" />
        </div>
      </section>
    </div>
  );
}
