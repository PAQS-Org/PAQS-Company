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
    label: 'Product',
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
    name: 'perChange', label: '% Change (Per Day)', field: 'perChange', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },

];

const rows = [
  {
    name: 'Special Ice Water',
    ttsc: '6,000',
    ttcomp: '5,802',
    perChange: '14%',
  },
  {
    name: 'This way Chocolate Drink',
    ttsc: '5,754',
    ttcomp: '5,324',
    perChange: '2%',
  },
  {
    name: 'Neat Fufu',
    ttsc: '5,632',
    ttcomp: '5,630',
    perChange: '6%',
  },
  {
    name: 'Neat Koko',
    ttsc: '5, 270',
    ttcomp: '5,220',
    perChange: '2%',
  },
  {
    name: 'Neat Abenkwan',
    ttsc: '4, 920',
    ttcomp: '4, 800',
    perChange: '8%',
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
</style>
