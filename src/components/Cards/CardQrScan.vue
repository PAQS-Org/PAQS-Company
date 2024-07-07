<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page class="flex flex-center">
    <div>
      <!-- Last result: <b>{{ result }}</b> -->
      <!-- Results -->
      <qrcode-stream
        class="scan"
        :track="trackFunctionSelected"
        :paused="paused"
        @error="onError"
        @detect="onDetect"
      />
    </div>
  </q-page>
</template>

<script setup>
import { QrcodeStream } from "vue-qrcode-reader";
import { ref } from "vue";
const emit = defineEmits(["qrcode-scanned"]);

const paused = ref(false);
const result = ref("");
const error = ref("");

const onDetect = async function (detectedCodes) {
  result.value = JSON.stringify(detectedCodes[0].rawValue);
  emit("qrcode-scanned", result.value);

  paused.value = true;
  await timeout(500);
  paused.value = false;
};
const timeout = function (ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
};

const onError = function (err) {
  error.value = `[${err.name}]: `;

  if (err.name === "NotAllowedError") {
    error.value += "you need to grant camera access permission";
  } else if (err.name === "NotFoundError") {
    error.value += "no camera on this device";
  } else if (err.name === "NotSupportedError") {
    error.value += "secure context required (HTTPS, localhost)";
  } else if (err.name === "NotReadableError") {
    error.value += "is the camera already in use?";
  } else if (err.name === "OverconstrainedError") {
    error.value += "installed cameras are not suitable";
  } else if (err.name === "StreamApiNotSupportedError") {
    error.value += "Stream API is not supported in this browser";
  } else if (err.name === "InsecureContextError") {
    error.value +=
      "Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.";
  } else {
    error.value += err.message;
  }
};
const paintOutline = function (detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const [firstPoint, ...otherPoints] = detectedCode.cornerPoints;

    ctx.strokeStyle = "red";

    ctx.beginPath();
    ctx.moveTo(firstPoint.x, firstPoint.y);
    for (const { x, y } of otherPoints) {
      ctx.lineTo(x, y);
    }
    ctx.lineTo(firstPoint.x, firstPoint.y);
    ctx.closePath();
    ctx.stroke();
  }
};
</script>
