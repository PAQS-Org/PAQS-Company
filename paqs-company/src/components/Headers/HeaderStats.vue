<template>
  <!-- Header -->
  <div class="relative bg-image-2 md:pt-32 pb-32 pt-12">
    <div class="px-4 md:px-10 mx-auto w-full">
      <div>
        <!-- Card stats -->
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4" v-if="totalScanComplete">
            <card-stats
              stat-subtitle="TOTAL SCAN COMPLETE"
              :stat-title="totalScanComplete.total"
              stat-arrow="../../../src/assets/img/svg/avg.svg"
              :stat-percent="totalScanComplete.average"
              stat-percent-color="text-emerald-500"
              :stat-descripiron="`For the month of ${currentMonth}`"
              stat-icon-name="fas fa-bolt"
              stat-icon-color="bg-red-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4" v-if="totalScan">
            <card-stats
              stat-subtitle="TOTAL SCAN"
              :stat-title="totalScan.total"
              stat-arrow="../../../src/assets/img/svg/avg.svg"
              :stat-percent="totalScan.average"
              stat-percent-color="text-red-500"
              :stat-descripiron="`For the month of ${currentMonth}`"
              stat-icon-name="fas fa-qrcode"
              stat-icon-color="bg-orange-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4" v-if="topLocation">
            <card-stats
              stat-subtitle="TOP LOCATION"
              :stat-title="topLocation.location"
              stat-arrow="../../../src/assets/img/svg/cons.svg"
              :stat-complete="`Checkout: ${topLocation.completed}`"
              :stat-scan="`Scans: ${topLocation.scanned}`"
              :stat-percent="`${topLocation.conversionRate} %`"
              stat-percent-color="text-orange-500"
              :stat-descripiron="topLocation.reigningProduct"
              stat-icon-name="fas fa-map-pin"
              stat-icon-color="bg-pink-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              stat-subtitle="PERFORMANCE"
              stat-title="49,65%"
              stat-arrow="up"
              stat-percent="12"
              stat-percent-color="text-emerald-500"
              stat-descripiron="Since last month"
              stat-icon-name="fas fa-percent"
              stat-icon-color="bg-emerald-500"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useTransactionStore } from "../../stores/dataFeed";
import CardStats from "../Cards/CardStats.vue";

const store = useTransactionStore();

const totalScanComplete = computed(() => store.totalScanCompleteForMonth);
const totalScan = computed(() => store.totalScanForMonth);
const topLocation = computed(() => store.topLocation);
const currentMonth = new Date().toLocaleString("default", { month: "long" });
</script>
<style scoped></style>
