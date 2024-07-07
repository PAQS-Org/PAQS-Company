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
</script>

<style lang="scss" scoped></style>
