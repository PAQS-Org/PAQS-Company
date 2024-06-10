<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md row items-start q-gutter-md" style="max-width: 400px">
      <q-card class="my-card basic shadow-16">
        <img src="https://cdn.quasar.dev/img/parallax2.jpg" />

        <q-list class="">
          <Form ref="form">
            <q-input
              v-model="user.email"
              class="q-mx-lg"
              type="email"
              label="Email"
              lazy-rules
              :rules="[required('Email'), email(user.email)]"
            >
              <template #prepend>
                <q-icon name="email" />
              </template>
            </q-input>

            <q-input
              v-model="user.password"
              class="q-mx-lg"
              label="Password"
              :rules="[(v) => required(v, 'Password')]"
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

            <div align="center" class="q-mb-lg q-mt-lg">
              <q-btn
                label="Submit"
                type="submit"
                :loading="isLoading"
                color="primary"
                @click.prevent="onSubmit"
              />
              <router-link :to="{ name: 'dashboard' }" class="col-12 q-ml-sm">
                <span>Forgot password?</span>
              </router-link>
              <q-btn
                label="Reset"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
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
          </Form>
        </q-list>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import useValidation from "src/composables/validation.js";
import { useAuthStore } from "src/stores/auth.js";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "LoginComp",

  setup() {
    const { required, email } = useValidation();
    const { isLoading, login } = useAuthStore();

    const $q = useQuasar();

    // const storedAccept = localStorage.getItem('keepLoggedIn');
    // const accept = ref(storedAccept !== null ? storedAccept === 'true' : false);
    const form = ref(null);
    const user = reactive({ email: undefined, password: undefined });
    const visibility = ref(false);

    const validate = () => {
      const validEmail = email(user.email);
      // You can add more validation checks here

      return validEmail; // Add more conditions based on your validation requirements
    };

    const onSubmit = async () => {
      if (!isLoading) {
        if (validate()) {
          try {
            const response = await login(user);
            if (response.status === 200) {
              // Successful login
              // if (accept.value) {
              //   localStorage.setItem('access_token', response.data.access);
              // } else {
              //   localStorage.removeItem('keepLoggedIn');
              // }
              $q.notify({
                type: "positive",
                message: "Login successful!",
              });
            } else {
              // Unsuccessful login, display error message
              const errorMessage = response.data
                ? response.data.message
                : "Check your email and password.";
              $q.notify({
                type: "negative",
                message: errorMessage,
              });
            }
          } catch (error) {
            // Display the error message to the user
            const errorMessage = error.response
              ? error.response.data.message
              : "I did it.";
            $q.notify({
              type: "negative",
              message: errorMessage,
            });
          }
        } else {
          // Display an error message to the user (e.g., validation error)
          $q.notify({
            type: "warning",
            message: "Validation error. Please check your inputs.",
          });
        }
      }
    };

    const onReset = () => {
      form.value.resetValidation();
      // ... your other reset logic
    };

    return {
      form,
      email,
      required,
      user,
      visibility,
      validate,
      isLoading,
      onSubmit,
      onReset,
    };
  },
});
</script>
