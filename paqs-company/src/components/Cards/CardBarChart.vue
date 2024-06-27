<template>
  <div
    class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
  >
    <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
          <h6 class="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
            Location Statistics
          </h6>
          <h2 class="text-blueGray-700 text-xl font-semibold">
            Top 5 Locations with total scan vs completed scan
          </h2>
        </div>
      </div>
    </div>
    <div class="px-4 py-2 flex inline">
      <h4 class="mr-2 text-white">Select the criteria and range:</h4>
      <div class="mr-4">
        <q-select
          bg-color="white"
          transition-show="jump-up"
          transition-hide="jump-up"
          v-model="selectCriteria"
          :options="criteria"
          label="Location"
          style="width: 150px"
          clearable
          @update:model-value="updateChart"
        />
      </div>
      <div>
        <q-select
          transition-show="jump-up"
          transition-hide="jump-up"
          v-model="selectRange"
          :options="range"
          label="Range"
          style="width: 150px"
          clearable
          @update:model-value="updateChart"
        />
      </div>
    </div>
    <div class="p-4 flex-auto">
      <div class="relative h-350-px">
        <canvas ref="barChart" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { Chart } from "chart.js/auto";
import { useTransactionStore } from "src/stores/dataFeed";

const barChart = ref("bar-chart");
const selectCriteria = ref("Region");
const criteria = ref(["Region", "City", "Town", "Locality"]);
const selectRange = ref("High");
const range = ref(["High", "Low"]);

let chartInstance = null;

const BarData = useTransactionStore();

const barFilteredData = computed(() => {
  const crit = selectCriteria.value ? selectCriteria.value : "Region";
  const ran = selectRange.value ? selectRange.value : "High";

  const groupByField = (data, field) => {
    console.log(`Grouping by field: ${field}`);
    const grouped = data.reduce((acc, item) => {
      let key;
      if (field === "Region") {
        key = `${item.region}`;
      } else if (field === "City") {
        key = `${item.region}-${item.city}`;
      } else if (field === "Town") {
        key = `${item.city}-${item.town}`;
      } else if (field === "Locality") {
        key = `${item.city}-${item.town}-${item.locality}`;
      } else {
        key = item[field.toLowerCase()];
      }
      if (!acc[key]) acc[key] = [];
      acc[key].push(parseFloat(item.value));
      return acc;
    }, {});
    return Object.keys(grouped).map((key) => ({
      key,
      avgValue: grouped[key].reduce((a, b) => a + b, 0) / grouped[key].length,
    }));
  };

  const sortAndSliceData = (data) => {
    const sorted = data.sort((a, b) => b.avgValue - a.avgValue);
    return ran === "High" ? sorted.slice(0, 10) : sorted.slice(-10).reverse();
  };

  const barScanData = groupByField(BarData.BarScanChartData, crit);
  const barCompleteData = groupByField(BarData.BarCompleteChartData, crit);

  console.log(`Filtered Bar Scan Data: ${JSON.stringify(barScanData)}`);
  console.log(`Filtered Bar Complete Data: ${JSON.stringify(barCompleteData)}`);

  return {
    crit,
    barScanFilter: sortAndSliceData(barScanData),
    barCompleteFilter: sortAndSliceData(barCompleteData),
  };
});

const createChart = () => {
  const ctx = barChart.value.getContext("2d");

  if (chartInstance) {
    chartInstance.destroy();
  }

  const { crit, barScanFilter, barCompleteFilter } = barFilteredData.value;

  const config = {
    type: "bar",
    data: {
      labels: barScanFilter.map((item) => item.key),
      datasets: [
        {
          label: "Total Scans",
          backgroundColor: "#4c51bf",
          borderColor: "#4c51bf",
          data: barScanFilter.map((item) => item.avgValue),
          fill: false,
        },
        {
          label: "Completed Scans",
          backgroundColor: "#ff6384",
          borderColor: "#ff6384",
          data: barCompleteFilter.map((item) => item.avgValue),
          fill: false,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      tooltips: {
        mode: "index",
        intersect: false,
      },
      hover: {
        mode: "nearest",
        intersect: true,
      },
      legend: {
        labels: {
          fontColor: "rgba(0,0,0,.4)",
        },
        align: "end",
        position: "bottom",
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: crit,
            },
            gridLines: {
              borderDash: [2],
              borderDashOffset: [2],
              color: "rgba(33, 37, 41, 0.3)",
              zeroLineColor: "rgba(33, 37, 41, 0.3)",
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: false,
              labelString: "Value",
            },
            gridLines: {
              borderDash: [2],
              drawBorder: false,
              borderDashOffset: [2],
              color: "rgba(33, 37, 41, 0.2)",
              zeroLineColor: "rgba(33, 37, 41, 0.15)",
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
            },
          },
        ],
      },
    },
  };
  console.log("Parsed Data", config.data);
  chartInstance = new Chart(ctx, config);
};

onMounted(async () => {
  await BarData.fetchBarScanData();
  await BarData.fetchBarCompleteData();
  createChart();
});

const updateChart = () => {
  createChart();
};

watch(
  () => [selectCriteria.value, selectRange.value],
  () => {
    updateChart();
  }
);
</script>
