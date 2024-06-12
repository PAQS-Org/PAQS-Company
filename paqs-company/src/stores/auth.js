/* eslint-disable linebreak-style */
import { defineStore } from "pinia";
import AUTH from "src/api/auth.js";
import { Notify } from "quasar";

import { useGlobalStore } from "./global.js";

const { updateMenu } = useGlobalStore();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoading: false,

    company_name: localStorage.getItem("company_name") || "",
    company_logo: localStorage.getItem("company_logo") || "",
    email: localStorage.getItem("email") || "",
    accessToken: localStorage.getItem("accessToken") || "",
    refreshToken: localStorage.getItem("refreshToken") || "",
    notif: localStorage.getItem("neverShowNotificationsBanner") || "",
    subsq: localStorage.getItem("subsq") || "",
  }),
  getters: {
    isLoggedIn(state) {
      return !!state.accessToken;
    },
  },

  actions: {
    setAccessToken(token) {
      this.accessToken = token;
      localStorage.setItem("accessToken", token);
    },

    saveUser(token, userDetails) {
      this.setAccessToken(token);
      this.company_name = userDetails.company_name;
      this.company_logo = userDetails.company_logo;
      this.email = userDetails.email;

      localStorage.setItem("company_name", userDetails.company_name);
      localStorage.setItem("company_logo", userDetails.company_logo);
      localStorage.setItem("email", userDetails.email);
    },
    removeUser() {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("company_name");
      localStorage.removeItem("company_logo");
      localStorage.removeItem("email");
      this.accessToken = "";
      this.refreshToken = "";
      this.company_name = "";
      this.company_logo = "";
      this.email = "";
    },

    async logins(credentials) {
      try {
        const res = await AUTH.login(credentials);
        console.log(res);
        if (res.status === 200) {
          const userDetails = {
            company_name: res.data.company_name,
            company_logo: res.data.company_logo,
            email: res.data.email,
          };
          this.saveUser(res.data.tokens.access, userDetails);
          this.refreshToken = res.data.tokens.refresh;
          localStorage.setItem("refreshToken", this.refreshToken);
          Notify.create({
            type: "positive",
            message: "Login successful",
          });
          this.router.push({ path: "/dash/main" });
        }
      } catch (e) {
        Notify.create({
          type: "negative",
          message: "Invalid credentials",
        });
      }
    },

    async register(data) {
      this.isLoading = true;
      try {
        const response = await AUTH.register(data);
        console.log(response);
        if (response.status === 201) {
          this.router.push({ path: "/auth/verify" });
          Notify.create({
            type: "positive",
            message: "Verify the email in your mail. Registration successful",
          });
        }
      } catch (error) {
        Notify.create({
          type: "negative",
          message: error.message,
        });
      }
    },

    async setNewPassword(data) {
      this.isLoading = true;
      try {
        const response = await AUTH.setNewPasswords(data);
        if (response.status == 200) {
          this.router.push({ path: "/auth/login" });
          Notify.create({
            type: "positive",
            message: "Password reset successful",
          });
        }
      } catch (error) {
        Notify.create({
          type: "negative",
          message: error.message,
        });
      }
    },

    async resetPassword(data) {
      this.isLoading = true;
      const res = await AUTH.forgotPasswords(data);
      if (res.status == 200) {
        const urlParts = res.data.split("/");
        const uid64P = urlParts[urlParts.length - 3];
        const tk = urlParts[urlParts.length - 2];
        localStorage.setItem("uid64", uid64P);
        localStorage.setItem("token", tk);
        this.router.push({ path: "/auth/resetPassword" });
        Notify.create({
          type: "positive",
          message: "Proceed to your email to verify the action.",
        });
      }
    },

    async logout() {
      this.isLoading = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const res = await AUTH.logout({ refresh_token: refreshToken });
        if (res.status === 204) {
          this.removeUser();
          this.router.push({ name: "Login" });
        }
        Notify.create({
          type: "positive",
          message: "Logout successful",
        });
      } catch (error) {
        Notify.create({
          type: "negative",
          message: error.message || "Logout failed",
        });
      }
    },
    async pushSubscribe(data) {
      this.loading = true;
      try {
        const res = await AUTH.subscription(data);
        if (res.status == 201) {
          this.router.push({ path: "/" });
          Notify.create({
            type: "positive",
            message: "Subscription successfully created",
          });
        }
      } catch (error) {
        Notify.create({
          type: "negative",
          message: "Subscription rejected",
        });
      }
    },
  },
});
