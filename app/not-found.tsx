import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Swords } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4">
        <h1 className="text-8xl font-bold text-red-500/80">404</h1>
        <p className="mt-4 text-xl text-zinc-400">
          This battle arena doesn&apos;t exist.
        </p>
        <p className="mt-2 text-sm text-zinc-500">
          The page you&apos;re looking for was not found.
        </p>
        <Link href="/" className="mt-8">
          <Button
            variant="outline"
            size="lg"
            className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"
          >
            <Swords className="mr-2 h-5 w-5" />
            Back to Arena
          </Button>
        </Link>
      </div>
    </div>
  );
}
