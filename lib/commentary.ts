import type { Startup } from "./trustmrr";
import { formatMrr, formatGrowth } from "./trustmrr";

const COMMENTS = [
  (a: Startup, d: Startup, _dmg: number) =>
    `${a.name} knocks out ${d.name} with ${formatGrowth(a.growth30d)} growth – mamma mia!`,
  (a: Startup, d: Startup) =>
    `This one grows slower than my grandma's Nokia but still has ${formatMrr(d.mrr)} MRR – respect!`,
  (a: Startup, d: Startup) =>
    `${a.name} coming in hot with ${formatMrr(a.mrr)} MRR – ${d.name} didn't stand a chance!`,
  (a: Startup, d: Startup) =>
    `${d.name} thought ${(d.profitMarginLast30Days).toFixed(0)}% margin would save them. It didn't.`,
  (a: Startup) =>
    a.onSale
      ? `${a.name} is literally on sale and still winning – that's indie hustle!`
      : `${a.name} flexing with ${(a.activeSubscriptions).toFixed(0)} subs – no mercy!`,
  (a: Startup, d: Startup) =>
    `${a.name} vs ${d.name}: ${formatGrowth(a.growth30d)} growth beats ${formatGrowth(d.growth30d)} any day!`,
  (a: Startup, d: Startup) =>
    `"Revenue is vanity, profit is sanity" – ${d.name} had ${(d.profitMarginLast30Days).toFixed(0)}% margin. Still lost.`,
  (a: Startup) =>
    `${a.name} from ${a.country} – the global indie takeover continues!`,
  (a: Startup, d: Startup) =>
    `${d.name}'s ${formatMrr(d.mrr)} MRR couldn't handle ${a.name}'s growth engine!`,
  (a: Startup, d: Startup) =>
    `Subscriptions: ${a.activeSubscriptions} vs ${d.activeSubscriptions}. Size matters.`,
  (a: Startup) =>
    a.xHandle
      ? `@${a.xHandle} building in public and winning in private!`
      : `${a.name} – no X, no problem. Pure MRR.`,
  (a: Startup, d: Startup) =>
    `${a.name} in ${a.category} – ${d.name} in ${d.category}. Same arena, different outcomes.`,
  (a: Startup, d: Startup, dmg: number) =>
    `Critical hit! ${dmg.toFixed(0)} damage from that growth percentage!`,
  (a: Startup) =>
    a.askingPrice
      ? `${a.name} – $${(a.askingPrice / 1000).toFixed(0)}k asking price and still fighting!`
      : `${a.name} – not for sale, and that's why they're winning.`,
  (a: Startup, d: Startup) =>
    `${d.name} thought ${(d.profitMarginLast30Days).toFixed(0)}% defense would hold. ${a.name} had other plans.`,
  (a: Startup, d: Startup) =>
    `The ${a.category} category strikes again! ${d.name} never saw it coming.`,
  (a: Startup, _defender: Startup) =>
    `${formatGrowth(a.growth30d)} monthly growth – ${a.name} is in beast mode!`,
  (a: Startup, d: Startup) =>
    `${d.name} had the MRR. ${a.name} had the growth. Growth wins in the arena.`,
  (a: Startup) =>
    `${a.name} – ${(a.activeSubscriptions).toFixed(0)} subs, ${formatMrr(a.mrr)} MRR. The numbers don't lie.`,
  (a: Startup, d: Startup) =>
    `Indie vs indie. ${a.name} vs ${d.name}. Only one leaves the arena.`,
  (a: Startup, d: Startup, dmg: number) =>
    `BOOM! ${dmg.toFixed(0)} damage from that attack – ${d.name} is reeling!`,
  (a: Startup, d: Startup) =>
    `${a.name} from ${a.country} takes down ${d.name} from ${d.country} – global domination!`,
];

export function generateCommentary(
  round: number,
  attacker: Startup,
  defender: Startup,
  damage: number
): string {
  const idx = Math.floor(Math.random() * COMMENTS.length);
  return COMMENTS[idx](attacker, defender, damage);
}
