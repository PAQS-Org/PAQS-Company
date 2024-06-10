import { $axios } from 'boot/axios';

export default {
  login: (credentials) => $axios.post('account/company-login/', credentials),
  facebook: (credentials) => $axios.post('socialLogin/facebook/', credentials),
  x: (credentials) => $axios.post('socialLogin/twitter/', credentials),
  google: (credentials) => $axios.post('socialLogin/google/', credentials),
  register: (data) => $axios.post('account/company-register/', data),
  forgotPassword: (email) => $axios.post('account/forgot-password/', email),
  logout: () => $axios.get('account/logout/'),
  payment: (data) => $axios.post('payment/initiate-payment/', data),
};

// export async function login(credentials) {
//   try {
//     const response = await $axios.post('account/company-user/', credentials);
//     return response.data; // Access tokens and company information
//   } catch (error) {
//     throw error.response.data; // Handle login errors
//   }
// }
