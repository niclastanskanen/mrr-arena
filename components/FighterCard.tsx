import * as motion from "motion/react-client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StartupAvatar } from "@/components/StartupAvatar";
import type { Startup } from "@/lib/trustmrr";
import Link from "next/link";

interface FighterCardProps {
  startup: Startup | null;
  label: string;
  onSelect: () => void;
  isHit?: boolean;
}

export function FighterCard({
  startup,
  label,
  onSelect,
  isHit = false,
}: FighterCardProps) {
  return (
    <motion.div
      animate={isHit ? { scale: [1, 1.05, 1], x: [0, 5, -5, 0] } : {}}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-2 border-red-500/50 bg-black/80 backdrop-blur transition-all hover:border-red-500/80">
        <CardHeader className="pb-2">
          <span className="text-center text-sm font-medium text-yellow-400">
            {label}
          </span>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6 text-center">
          {startup ? (
            <>
              <StartupAvatar startup={startup} size="md" />
              <div>
                <div className="font-bold text-white">{startup.name}</div>
                {startup.xHandle && (
                  <Badge variant="secondary" className="mt-1 text-xs">
                    <Link
                      href={`https://x.com/${startup.xHandle}`}
                      target="_blank"
                    >
                      @{startup.xHandle}
                    </Link>
                  </Badge>
                )}
              </div>
            </>
          ) : null}
          <button
            type="button"
            onClick={onSelect}
            className="w-full rounded-lg border border-red-500/50 bg-red-500/20 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/30"
          >
            {startup ? "Change" : "Select"} {label}
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
