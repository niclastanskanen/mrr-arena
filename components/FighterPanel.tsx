import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { HPBar } from "./HPBar";
import { StartupAvatar } from "./StartupAvatar";
import type { Startup } from "@/lib/trustmrr";
import { formatGrowth } from "@/lib/trustmrr";

interface FighterPanelProps {
  startup: Startup;
  hp: number;
  maxHp: number;
}

export function FighterPanel({ startup, hp, maxHp }: FighterPanelProps) {
  return (
    <div className="relative">
      <div className="flex flex-col items-center gap-4">
        <StartupAvatar startup={startup} size="lg" />
        <div className="text-center">
          <div className="font-bold text-white">{startup.name}</div>
          {startup.xHandle && (
            <Badge variant="secondary" className="mt-1">
              <Link
                href={`https://x.com/${startup.xHandle}`}
                target="_blank"
              >
                @{startup.xHandle}
              </Link>
            </Badge>
          )}
        </div>
        <div className="w-full max-w-xs">
          <HPBar current={hp} max={maxHp} label="HP (MRR)" />
        </div>
        <div className="grid w-full max-w-xs grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded bg-zinc-900/80 p-2">
            <div className="text-yellow-400">ATTACK</div>
            <div className="font-mono">{formatGrowth(startup.growth30d)}</div>
          </div>
          <div className="rounded bg-zinc-900/80 p-2">
            <div className="text-yellow-400">DEF</div>
            <div className="font-mono">{startup.profitMarginLast30Days}%</div>
          </div>
          <div className="rounded bg-zinc-900/80 p-2">
            <div className="text-yellow-400">SPD</div>
            <div className="font-mono">{startup.activeSubscriptions}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
