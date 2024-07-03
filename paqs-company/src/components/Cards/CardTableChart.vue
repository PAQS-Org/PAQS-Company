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
          :first-title="'Checkout per day'"
          :first-title-val="checkoutPerDay"
          first-icon="fas fa-calendar-day"
          :second-title="'Checkout per month'"
          :second-title-val="checkoutPerMonth"
          second-icon="fas fa-calendar-days"
          :third-title="'Checkout per year'"
          :third-title-val="checkoutPerYear"
          third-icon="fas fa-calendar"
          :fourth-title="'Scan per day'"
          :fourth-title-val="scanPerDay"
          fourth-icon="fas fa-calendar-day"
          fourth-icon-color="color:#0080ff"
          :fifth-title="'Scan per month'"
          :fifth-title-val="scanPerMonth"
          fifth-icon="fas fa-calendar-days"
          fifth-icon-color="color:#0080ff"
          :sixth-title="'Scan per year'"
          :sixth-title-val="scanPerYear"
          sixth-icon="fas fa-calendar"
          sixth-icon-color="color:#0080ff"
        />
      </div>
      <div class="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
        <DetailCard
          :first-title="'Conversion rate'"
          :first-title-val="conversionRate"
          first-icon-plus="../../../src/assets/img/svg/cons.svg"
          :second-title="'Highest Checkout Per day'"
          :second-title-val="highestCheckoutPerDay"
          :third-title="'Lowest Checkout Per day'"
          :third-title-val="lowestCheckoutPerDay"
          :fourth-title="'Highest Checkout Per Location'"
          :fourth-title-val="highestCheckoutPerLocation"
          :fifth-title="'Median Checkout Per Location'"
          :fifth-title-val="medianCheckoutPerLocation"
          :sixth-title="'Lowest Checkout Per Location'"
          :sixth-title-val="lowestCheckoutPerLocation"
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

// const productStats = computed(() => {
//   if (!selectedProduct.value) return {};
//   return prodInfo.productMetrics[selectedProduct.value] || {};
// });

const checkoutPerDay = computed(() => {
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.highestCheckout(selectedProduct.value).highestDaily;
  return metrics ? metrics.count : 0;
});

const checkoutPerMonth = computed(() => {
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.highestCheckout(
    selectedProduct.value
  ).highestMonthly;
  return metrics ? metrics.count : 0;
});

const checkoutPerYear = computed(() => {
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.highestCheckout(selectedProduct.value).highestYearly;
  return metrics ? metrics.count : 0;
});

const scanPerDay = computed(() => {
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.lowestCheckout(selectedProduct.value).lowestDaily;
  return metrics ? metrics.count : 0;
});

const scanPerMonth = computed(() => {
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.lowestCheckout(selectedProduct.value).lowestMonthly;
  return metrics ? metrics.count : 0;
});

const scanPerYear = computed(() => {
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.lowestCheckout(selectedProduct.value).lowestYearly;
  return metrics ? metrics.count : 0;
});

const conversionRate = computed(() => {
  if (!selectedProduct.value) return 0;
  const todayMetrics = prodInfo.checkoutMetrics.currentDayMetrics;
  return prodInfo.conversionRate(todayMetrics);
});

const highestCheckoutPerDay = computed(() => {
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.highestCheckout(selectedProduct.value).highestDaily;
  return metrics ? metrics.count : 0;
});

const lowestCheckoutPerDay = computed(() => {
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.lowestCheckout(selectedProduct.value).lowestDaily;
  return metrics ? metrics.count : 0;
});

const highestCheckoutPerLocation = computed(() => {
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.highestCheckoutPerLocation(selectedProduct.value);
  return metrics ? metrics.count : 0;
});

const medianCheckoutPerLocation = computed(() => {
  // This should calculate the median; currently using highest as placeholder
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.highestCheckoutPerLocation(selectedProduct.value);
  return metrics ? metrics.count : 0;
});

const lowestCheckoutPerLocation = computed(() => {
  if (!selectedProduct.value) return 0;
  const metrics = prodInfo.lowestCheckoutPerLocation(selectedProduct.value);
  return metrics ? metrics.count : 0;
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
