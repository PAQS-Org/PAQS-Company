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
            Update Batch Message
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

              <q-select
                ref="upReason"
                v-model="prods.prodInfo.upReason"
                outlined
                class="mt-6"
                color="purple-12"
                :options="prods.prodInfo.reason"
                label="Reason"
                :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Please indicate the reason for the update',
                ]"
              >
                <template #prepend>
                  <q-icon name="psychology_alt" />
                </template>
              </q-select>

              <q-input
                ref="message"
                v-model="prods.prodInfo.message"
                outlined
                clearable
                counter
                class="mt-6"
                color="purple-12"
                type="textarea"
                label="Message *"
                :rules="[
                  (val) => (val && val.length > 10) || 'Enter the message',
                ]"
                lazy-rules
              >
                <template #prepend>
                  <q-icon name="edit_note" />
                </template>
              </q-input>
            </div>
          </div>
          <!-- Step 1 ends -->
        </q-step>

        <!-- Step 2 -->
        <q-step :name="2" title="Summary" icon="preview" :done="step > 2">
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

                <q-field
                  outlined
                  class="mt-6"
                  stack-label
                  color="purple-12"
                  label="Reason *"
                >
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="0">
                      {{ prods.prodInfo.upReason }}
                    </div>
                  </template>

                  <template #prepend>
                    <q-icon name="psychology_alt" />
                  </template>
                </q-field>

                <q-field
                  outlined
                  class="mt-6"
                  color="purple-12"
                  label="Message *"
                  stack-label
                >
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="0">
                      {{ prods.prodInfo.message }}
                    </div>
                  </template>

                  <template #prepend>
                    <q-icon name="edit_note" />
                  </template>
                </q-field>

                <hr class="rounded mt-6" />
              </div>
              <q-toggle
                v-model="accept"
                class="flex flex-center"
                label="I accept the effect of the changes."
              />
            </q-form>
          </div>
          <!-- step 3 ends -->
        </q-step>
        <!-- step 4 -->
        <q-step :name="3" title="Peace Out" icon="done_all">
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
                The updates have been effected. You can re-download the updated
                version.
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
              :label="step === 3 ? 'Finish' : 'Continue'"
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
    const upReason = ref(null);
    const message = ref(null);

    const onRejected = (rejectedEntries) => {
      this.q.notify({
        type: "negative",
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
      });
    };
    const prev = () => {
      stepperRef.value.previous();
    };

    const handleNavigation = async () => {
      let allInputsValid = true;

      // Check validation for input fields in step 1
      if (step.value === 1) {
        allInputsValid =
          prodName.value &&
          prodName.value.validate() &&
          batchCode.value &&
          batchCode.value.validate() &&
          upReason.value &&
          upReason.value.validate() &&
          message.value &&
          message.value.validate;
      }

      // Proceed to next step if all validations passed
      if (allInputsValid) {
        // Check if we are on step 3 and accept is false, disable navigation
        if (step.value === 2 && !accept.value) {
          q.notify({
            type: "negative",
            message: "You have not accepted the process.",
          });
          return;
        }
        if (step.value === 2 && accept.value) {
          try {
            await prods.updatecodes();
          } catch (error) {
            // Handle payment error
            console.error("Process request failed:", error);
            q.notify({
              type: "negative",
              message: "Process failed. Please try again.",
            });
            return; // Prevent stepper navigation on failure
          }
        }
        // Check if we are on step 4, navigate to step 1 if "Finish" is clicked
        if (step.value === 3) {
          prods.prodInfo.prodName = "";
          prods.prodInfo.batchCode = "";
          prods.prodInfo.upReason = "";
          prods.prodInfo.message = "";
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
      upReason,
      message,
      accept,
      prods,

      onRejected,
      handleNavigation,
      prev,
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
