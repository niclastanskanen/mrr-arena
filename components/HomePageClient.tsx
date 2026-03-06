"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import * as motion from "motion/react-client";
import { FighterCard } from "@/components/FighterCard";
import { StartupSelectorModal } from "@/components/StartupSelectorModal";
import { Button } from "@/components/ui/button";
import type { Startup } from "@/lib/trustmrr";
import { battleUrl } from "@/lib/utils";
import { Swords, Shuffle } from "lucide-react";

interface HomePageClientProps {
  initialStartups: Startup[];
}

export function HomePageClient({ initialStartups }: HomePageClientProps) {
  const [startup1, setStartup1] = useState<Startup | null>(null);
  const [startup2, setStartup2] = useState<Startup | null>(null);
  const [modalSlot, setModalSlot] = useState<1 | 2 | null>(null);
  const [displaySlot, setDisplaySlot] = useState<1 | 2>(1);

  useEffect(() => {
    if (modalSlot !== null) setDisplaySlot(modalSlot);
  }, [modalSlot]);

  const handleRandomBattle = () => {
    const list = initialStartups.filter((s) => s.mrr > 0);
    if (list.length >= 2) {
      const i1 = Math.floor(Math.random() * list.length);
      let i2 = Math.floor(Math.random() * list.length);
      while (i2 === i1) i2 = Math.floor(Math.random() * list.length);
      setStartup1(list[i1]!);
      setStartup2(list[i2]!);
    }
  };

  const canBattle = startup1 && startup2;
  const battleSlug = canBattle ? battleUrl(startup1.slug, startup2.slug) : "#";

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-5xl px-4 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          <header className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-yellow-400 md:text-7xl">
              MRR Arena
            </h1>
            <p className="mt-4 text-xl text-zinc-400">
              Who will win the startup war?
            </p>
          </header>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <FighterCard
              startup={startup1}
              label="Startup 1"
              onSelect={() => setModalSlot(1)}
            />
            <FighterCard
              startup={startup2}
              label="Startup 2"
              onSelect={() => setModalSlot(2)}
            />
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={handleRandomBattle}
              className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"
            >
              <Shuffle className="mr-2 h-5 w-5" />
              Random Battle
            </Button>
            {canBattle ? (
              <Link href={battleSlug}>
                <Button
                  size="lg"
                  className="bg-red-600 text-white hover:bg-red-700"
                >
                  <Swords className="mr-2 h-5 w-5" />
                  Battle!
                </Button>
              </Link>
            ) : (
              <Button
                size="lg"
                disabled
                className="bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
              >
                <Swords className="mr-2 h-5 w-5" />
                Battle!
              </Button>
            )}
          </div>
        </motion.div>
      </div>

      <StartupSelectorModal
        open={modalSlot !== null}
        onOpenChange={(open) => !open && setModalSlot(null)}
        onSelect={(s) => {
          if (modalSlot === 1) setStartup1(s);
          else if (modalSlot === 2) setStartup2(s);
          setModalSlot(null);
        }}
        slot={displaySlot}
        initialStartups={initialStartups}
      />
    </div>
  );
}
