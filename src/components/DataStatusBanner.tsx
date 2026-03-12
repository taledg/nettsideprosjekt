import type { DataSourceType } from "../types/market";

interface DataStatusBannerProps {
  source: DataSourceType;
  delayed: boolean;
  isRefreshing: boolean;
}

export function DataStatusBanner({ source, delayed, isRefreshing }: DataStatusBannerProps) {
  const title =
    source === "mock"
      ? "Demodata i bruk"
      : delayed
        ? "Forsinket/proxy-basert markedsdata"
        : "Live/proxy-basert markedsdata";

  const description =
    source === "mock"
      ? "Denne visningen bruker tydelig merket mockdata. Bytt til proxy-provider når ekte datakilde er klar."
      : "Data hentes via en backend/proxy slik at API-nøkler og CORS håndteres utenfor frontend.";

  return (
    <div className="status-banner">
      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
      <span className="status-chip">{isRefreshing ? "Oppdaterer…" : "Auto-oppdatering aktiv"}</span>
    </div>
  );
}
