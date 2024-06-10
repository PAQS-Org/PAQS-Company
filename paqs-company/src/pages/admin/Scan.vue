<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page class="flex flex-center">
    <div>
      <!-- Last result: <b>{{ result }}</b> -->
      <!-- Results -->
      <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit" />
      <q-dialog v-model="showScanConfirmation" persistent>
        <q-card class="my-card">
          <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

          <q-card-section>
            <q-btn
              fab
              color="primary"
              icon="verified"
              class="absolute"
              style="top: 0; right: 12px; transform: translateY(-50%)"
            />

            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">Name of Company</div>
              <!-- <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
                <q-icon name="verified" />
                250 ft
                </div> -->
            </div>

            <q-rating v-model="stars" :max="5" size="32px" />
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">Name of product</div>
            <div class="text-caption text-grey">
              <p class="decode-result">
                Last result: <b>{{ result }}</b>
              </p>
              prodName is an authentic product of compName. It would was
              manufactured on 10th January, 2022 and would expire on 12th
              January, 2023.
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn
              v-close-popup
              flat
              color="primary"
              ripple
              label="Confirm"
              @click="secondDialog = true"
            />
            <q-btn v-close-popup flat class="bg-red" ripple label="Cancel" />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <!-- </qrcode-stream> -->

      <!-- Confirmation -->

      <q-dialog
        v-model="secondDialog"
        persistent
        transition-show="scale"
        transition-hide="scale"
      >
        <q-card class="bg-teal text-white" style="width: 300px">
          <q-card-section>
            <div class="text-h6">Confirmation</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">
                I agree to check out prodName of compName with s/n 23234DDF43.
              </div>
              <div
                class="col-auto text-green text-caption q-pt-md row no-wrap items-center"
              >
                <q-icon name="verified" />
              </div>
            </div>
          </q-card-section>

          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn v-close-popup flat label="OK" class="q-mr-2" />
            <q-btn v-close-popup="2" flat label="Cancel" class="bg-blue" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader/src/index";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    QrcodeStream,
  },
  data() {
    //  const options = [
    //   { text: "outline", value: this.paintOutline },
    // ]
    // const selected = options[1]
    return {
      //   persistent: ref(false),
      secondDialog: false,
      camera: "auto",
      result: null,
      showScanConfirmation: false,
      stars: 1,
      isValid: undefined,
      // selected
    };
  },
  computed: {
    showModal() {
      return this.isValid === true && this.camera === "off";
    },
  },
  methods: {
    paintOutline(detectedCodes, ctx) {
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
    },

    async onInit(promise) {
      try {
        await promise;
      } catch (e) {
        console.error(e);
      } finally {
        this.showScanConfirmation = this.camera === "off";
      }
    },

    async onDecode(content) {
      this.result = content;
      this.turnCameraOff();
      await this.timeout(3000);
      this.isValid = content;
      await this.timeout(5000);
      this.turnCameraOn();

      // this.pause();
      // await this.timeout(500);
      // this.unpause();
    },

    turnCameraOn() {
      this.camera = "auto";
    },

    turnCameraOff() {
      this.camera = "off";
    },

    timeout(ms) {
      return new Promise((resolve) => {
        window.setTimeout(resolve, ms);
      });
    },
  },
});
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 300px
</style>
