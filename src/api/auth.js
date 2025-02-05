import { $axios } from "boot/axios";

export default {
  register: (data) => $axios.post("account/company-register/", data),
  login: (credentials) => $axios.post("account/company-login/", credentials),
  forgotPasswords: (email) =>
    $axios.post("account/company-request-reset-email/", email),
  setNewPasswords: (data) =>
    $axios.patch("/account/company-password-reset/", data),
  logout: (token) => $axios.post("account/logout/", token),
  facebook: (credentials) => $axios.post("socialLogin/facebook/", credentials),
  x: (credentials) => $axios.post("socialLogin/twitter/", credentials),
  google: (credentials) => $axios.post("socialLogin/google/", credentials),
  payment: (data) => $axios.post("payment/initiate-payment/", data),
  updateCode: (data) => $axios.patch("product/updates/", data),
  processCodes: (data) => $axios.post("product/generate/", data),
};
