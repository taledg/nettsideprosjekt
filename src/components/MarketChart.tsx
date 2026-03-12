import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import type { MarketInterval, MarketSeriesPoint } from "../types/market";
import { formatChartLabel, formatPercent } from "../utils/format";

interface MarketChartProps {
  interval: MarketInterval;
  series: MarketSeriesPoint[];
  marketChange: number;
}

function getXAxisLabel(interval: MarketInterval, timestamp: string) {
  if (interval === "1D" || interval === "1W") {
    return formatChartLabel(timestamp, "short");
  }

  return formatChartLabel(timestamp, "long");
}

export function MarketChart({ interval, series, marketChange }: MarketChartProps) {
  const isPositive = marketChange >= 0;

  return (
    <div className="chart-shell">
      <div className="chart-summary">
        <span>Valgt intervall</span>
        <strong>{interval}</strong>
        <span className={isPositive ? "positive-pill" : "negative-pill"}>{formatPercent(marketChange)}</span>
      </div>

      <div className="chart-panel">
        <ResponsiveContainer width="100%" height={360}>
          <AreaChart data={series} margin={{ top: 12, right: 12, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="marketFill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={isPositive ? "rgba(32, 168, 118, 1)" : "rgba(220, 75, 75, 1)"}
                  stopOpacity={0.35}
                />
                <stop
                  offset="95%"
                  stopColor={isPositive ? "rgba(32, 168, 118, 1)" : "rgba(220, 75, 75, 1)"}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(135, 151, 172, 0.18)" vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(value) => getXAxisLabel(interval, value)}
              tickLine={false}
              axisLine={false}
              minTickGap={24}
            />
            <YAxis
              tickFormatter={(value: number) =>
                new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 0 }).format(value)
              }
              tickLine={false}
              axisLine={false}
              domain={["auto", "auto"]}
              width={72}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 16,
                border: "1px solid rgba(135, 151, 172, 0.2)",
                boxShadow: "0 16px 40px rgba(15, 23, 42, 0.12)"
              }}
              labelFormatter={(value) => formatChartLabel(String(value), "long")}
              formatter={(value: number) => [
                new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 1 }).format(value),
                "OBX"
              ]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={isPositive ? "#20a876" : "#dc4b4b"}
              strokeWidth={3}
              fill="url(#marketFill)"
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
