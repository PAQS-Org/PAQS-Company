<template>
  <div>
    <div>
      <div>
        <!-- Qrcode Camera here -->
        <qrCodeScan @qrcode-scanned="onQrCodeScanned" />
        <!-- Qrcode Camera ends -->
      </div>
      <!-- <div v-else> -->
      <dialogComp :card="isDialogOpen" :message="qrCodeResult" />
      <!-- </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, defineAsyncComponent } from "vue";
import { useMeta } from "quasar";
const dialogComp = defineAsyncComponent(() =>
  import("../../components/Cards/CardResult.vue")
);
const qrCodeScan = defineAsyncComponent(() =>
  import("../../components/Cards/CardQrScan.vue")
);

defineOptions({
  name: "ScanComp",
});

const isDialogOpen = ref(false);
const qrCodeResult = ref("");

const onQrCodeScanned = async (result) => {
  qrCodeResult.value = result;
  isDialogOpen.value = false;
  await nextTick();
  isDialogOpen.value = true;
};

const title = ref("Scan Code");
useMeta(() => {
  return {
    title: title.value,
  };
});
</script>

<style lang="scss" scoped></style>
