<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view class="q-pa-xl" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, defineAsyncComponent } from "vue";

export default defineComponent({
  name: "MainComp",
});
</script>
