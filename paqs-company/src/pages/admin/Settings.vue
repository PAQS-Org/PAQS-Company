<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex flex-wrap">
    <div class="w-full lg:w-8/12 px-4">
      <CardSettings />
    </div>
    <div class="w-full lg:w-4/12 px-4">
      <CardProfile />
    </div>
  </div>
</template>
<script setup>
import { defineAsyncComponent } from "vue";

const CardProfile = defineAsyncComponent(() =>
  import("../../components/Cards/CardProfile.vue")
);
const CardSettings = defineAsyncComponent(() =>
  import("../../components/Cards/CardSettings.vue")
);
</script>
