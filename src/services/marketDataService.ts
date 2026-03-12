import type { MarketDataProvider } from "../types/market";
import { MockOsloBorsProvider } from "./providers/mockOsloBorsProvider";
import { ProxyOsloBorsProvider } from "./providers/proxyOsloBorsProvider";

function createProvider(): MarketDataProvider {
  const configuredProvider = import.meta.env.VITE_MARKET_DATA_PROVIDER;

  if (configuredProvider === "proxy") {
    return new ProxyOsloBorsProvider();
  }

  return new MockOsloBorsProvider();
}

export const marketDataService = createProvider();
