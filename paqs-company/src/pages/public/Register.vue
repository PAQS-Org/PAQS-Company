<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md row items-start q-gutter-md" style="max-width: 400px">
      <q-card class="shadow-16">
        <div class="flex justify-center items-center">
          <img class="my-card" src="../../assets/img/svg/userplus.svg" />
        </div>

        <q-list class="q-ma-sm">
          <q-form>
            <q-input
              v-model="user.first_name"
              class="q-mx-lg"
              type="text"
              label="First Name"
            >
              <template #prepend>
                <q-icon name="person" />
              </template>
            </q-input>
            <q-input
              v-model="user.last_name"
              class="q-mx-lg"
              type="text"
              label="Last Name"
            >
              <template #prepend>
                <q-icon name="person" />
              </template>
            </q-input>
            <q-input
              v-model="user.email"
              class="q-mx-lg"
              type="email"
              label="Email"
              :rules="[required('Email'), email(user.email)]"
            >
              <template #prepend>
                <q-icon name="email" />
              </template>
            </q-input>

            <q-input
              v-model="user.password"
              class="q-mx-lg"
              :type="isPwd ? 'password' : 'text'"
              label="Password"
              :rules="[required('Password')]"
            >
              <template #prepend>
                <q-icon name="password" />
              </template>
              <template #append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-separator />
            <div v-if="wrongPass">
              <div class="password-criteria q-pa-sm">
                <div class="text-subtitle2 q-mb-sm">Password Criteria:</div>
                <div>
                  <q-icon
                    :name="validPassword.length ? 'check_circle' : 'cancel'"
                    :color="validPassword.length ? 'positive' : 'negative'"
                  />
                  Must be at least 8 characters long.
                </div>
                <div>
                  <q-icon
                    :name="validPassword.capital ? 'check_circle' : 'cancel'"
                    :color="validPassword.capital ? 'positive' : 'negative'"
                  />
                  Must contain at least one capital letter.
                </div>
                <div>
                  <q-icon
                    :name="validPassword.number ? 'check_circle' : 'cancel'"
                    :color="validPassword.number ? 'positive' : 'negative'"
                  />
                  Must contain at least one number.
                </div>
                <div>
                  <q-icon
                    :name="validPassword.symbol ? 'check_circle' : 'cancel'"
                    :color="validPassword.symbol ? 'positive' : 'negative'"
                  />
                  Must contain at least one special character: !@#$%^&*()-_+=
                </div>
              </div>
              <q-separator />
            </div>
            <q-input
              v-model="user.company_name"
              class="q-mx-lg"
              type="text"
              label="Name of Company"
            >
              <template #prepend>
                <q-icon name="apartment" />
              </template>
            </q-input>
            <q-file
              v-model="user.company_logo"
              class="q-mx-lg"
              bottom-slots
              label="Company Logo"
              accept=".jpg, .png, .svg, image/*"
              counter
            >
              <template #prepend>
                <q-icon name="image" @click.stop />
              </template>
              <template #append>
                <q-icon
                  name="close"
                  class="cursor-pointer"
                  @click.stop="resetCompanyLogo"
                />
              </template>
            </q-file>

            <div align="center" class="q-mb-lg">
              <q-btn
                label="Sign Up"
                to="/auth/login"
                type="submit"
                color="primary"
                @click.prevent="onSubmit"
              />
              <q-btn
                label="Reset"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
                @click.prevent="resetForm"
              />
            </div>
          </q-form>
        </q-list>
        <q-separator />
        <q-list align="center" class="q-mt-lg q-mb-lg">
          <div>
            <p>or sign in</p>
          </div>
          <q-btn
            to="/auth/login"
            class="q-ma-sm"
            color="primary"
            label="Sign In"
          />
        </q-list>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import useValidation from "src/composables/validation.js";
import { useAuthStore } from "src/stores/auth.js";

export default defineComponent({
  name: "RegisterComp",

  setup() {
    const { required, email } = useValidation();
    const { isLoading, register } = useAuthStore();

    const form = ref(null);

    const user = reactive({
      first_name: undefined,
      last_name: undefined,
      email: undefined,
      password: undefined,
      company_name: undefined,
      company_logo: undefined,
    });
    const isPwd = ref(true);
    const wrongPass = ref(false);

    const validate = () => {
      const validEmail = email(user.email);
      // You can add more validation checks here

      return validEmail; // Add more conditions based on your validation requirements
    };
    const resetCompanyLogo = () => {
      user.company_logo = undefined;
    };

    const onSubmit = async () => {
      if (!isLoading) {
        if (validate()) {
          const formData = new FormData();
          formData.append("first_name", user.first_name);
          formData.append("last_name", user.last_name);
          formData.append("email", user.email);
          formData.append("password", user.password);
          formData.append("company_name", user.company_name);
          formData.append("company_logo", user.company_logo);

          try {
            await register(formData);
          } catch (error) {
            // Handle the error
          }
        } else {
          // Display an error message to the user
        }
      }
    };
    const resetForm = () => {
      if (form.value) {
        form.value.resetValidation(); // Reset validation state if form is available
        this.user = {
          first_name: undefined,
          last_name: undefined,
          email: undefined,
          password: undefined,
          company_name: undefined,
          company_logo: undefined,
        };
        isPwd.value = true;
        wrongPass.value = false;
      }

      // Reset user data
      Object.keys(user).forEach((key) => {
        user[key] = undefined;
      });

      resetCompanyLogo(); // Reset company_logo

      // Other reset logic as needed
    };

    return {
      wrongPass,
      isPwd,
      form,
      required,
      email,
      user,
      isLoading,
      onSubmit,
      resetForm,
      resetCompanyLogo,
    };
  },
});
</script>
<style scoped>
.my-card {
  height: 50%;
  width: 50%;
}
</style>
