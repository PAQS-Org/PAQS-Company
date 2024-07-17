<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <card-table />
    </div>
    <!-- <div class="w-full mb-12 px-4">
      <card-table color="dark" />
    </div> -->
  </div>
</template>
<script setup>
import { ref, defineAsyncComponent } from "vue";
import { useMeta } from "quasar";
const CardTable = defineAsyncComponent(() =>
  import("../../components/Cards/CardUpdate.vue")
);
const title = ref("Update");
useMeta(() => {
  return {
    title: title.value,
  };
});
</script>
