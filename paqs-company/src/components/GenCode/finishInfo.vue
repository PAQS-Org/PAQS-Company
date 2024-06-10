<template>
  <div class="grid">
    <div class="flex-row text-center">
      <h3 style="font-size:60px; text-transform: uppercase;">
        Thank You
      </h3>
    </div>
    <div class="flex-col flex-start">
      <h5 style="font-size:20px; margin-left:10px; margin-top: 20px; margin-bottom:20px;">
        We are grateful for doing business with us.
        Kindly check your email for a link to download the QR codes.
      </h5>
    </div>
    <div class="flex-col text-center">
      <q-btn
        class="q-m-lg"
        color="grey-4"
        text-color="purple"
        glossy
        unelevated
        label="Print Receipt"
        icon="receipt"
      />
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({

});
</script>
