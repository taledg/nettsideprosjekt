import type { MarketDataProvider, MarketInterval, MarketSnapshot } from "../../types/market";

const proxyBaseUrl = import.meta.env.VITE_PROXY_BASE_URL ?? "";

function isMarketSnapshot(data: unknown): data is MarketSnapshot {
  if (!data || typeof data !== "object") {
    return false;
  }

  const snapshot = data as Partial<MarketSnapshot>;
  return (
    typeof snapshot.interval === "string" &&
    typeof snapshot.lastUpdated === "string" &&
    typeof snapshot.currentIndex === "number" &&
    typeof snapshot.marketChangePercent === "number" &&
    Array.isArray(snapshot.series) &&
    Array.isArray(snapshot.gainers) &&
    Array.isArray(snapshot.losers)
  );
}

export class ProxyOsloBorsProvider implements MarketDataProvider {
  async getMarketSnapshot(interval: MarketInterval): Promise<MarketSnapshot> {
    const response = await fetch(`${proxyBaseUrl}/api/oslobors?interval=${interval}`);

    if (!response.ok) {
      throw new Error(`Proxy svarte med status ${response.status}.`);
    }

    const payload: unknown = await response.json();

    if (!isMarketSnapshot(payload)) {
      throw new Error("Proxy returnerte et ugyldig datasett.");
    }

    return payload;
  }
}
