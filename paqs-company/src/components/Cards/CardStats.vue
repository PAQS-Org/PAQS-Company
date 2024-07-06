<template>
  <div
    class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg"
  >
    <div class="flex-auto h-auto p-4">
      <div class="flex flex-wrap">
        <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
          <!-- Header with icon + -->
          <div class="flex flex-wrap items-center">
            <div class="relative w-auto flex-initial">
              <div
                class="p-3 text-white text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full"
                :class="[statIconColor]"
              >
                <i :class="[statIconName]" />
              </div>
            </div>
            <h5 class="text-blueGray-400 q-pl-sm uppercase font-bold text-xs">
              {{ statSubtitle }}
            </h5>
          </div>
          <!-- Header with icon - -->
          <!-- Large number on card + -->
          <div class="pt-1">
            <span
              style="font-size: 5rem; line-height: 4rem"
              class="font-semibold text-blueGray-700"
            >
              {{ statTitle }}
            </span>
          </div>
          <!-- Large number on card - -->
          <!-- Location on card + -->
          <div v-if="statTitle2">
            <span class="font-semibold text-xl text-blueGray-700">
              {{ statTitle2 }}
            </span>
          </div>
          <!-- Location on card - -->
          <br v-if="statComplete || statScan" />
          <span
            v-if="statComplete || statScan"
            class="font-semibold text-xl text-blueGray-700"
          >
            {{ statComplete }} <span v-if="statComplete && statScan"> | </span>
            {{ statScan }}
          </span>
        </div>
      </div>
      <div class="mt-6">
        <div>
          <span class="whitespace-nowrap">{{ statDescripiron }}</span>
        </div>
        <div class="flex items-center">
          <p
            style="font-size: 1.9rem; line-height: 2.3rem"
            class="text-blueGray-400 mt-1"
          >
            <span class="mr-2" :class="[statPercentColor]">
              <template v-if="isSvg(statArrow)">
                <img :src="statArrow" class="inline-block w-5 h-5 mr-2" />
              </template>
              <template v-else>
                <i :class="[statArrow]" />
              </template>
            </span>
            <span class="pb-1">
              {{ statPercent }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { fasAirFreshener } from '@quasar/extras/fontawesome-v5'
export default {
  name: "CardStats",

  props: {
    statSubtitle: {
      type: String,
      default: "Traffic",
    },
    statTitle: {
      type: [String, Number],
      default: null,
    },
    statTitle2: {
      type: [String, Number],
      default: null,
    },
    statComplete: {
      type: [String, Number],
      default: null,
    },
    statScan: {
      type: [String, Number],
      default: null,
    },
    statArrow: {
      type: String,
      default: "up",
    },
    statPercent: {
      type: [String, Number],
      default: 3.48,
    },
    // can be any of the text color utilities
    // from tailwindcss
    statPercentColor: {
      type: String,
      default: "text-emerald-500",
    },
    statDescripiron: {
      type: String,
      default: "Since last month",
    },
    statIconName: {
      type: String,
      default: "far fa-chart-bar",
    },
    // can be any of the background color utilities
    // from tailwindcss
    statIconColor: {
      type: String,
      default: "bg-red-500",
    },
  },
  methods: {
    isSvg(value) {
      return value.endsWith(".svg");
    },
  },
};
</script>
