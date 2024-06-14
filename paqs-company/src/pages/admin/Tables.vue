<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <card-table
        :titles="t1"
        :columns="columns1"
        :rows="paginatedTransactions"
        @page-changed="handlePageChange"
        :current-page="currentPage"
        :total-pages="totalPages"
      />
    </div>
    <div class="w-full mb-12 px-4">
      <card-table :titles="t2" :columns="columns2" :rows="row2" />
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, computed, onMounted } from "vue";
import { useTransactionStore } from "../../stores/dataFeed";

defineOptions({
  name: "transactionTable",
});

const CardTable = defineAsyncComponent(() =>
  import("../../components/Cards/CardTable.vue")
);

const t1 = "Payment Receipt";
const t2 = "QR Codes Generated";

const columns1 = [
  {
    name: "name",
    required: true,
    label: "Invoice #",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "date",
    align: "center",
    label: "Date & Time",
    field: "date",
    sortable: true,
  },
  { name: "qty", label: "Quantity", field: "qty", sortable: true },
  {
    name: "amount",
    label: "Amount ($)",
    field: "amount",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "mode",
    label: "Mode of Payment",
    field: "mode",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "download",
    align: "center",
    label: "Download Receipt",
    field: "download",
  },
];

const columns2 = [
  {
    name: "name",
    required: true,
    label: "Order #",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "batch",
    align: "center",
    label: "Batch #",
    field: "batch",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "quant",
    align: "center",
    label: "Quantity",
    field: "quant",
    sortable: true,
  },
  {
    name: "qrtype",
    align: "center",
    label: "Qr Code type",
    field: "qrtype",
    sortable: true,
  },
  { name: "download", align: "center", label: "Download", field: "download" },
];

const transactionStore = useTransactionStore();
const paginatedTransactions = computed(
  () => transactionStore.paginatedTransactions
);
const currentPage = computed(() => transactionStore.currentPage);
const totalPages = computed(() => transactionStore.totalPages);

const handlePageChange = (page) => {
  transactionStore.setCurrentPage(page);
};

onMounted(() => {
  transactionStore.fetchTransactions();
});
</script>
