import Image from "next/image";
import type { Startup } from "@/lib/trustmrr";

interface StartupAvatarProps {
  startup: Pick<Startup, "name" | "icon">;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-10 w-10 rounded-lg text-lg",
  md: "h-20 w-20 rounded-xl text-2xl",
  lg: "h-24 w-24 rounded-2xl text-3xl",
};

export function StartupAvatar({
  startup,
  size = "md",
  className,
}: StartupAvatarProps) {
  const classes = sizeClasses[size];
  return (
    <div
      className={`relative overflow-hidden border-2 border-red-500/50 bg-zinc-900 ${classes} ${className ?? ""}`}
    >
      {startup.icon ? (
        <Image
          src={startup.icon}
          alt={startup.name}
          fill
          className="object-cover"
          unoptimized
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center font-bold text-red-500">
          {startup.name[0]}
        </div>
      )}
    </div>
  );
}
