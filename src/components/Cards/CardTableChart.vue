<template>
  <div
    class="relative h-full flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
  >
    <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
          <h6 class="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
            Product Statistics
          </h6>
          <h2 class="text-blueGray-700 text-xl font-semibold">
            Summary Report on : {{ selectedProduct }}
          </h2>
        </div>
      </div>
    </div>
    <div class="px-4 py-2 flex inline">
      <h4 class="mr-5 mt-2">Select the Product:</h4>
      <!-- search -->
      <q-select
        v-model="selectedProduct"
        :options="distinctProducts"
        transition-show="jump-up"
        transition-hide="jump-up"
        label="Product Name"
        style="width: 150px"
        clearable
        @update:model-value="updateStats"
      />
    </div>

    <div class="flex flex-wrap">
      <div class="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
        <DetailCard
          header-title="Checkout"
          header-title2="Scanned"
          :first-title="'Checkout Today'"
          :first-title-val="checkoutToday"
          :first-title-val1="checkoutPrevDay"
          first-icon="fas fa-calendar-day"
          :second-title="'Checkout this Month'"
          :second-title-val="checkoutMonth"
          :second-title-val1="checkoutPrevMonth"
          second-icon="fas fa-calendar-days"
          :third-title="'Checkout this Year'"
          :third-title-val="checkoutYear"
          :third-title-val1="checkoutPrevYear"
          third-icon="fas fa-calendar"
          :fourth-title="'Scan Today'"
          :fourth-title-val="ScanToday"
          :fourth-title-val1="ScanPrevToday"
          fourth-icon="fas fa-calendar-day"
          fourth-icon-color="color:#0080ff"
          :fifth-title="'Scan this Month'"
          :fifth-title-val="ScanMonth"
          :fifth-title-val1="ScanPrevMonth"
          fifth-icon="fas fa-calendar-days"
          fifth-icon-color="color:#0080ff"
          :sixth-title="'Scan this Year'"
          :sixth-title-val="ScanYear"
          :sixth-title-val1="ScanPrevYear"
          sixth-icon="fas fa-calendar"
          sixth-icon-color="color:#0080ff"
        />
      </div>
      <div class="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
        <DetailCard
          header-title="Acceptance"
          header-title2="Location"
          :first-title="'Conversion rate'"
          :first-title-val="`${conversionRate} %`"
          first-icon-plus="../../../src/assets/img/svg/cons.svg"
          :second-title="'Highest Checkout'"
          :second-title3="highestCheckoutMonth"
          :second-title-val3="highestCheckoutMonthVal"
          :second-title4="highestCheckoutYear"
          :second-title-val4="highestCheckoutYearVal"
          :third-title="'Lowest Checkout'"
          :third-title3="lowestCheckoutMonth"
          :third-title-val3="lowestCheckoutMonthVal"
          :third-title4="lowestCheckoutYear"
          :third-title-val4="lowestCheckoutYearVal"
          :fourth-title="'Highest Checkout Per Location'"
          :fourth-title-val="highestCheckoutPerLocationVal"
          :fourth-title-val2="highestCheckoutPerLocation"
          :fifth-title="'Median Checkout Per Location'"
          :fifth-title-val="medianCheckoutPerLocationVal"
          :fifth-title-val2="medianCheckoutPerLocation"
          :sixth-title="'Lowest Checkout Per Location'"
          :sixth-title-val="lowestCheckoutPerLocationVal"
          :sixth-title-val2="lowestCheckoutPerLocation"
          fourth-icon="fas fa-up-long"
          fourth-icon-color="color:#00FF00"
          fifth-icon="fas fa-minus"
          fifth-icon-color="color:#FFBF00"
          sixth-icon="fas fa-down-long"
          sixth-icon-color="color:#DC143C"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, watch } from "vue";
import DetailCard from "./DetailCard.vue";
import { useTransactionStore } from "src/stores/dataFeed";

const prodInfo = useTransactionStore();

const selectedProduct = ref(null);

const distinctProducts = computed(() => {
  return prodInfo.lineChartData
    .map((item) => item.productName)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort((a, b) => a - b);
});

const checkoutToday = computed(() => {
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.checkoutMetrics(selectedProduct.value).completed
    .currentDayMetrics;
  return metrics;
});
const checkoutPrevDay = computed(() => {
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.checkoutMetrics(selectedProduct.value).completed
    .prevDayMetrics;
  return metrics;
});
const checkoutMonth = computed(() => {
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.checkoutMetrics(selectedProduct.value).completed
    .currentMonthMetrics;
  return metrics;
});
const checkoutPrevMonth = computed(() => {
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.checkoutMetrics(selectedProduct.value).completed
    .prevMonthMetrics;
  return metrics;
});
const checkoutYear = computed(() => {
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.checkoutMetrics(selectedProduct.value).completed
    .currentYearMetrics;
  return metrics;
});
const checkoutPrevYear = computed(() => {
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.checkoutMetrics(selectedProduct.value).completed
    .prevYearMetrics;
  return metrics;
});
const ScanToday = computed(() => {
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.checkoutMetrics(selectedProduct.value).scanned
    .currentDayMetrics;
  return metrics;
});
const ScanPrevToday = computed(() => {
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.checkoutMetrics(selectedProduct.value).scanned
    .prevDayMetrics;
  return metrics;
});
const ScanMonth = computed(() => {
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.checkoutMetrics(selectedProduct.value).scanned
    .currentMonthMetrics;
  return metrics;
});
const ScanPrevMonth = computed(() => {
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.checkoutMetrics(selectedProduct.value).scanned
    .prevMonthMetrics;
  return metrics;
});
const ScanYear = computed(() => {
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.checkoutMetrics(selectedProduct.value).scanned
    .currentYearMetrics;
  return metrics;
});
const ScanPrevYear = computed(() => {
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.checkoutMetrics(selectedProduct.value).scanned
    .prevYearMetrics;
  return metrics;
});

const conversionRate = computed(() => {
  if (!selectedProduct.value) return 0;
  return prodInfo.conversionRate(selectedProduct.value);
});

const highestCheckoutMonth = computed(() => {
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.highestCheckout(selectedProduct.value).highestMonthly
    .month;
  return metrics;
});
const highestCheckoutMonthVal = computed(() => {
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.highestCheckout(selectedProduct.value).highestMonthly
    .count;
  return metrics;
});
const highestCheckoutYear = computed(() => {
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.highestCheckout(selectedProduct.value).highestYearly
    .year;
  return metrics;
});
const highestCheckoutYearVal = computed(() => {
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.highestCheckout(selectedProduct.value).highestYearly
    .count;
  return metrics;
});

const lowestCheckoutMonth = computed(() => {
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.lowestCheckout(selectedProduct.value).lowestMonthly
    .month;
  return metrics;
});
const lowestCheckoutMonthVal = computed(() => {
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.lowestCheckout(selectedProduct.value).lowestMonthly
    .count;
  return metrics;
});
const lowestCheckoutYear = computed(() => {
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.lowestCheckout(selectedProduct.value).lowestYearly
    .year;
  return metrics;
});
const lowestCheckoutYearVal = computed(() => {
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.lowestCheckout(selectedProduct.value).lowestYearly
    .count;
  return metrics;
});

const highestCheckoutPerLocation = computed(() => {
  // This should calculate the median; currently using highest as placeholder
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.highestCheckoutPerLocation(
    selectedProduct.value
  ).location;
  return metrics;
});
const highestCheckoutPerLocationVal = computed(() => {
  // This should calculate the median; currently using highest as placeholder
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.highestCheckoutPerLocation(
    selectedProduct.value
  ).count;
  return metrics;
});

const medianCheckoutPerLocation = computed(() => {
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.medianCheckoutPerLocation(
    selectedProduct.value
  ).location;
  return metrics;
});
const medianCheckoutPerLocationVal = computed(() => {
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.medianCheckoutPerLocation(
    selectedProduct.value
  ).count;
  return metrics;
});

const lowestCheckoutPerLocation = computed(() => {
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.lowestCheckoutPerLocation(
    selectedProduct.value
  ).location;
  return metrics;
});
const lowestCheckoutPerLocationVal = computed(() => {
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.lowestCheckoutPerLocation(
    selectedProduct.value
  ).count;
  return metrics;
});

const updateStats = (value) => {
  selectedProduct.value = value;
};

watch(selectedProduct, (newVal) => {
  if (newVal) {
    updateStats(newVal);
  }
});
</script>
