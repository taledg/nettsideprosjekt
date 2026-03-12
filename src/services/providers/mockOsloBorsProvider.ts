import type {
  MarketDataProvider,
  MarketInterval,
  MarketSeriesPoint,
  MarketSnapshot,
  StockPerformance
} from "../../types/market";

interface MockStockSeed {
  name: string;
  ticker: string;
  lastPrice: number;
  changes: Record<MarketInterval, number>;
}

const seriesByInterval: Record<MarketInterval, MarketSeriesPoint[]> = {
  "1D": [
    { timestamp: "2026-03-12T09:00:00.000Z", value: 1210.8 },
    { timestamp: "2026-03-12T10:00:00.000Z", value: 1214.2 },
    { timestamp: "2026-03-12T11:00:00.000Z", value: 1213.7 },
    { timestamp: "2026-03-12T12:00:00.000Z", value: 1218.9 },
    { timestamp: "2026-03-12T13:00:00.000Z", value: 1220.1 },
    { timestamp: "2026-03-12T14:00:00.000Z", value: 1223.8 },
    { timestamp: "2026-03-12T15:00:00.000Z", value: 1226.4 },
    { timestamp: "2026-03-12T16:00:00.000Z", value: 1228.6 }
  ],
  "1W": [
    { timestamp: "2026-03-06T16:00:00.000Z", value: 1197.4 },
    { timestamp: "2026-03-07T16:00:00.000Z", value: 1202.5 },
    { timestamp: "2026-03-08T16:00:00.000Z", value: 1208.9 },
    { timestamp: "2026-03-09T16:00:00.000Z", value: 1217.2 },
    { timestamp: "2026-03-10T16:00:00.000Z", value: 1221.9 },
    { timestamp: "2026-03-11T16:00:00.000Z", value: 1224.8 },
    { timestamp: "2026-03-12T16:00:00.000Z", value: 1228.6 }
  ],
  "1M": [
    { timestamp: "2026-02-12T16:00:00.000Z", value: 1174.2 },
    { timestamp: "2026-02-17T16:00:00.000Z", value: 1180.1 },
    { timestamp: "2026-02-22T16:00:00.000Z", value: 1189.5 },
    { timestamp: "2026-02-27T16:00:00.000Z", value: 1201.7 },
    { timestamp: "2026-03-04T16:00:00.000Z", value: 1210.3 },
    { timestamp: "2026-03-08T16:00:00.000Z", value: 1217.9 },
    { timestamp: "2026-03-12T16:00:00.000Z", value: 1228.6 }
  ],
  "3M": [
    { timestamp: "2025-12-12T16:00:00.000Z", value: 1114.8 },
    { timestamp: "2026-01-01T16:00:00.000Z", value: 1130.2 },
    { timestamp: "2026-01-20T16:00:00.000Z", value: 1154.7 },
    { timestamp: "2026-02-08T16:00:00.000Z", value: 1178.6 },
    { timestamp: "2026-02-24T16:00:00.000Z", value: 1202.8 },
    { timestamp: "2026-03-12T16:00:00.000Z", value: 1228.6 }
  ],
  "1Y": [
    { timestamp: "2025-03-12T16:00:00.000Z", value: 1038.3 },
    { timestamp: "2025-05-12T16:00:00.000Z", value: 1061.4 },
    { timestamp: "2025-07-12T16:00:00.000Z", value: 1098.9 },
    { timestamp: "2025-09-12T16:00:00.000Z", value: 1116.7 },
    { timestamp: "2025-11-12T16:00:00.000Z", value: 1160.5 },
    { timestamp: "2026-01-12T16:00:00.000Z", value: 1196.1 },
    { timestamp: "2026-03-12T16:00:00.000Z", value: 1228.6 }
  ],
  MAX: [
    { timestamp: "2022-03-12T16:00:00.000Z", value: 804.2 },
    { timestamp: "2022-12-12T16:00:00.000Z", value: 851.7 },
    { timestamp: "2023-09-12T16:00:00.000Z", value: 939.5 },
    { timestamp: "2024-06-12T16:00:00.000Z", value: 1014.2 },
    { timestamp: "2025-03-12T16:00:00.000Z", value: 1038.3 },
    { timestamp: "2025-12-12T16:00:00.000Z", value: 1114.8 },
    { timestamp: "2026-03-12T16:00:00.000Z", value: 1228.6 }
  ]
};

const stockSeeds: MockStockSeed[] = [
  { name: "Aker BP", ticker: "AKRBP", lastPrice: 289.4, changes: { "1D": 2.15, "1W": 4.48, "1M": 7.22, "3M": 11.65, "1Y": 19.12, MAX: 33.24 } },
  { name: "Equinor", ticker: "EQNR", lastPrice: 364.8, changes: { "1D": 1.72, "1W": 3.19, "1M": 5.88, "3M": 9.74, "1Y": 14.56, MAX: 28.63 } },
  { name: "Mowi", ticker: "MOWI", lastPrice: 201.5, changes: { "1D": -0.63, "1W": 1.28, "1M": 4.31, "3M": 7.42, "1Y": 10.87, MAX: 22.91 } },
  { name: "SalMar", ticker: "SALM", lastPrice: 638.4, changes: { "1D": 0.84, "1W": 2.18, "1M": 5.91, "3M": 8.54, "1Y": 12.36, MAX: 25.07 } },
  { name: "DNB", ticker: "DNB", lastPrice: 247.1, changes: { "1D": 0.69, "1W": 2.84, "1M": 5.67, "3M": 10.14, "1Y": 17.43, MAX: 31.09 } },
  { name: "Storebrand", ticker: "STB", lastPrice: 128.6, changes: { "1D": 0.46, "1W": 1.92, "1M": 4.18, "3M": 7.96, "1Y": 13.21, MAX: 26.74 } },
  { name: "Kongsberg Gruppen", ticker: "KOG", lastPrice: 1048.0, changes: { "1D": 1.34, "1W": 3.88, "1M": 8.94, "3M": 17.48, "1Y": 29.77, MAX: 61.42 } },
  { name: "Tomra", ticker: "TOM", lastPrice: 138.3, changes: { "1D": -2.44, "1W": -1.86, "1M": 0.71, "3M": 3.42, "1Y": 6.84, MAX: 12.61 } },
  { name: "Yara", ticker: "YAR", lastPrice: 356.9, changes: { "1D": -1.61, "1W": -0.94, "1M": 1.44, "3M": 4.88, "1Y": 8.16, MAX: 16.58 } },
  { name: "Crayon", ticker: "CRAYN", lastPrice: 146.2, changes: { "1D": 2.81, "1W": 5.64, "1M": 10.28, "3M": 18.44, "1Y": 32.15, MAX: 55.91 } },
  { name: "Kahoot!", ticker: "KAHOT", lastPrice: 43.8, changes: { "1D": 1.48, "1W": 4.97, "1M": 8.76, "3M": 15.33, "1Y": 24.44, MAX: 41.27 } },
  { name: "Atea", ticker: "ATEA", lastPrice: 136.9, changes: { "1D": 0.78, "1W": 2.91, "1M": 4.89, "3M": 9.55, "1Y": 16.91, MAX: 27.43 } }
];

function calculateChangePercent(series: MarketSeriesPoint[]) {
  const firstValue = series[0]?.value ?? 0;
  const lastValue = series[series.length - 1]?.value ?? 0;

  if (firstValue === 0) {
    return 0;
  }

  return ((lastValue - firstValue) / firstValue) * 100;
}

function getMovers(interval: MarketInterval) {
  const sorted = stockSeeds
    .map<StockPerformance>((stock) => ({
      name: stock.name,
      ticker: stock.ticker,
      lastPrice: stock.lastPrice,
      changePercent: stock.changes[interval]
    }))
    .sort((left, right) => right.changePercent - left.changePercent);

  return {
    gainers: sorted.slice(0, 3),
    losers: [...sorted].slice(-3).reverse()
  };
}

export class MockOsloBorsProvider implements MarketDataProvider {
  async getMarketSnapshot(interval: MarketInterval): Promise<MarketSnapshot> {
    const series = seriesByInterval[interval];
    const movers = getMovers(interval);

    return {
      source: "mock",
      delayed: true,
      exchangeName: "Oslo Børs",
      interval,
      lastUpdated: "2026-03-12T16:00:00.000Z",
      currentIndex: series[series.length - 1]?.value ?? 0,
      marketChangePercent: calculateChangePercent(series),
      series,
      gainers: movers.gainers,
      losers: movers.losers
    };
  }
}
