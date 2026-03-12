export type MarketInterval = "1D" | "1W" | "1M" | "3M" | "1Y" | "MAX";

export type DataSourceType = "mock" | "proxy";

export interface MarketSeriesPoint {
  timestamp: string;
  value: number;
}

export interface StockPerformance {
  name: string;
  ticker: string;
  lastPrice: number;
  changePercent: number;
}

export interface MarketSnapshot {
  source: DataSourceType;
  delayed: boolean;
  exchangeName: string;
  interval: MarketInterval;
  lastUpdated: string;
  currentIndex: number;
  marketChangePercent: number;
  series: MarketSeriesPoint[];
  gainers: StockPerformance[];
  losers: StockPerformance[];
}

export interface MarketDataProvider {
  getMarketSnapshot(interval: MarketInterval): Promise<MarketSnapshot>;
}
