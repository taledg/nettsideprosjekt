const STORAGE_KEY = "okonomiTrackerData";
const currencyFormatter = new Intl.NumberFormat("nb-NO", {
  style: "currency",
  currency: "NOK",
  maximumFractionDigits: 0
});

const formElements = {
  startCapital: document.getElementById("startCapital"),
  monthlySaving: document.getElementById("monthlySaving"),
  annualReturn: document.getElementById("annualReturn"),
  goalAmount: document.getElementById("goalAmount")
};

const investmentElements = {
  form: document.getElementById("investmentForm"),
  name: document.getElementById("investmentName"),
  value: document.getElementById("investmentValue"),
  error: document.getElementById("investmentError"),
  tableBody: document.getElementById("investmentTableBody")
};

const dashboardElements = {
  portfolioValue: document.getElementById("portfolioValue"),
  currentCapital: document.getElementById("currentCapital"),
  tenYearValue: document.getElementById("tenYearValue"),
  goalTime: document.getElementById("goalTime"),
  forecast1: document.getElementById("forecast1"),
  forecast5: document.getElementById("forecast5"),
  forecast10: document.getElementById("forecast10"),
  heroGoalProgress: document.getElementById("heroGoalProgress"),
  heroGoalText: document.getElementById("heroGoalText")
};

const chartButtons = document.querySelectorAll(".toggle-button");

let state = {
  startCapital: 150000,
  monthlySaving: 8000,
  annualReturn: 7,
  goalAmount: 1000000,
  chartPeriod: "monthly",
  investments: [
    { id: crypto.randomUUID(), name: "Global indeksfond", value: 85000 },
    { id: crypto.randomUUID(), name: "Hoyrentekonto", value: 42000 }
  ]
};

let forecastChart;

// Leser tidligere lagrede data slik at brukerens tall blir med mellom besok.
function loadData() {
  const rawData = localStorage.getItem(STORAGE_KEY);

  if (!rawData) {
    syncFormWithState();
    return;
  }

  try {
    const parsedData = JSON.parse(rawData);
    state = {
      ...state,
      ...parsedData,
      investments: Array.isArray(parsedData.investments) ? parsedData.investments : state.investments,
      chartPeriod: parsedData.chartPeriod === "yearly" ? "yearly" : "monthly"
    };
  } catch (error) {
    console.error("Kunne ikke laste lagrede data:", error);
  }

  syncFormWithState();
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function syncFormWithState() {
  formElements.startCapital.value = state.startCapital;
  formElements.monthlySaving.value = state.monthlySaving;
  formElements.annualReturn.value = state.annualReturn;
  formElements.goalAmount.value = state.goalAmount;
  updateChartToggle();
}

function parsePositiveNumber(value) {
  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) && parsedValue >= 0 ? parsedValue : 0;
}

function getPortfolioTotal() {
  return state.investments.reduce((sum, investment) => sum + investment.value, 0);
}

function getCurrentBalance() {
  return state.startCapital + getPortfolioTotal();
}

// Simulerer utviklingen med manedlig sparing og renters rente over valgt periode.
function calculateForecast(years = 10) {
  const monthlyRate = state.annualReturn / 100 / 12;
  const totalMonths = years * 12;
  let balance = getCurrentBalance();
  const monthlyData = [];
  const yearlyData = [];

  for (let month = 1; month <= totalMonths; month += 1) {
    balance = balance * (1 + monthlyRate) + state.monthlySaving;

    monthlyData.push({
      label: `M${month}`,
      value: balance
    });

    if (month % 12 === 0) {
      yearlyData.push({
        label: `Ar ${month / 12}`,
        value: balance
      });
    }
  }

  return {
    oneYear: monthlyData[11]?.value ?? balance,
    fiveYear: monthlyData[59]?.value ?? balance,
    tenYear: monthlyData[119]?.value ?? balance,
    monthlyData,
    yearlyData
  };
}

function calculateGoalTime() {
  const currentBalance = getCurrentBalance();

  if (state.goalAmount <= 0) {
    return "Legg inn et malbelop";
  }

  if (currentBalance >= state.goalAmount) {
    return "Mallet er allerede nadd";
  }

  const monthlyRate = state.annualReturn / 100 / 12;
  let simulatedBalance = currentBalance;

  for (let month = 1; month <= 600; month += 1) {
    simulatedBalance = simulatedBalance * (1 + monthlyRate) + state.monthlySaving;

    if (simulatedBalance >= state.goalAmount) {
      const years = Math.floor(month / 12);
      const remainingMonths = month % 12;
      const yearText = years > 0 ? `${years} ar` : "";
      const monthText = remainingMonths > 0 ? `${remainingMonths} mnd` : "";
      return [yearText, monthText].filter(Boolean).join(" og ");
    }
  }

  return "Mer enn 50 ar";
}

function renderEmptyInvestments() {
  investmentElements.tableBody.innerHTML = `
    <tr>
      <td colspan="3" class="empty-state">Ingen investeringer registrert enna.</td>
    </tr>
  `;
}

// Bygger tabellen med DOM-noder i stedet for HTML-strenger for tryggere rendering.
function renderInvestments() {
  const { tableBody } = investmentElements;
  tableBody.innerHTML = "";

  if (state.investments.length === 0) {
    renderEmptyInvestments();
    return;
  }

  state.investments.forEach((investment) => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const valueCell = document.createElement("td");
    const actionCell = document.createElement("td");
    const deleteButton = document.createElement("button");

    nameCell.textContent = investment.name;
    valueCell.className = "table-value";
    valueCell.textContent = formatCurrency(investment.value);

    deleteButton.type = "button";
    deleteButton.className = "secondary-button";
    deleteButton.dataset.id = investment.id;
    deleteButton.textContent = "Slett";

    actionCell.appendChild(deleteButton);
    row.append(nameCell, valueCell, actionCell);
    tableBody.appendChild(row);
  });
}

// Oppdaterer kortene og hero-feltet med nyeste summer, prognoser og malprogresjon.
function updateDashboard() {
  const portfolioTotal = getPortfolioTotal();
  const currentBalance = getCurrentBalance();
  const forecast = calculateForecast();
  const goalTime = calculateGoalTime();
  const goalProgress = state.goalAmount > 0 ? Math.min((currentBalance / state.goalAmount) * 100, 100) : 0;

  dashboardElements.portfolioValue.textContent = formatCurrency(portfolioTotal);
  dashboardElements.currentCapital.textContent = formatCurrency(currentBalance);
  dashboardElements.tenYearValue.textContent = formatCurrency(forecast.tenYear);
  dashboardElements.goalTime.textContent = goalTime;
  dashboardElements.forecast1.textContent = formatCurrency(forecast.oneYear);
  dashboardElements.forecast5.textContent = formatCurrency(forecast.fiveYear);
  dashboardElements.forecast10.textContent = formatCurrency(forecast.tenYear);
  dashboardElements.heroGoalProgress.textContent = `${goalProgress.toFixed(1)} %`;
  dashboardElements.heroGoalText.textContent =
    state.goalAmount > 0
      ? `${formatCurrency(currentBalance)} av ${formatCurrency(state.goalAmount)} spart mot boligmalet.`
      : "Legg inn et malbelop for a se progresjon.";
}

function updateChart() {
  const forecast = calculateForecast();
  const selectedData = state.chartPeriod === "yearly" ? forecast.yearlyData : forecast.monthlyData;
  const labels = selectedData.map((item) => item.label);
  const values = selectedData.map((item) => Math.round(item.value));

  if (forecastChart) {
    forecastChart.destroy();
  }

  const context = document.getElementById("forecastChart");

  forecastChart = new Chart(context, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Forventet verdi",
          data: values,
          borderColor: "#1d6b5d",
          backgroundColor: "rgba(29, 107, 93, 0.12)",
          fill: true,
          tension: 0.28,
          pointRadius: state.chartPeriod === "yearly" ? 4 : 0,
          pointHoverRadius: 5
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
              return ` ${formatCurrency(context.parsed.y)}`;
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
            maxTicksLimit: state.chartPeriod === "yearly" ? 10 : 12,
            color: "#5f6c7b"
          }
        },
        y: {
          ticks: {
            color: "#5f6c7b",
            callback(value) {
              return formatCurrency(value);
            }
          },
          grid: {
            color: "rgba(96, 108, 123, 0.12)"
          }
        }
      }
    }
  });
}

function updateChartToggle() {
  chartButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.period === state.chartPeriod);
  });
}

function formatCurrency(value) {
  return currencyFormatter.format(value);
}

// Leser verdier fra inputfeltene, rydder dem til tall og oppdaterer resten av siden.
function handleSettingsChange() {
  state.startCapital = parsePositiveNumber(formElements.startCapital.value);
  state.monthlySaving = parsePositiveNumber(formElements.monthlySaving.value);
  state.annualReturn = parsePositiveNumber(formElements.annualReturn.value);
  state.goalAmount = parsePositiveNumber(formElements.goalAmount.value);
  saveData();
  updateDashboard();
  updateChart();
}

function addInvestment(event) {
  event.preventDefault();

  const name = investmentElements.name.value.trim();
  const value = parsePositiveNumber(investmentElements.value.value);

  if (!name) {
    investmentElements.error.textContent = "Skriv inn et navn pa investeringen.";
    return;
  }

  if (value <= 0) {
    investmentElements.error.textContent = "Verdien ma vaere storre enn 0 kroner.";
    return;
  }

  state.investments.push({
    id: crypto.randomUUID(),
    name,
    value
  });

  investmentElements.error.textContent = "";
  investmentElements.form.reset();
  saveData();
  renderInvestments();
  updateDashboard();
  updateChart();
}

function deleteInvestment(event) {
  const target = event.target;

  if (!(target instanceof HTMLElement) || !target.matches("[data-id]")) {
    return;
  }

  const id = target.dataset.id;
  state.investments = state.investments.filter((investment) => investment.id !== id);
  saveData();
  renderInvestments();
  updateDashboard();
  updateChart();
}

// Samler event listeners ett sted for a gjore initialisering enklere a lese.
function attachEventListeners() {
  Object.values(formElements).forEach((input) => {
    input.addEventListener("input", handleSettingsChange);
  });

  investmentElements.form.addEventListener("submit", addInvestment);
  investmentElements.tableBody.addEventListener("click", deleteInvestment);

  chartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.chartPeriod = button.dataset.period;
      updateChartToggle();
      saveData();
      updateChart();
    });
  });
}

function initializeApp() {
  loadData();
  renderInvestments();
  updateDashboard();
  updateChart();
  attachEventListeners();
}

initializeApp();
