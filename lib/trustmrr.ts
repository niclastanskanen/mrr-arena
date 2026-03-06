import { cache } from "react";

export type Startup = {
  name: string;
  slug: string;
  icon: string;
  description: string;
  mrr: number;
  growth30d: number;
  profitMarginLast30Days: number;
  activeSubscriptions: number;
  xHandle: string;
  category: string;
  country: string;
  onSale: boolean;
  askingPrice?: number;
};

export function mapApiStartupToStartup(api: Record<string, unknown>): Startup {
  const revenue = api.revenue as Record<string, unknown> | undefined;
  const mrrCents =
    (revenue?.mrr as number) ??
    (api.mrr as number) ??
    0;
  // TrustMRR API returns revenue in USD cents; convert to dollars for HP/display
  const mrr = mrrCents / 100;

  const rawGrowth =
    (api.growth30d as number) ??
    (api.growth_30d as number) ??
    0;
  // API may return decimal (0.12 = 12%) or percentage (24 = 24%); normalize to percentage
  const growth = rawGrowth > 0 && rawGrowth <= 1 ? rawGrowth * 100 : rawGrowth;

  const profit =
    (api.profitMarginLast30Days as number) ??
    (api.profit_margin_last_30_days as number) ??
    0;

  const xHandle =
    (api.xHandle as string) ??
    (api.x_handle as string) ??
    "";

  return {
    name: (api.name as string) ?? "",
    slug: (api.slug as string) ?? "",
    icon: (api.icon as string) ?? "",
    description: (api.description as string) ?? "",
    mrr,
    growth30d: growth,
    profitMarginLast30Days: profit,
    activeSubscriptions: (api.activeSubscriptions as number) ?? (api.active_subscriptions as number) ?? 0,
    xHandle,
    category: (api.category as string) ?? "",
    country: (api.country as string) ?? "",
    onSale: (api.onSale as boolean) ?? (api.on_sale as boolean) ?? false,
    askingPrice: (api.askingPrice as number) ?? (api.asking_price as number) ?? undefined,
  };
}

export function formatMrr(mrr: number): string {
  if (mrr >= 1000) {
    return `${(mrr / 1000).toFixed(1)}k`;
  }
  return String(Math.round(mrr));
}

export function formatGrowth(growth30d: number): string {
  return `${(growth30d * 100).toFixed(0)}%`;
}

const TRUSTMRR_BASE = "https://trustmrr.com/api/v1";

export async function fetchTrustMrrApi(
  path: string,
  searchParams?: Record<string, string>,
) {
  const apiKey = process.env.TRUSTMRR_API_KEY;
  if (!apiKey) throw new Error("TRUSTMRR_API_KEY is not set");

  const url = new URL(`${TRUSTMRR_BASE}${path}`);
  if (searchParams) {
    Object.entries(searchParams).forEach(([k, v]) =>
      url.searchParams.set(k, v),
    );
  }

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${apiKey}` },
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`TrustMRR API error: ${res.status}`);
  return res.json();
}

export function parseStartupResponse(res: unknown): Record<string, unknown> {
  const raw = res as Record<string, unknown>;
  return (raw?.data ?? res) as Record<string, unknown>;
}

export function parseStartupsListResponse(
  res: unknown,
): Record<string, unknown>[] {
  const raw = res as Record<string, unknown>;
  return Array.isArray(raw?.data)
    ? raw.data
    : Array.isArray(raw)
      ? raw
      : ((raw?.items ?? raw?.data ?? []) as Record<string, unknown>[]);
}

export const fetchStartupBySlug = cache(
  async (slug: string): Promise<Startup | null> => {
    try {
      const res = await fetchTrustMrrApi(`/startups/${slug}`);
      const data = parseStartupResponse(res);
      return mapApiStartupToStartup(data);
    } catch {
      return null;
    }
  },
);

export const fetchStartupsList = cache(
  async (options?: {
    sort?: string;
    limit?: string;
    search?: string;
  }): Promise<Startup[]> => {
    try {
      const params: Record<string, string> = {
        sort: options?.sort ?? "revenue-desc",
        limit: options?.limit ?? "50",
      };
      if (options?.search) params.search = options.search;

      const res = await fetchTrustMrrApi("/startups", params);
      const items = parseStartupsListResponse(res);
      return items.map((item) =>
        mapApiStartupToStartup(item as Record<string, unknown>),
      );
    } catch {
      return [];
    }
  },
);
