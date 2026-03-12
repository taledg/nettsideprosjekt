# Oslo Børs Live

Et React + TypeScript-dashboard for å vise utviklingen på Oslo Børs, med tydelig skille mellom mockdata og en fremtidig ekte/proxy-basert datakilde.

## Filstruktur

```text
.
├─ index.html
├─ package.json
├─ tsconfig.json
├─ tsconfig.app.json
├─ tsconfig.node.json
├─ vite.config.ts
├─ .env.example
└─ src
   ├─ App.tsx
   ├─ main.tsx
   ├─ styles.css
   ├─ components
   │  ├─ DataStatusBanner.tsx
   │  ├─ Header.tsx
   │  ├─ IntervalTabs.tsx
   │  ├─ MarketChart.tsx
   │  ├─ MoversCard.tsx
   │  └─ StatePanel.tsx
   ├─ hooks
   │  └─ useOsloBorsData.ts
   ├─ services
   │  ├─ marketDataService.ts
   │  └─ providers
   │     ├─ mockOsloBorsProvider.ts
   │     └─ proxyOsloBorsProvider.ts
   ├─ types
   │  └─ market.ts
   └─ utils
      └─ format.ts
```

## Start appen

1. Installer avhengigheter:

```bash
npm install
```

2. Kopier `.env.example` til `.env` hvis du vil endre datakilde.

3. Start utviklingsserver:

```bash
npm run dev
```

4. Bygg for produksjon:

```bash
npm run build
```

## Datakilder

Denne løsningen later ikke som om mockdata er sanntidsdata.

- `mock`
  Bruker lokal demodata. UI merker dette tydelig som "Demodata".
- `proxy`
  Forventer en backend eller edge-proxy som henter ekte eller forsinkede markedsdata og returnerer samme JSON-format som frontend forventer.

Valg gjøres med `VITE_MARKET_DATA_PROVIDER`.

## Slik kobler du til ekte data senere

Frontend-koden bruker `MarketDataProvider` som abstraksjon. Derfor trenger du bare å:

1. Lage en backend-endepunkt som for eksempel:

```text
GET /api/oslobors?interval=1D
```

2. La endepunktet returnere denne strukturen:

```json
{
  "source": "proxy",
  "delayed": true,
  "exchangeName": "Oslo Børs",
  "lastUpdated": "2026-03-12T14:30:00.000Z",
  "interval": "1D",
  "currentIndex": 1228.6,
  "marketChangePercent": 1.47,
  "series": [
    { "timestamp": "2026-03-12T09:00:00.000Z", "value": 1211.3 }
  ],
  "gainers": [
    {
      "name": "Aker BP",
      "ticker": "AKRBP",
      "lastPrice": 289.4,
      "changePercent": 2.5
    }
  ],
  "losers": [
    {
      "name": "Tomra",
      "ticker": "TOM",
      "lastPrice": 138.3,
      "changePercent": -2.1
    }
  ]
}
```

3. Sette i `.env`:

```bash
VITE_MARKET_DATA_PROVIDER=proxy
VITE_PROXY_BASE_URL=http://localhost:8787
```

## Om ekte Oslo Børs-data

Oslo Børs-data er ofte lisensiert og/eller tilgjengelig via tredjepartsleverandører. Dersom leverandøren krever API-nøkkel eller har CORS-begrensninger, bør nøkkelen ligge i backend/proxy og aldri i frontend.

## Node-versjon

Vite 7 krever Node.js 20.19+ eller 22.12+ ifølge Vite-dokumentasjonen.
