import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { formatMrr } from "@/lib/trustmrr";
import { baseUrl, battleUrl } from "@/lib/utils";

interface ShareButtonProps {
  slug1: string;
  slug2: string;
  winnerName: string;
  mrr1: number;
  mrr2: number;
  containerRef: React.RefObject<HTMLElement | null>;
}

export function ShareButton({
  slug1,
  slug2,
  winnerName,
  mrr1,
  mrr2,
  containerRef,
}: ShareButtonProps) {
  const tweetText = `Just saw ${winnerName} win in MRR Arena! 🔥 ${formatMrr(mrr1)} vs ${formatMrr(mrr2)} MRR. Who wins next? ${baseUrl()}${battleUrl(slug1, slug2)}`;

  const handleShareOnX = async () => {
    if (!containerRef.current) {
      toast.error("Could not capture battle");
      return;
    }

    try {
      const { toBlob } = await import("html-to-image");
      const blob = await toBlob(containerRef.current, {
        backgroundColor: "#0a0a0a",
        pixelRatio: 2,
      });

      if (!blob) {
        toast.error("Failed to capture screenshot");
        return;
      }

      const file = new File([blob], "mrr-arena-battle.png", {
        type: "image/png",
      });

      let copied = false;
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": file }),
        ]);
        copied = true;
      } catch {
        // Clipboard may fail. Still open tweet with pre-filled text.
      }
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
      window.open(url, "_blank", "noopener,noreferrer");
      toast.success(
        copied
          ? "Screenshot copied! Paste it in your tweet."
          : "Tweet opened"
      );
    } catch {
      toast.error("Failed to capture screenshot");
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleShareOnX}
      className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
    >
      <Share2 className="mr-2 h-4 w-4" />
      Share on X
    </Button>
  );
}
