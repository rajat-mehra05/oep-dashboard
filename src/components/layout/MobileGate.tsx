export function MobileGate() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-md text-lg font-bold text-white">
        N
      </div>
      <h1 className="text-text-primary text-xl font-semibold">Built for bigger screens</h1>
      <p className="text-text-muted max-w-xs text-sm">
        Please open NXL on a tablet or desktop (768px or wider) to use the Outbound Engine.
      </p>
    </div>
  );
}
