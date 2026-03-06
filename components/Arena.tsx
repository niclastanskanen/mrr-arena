"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Commentary } from "./Commentary";
import { FighterPanel } from "./FighterPanel";
import { ShareButton } from "./ShareButton";
import type { Startup } from "@/lib/trustmrr";
import { generateCommentary } from "@/lib/commentary";
import { triggerConfetti } from "@/lib/confetti";
import { battleUrl } from "@/lib/utils";
import { RotateCcw, Swords, Trophy } from "lucide-react";
import Link from "next/link";

interface ArenaProps {
  startup1: Startup;
  startup2: Startup;
  slug1: string;
  slug2: string;
}

const BATTLE_LOADING_SPINNER = (
  <div className="h-4 w-4 animate-spin rounded-full border-2 border-yellow-400 border-t-transparent" />
);

function damageFormula(attacker: Startup, defender: Startup): number {
  // Attack = growth % (ensure at least 1%)
  const attack = Math.max(1, attacker.growth30d * 100);
  // Cap defense at 95% so we always deal at least 5% of base damage
  const defense = Math.min(
    95,
    Math.max(0, defender.profitMarginLast30Days ?? 0),
  );
  // Scale damage relative to defender's HP so battles last ~5-8 rounds
  // Attack factor: 0.5 (min) to 2 (max) so even low growth deals damage
  const attackFactor = Math.max(0.5, Math.min(2, attack / 100));
  const defenseFactor = 1 - defense / 100;
  const baseDamage = defender.mrr * 0.2;
  return Math.max(1, baseDamage * attackFactor * defenseFactor);
}

export function Arena({ startup1, startup2, slug1, slug2 }: ArenaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [battleStarted, setBattleStarted] = useState(false);
  const [round, setRound] = useState(0);
  const [hp1, setHp1] = useState(startup1.mrr);
  const [hp2, setHp2] = useState(startup2.mrr);
  const [comment, setComment] = useState("");
  const [flyingIcon, setFlyingIcon] = useState<{
    slug: string;
    icon: string;
    from: 1 | 2;
  } | null>(null);
  const [winner, setWinner] = useState<1 | 2 | null>(null);
  const maxHp = Math.max(startup1.mrr, startup2.mrr);

  const [totalRounds] = useState(() => 5 + Math.floor(Math.random() * 4));
  const battleOver = winner !== null;
  const hpRef = useRef({ hp1, hp2 });
  const runRound = useRef<() => void>(() => {});

  useEffect(() => {
    hpRef.current = { hp1, hp2 };
  }, [hp1, hp2]);

  useEffect(() => {
    runRound.current = () => {
      if (winner) return;

      const { hp1: currentHp1, hp2: currentHp2 } = hpRef.current;
      const isP1Attacking = round % 2 === 0;
      const attacker = isP1Attacking ? startup1 : startup2;
      const defender = isP1Attacking ? startup2 : startup1;
      const dmg = damageFormula(attacker, defender);

      setFlyingIcon({
        slug: attacker.slug,
        icon: attacker.icon,
        from: isP1Attacking ? 1 : 2,
      });

      setTimeout(() => {
        setFlyingIcon(null);
        let newHp1 = currentHp1;
        let newHp2 = currentHp2;
        if (isP1Attacking) {
          newHp2 = Math.max(0, currentHp2 - dmg);
          setHp2(newHp2);
        } else {
          newHp1 = Math.max(0, currentHp1 - dmg);
          setHp1(newHp1);
        }
        hpRef.current = { hp1: newHp1, hp2: newHp2 };
        const c = generateCommentary(round + 1, attacker, defender, dmg);
        setComment(c);

        if (newHp1 <= 0 || newHp2 <= 0) {
          const w = newHp1 <= 0 ? 2 : 1;
          setWinner(w);
          triggerConfetti({ particleCount: 100, spread: 70 });
          return;
        }

        setRound((r) => r + 1);
      }, 800);
    };
  }, [winner, round, startup1, startup2]);

  const startBattle = () => {
    setBattleStarted(true);
    setRound(0);
    setComment("");
    setHp1(startup1.mrr);
    setHp2(startup2.mrr);
    hpRef.current = { hp1: startup1.mrr, hp2: startup2.mrr };
    setWinner(null);
  };

  useEffect(() => {
    if (!battleStarted || battleOver || flyingIcon) return;
    if (round < totalRounds) {
      const delay = round === 0 ? 0 : 1200;
      const t = setTimeout(() => runRound.current?.(), delay);
      return () => clearTimeout(t);
    }
  }, [battleStarted, battleOver, flyingIcon, round, totalRounds]);

  // When we've completed all rounds without a knockout, declare winner by remaining HP
  useEffect(() => {
    if (battleStarted && !winner && round >= totalRounds) {
      const w = hp1 >= hp2 ? 1 : 2;
      queueMicrotask(() => {
        setWinner(w);
        triggerConfetti({ particleCount: 80, spread: 60 });
      });
    }
  }, [battleStarted, winner, round, totalRounds, hp1, hp2]);

  return (
    <div ref={containerRef} className="min-h-screen pt-10">
      <div className="relative mx-auto max-w-6xl px-4 py-8">
        <div
          className="absolute inset-0 -z-10 border-4 border-red-500/20"
          style={{ borderRadius: "2rem" }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="text-center">
            <Link
              href="/"
              className="text-4xl font-bold text-yellow-400 md:text-5xl hover:underline"
            >
              MRR Arena
            </Link>
            <p className="mt-1 text-zinc-500">Who will win the startup war?</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <FighterPanel startup={startup1} hp={hp1} maxHp={maxHp} />
            <FighterPanel startup={startup2} hp={hp2} maxHp={maxHp} />
          </div>

          <AnimatePresence>
            {flyingIcon && (
              <motion.div
                className="pointer-events-none fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2"
                initial={{
                  x: flyingIcon.from === 1 ? -200 : 200,
                  scale: 0.5,
                  rotate: 0,
                }}
                animate={{ x: 0, scale: 1.5, rotate: 360 }}
                exit={{ opacity: 0, scale: 2 }}
                transition={{ duration: 0.4 }}
              >
                <div className="relative h-16 w-16 overflow-hidden rounded-xl border-2 border-red-500 bg-black">
                  {flyingIcon.icon ? (
                    <Image
                      src={flyingIcon.icon}
                      alt=""
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : null}
                </div>
                <motion.span
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-2xl font-bold text-red-500"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  BOOM
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>

          {comment && (
            <div className="flex justify-center">
              <Commentary text={comment} className="max-w-xl" />
            </div>
          )}

          <div className="flex flex-col items-center gap-4">
            {!battleStarted ? (
              <Button
                size="lg"
                onClick={startBattle}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                <Swords className="mr-2 h-5 w-5" />
                START BATTLE
              </Button>
            ) : !battleOver ? (
              <div className="flex items-center gap-2 text-yellow-400">
                {BATTLE_LOADING_SPINNER}
                <span>
                  Round {Math.min(round + 1, totalRounds)} of {totalRounds}...
                </span>
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-6"
              >
                <div className="flex items-center gap-2 text-4xl font-bold text-yellow-400">
                  <Trophy className="h-10 w-10" />
                  WINNER
                </div>
                <div className="text-2xl text-white">
                  {winner === 1 ? startup1.name : startup2.name}
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href={battleUrl(slug1, slug2)}>
                    <Button
                      variant="outline"
                      className="border-yellow-500/50 text-yellow-400"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Rematch
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button
                      variant="outline"
                      className="border-zinc-600 text-zinc-300"
                    >
                      New Battle
                    </Button>
                  </Link>
                </div>
                <ShareButton
                  slug1={slug1}
                  slug2={slug2}
                  winnerName={winner === 1 ? startup1.name : startup2.name}
                  mrr1={startup1.mrr}
                  mrr2={startup2.mrr}
                  containerRef={containerRef}
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
