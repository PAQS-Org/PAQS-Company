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
import { useMeta } from "quasar";
import { ref } from "vue";
import CardTable from "../../components/Cards/GenerateCodes.vue";

const title = ref("Generate QR Code");
useMeta(() => {
  return {
    title: title.value,
  };
});
</script>
