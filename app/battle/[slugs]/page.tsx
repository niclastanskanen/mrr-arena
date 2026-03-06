import { notFound } from "next/navigation";
import { Arena } from "@/components/Arena";
import { fetchStartupBySlug } from "@/lib/trustmrr";

function parseSlugs(slugs: string): [string, string] | null {
  const parts = slugs.split("-");
  if (parts.length < 2) return null;
  return [parts[0]!, parts.slice(1).join("-")];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slugs: string }>;
}) {
  const { slugs } = await params;
  const parsed = parseSlugs(slugs);
  const s1 = parsed ? parsed[0].replace(/-/g, " ") : "";
  const s2 = parsed ? parsed[1].replace(/-/g, " ") : "";
  const title = s1 && s2 ? `${s1} vs ${s2} | MRR Arena` : "MRR Arena";
  return {
    title,
    description: `Watch ${s1} battle ${s2} in the MRR Arena!`,
    openGraph: {
      title,
      description: `Who will win? ${s1} vs ${s2} in the startup battle arena.`,
    },
  };
}

export default async function BattlePage({
  params,
}: {
  params: Promise<{ slugs: string }>;
}) {
  const { slugs } = await params;
  const parsed = parseSlugs(slugs);
  if (!parsed) notFound();
  const [slug1, slug2] = parsed;

  const [startup1, startup2] = await Promise.all([
    fetchStartupBySlug(slug1),
    fetchStartupBySlug(slug2),
  ]);

  if (!startup1 || !startup2) notFound();

  return (
    <Arena
      startup1={startup1}
      startup2={startup2}
      slug1={slug1}
      slug2={slug2}
    />
  );
}
