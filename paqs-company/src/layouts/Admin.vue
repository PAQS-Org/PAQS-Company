<template>
  <div>
    <q-layout view="lHh Lpr lFf">
      <q-toolbar v-if="$q.screen.lt.md" class="bg-emerald-600">
        <q-btn
          flat
          dense
          round
          @click="drawer = true"
          aria-label="Menu"
          icon="menu"
        />

        <q-space />
        <q-space />
        <q-space />
        <div>
          <h3>
            Welcome
            <strong
              ><span class="q-mr-xs">{{ authStore.first_name }}</span>
              <span>{{ authStore.last_name }}</span></strong
            >
          </h3>
        </div>
      </q-toolbar>

      <q-drawer
        v-model="drawer"
        show-if-above
        :mini="miniState"
        :width="200"
        :breakpoint="500"
        bordered
        class="bg-grey-3"
        @mouseover="miniState = false"
        @mouseout="miniState = true"
      >
        <q-scroll-area
          class="fit"
          style="margin-top: 10rem"
          :horizontal-thumb-style="{ opacity: 0 }"
        >
          <q-list padding>
            <q-item v-ripple clickable to="/dash/main">
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>

              <q-item-section> Dashboard </q-item-section>
            </q-item>
            <q-item v-ripple to="/dash/generate" clickable>
              <q-item-section avatar>
                <q-icon name="engineering" />
              </q-item-section>
              <q-item-section> Generate QR Code </q-item-section>
            </q-item>
            <q-item v-ripple to="/dash/update" clickable>
              <q-item-section avatar>
                <q-icon name="update" />
              </q-item-section>
              <q-item-section> Update </q-item-section>
            </q-item>

            <q-item v-ripple clickable to="/dash/table-list">
              <q-item-section avatar>
                <q-icon name="receipt_long" />
              </q-item-section>
              <q-item-section> Invoice </q-item-section>
            </q-item>

            <q-item v-ripple clickable to="/dash/scan">
              <q-item-section avatar>
                <q-icon name="qr_code_scanner" />
              </q-item-section>
              <q-item-section> QR scanner </q-item-section>
            </q-item>
            <!-- <q-separator style="margin-top: 15rem" /> -->
            <q-separator />

            <q-item v-ripple clickable @click="logoutSys">
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>
              <q-item-section> Logout </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
        <q-img
          class="absolute-top"
          src="https://cdn.quasar.dev/img/material.png"
          style="height: 150px"
        >
          <div class="absolute-bottom bg-transparent">
            <div class="flex justify-center items-center mt-2">
              <q-avatar size="100px" class="q-mb-sm">
                <img :src="authStore.company_logo" alt="Company Logo" />
              </q-avatar>
            </div>
            <div class="text-weight-bold">
              <span class="q-mr-xs">{{ authStore.first_name }}</span>
              <span>{{ authStore.last_name }}</span>
            </div>
            <div>@{{ authStore.company_name }}</div>
          </div>
        </q-img>
      </q-drawer>

      <q-page-container>
        <q-page>
          <div class="relative bg-blueGray-100">
            <!-- <admin-navbar /> -->
            <header-stats />
            <div class="px-4 md:px-10 mx-auto w-full -m-24">
              <router-view />
              <footer-admin />
            </div>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useAuthStore } from "src/stores/auth.js";
import HeaderStats from "../components/Headers/HeaderStats.vue";
import FooterAdmin from "../components/Footers/FooterAdmin.vue";

defineOptions({
  name: "AdminLayout",
});

const drawer = ref(false);
const miniState = ref(true);
const authStore = useAuthStore();

const logoutSys = async () => {
  await authStore.logout();
};
</script>
