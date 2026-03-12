import { useState } from "react";
import { DataStatusBanner } from "./components/DataStatusBanner";
import { Header } from "./components/Header";
import { IntervalTabs } from "./components/IntervalTabs";
import { MarketChart } from "./components/MarketChart";
import { MoversCard } from "./components/MoversCard";
import { StatePanel } from "./components/StatePanel";
import { useOsloBorsData } from "./hooks/useOsloBorsData";
import type { MarketInterval } from "./types/market";
import { formatPercent, formatTimestamp } from "./utils/format";

const intervals: MarketInterval[] = ["1D", "1W", "1M", "3M", "1Y", "MAX"];

function App() {
  const [interval, setInterval] = useState<MarketInterval>("1M");
  const { snapshot, isLoading, error, refetch, isRefreshing } = useOsloBorsData(interval);

  return (
    <div className="app-shell">
      <Header
        title="Oslo Børs Live"
        subtitle="Profesjonell markedsoversikt med tydelig datakilde, responsiv graf og toppbevegelser i valgt intervall."
        lastUpdated={snapshot ? formatTimestamp(snapshot.lastUpdated) : "Ingen data ennå"}
        exchangeName={snapshot?.exchangeName ?? "Oslo Børs"}
      />

      <main className="content-grid">
        <section className="hero-card">
          <div className="hero-header">
            <div>
              <p className="eyebrow">Markedsovervåking</p>
              <h2>Hovedindeks over tid</h2>
              <p className="muted-text">
                Bytt intervall for å oppdatere både grafen og listen over vinnere og tapere.
              </p>
            </div>
            <IntervalTabs intervals={intervals} selectedInterval={interval} onChange={setInterval} />
          </div>

          <DataStatusBanner
            source={snapshot?.source ?? "mock"}
            delayed={snapshot?.delayed ?? false}
            isRefreshing={isRefreshing}
          />

          {error ? (
            <StatePanel
              title="Kunne ikke laste markedsdata"
              description={error}
              actionLabel="Prøv igjen"
              onAction={() => {
                void refetch();
              }}
              variant="error"
            />
          ) : isLoading && !snapshot ? (
            <StatePanel
              title="Laster børsdata"
              description="Henter siste tilgjengelige datasett for valgt intervall."
              variant="loading"
            />
          ) : snapshot && snapshot.series.length > 0 ? (
            <MarketChart
              interval={snapshot.interval}
              series={snapshot.series}
              marketChange={snapshot.marketChangePercent}
            />
          ) : (
            <StatePanel
              title="Ingen data tilgjengelig"
              description="Datakilden returnerte et tomt datasett for valgt intervall."
              variant="empty"
            />
          )}

          {snapshot ? (
            <div className="hero-metrics">
              <article className="metric-card">
                <span>Siste nivå</span>
                <strong>{snapshot.currentIndex.toLocaleString("nb-NO", { maximumFractionDigits: 1 })}</strong>
              </article>
              <article className="metric-card">
                <span>Utvikling</span>
                <strong className={snapshot.marketChangePercent >= 0 ? "positive-text" : "negative-text"}>
                  {formatPercent(snapshot.marketChangePercent)}
                </strong>
              </article>
              <article className="metric-card">
                <span>Sist oppdatert</span>
                <strong>{formatTimestamp(snapshot.lastUpdated)}</strong>
              </article>
            </div>
          ) : null}
        </section>

        <section className="movers-grid">
          <MoversCard
            title="Topp 3 vinnere"
            subtitle="Aksjer med sterkest prosentvis oppgang i valgt intervall."
            items={snapshot?.gainers ?? []}
            emptyMessage="Ingen vinnere å vise."
            tone="positive"
          />
          <MoversCard
            title="Topp 3 tapere"
            subtitle="Aksjer med størst prosentvis nedgang i valgt intervall."
            items={snapshot?.losers ?? []}
            emptyMessage="Ingen tapere å vise."
            tone="negative"
          />
        </section>
      </main>
    </div>
  );
}

export default App;
