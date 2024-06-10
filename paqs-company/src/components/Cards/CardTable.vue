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
              class="my-sticky-header-column-table"
              :dense="$q.screen.lt.md"
              title="Invoice"
              :rows="rows"
              :columns="columns"
              row-key="name"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const columns = [
  {
    name: 'name',
    required: true,
    label: 'Invoice #',
    align: 'left',
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'date', align: 'center', label: 'Date & Time', field: 'date', sortable: true,
  },
  {
    name: 'qty', label: 'Quantity', field: 'qty', sortable: true,
  },
  {
    name: 'amount', label: 'Amount ($)', field: 'amount', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: 'mode', label: 'Mode of Payment', field: 'mode', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
];

const rows = [
  {
    name: '445252ad!5338',
    date: '04/05/2021',
    qty: '70 000',
    amount: '1,500',
    mode: 'visa',
  },
  {
    name: '445252ad!5338',
    date: '30/05/2021',
    qty: '70 000',
    amount: '1,500',
    mode: 'visa',
  },
  {
    name: '445252ad!5338',
    date: '14/06/2021',
    qty: '20 000',
    amount: '2,500',
    mode: 'visa',
  },
  {
    name: '445252ad!5338',
    date: '04/05/2021',
    qty: '100 000',
    amount: '3,500',
    mode: 'visa',
  },

];

export default {
  components: {
    // TableDropdown,
  },
  props: {
    color: {
      default: 'light',
      validator(value) {
        // The value must match one of these strings
        return ['light', 'dark'].indexOf(value) !== -1;
      },
    },
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
