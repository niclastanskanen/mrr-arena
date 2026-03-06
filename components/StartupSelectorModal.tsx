import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StartupAvatar } from "@/components/StartupAvatar";
import type { Startup } from "@/lib/trustmrr";
import { formatMrr, formatGrowth } from "@/lib/trustmrr";

interface StartupSelectorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (startup: Startup) => void;
  slot: 1 | 2;
  initialStartups: Startup[];
}

export function StartupSelectorModal({
  open,
  onOpenChange,
  onSelect,
  slot,
  initialStartups,
}: StartupSelectorModalProps) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        slideFrom={slot === 2 ? "right" : "left"}
        slideOutTo={slot === 2 ? "left" : "right"}
        className="max-h-[80vh] overflow-hidden border-red-500/30 bg-zinc-950"
      >
        <DialogHeader>
          <DialogTitle className="text-yellow-400">
            Select Startup {slot}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="max-h-[400px] overflow-y-auto space-y-2">
            {initialStartups.length === 0 ? (
              <p className="py-8 text-center text-sm text-zinc-500">
                No startups found
              </p>
            ) : (
              initialStartups.map((s) => (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => onSelect(s)}
                  className="flex w-full items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 text-left transition-colors hover:border-red-500/50 hover:bg-zinc-800"
                >
                  <StartupAvatar startup={s} size="sm" className="shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-white">{s.name}</div>
                    <div className="text-xs text-zinc-500">
                      {formatMrr(s.mrr)} MRR · {formatGrowth(s.growth30d)}{" "}
                      growth
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
