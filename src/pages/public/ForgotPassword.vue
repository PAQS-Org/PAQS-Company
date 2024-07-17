<template>
  <Form ref="form" @submit="resetPassword">
    <Input
      v-model="user.email"
      label="Email"
      :rules="[(v) => required(v, 'Email'), (v) => email(v)]"
      class="q-pt-md"
    />
    <div class="q-pt-lg row justify-between">
      <div class="col-6">
        <div class="row">
          <router-link :to="{ name: 'Login' }" class="col-12">
            <span>Have credentials?</span>
          </router-link>
        </div>
      </div>
      <div class="col-6 text-right">
        <Button
          label="Login"
          aria-label="Login"
          type="submit"
          :loading="isLoading"
        />
      </div>
    </div>
  </Form>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, sameAs, helpers } from "@vuelidate/validators";
import { useAuthStore } from "stores/auth";

const $q = useQuasar();
const auths = useAuthStore();

const newPassword = ref(null);
const confirmPassword = ref(null);

const passwordComplexity = helpers.withMessage(
  "Password must contain at least one letter, one number, and one special character",
  (value) =>
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(value)
);

const rules = {
  newPassword: { required, minLength: minLength(8), passwordComplexity },
  confirmPassword: { required, sameAsPassword: sameAs(newPassword) },
};

const v$ = useVuelidate(rules, {
  newPassword,
  confirmPassword,
});

const resetPassword = async () => {
  v$.value.$touch();
  if (v$.value.$pending || v$.value.$invalid) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "Please correct the errors in the form",
    });
    return;
  }
  try {
    await auths.setNewPassword({
      password: newPassword.value,
      token: localStorage.getItem("token"),
      uidb64: localStorage.getItem("uid64"),
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
</script>
