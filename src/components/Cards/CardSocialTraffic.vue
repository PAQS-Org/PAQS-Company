<template>
  <div
    class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-base text-blueGray-700">
            Trending Products
          </h3>
        </div>
        <div
          class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"
        >
          <q-btn
            v-if="trendz && trendz.length > 0"
            :loading="progress[0].loading"
            :percentage="progress[0].percentage"
            color="primary"
            @click="downloadReport"
            style="width: 150px"
          >
            Get Report
            <template v-slot:loading> Downloading... </template>
          </q-btn>
        </div>
      </div>
    </div>
    <div class="block w-full overflow-x-auto">
      <!-- Projects table -->
      <q-table
        v-if="trendz && trendz.length > 0"
        class="my-sticky-header-table"
        :dense="$q.screen.lt.md"
        :rows="trendz"
        :columns="columns"
        row-key="name"
        @page-changed="handlePageChange"
        :current-page="currentPage"
        :total-pages="totalPages"
      />
      <div v-else class="no-data">
        <img src="../../assets/img/svg/empty.svg" alt="No Data Available" />
        <div class="mt-3">
          <strong>There is no data in the table.</strong>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, onBeforeUnmount, onMounted } from "vue";
import { useTransactionStore } from "../../stores/dataFeed";
import { useQuasar } from "quasar";

defineOptions({
  name: "socialTraffic",
});

const $q = useQuasar();

const traffic = useTransactionStore();

const progress = ref([{ loading: false, percentage: 0 }]);

const intervals = [null];

const startComputing = (id) => {
  progress.value[id].loading = true;
  progress.value[id].percentage = 0;

  intervals[id] = setInterval(() => {
    progress.value[id].percentage += Math.floor(Math.random() * 8 + 10);
    if (progress.value[id].percentage >= 100) {
      clearInterval(intervals[id]);
      progress.value[id].loading = false;
    }
  }, 700);
};

const downloadReport = async () => {
  startComputing(0);
  try {
    const response = await traffic.downloadReport();
    const blob = new Blob([response.data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "report.pdf";
    link.click();
    URL.revokeObjectURL(link.href);
    $q.notify({
      type: "positive",
      message: "Report downloaded successfully",
    });
  } catch (error) {
    console.error("Error downloading report:", error);
    $q.notify({
      type: "negative",
      message: "Failed to download report",
    });
  }
};

onBeforeUnmount(() => {
  intervals.forEach((val) => {
    clearInterval(val);
  });
});

const columns = [
  {
    name: "name",
    required: true,
    label: "Product",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "ttsc",
    align: "center",
    label: "Total Scan",
    field: "ttsc",
    sortable: true,
  },
  {
    name: "ttcomp",
    label: "Total Completed",
    field: "ttcomp",
    sortable: true,
  },
  {
    name: "perChange",
    label: "% Change (Per Day)",
    field: "perChange",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
];

const trendz = computed(() => traffic.paginatedTrendz);

const currentPage = computed(() => traffic.currentPageTrendz);
const totalPages = computed(() => traffic.totalPageTrendzs);

const handlePageChange = (page) => {
  traffic.setCurrentPageTrendz(page);
};

onMounted(async () => {
  // await traffic.fetchTrends();
});
</script>

<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 310px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #c1f4cd

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

.no-data
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
  height: 300px
  img
    max-width: 20%
    height: auto
</style>
