/* eslint-disable linebreak-style */
import { defineStore } from "pinia";
// import * as Sentry from '@sentry/vue';
import AUTH from "src/api/auth.js";

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
      qrType: "",
      upReason: "",
      imgFmt: ["svg", "png", "jpg"],
      reason: ["Update the product message", "Callback a batch"],
      message: "",
      quantity: "",
    },
    payInfo: {
      fullname:
        localStorage.getItem("first_name") +
        " " +
        localStorage.getItem("last_name"),
      email: localStorage.getItem("email"),
      phoneNumber: "",
    },
    total: 0,
  }),

  getters: {
    totals() {
      const quantity = parseInt(this.$state.prodInfo.quantity, 10);

      // Define the unit price based on the quantity
      let unitPrice = 0;
      if (quantity > 100000 || quantity < 200) {
        return "out of bounds";
      } else if (quantity <= 100000) {
        unitPrice = 0.01;
      } else if (quantity >= 50000) {
        unitPrice = 0.02;
      } else if (quantity >= 10000) {
        unitPrice = 0.04;
      } else if (quantity >= 5000) {
        unitPrice = 0.06;
      } else if (quantity >= 1000) {
        unitPrice = 0.08;
      } else if (quantity >= 500) {
        unitPrice = 0.1;
      } else if (quantity >= 200) {
        unitPrice = 0.15;
      } else if (quantity <= 200) {
        unitPrice = 0.2;
      }

      // Calculate the total
      const total = quantity * unitPrice;
      return total;
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

      try {
        const response = await AUTH.payment({
          email: this.payInfo.email,
          quantity: this.prodInfo.quantity,
          product_name: this.prodInfo.prodName,
          batch_number: this.prodInfo.batchCode,
        });

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
              this.stepperRef.value.next();
              checkoutWindow.close();
            } else {
              this.paymentError = event.data.message || "Payment failed.";
              checkoutWindow.close();
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
    async ProdPost() {
      try {
        const res = await AUTH.processCodes({
          company_name: this.companyName,
          product_name: this.prodInfo.prodName,
          perish: this.prodInfo.perish,
          qr_type: this.prodInfo.qrType,
          quantity: this.prodInfo.quantity,
        });
        if (res.status === 201) {
          console.alert("hurray");
        }
      } catch (error) {
        console.error("Payment request failed:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async updatecodes() {
      try {
        const res = await AUTH.updateCode({
          product_name: this.prodInfo.prodName,
          batch: this.prodInfo.batchCode,
          reason: this.prodInfo.reason,
          message: this.prodInfo.message,
        });
        if (res.status == 204) {
        }
      } catch (error) {}
    },
  },
});
