<template>
  <div>
    <q-form
      class="q-gutter-md"
      @submit="onSubmit"
      @reset="onReset"
    >
      <div class="m-8">
        <q-input
          v-model="prods.prodInfo.prodName"
          outlined
          readonly
          color="purple-12"
          label="Name of Product *"
        >
          <template #prepend>
            <q-icon name="inventory" />
          </template>
        </q-input>
        <q-field
          v-show="prods.prodInfo.perish ? true : false"
          class="q-mt-lg"
          outlined
          readonly
        >
          {{ prods.prodInfo.perDate }}
          <template #prepend>
            <q-icon name="date_range" />
          </template>
        </q-field>

        <q-file
          v-model="prods.prodInfo.prodLogo"
          outlined
          class="mt-6"
          readonly
          color="purple-12"
          label="Product Logo"
        >
          <template #prepend>
            <q-icon name="image" />
          </template>
        </q-file>

        <q-select
          v-model="prods.prodInfo.qrType"
          outlined
          class="mt-6"
          readonly
          color="purple-12"
          label="QR Image format"
        >
          <template #prepend>
            <q-icon name="sort" />
          </template>
        </q-select>

        <q-input
          v-model="prods.prodInfo.quantity"
          outlined
          readonly
          class="mt-6"
          color="purple-12"
          type="number"
          label="Quantity"
        >
          <template #prepend>
            <q-icon name="1k_plus" />
          </template>
        </q-input>
        <div>
          <div class="flex flex-wrap flex-center mt-10">
            <h1 class="text-2xl">
              Payment
            </h1>
          </div>
          <template v-if="prods.payInfo.cardNumber.length > 0">
            <div class="flex flex-wrap ml-4">
              <div class="w-full">
                <div class="relative w-full mb-3">
                  <label
                    for="expiry-date"
                    class="mr-4 mt-4 mb-3 flex flex-center text-2xl text-red-100"
                  >Visa / Master
                    Card / PayPal</label>
                  <div
                    class="flex flex-end"
                    style=" width: 42px; height: 30px;
                        margin-left: 10px; margin-left: 45%;
                        flex-direction: column-reverse;
                        margin-bottom: 10px;"
                  >
                    <img
                      style="padding-right: 10px"
                      src="../../assets/img/svg/visa.svg"
                      alt="visa"
                    >
                    <img
                      style="padding-right: 10px"
                      src="../../assets/img/svg/mastercard.svg"
                      alt="mastercard"
                    >
                    <img
                      style="padding-right: 10px"
                      src="../../assets/img/svg/paypal.svg"
                      alt="maestro"
                    >
                  </div>
                  <div>
                    <q-input
                      v-model="prods.payInfo.fullname"
                      outlined
                      readonly
                      color="purple-12"
                      type="text"
                      label="Full Name"
                    />
                  </div>
                  <div>
                    <q-input
                      v-model="prods.payInfo.cardNumber"
                      outlined
                      readonly
                      class="mt-6"
                      color="purple-12"
                      type="text"
                      label="Card Number"
                    />
                  </div>
                  <div>
                    <q-select
                      v-model="prods.payInfo.cardType"
                      outlined
                      readonly
                      class="mt-6"
                      color="purple-12"
                      type="text"
                      label="Card Type"
                    />
                  </div>
                </div>
              </div>
            </div>
          </template>
          <!-- Mobile Money -->
          <template v-else>
            <div class="flex flex-wrap ml-4">
              <div class="w-full">
                <div class="relative w-full mb-3">
                  <label
                    for="expiry-date"
                    class="mr-4 mt-4 mb-3 flex flex-center text-2xl "
                  >Mobile Money</label>
                  <div
                    class="flex flex-end"
                    style=" width: 42px; height: 30px;
                        margin-left: 10px; margin-left: 46%;
                        flex-direction: column-reverse;
                        margin-bottom: 10px;"
                  >
                    <img
                      src="../../assets/img/svg/mtn.svg"
                      style="margin-right: 2px"
                      alt="mtn"
                    >
                    <img
                      src="../../assets/img/svg/vodafone.svg"
                      style="margin-right: 2px"
                      alt="voda"
                    >
                  </div>
                  <div>
                    <q-input
                      v-model="prods.payInfo.fullname"
                      outlined
                      readonly
                      color="purple-12"
                      type="text"
                      label="Full Name"
                    />
                  </div>
                  <div>
                    <q-input
                      v-model="prods.payInfo.phoneNumber"
                      outlined
                      readonly
                      class="mt-6"
                      color="purple-12"
                      type="tel"
                      label="Phone Number"
                    />
                  </div>
                  <div>
                    <q-input
                      v-model="prods.payInfo.provider"
                      outlined
                      readonly
                      class="mt-6"
                      color="purple-12"
                      type="text"
                      label="Service Provider"
                    />
                  </div>
                </div>
              </div>
            </div>
          </template>
          <q-field
            color="grey-3"
            label-color="orange"
            outlined
            label="Total"
            class="ml-4 mt-4"
            stack-label
          >
            <template #prepend>
              <q-icon name="account_balance_wallet" />
            </template>
            <template #append>
              <q-icon
                name="attach_money"
                color="orange"
              />
            </template>
            <template #control>
              <div
                class="self-center full-width no-outline"
                tabindex="0"
              >
                {{ prods.totals }}
              </div>
            </template>
          </q-field>
        </div>
      </div>
      <q-toggle
        v-model="accept"
        class="flex flex-center "
        label="I accept the license and terms"
      />
    </q-form>
  </div>
</template>
<script>
import {
  ref, defineComponent, onMounted,
} from 'vue';
import { useProdStore } from '../../stores/prods';

export default defineComponent({

  setup() {
    const step = ref(3);
    const accept = ref(false); // Assuming accept is used in your data
    const prods = useProdStore();

    onMounted(() => {
      // Initialize your local data with the store values
      accept.value = prods.accept;
    });

    // ... rest of your setup function
    return {
      accept,
      step,
      prods,
    };
  },
});
</script>
