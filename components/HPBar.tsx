import * as motion from "motion/react-client";

interface HPBarProps {
  current: number;
  max: number;
  label?: string;
  className?: string;
}

export function HPBar({ current, max, label, className }: HPBarProps) {
  const pct = max > 0 ? Math.max(0, Math.min(100, (current / max) * 100)) : 0;

  return (
    <div className={className}>
      {label && (
        <div className="mb-1 flex justify-between text-xs">
          <span className="text-zinc-400">{label}</span>
          <span className="font-mono text-yellow-400">
            {Math.round(current)} / {Math.round(max)}
          </span>
        </div>
      )}
      <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
        <motion.div
          className="h-full rounded-full"
          initial={false}
          animate={{
            width: `${pct}%`,
            backgroundColor:
              pct > 60 ? "#22c55e" : pct > 30 ? "#eab308" : "#ef4444",
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
