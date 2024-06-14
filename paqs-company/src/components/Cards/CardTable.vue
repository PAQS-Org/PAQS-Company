<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
    :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <div class="block w-full overflow-x-auto">
            <q-table
              v-if="rows && rows.length > 0"
              class="my-sticky-header-column-table"
              :dense="$q.screen.lt.md"
              :title="titles"
              :rows="rows"
              :columns="columns"
              row-key="name"
            >
              <template v-slot:body-cell-download="props">
                <q-td :props="props">
                  <q-btn
                    :loading="progress[props.row.id]?.loading"
                    :percentage="progress[props.row.id]?.percentage"
                    round
                    @click="
                      startDownload(props.row.id, props.row.download, $event)
                    "
                    color="secondary"
                    icon="cloud_download"
                  />
                </q-td>
              </template>
            </q-table>
            <q-pagination
              v-if="totalPages > 1"
              v-model="localCurrentPage"
              :min="1"
              :max="totalPages"
              :max-pages="5"
              @update:model-value="pageChanged"
            />
            <div v-else class="no-data">
              <img
                src="../../assets/img/svg/empty.svg"
                alt="No Data Available"
              />
              <div class="mt-3">
                <strong>There is no data in the table.</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, watch } from "vue";

defineOptions({
  name: "transactionTable",
});
// Initialize progress as an empty object
const progress = ref({});

const intervals = ref({});

// Define props
const props = defineProps({
  color: {
    default: "light",
    validator(value) {
      return ["light", "dark"].indexOf(value) !== -1;
    },
  },
  columns: {
    type: Array,
    required: true,
  },
  rows: {
    type: Array,
    required: true,
    default: () => [],
  },
  titles: {
    type: String,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
    default: 1,
  },
  totalPages: {
    type: Number,
    required: true,
    default: 1,
  },
});

const emit = defineEmits(["page-changed"]);

// Local currentPage state
const localCurrentPage = ref(props.currentPage);

// Watch for prop changes to sync local state
watch(
  () => props.currentPage,
  (newPage) => {
    localCurrentPage.value = newPage;
  }
);

const startDownload = (id, url, event) => {
  event.preventDefault();
  event.stopPropagation();

  if (progress.value[id].loading) {
    return; // Prevent starting a new download if one is already in progress
  }

  progress.value[id].loading = true;
  progress.value[id].percentage = 0;

  intervals.value[id] = setInterval(() => {
    progress.value[id].percentage += Math.floor(Math.random() * 8 + 10);
    if (progress.value[id].percentage >= 100) {
      clearInterval(intervals.value[id]);
      progress.value[id].loading = false;

      // Create a link element, set the download attribute, and click it to download
      const link = document.createElement("a");
      link.href = url;
      link.download = ""; // Use appropriate filename if needed
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, 700);
};

const pageChanged = (page) => {
  emit("page-changed", page);
};

onBeforeUnmount(() => {
  Object.values(intervals.value).forEach(clearInterval);
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
