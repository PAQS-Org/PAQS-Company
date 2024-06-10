<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md row items-start q-gutter-md" style="max-width: 400px">
      <q-card class="shadow-16 bg-gray-200">
        <div class="flex justify-center items-center bg-white">
          <img class="my-card" src="../../assets/img/svg/userplus.svg" />
        </div>

        <q-list class="q-ma-sm">
          <q-form @submit.prevent="onSubmit" ref="form">
            <q-input
              v-model.trim="$v.user.first_name.$model"
              class="q-mx-lg"
              type="text"
              label="First Name"
              :error="!$v.user.first_name.required && $v.user.first_name.$dirty"
              :error-message="'First name is required'"
            >
              <template #prepend>
                <q-icon name="person" />
              </template>
            </q-input>
            <q-input
              v-model.trim="$v.user.last_name.$model"
              class="q-mx-lg"
              type="text"
              label="Last Name"
              :error="!$v.user.last_name.required && $v.user.last_name.$dirty"
              :error-message="'Last name is required'"
            >
              <template #prepend>
                <q-icon name="person" />
              </template>
            </q-input>
            <q-input
              v-model.trim="$v.user.email.$model"
              class="q-mx-lg"
              type="email"
              label="Email"
              :error="
                (!$v.user.email.required && $v.user.email.$dirty) ||
                (!$v.user.email.email && $v.user.email.$dirty)
              "
              :error-message="'A valid email is required'"
            >
              <template #prepend>
                <q-icon name="email" />
              </template>
            </q-input>

            <q-input
              v-model.trim="$v.user.password.$model"
              class="q-mx-lg"
              :type="isPwd ? 'password' : 'text'"
              label="Password"
              :error="
                (!$v.user.password.required && $v.user.password.$dirty) ||
                (!validPassword() && $v.user.password.$dirty)
              "
              :error-message="'Password is invalid'"
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
              v-model.trim="$v.user.company_name.$model"
              class="q-mx-lg"
              type="text"
              label="Name of Company"
              :error="
                !$v.user.company_name.required && $v.user.company_name.$dirty
              "
              :error-message="'Company name is required'"
            >
              <template #prepend>
                <q-icon name="apartment" />
              </template>
            </q-input>
            <q-file
              v-model.trim="$v.user.company_logo.$model"
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
                :disable="!$v.$anyDirty || $v.$invalid"
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

<script setup>
import { reactive, ref } from "vue";
import { useAuthStore } from "src/stores/auth.js";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

const { isLoading, register } = useAuthStore();

defineOptions({
  name: "registerComp",
});

const form = ref(null);

const user = reactive({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  company_name: "",
  company_logo: null,
});

const isPwd = ref(true);
const wrongPass = ref(false);

const rules = {
  user: {
    first_name: { required },
    last_name: { required },
    email: { required, email },
    password: { required },
    company_name: { required },
    company_logo: { required },
  },
};

const $v = useVuelidate(rules, { user });

const validPassword = () => {
  const pwd = user.password;
  return (
    pwd.length >= 8 &&
    /[A-Z]/.test(pwd) &&
    /\d/.test(pwd) &&
    /[!@#$%^&*()-_+=]/.test(pwd)
  );
};

const resetCompanyLogo = () => {
  user.company_logo = null;
};

const onSubmit = async () => {
  $v.value.$touch();
  if ($v.value.$invalid) {
    return;
  }

  if (!isLoading) {
    if (validPassword()) {
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
      wrongPass.value = true;
    }
  }
};

const resetForm = () => {
  if (form.value) {
    form.value.resetValidation();
  }
  $v.value.$reset();
  user.first_name = "";
  user.last_name = "";
  user.email = "";
  user.password = "";
  user.company_name = "";
  user.company_logo = null;
  isPwd.value = true;
  wrongPass.value = false;
};
</script>

<style scoped>
.my-card {
  max-width: 50%;
  height: auto;
}
.password-criteria div {
  display: flex;
  align-items: center;
}
</style>
