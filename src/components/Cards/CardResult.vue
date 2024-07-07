<template>
  <div>
    <q-dialog v-model="localCard" persistent>
      <q-card class="items-center white-bg">
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
          </div>

          <q-rating v-model="stars" :max="5" size="32px" />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1 texts">Name of product</div>
          <div class="text-caption text-grey">
            <p class="decode-result texts">
              <b>{{ message }}</b> is an authentic product of compName. It was
              manufactured on 10th January, 2022 and would expire on 12th
              January, 2023.
            </p>
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
          <q-btn
            v-close-popup
            flat
            class="bg-red text-white"
            ripple
            label="Cancel"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="secondDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="white-bg" style="width: 300px">
        <q-card-section class="bg-blue text-white">
          <div class="text-h6 texts">Confirmation</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pt-none">
          <div class="row no-wrap items-center">
            <div class="col text-h6 texts">
              I agree to check out {{ message }} of compName with s/n
              23234DDF43.
            </div>
            <div
              class="col-auto text-green text-caption q-pt-md row no-wrap items-center"
            >
              <q-icon size="md" name="verified" />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Accept" v-close-popup class="q-mr-2" />
          <q-btn
            flat
            label="Cancel"
            v-close-popup="2"
            class="bg-red text-white"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const stars = ref(0);
const secondDialog = ref(false);
const localCard = ref(false);

const props = defineProps({
  card: Boolean,
  message: String,
});

watch(
  () => props.card,
  (newVal) => {
    localCard.value = newVal;
  }
);
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 300px
</style>
