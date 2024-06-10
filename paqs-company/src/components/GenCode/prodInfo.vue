<template>
  <div class="q-gutter-md">
    <div class="m-8">
      <q-input
        ref="prodName"
        v-model="prods.prodInfo.prodName"
        outlined
        color="purple-12"
        label="Name of Product"
        :rules="[val => val && val.length > 0 || 'Enter the product name']"
      >
        <template #prepend>
          <q-icon name="inventory" />
        </template>
      </q-input>

      <q-toggle
        ref="perishing"
        v-model="prods.prodInfo.perish"
        class="mt-6"
        outlined
        color="purple-12"
        icon="assignment_turned_in"
        label="Perishable"
      >
        <q-tooltip
          class="bg-indigo"
          :offset="[10, 10]"
        >
          If the product is a <br>
          <strong> perishable good or date bound</strong>, set
          <br> the <strong>Manufacturing Date</strong> and the <strong>Expiry Date</strong>
          <br> of the product
        </q-tooltip>
      </q-toggle>
      <div
        v-show="prods.prodInfo.perish"
        class="flex flex-wrap ml-4"
      >
        <!-- start the date -->
        <div class="w-full lg:w-12/12 px-4">
          <div class="relative w-full mb-3">
            <div class="flex flex-wrap flex-center">
              <label
                for="expiry-date"
                class="mr-4 mb-4"
              >Perishable Date</label>
            </div>
            <div class="flex flex-center">
              <q-input
                ref="Name"
                :model-value="`${prods.prodInfo.perDate.from} - ${prods.prodInfo.perDate.to}`"
                filled
              >
                <template #append>
                  <q-icon
                    name="event"
                    class="cursor-pointer"
                  >
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="prods.prodInfo.perDate"
                        range
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
        </div>
        <!-- end the date -->
      </div>
      <q-file
        ref="prodLogo"
        v-model="prods.prodInfo.prodLogo"
        outlined
        class="mt-6"
        color="purple-12"
        type="file"
        label="Product Logo"
        accept=".jpg, .png, .svg, image/*"
        max-file-size="6000000"
        counter
        :rules="[val => val !== null && val !== '' || 'Please select an image']"
        @rejected="onRejected"
      >
        <template #prepend>
          <q-icon name="image" />
        </template>
      </q-file>

      <q-select
        ref="qrType"
        v-model="prods.prodInfo.qrType"
        outlined
        class="mt-6"
        color="purple-12"
        :options="prods.prodInfo.imgFmt"
        label="QR Image format"
        :rules="[val => val !== null && val !== '' || 'Please select a QR code type']"
      >
        <template #prepend>
          <q-icon name="sort" />
        </template>
      </q-select>

      <q-input
        ref="quant"
        v-model="prods.prodInfo.quantity"
        outlined
        class="mt-6"
        color="purple-12"
        type="number"
        label="Quantity"
        hint="minimum is 200 and maximum is 100,000"
        :rules="[val => val >= 200 && val <= 100001
          || 'Please enter a value between 200 and 100,000']"
        @change="updateTotal"
      >
        <template #prepend>
          <q-icon name="1k_plus" />
        </template>
      </q-input>

      <q-field
        color="grey-3"
        label-color="orange"
        class="mt-6"
        outlined
        label="Total"
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
            {{ prods.total }}
          </div>
        </template>
      </q-field>
    </div>
  </div>
</template>

<script>
import {
  ref, defineComponent, emit,
  // onMounted,
} from 'vue';

import { useProdStore } from '../../stores/prods';

export default defineComponent({
  emit: ['validation - errors'],
  setup() {
    const prods = useProdStore();
    const prodName = ref(null);
    const prodLogo = ref(null);
    const qrType = ref(null);
    const quant = ref(null);
    const perDate = ref([]);
    const perishing = ref([null]);

    const updateTotal = () => {
      const newQuant = prods.prodInfo.quantity;
      prods.setTotals(newQuant);
      console.log(newQuant);
    };

    function validateProductForm() {
      const errors = {};

      // Validate product name (required)
      if (!prodName.value || prodName.value.length === 0) {
        errors.prodName = 'Enter the product name';
      }

      // Validate product logo (required)
      if (!prodLogo.value.files || prodLogo.value.files.length === 0) {
        errors.prodLogo = 'Please select an image';
      }

      // Validate QR code type (required)
      if (!qrType.value || qrType.value === '') {
        errors.qrType = 'Please select a QR code type';
      }

      // Validate quantity (range and type)
      if (!Number.isInteger(quant.value) || quant.value < 200 || quant.value > 100000) {
        errors.quant = 'Please enter a valid quantity between 200 and 100,000';
      }

      // Handle perishable date validation (if applicable)
      if (perishing.value) {
        const { from, to } = perDate.value;

        // Check if both from and to dates are selected
        if (!from || !to) {
          errors.perDate = 'Please select both Perishable From and To dates';
        }

        // Additional validation for date range (optional)
        // You can add logic here to ensure the "from" date is before the "to" date,
        // or implement more complex date range validation depending on your requirements.
      }

      // Emit the errors if there are any
      if (Object.keys(errors).length > 0) {
        emit('validation-errors', errors); // New line to emit errors
      }

      return errors;
    }
    // onMounted(() => {
    //   prodName.value.validate = () => {
    //     if (!prods.prodInfo.prodName || prods.prodInfo.prodName.length === 0) {
    //       prodName.value.hasError = true;
    //       return false;
    //     }
    //     prodName.value.hasError = false;
    //     return true;
    //   };

    //   prodLogo.value.validate = () => {
    //     if (!prods.prodInfo.prodLogo || prods.prodInfo.prodLogo.length === 0) {
    //       prodLogo.value.hasError = true;
    //       return false;
    //     }
    //     prodLogo.value.hasError = false;
    //     return true;
    //   };

    //   qrType.value.validate = () => {
    //     if (!prods.prodInfo.qrType || prods.prodInfo.qrType.length === 0) {
    //       qrType.value.hasError = true;
    //       return false;
    //     }
    //     qrType.value.hasError = false;
    //     return true;
    //   };

    //   quant.value.validate = () => {
    //     if (!prods.prodInfo.quantity || prods.prodInfo.quantity.length === 0) {
    //       quant.value.hasError = true;
    //       return false;
    //     }
    //     quant.value.hasError = false;
    //     return true;
    //   };
    // });

    const onRejected = (rejectedEntries) => {
      this.q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
      });
    };

    return {
      prodName,
      prodLogo,
      qrType,
      quant,
      perDate,
      perishing,
      validateProductForm,
      // valid1,
      updateTotal,
      prods,
      onRejected,
    };
  },
});
</script>
