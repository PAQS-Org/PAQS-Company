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
    <div class="px-4 py-2">
      <label for="timeframe" class="text-white mr-2">Select Timeframe:</label>
      <select
        id="timeframe"
        v-model="selectedTimeframe"
        @change="updateTimeframe"
      >
        <option value="year">Year</option>
        <option value="month">Month</option>
        <option value="day">Day</option>
      </select>
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
import { ref, onMounted, watch } from "vue";
import "chartjs-adapter-date-fns";
import { enUS } from "date-fns/locale";
import Chart from "chart.js/auto";
import { useTransactionStore } from "src/stores/dataFeed";

const lineChart = ref("line-chart");
const lineData = useTransactionStore();
const selectedTimeframe = ref("year");
let chartInstance = null;

const createChart = () => {
  const ctx = lineChart.value.getContext("2d");

  const data = lineData.filteredLineData;

  if (chartInstance) {
    chartInstance.destroy();
  }

  const config = {
    type: "line",
    data: {
      labels: data.map((item) => item.label),
      datasets: [
        {
          label: lineData.lineChartrange.year,
          backgroundColor: "#4c51bf",
          borderColor: "#4c51bf",
          data: data.map((item) => item.value),
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

const updateTimeframe = () => {
  const now = new Date();
  const newRange = { year: now.getFullYear(), month: null, day: null };

  if (selectedTimeframe.value === "month") {
    newRange.month = now.getMonth();
  } else if (selectedTimeframe.value === "day") {
    newRange.month = now.getMonth() + 1;
    newRange.day = now.getDate();
  }

  lineData.updateRange(newRange);
};

onMounted(async () => {
  await lineData.fetchLineData();
  createChart();
});

watch(
  () => lineData.filteredLineData,
  () => {
    createChart();
    console.log("Filtered Line Data:", lineData.filteredLineData);
  },
  { deep: true }
);
</script>
