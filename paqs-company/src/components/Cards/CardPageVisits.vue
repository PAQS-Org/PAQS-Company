<template>
  <div
    class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-base text-blueGray-700">
            Top 5 Customers of Atona Foods
          </h3>
        </div>
        <div
          class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"
        >
          <button
            class="bg-indigo-500 text-white
            active:bg-indigo-600 text-xs font-bold
            uppercase px-3 py-1 rounded outline-none
            focus:outline-none mr-1 mb-1 ease-linear
            transition-all duration-150"
            type="button"
          >
            See all
          </button>
        </div>
      </div>
    </div>
    <div class="block w-full overflow-x-auto">
      <!-- Projects table -->
      <q-table
        class="my-sticky-header-column-table"
        :dense="$q.screen.lt.md"
        :rows="rows"
        :columns="columns"
        row-key="name"
      />
    </div>
  </div>
</template>
<script>
const columns = [
  {
    name: 'name',
    required: true,
    label: 'Customer Name',
    align: 'left',
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'ttsc', align: 'center', label: 'Total Scan', field: 'ttsc', sortable: true,
  },
  {
    name: 'ttcomp', label: 'Total Completed', field: 'ttcomp', sortable: true,
  },
  {
    name: 'tprod', label: 'Top Product Completed', field: 'tprod', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },

];

const rows = [
  {
    name: 'Apirigu Chaka Pamas',
    ttsc: '6,000',
    ttcomp: '5,802',
    tprod: 'Special Ice Water',
  },
  {
    name: 'Robert Akorful',
    ttsc: '5,754',
    ttcomp: '5,324',
    tprod: 'This way Chocolate Drink',
  },
  {
    name: 'Kpanlogo Adanse',
    ttsc: '5,632',
    ttcomp: '5,630',
    tprod: 'Neat Fufu',
  },
  {
    name: 'Alex Agbo',
    ttsc: '5, 270',
    ttcomp: '5,220',
    tprod: 'Neat Koko',
  },
  {
    name: 'Kumchacha Paul',
    ttsc: '4, 920',
    ttcomp: '4, 800',
    tprod: 'Neat Abenkwan',
  },

];

export default {
  components: {
    // TableDropdown,
  },
  data() {
    return {
      columns,
      rows,
    };
  },
};
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
</style>
