<template>
  <!-- <section class="bg-image"> -->
  <div class="relative w-full items-start pt-6 m-4 overflow-hidden rounded-xl">
    <div class="container z-10">
      <div class="flex flex-wrap justify-center -mx-3">
        <div
          class="w-full max-w-full px-3 mx-auto mt-0 text-center lg:flex-0 shrink-0 lg:w-5/12"
        >
          <h1 class="mt-6 mb-2 text-black">Email Verification</h1>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="flex flex-wrap -mx-3 -mt-48 md:-mt-56 lg:-mt-48">
      <div
        class="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-4/12"
      >
        <!-- Card -->
        <div
          class="max-w-sm rounded-xl border-2 border-blue-900 bg-gray-50 overflow-hidden shadow-lg"
        >
          <div class="px-6 py-4">
            <div class="flex text-xl mb-2">
              Hi,
              <p class="mx-4 font-bold text-xl">{{ auths.first_name }}</p>
              <p class="font-bold text-xl">{{ auths.last_name }}</p>
            </div>
            <p class="text-gray-700 text-base">
              Please proceed to your email:
              <strong class="text-black">{{ auths.email }}</strong> to verify
              your credentials.
            </p>
          </div>
          <div class="px-6 pt-1 pb-2">
            <h4>Thank you</h4>
          </div>
        </div>
        <!-- Card end -->
      </div>
    </div>
  </div>
  <!-- </section> -->
</template>

<script setup>
import { useAuthStore } from "stores/auth";

const auths = useAuthStore();
</script>
<style scoped>
.bg-image {
  background-image: url("../../assets/svg/PAQS bg - MOBILE-01.svg");
  background-repeat: no-repeat;
  background-size: cover;
}

.basic {
  /* width: 200px;
  height: 200px; */
  background: rgba(247, 244, 244, 0.4);
  /* position: relative; */
}
.blur {
  /* position: absolute; */
  /* bottom: 25px;
  right: 162px;
  width: 200px;
  height: 200px; */
  background: rgba(177, 177, 177, 0.4);
  backdrop-filter: blur(5px);
}
/* .basic {
  width: 200px;
  height: 200px;
  background: rgba(255,255,255,0.4);
  position: relative;
}
.blur {
  position: absolute;
  bottom: 25px;
  right: 162px;
  width: 200px;
  height: 200px;
  background: rgba(255,255,255,0.4);
  backdrop-filter: blur(5px);
} */
</style>
