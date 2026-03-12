export function formatPercent(value: number) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2).replace(".", ",")} %`;
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

export function formatTimestamp(timestamp: string) {
  return new Intl.DateTimeFormat("nb-NO", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(timestamp));
}

export function formatChartLabel(timestamp: string, mode: "short" | "long" = "short") {
  return new Intl.DateTimeFormat("nb-NO", {
    month: mode === "long" ? "short" : undefined,
    day: "2-digit",
    hour: mode === "short" ? "2-digit" : undefined,
    minute: mode === "short" ? "2-digit" : undefined,
    year: mode === "long" ? "numeric" : undefined
  }).format(new Date(timestamp));
}
