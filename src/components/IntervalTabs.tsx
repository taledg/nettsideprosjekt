import type { MarketInterval } from "../types/market";

interface IntervalTabsProps {
  intervals: MarketInterval[];
  selectedInterval: MarketInterval;
  onChange: (interval: MarketInterval) => void;
}

export function IntervalTabs({ intervals, selectedInterval, onChange }: IntervalTabsProps) {
  return (
    <div className="interval-tabs" role="tablist" aria-label="Tidsintervall">
      {intervals.map((interval) => (
        <button
          key={interval}
          type="button"
          role="tab"
          aria-selected={selectedInterval === interval}
          className={selectedInterval === interval ? "interval-tab active" : "interval-tab"}
          onClick={() => onChange(interval)}
        >
          {interval}
        </button>
      ))}
    </div>
  );
}
