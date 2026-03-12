const STORAGE_KEY = "osloBorsOversiktState";

const MARKET_DATA = {
  periods: {
    "1d": {
      label: "1 dag",
      points: [
        { label: "09:00", value: 1211 },
        { label: "10:00", value: 1215 },
        { label: "11:00", value: 1214 },
        { label: "12:00", value: 1219 },
        { label: "13:00", value: 1221 },
        { label: "14:00", value: 1220 },
        { label: "15:00", value: 1224 },
        { label: "16:00", value: 1228 }
      ]
    },
    "1w": {
      label: "1 uke",
      points: [
        { label: "Man", value: 1196 },
        { label: "Tir", value: 1204 },
        { label: "Ons", value: 1212 },
        { label: "Tor", value: 1219 },
        { label: "Fre", value: 1228 }
      ]
    },
    "1m": {
      label: "1 måned",
      points: [
        { label: "Uke 1", value: 1178 },
        { label: "Uke 2", value: 1189 },
        { label: "Uke 3", value: 1201 },
        { label: "Uke 4", value: 1214 },
        { label: "Nå", value: 1228 }
      ]
    },
    "6m": {
      label: "6 måneder",
      points: [
        { label: "Okt", value: 1096 },
        { label: "Nov", value: 1128 },
        { label: "Des", value: 1143 },
        { label: "Jan", value: 1165 },
        { label: "Feb", value: 1191 },
        { label: "Mar", value: 1228 }
      ]
    },
    "1y": {
      label: "1 år",
      points: [
        { label: "Apr", value: 1038 },
        { label: "Jun", value: 1064 },
        { label: "Aug", value: 1108 },
        { label: "Okt", value: 1120 },
        { label: "Des", value: 1168 },
        { label: "Feb", value: 1204 },
        { label: "Nå", value: 1228 }
      ]
    },
    "3y": {
      label: "3 år",
      points: [
        { label: "2023", value: 864 },
        { label: "2024", value: 986 },
        { label: "2025", value: 1138 },
        { label: "2026", value: 1228 }
      ]
    }
  },
  sectors: [
    {
      name: "Energi",
      description: "Olje, gass og energiservice med sterk eksporteksponering.",
      changes: { "1d": 1.8, "1w": 3.7, "1m": 6.2, "6m": 14.8, "1y": 18.4, "3y": 39.5 }
    },
    {
      name: "Sjømat",
      description: "Oppdrett og eksport drevet av pris, volum og valutabevegelser.",
      changes: { "1d": -0.4, "1w": 1.3, "1m": 4.6, "6m": 8.1, "1y": 11.2, "3y": 22.7 }
    },
    {
      name: "Finans",
      description: "Bank og forsikring med stabil lønnsomhet og utbyttefokus.",
      changes: { "1d": 0.7, "1w": 2.5, "1m": 5.1, "6m": 9.2, "1y": 16.7, "3y": 30.4 }
    },
    {
      name: "Industri",
      description: "Sykliske selskaper knyttet til shipping, materialer og produksjon.",
      changes: { "1d": -1.1, "1w": -0.6, "1m": 2.8, "6m": 7.3, "1y": 12.6, "3y": 25.8 }
    },
    {
      name: "Teknologi",
      description: "Programvare og digitale tjenester med høyere vekstprofil.",
      changes: { "1d": 1.2, "1w": 4.1, "1m": 7.4, "6m": 19.7, "1y": 26.9, "3y": 51.3 }
    }
  ],
  stocks: [
    { name: "Aker BP", sector: "Energi", changes: { "1d": 2.1, "1w": 4.2, "1m": 7.9, "6m": 13.7, "1y": 17.8, "3y": 35.2 } },
    { name: "Equinor", sector: "Energi", changes: { "1d": 1.7, "1w": 3.8, "1m": 6.5, "6m": 12.9, "1y": 16.4, "3y": 27.3 } },
    { name: "Vår Energi", sector: "Energi", changes: { "1d": 2.9, "1w": 5.1, "1m": 8.6, "6m": 15.2, "1y": 19.4, "3y": 31.8 } },
    { name: "Mowi", sector: "Sjømat", changes: { "1d": -0.6, "1w": 1.1, "1m": 4.4, "6m": 7.8, "1y": 10.2, "3y": 18.7 } },
    { name: "SalMar", sector: "Sjømat", changes: { "1d": 0.3, "1w": 1.7, "1m": 5.9, "6m": 9.4, "1y": 12.3, "3y": 23.5 } },
    { name: "Lerøy Seafood", sector: "Sjømat", changes: { "1d": -1.3, "1w": -0.4, "1m": 2.2, "6m": 6.1, "1y": 8.6, "3y": 15.9 } },
    { name: "DNB", sector: "Finans", changes: { "1d": 0.9, "1w": 2.8, "1m": 5.6, "6m": 10.8, "1y": 18.1, "3y": 29.6 } },
    { name: "Storebrand", sector: "Finans", changes: { "1d": 0.6, "1w": 2.1, "1m": 4.8, "6m": 8.7, "1y": 15.9, "3y": 26.4 } },
    { name: "SpareBank 1 SMN", sector: "Finans", changes: { "1d": -0.2, "1w": 1.4, "1m": 3.5, "6m": 7.9, "1y": 14.2, "3y": 24.1 } },
    { name: "Yara", sector: "Industri", changes: { "1d": -1.5, "1w": -0.9, "1m": 1.8, "6m": 6.3, "1y": 9.4, "3y": 17.2 } },
    { name: "Tomra", sector: "Industri", changes: { "1d": -2.2, "1w": -1.8, "1m": 0.7, "6m": 5.1, "1y": 7.3, "3y": 11.4 } },
    { name: "Kongsberg Gruppen", sector: "Industri", changes: { "1d": 1.1, "1w": 3.4, "1m": 6.9, "6m": 18.8, "1y": 28.7, "3y": 61.9 } },
    { name: "Kahoot!", sector: "Teknologi", changes: { "1d": 1.5, "1w": 4.7, "1m": 8.1, "6m": 20.3, "1y": 24.8, "3y": 42.7 } },
    { name: "Crayon", sector: "Teknologi", changes: { "1d": 2.4, "1w": 5.2, "1m": 9.6, "6m": 22.7, "1y": 31.4, "3y": 54.6 } },
    { name: "Atea", sector: "Teknologi", changes: { "1d": 0.8, "1w": 2.9, "1m": 5.2, "6m": 11.3, "1y": 17.9, "3y": 28.5 } }
  ]
};

const elements = {
  buttons: document.querySelectorAll(".toggle-button"),
  marketChange: document.getElementById("marketChange"),
  marketSummary: document.getElementById("marketSummary"),
  marketLevel: document.getElementById("marketLevel"),
  bestSector: document.getElementById("bestSector"),
  mainIndexValue: document.getElementById("mainIndexValue"),
  mainIndexRange: document.getElementById("mainIndexRange"),
  selectedChange: document.getElementById("selectedChange"),
  selectedChangeLabel: document.getElementById("selectedChangeLabel"),
  positiveSectors: document.getElementById("positiveSectors"),
  sectorPulse: document.getElementById("sectorPulse"),
  largestMove: document.getElementById("largestMove"),
  largestMoveLabel: document.getElementById("largestMoveLabel"),
  chartDescription: document.getElementById("chartDescription"),
  sectorGrid: document.getElementById("sectorGrid"),
  gainersBody: document.getElementById("gainersBody"),
  losersBody: document.getElementById("losersBody"),
  marketChart: document.getElementById("marketChart")
};

let state = {
  selectedPeriod: "1m"
};

let marketChart;

function loadData() {
  const savedState = localStorage.getItem(STORAGE_KEY);

  if (!savedState) {
    updatePeriodButtons();
    return;
  }

  try {
    const parsedState = JSON.parse(savedState);

    if (MARKET_DATA.periods[parsedState.selectedPeriod]) {
      state.selectedPeriod = parsedState.selectedPeriod;
    }
  } catch (error) {
    console.error("Kunne ikke laste lagret tilstand:", error);
  }

  updatePeriodButtons();
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getCurrentPeriodData() {
  return MARKET_DATA.periods[state.selectedPeriod];
}

function calculatePeriodChange() {
  const points = getCurrentPeriodData().points;
  const firstValue = points[0].value;
  const lastValue = points[points.length - 1].value;
  return ((lastValue - firstValue) / firstValue) * 100;
}

function getIndexStats() {
  const points = getCurrentPeriodData().points;
  const values = points.map((point) => point.value);
  return {
    current: values[values.length - 1],
    high: Math.max(...values),
    low: Math.min(...values)
  };
}

function getSectorPerformance() {
  return MARKET_DATA.sectors.map((sector) => ({
    ...sector,
    change: sector.changes[state.selectedPeriod]
  }));
}

function getSortedStocks() {
  return [...MARKET_DATA.stocks]
    .map((stock) => ({
      ...stock,
      change: stock.changes[state.selectedPeriod]
    }))
    .sort((a, b) => b.change - a.change);
}

function updateDashboard() {
  const periodLabel = getCurrentPeriodData().label;
  const change = calculatePeriodChange();
  const stats = getIndexStats();
  const sectors = getSectorPerformance();
  const bestSector = sectors.reduce((best, current) => (current.change > best.change ? current : best));
  const positiveSectorCount = sectors.filter((sector) => sector.change >= 0).length;
  const sortedStocks = getSortedStocks();
  const mostVolatile = [...sortedStocks].sort((a, b) => Math.abs(b.change) - Math.abs(a.change))[0];

  elements.marketChange.textContent = formatPercent(change);
  elements.marketChange.className = getChangeClassName(change);
  elements.marketSummary.textContent = `OBX har beveget seg ${formatPercent(change)} i løpet av ${periodLabel.toLowerCase()}.`;
  elements.marketLevel.textContent = formatIndex(stats.current);
  elements.bestSector.textContent = `${bestSector.name} ${formatPercent(bestSector.change)}`;

  elements.mainIndexValue.textContent = formatIndex(stats.current);
  elements.mainIndexRange.textContent = `Høy ${formatIndex(stats.high)} / Lav ${formatIndex(stats.low)}`;
  elements.selectedChange.textContent = formatPercent(change);
  elements.selectedChange.className = getChangeClassName(change);
  elements.selectedChangeLabel.textContent = `Utvikling siste ${periodLabel.toLowerCase()}`;
  elements.positiveSectors.textContent = `${positiveSectorCount} av ${sectors.length}`;
  elements.sectorPulse.textContent = positiveSectorCount >= 3 ? "Bred styrke i markedet" : "Forsiktig sektorbredde";
  elements.largestMove.textContent = `${mostVolatile.name} ${formatPercent(mostVolatile.change)}`;
  elements.largestMove.className = getChangeClassName(mostVolatile.change);
  elements.largestMoveLabel.textContent = `Størst utslag siste ${periodLabel.toLowerCase()}`;
  elements.chartDescription.textContent = `Grafen viser OBX-utviklingen for ${periodLabel.toLowerCase()}.`;
}

function renderSectors() {
  const sectors = getSectorPerformance();
  elements.sectorGrid.innerHTML = "";

  sectors.forEach((sector) => {
    const card = document.createElement("article");
    const title = document.createElement("h3");
    const value = document.createElement("span");
    const description = document.createElement("p");

    card.className = "sector-card";
    title.textContent = sector.name;
    value.className = `sector-value ${getChangeClassName(sector.change)}`;
    value.textContent = formatPercent(sector.change);
    description.textContent = sector.description;

    card.append(title, value, description);
    elements.sectorGrid.appendChild(card);
  });
}

function renderLeadersAndLosers() {
  const sortedStocks = getSortedStocks();
  const gainers = sortedStocks.slice(0, 3);
  const losers = sortedStocks.slice(-3).reverse();

  renderTable(elements.gainersBody, gainers);
  renderTable(elements.losersBody, losers);
}

function renderTable(target, stocks) {
  target.innerHTML = "";

  stocks.forEach((stock) => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const sectorCell = document.createElement("td");
    const changeCell = document.createElement("td");
    const nameWrap = document.createElement("div");
    const stockName = document.createElement("div");
    const stockMeta = document.createElement("div");
    const changePill = document.createElement("span");

    stockName.className = "ticker-name";
    stockName.textContent = stock.name;
    stockMeta.className = "ticker-meta";
    stockMeta.textContent = "Oslo Børs";
    nameWrap.append(stockName, stockMeta);
    nameCell.appendChild(nameWrap);

    sectorCell.textContent = stock.sector;

    changePill.className = `change-pill ${getChangeClassName(stock.change)}`;
    changePill.textContent = formatPercent(stock.change);
    changeCell.appendChild(changePill);

    row.append(nameCell, sectorCell, changeCell);
    target.appendChild(row);
  });
}

function updateChart() {
  const periodData = getCurrentPeriodData();
  const labels = periodData.points.map((point) => point.label);
  const values = periodData.points.map((point) => point.value);
  const rising = values[values.length - 1] >= values[0];

  if (marketChart) {
    marketChart.destroy();
  }

  marketChart = new Chart(elements.marketChart, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "OBX",
          data: values,
          fill: true,
          borderWidth: 3,
          borderColor: rising ? "#13795b" : "#c44949",
          backgroundColor: rising ? "rgba(19, 121, 91, 0.12)" : "rgba(196, 73, 73, 0.12)",
          tension: 0.32,
          pointRadius: 3,
          pointHoverRadius: 5,
          pointBackgroundColor: rising ? "#13795b" : "#c44949"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label(context) {
              return ` OBX ${formatIndex(context.parsed.y)}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: "#617182"
          }
        },
        y: {
          ticks: {
            color: "#617182"
          },
          grid: {
            color: "rgba(97, 113, 130, 0.12)"
          }
        }
      }
    }
  });
}

function updatePeriodButtons() {
  elements.buttons.forEach((button) => {
    button.classList.toggle("active", button.dataset.period === state.selectedPeriod);
  });
}

function formatPercent(value) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1).replace(".", ",")} %`;
}

function formatIndex(value) {
  return new Intl.NumberFormat("nb-NO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

function getChangeClassName(value) {
  return value >= 0 ? "is-positive" : "is-negative";
}

function handlePeriodChange(event) {
  const button = event.currentTarget;
  const nextPeriod = button.dataset.period;

  if (!MARKET_DATA.periods[nextPeriod]) {
    return;
  }

  state.selectedPeriod = nextPeriod;
  saveData();
  renderPage();
}

function attachEventListeners() {
  elements.buttons.forEach((button) => {
    button.addEventListener("click", handlePeriodChange);
  });
}

function renderPage() {
  updatePeriodButtons();
  updateDashboard();
  renderSectors();
  renderLeadersAndLosers();
  updateChart();
}

function initializeApp() {
  loadData();
  renderPage();
  attachEventListeners();
}

initializeApp();
