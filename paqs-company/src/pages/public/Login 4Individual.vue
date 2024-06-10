<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md row items-start q-gutter-md" style="max-width: 400px">
      <q-card class="my-card basic shadow-16">
        <img src="https://cdn.quasar.dev/img/parallax2.jpg" />

        <q-list class="">
          <Form ref="form">
            <q-input
              v-model="user.emails"
              class="q-mx-lg"
              type="email"
              label="Email"
              lazy-rules
              :rules="[(v) => required(v, 'Email'), (v) => email(v)]"
            >
              <template #prepend>
                <q-icon name="email" />
              </template>
            </q-input>

            <q-input
              v-model="user.passwd"
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

            <q-checkbox v-model="accept" label="keep me logged in" />

            <div align="center" class="q-mb-lg">
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
            <div align="center" class="q-mt-lg q-mb-lg">
              <div>
                <p>or login with</p>
              </div>
              <div class="flex flex-nowrap q-ml-xl">
                <div>
                  <q-btn
                    class="q-ma-sm q-ml-lg"
                    color="primary"
                    icon="facebook"
                    @click.prevent="auth('facebook')"
                  />
                </div>
                <div>
                  <q-btn
                    class="q-ma-sm"
                    color="secondary"
                    icon="google"
                    @click.prevent="auth('google')"
                  />
                </div>
                <div>
                  <q-btn
                    class="q-ma-sm"
                    color="amber"
                    glossy
                    text-color="black"
                    icon="twitter"
                    @click.prevent="auth('twitter')"
                  />
                </div>
              </div>
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
import { defineComponent, ref, onMounted } from "vue";
import useValidation from "src/composables/validation.js";
import { useAuthStore } from "src/stores/auth.js";
import { useHelloStore } from "src/stores/social.js";

export default defineComponent({
  name: "LoginComp",

  setup() {
    const { required, email } = useValidation();
    const { isLoading, login } = useAuthStore();
    const helloStore = useHelloStore();

    onMounted(() => {
      helloStore.initialize(); // Initialize on component mount
    });

    const accept = ref(false);
    const form = ref(null);
    const user = ref({ emails: undefined, passwd: undefined });
    const visibility = ref(false);

    const auth = async function (network) {
      await helloStore.auth(network).then(() => {
        this.$router.push("dashboard");
      });
    };
    const onSubmit = function () {
      if (!isLoading) {
        form.value.validate({}).then((success) => {
          if (success) {
            login(user.value);
          } else {
            // Display an error message to the user
          }
        });
      }
    };

    return {
      form,
      email,
      required,
      auth,
      user,
      accept,
      visibility,
      isLoading,
      onSubmit,
    };
  },
});
</script>
