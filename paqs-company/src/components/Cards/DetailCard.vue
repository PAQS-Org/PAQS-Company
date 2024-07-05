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
              <div class="flex">
                <span class="mr-2 pt-1">
                  <q-item-label
                    style="color: black; font-size: larger"
                    caption
                    >{{ firstTitleVal }}</q-item-label
                  >
                </span>
                <span v-if="firstTitleVal1">|</span>
                <span v-if="firstTitleVal1" class="ml-2 mr-2 pt-1"
                  ><q-item-label
                    style="color: black; font-size: larger"
                    caption
                    >{{ firstTitleVal1 }}</q-item-label
                  ></span
                >
                <span v-if="firstTitleVal1">Previous Day</span>
              </div>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <i :class="[secondIcon]" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ secondTitle }}</q-item-label>
              <div class="flex">
                <span class="mr-2 pt-1">
                  <q-item-label
                    style="color: black; font-size: larger"
                    caption
                    >{{ secondTitleVal }}</q-item-label
                  >
                </span>
                <span v-if="secondTitleVal1">|</span>
                <span v-if="secondTitleVal1" class="ml-2 mr-2 pt-1"
                  ><q-item-label
                    style="color: black; font-size: larger"
                    caption
                    >{{ secondTitleVal1 }}</q-item-label
                  ></span
                >
                <span v-if="secondTitleVal1">Previous Month</span>
              </div>
              <!-- Second -->
              <div class="flex" v-if="secondTitleVal3">
                <!-- <span class="mr-2 pt-1">
                  <span class="mr-1"
                    ><q-item-label caption>{{
                      secondTitle2
                    }}</q-item-label></span
                  >
                  <q-item-label caption>{{ secondTitleVal2 }}</q-item-label>
                </span>

                <span
                  ><q-item-label caption>{{
                    secondTitleVal21
                  }}</q-item-label></span
                >
                <span>|</span> -->
                <span class="flex mr-2 pt-1">
                  <span class="mr-1"
                    ><q-item-label caption>{{
                      secondTitle3
                    }}</q-item-label></span
                  >
                  <q-item-label
                    style="color: black; font-size: larger"
                    caption
                    >{{ secondTitleVal3 }}</q-item-label
                  >
                </span>
                <span class="mx-2">|</span>
                <span class="flex mr-2 pt-1">
                  <span class="mr-1"
                    ><q-item-label caption>{{
                      secondTitle4
                    }}</q-item-label></span
                  >
                  <q-item-label
                    style="color: black; font-size: larger"
                    caption
                    >{{ secondTitleVal4 }}</q-item-label
                  >
                </span>
              </div>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <i :class="[thirdIcon]" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ thirdTitle }}</q-item-label>
              <div class="flex">
                <span class="mr-2 pt-1">
                  <q-item-label
                    style="color: black; font-size: larger"
                    caption
                    >{{ thirdTitleVal }}</q-item-label
                  >
                </span>
                <span v-if="thirdTitleVal1">|</span>
                <span v-if="thirdTitleVal1" class="ml-2 mr-2 pt-1"
                  ><q-item-label
                    style="color: black; font-size: larger"
                    caption
                    >{{ thirdTitleVal1 }}</q-item-label
                  ></span
                >
                <span v-if="thirdTitleVal1">Previous Year</span>
              </div>
              <!-- third -->
              <div class="flex" v-if="thirdTitleVal3">
                <span class="flex mr-2 pt-1">
                  <span class="mr-1"
                    ><q-item-label caption>{{
                      thirdTitle3
                    }}</q-item-label></span
                  >
                  <q-item-label
                    style="color: black; font-size: larger"
                    caption
                    >{{ thirdTitleVal3 }}</q-item-label
                  >
                </span>
                <span class="mx-2">|</span>
                <span class="flex mr-2 pt-1">
                  <span class="mr-1"
                    ><q-item-label caption>{{
                      thirdTitle4
                    }}</q-item-label></span
                  >
                  <q-item-label
                    style="color: black; font-size: larger"
                    caption
                    >{{ thirdTitleVal4 }}</q-item-label
                  >
                </span>
              </div>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable>
            <q-item-section avatar>
              <i :style="[fourthIconColor]" :class="[fourthIcon]" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ fourthTitle }}</q-item-label>
              <div class="flex">
                <span class="mr-2 pt-1">
                  <q-item-label
                    style="color: black; font-size: larger"
                    caption
                    >{{ fourthTitleVal }}</q-item-label
                  >
                </span>
                <span v-if="fourthTitleVal2">{{ fourthTitleVal2 }}</span>
                <span v-if="fourthTitleVal1">|</span>
                <span v-if="fourthTitleVal1" class="ml-2 mr-2 pt-1"
                  ><q-item-label
                    style="color: black; font-size: larger"
                    caption
                    >{{ fourthTitleVal1 }}</q-item-label
                  ></span
                >
                <span v-if="fourthTitleVal1">Previous Day</span>
              </div>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <i :style="[fifthIconColor]" :class="[fifthIcon]" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ fifthTitle }}</q-item-label>
              <div class="flex">
                <span class="mr-2 pt-1">
                  <q-item-label
                    style="color: black; font-size: larger"
                    caption
                    >{{ fifthTitleVal }}</q-item-label
                  >
                </span>
                <span v-if="fifthTitleVal2">{{ fifthTitleVal2 }}</span>
                <span v-if="fifthTitleVal1">|</span>
                <span v-if="fifthTitleVal1" class="ml-2 mr-2 pt-1"
                  ><q-item-label
                    style="color: black; font-size: larger"
                    caption
                    >{{ fifthTitleVal1 }}</q-item-label
                  ></span
                >
                <span v-if="fifthTitleVal1">Previous Month</span>
              </div>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <i :style="[sixthIconColor]" :class="[sixthIcon]" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ sixthTitle }}</q-item-label>
              <div class="flex">
                <span class="mr-2 pt-1">
                  <q-item-label
                    style="color: black; font-size: larger"
                    caption
                    >{{ sixthTitleVal }}</q-item-label
                  >
                </span>
                <span v-if="sixthTitleVal2">{{ sixthTitleVal2 }}</span>
                <span v-if="sixthTitleVal1">|</span>
                <span v-if="sixthTitleVal1" class="ml-2 mr-2 pt-1"
                  ><q-item-label
                    style="color: black; font-size: larger"
                    caption
                    >{{ sixthTitleVal1 }}</q-item-label
                  ></span
                >
                <span v-if="sixthTitleVal1">Previous Year</span>
              </div>
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
  firstTitleVal1: {
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
  secondTitleVal1: {
    type: [String, Number],
    default: null,
  },
  // secondTitle2: {
  //   type: [String],
  //   default: null,
  // },
  // secondTitleVal2: {
  //   type: [String, Number],
  //   default: null,
  // },
  // secondTitleVal21: {
  //   type: [String, Number],
  //   default: null,
  // },
  secondTitle3: {
    type: [String],
    default: null,
  },
  secondTitleVal3: {
    type: [String, Number],
    default: null,
  },
  secondTitle4: {
    type: [String],
    default: null,
  },
  secondTitleVal4: {
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
  thirdTitleVal1: {
    type: [String, Number],
    default: null,
  },
  thirdTitle3: {
    type: [String],
    default: null,
  },
  thirdTitleVal3: {
    type: [String, Number],
    default: null,
  },
  thirdTitle4: {
    type: [String],
    default: null,
  },
  thirdTitleVal4: {
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
  fourthTitleVal1: {
    type: [String, Number],
    default: null,
  },
  fourthTitleVal2: {
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
  fifthTitleVal1: {
    type: [String, Number],
    default: null,
  },
  fifthTitleVal2: {
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
  sixthTitleVal1: {
    type: [String, Number],
    default: null,
  },
  sixthTitleVal2: {
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
