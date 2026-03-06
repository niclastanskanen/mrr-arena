export default function BattleLoading() {
  return (
    <div className="min-h-screen">
      <div className="relative mx-auto max-w-6xl px-4 py-8">
        <div className="space-y-8 animate-pulse">
          <div className="text-center">
            <div className="mx-auto h-10 w-48 rounded bg-zinc-800" />
            <div className="mx-auto mt-2 h-4 w-64 rounded bg-zinc-800/60" />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex flex-col items-center gap-4">
              <div className="h-24 w-24 rounded-2xl bg-zinc-800" />
              <div className="h-6 w-32 rounded bg-zinc-800" />
              <div className="h-4 w-full max-w-xs rounded bg-zinc-800/60" />
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="h-24 w-24 rounded-2xl bg-zinc-800" />
              <div className="h-6 w-32 rounded bg-zinc-800" />
              <div className="h-4 w-full max-w-xs rounded bg-zinc-800/60" />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="h-12 w-40 rounded-lg bg-zinc-800" />
          </div>
        </div>
      </div>
    </div>
  );
}
