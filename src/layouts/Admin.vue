<template>
  <div>
    <q-layout view="lHh Lpr lFf">
      <q-toolbar v-if="$q.screen.lt.md" class="bg-image-2">
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
              <q-item-section> Receipt </q-item-section>
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
          src="../assets/img/svg/Artboard3.webp"
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
      <q-header elevated reveal class="bg-grey-8" bordered>
        <div class="constrain">
          <q-banner
            inline-actions
            dense
            class="bg-grey-8 text-white"
            v-if="showInsatllbanner"
          >
            <b>Install PAQS-Company? </b>
            <template v-slot:avatar>
              <q-avatar color="grey-9" text-color="white" font-size="22px">
                <img src="../assets/logo.png" />
              </q-avatar>
            </template>
            <template v-slot:action>
              <q-btn
                flat
                label="Yes"
                dense
                class="q-px-sm"
                @click="installApp"
              />
              <q-btn
                flat
                label="Later"
                dense
                class="q-px-sm"
                @click="showInsatllbanner = false"
              />
              <q-btn
                flat
                label="Never"
                dense
                class="q-px-sm"
                @click="neverShowInstallAppBanner"
              />
            </template>
          </q-banner>
        </div>
      </q-header>
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
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useAuthStore } from "src/stores/auth.js";
import HeaderStats from "../components/Headers/HeaderStats.vue";
import FooterAdmin from "../components/Footers/FooterAdmin.vue";

defineOptions({
  name: "AdminLayout",
});

const drawer = ref(false);
const miniState = ref(true);
const authStore = useAuthStore();
const $q = useQuasar();
const showInsatllbanner = ref(false);
let deferredPrompt;

onMounted(() => {
  let neverShowInstallBanner = $q.localStorage.getItem(
    "neverShowInstallBanner"
  );
  if (!neverShowInstallBanner) {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;
      showInsatllbanner.value = true;
      setTimeout(() => {
        showInsatllbanner.value = true;
      }, 3000);
    });
  }
});

const installApp = () => {
  // Hide the app provided install promotion
  showInsatllbanner.value = false;

  // Show the install prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the install prompt");
      neverShowAppInstallBanner();
    } else {
      console.log("User dismissed the install prompt");
    }
  });
};

const neverShowInstallAppBanner = () => {
  showInsatllbanner.value = false;
  $q.localStorage.set("neverShowInstallBanner", true);
};

const logoutSys = async () => {
  await authStore.logout();
};
</script>
