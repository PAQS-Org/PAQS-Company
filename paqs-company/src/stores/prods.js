/* eslint-disable linebreak-style */
import { defineStore } from "pinia";
// import * as Sentry from '@sentry/vue';
// import AUTH from 'src/api/auth.js';
import { $axios } from "boot/axios";

import { ref } from "vue";

import { useAuthStore } from "./auth";

export const useProdStore = defineStore({
  id: "prod",
  state: () => ({
    step: 1,
    stepperRef: ref(null),
    companyName: "",
    prodInfo: {
      prodName: "tomatoe",
      batchCode: "12345ABCD",
      perish: false,
      perDate: { from: "2022/01/01", to: "2023/01/05" },
      prodLogo: ref(null),
      qrType: "svg",
      imgFmt: ["svg", "png", "jpg"],
      quantity: "500",
    },
    payInfo: {
      fullname: "AlincoBay",
      email: "blackmore@gmail.com",
      phoneNumber: "225552252",
    },
    total: 0,
  }),

  getters: {
    totals() {
      const quantity = parseInt(this.$state.prodInfo.quantity, 10);
      return Math.max(
        0,
        quantity *
          (quantity <= 200
            ? 0
            : quantity <= 500
            ? 0.1
            : quantity <= 1000
            ? 0.08
            : quantity <= 5000
            ? 0.06
            : quantity <= 10000
            ? 0.04
            : quantity <= 50000
            ? 0.02
            : quantity >= 100000
            ? 0.01
            : 0)
      );
    },
    prodLogoUrl() {
      if (this.prodInfo.prodLogo) {
        return URL.createObjectURL(this.prodInfo.prodLogo);
      }
      return null;
    },
  },
  actions: {
    setCompanyName(companyName) {
      this.companyName = companyName;
      console.log(companyName);
    },
    setStep(step) {
      this.step = step;
    },
    setProdInfo(prodInfo) {
      this.prodInfo = { ...this.prodInfo, ...prodInfo };
    },
    setPayInfo(payInfo) {
      this.payInfo = { ...this.payInfo, ...payInfo };
    },
    setTotals(newQuant) {
      this.prodInfo.quantity = newQuant;
      this.total = this.totals;
    },
    resetState() {
      this.step = 1;
      this.prodInfo = {
        prodName: "",
        batchCode: "",
        perish: false,
        perDate: { manufactured: "2020-07-08", expiry: "2020-07-17" },
        prodLogo: null,
        qrType: "",
        imgFmt: ["svg", "png", "jpg"],
        quantity: "",
      };
      this.payInfo = {
        fullname: "",
        cardNumber: "",
        cardType: "",
        monthExp: null,
        yearExp: "",
        cvv: "",
        phoneNumber: "",
        provider: "",
      };
      this.total = 0;
    },
    handlePaystackSuccess() {
      window.opener.postMessage({ status: "success" }, "*"); // Send message to original window
      window.close(); // Close the Paystack checkout window
    },

    getToken() {
      return localStorage.getItem("user.access");
    },
    async handlePayment() {
      this.isLoading = true;
      this.paymentError = null;
      this.paymentSuccess = false;
      const authStore = useAuthStore();
      const token = authStore.getAccessToken;

      try {
        const headers = {};
        if (token) {
          // $axios.defaults.headers.common.Authorization = `Bearer ${token}`;
          headers.Authorization = `Bearer ${token}`;
        }
        const response = await $axios.post(
          "payment/initiate-payment/",
          {
            email: this.payInfo.email,
            quantity: this.prodInfo.quantity,
            product_name: this.prodInfo.prodName,
          },
          { headers }
        );

        if (response.status === 200) {
          const paymentUrl = response.data.payment_url;

          // Open Paystack checkout in a new window with appropriate options
          const checkoutWindow = window.open(
            paymentUrl,
            "_parent",
            "width=600,height=400,resizable=yes,scrollbars=yes"
          );

          // Handle successful transaction using postMessage
          const handleSuccessMessage = (event) => {
            if (event.origin !== paymentUrl) return;

            if (event.data.status === "success") {
              this.paymentSuccess = true;
              this.ProdPost();
              this.stepperRef.value.next(); // Or handle success state accordingly
              checkoutWindow.close(); // Close checkout window
            } else {
              this.paymentError = event.data.message || "Payment failed.";
              checkoutWindow.close(); // Close checkout window on failure
            }

            window.removeEventListener("message", handleSuccessMessage);
          };

          checkoutWindow.addEventListener("message", handleSuccessMessage);
          // window.addEventListener('message', handleSuccessMessage);
        } else {
          this.paymentError =
            response.data.error || "An error occurred. Please try again later.";
        }
      } catch (error) {
        console.error("Payment request failed:", error);
        this.paymentError = "An error occurred. Please try again later.";
      } finally {
        this.isLoading = false;
      }
    },
    ProdPost() {
      const num = 1;
      console.log(num);
      return num * 2;
    },
  },
});
