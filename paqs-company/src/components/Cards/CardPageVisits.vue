<template>
  <div
    class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-base text-blueGray-700">
            Top Customers
          </h3>
        </div>
        <div
          class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"
        >
          <q-btn
            v-if="customz && customz.length > 0"
            :loading="progress[0].loading"
            :percentage="progress[0].percentage"
            color="primary"
            @click="downloadCustomerReport"
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
        v-if="customz && customz.length > 0"
        class="my-sticky-header-column-table"
        :dense="$q.screen.lt.md"
        :rows="customz"
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
const columns = [
  {
    name: "name",
    required: true,
    label: "Customer Name",
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
    name: "tprod",
    label: "Top Product Completed",
    field: "tprod",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
];

const $q = useQuasar();

const customers = useTransactionStore();

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

const downloadCustomerReport = async () => {
  startComputing(0);
  try {
    const response = await customers.downloadCustomerReport();
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

const customz = computed(() => customers.paginatedCustomers);

const currentPage = computed(() => customers.currentPageCust);
const totalPages = computed(() => customers.totalCustomers);

const handlePageChange = (page) => {
  customers.setCurrentPageCust(page);
};

onMounted(() => {
  customers.fetchLoyalCust();
});

onBeforeUnmount(() => {
  intervals.forEach((val) => {
    clearInterval(val);
  });
});
</script>

<style lang="sass">
.my-sticky-header-column-table
  /* height or max-height is important */
  height: 100%

  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  max-width: 100%

  td:first-child
    /* bg color is important for td; just specify one */
    background-color: #c1f4cd !important

  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    /* bg color is important; just specify one */
    background: #fff

  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
    /* highest z-index */
    z-index: 3
  thead tr:first-child th
    top: 0
    z-index: 1
  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    position: sticky
    left: 0

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
