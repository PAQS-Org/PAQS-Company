<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700"
  >
    <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
          <h6 class="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
            Overview
          </h6>
          <h2 class="text-white text-xl font-semibold">
            TOTAL SCAN VS COMPLETED SCANS
          </h2>
        </div>
      </div>
    </div>
    <div class="px-4 py-2 flex inline">
      <h4 class="mr-2 text-white">Select the year and month:</h4>
      <div class="mr-4">
        <q-select
          bg-color="white"
          transition-show="jump-up"
          transition-hide="jump-up"
          v-model="selectedYear"
          :options="yearOptions"
          label="Year"
          style="width: 150px"
          clearable
          @update:model-value="updateChart"
        />
      </div>
      <div>
        <q-select
          bg-color="white"
          transition-show="jump-up"
          transition-hide="jump-up"
          v-model="selectedMonth"
          :options="monthOptions"
          label="Month"
          style="width: 150px"
          clearable
          @update:model-value="updateChart"
        />
      </div>
    </div>

    <div class="p-4 flex-auto">
      <!-- Chart -->
      <div class="relative h-350-px">
        <canvas ref="lineChart" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed, watch } from "vue";
import "chartjs-adapter-date-fns";
import { enUS } from "date-fns/locale";
import Chart from "chart.js/auto";
import { useTransactionStore } from "src/stores/dataFeed";

const lineChart = ref("line-chart");
const lineData = useTransactionStore();
const selectedYear = ref(null);
const selectedMonth = ref(null);
let chartInstance = null;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const yearOptions = computed(() => {
  return lineData.lineChartData
    .map((item) => new Date(item.date).getFullYear())
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort((a, b) => a - b);
});

const monthOptions = months.map((month, index) => ({
  label: month,
  value: index,
}));

const filteredData = computed(() => {
  const year = selectedYear.value ? parseInt(selectedYear.value) : null;
  const month = selectedMonth.value !== null ? selectedMonth.value.value : null;

  const lineFiltered = lineData.lineChartData
    .filter((item) => {
      const date = new Date(item.date);
      if (year !== null && month !== null) {
        return date.getFullYear() === year && date.getMonth() === month;
      } else if (year !== null) {
        return date.getFullYear() === year;
      } else if (month !== null) {
        return date.getMonth() === month;
      } else {
        return true;
      }
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const completedFiltered = lineData.CompletedChartData.filter((item) => {
    const date = new Date(item.date);
    if (year !== null && month !== null) {
      return date.getFullYear() === year && date.getMonth() === month;
    } else if (year !== null) {
      return date.getFullYear() === year;
    } else if (month !== null) {
      return date.getMonth() === month;
    } else {
      return true;
    }
  }).sort((a, b) => new Date(a.date) - new Date(b.date));

  return { lineFiltered, completedFiltered };
});

const xLabels = computed(() => {
  const { lineFiltered } = filteredData.value;
  return lineFiltered.map(
    (item) =>
      `${months[new Date(item.date).getMonth()]} ${new Date(
        item.date
      ).getFullYear()}`
  );
});
const createChart = () => {
  const ctx = lineChart.value.getContext("2d");

  if (chartInstance) {
    chartInstance.destroy();
  }

  const { lineFiltered, completedFiltered } = filteredData.value;

  const config = {
    type: "line",
    data: {
      labels: xLabels.value,
      datasets: [
        {
          label: "Total Scans",
          backgroundColor: "#4c51bf",
          borderColor: "#4c51bf",
          data: lineFiltered.map((item) => item.value),
          fill: false,
        },
        {
          label: "Completed Scans",
          backgroundColor: "#ff6384",
          borderColor: "#ff6384",
          data: completedFiltered.map((item) => item.value),
          fill: false,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        x: {
          type: "category",
          adapters: {
            date: {
              locale: enUS,
            },
          },
          ticks: {
            color: "rgba(255,255,255,.7)",
          },
          grid: {
            display: false,
            color: "rgba(33, 37, 41, 0.3)",
          },
        },
        y: {
          ticks: {
            color: "rgba(255,255,255,.7)",
          },
          grid: {
            color: "rgba(255, 255, 255, 0.15)",
          },
        },
      },
    },
  };

  chartInstance = new Chart(ctx, config);
};

onMounted(async () => {
  await lineData.fetchLineData();
  await lineData.fetchCompletedData();
  createChart();
});

const updateChart = () => {
  createChart();
};

watch(
  () => [selectedYear.value, selectedMonth.value],
  () => {
    updateChart();
  }
);
</script>
