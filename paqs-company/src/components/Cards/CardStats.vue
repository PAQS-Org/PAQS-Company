<template>
  <div
    class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg"
  >
    <div class="flex-auto p-4">
      <div class="flex flex-wrap">
        <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
          <h5 class="text-blueGray-400 uppercase font-bold text-xs">
            {{ statSubtitle }}
          </h5>
          <span class="font-semibold text-xl text-blueGray-700">
            {{ statTitle }}
          </span>
          <br v-if="statComplete || statScan" />
          <span
            v-if="statComplete || statScan"
            class="font-semibold text-xl text-blueGray-700"
          >
            {{ statComplete }} <span v-if="statComplete && statScan"> | </span>
            {{ statScan }}
          </span>
        </div>
        <div class="relative w-auto pl-4 flex-initial">
          <div
            class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full"
            :class="[statIconColor]"
          >
            <i :class="[statIconName]" />
          </div>
        </div>
      </div>
      <p class="text-sm text-blueGray-400 mt-4">
        <span class="mr-2" :class="[statPercentColor]">
          <template v-if="isSvg(statArrow)">
            <img :src="statArrow" class="inline-block w-5 h-5 mr-2" />
          </template>
          <template v-else>
            <i
              :class="[
                statArrow === 'up' ? `fas fa-arrow-up` : `fas fa-arrow-down`,
              ]"
            />
          </template>
          {{ statPercent }}
        </span>
        <span class="whitespace-nowrap">{{ statDescripiron }}</span>
      </p>
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
      default: 350897,
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
