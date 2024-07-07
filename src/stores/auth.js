/* eslint-disable linebreak-style */
import { defineStore } from "pinia";
import AUTH from "src/api/auth.js";
import { Notify } from "quasar";

import { useGlobalStore } from "./global.js";

const { updateMenu } = useGlobalStore();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoading: false,

    first_name: localStorage.getItem("first_name") || "",
    last_name: localStorage.getItem("last_name") || "",
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

      this.first_name = userDetails.first_name;
      this.last_name = userDetails.last_name;
      this.company_name = userDetails.company_name;
      this.company_logo = userDetails.company_logo;
      this.email = userDetails.email;
      localStorage.setItem("first_name", userDetails.first_name);
      localStorage.setItem("last_name", userDetails.last_name);
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
      localStorage.removeItem("first_name");
      localStorage.removeItem("last_name");
      this.accessToken = "";
      this.refreshToken = "";
      this.company_name = "";
      this.company_logo = "";
      this.email = "";
      this.first_name = "";
      this.last_name = "";
    },

    async logins(credentials) {
      try {
        const res = await AUTH.login(credentials);
        if (res.status === 200) {
          const baseURL = "http://127.0.0.1:8000";
          const userDetails = {
            company_name: res.data.company_name,
            company_logo: `${baseURL}/images/${res.data.company_logo}`,
            first_name: res.data.first_name,
            last_name: res.data.last_name,
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
        let errorMessage = "An error occurred during login.";

        // Check if error response has data and a specific error message
        if (e.response && e.response.data && e.response.data.detail) {
          errorMessage = e.response.data.detail;
        } else if (e.message) {
          // Fallback to error message if no specific error message from server
          errorMessage = e.message;
        }

        Notify.create({
          type: "negative",
          message: errorMessage,
        });
      }
    },

    async register(data) {
      this.isLoading = true;
      try {
        const response = await AUTH.register(data);
        if (response.status === 201) {
          this.router.push({ path: "/auth/verify" });
          Notify.create({
            type: "positive",
            message: "Verify the email in your mail. Registration successful",
          });
        }
      } catch (e) {
        let errorMessage = "An error occurred during login.";

        // Check if error response has data and a specific error message
        if (e.response && e.response.data && e.response.data.detail) {
          errorMessage = e.response.data.detail;
        } else if (e.message) {
          // Fallback to error message if no specific error message from server
          errorMessage = e.message;
        }

        Notify.create({
          type: "negative",
          message: errorMessage,
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
      } catch (e) {
        let errorMessage = "An error occurred during login.";

        // Check if error response has data and a specific error message
        if (e.response && e.response.data && e.response.data.detail) {
          errorMessage = e.response.data.detail;
        } else if (e.message) {
          // Fallback to error message if no specific error message from server
          errorMessage = e.message;
        }

        Notify.create({
          type: "negative",
          message: errorMessage,
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
      } catch (e) {
        let errorMessage = "An error occurred during login.";

        // Check if error response has data and a specific error message
        if (e.response && e.response.data && e.response.data.detail) {
          errorMessage = e.response.data.detail;
        } else if (e.message) {
          // Fallback to error message if no specific error message from server
          errorMessage = e.message;
        }

        Notify.create({
          type: "negative",
          message: errorMessage,
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
      } catch (e) {
        let errorMessage = "An error occurred during login.";

        // Check if error response has data and a specific error message
        if (e.response && e.response.data && e.response.data.detail) {
          errorMessage = e.response.data.detail;
        } else if (e.message) {
          // Fallback to error message if no specific error message from server
          errorMessage = e.message;
        }

        Notify.create({
          type: "negative",
          message: errorMessage,
        });
      }
    },
  },
});
