<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md row items-start q-gutter-md" style="max-width: 400px">
      <q-card class="shadow-16 bg-gray-200">
        <div class="flex justify-center items-center bg-white">
          <img class="my-card" src="../../assets/img/svg/usershield.svg" />
        </div>

        <q-list class="">
          <q-form @submit.prevent="onSubmit" ref="form">
            <q-input
              v-model.trim="storeAuth.email"
              class="q-mx-lg"
              type="email"
              label="Email"
              lazy-rules
              :error="$v.user.email.$error"
              :error-message="'A valid email is required'"
            >
              <template #prepend>
                <q-icon name="email" />
              </template>
            </q-input>

            <q-input
              v-model.trim="$v.user.password.$model"
              class="q-mx-lg"
              label="Password"
              :error="$v.user.password.$error"
              :error-message="'Password is required'"
              :type="visibility ? 'text' : 'password'"
            >
              <template #prepend>
                <q-icon name="password" />
              </template>
              <template #append>
                <q-icon
                  :name="visibility ? 'visibility' : 'visibility_off'"
                  class="cursor-pointer"
                  @click="visibility = !visibility"
                />
              </template>
            </q-input>

            <div align="center" class="q-mx-sm row q-my-lg">
              <q-btn
                class="col"
                label="Submit"
                type="submit"
                :loading="isLoading"
                color="primary"
                :disable="!$v.$anyDirty || $v.$invalid"
              />
              <div
                @click.prevent="forgottenPassword"
                class="col q-ml-sm cursor-pointer"
              >
                <span>Forgot password?</span>
              </div>
              <q-btn
                label="Reset"
                type="reset"
                color="primary"
                flat
                class="col"
                @click.prevent="onReset"
              />
            </div>

            <q-separator />

            <q-list align="center" class="q-mt-lg q-mb-lg">
              <div>
                <p>or sign up</p>
              </div>
              <q-btn
                class="q-ma-sm"
                to="/auth/register"
                color="primary"
                label="Sign Up"
              />
            </q-list>
          </q-form>
        </q-list>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import { useAuthStore } from "src/stores/auth.js";
import { useQuasar } from "quasar";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

defineOptions({
  name: "loginComp",
});

// const { isLoading, logins, resetPassword } = useAuthStore();
const storeAuth = useAuthStore();

const $q = useQuasar();

const form = ref(null);
const user = reactive({ email: computed(() => storeAuth.email), password: "" });
const visibility = ref(false);

const rules = {
  user: {
    email: { required, email },
    password: { required },
  },
};

const $v = useVuelidate(rules, { user });

const onSubmit = async () => {
  $v.value.$touch();
  if ($v.value.$invalid) {
    $q.notify({
      type: "warning",
      message: "Validation error. Please check your inputs.",
    });
    return;
  }

  if (!storeAuth.isLoading) {
    try {
      const response = await storeAuth.logins(user);
      if (response.status === 200) {
        $q.notify({
          type: "positive",
          message: "Login successful!",
        });
      } else {
        const errorMessage = response.data
          ? response.data.message
          : "Check your email and password.";
        $q.notify({
          type: "negative",
          message: errorMessage,
        });
      }
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : "An error occurred.";
      $q.notify({
        type: "negative",
        message: errorMessage,
      });
    }
  }
};

const forgottenPassword = async () => {
  user.password = ""; // Ensure the password field is empty
  $v.value.user.password.$reset(); // Reset password validation
  $v.value.user.email.$touch(); // Validate email

  if ($v.value.user.email.$invalid) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "Please provide a valid email address",
    });
    return;
  }

  // Proceed with forgot password logic
  try {
    // Replace with your actual forgot password function
    await storeAuth.resetPassword({
      email: user.email,
      redirect_url: "http://localhost:9000/#/auth/forgot",
    });
    $q.notify({
      type: "positive",
      message: "Password reset email sent successfully!",
    });
  } catch (error) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "Error submitting form",
    });
  }
};

const onReset = () => {
  $v.value.$reset();
  user.email = "";
  user.password = "";
  visibility.value = false;
};
</script>

<style scoped>
.my-card {
  max-width: 50%;
  height: auto;
}
</style>
