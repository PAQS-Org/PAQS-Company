/* eslint-disable linebreak-style */
import { defineStore } from 'pinia';
import * as Sentry from '@sentry/vue';
import AUTH from 'src/api/auth.js';
import { $axios } from 'boot/axios';

const SESSION_COOKIE_NAME = 'hasSession';

import { useGlobalStore } from './global.js';

const { updateMenu } = useGlobalStore();

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoading: false,
    acceptance: true,
    user: null,
    accessToken: localStorage.getItem('access_token') || null,
    // authenticatedUser: null,
  }),
  getters: {
    // isAuthenticated: (state) => state.authenticatedUser !== null,
    isLoggedIn: (state) => state.user !== null,
    getAccessToken() {
      return this.accessToken;
    },
  },
  actions: {
    setAccessToken(token) {
      this.accessToken = token;
      localStorage.setItem('access_token', token);
    },

    saveUser(user) {
      this.user = user;
      localStorage.setItem('User_Details', JSON.stringify(user));
    },
    removeUser() {
      this.user = null;
      localStorage.removeItem('User_Details');
    },

    login(credentials) {
      this.isLoading = true;
      return AUTH.login(credentials)
        .then((response) => {
          if (response.status === 200 && this.acceptance) {
            const token = response.data.access;
            const userDetails = response.data;
            this.saveUser(userDetails);
            this.setAccessToken(token);
            updateMenu(true);
            Sentry.setUser({ email: credentials.email });
            this.router.push({ name: 'dashboard' });
            $axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            document.cookie = `${SESSION_COOKIE_NAME}=true; SameSite=Lax; HttpOnly`;
          }
        }).catch((err) => err)
        .finally(() => this.isLoading = false);
    },

    register(data) {
      this.isLoading = true;
      return AUTH.register(data)
        .then((response) => {
          if (response.status === 201) {
            this.router.push({ name: 'Login' });
          }
          return response;
        })
        .catch((err) => err)
        .finally(() => this.isLoading = false);
    },

    forgotPassword(email) {
      this.isLoading = true;
      return AUTH.forgotPassword(email)
        .then((response) => {
          if (response.status === 200) {
            this.router.push({ name: 'Login' });
          }
          return response;
        })
        .catch((err) => err)
        .finally(() => this.isLoading = false);
    },

    resetPassword(data) {
      this.isLoading = true;
      return AUTH.resetPassword(data.hash, data.credentials)
        .then((response) => {
          if (response.status === 200) {
            const { login } = useAuthStore();
            login({ username: data.email, password: data.credentials.password });
          }
          return response;
        })
        .catch((err) => err)
        .finally(() => this.isLoading = false);
    },

    confirmInvitation(data) {
      this.isLoading = true;
      return AUTH.confirmInvitation(data.hash, data.credentials)
        .then((response) => {
          if (response.status === 200) {
            const { login } = useAuthStore();
            login({ username: data.email, password: data.credentials.password });
          }
          return response;
        })
        .catch((err) => err)
        .finally(() => this.isLoading = false);
    },

    logout() {
      this.isLoading = true;
      return AUTH.logout()
        .then((response) => {
          if (response.status === 200) {
            this.removeUser();
            updateMenu(false);
            Sentry.configureScope((scope) => scope.setUser(undefined));
            this.router.push({ name: 'Login' });
            // this.authenticatedUser = null;
            document.cookie = `${SESSION_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
          }
          return response;
        })
        .catch((err) => err)
        .finally(() => this.isLoading = false);
    },
  },
});
