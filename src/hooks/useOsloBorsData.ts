import { useEffect, useState } from "react";
import { marketDataService } from "../services/marketDataService";
import type { MarketInterval, MarketSnapshot } from "../types/market";

const REFRESH_INTERVAL_MS = 60_000;

interface UseOsloBorsDataResult {
  snapshot: MarketSnapshot | null;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useOsloBorsData(interval: MarketInterval): UseOsloBorsDataResult {
  const [snapshot, setSnapshot] = useState<MarketSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadData(showInitialLoading = false) {
    if (showInitialLoading) {
      setIsLoading(true);
      setSnapshot(null);
    } else {
      setIsRefreshing(true);
    }

    try {
      const nextSnapshot = await marketDataService.getMarketSnapshot(interval);
      setSnapshot(nextSnapshot);
      setError(null);
    } catch (loadError) {
      const message = loadError instanceof Error ? loadError.message : "Ukjent feil ved lasting av markedsdata.";
      setError(message);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }

  useEffect(() => {
    void loadData(true);
  }, [interval]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      void loadData(false);
    }, REFRESH_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [interval]);

  return {
    snapshot,
    isLoading,
    isRefreshing,
    error,
    refetch: async () => loadData(snapshot === null)
  };
}
