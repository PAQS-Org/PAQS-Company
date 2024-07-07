/* eslint-disable linebreak-style */

import { defineStore } from "pinia";
import hello from "hellojs";
import axios from "axios";

const USER_KEY = "user";

export const useHelloStore = defineStore({
  id: "hello",
  state: () => ({
    initialized: false,
  }),
  actions: {
    getUser() {
      return JSON.parse(localStorage.getItem(USER_KEY));
    },
    saveUser(user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    },
    removeUser() {
      localStorage.removeItem(USER_KEY);
    },
    initialize() {
      if (!this.initialized) {
        // Initialize Hello.js with your API keys and configurations
        hello.init({});
        this.initialized = true;
      }
    },
    async auth(network) {
      try {
        const response = await hello(network).login({ scope: "friends" });

        if (response.status === 200) {
          const userDetails = response.data.data.details;
          this.saveUser(userDetails);

          // Assuming credentials.email is defined somewhere
          // Sentry.setUser({ email: userDetails.email });

          // Example: Sending the user information to your server using Axios
          await axios.post("/api/set-user", { user: userDetails });

          // Assuming you have a router available in your store
          this.router.push({ name: "Dash" });
        }

        return response; // Optionally, return the result for further handling in components
      } catch (error) {
        console.error("Error during authentication:", error);
        throw error;
        // Rethrow the error for further handling in
        // components or other parts of your application
      }
    },
  },
});

// Export the store for use in your application
export default useHelloStore;
