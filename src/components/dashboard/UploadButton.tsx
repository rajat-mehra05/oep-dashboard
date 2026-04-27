import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AlertDialog } from '@/components/ui/alert-dialog';

export function UploadButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dialogMsg, setDialogMsg] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const sizeKb = Math.round(file.size / 1024);
    setDialogMsg(`Selected: ${file.name} (${sizeKb} KB). Upload is not wired up in v1.`);
    e.target.value = '';
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        className="sr-only"
        aria-label="Upload CSV file"
        onChange={handleFileChange}
        tabIndex={-1}
      />
      <Button
        variant="outline"
        size="sm"
        className="gap-1.5"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="h-3.5 w-3.5" />
        Upload
      </Button>
      <AlertDialog
        open={dialogMsg !== null}
        onOpenChange={(open) => {
          if (!open) setDialogMsg(null);
        }}
        title="File selected"
        description={dialogMsg ?? ''}
      />
    </>
  );
}
