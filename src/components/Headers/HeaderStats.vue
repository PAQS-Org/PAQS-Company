<template>
  <!-- Header -->
  <div class="relative bg-image-2 md:pt-32 pb-32 pt-12">
    <div class="px-4 md:px-10 mx-auto w-full">
      <div>
        <!-- Card stats -->
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4" v-if="totalScanComplete">
            <card-stats
              stat-subtitle="TOTAL CHECKOUT"
              :stat-title="totalScanComplete.totalForMonth"
              stat-arrow="../../../src/assets/img/svg/avg.svg"
              :stat-percent="totalScanComplete.averageForYTD"
              stat-percent-color="text-emerald-500"
              :stat-descripiron="`Year-to-Date (YTD) for the month of ${currentMonth}`"
              stat-icon-name="fas fa-bolt"
              icon-color="color:#3e92d1"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4" v-if="totalScan">
            <card-stats
              stat-subtitle="TOTAL SCAN"
              :stat-title="totalScan.totalForMonth"
              stat-arrow="../../../src/assets/img/svg/avg.svg"
              :stat-percent="totalScan.averageForYTD"
              stat-percent-color="text-red-500"
              :stat-descripiron="`Year-to-Date (YTD) for the month of ${currentMonth}`"
              stat-icon-name="fas fa-qrcode"
              icon-color="color:#e59400"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4" v-if="topLocation">
            <card-stats
              stat-subtitle="TOP LOCATION"
              :stat-title2="topLocation.location"
              stat-arrow="../../../src/assets/img/svg/cons.svg"
              :stat-complete="`Checkout: ${topLocation.completed}`"
              :stat-scan="`Scans: ${topLocation.scanned}`"
              :stat-percent="`${topLocation.conversionRate} %`"
              stat-percent-color="text-orange-500"
              :stat-descripiron="`Product Name: ${topLocation.reigningProduct}`"
              stat-icon-name="fas fa-map-pin"
              icon-color="color: #c3352b"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              stat-subtitle="GENERAL PERFORMANCE"
              :stat-title="genPerformance.bestYear.percentage"
              stat-arrow="fas fa-bullseye"
              :stat-percent="genPerformance.bestMonth.count"
              stat-percent-color="text-emerald-500"
              :stat-descripiron="`Best performing moment: ${genPerformance.bestMonth.monthYear}`"
              stat-icon-name="fas fa-percent"
              icon-color="color:#009c4a"
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

const totalScanComplete = computed(() => store.totalScanCompleteForMonthAndYTD);
const totalScan = computed(() => store.totalScanForMonthAndYTD);
const topLocation = computed(() => store.topLocation);
const genPerformance = computed(() => store.getCompanyStatistics);
const currentMonth = new Date().toLocaleString("default", { month: "long" });
</script>
<style scoped></style>
