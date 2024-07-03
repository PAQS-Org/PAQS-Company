<template>
  <div>
    <div>
      <q-card class="my-cardvvv" flat bordered>
        <q-list>
          <q-item clickable>
            <q-item-section avatar>
              <i :class="[firstIcon]" />
              <img
                v-if="firstIconPlus"
                style="width: 20px; height: 20px"
                :src="firstIconPlus"
                alt=""
                srcset=""
              />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ firstTitle }}</q-item-label>
              <q-item-label caption>{{ firstTitleVal }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <i :class="[secondIcon]" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ secondTitle }}</q-item-label>
              <q-item-label caption>{{ secondTitleVal }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <i :class="[thirdIcon]" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ thirdTitle }}</q-item-label>
              <q-item-label caption>{{ thirdTitleVal }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable>
            <q-item-section avatar>
              <i :style="[fourthIconColor]" :class="[fourthIcon]" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ fourthTitle }}</q-item-label>
              <q-item-label caption>{{ fourthTitleVal }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <i :style="[fifthIconColor]" :class="[fifthIcon]" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ fifthTitle }}</q-item-label>
              <q-item-label caption>{{ fifthTitleVal }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <i :style="[sixthIconColor]" :class="[sixthIcon]" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ sixthTitle }}</q-item-label>
              <q-item-label caption>{{ sixthTitleVal }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  firstTitle: {
    type: [String],
    default: null,
  },
  firstTitleVal: {
    type: [String, Number],
    default: null,
  },
  secondTitle: {
    type: [String],
    default: null,
  },
  secondTitleVal: {
    type: [String, Number],
    default: null,
  },
  thirdTitle: {
    type: String,
    default: null,
  },
  thirdTitleVal: {
    type: [String, Number],
    default: null,
  },
  fourthTitle: {
    type: [String],
    default: null,
  },
  fourthTitleVal: {
    type: [String, Number],
    default: null,
  },
  fifthTitle: {
    type: [String],
    default: null,
  },
  fifthTitleVal: {
    type: [String, Number],
    default: null,
  },
  sixthTitle: {
    type: [String],
    default: null,
  },
  sixthTitleVal: {
    type: [String, Number],
    default: null,
  },
  firstIcon: {
    type: String,
    default: null,
  },
  firstIconPlus: {
    type: String,
    default: null,
  },
  secondIcon: {
    type: String,
    default: "far fa-chart-bar",
  },
  thirdIcon: {
    type: String,
    default: "far fa-chart-bar",
  },
  fourthIconColor: {
    type: String,
    default: null,
  },
  fifthIconColor: {
    type: String,
    default: null,
  },
  sixthIconColor: {
    type: String,
    default: null,
  },
  fourthIcon: {
    type: String,
    default: "far fa-chart-bar",
  },
  fifthIcon: {
    type: String,
    default: "far fa-chart-bar",
  },
  sixthIcon: {
    type: String,
    default: "far fa-chart-bar",
  },
  //
});
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 300px
</style>
