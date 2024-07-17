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
      <card-table
        :titles="t2"
        :columns="columns2"
        :rows="paginatedTransactions"
        @page-changed="handlePageChange"
        :current-page="currentPage"
        :total-pages="totalPages"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent, computed, onMounted } from "vue";
import { useTransactionStore } from "../../stores/dataFeed";
import { useMeta } from "quasar";
defineOptions({
  name: "transactionTable",
});

const CardTable = defineAsyncComponent(() =>
  import("../../components/Cards/CardTable.vue")
);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleDateString("en-GB", options).replace(",", "");
};

const t1 = "Payment Receipt";
const t2 = "QR Codes Generated";

const columns1 = [
  {
    name: "name",
    required: true,
    label: "Invoice #",
    align: "left",
    field: (row) => row.transaction_id,
    // field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "date_created",
    align: "center",
    label: "Date & Time",
    field: (row) => formatDate(row.date_created),
    sortable: true,
  },
  {
    name: "product_name",
    align: "center",
    label: "Product Name",
    field: "product_name",
    sortable: true,
  },
  {
    name: "batch_number",
    align: "center",
    label: "Batch Number",
    field: "batch_number",
    sortable: true,
  },
  { name: "quantity", label: "Quantity", field: "quantity", sortable: true },
  {
    name: "unit_price",
    label: "Unit Price",
    field: "unit_price",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "amount",
    label: "Amount ($)",
    field: "amount",
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

onMounted(async () => {
  await transactionStore.fetchTransactions();
});

const title = ref("Receipt");
useMeta(() => {
  return {
    title: title.value,
  };
});
</script>
