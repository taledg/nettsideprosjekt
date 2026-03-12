import type { StockPerformance } from "../types/market";
import { formatCurrency, formatPercent } from "../utils/format";

interface MoversCardProps {
  title: string;
  subtitle: string;
  items: StockPerformance[];
  emptyMessage: string;
  tone: "positive" | "negative";
}

export function MoversCard({ title, subtitle, items, emptyMessage, tone }: MoversCardProps) {
  return (
    <section className="movers-card">
      <div className="section-top">
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
        <span className={tone === "positive" ? "badge-positive" : "badge-negative"}>
          {tone === "positive" ? "Oppgang" : "Nedgang"}
        </span>
      </div>

      {items.length === 0 ? (
        <div className="empty-inline">{emptyMessage}</div>
      ) : (
        <div className="movers-list">
          {items.map((item) => (
            <article key={item.ticker} className="mover-row">
              <div>
                <div className="mover-name">{item.name}</div>
                <div className="mover-ticker">{item.ticker}</div>
              </div>
              <div className="mover-stats">
                <span>{formatCurrency(item.lastPrice)}</span>
                <strong className={item.changePercent >= 0 ? "positive-text" : "negative-text"}>
                  {formatPercent(item.changePercent)}
                </strong>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
