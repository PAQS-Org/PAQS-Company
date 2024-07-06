<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
    :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3
            class="font-semibold text-lg"
            :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']"
          >
            Generate QR Code
          </h3>
        </div>
      </div>
    </div>
    <form>
      <q-stepper
        ref="stepperRef"
        v-model="step"
        contracted
        color="primary"
        animated
      >
        <!-- Step 1 -->
        <q-step :name="1" title="Product Info" icon="feed" :done="step > 1">
          <div class="flex flex-wrap flex-center">
            <h1 class="text-2xl">Requisition</h1>
          </div>
          <div class="q-gutter-md">
            <div class="m-8">
              <q-input
                ref="prodName"
                v-model="prods.prodInfo.prodName"
                outlined
                color="purple-12"
                label="Name of Product"
                :rules="[
                  (val) => (val && val.length > 0) || 'Enter the product name',
                ]"
              >
                <template #prepend>
                  <q-icon name="inventory" />
                </template>
              </q-input>

              <q-input
                ref="batchCode"
                v-model="prods.prodInfo.batchCode"
                outlined
                color="purple-12"
                label="Batch Code"
                :rules="[
                  (val) => (val && val.length > 0) || 'Enter the batch code',
                ]"
              >
                <template #prepend>
                  <q-icon name="batch_prediction" />
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
                <q-tooltip class="bg-indigo" :offset="[10, 10]">
                  If the product is a <br />
                  <strong> perishable good or date bound</strong>, set <br />
                  the <strong>Manufacturing Date</strong> and the
                  <strong>Expiry Date</strong> <br />
                  of the product
                </q-tooltip>
              </q-toggle>
              <div v-show="prods.prodInfo.perish" class="flex flex-wrap ml-4">
                <!-- start the date -->
                <div class="w-full lg:w-12/12 px-4">
                  <div class="relative w-full mb-3">
                    <div class="flex flex-wrap flex-center">
                      <label for="expiry-date" class="mr-4 mb-4"
                        >Perishable Date</label
                      >
                    </div>
                    <div class="flex flex-center">
                      <q-input
                        ref="Name"
                        :model-value="`${prods.prodInfo.perDate.from}
                        - ${prods.prodInfo.perDate.to}`"
                        filled
                      >
                        <template #append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="prods.prodInfo.perDate" range>
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
                :rules="[
                  (val) =>
                    (val !== null && val !== '') || 'Please select an image',
                ]"
                @rejected="onRejected"
              >
                <template #prepend>
                  <q-icon name="image" />
                </template>
              </q-file>
              <div class="flex justify-center align-items-center">
                <img
                  v-if="prods.prodLogoUrl"
                  :src="prods.prodLogoUrl"
                  alt="Product Logo"
                  class="w-20 h-20"
                />
              </div>
              <q-select
                ref="qrType"
                v-model="prods.prodInfo.qrType"
                outlined
                class="mt-6"
                color="purple-12"
                :options="prods.prodInfo.imgFmt"
                label="QR Image format"
                :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Please select a QR code type',
                ]"
              >
                <template #prepend>
                  <q-icon name="tune" />
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
                :rules="[
                  (val) =>
                    (val >= 200 && val <= 100001) ||
                    'Please enter a value between 200 and 100,000',
                ]"
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
                  <q-icon name="attach_money" color="orange" />
                </template>

                <template #control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    {{ prods.total }}
                  </div>
                </template>
              </q-field>
            </div>
          </div>
          <!-- Step 1 ends -->
        </q-step>
        <!-- Step 2 -->
        <q-step :name="2" title="Payment Info" icon="payments" :done="step > 2">
          <div class="flex flex-wrap flex-center mb-1">
            <h1 class="text-2xl">Payment</h1>
          </div>
          <div
            class="flex flex-end"
            style="
              width: 42px;
              height: 30px;
              margin-left: 45%;
              flex-direction: column-reverse;
              align-content: center;
              justify-content: center;
              flex-wrap: wrap;
              margin-bottom: 10px;
            "
          >
            <img
              style="padding-right: 10px"
              src="../../assets/img/svg/visa.svg"
              alt="visa"
            />
            <img
              style="padding-right: 10px"
              src="../../assets/img/svg/mastercard.svg"
              alt="mastercard"
            />
            <img
              style="padding-right: 10px"
              src="../../assets/img/svg/vodafone.svg"
              alt="maestro"
            />
            <img
              style="padding-right: 10px"
              src="../../assets/img/svg/mtn.svg"
              alt="mastercard"
            />
          </div>
          <div class="q-gutter-md">
            <div class="m-8">
              <q-input
                ref="fullname"
                v-model="prods.payInfo.fullname"
                outlined
                color="purple-12"
                label="Full Name"
                readonly
              >
                <template #prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input
                v-model="prods.payInfo.email"
                class="mt-6"
                readonly
                outlined
                color="purple-12"
                label="Email Address"
              >
                <template #prepend>
                  <q-icon name="alternate_email" />
                </template>
              </q-input>
              <q-input
                ref="phoneNumber"
                v-model="prods.payInfo.phoneNumber"
                class="mt-6"
                outlined
                color="purple-12"
                label="Phone Number"
                :rules="[
                  (val) => (val && val.length > 5) || 'Enter your phone number',
                ]"
              >
                <template #prepend>
                  <q-icon name="phone" />
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
                  <q-icon name="attach_money" color="orange" />
                </template>

                <template #control>
                  <div
                    class="self-center full-width no-outline"
                    tabindex="0"
                    readonly
                  >
                    {{ prods.total }}
                  </div>
                </template>
              </q-field>
            </div>
          </div>
          <!-- Step 2 ends -->
        </q-step>
        <!-- Step 3 -->
        <q-step
          :name="3"
          title="Product Info"
          icon="announcement"
          :done="step > 3"
        >
          <div>
            <q-form class="q-gutter-md">
              <div class="m-8">
                <q-field
                  outlined
                  color="purple-12"
                  label="Name of Product *"
                  stack-label
                >
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="0">
                      {{ prods.prodInfo.prodName }}
                    </div>
                  </template>

                  <template #prepend>
                    <q-icon name="inventory" />
                  </template>
                </q-field>
                <q-field
                  class="mt-6"
                  outlined
                  color="purple-12"
                  label="Batch Code *"
                  stack-label
                >
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="0">
                      {{ prods.prodInfo.batchCode }}
                    </div>
                  </template>

                  <template #prepend>
                    <q-icon name="batch_prediction" />
                  </template>
                </q-field>
                <q-input
                  v-show="prods.prodInfo.perish ? true : false"
                  :model-value="`${prods.prodInfo.perDate.from} - ${prods.prodInfo.perDate.to}`"
                  class="q-mt-lg"
                  outlined
                  readonly
                  stack-label
                >
                  <template #prepend>
                    <q-icon name="date_range" />
                  </template>
                </q-input>
                <div class="flex justify-center align-items-center w-20 h-20">
                  <img
                    v-if="prods.prodLogoUrl"
                    outlined
                    class="mt-5 mb-5 w-20 h-20"
                    :src="prods.prodLogoUrl"
                    stack-label
                    readonly
                    color="purple-12"
                    label="Product Logo"
                  />
                </div>

                <q-field
                  outlined
                  class="mt-6"
                  stack-label
                  color="purple-12"
                  label="QR Image format"
                >
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="0">
                      {{ prods.prodInfo.qrType }}
                    </div>
                  </template>

                  <template #prepend>
                    <q-icon name="tune" />
                  </template>
                </q-field>

                <q-field
                  outlined
                  class="mt-6"
                  color="purple-12"
                  label="Quantity"
                  stack-label
                >
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="0">
                      {{ prods.prodInfo.quantity }}
                    </div>
                  </template>
                  <template #prepend>
                    <q-icon name="1k_plus" />
                  </template>
                </q-field>
                <hr class="rounded mt-6" />
                <div>
                  <!-- Mobile Money -->
                  <div class="flex flex-wrap flex-center mt-5">
                    <h1 class="text-2xl">Payment</h1>
                  </div>
                  <div
                    class="flex flex-end mt-1"
                    style="
                      width: 42px;
                      height: 30px;
                      margin-left: 45%;
                      flex-direction: column-reverse;
                      align-content: center;
                      justify-content: center;
                      flex-wrap: wrap;
                      margin-bottom: 10px;
                    "
                  >
                    <img
                      style="padding-right: 10px"
                      src="../../assets/img/svg/visa.svg"
                      alt="visa"
                    />
                    <img
                      style="padding-right: 10px"
                      src="../../assets/img/svg/mastercard.svg"
                      alt="mastercard"
                    />
                    <img
                      style="padding-right: 10px"
                      src="../../assets/img/svg/vodafone.svg"
                      alt="maestro"
                    />
                    <img
                      style="padding-right: 10px"
                      src="../../assets/img/svg/mtn.svg"
                      alt="mastercard"
                    />
                  </div>
                  <div>
                    <div class="flex flex-wrap ml-4">
                      <div class="w-full">
                        <div class="relative w-full mb-3">
                          <div>
                            <q-field
                              outlined
                              stack-label
                              color="purple-12"
                              type="text"
                              label="Full Name"
                            >
                              <template #control>
                                <div
                                  class="self-center full-width no-outline"
                                  tabindex="0"
                                >
                                  {{ prods.payInfo.fullname }}
                                </div>
                              </template>

                              <template #prepend>
                                <q-icon name="person" />
                              </template>
                            </q-field>
                          </div>
                          <div>
                            <q-field
                              outlined
                              stack-label
                              class="mt-6"
                              color="purple-12"
                              label="Email Address"
                            >
                              <template #control>
                                <div
                                  class="self-center full-width no-outline"
                                  tabindex="0"
                                >
                                  {{ prods.payInfo.email }}
                                </div>
                              </template>

                              <template #prepend>
                                <q-icon name="alternate_email" />
                              </template>
                            </q-field>
                          </div>
                          <div>
                            <q-field
                              outlined
                              class="mt-6"
                              stack-label
                              color="purple-12"
                              label="Phone Number"
                            >
                              <template #control>
                                <div
                                  class="self-center full-width no-outline"
                                  tabindex="0"
                                >
                                  {{ prods.payInfo.phoneNumber }}
                                </div>
                              </template>

                              <template #prepend>
                                <q-icon name="phone" />
                              </template>
                            </q-field>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                      <q-icon name="attach_money" color="orange" />
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
                class="flex flex-center"
                label="Initiate the payment process."
              />
            </q-form>
          </div>
          <!-- step 3 ends -->
        </q-step>
        <!-- step 4 -->
        <q-step :name="4" title="Peace Out" icon="settings">
          <div class="grid">
            <div class="flex-row text-center">
              <h3 style="font-size: 60px; text-transform: uppercase">
                Thank You
              </h3>
            </div>
            <div class="flex-col flex-start">
              <h5
                style="
                  font-size: 20px;
                  margin-left: 10px;
                  margin-top: 20px;
                  margin-bottom: 20px;
                "
              >
                We are grateful for doing business with us. Kindly check your
                email for a link to download the QR codes.
              </h5>
            </div>
            <div class="flex-col text-center">
              <q-btn
                class="q-m-lg"
                color="grey-4"
                text-color="purple"
                glossy
                unelevated
                label="Print Receipt"
                icon="receipt"
              />
            </div>
          </div>
          <!-- step 4 ends -->
        </q-step>
        <template #navigation>
          <q-stepper-navigation class="flex flex-center w-full relative">
            <q-btn
              color="primary"
              :label="step === 4 ? 'Finish' : 'Continue'"
              @click.prevent="handleNavigation"
            />
            <q-btn
              v-if="step > 1"
              flat
              color="primary"
              label="Back"
              class="q-ml-sm"
              @click="prev"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </form>
    <!-- </table> -->
  </div>
  <!-- </div> -->
</template>

<script>
import { ref, defineComponent, computed, watch } from "vue";
import { useQuasar } from "quasar";
import { useProdStore } from "../../stores/prods";

export default defineComponent({
  props: {
    color: {
      default: "light",
      validator(value) {
        return ["light", "dark"].indexOf(value) !== -1;
      },
    },
  },
  setup() {
    const q = useQuasar();
    const prods = useProdStore();

    const accept = ref(false);
    const step = ref(1);
    const stepperRef = ref(null);
    const prodName = ref(null);
    const batchCode = ref(null);
    const prodLogo = ref(null);
    const qrType = ref(null);
    const quant = ref(null);
    const perDate = ref([]);
    const perishing = ref([null]);
    const fullname = ref(null);
    const phoneNumber = ref(null);
    const imageUrl = ref("");

    const updateTotal = () => {
      const newQuant = prods.prodInfo.quantity;
      prods.setTotals(newQuant);
    };

    const onRejected = (rejectedEntries) => {
      this.q.notify({
        type: "negative",
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
      });
    };
    const prev = () => {
      stepperRef.value.previous();
    };
    const updateFile = () => {
      imageUrl.value = URL.createObjectURL(prods.prodInfo.prodLogo.value);
    };
    const prodLogos = computed(() => prods.prodInfo.prodLogo);
    watch(prodLogos, () => {}, { deep: true });

    const handleNavigation = async () => {
      let allInputsValid = true;

      // Check validation for input fields in step 1
      if (step.value === 1) {
        allInputsValid =
          prodName.value &&
          prodName.value.validate() &&
          batchCode.value &&
          batchCode.value.validate() &&
          prodLogo.value &&
          prodLogo.value.validate() &&
          qrType.value &&
          qrType.value.validate() &&
          quant.value &&
          quant.value.validate();
      } else if (step.value === 2) {
        allInputsValid = phoneNumber.value && phoneNumber.value.validate();
      }

      // Proceed to next step if all validations passed
      if (allInputsValid) {
        // Check if we are on step 3 and accept is false, disable navigation
        if (step.value === 3 && !accept.value) {
          q.notify({
            type: "negative",
            message: "You have not accepted the process.",
          });
          return;
        }
        if (step.value === 3 && accept.value) {
          try {
            await prods.handlePayment();
          } catch (error) {
            // Handle payment error
            console.error("Payment request failed:", error);
            q.notify({
              type: "negative",
              message: "Payment failed. Please try again.",
            });
            return; // Prevent stepper navigation on failure
          }
        }
        // Check if we are on step 4, navigate to step 1 if "Finish" is clicked
        if (step.value === 4) {
          prods.prodInfo.prodName = "";
          prods.prodInfo.batchCode = "";
          prods.prodInfo.prodLogo = "";
          prods.prodInfo.qrType = "";
          prods.prodInfo.quantity = "";
          prods.payInfo.phoneNumber = "";
          prods.total = 0;
          stepperRef.value.goTo(1); // Go back to step 1
          // Reset any other necessary variables or states
          return;
        }

        // Otherwise, proceed to the next step
        stepperRef.value.next();
      } else {
        // Handle validation errors (optional)
        console.error("One or more input fields failed validation.");
      }
    };

    return {
      q,
      step,
      prodName,
      batchCode,
      prodLogo,
      imageUrl,
      qrType,
      quant,
      perDate,
      perishing,
      fullname,
      phoneNumber,
      accept,
      prods,
      prodLogos,
      onRejected,
      updateTotal,
      handleNavigation,
      prev,
      updateFile,
      stepperRef,
    };
  },
});
</script>
<style scoped>
hr.rounded {
  border-top: 8px solid #bbb;
  border-radius: 5px;
}
</style>
