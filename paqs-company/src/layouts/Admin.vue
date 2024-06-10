<template>
  <div>
    <q-layout view="lHh Lpr lFf">
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
            <q-item
              v-ripple
              clickable
              to="/dash/main"
            >
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>

              <q-item-section>
                Dashboard
              </q-item-section>
            </q-item>
            <q-item
              v-ripple
              to="/dash/generate"
              clickable
            >
              <q-item-section avatar>
                <q-icon name="engineering" />
              </q-item-section>
              <q-item-section>
                Generate QR Code
              </q-item-section>
            </q-item>

            <q-item
              v-ripple
              clickable
              to="/dash/table-list"
            >
              <q-item-section avatar>
                <q-icon name="receipt_long" />
              </q-item-section>
              <q-item-section>
                Invoice
              </q-item-section>
            </q-item>

            <q-item
              v-ripple
              clickable
              to="/dash/scan"
            >
              <q-item-section avatar>
                <q-icon name="qr_code_scanner" />
              </q-item-section>
              <q-item-section>
                QR scanner
              </q-item-section>
            </q-item>
            <!-- <q-separator style="margin-top: 15rem" /> -->
            <q-separator />

            <!-- <div class="q-px-md text-grey-9">
            <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
              <a

              >
                world
              </a>
            </div>
          </div>
          <div class="q-py-md q-px-md text-grey-9">
            <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
              <a

              >
                Hello
              </a>
            </div>
          </div> -->
          </q-list>
        </q-scroll-area>
        <q-img
          class="absolute-top"
          src="https://cdn.quasar.dev/img/material.png"
          style="height: 150px"
        >
          <div class="absolute-bottom bg-transparent">
            <!-- <q-avatar
              size="56px"
              class="q-mb-sm"
            >
              <img
                :src="authenticatedUser.company_logo"
                alt="Company Logo"
              >
            </q-avatar> -->
            <div class="text-weight-bold">
              <!-- {{ authenticatedUser.company_logo }} -->
            </div>
            <!-- <div>@{{ authenticatedUser.name_of_company }}</div> -->
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

    <!-- <sidebar /> -->
  </div>
</template>
<script>
import { ref } from 'vue';
// import { useAuthStore } from 'src/stores/auth.js';
// import AdminNavbar from "../components/Navbars/AdminNavbar.vue";
// import Sidebar from "../components/Sidebar/Sidebar.vue";
import HeaderStats from '../components/Headers/HeaderStats.vue';
import FooterAdmin from '../components/Footers/FooterAdmin.vue';

export default {
  name: 'AdminLayout',
  components: {
    // AdminNavbar,
    // Sidebar,
    HeaderStats,
    FooterAdmin,
  },
  setup() {
    const drawer = ref(false);
    const miniState = ref(true);
    // const authStore = useAuthStore('auth'); // Access the Vuex store

    // Use a computed property to determine the authentication status
    // const isAuthenticated = computed(() => authStore.isAuthenticated);
    // const authenticatedUser = computed(() => authStore.user);
    // Replace 'user' with the actual name of your user state in the store

    return {
      drawer,
      miniState,
      // authenticatedUser,
      // isAuthenticated,
    };
  },
};
</script>
