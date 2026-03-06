import { Suspense } from "react";
import { HomePageClient } from "@/components/HomePageClient";
import { fetchStartupsList } from "@/lib/trustmrr";

function HomePageContent() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomePageAsync />
    </Suspense>
  );
}

async function HomePageAsync() {
  const startups = await fetchStartupsList({
    sort: "revenue-desc",
    limit: "50",
  });
  const initialStartups = startups.filter(
    (s) => s.mrr > 0 && !s.name.toLowerCase().includes("anonymous"),
  );
  return <HomePageClient initialStartups={initialStartups} />;
}

function HomePageSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-5xl px-4 py-12 md:py-20">
        <div className="space-y-12 animate-pulse">
          <header className="text-center">
            <div className="mx-auto h-12 w-64 rounded bg-zinc-800" />
            <div className="mx-auto mt-4 h-6 w-80 rounded bg-zinc-800/60" />
          </header>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="h-64 rounded-xl border-2 border-red-500/30 bg-zinc-900/50" />
            <div className="h-64 rounded-xl border-2 border-red-500/30 bg-zinc-900/50" />
          </div>
          <div className="flex justify-center gap-4">
            <div className="h-12 w-40 rounded-lg bg-zinc-800" />
            <div className="h-12 w-32 rounded-lg bg-zinc-800" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return <HomePageContent />;
}
